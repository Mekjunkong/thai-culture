import Stripe from 'stripe'

// Stripe plans config — reference Price IDs from env
export const STRIPE_PLANS = {
  monthly: {
    priceId: process.env.STRIPE_PRICE_MONTHLY ?? 'price_TEST_monthly',
    name: 'Thai Culture & Language — Monthly',
    amount: 29000, // THB satang (฿290/mo)
    currency: 'thb',
    interval: 'month' as const,
  },
  annual: {
    priceId: process.env.STRIPE_PRICE_ANNUAL ?? 'price_TEST_annual',
    name: 'Thai Culture & Language — Annual',
    amount: 199000, // THB satang (฿1,990/yr)
    currency: 'thb',
    interval: 'year' as const,
  },
  lifetime: {
    priceId: process.env.STRIPE_PRICE_LIFETIME ?? 'price_TEST_lifetime',
    name: 'Thai Culture Starter Course — Lifetime Access',
    amount: 69000, // THB satang (฿690 one-time)
    currency: 'thb',
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
