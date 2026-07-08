import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import TeacherDashboard from './TeacherDashboard'

export const metadata: Metadata = {
  title: 'Teacher Dashboard & Lesson Operations | Thai Lessons Chiang Mai',
  description:
    'Internal teacher checklist for Thai lesson leads, class preparation, lesson reports, WhatsApp follow-up, and product upsells.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/teacher-dashboard' },
  openGraph: {
    title: 'Teacher Dashboard & Lesson Operations',
    description: 'A simple operations dashboard for running online and on-site Thai lessons professionally.',
    url: '/teacher-dashboard',
    type: 'website',
  },
}

const operatingPrinciples = [
  'One student message should become one clear mission, not a random lesson.',
  'Every class needs a before-class brief, during-class correction focus, and after-class report.',
  'Every paid lesson should naturally point to the next useful product.',
]

export default function TeacherDashboardPage() {
  return (
    <>
      <Navbar />
      <main className="bg-jasmine text-tamarind">
        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-tamarind/10 bg-surface px-4 py-2 text-sm font-black uppercase text-indigo shadow-sm">
                Teacher operations
              </p>
              <h1 className="mt-6 text-5xl font-black leading-none tracking-[-0.06em] md:text-7xl">
                Run online and on-site Thai lessons like a real product.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-tamarind/72 md:text-xl md:leading-9">
                Use this dashboard before and after every student session: match leads to missions, prepare the class, send the report, and follow up with the right next offer.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/book" className="inline-flex min-h-13 items-center justify-center rounded-2xl bg-indigo px-7 py-4 font-black text-surface shadow-lg shadow-indigo/20 transition hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                  Open intake form
                </Link>
                <Link href="/lesson-report" className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-tamarind/15 bg-surface px-7 py-4 font-black text-tamarind shadow-sm transition hover:border-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                  Open lesson report
                </Link>
              </div>
            </div>
            <aside className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-2xl shadow-tamarind/10">
              <p className="text-sm font-black uppercase text-temple">Why this improves the product</p>
              <div className="mt-5 grid gap-3">
                {operatingPrinciples.map((item, index) => (
                  <div key={item} className="rounded-2xl bg-jasmine p-4">
                    <p className="text-sm font-black text-temple">0{index + 1}</p>
                    <p className="mt-2 font-bold leading-7 text-tamarind/75">{item}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="px-4 pb-16 md:pb-20">
          <div className="mx-auto max-w-6xl">
            <TeacherDashboard />
          </div>
        </section>
      </main>
    </>
  )
}
