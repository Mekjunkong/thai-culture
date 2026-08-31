'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function LessonsError({ reset }: { reset: () => void }) {
  const alertRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    alertRef.current?.focus()
  }, [])

  return (
    <main className="bg-paper px-4 py-16 text-tamarind">
      <div
        ref={alertRef}
        className="mx-auto max-w-xl rounded-none border border-clay/30 bg-surface p-8 text-center shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
        role="alert"
        tabIndex={-1}
      >
        <p className="text-xs font-semibold uppercase tracking-[.14em] text-clay">Lessons unavailable</p>
        <h1 className="mt-3 font-serif text-3xl font-bold">We couldn&apos;t load the lessons.</h1>
        <p className="mt-4 leading-7 text-tamarind/70">Please try again, or return to the lessons overview.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center bg-ink px-5 py-3 font-semibold text-surface transition hover:bg-ink/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
          >
            Try again
          </button>
          <Link
            href="/lessons"
            className="inline-flex min-h-11 items-center justify-center border border-tamarind/15 px-5 py-3 font-semibold text-clay transition hover:border-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
          >
            Back to lessons
          </Link>
        </div>
      </div>
    </main>
  )
}
