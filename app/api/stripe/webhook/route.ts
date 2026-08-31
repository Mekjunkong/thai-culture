import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase'

type LifetimePlan = 'lifetime'

function persistenceError(error: { message: string } | null) {
  if (error) throw new Error(`Supabase persistence failed: ${error.message}`)
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
    const msg = err instanceof Error ? err.message : 'Unknown'
    return NextResponse.json({ error: `Webhook error: ${msg}` }, { status: 400 })
  }

  try {
    const db = createAdminClient()
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const plan = session.metadata?.plan
        const userId = session.metadata?.userId
        if (plan !== 'lifetime' || !userId) {
          return NextResponse.json({ error: 'Unsupported or incomplete checkout metadata' }, { status: 400 })
        }

        const { error: subscriptionError } = await db.from('subscriptions').upsert({
          user_id: userId,
          stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
          stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : null,
          status: 'active',
          plan: 'lifetime' satisfies LifetimePlan,
        }, { onConflict: 'user_id' })
        persistenceError(subscriptionError)

        const { error: profileError } = await db.from('profiles')
          .update({ subscription_tier: 'lifetime' })
          .eq('id', userId)
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
        const { data, error } = await db.from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', sub.id)
          .select('user_id').maybeSingle()
        persistenceError(error)
        if (data?.user_id) {
          const { error: profileError } = await db.from('profiles')
            .update({ subscription_tier: 'free' }).eq('id', data.user_id)
          persistenceError(profileError)
        }
        break
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const { error } = await db.from('subscriptions')
          .update({ status: 'past_due' })
          .eq('stripe_subscription_id', typeof invoice.subscription === 'string' ? invoice.subscription : '')
        persistenceError(error)
        break
      }
      default:
        console.log(`[Stripe] Unhandled: ${event.type}`)
    }
  } catch (err) {
    console.error('[Stripe Webhook] Error:', err)
    return NextResponse.json({ error: 'Handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
