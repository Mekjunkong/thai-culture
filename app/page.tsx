import Image from 'next/image'
import Link from 'next/link'
import CheckoutButton from '@/components/checkout/CheckoutButton'
import Navbar from '@/components/ui/Navbar'
import SiteFooter from '@/components/ui/SiteFooter'

export const metadata = {
  alternates: { canonical: '/' },
}

function CheckIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

const missionCards = [
  {
    title: 'Order coffee less sweet',
    time: '5 min',
    href: '/missions/order-coffee',
    emoji: '☕',
    situation: 'Cafe',
    phrase: 'ขอกาแฟเย็นหวานน้อยครับ',
    outcome: 'Order a drink politely without switching to English.',
  },
  {
    title: 'Ask the market price',
    time: '5 min',
    href: '/missions/market-price',
    emoji: '🥭',
    situation: 'Market',
    phrase: 'ราคาเท่าไหร่ครับ',
    outcome: 'Ask how much, hear a price, and buy fruit confidently.',
  },
  {
    title: 'Order food and spice level',
    time: '6 min',
    href: '/missions/order-food-spice',
    emoji: '🍜',
    situation: 'Restaurant',
    phrase: 'เอาข้าวซอยไม่เผ็ดครับ',
    outcome: 'Order one meal, choose spice level, and ask for the bill.',
  },
  {
    title: 'Tell a driver to stop',
    time: '5 min',
    href: '/missions/driver-stop',
    emoji: '🚗',
    situation: 'Transport',
    phrase: 'จอดตรงนี้ครับ',
    outcome: 'Use simple directions with Grab, songthaew, or local drivers.',
  },
]

const proofPoints = [
  { value: '5 min', label: 'short missions before long lessons' },
  { value: '2 ways', label: 'online or in-person in Chiang Mai' },
  { value: '1 phrase', label: 'practiced until it feels usable' },
]

const painPoints = [
  {
    title: 'You freeze when Thai people answer back',
    detail: 'Missions keep each situation small, so you can predict the likely reply and stay in the conversation.',
  },
  {
    title: 'Apps never correct your pronunciation',
    detail: 'Practice the rhythm first, then send a voice note or book a lesson for real human correction.',
  },
  {
    title: 'Most Thai courses feel like a classroom',
    detail: 'This one is built around cafes, markets, drivers, condos, and polite everyday life in Chiang Mai.',
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Choose one real Chiang Mai moment',
    detail: 'Pick a mission like coffee, market, food, transport, greeting, temple, or condo help.',
  },
  {
    step: '02',
    title: 'Build the phrase yourself',
    detail: 'Tap choices, read rhythm chunks, answer a mini roleplay, and finish with one usable sentence.',
  },
  {
    step: '03',
    title: 'Get corrected by a human',
    detail: 'Book a trial or send a voice note so your tones, rhythm, and polite endings become clearer.',
  },
]

const courseWeeks = [
  { href: '/lessons/week-1', label: 'Week 1', title: 'Greetings & politeness', time: '25 min' },
  { href: '/lessons/week-2', label: 'Week 2', title: 'Numbers, prices & objects', time: '30 min' },
  { href: '/lessons/week-3', label: 'Week 3', title: 'Food, coffee & spice levels', time: '30 min' },
  { href: '/lessons/week-4', label: 'Week 4', title: 'Transport & local etiquette', time: '30 min' },
]

const lessonOptions = [
  {
    name: 'Free missions & course',
    price: '฿0',
    tag: 'Start here',
    detail: 'Interactive missions, the practice app, and a 4-week beginner course. No login, no credit card.',
    cta: 'Start learning free',
    href: '/missions',
    featured: false,
  },
  {
    name: '30-minute trial',
    price: '฿199 online · ฿299 in person',
    tag: 'Best first lesson',
    detail: 'Friendly level check, one practical situation, and personal speaking correction from a real teacher.',
    cta: 'Book trial',
    href: '/book',
    featured: true,
  },
  {
    name: 'Starter Pack',
    price: '฿990 online · ฿1,290 in person',
    tag: 'Most useful',
    detail: 'One private lesson, 50 Chiang Mai phrases, all missions, and 7 days of WhatsApp voice practice.',
    cta: 'Book Starter Pack',
    href: '/book',
    featured: false,
  },
]

