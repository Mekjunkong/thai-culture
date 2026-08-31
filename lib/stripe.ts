import Stripe from 'stripe'

export const STRIPE_PLANS = {
  lifetime: {
    priceId: process.env.STRIPE_PRICE_LIFETIME,
    name: 'Thai Culture Starter Course — Lifetime Access',
    amount: 69000,
    currency: 'thb',
    interval: null,
  },
} as const

export type PlanKey = keyof typeof STRIPE_PLANS

const isProduction = process.env.NODE_ENV === 'production'

export function getLifetimePriceId(): string {
  const priceId = STRIPE_PLANS.lifetime.priceId?.trim()
  if (!priceId || (isProduction && /^price_TEST(?:_|$)/i.test(priceId))) {
    throw new Error('Missing valid STRIPE_PRICE_LIFETIME configuration')
  }
  return priceId
}

let _stripe: Stripe | null = null
export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY?.trim()
    if (!key || (isProduction && /^(sk_test_|your_|changeme)/i.test(key))) {
      throw new Error('Missing valid STRIPE_SECRET_KEY')
    }
    _stripe = new Stripe(key, { apiVersion: '2024-04-10', typescript: true })
  }
  return _stripe
}

export { getStripe as stripe }
