import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import SiteFooter from '@/components/ui/SiteFooter'

export const metadata: Metadata = {
  title: 'Guided Starter Course | Thai Lessons Chiang Mai',
  description:
    'Explore the free preview path for the Guided Starter Course: four weeks of practical beginner Thai, with audio where available, quizzes, practice materials, and real-life missions.',
  alternates: { canonical: '/lessons' },
  openGraph: {
    title: 'Guided Starter Course | Thai Lessons Chiang Mai',
    description:
      'A four-week self-study path for useful beginner Thai in Chiang Mai. Explore the free preview and request manual access to the full course.',
    url: '/lessons',
    type: 'website',
  },
}

const eyebrow = 'text-xs font-medium uppercase tracking-[.14em] text-clay'

const weeks = [
  { number: 1, href: '/lessons/week-1', title: 'Greetings & politeness', meta: 'Week 1 · 25 min · Free preview', cta: 'Start →' },
  { number: 2, href: '/lessons/week-2', title: 'Numbers, prices, colors & objects', meta: 'Week 2 · 30 min · Free preview', cta: 'Explore →' },
  { number: 3, href: '/lessons/week-3', title: 'Food, coffee & spice levels', meta: 'Week 3 · 35 min · Free preview', cta: 'Explore →' },
  { number: 4, href: '/lessons/week-4', title: 'Transport & local etiquette', meta: 'Week 4 · 40 min · Free preview', cta: 'Explore →' },
]

const courseStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Guided Starter Course',
  description: 'A four-week self-study path for practical beginner Thai.',
  provider: { '@type': 'Organization', name: 'Thai Lessons Chiang Mai', url: 'https://thailessonschiangmai.com' },
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'THB' },
  hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'PT2H' },
}

export default function LessonsIndexPage() {
  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseStructuredData) }} />
      <main className="bg-paper font-public text-ink">
        <section className="mx-auto max-w-[1180px] px-6 pb-14 pt-16 md:pt-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <span className={eyebrow}>Guided Starter Course · self-study</span>
              <h1 className="mt-4 max-w-[13ch] font-serif text-5xl font-bold leading-[1.05] text-ink sm:text-6xl">
                Your first month of useful Thai.
              </h1>
              <p className="mt-5 max-w-[52ch] text-lg leading-[1.7] text-ink/68">
                A calm, four-week path from polite greetings to ordering food, asking prices, and getting around Chiang Mai. Learn at your own pace with lessons, practice, quizzes, and missions.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/book?product=guided-starter-course" className="inline-flex min-h-12 items-center justify-center bg-clay px-6 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">
                  Request the course · ฿690
                </Link>
                <a href="#weeks" className="inline-flex min-h-12 items-center justify-center border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-clay hover:text-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">
                  See the free preview
                </a>
              </div>
            </div>
            <div className="border-l-2 border-honey bg-jasmine/55 p-6 md:p-8">
              <p className={eyebrow}>What this is</p>
              <p className="mt-3 font-serif text-2xl leading-tight">One-time, self-study access to a guided beginner path.</p>
              <p className="mt-4 text-sm leading-6 text-ink/68">The course is ฿690 with lifetime access after Mike confirms payment and grants access manually. This page is a request, not an automatic checkout or instant access.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-ink/10 bg-sand/10 px-6 py-12" aria-labelledby="included-heading">
          <div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-2">
            <div>
              <p className={eyebrow}>Inside the course</p>
              <h2 id="included-heading" className="mt-3 font-serif text-3xl">A repeatable weekly rhythm.</h2>
              <ul className="mt-5 grid gap-3 text-base leading-7 text-ink/75">
                <li><strong className="text-ink">Learn:</strong> Thai script, useful romanization, meanings, and local context.</li>
                <li><strong className="text-ink">Practice:</strong> phrase drills, roleplay, practice materials, and missions.</li>
                <li><strong className="text-ink">Check:</strong> short quizzes with feedback and retry.</li>
                <li><strong className="text-ink">Listen:</strong> real audio where a reviewed recording exists; coverage is not promised for every lesson.</li>
              </ul>
            </div>
            <div className="border border-ink/10 bg-surface p-6">
              <p className={eyebrow}>Please expect</p>
              <p className="mt-3 text-base leading-7 text-ink/75">This is independent study, not a private teaching package. It does not include private lessons, WhatsApp voice correction, personal coaching, or a promise of fluency.</p>
              <Link href="/book?product=guided-starter-course" className="mt-6 inline-flex min-h-11 items-center justify-center bg-ink px-5 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">Send a manual access request →</Link>
            </div>
          </div>
        </section>

        <section id="weeks" className="mx-auto max-w-[1180px] px-6 py-14" aria-labelledby="weeks-heading">
          <p className={eyebrow}>Free preview path</p>
          <h2 id="weeks-heading" className="mt-3 font-serif text-3xl">Start anywhere. Follow the order for momentum.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-ink/68">The existing lesson pages stay open as previews while manual access is being handled. No sign-in or payment is required to explore them.</p>
          <div className="mt-8">
            {weeks.map((week, index) => (
              <Link key={week.href} href={week.href} className={`flex items-center gap-5 border-t border-ink/12 py-6 transition-colors hover:text-clay ${index === weeks.length - 1 ? 'border-b' : ''}`}>
                <span className={`font-serif text-4xl ${index === 0 ? 'text-clay' : 'text-ink/25'}`}>{week.number}</span>
                <span className="flex-1"><span className="block text-xs font-semibold text-ink/50">{week.meta}</span><span className="mt-1 block font-serif text-[22px] text-ink">{week.title}</span></span>
                <span className="text-sm font-semibold">{week.cta}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-6 mb-16 bg-ink px-6 py-12 text-center text-paper md:px-12">
          <p className={eyebrow + ' text-honey'}>Want the guided bundle?</p>
          <h2 className="mx-auto mt-3 max-w-[18ch] font-serif text-3xl">Request Guided Starter Course access.</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-paper/75">Choose the course in the intake form. Mike will confirm payment and access manually; sending the form does not complete a purchase.</p>
          <Link href="/book?product=guided-starter-course" className="mt-6 inline-flex min-h-12 items-center justify-center bg-honey px-7 py-3.5 text-sm font-semibold text-ink transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-honey">Request ฿690 lifetime access</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
