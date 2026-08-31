import Stripe from 'stripe'
import { getLifetimePriceId, STRIPE_PLANS } from '@/lib/stripe'

export const APPROVED_PRODUCT_KEY = 'thai-culture-starter-course'

export function isValidUuid(value: string | undefined): value is string {
  return Boolean(value && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value))
}

/** Re-check the Stripe object; event metadata alone must never grant access. */
export async function retrieveAndValidateLifetimeSession(sessionId: string) {
  const stripe = (await import('@/lib/stripe')).getStripe()
  const expectedPriceId = getLifetimePriceId()
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items.data.price'],
  })
  const lineItems = session.line_items?.data ?? []
  const item = lineItems.length === 1 ? lineItems[0] : undefined
  const price = item?.price && typeof item.price !== 'string' ? item.price : undefined
  const valid = Boolean(
    session.payment_status === 'paid' &&
    session.mode === 'payment' &&
    session.metadata?.plan === 'lifetime' &&
    session.metadata?.product === APPROVED_PRODUCT_KEY &&
    isValidUuid(session.metadata?.userId) &&
    item?.quantity === 1 &&
    price?.id === expectedPriceId &&
    price.unit_amount === STRIPE_PLANS.lifetime.amount &&
    price.currency === STRIPE_PLANS.lifetime.currency &&
    session.amount_total === STRIPE_PLANS.lifetime.amount &&
    session.currency === STRIPE_PLANS.lifetime.currency
  )
  return { session, valid, userId: valid ? session.metadata?.userId : undefined }
}

export function hasExpectedLifetimeSnapshot(session: Stripe.Checkout.Session) {
  // Checkout session events do not necessarily include expanded line items;
  // those are checked by retrieveAndValidateLifetimeSession above.
  return (
    session.payment_status === 'paid' &&
    session.mode === 'payment' &&
    session.metadata?.plan === 'lifetime' &&
    session.metadata?.product === APPROVED_PRODUCT_KEY &&
    isValidUuid(session.metadata?.userId) &&
    session.amount_total === STRIPE_PLANS.lifetime.amount &&
    session.currency === STRIPE_PLANS.lifetime.currency
  )
}
