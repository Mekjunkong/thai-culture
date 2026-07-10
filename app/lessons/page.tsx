import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import SiteFooter from '@/components/ui/SiteFooter'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Free 4-Week Beginner Thai Course | Thai Lessons Chiang Mai',
  description:
    'A free structured beginner Thai course: greetings and politeness, numbers and prices, ordering food and coffee, transport and local etiquette. Audio, culture notes, and quizzes included.',
  alternates: { canonical: '/lessons' },
  openGraph: {
    title: 'Free 4-Week Beginner Thai Course',
    description:
      'Four structured beginner lessons with audio, cultural context, and quizzes. Start speaking polite, useful Thai this week.',
    url: '/lessons',
    type: 'website',
  },
}

const weeks = [
  {
    number: 'Week 1',
    href: '/lessons/week-1',
    title: 'Greetings & politeness particles',
    outcome: 'Greet anyone naturally with sawasdee, use the wai correctly, and end sentences politely with khrap or kha.',
    situations: 'First meetings, shops, neighbors',
    time: '25 min',
  },
  {
    number: 'Week 2',
    href: '/lessons/week-2',
    title: 'Numbers, prices, colors & objects',
    outcome: 'Understand prices when vendors answer, count confidently, and name the everyday things you actually buy.',
    situations: 'Markets, 7-Eleven, street stalls',
    time: '30 min',
  },
  {
    number: 'Week 3',
    href: '/lessons/week-3',
    title: 'Ordering food, coffee & spice levels',
    outcome: 'Order a full meal your way: spice level, sweetness, eat here or takeaway, and ask for the bill.',
    situations: 'Cafes, restaurants, food courts',
    time: '30 min',
  },
  {
    number: 'Week 4',
    href: '/lessons/week-4',
    title: 'Transport, temples & local etiquette',
    outcome: 'Direct drivers, ask for help politely, and feel at ease with temple and market etiquette.',
    situations: 'Grab, songthaews, temples',
    time: '30 min',
  },
]

const courseStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Free 4-Week Beginner Thai Course',
  description:
    'A free structured beginner Thai course covering greetings and politeness, numbers and prices, ordering food and coffee, and transport and local etiquette. Includes audio practice, cultural context, and quizzes.',
  provider: {
    '@type': 'Organization',
    name: 'Thai Lessons Chiang Mai',
    url: 'https://thailessonschiangmai.com',
  },
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'THB' },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'PT2H',
  },
}

export default function LessonsIndexPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseStructuredData) }}
      />
      <main className="bg-jasmine text-tamarind">
        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <p className="inline-flex min-h-11 items-center rounded-full border border-tamarind/10 bg-surface px-4 py-2 text-sm font-black text-indigo shadow-sm">
              Free course · No login, no credit card
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-none tracking-[-0.05em] text-balance md:text-7xl">
              The free 4-week beginner Thai course.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-tamarind/72 text-pretty md:text-xl md:leading-9">
              Four structured lessons with audio practice, cultural context, and a
              quiz at the end of each week. Everything is chosen for real life in
              Thailand, not a textbook.
            </p>
          </div>
        </section>

        <section aria-label="Course weeks" className="px-4 pb-16 md:pb-20">
          <div className="mx-auto max-w-6xl">
            <ol className="grid gap-4">
              {weeks.map((week, index) => (
                <Reveal key={week.href} index={index}>
                  <li>
                    <Link
                      href={week.href}
                      className="group block rounded-[1.75rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
                    >
                      <article className="grid gap-5 rounded-[1.75rem] border border-tamarind/10 bg-surface p-6 shadow-sm transition duration-150 ease-out group-hover:-translate-y-0.5 group-hover:shadow-lg md:grid-cols-[auto_1fr_auto] md:items-center md:p-8">
                        <p
                          aria-hidden="true"
                          className={`text-6xl font-black tracking-[-0.05em] md:text-7xl ${index === 0 ? 'text-turmeric' : 'text-tamarind/15'}`}
                        >
                          {index + 1}
                        </p>
                        <div>
                          <p className="text-sm font-bold text-temple">
                            {week.number} · {week.time}
                          </p>
                          <h2 className="mt-2 text-2xl font-black leading-tight text-balance md:text-3xl">
                            {week.title}
                          </h2>
                          <p className="mt-3 max-w-2xl leading-7 text-tamarind/70 text-pretty">
                            {week.outcome}
                          </p>
                          <p className="mt-3 text-sm font-bold text-indigo">
                            Where you will use it: {week.situations}
                          </p>
                        </div>
                        <p className="font-black text-indigo transition duration-150 ease-out group-hover:translate-x-1 md:justify-self-end">
                          Start {week.number.toLowerCase()} →
                        </p>
                      </article>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-4 pb-20 md:pb-24">
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-indigo p-6 text-surface md:p-10">
            <div className="grid gap-6 md:grid-cols-[1.2fr_auto] md:items-center">
              <div>
                <p className="text-sm font-bold text-turmeric">After the course</p>
                <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight tracking-[-0.03em] text-balance md:text-4xl">
                  Reading is the start. Speaking with correction is the upgrade.
                </h2>
                <p className="mt-4 max-w-2xl leading-8 text-surface/78 text-pretty">
                  Book a 30-minute trial and a real teacher will check your tones,
                  rhythm, and polite endings on the phrases you just learned.
                </p>
              </div>
              <Link
                href="/book"
                className="inline-flex min-h-13 items-center justify-center rounded-2xl bg-turmeric px-7 py-4 font-black text-tamarind transition duration-150 ease-out hover:bg-turmeric-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface md:justify-self-end"
              >
                Book a trial lesson
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
