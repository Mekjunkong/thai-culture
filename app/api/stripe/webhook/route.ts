import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase'

type Plan = 'monthly' | 'annual' | 'lifetime'

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? ''

function normalizePlan(plan: string | undefined): Plan {
  if (plan === 'annual' || plan === 'lifetime') return plan
  return 'monthly'
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, WEBHOOK_SECRET)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown'
    return NextResponse.json({ error: `Webhook error: ${msg}` }, { status: 400 })
  }

  const db = createAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        if (!userId) break
        await db.from('subscriptions').upsert({
          user_id: userId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          status: 'active',
          plan: normalizePlan(session.metadata?.plan),
        })
        await db.from('profiles').update({ subscription_tier: 'pro' }).eq('id', userId)
        break
      }
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        await db.from('subscriptions').update({
          status: sub.status,
          current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        }).eq('stripe_subscription_id', sub.id)
        break
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const { data } = await db.from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', sub.id)
          .select('user_id').single()
        if (data?.user_id) {
          await db.from('profiles').update({ subscription_tier: 'free' }).eq('id', data.user_id)
        }
        break
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await db.from('subscriptions')
          .update({ status: 'past_due' })
          .eq('stripe_subscription_id', invoice.subscription as string)
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
