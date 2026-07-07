import Image from 'next/image'
import Link from 'next/link'
import CheckoutButton from '@/components/checkout/CheckoutButton'
import Navbar from '@/components/ui/Navbar'

const missionCards = [
  {
    title: 'Order coffee less sweet',
    time: '5 min',
    href: '/missions/order-coffee',
    emoji: '☕',
    situation: 'Cafe',
    phrase: 'ขอกาแฟเย็นหวานน้อยครับ',
    outcome: 'Order a drink politely without switching to English.',
    status: 'Live',
  },
  {
    title: 'Ask the market price',
    time: '5 min',
    href: '/missions/market-price',
    emoji: '🥭',
    situation: 'Market',
    phrase: 'ราคาเท่าไหร่ครับ',
    outcome: 'Ask how much, hear a price, and buy fruit confidently.',
    status: 'Live',
  },
  {
    title: 'Say hello politely',
    time: '3 min',
    href: '/lessons/week-1',
    emoji: '🙏',
    situation: 'First meeting',
    phrase: 'สวัสดีครับ / ค่ะ',
    outcome: 'Greet neighbors, staff, and Thai friends naturally.',
    status: 'Lesson',
  },
  {
    title: 'Tell a driver to stop',
    time: '5 min',
    href: '/lessons/week-4',
    emoji: '🚗',
    situation: 'Transport',
    phrase: 'จอดตรงนี้ครับ',
    outcome: 'Use simple directions with Grab, songthaew, or local drivers.',
    status: 'Lesson',
  },
]

const proofPoints = [
  { value: '5 min', label: 'short missions before long lessons' },
  { value: '2 ways', label: 'online or in-person in Chiang Mai' },
  { value: '1 phrase', label: 'practice until it feels usable' },
]

