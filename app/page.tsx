import Link from 'next/link'
import CheckoutButton from '@/components/checkout/CheckoutButton'
import Navbar from '@/components/ui/Navbar'

const outcomes = [
  'Greet people respectfully with sawasdee, wai, khrap and kha',
  'Handle prices, numbers, colors and simple market questions',
  'Understand the cultural logic behind polite Thai behavior',
]

const audioFirst = [
  { title: 'Guided listening', detail: 'Short audio-style lesson blocks before the long reading.' },
  { title: 'Repeatable phrases', detail: 'Practice the exact words you will use in shops, cafés and daily greetings.' },
  { title: 'Culture notes', detail: 'Know when a phrase feels polite, casual, too direct or respectful.' },
]

const curriculum = [
  {
    week: 'Week 1',
    title: 'Greetings, wai and politeness particles',
    status: 'Free lesson',
    href: '/lessons/week-1',
    situation: 'Meeting someone respectfully',
    outcome: 'Know when to say sawasdee, when to wai, and how khrap or kha changes the feeling.',
  },
  {
    week: 'Week 2',
    title: 'Numbers, prices, colors and daily objects',
    status: 'Paid preview',
    href: '/lessons/week-2',
    situation: 'Buying something simple',
    outcome: 'Ask how much, recognize prices, and describe common things around you.',
  },
  {
    week: 'Week 3',
    title: 'Ordering food and handling spice levels',
    status: 'Included next',
    href: '#',
    situation: 'Lunch at a local shop',
    outcome: 'Order one dish clearly, ask for spice level, and respond naturally when staff answer.',
  },
  {
    week: 'Week 4',
    title: 'Temple, market and local etiquette',
    status: 'Included next',
    href: '#',
    situation: 'Moving through daily public life',
    outcome: 'Avoid awkward mistakes and understand the polite behavior locals expect.',
  },
]

