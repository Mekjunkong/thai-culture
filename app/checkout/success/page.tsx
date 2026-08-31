import Link from 'next/link'
import { retrieveAndValidateLifetimeSession } from '@/lib/stripe-validation'

type Props = { searchParams: { session_id?: string | string[] } }

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const rawSessionId = searchParams.session_id
  const sessionId = typeof rawSessionId === 'string' ? rawSessionId : undefined
  let confirmed = false

  if (sessionId && /^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
    try {
      const result = await retrieveAndValidateLifetimeSession(sessionId)
      confirmed = result.valid
    } catch (error) {
      console.error('[Checkout Success] Could not verify session:', error)
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/55">
        {confirmed ? 'Payment status confirmed' : 'Payment status being confirmed'}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">
        {confirmed ? 'Your payment is being recorded.' : 'We are confirming your payment.'}
      </h1>
      <p className="mt-5 text-base leading-7 text-ink/70">
        Access is granted only after the signed Stripe webhook is verified and processed. This page never grants access by itself.
      </p>
      <Link href="/learn" className="mt-8 inline-flex w-fit bg-honey px-6 py-3 font-semibold text-ink">
        Open the learner area
      </Link>
    </main>
  )
}
