import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import PrintButton from '@/components/ui/PrintButton'

export const metadata: Metadata = {
  title: 'Thai Lesson Report Template | Thai Lessons Chiang Mai',
  description:
    'Printable lesson report template for Thai Lessons Chiang Mai: mission, phrase bank, pronunciation corrections, homework, and next booking step.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/lesson-report' },
}

const correctionAreas = ['Tone', 'Vowel length', 'Rhythm', 'Polite ending', 'Word choice', 'Confidence']
const homeworkIdeas = ['Send one WhatsApp voice note', 'Use the phrase once in real life', 'Repeat the mission quiz', 'Write 3 custom phrases', 'Book the next mission']

export default function LessonReportPage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper px-4 py-10 text-tamarind print:bg-surface print:py-0">
        <section className="mx-auto max-w-5xl rounded-none border border-tamarind/10 bg-surface p-5 md:p-8 print:border-0">
          <div className="flex flex-col gap-4 border-b border-tamarind/10 pb-6 md:flex-row md:items-start md:justify-between print:pb-4">
            <div>
              <p className="text-sm font-bold uppercase text-clay">Thai Lessons Chiang Mai</p>
              <h1 className="mt-2 font-serif text-4xl font-bold leading-tight md:text-5xl">Lesson Report</h1>
              <p className="mt-3 max-w-2xl leading-7 text-tamarind/70">
                Use this after every online or on-site lesson so the student leaves with clear corrections, homework, and a reason to continue.
              </p>
            </div>
            <div className="flex gap-2 print:hidden">
              <Link href="/book" className="inline-flex min-h-11 items-center rounded-none border border-tamarind/15 px-4 py-2 font-bold text-clay">Student intake</Link>
              <PrintButton className="inline-flex min-h-11 items-center rounded-none bg-ink px-4 py-2 font-bold text-surface" />
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {['Student name', 'Date', 'Lesson format', 'Teacher'].map((label) => (
              <div key={label} className="rounded-none border border-tamarind/10 bg-jasmine p-4 print:bg-surface">
                <p className="text-xs font-bold uppercase text-clay">{label}</p>
                <div className="mt-8 border-b border-tamarind/30" />
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
            <section className="rounded-none border border-tamarind/10 bg-jasmine p-5 print:bg-surface">
              <p className="text-sm font-bold uppercase text-clay">Today’s mission</p>
              <h2 className="mt-2 text-2xl font-serif font-normal">Situation + outcome</h2>
              <div className="mt-8 space-y-8">
                <div><p className="font-bold text-tamarind/60">Mission name</p><div className="mt-5 border-b border-tamarind/30" /></div>
                <div><p className="font-bold text-tamarind/60">Real-life outcome</p><div className="mt-5 border-b border-tamarind/30" /></div>
                <div><p className="font-bold text-tamarind/60">Where to use it in Chiang Mai</p><div className="mt-5 border-b border-tamarind/30" /></div>
              </div>
            </section>

            <section className="rounded-none border border-honey bg-sand/10 p-5 print:bg-surface">
              <p className="text-sm font-bold uppercase text-clay">Confidence score</p>
              <h2 className="mt-2 text-2xl font-serif font-normal">Before → after</h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {['Before', 'After'].map((label) => (
                  <div key={label} className="rounded-none bg-surface p-4 text-center print:border print:border-tamarind/10">
                    <p className="font-bold text-clay">{label}</p>
                    <div className="mx-auto mt-4 flex size-20 items-center justify-center rounded-full border-4 border-tamarind/20 text-2xl font-bold text-tamarind/35">/10</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="mt-6 rounded-none border border-tamarind/10 bg-jasmine p-5 print:bg-surface">
            <p className="text-sm font-bold uppercase text-clay">Phrase bank</p>
            <div className="mt-4 overflow-hidden rounded-none border border-tamarind/10">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-ink text-surface"><tr><th className="p-3">Thai phrase</th><th className="p-3">Romanization</th><th className="p-3">Meaning</th><th className="p-3">When to use</th></tr></thead>
                <tbody>
                  {[1, 2, 3, 4].map((row) => (
                    <tr key={row} className="border-t border-tamarind/10"><td className="h-12 p-3" /><td className="p-3" /><td className="p-3" /><td className="p-3" /></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-none border border-tamarind/10 bg-jasmine p-5 print:bg-surface">
              <p className="text-sm font-bold uppercase text-clay">Pronunciation corrections</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {correctionAreas.map((area) => <div key={area} className="rounded-none border border-tamarind/10 bg-surface p-3 font-bold">□ {area}</div>)}
              </div>
              <div className="mt-5 space-y-7">
                <div><p className="font-bold text-tamarind/60">Main correction</p><div className="mt-5 border-b border-tamarind/30" /></div>
                <div><p className="font-bold text-tamarind/60">Try saying it like this</p><div className="mt-5 border-b border-tamarind/30" /></div>
              </div>
            </div>

            <div className="rounded-none border border-tamarind/10 bg-jasmine p-5 print:bg-surface">
              <p className="text-sm font-bold uppercase text-clay">Homework + next step</p>
              <div className="mt-4 grid gap-2">
                {homeworkIdeas.map((idea) => <div key={idea} className="rounded-none border border-tamarind/10 bg-surface p-3 font-bold">□ {idea}</div>)}
              </div>
              <div className="mt-5 space-y-7">
                <div><p className="font-bold text-tamarind/60">Next mission recommendation</p><div className="mt-5 border-b border-tamarind/30" /></div>
                <div><p className="font-bold text-tamarind/60">Next booking offer</p><div className="mt-5 border-b border-tamarind/30" /></div>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-none bg-ink p-5 text-surface print:border print:border-tamarind/20 print:bg-surface print:text-tamarind">
            <p className="text-sm font-bold uppercase text-honey print:text-clay">Teacher note</p>
            <p className="mt-2 leading-7 text-surface/80 print:text-tamarind/70">
              End every lesson by filling this report with the student. It makes the service feel tangible, improves retention, and gives a natural reason to book the Starter Pack or 5-Lesson Survival Path.
            </p>
          </section>
        </section>
      </main>
    </>
  )
}
