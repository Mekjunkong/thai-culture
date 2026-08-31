import Link from 'next/link'

export default function CheckoutSuccessPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/55">Payment received</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">Thanks for your purchase.</h1>
      <p className="mt-5 text-base leading-7 text-ink/70">
        Your lifetime course access will appear after Stripe confirms the payment. This page does not grant access by itself.
      </p>
      <Link href="/lessons" className="mt-8 inline-flex w-fit bg-honey px-6 py-3 font-semibold text-ink">
        Return to the course
      </Link>
    </main>
  )
}