const painPoints = [
  {
    title: 'You freeze when Thai people answer back',
    detail: 'Missions keep the situation small so you can predict the likely reply.',
  },
  {
    title: 'Pronunciation feedback is missing',
    detail: 'Use rhythm chunks first, then send a voice note for human correction.',
  },
  {
    title: 'Most Thai courses feel too classroom-heavy',
    detail: 'This is built for cafes, markets, drivers, condos, restaurants, and polite daily life.',
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

const lessonOptions = [
  {
    name: 'Free missions',
    price: '฿0',
    tag: 'Start here',
    detail: 'Try short interactive missions online. No login, no credit card, and no long lecture.',
    cta: 'Open missions',
    href: '/missions',
    featured: false,
  },
  {
    name: '30-minute trial',
    price: '฿199 online / ฿299 in person',
    tag: 'Best first lesson',
    detail: 'Friendly level check, one practical situation, and personal speaking correction.',
    cta: 'Book trial',
    href: '#pricing',
    featured: true,
  },
  {
    name: 'Starter Pack',
    price: '฿990 online / ฿1,290 in person',
    tag: 'Most useful',
    detail: 'One private lesson, 50 Chiang Mai phrases, missions, and 7 days of WhatsApp voice practice.',
    cta: 'Book pack',
    href: '#pricing',
    featured: false,
  },
]

const lessonFormats = [
  'Online Thai lessons by video call',
  'In-person Thai lessons in Chiang Mai cafes',
  'WhatsApp voice-note pronunciation correction',
  'Practical Thai phrasebook and mission practice',
]

const faqs = [
  {
    question: 'Is this for complete beginners?',
    answer: 'Yes. Start with zero Thai. Each mission teaches one practical phrase and one simple roleplay.',
  },
  {
    question: 'Is it online or offline?',
    answer: 'Both. Free missions are online. Private lessons can be online or in person in Chiang Mai.',
  },
  {
    question: 'Why not focus on robot voices?',
    answer: 'Some browser Thai voices sound unnatural. The site uses rhythm practice and human voice correction as the main pronunciation path.',
  },
  {
    question: 'What should I do first?',
    answer: 'Start with the coffee or market mission. If it feels useful, book a 30-minute trial for personal correction.',
  },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
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
                  Start free coffee mission
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-tamarind/15 bg-surface px-7 py-4 font-black text-tamarind shadow-sm transition duration-150 ease-out hover:border-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
                >
                  Book human correction
                </Link>
              </div>

              <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                {proofPoints.map((item) => (
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
                  {['Build phrase', 'Mini quiz', 'Voice note'].map((item) => (
                    <p key={item} className="rounded-xl bg-jasmine px-3 py-2">✓ {item}</p>
                  ))}
                </div>
                <Link href="/missions/order-coffee" className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-turmeric px-5 py-3 font-black text-tamarind transition duration-150 ease-out hover:bg-turmeric-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo">
                  Try this mission
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <section className="px-4 pb-14">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            {painPoints.map((point) => (
              <article key={point.title} className="rounded-[1.5rem] border border-tamarind/10 bg-surface p-5 shadow-sm">
                <p className="text-sm font-black uppercase text-temple">Common problem</p>
                <h2 className="mt-3 text-xl font-black leading-tight text-balance">{point.title}</h2>
                <p className="mt-3 leading-7 text-tamarind/70 text-pretty">{point.detail}</p>
              </article>
            ))}
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
                  Every card is a small practical win: phrase, meaning, rhythm, and one mini challenge.
                </p>
              </div>
              <Link href="/missions" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-tamarind/15 px-5 py-3 font-black text-indigo transition duration-150 ease-out hover:border-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                See all missions
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {missionCards.map((mission, index) => (
                <Link key={mission.title} href={mission.href} className="group block rounded-[1.5rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                  <article className={`h-full rounded-[1.5rem] border p-5 shadow-sm transition duration-150 ease-out group-hover:shadow-lg ${index < 2 ? 'border-turmeric bg-banana/10' : 'border-tamarind/10 bg-jasmine'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-surface text-2xl shadow-inner" aria-hidden="true">{mission.emoji}</span>
                      <span className="rounded-full bg-surface px-3 py-1 text-xs font-black text-indigo">{mission.status} · {mission.time}</span>
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

        <section id="how-it-works" className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-black uppercase text-temple">How it works</p>
              <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] text-balance md:text-5xl">
                A simple path from shy beginner to small real conversations.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {howItWorks.map((item) => (
                <article key={item.step} className="rounded-[1.5rem] border border-tamarind/10 bg-surface p-6 shadow-sm">
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
              {lessonFormats.map((format) => (
                <div key={format} className="rounded-2xl border border-surface/10 bg-surface/10 p-5">
                  <p className="font-black text-turmeric">✓</p>
                  <p className="mt-2 font-bold leading-7 text-surface/90 text-pretty">{format}</p>
                </div>
              ))}
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
              <CheckoutButton>Book on WhatsApp</CheckoutButton>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {lessonOptions.map((option) => (
                <article key={option.name} className={`rounded-[1.5rem] border p-6 shadow-sm ${option.featured ? 'border-turmeric bg-surface shadow-lg shadow-tamarind/10' : 'border-tamarind/10 bg-surface'}`}>
                  <p className="inline-flex rounded-full bg-jasmine px-3 py-1 text-xs font-black uppercase text-temple">{option.tag}</p>
                  <h3 className="mt-5 text-2xl font-black leading-tight text-balance">{option.name}</h3>
                  <p className="mt-3 text-3xl font-black text-indigo">{option.price}</p>
                  <p className="mt-4 min-h-24 leading-7 text-tamarind/70 text-pretty">{option.detail}</p>
                  {option.href === '#pricing' ? (
                    <CheckoutButton>{option.cta}</CheckoutButton>
                  ) : (
                    <Link href={option.href} className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-indigo px-5 py-3 font-black text-surface transition duration-150 ease-out hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                      {option.cta}
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface px-4 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="rounded-[2rem] border border-tamarind/10 bg-jasmine p-4 shadow-xl shadow-tamarind/10">
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
              <div className="mt-6 grid gap-3">
                {['Beginner-friendly and practical', 'Built around Chiang Mai situations', 'Clear path from free practice to private lesson'].map((point) => (
                  <div key={point} className="flex gap-3 rounded-2xl border border-tamarind/10 bg-surface p-4 shadow-sm">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-banana text-xs font-black text-surface" aria-hidden="true">✓</span>
                    <span className="leading-6 text-tamarind/76 text-pretty">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-sm font-black uppercase text-temple">Questions</p>
            <h2 className="mt-3 text-center text-4xl font-black leading-tight tracking-[-0.04em] text-balance md:text-5xl">
              Quick answers before you start.
            </h2>
            <div className="mt-10 grid gap-3">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-[1.5rem] border border-tamarind/10 bg-surface p-6 shadow-sm">
                  <h3 className="text-xl font-black text-indigo">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-tamarind/70 text-pretty">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 md:pb-28">
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-indigo p-6 text-center text-surface shadow-2xl shadow-tamarind/15 md:p-10">
            <p className="text-sm font-black uppercase text-turmeric">Ready to try?</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] text-balance md:text-5xl">
              Complete one free Thai mission today.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-surface/78 text-pretty">
              Start with coffee or market Thai. If you want feedback, send a WhatsApp voice note or book a private lesson.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/missions/order-coffee" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-turmeric px-6 py-3 font-black text-tamarind transition duration-150 ease-out hover:bg-turmeric-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface">
                Start coffee mission
              </Link>
              <Link href="/missions/market-price" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-surface/20 px-6 py-3 font-black text-surface transition duration-150 ease-out hover:border-turmeric focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                Start market mission
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
