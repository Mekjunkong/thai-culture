import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'

const outcomes = [
  'Greet Thai people naturally without sounding like a phrasebook',
  'Understand the cultural logic behind wai, khrap, kha, and mai pen rai',
  'Practice useful daily Thai through quizzes and audio placeholders ready for real files',
]

const curriculum = [
  { week: 'Week 1', title: 'Greetings, wai & politeness particles', status: 'Free now', href: '/lessons/week-1' },
  { week: 'Week 2', title: 'Numbers, prices, colors & daily objects', status: 'Built now', href: '/lessons/week-2' },
  { week: 'Week 3', title: 'Ordering food and handling spice levels', status: 'Planned', href: '#' },
  { week: 'Week 4', title: 'Temple, market and local etiquette', status: 'Planned', href: '#' },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-thai-cream px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-thai-navy shadow-sm">
                Thai for real life — not tourist phrases only
              </p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 text-balance md:text-6xl">
                Learn Thai language through the culture that makes it make sense.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 text-pretty">
                A practical course for foreigners who want to speak politely, understand social context, and feel comfortable in everyday Thailand.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/lessons/week-1"
                  className="rounded-xl bg-thai-navy px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-thai-gold"
                >
                  Start Week 1 free
                </Link>
                <Link
                  href="/lessons/week-2"
                  className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center font-semibold text-slate-800 transition hover:border-thai-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-thai-gold"
                >
                  Open Week 2
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <div className="rounded-2xl bg-thai-navy p-6 text-white">
                <p className="text-sm font-semibold text-yellow-200">MVP lesson bundle</p>
                <h2 className="mt-3 text-2xl font-bold text-balance">Week 1 + Week 2 are now browsable</h2>
                <p className="mt-4 leading-7 text-blue-50 text-pretty">
                  The first slice now covers greetings, politeness, numbers, prices, colors, and everyday objects — enough for a small paid-course preview.
                </p>
              </div>
              <ul className="mt-6 space-y-4">
                {outcomes.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-700">
                    <span className="mt-1 text-thai-gold" aria-hidden="true">✓</span>
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="curriculum" className="px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase text-thai-red">MVP curriculum</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950 text-balance md:text-4xl">Start with the social basics, then move into daily life.</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {curriculum.map((lesson) => {
                const card = (
                  <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-thai-gold">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold text-thai-navy">{lesson.week}</p>
                      <span className="rounded-full bg-thai-cream px-3 py-1 text-xs font-semibold text-slate-700">{lesson.status}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-slate-950 text-balance">{lesson.title}</h3>
                  </article>
                )

                if (lesson.href === '#') {
                  return <div key={lesson.week}>{card}</div>
                }

                return (
                  <Link key={lesson.week} href={lesson.href} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-thai-gold">
                    {card}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-slate-950 px-4 py-16 text-white">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-lg">
            <p className="text-sm font-semibold uppercase text-yellow-200">Launch offer draft</p>
            <h2 className="mt-3 text-3xl font-bold text-balance md:text-4xl">Two lessons now. Full beginner course can become the paid product.</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300 text-pretty">
              The app is prepared for Supabase progress tracking and Stripe checkout. The next product step is real audio, Week 3 food/café Thai, and a checkout price.
            </p>
            <Link
              href="/lessons/week-1"
              className="mt-8 inline-flex rounded-xl bg-thai-gold px-6 py-3 font-semibold text-slate-950 transition hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Try the lesson preview
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
