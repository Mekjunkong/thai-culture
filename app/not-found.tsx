import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import SiteFooter from '@/components/ui/SiteFooter'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-jasmine px-4 py-20 text-tamarind md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-black uppercase text-temple">Page not found</p>
          <h1 className="mt-4 text-5xl font-black leading-none tracking-[-0.05em] text-balance md:text-6xl">
            ไม่เป็นไร — mai pen rai.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-tamarind/72 text-pretty">
            No worries. This page does not exist, but your next Thai phrase is
            one click away.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/missions"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-indigo px-6 py-3 font-black text-surface transition duration-150 ease-out hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
            >
              Try a free mission
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-tamarind/15 bg-surface px-6 py-3 font-black text-tamarind transition duration-150 ease-out hover:border-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
