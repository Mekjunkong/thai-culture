import Stripe from 'stripe'

// Stripe plans config — reference Price IDs from env
export const STRIPE_PLANS = {
  monthly: {
    priceId: process.env.STRIPE_PRICE_MONTHLY ?? 'price_TEST_monthly',
    name: 'Thai Culture & Language — Monthly',
    amount: 499,      // USD cents ($4.99/mo)
    currency: 'usd',
    interval: 'month' as const,
  },
  annual: {
    priceId: process.env.STRIPE_PRICE_ANNUAL ?? 'price_TEST_annual',
    name: 'Thai Culture & Language — Annual',
    amount: 9900,     // USD cents ($99/yr)
    currency: 'usd',
    interval: 'year' as const,
  },
  lifetime: {
    priceId: process.env.STRIPE_PRICE_LIFETIME ?? 'price_TEST_lifetime',
    name: 'Thai Culture & Language — Lifetime Access',
    amount: 19900,    // USD cents ($199 one-time)
    currency: 'usd',
    interval: null,
  },
} as const

export type PlanKey = keyof typeof STRIPE_PLANS

// Lazy-initialize Stripe so build doesn't fail without STRIPE_SECRET_KEY
let _stripe: Stripe | null = null
export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('Missing STRIPE_SECRET_KEY')
    _stripe = new Stripe(key, { apiVersion: '2024-04-10', typescript: true })
  }
  return _stripe
}

// Named export for convenience (used in webhook + checkout routes)
export { getStripe as stripe }
