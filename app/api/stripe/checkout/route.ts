import { NextRequest, NextResponse } from 'next/server'
import { getStripe, STRIPE_PLANS, PlanKey } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as {
      plan?: PlanKey; userId?: string; email?: string
    }
    const plan = body.plan ?? 'lifetime'
    const planConfig = STRIPE_PLANS[plan]
    if (!planConfig) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }
    const session = await getStripe().checkout.sessions.create({
      mode: planConfig.interval ? 'subscription' : 'payment',
      ...(body.email ? { customer_email: body.email } : {}),
      line_items: [{ price: planConfig.priceId, quantity: 1 }],
      metadata: {
        plan,
        ...(body.userId ? { userId: body.userId } : {}),
        product: 'thai-culture-starter-course',
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/?checkout=success#pricing`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/?checkout=cancelled#pricing`,
      allow_promotion_codes: true,
    })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[Checkout] Error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
