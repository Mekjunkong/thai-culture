import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import SiteFooter from '@/components/ui/SiteFooter'

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

const eyebrow = 'text-xs font-medium uppercase tracking-[.14em] text-clay'

const weeks = [
  {
    number: 1,
    href: '/lessons/week-1',
    title: 'Greetings & politeness',
    meta: 'Week 1 · 25 min · Free',
    cta: 'Start →',
  },
  {
    number: 2,
    href: '/lessons/week-2',
    title: 'Numbers, prices & objects',
    meta: 'Week 2 · 30 min',
    cta: 'Continue →',
  },
  {
    number: 3,
    href: '/lessons/week-3',
    title: 'Food, coffee & spice levels',
    meta: 'Week 3 · 30 min',
    cta: 'Continue →',
  },
  {
    number: 4,
    href: '/lessons/week-4',
    title: 'Transport & local etiquette',
    meta: 'Week 4 · 30 min',
    cta: 'Continue →',
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
      <main className="bg-paper font-public text-ink">
        <div className="mx-auto max-w-[1180px] px-6 pt-16">
          <span className={eyebrow}>Free 4-week course</span>
          <h1 className="mt-4 max-w-[16ch] font-serif text-4xl font-bold leading-[1.15] text-ink sm:text-5xl">
            Want structure? Follow the beginner path.
          </h1>
          <p className="mt-[18px] max-w-[52ch] text-base leading-[1.7] text-ink/68">
            Four weekly lessons with audio practice, cultural notes, and a short
            quiz. Completely free.
          </p>
        </div>

        <div className="mx-auto max-w-[1180px] px-6 py-14">
          {weeks.map((week, index) => (
            <Link
              key={week.href}
              href={week.href}
              className={`flex items-center gap-6 border-t border-ink/12 py-7 hover:text-clay ${
                index === weeks.length - 1 ? 'border-b' : ''
              }`}
            >
              <span
                className={`font-serif text-4xl ${index === 0 ? 'text-clay' : 'text-ink/18'}`}
              >
                {week.number}
              </span>
              <span className="flex-1">
                <span className="block text-xs font-semibold text-ink/50">{week.meta}</span>
                <span className="mt-1.5 block font-serif text-[22px] text-ink">{week.title}</span>
              </span>
              <span className="text-sm font-semibold">{week.cta}</span>
            </Link>
          ))}
        </div>

        <div className="mx-6 mb-16 bg-ink px-12 py-14 text-center text-paper">
          <p className="font-serif text-2xl italic">Prefer real situations to lectures?</p>
          <Link
            href="/missions"
            className="mt-5 inline-flex min-h-11 items-center justify-center bg-clay px-7 py-3.5 text-sm font-semibold text-paper transition-opacity duration-150 ease-out hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            Try the free missions instead
          </Link>
        </div>

        <div className="mx-auto max-w-[1180px] px-6 pb-16">
          <div className="flex flex-col items-center justify-between gap-4 border-t border-ink/12 pt-8 text-center sm:flex-row sm:text-left">
            <div>
              <span className={eyebrow}>After the course</span>
              <p className="mt-2 max-w-md text-base leading-[1.7] text-ink/68">
                Reading is the start. Book a 30-minute trial and a real teacher will
                check your tones, rhythm, and polite endings.
              </p>
            </div>
            <Link
              href="/book"
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-opacity duration-150 ease-out hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
            >
              Book a trial lesson
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
