import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe, getStripeMode } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase'
import { hasExpectedLifetimeSnapshot, isValidUuid } from '@/lib/stripe-validation'

type DbError = { message: string; code?: string } | null
const STALE_LEASE_MS = 10 * 60 * 1000

function persistenceError(error: DbError) {
  if (error) throw new Error(`Supabase persistence failed: ${error?.message}`)
}

function configurationError(error: unknown) {
  return error instanceof Error && /Missing|configured|configuration|stripe_webhook_events|relation .* does not exist/i.test(error.message)
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim()
  if (!webhookSecret) return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 })

  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: unknown) {
    if (configurationError(err)) return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 })
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
  }

  try {
    const keyIsLive = getStripeMode() === 'live'
    if (event.livemode !== keyIsLive) {
      return NextResponse.json({ error: 'Stripe mode mismatch' }, { status: 503 })
    }
    const db = createAdminClient()
    // This table must exist before webhook activation. The unique event ID is
    // the idempotency boundary; subscriptions.user_id alone is not sufficient.
    const { error: claimError } = await db.from('stripe_webhook_events').insert({
      event_id: event.id,
      event_type: event.type,
      status: 'processing',
    })
    if (claimError) {
      if (claimError.code === '23505') {
        const { data, error } = await db.from('stripe_webhook_events').select('status, claimed_at').eq('event_id', event.id).maybeSingle()
        persistenceError(error)
        if (data?.status === 'processed') return NextResponse.json({ received: true, duplicate: true })
        const stale = data?.status === 'failed' || (data?.claimed_at && Date.now() - Date.parse(data.claimed_at) > STALE_LEASE_MS)
        if (!stale) return NextResponse.json({ error: 'Event is already being processed' }, { status: 409 })
        const { data: reclaimed, error: reclaimError } = await db.from('stripe_webhook_events')
          .update({ status: 'processing', claimed_at: new Date().toISOString(), attempts: 2, last_error: null })
          .eq('event_id', event.id).neq('status', 'processed').select('event_id').maybeSingle()
        persistenceError(reclaimError)
        if (!reclaimed) return NextResponse.json({ error: 'Event is already being processed' }, { status: 409 })
      } else {
        persistenceError(claimError)
      }
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const snapshot = event.data.object as Stripe.Checkout.Session
        const { session, valid, userId } = await (await import('@/lib/stripe-validation')).retrieveAndValidateLifetimeSession(snapshot.id)
        // Require both the signed event snapshot and a fresh Stripe read to agree.
        if (!valid || !hasExpectedLifetimeSnapshot(snapshot) || !userId || session.id !== snapshot.id) {
          throw new Error('Checkout session did not match the approved lifetime product')
        }
        const { data: profile, error: profileLookupError } = await db.from('profiles').select('id').eq('id', userId).maybeSingle()
        persistenceError(profileLookupError)
        if (!profile || !isValidUuid(profile.id)) throw new Error('Checkout user profile does not exist')

        const { error: subscriptionError } = await db.from('subscriptions').upsert({
          user_id: userId,
          stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
          stripe_subscription_id: null,
          status: 'active',
          plan: 'lifetime',
        }, { onConflict: 'user_id' })
        persistenceError(subscriptionError)
        const { error: profileError } = await db.from('profiles').update({ subscription_tier: 'lifetime' }).eq('id', userId)
        persistenceError(profileError)
        break
      }
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const { error } = await db.from('subscriptions').update({
          status: sub.status,
          current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        }).eq('stripe_subscription_id', sub.id)
        persistenceError(error)
        break
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const { data, error } = await db.from('subscriptions').update({ status: 'canceled' }).eq('stripe_subscription_id', sub.id).select('user_id').maybeSingle()
        persistenceError(error)
        if (data?.user_id) {
          const { error: profileError } = await db.from('profiles').update({ subscription_tier: 'free' }).eq('id', data.user_id)
          persistenceError(profileError)
        }
        break
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const { error } = await db.from('subscriptions').update({ status: 'past_due' }).eq('stripe_subscription_id', typeof invoice.subscription === 'string' ? invoice.subscription : '')
        persistenceError(error)
        break
      }
      default:
        break
    }

    const { error: completeError } = await db.from('stripe_webhook_events').update({ status: 'processed', processed_at: new Date().toISOString(), last_error: null }).eq('event_id', event.id)
    persistenceError(completeError)
  } catch (err) {
    console.error('[Stripe Webhook] Error:', err)
    try {
      const db = createAdminClient()
      await db.from('stripe_webhook_events').update({ status: 'failed', last_error: err instanceof Error ? err.message.slice(0, 500) : 'Unknown webhook error' }).eq('event_id', event.id).neq('status', 'processed')
    } catch (markError) {
      console.error('[Stripe Webhook] Could not mark retryable failure:', markError)
    }
    if (configurationError(err)) return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 })
    return NextResponse.json({ error: 'Webhook could not be processed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
