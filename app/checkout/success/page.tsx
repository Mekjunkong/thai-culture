import Link from 'next/link'


export default function CheckoutSuccessPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/55">
        Payment status being confirmed
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">
        We are confirming your payment.
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
