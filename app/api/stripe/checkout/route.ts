import { NextRequest, NextResponse } from 'next/server'
import { getStripe, STRIPE_PLANS, PlanKey } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { plan, userId, email } = await req.json() as {
      plan: PlanKey; userId: string; email: string
    }
    const planConfig = STRIPE_PLANS[plan]
    if (!planConfig) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }
    const session = await getStripe().checkout.sessions.create({
      mode: planConfig.interval ? 'subscription' : 'payment',
      customer_email: email,
      line_items: [{ price: planConfig.priceId, quantity: 1 }],
      metadata: { userId, plan },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/pricing?canceled=true`,
      allow_promotion_codes: true,
    })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[Checkout] Error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
