import Link from 'next/link'

export default function CheckoutCancelledPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/55">Checkout cancelled</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">No payment was made.</h1>
      <p className="mt-5 text-base leading-7 text-ink/70">You can return whenever you are ready.</p>
      <Link href="/" className="mt-8 inline-flex w-fit bg-honey px-6 py-3 font-semibold text-ink">
        Return home
      </Link>
    </main>
  )
}
