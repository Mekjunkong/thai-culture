import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import SiteFooter from '@/components/ui/SiteFooter'
import Reveal from '@/components/ui/Reveal'
import IntakeForm from './IntakeForm'

export const metadata: Metadata = {
  title: 'Book Thai Lesson Intake | Thai Lessons Chiang Mai',
  description:
    'Send a structured intake for online or on-site Thai lessons in Chiang Mai so your first lesson is prepared around your real-life situation.',
  alternates: { canonical: '/book' },
}

const steps = [
  ['1', 'Choose your situation', 'Cafe, market, restaurant, transport, condo, work, or daily social Thai.'],
  ['2', 'Send your intake', 'Your WhatsApp message includes level, goals, schedule, and lesson format.'],
  ['3', 'Get a prepared first mission', 'The lesson starts faster because the phrase bank and roleplay are already selected.'],
]

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="bg-jasmine text-tamarind">
        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <Link href="/products" className="font-black text-indigo hover:text-indigo-soft">← Back to products</Link>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div>
                <p className="inline-flex rounded-full border border-tamarind/10 bg-surface px-4 py-2 text-sm font-black uppercase text-temple shadow-sm">
                  Student intake
                </p>
                <h1 className="mt-6 text-5xl font-black leading-none tracking-[-0.06em] md:text-7xl">
                  Tell me what Thai you need before class.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-tamarind/72 md:text-xl md:leading-9">
                  This turns booking from a vague chat into a professional lesson brief for online coaching or an on-site Chiang Mai mission.
                </p>
              </div>
              <div className="grid gap-3">
                {steps.map(([number, title, detail], index) => (
                  <Reveal key={title} index={index}>
                    <article className="rounded-2xl border border-tamarind/10 bg-surface p-4 shadow-sm">
                      <p className="text-sm font-black text-temple">Step {number}</p>
                      <h2 className="mt-1 text-xl font-black text-indigo">{title}</h2>
                      <p className="mt-1 leading-7 text-tamarind/70">{detail}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="mx-auto max-w-6xl">
            <IntakeForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
