import { NextRequest, NextResponse } from 'next/server'
import { getStripe, getLifetimePriceId } from '@/lib/stripe'
import { getAuthenticatedUser } from '@/lib/supabase'

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export async function POST(req: NextRequest) {
  let user
  try {
    const authorization = req.headers.get('authorization') ?? ''
    const match = authorization.match(/^Bearer\s+(.+)$/i)
    if (!match) return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    user = await getAuthenticatedUser(match[1])
  } catch (err) {
    console.error('[Checkout] Auth configuration error:', err)
    return NextResponse.json({ error: 'Checkout is not configured' }, { status: 503 })
  }

  if (!user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 })

  const body = await req.json().catch(() => ({})) as { plan?: unknown }
  if (body.plan !== undefined && body.plan !== 'lifetime') {
    return NextResponse.json({ error: 'Only the lifetime plan is available' }, { status: 400 })
  }

  let priceId: string
  try {
    priceId = getLifetimePriceId()
  } catch (err) {
    console.error('[Checkout] Price configuration error:', err)
    return NextResponse.json({ error: 'Checkout is not configured' }, { status: 503 })
  }

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      ...(user.email ? { customer_email: user.email } : {}),
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        plan: 'lifetime',
        userId: user.id,
        product: 'thai-culture-starter-course',
      },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancelled`,
      allow_promotion_codes: true,
    })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[Checkout] Error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