const lessonFormats = [
  'Online Thai lessons by video call',
  'In-person Thai lessons in Chiang Mai cafes and markets',
  'WhatsApp voice-note pronunciation correction',
  'Printable workbook with QR mission cards and roleplays',
]

const faqs = [
  {
    question: 'Is this for complete beginners?',
    answer: 'Yes. Start with zero Thai. Each mission teaches one practical phrase and one simple roleplay.',
  },
  {
    question: 'Is it online or in person?',
    answer: 'Both. Missions and the free course are online. Private lessons can be online or in person in Chiang Mai.',
  },
  {
    question: 'How do I fix my pronunciation?',
    answer: 'Practice rhythm chunks first, then send a WhatsApp voice note or book a trial. A real teacher corrects your tones and polite endings.',
  },
  {
    question: 'What should I do first?',
    answer: 'Start with the coffee or market mission. If it feels useful, book a 30-minute trial for personal correction.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      name: 'Thai Lessons Chiang Mai',
      description:
        'Practical Thai lessons for expats and travelers, online and in person in Chiang Mai. Free interactive missions, a 4-week beginner course, and private lessons with human correction.',
      url: 'https://thailessonschiangmai.com',
      areaServed: 'Chiang Mai, Thailand',
      priceRange: '฿199–฿2,500',
      makesOffer: [
        { '@type': 'Offer', name: '30-minute trial lesson', price: '199', priceCurrency: 'THB' },
        { '@type': 'Offer', name: 'Starter Pack', price: '990', priceCurrency: 'THB' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="bg-jasmine text-tamarind">
        <section className="px-4 py-10 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <p className="inline-flex min-h-11 items-center rounded-full border border-tamarind/10 bg-surface px-4 py-2 text-sm font-black text-indigo shadow-sm">
                Thai lessons for expats · Chiang Mai + online
              </p>
              <h1 className="mt-6 max-w-4xl text-[clamp(2.8rem,10vw,6.4rem)] font-black leading-[0.92] tracking-[-0.06em] text-tamarind text-balance">
                Speak useful Thai before your next coffee order.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-tamarind/75 text-pretty md:text-xl md:leading-9">
                Learn Thai through tiny real-life missions for cafes, markets, drivers, food, condos, and polite everyday Chiang Mai moments.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/missions/order-coffee"
                  className="inline-flex min-h-13 items-center justify-center rounded-2xl bg-indigo px-7 py-4 font-black text-surface shadow-lg shadow-indigo/20 transition duration-150 ease-out hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
                >
                  Try a free 5-minute mission
                </Link>
                <Link
                  href="/book"
                  className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-tamarind/15 bg-surface px-7 py-4 font-black text-tamarind shadow-sm transition duration-150 ease-out hover:border-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
                >
                  Book a trial lesson
                </Link>
              </div>

              <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                {proofPoints.map(item => (
                  <div key={item.label} className="rounded-2xl border border-tamarind/10 bg-surface p-4 shadow-sm">
                    <p className="text-2xl font-black text-indigo">{item.value}</p>
                    <p className="mt-1 text-sm leading-6 text-tamarind/65 text-pretty">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside aria-label="Thai lesson preview" className="rounded-[2rem] border border-tamarind/10 bg-surface p-4 shadow-2xl shadow-tamarind/10">
              <Image
                src="/assets/images/thai-culture-homepage-banner.png"
                alt="Thai learning setup with notebook, drink, and Chiang Mai style study material"
                width={1536}
                height={1024}
                priority
                className="h-64 w-full rounded-[1.5rem] object-cover md:h-80"
              />
              <div className="p-3 md:p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-jasmine px-3 py-1 text-xs font-black uppercase text-temple">Mission preview</span>
                  <span className="rounded-full bg-jasmine px-3 py-1 text-xs font-black text-indigo">5 minutes</span>
                </div>
                <h2 className="mt-3 text-3xl font-black leading-tight text-balance">Order iced coffee less sweet in Thai.</h2>
                <div className="mt-4 rounded-2xl bg-indigo p-4 text-surface">
                  <p className="text-2xl font-black">ขอกาแฟเย็นหวานน้อยครับ</p>
                  <p className="mt-2 text-sm text-surface/80">khǎaw gaa-fae yen wǎan nói khrap</p>
                  <p className="mt-2 text-sm text-surface/80">I’d like iced coffee, less sweet, please.</p>
                </div>
                <div className="mt-4 grid gap-2 text-sm font-bold text-tamarind/70 sm:grid-cols-3">
                  {['Build phrase', 'Mini quiz', 'Voice note'].map(item => (
                    <p key={item} className="flex items-center gap-2 rounded-xl bg-jasmine px-3 py-2">
                      <CheckIcon className="size-4 shrink-0 text-banana" />
                      {item}
                    </p>
                  ))}
                </div>
                <Link href="/missions/order-coffee" className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-turmeric px-5 py-3 font-black text-tamarind transition duration-150 ease-out hover:bg-turmeric-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo">
                  Try this mission
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <section aria-label="Why learning Thai feels hard" className="px-4 pb-14">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-tamarind/10 bg-surface p-6 md:p-10">
            <p className="text-sm font-black uppercase text-temple">Sound familiar?</p>
            <div className="mt-6 grid gap-8 md:grid-cols-3 md:gap-6">
              {painPoints.map((point, index) => (
                <div key={point.title} className={index > 0 ? 'border-t border-tamarind/10 pt-8 md:border-l md:border-t-0 md:pl-6 md:pt-0' : ''}>
                  <h2 className="text-xl font-black leading-tight text-balance">{point.title}</h2>
                  <p className="mt-3 leading-7 text-tamarind/70 text-pretty">{point.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="missions" className="bg-surface px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase text-temple">Free Thai missions</p>
                <h2 className="mt-3 max-w-2xl text-4xl font-black leading-tight tracking-[-0.04em] text-balance md:text-5xl">
                  Learn by doing one real situation at a time.
                </h2>
                <p className="mt-4 max-w-2xl leading-8 text-tamarind/70 text-pretty">
                  Every mission is a small practical win: phrase, meaning, rhythm, and one mini challenge. Prefer flashcards and quizzes? Open the practice app.
                </p>
              </div>
              <Link href="/practice" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-tamarind/15 px-5 py-3 font-black text-indigo transition duration-150 ease-out hover:border-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                Open practice app
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {missionCards.map(mission => (
                <Link key={mission.title} href={mission.href} className="group block rounded-[1.5rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                  <article className="h-full rounded-[1.5rem] border border-turmeric bg-banana/10 p-5 shadow-sm transition duration-150 ease-out group-hover:shadow-lg">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-surface text-2xl shadow-inner" aria-hidden="true">{mission.emoji}</span>
                      <span className="rounded-full bg-surface px-3 py-1 text-xs font-black text-indigo">Free · {mission.time}</span>
                    </div>
                    <p className="mt-5 text-xs font-black uppercase text-temple">{mission.situation}</p>
                    <h3 className="mt-2 text-2xl font-black leading-tight text-balance">{mission.title}</h3>
                    <div className="mt-4 rounded-2xl bg-indigo p-4 text-surface">
                      <p className="text-lg font-black">{mission.phrase}</p>
                    </div>
                    <p className="mt-4 min-h-20 text-sm leading-6 text-tamarind/70 text-pretty">{mission.outcome}</p>
                    <p className="mt-5 border-t border-tamarind/10 pt-4 font-black text-indigo">Start mission →</p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="free-course-heading" className="px-4 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase text-temple">Free 4-week course</p>
              <h2 id="free-course-heading" className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] text-balance md:text-5xl">
                Want structure? Follow the beginner path.
              </h2>
              <p className="mt-5 text-lg leading-8 text-tamarind/72 text-pretty">
                Four weekly lessons with audio practice, cultural explanations, and a quiz at the end of each week. Completely free.
              </p>
              <Link href="/lessons" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-indigo px-6 py-3 font-black text-surface transition duration-150 ease-out hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                See the full course →
              </Link>
            </div>
            <ol className="grid gap-3">
              {courseWeeks.map((week, index) => (
                <li key={week.href}>
                  <Link href={week.href} className="group flex items-center gap-4 rounded-2xl border border-tamarind/10 bg-surface p-4 shadow-sm transition duration-150 ease-out hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                    <span aria-hidden="true" className={`text-4xl font-black tracking-[-0.04em] ${index === 0 ? 'text-turmeric' : 'text-tamarind/15'}`}>{index + 1}</span>
                    <span className="flex-1">
                      <span className="block text-xs font-black uppercase text-temple">{week.label} · {week.time}</span>
                      <span className="mt-1 block text-lg font-black leading-tight">{week.title}</span>
                    </span>
                    <span className="font-black text-indigo transition duration-150 ease-out group-hover:translate-x-1" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="how-it-works" className="bg-surface px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-black uppercase text-temple">How it works</p>
              <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] text-balance md:text-5xl">
                A simple path from shy beginner to small real conversations.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {howItWorks.map(item => (
                <article key={item.step} className="rounded-[1.5rem] border border-tamarind/10 bg-jasmine p-6">
                  <p className="text-5xl font-black text-turmeric">{item.step}</p>
                  <h3 className="mt-4 text-2xl font-black leading-tight text-balance">{item.title}</h3>
                  <p className="mt-3 leading-7 text-tamarind/70 text-pretty">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-indigo px-4 py-16 text-surface md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase text-turmeric">Thai for expat life</p>
              <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] text-balance md:text-5xl">
                Not textbook Thai. Thai you can use this week.
              </h2>
              <p className="mt-5 text-lg leading-8 text-surface/78 text-pretty">
                Lessons focus on useful spoken Thai, polite endings, cultural feeling, and confidence in everyday Chiang Mai moments.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {lessonFormats.map(format => (
                <div key={format} className="flex gap-3 rounded-2xl border border-surface/10 bg-surface/10 p-5">
                  <CheckIcon className="size-5 shrink-0 text-turmeric" />
                  <p className="font-bold leading-7 text-surface/90 text-pretty">{format}</p>
                </div>
              ))}
              <a href="/products/onsite-chiang-mai-thai-lesson-pack.pdf" className="rounded-2xl border border-turmeric/40 bg-turmeric p-5 font-black text-tamarind transition duration-150 ease-out hover:bg-turmeric-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface sm:col-span-2">
                Download the free onsite workbook →
              </a>
            </div>
          </div>
        </section>

        <section id="pricing" className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase text-temple">Lessons & pricing</p>
                <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] text-balance md:text-5xl">
                  Start free. Book help when you want real feedback.
                </h2>
              </div>
              <CheckoutButton>Ask on WhatsApp</CheckoutButton>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {lessonOptions.map(option => (
                <article key={option.name} className={`flex flex-col rounded-[1.5rem] border p-6 shadow-sm ${option.featured ? 'border-turmeric bg-surface shadow-lg shadow-tamarind/10' : 'border-tamarind/10 bg-surface'}`}>
                  <p className="inline-flex self-start rounded-full bg-jasmine px-3 py-1 text-xs font-black uppercase text-temple">{option.tag}</p>
                  <h3 className="mt-5 text-2xl font-black leading-tight text-balance">{option.name}</h3>
                  <p className="mt-3 text-2xl font-black text-indigo md:text-3xl">{option.price}</p>
                  <p className="mb-6 mt-4 flex-1 leading-7 text-tamarind/70 text-pretty">{option.detail}</p>
                  <Link href={option.href} className={`inline-flex min-h-12 items-center justify-center rounded-2xl px-5 py-3 font-black transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${option.featured ? 'bg-turmeric text-tamarind hover:bg-turmeric-bright focus-visible:outline-indigo' : 'bg-indigo text-surface hover:bg-indigo-soft focus-visible:outline-turmeric'}`}>
                    {option.cta}
                  </Link>
                </article>
              ))}
            </div>
            <p className="mt-6 text-center leading-7 text-tamarind/65">
              Staying longer in Chiang Mai?{' '}
              <Link href="/products" className="font-black text-indigo underline decoration-turmeric underline-offset-4 hover:text-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                See the Mission Walk and 5-lesson path
              </Link>
              .
            </p>
          </div>
        </section>

        <section aria-label="What happens around each lesson" className="bg-surface px-4 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase text-temple">A real lesson system</p>
              <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] text-balance md:text-5xl">
                Prepared before class. Clear notes after class.
              </h2>
              <p className="mt-5 text-lg leading-8 text-tamarind/72 text-pretty">
                Paid lessons are not casual chats. You share your situation before we meet, and you leave every session with written corrections, homework, and a clear next step.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-turmeric bg-banana/10 p-5">
                <p className="text-sm font-black uppercase text-temple">Before your lesson</p>
                <h3 className="mt-3 text-2xl font-black text-indigo">Tell us your real life</h3>
                <p className="mt-3 leading-7 text-tamarind/70 text-pretty">Share your level, goals, and the situations you actually face, so your first lesson starts with the right mission.</p>
              </div>
              <div className="rounded-[1.5rem] border border-tamarind/10 bg-jasmine p-5">
                <p className="text-sm font-black uppercase text-temple">After your lesson</p>
                <h3 className="mt-3 text-2xl font-black text-indigo">Get a lesson report</h3>
                <p className="mt-3 leading-7 text-tamarind/70 text-pretty">Corrections, your personal phrase bank, homework, a confidence score, and the next mission to try in real life.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="rounded-[2rem] border border-tamarind/10 bg-surface p-4 shadow-xl shadow-tamarind/10">
              <Image
                src="/assets/images/thai-culture-homepage-photo.png"
                alt="Friendly Thai tutor helping an adult learner practice Thai phrases"
                width={1536}
                height={1024}
                className="h-72 w-full rounded-[1.5rem] object-cover md:h-96"
              />
            </div>
            <div>
              <p className="text-sm font-black uppercase text-temple">Why learners like this style</p>
              <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] text-balance md:text-5xl">
                Small missions make Thai feel less scary.
              </h2>
              <p className="mt-5 text-lg leading-8 text-tamarind/72 text-pretty">
                You do not need to memorize a giant grammar lesson. You need one useful phrase, the right polite feeling, and enough confidence to try it in real life.
              </p>
              <ul className="mt-6 grid gap-3">
                {['Beginner-friendly and practical', 'Built around Chiang Mai situations', 'Clear path from free practice to private lessons'].map(point => (
                  <li key={point} className="flex gap-3 rounded-2xl border border-tamarind/10 bg-surface p-4 shadow-sm">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-banana text-surface">
                      <CheckIcon className="size-3.5" />
                    </span>
                    <span className="leading-6 text-tamarind/76 text-pretty">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-surface px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-sm font-black uppercase text-temple">Questions</p>
            <h2 className="mt-3 text-center text-4xl font-black leading-tight tracking-[-0.04em] text-balance md:text-5xl">
              Quick answers before you start.
            </h2>
            <div className="mt-10 grid gap-3">
              {faqs.map(faq => (
                <article key={faq.question} className="rounded-[1.5rem] border border-tamarind/10 bg-jasmine p-6">
                  <h3 className="text-xl font-black text-indigo">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-tamarind/70 text-pretty">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-indigo p-6 text-center text-surface shadow-2xl shadow-tamarind/15 md:p-10">
            <p className="text-sm font-black uppercase text-turmeric">Ready to try?</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] text-balance md:text-5xl">
              Complete one free Thai mission today.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-surface/78 text-pretty">
              Start with coffee or market Thai. When you want feedback, book a 30-minute trial lesson.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/missions/order-coffee" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-turmeric px-6 py-3 font-black text-tamarind transition duration-150 ease-out hover:bg-turmeric-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface">
                Start the coffee mission
              </Link>
              <Link href="/book" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-surface/20 px-6 py-3 font-black text-surface transition duration-150 ease-out hover:border-turmeric focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
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