const included = [
  '4 beginner modules built around real Thailand situations',
  'Audio-first phrase practice and pronunciation prompts',
  'Cultural explanations in normal English',
  'Quick quizzes to check understanding',
  'Lifetime access to the starter course updates',
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-jasmine text-tamarind">
        <section className="relative px-4 py-14 sm:py-18 md:py-24">
          <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_20%_20%,oklch(78%_0.14_84/.24),transparent_34%),radial-gradient(circle_at_82%_12%,oklch(58%_0.18_31/.16),transparent_32%)]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <p className="inline-flex min-h-11 items-center rounded-full border border-turmeric/30 bg-surface px-4 py-2 text-sm font-bold text-indigo shadow-sm shadow-tamarind/5">
                Audio-first Thai culture course · Lifetime access ฿690
              </p>
              <h1 className="mt-5 max-w-3xl text-[clamp(2.75rem,7vw,5.9rem)] font-black leading-[0.93] tracking-[-0.065em] text-tamarind text-balance">
                Learn Thai that feels respectful in real life.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-tamarind/75 text-pretty md:text-xl md:leading-9">
                A beginner starter course for foreigners in Thailand. Start with practical phrases, then learn the culture behind when and how to use them.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/lessons/week-1"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-indigo px-6 py-3 font-semibold text-surface shadow-lg shadow-indigo/20 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
                >
                  Start free lesson
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-tamarind/15 bg-surface px-6 py-3 font-semibold text-tamarind shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:border-banana hover:text-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
                >
                  See ฿690 course
                </Link>
              </div>
              <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                {['Free Week 1', '฿690 lifetime', 'Audio first', 'Culture notes'].map((point) => (
                  <div key={point} className="rounded-2xl border border-tamarind/10 bg-surface/70 p-3 shadow-sm shadow-tamarind/5">
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-temple">Course</dt>
                    <dd className="mt-1 text-sm font-semibold text-tamarind">{point}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside aria-label="Starter course offer" className="relative">
              <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-banana/15 blur-2xl" aria-hidden="true" />
              <div className="relative rounded-[2rem] border border-tamarind/10 bg-surface p-4 shadow-2xl shadow-tamarind/15 md:p-5">
                <div className="rounded-[1.5rem] bg-indigo p-5 text-surface md:p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-turmeric">Starter course</p>
                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-balance">
                    Pay once. Practice the Thai you need first.
                  </h2>
                  <p className="mt-4 max-w-prose leading-7 text-surface/82 text-pretty">
                    No heavy grammar. No tourist phrase dump. Just beginner Thai, repeated clearly, with the social rules that make it sound natural.
                  </p>
                </div>

                <div className="mt-4 grid gap-3">
                  {audioFirst.map((item, index) => (
                    <div key={item.title} className="grid gap-3 rounded-2xl border border-tamarind/10 bg-jasmine p-4 sm:grid-cols-[4rem_1fr]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-turmeric text-xl shadow-inner" aria-hidden="true">
                        {index === 0 ? '🎧' : index === 1 ? '🗣️' : '🙏'}
                      </div>
                      <div>
                        <h3 className="font-bold text-tamarind">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-tamarind/70">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <ul className="mt-5 grid gap-3 text-sm text-tamarind/75">
                  {outcomes.map((item) => (
                    <li key={item} className="flex gap-3 rounded-2xl bg-surface p-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-banana text-xs font-black text-surface" aria-hidden="true">✓</span>
                      <span className="leading-6 text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section id="curriculum" className="bg-surface px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-[0.72fr_1fr] md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-temple">Beginner curriculum</p>
                <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] text-tamarind text-balance md:text-5xl">
                  Audio first, culture always.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-tamarind/70 text-pretty">
                Each week is organized around one real-life situation, so vocabulary, etiquette and confidence grow together.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {curriculum.map((lesson, index) => {
                const isLive = lesson.href !== '#'
                const card = (
                  <article className="group h-full rounded-[1.5rem] border border-tamarind/10 bg-jasmine p-5 shadow-sm shadow-tamarind/5 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-turmeric/70 hover:shadow-lg hover:shadow-tamarind/10 md:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.14em] text-indigo">{lesson.week}</p>
                        <p className="mt-2 text-sm font-semibold text-temple">{lesson.situation}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${isLive ? 'bg-banana/12 text-banana' : 'bg-tamarind/6 text-tamarind/60'}`}>
                        {lesson.status}
                      </span>
                    </div>
                    <h3 className="mt-5 text-2xl font-black leading-tight tracking-[-0.025em] text-tamarind text-balance">{lesson.title}</h3>
                    <p className="mt-3 leading-7 text-tamarind/68 text-pretty">{lesson.outcome}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-tamarind/10 pt-4">
                      <span className="text-sm font-bold text-indigo">{isLive ? 'Open lesson' : 'Included in course'}</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-sm font-black text-temple transition group-hover:bg-turmeric group-hover:text-tamarind" aria-hidden="true">
                        {index + 1}
                      </span>
                    </div>
                  </article>
                )

                if (!isLive) {
                  return <div key={lesson.week}>{card}</div>
                }

                return (
                  <Link key={lesson.week} href={lesson.href} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                    {card}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-indigo px-4 py-16 text-surface md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-surface/10 bg-[radial-gradient(circle_at_10%_20%,oklch(78%_0.14_84/.16),transparent_32%),oklch(25%_0.11_274)] p-6 shadow-2xl shadow-indigo/30 md:grid-cols-[0.85fr_1.15fr] md:p-10">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-turmeric">Launch offer</p>
              <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] text-balance md:text-5xl">
                Thai Culture Starter Course
              </h2>
              <p className="mt-5 text-6xl font-black tracking-[-0.06em] text-turmeric">฿690</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-surface/60">One-time lifetime access</p>
            </div>
            <div className="md:pt-2">
              <p className="max-w-2xl text-lg leading-8 text-surface/78 text-pretty">
                Start with Week 1 free. Upgrade when you want the full audio-first starter path for daily Thai confidence.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl border border-surface/10 bg-surface/8 p-3 text-sm leading-6 text-surface/82">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-turmeric text-[0.68rem] font-black text-tamarind" aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start">
                <CheckoutButton>Unlock lifetime access — ฿690</CheckoutButton>
                <Link
                  href="/lessons/week-1"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-surface/18 px-6 py-3 font-bold text-surface transition duration-200 ease-out hover:-translate-y-0.5 hover:border-turmeric hover:text-turmeric focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface"
                >
                  Try Week 1 free
                </Link>
              </div>
              <p className="mt-4 text-sm leading-6 text-surface/60">
                Checkout currently starts through WhatsApp/manual payment so the course can sell before Stripe is fully configured. Video lessons can be added later; this version is intentionally audio-first.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
