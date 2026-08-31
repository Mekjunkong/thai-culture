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

export function getLifetimePriceId(): string {
  const priceId = STRIPE_PLANS.lifetime.priceId?.trim()
  if (!priceId) {
    throw new Error('Missing valid STRIPE_PRICE_LIFETIME configuration')
  }
  return priceId
}

let _stripe: Stripe | null = null
export function getStripeMode(): 'test' | 'live' {
  const key = process.env.STRIPE_SECRET_KEY?.trim()
  const mode = key?.startsWith('sk_live_') ? 'live' : key?.startsWith('sk_test_') ? 'test' : null
  if (!mode) throw new Error('STRIPE_SECRET_KEY must use an sk_test_ or sk_live_ key')
  const configuredMode = process.env.STRIPE_MODE?.trim().toLowerCase()
  if (configuredMode && configuredMode !== mode) throw new Error('STRIPE_MODE does not match STRIPE_SECRET_KEY')
  return mode
}

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY?.trim()
    if (!key) throw new Error('Missing valid STRIPE_SECRET_KEY')
    getStripeMode()
    _stripe = new Stripe(key, { apiVersion: '2024-04-10', typescript: true })
  }
  return _stripe
}

export { getStripe as stripe }
