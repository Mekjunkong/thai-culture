import Image from 'next/image'
import Link from 'next/link'
import CheckoutButton from '@/components/checkout/CheckoutButton'
import Navbar from '@/components/ui/Navbar'

const missionCards = [
  {
    title: 'Order coffee less sweet',
    time: '5 min',
    level: 'Free',
    href: '/missions/order-coffee',
    emoji: '☕',
    situation: 'Chiang Mai cafe',
    outcome: 'Build and say one polite drink order you can use today.',
    status: 'Live interactive mission',
  },
  {
    title: 'Say hello politely',
    time: '3 min',
    level: 'Easy',
    href: '/lessons/week-1',
    emoji: '🙏',
    situation: 'First meeting',
    outcome: 'Use sawasdee, wai, khrap/kha, and a simple friendly intro.',
    status: 'Free lesson',
  },
  {
    title: 'Ask the price at a market',
    time: '5 min',
    level: 'Useful',
    href: '/missions/market-price',
    emoji: '🥭',
    situation: 'Local market',
    outcome: 'Ask how much, understand common prices, and buy one item.',
    status: 'Live interactive mission',
  },
  {
    title: 'Tell a driver where to stop',
    time: '5 min',
    level: 'Real life',
    href: '/lessons/week-4',
    emoji: '🚗',
    situation: 'Grab or red truck',
    outcome: 'Say stop here, go straight, turn left/right, and be polite.',
    status: 'Lesson + roleplay',
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Choose a real situation',
    detail: 'Cafe, market, transport, food, condo, temple, or daily small talk in Chiang Mai.',
  },
  {
    step: '02',
    title: 'Practice one useful phrase',
    detail: 'Tap choices, build the phrase, read chunks, repeat out loud, and complete the mini roleplay.',
  },
  {
    step: '03',
    title: 'Get human correction',
    detail: 'Send a WhatsApp voice note so Mike can correct pronunciation, speed, tone feeling, and politeness.',
  },
]

const researchPatterns = [
  {
    source: 'ThaiPod101',
    lesson: 'short audio/video lessons + free start',
    applied: 'Free 5-minute missions with a clear first CTA.',
  },
  {
    source: 'Ling',
    lesson: 'games, reviews, native audio, momentum',
    applied: 'Mission cards, progress, badges, and quick wins.',
  },
  {
    source: 'BananaThai',
    lesson: 'guided path + private lesson support',
    applied: 'Free mission → self-study → live correction journey.',
  },
  {
    source: 'Learn Thai From A White Guy',
    lesson: 'personal trust + free lessons',
    applied: 'Teacher-led positioning and low-friction starter offer.',
  },
  {
    source: 'Thai With Grace',
    lesson: 'real spoken Thai + course ecosystem',
    applied: 'Practical spoken Thai, phrasebook, missions, and live support.',
  },
]

const packages = [
  {
    name: '30-minute trial',
    price: '฿199 online / ฿299 in person',
    detail: 'Friendly level check, one real situation, and first speaking correction.',
  },
  {
    name: 'Private online Thai lesson',
    price: '฿450 / 60 min',
    detail: 'Zoom or video-call lesson focused on your daily Chiang Mai situations.',
  },
  {
    name: 'Chiang Mai in-person lesson',
    price: '฿600 / 60 min',
    detail: 'Meet at a cafe or calm local spot and practice real Thai conversation.',
  },
  {
    name: 'Starter Pack',
    price: '฿990 online / ฿1,290 in person',
    detail: 'Course access, one private lesson, phrasebook, and 7 days of WhatsApp voice practice.',
  },
]

const trustPoints = [
  'Built for expats, digital nomads, retirees, and travelers in Chiang Mai',
  'Focus on real spoken Thai, not textbook memorization',
  'Culture notes explain why phrases feel polite, casual, or too direct',
  'Manual WhatsApp booking keeps the first version simple and personal',
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-jasmine text-tamarind">
        <section className="px-4 py-12 md:py-18">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.86fr] lg:items-center">
            <div>
              <p className="inline-flex min-h-11 items-center rounded-full border border-tamarind/10 bg-surface px-4 py-2 text-sm font-bold text-indigo shadow-sm">
                Thai Lessons Chiang Mai · Free mission first
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-none text-tamarind text-balance md:text-7xl">
                Speak useful Thai in Chiang Mai today.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-tamarind/75 text-pretty md:text-xl md:leading-9">
                Practical Thai missions for expats, digital nomads, retirees, and travelers. Start with one real-life situation, speak one phrase, then get human correction from Mike.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/missions/order-coffee"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-indigo px-6 py-3 font-bold text-surface shadow-lg transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
                >
                  Start free coffee mission
                </Link>
                <Link
                  href="/missions"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-tamarind/15 bg-surface px-6 py-3 font-bold text-tamarind shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:border-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
                >
                  View mission library
                </Link>
              </div>

              <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                {['No login', 'No credit card', 'Human correction'].map((item) => (
                  <div key={item} className="rounded-2xl border border-tamarind/10 bg-surface p-4 shadow-sm">
                    <p className="text-sm font-black text-indigo">✓ {item}</p>
                    <p className="mt-1 text-sm leading-6 text-tamarind/65">Start fast and learn by doing.</p>
                  </div>
                ))}
              </div>
            </div>

            <aside aria-label="Free Thai mission preview" className="rounded-[2rem] border border-tamarind/10 bg-surface p-4 shadow-2xl shadow-tamarind/10">
              <Image
                src="/assets/images/thai-culture-homepage-banner.png"
                alt="Thai learning setup with notebook, drink, and Chiang Mai style study material"
                width={1536}
                height={1024}
                priority
                className="h-64 w-full rounded-[1.5rem] object-cover md:h-80"
              />
              <div className="p-3 md:p-4">
                <p className="text-sm font-black text-temple">Today’s free mission</p>
                <h2 className="mt-2 text-3xl font-black leading-tight text-balance">Order iced coffee less sweet.</h2>
                <div className="mt-4 rounded-2xl bg-indigo p-4 text-surface">
                  <p className="text-2xl font-black">ขอกาแฟเย็นหวานน้อยครับ</p>
                  <p className="mt-2 text-sm text-surface/80">khǎaw gaa-fae yen wǎan nói khrap</p>
                  <p className="mt-2 text-sm text-surface/80">I’d like iced coffee, less sweet, please.</p>
                </div>
                <p className="mt-4 text-sm leading-6 text-tamarind/70 text-pretty">
                  Browser voices are only optional rough demos. Real pronunciation improves through speaking out loud and getting a human voice-note correction.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section id="missions" className="bg-surface px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase text-temple">Mission-based learning</p>
                <h2 className="mt-3 max-w-2xl text-4xl font-black leading-tight text-balance md:text-5xl">
                  Less lecture. More small wins you can use outside.
                </h2>
              </div>
              <Link href="/missions" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-tamarind/15 px-5 py-3 font-bold text-indigo transition duration-200 ease-out hover:-translate-y-0.5 hover:border-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                See all missions
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {missionCards.map((mission, index) => (
                <Link key={mission.title} href={mission.href} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                  <article className={`h-full rounded-[1.5rem] border p-5 shadow-sm transition duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-lg ${index === 0 ? 'border-turmeric bg-banana/10' : 'border-tamarind/10 bg-jasmine'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-surface text-2xl shadow-inner" aria-hidden="true">{mission.emoji}</span>
                      <span className="rounded-full bg-surface px-3 py-1 text-xs font-black text-indigo">{mission.time}</span>
                    </div>
                    <p className="mt-5 text-sm font-black text-temple">{mission.level} · {mission.situation}</p>
                    <h3 className="mt-2 text-2xl font-black leading-tight text-balance">{mission.title}</h3>
                    <p className="mt-3 min-h-20 text-sm leading-6 text-tamarind/70 text-pretty">{mission.outcome}</p>
                    <div className="mt-5 border-t border-tamarind/10 pt-4">
                      <p className="text-xs font-bold text-tamarind/55">{mission.status}</p>
                      <p className="mt-2 font-black text-indigo">Start mission →</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-sm font-black uppercase text-temple">Better UX from research</p>
                <h2 className="mt-3 text-4xl font-black leading-tight text-balance md:text-5xl">
                  Designed from the best Thai-learning patterns, but local to Chiang Mai.
                </h2>
                <p className="mt-5 leading-8 text-tamarind/70 text-pretty">
                  I reviewed ThaiPod101, Ling, BananaThai, Learn Thai From A White Guy, Thai With Grace, and Learning Thai. The best pattern is clear: short free lessons, interactive practice, trust, and teacher support.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {researchPatterns.map((item) => (
                  <article key={item.source} className="rounded-2xl border border-tamarind/10 bg-surface p-5 shadow-sm">
                    <p className="text-sm font-black text-indigo">{item.source}</p>
                    <p className="mt-2 text-sm leading-6 text-tamarind/65">Pattern: {item.lesson}</p>
                    <p className="mt-3 font-bold leading-6 text-tamarind">Applied: {item.applied}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-black uppercase text-temple">How it works</p>
              <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-black leading-tight text-balance md:text-5xl">
                A simple path from first phrase to real confidence.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {howItWorks.map((item) => (
                <article key={item.step} className="rounded-[1.5rem] border border-tamarind/10 bg-jasmine p-6 shadow-sm">
                  <p className="text-4xl font-black text-turmeric">{item.step}</p>
                  <h3 className="mt-4 text-2xl font-black leading-tight text-balance">{item.title}</h3>
                  <p className="mt-3 leading-7 text-tamarind/70 text-pretty">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-indigo px-4 py-16 text-surface md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div>
                <p className="text-sm font-black uppercase text-turmeric">Free mission → live lesson</p>
                <h2 className="mt-3 text-4xl font-black leading-tight text-balance md:text-5xl">
                  Start free. Upgrade when you want feedback.
                </h2>
                <p className="mt-5 text-lg leading-8 text-surface/78 text-pretty">
                  Self-study gives you the phrase. Live correction helps your pronunciation, rhythm, tone feeling, and confidence.
                </p>
                <div className="mt-6 rounded-[1.5rem] border border-surface/10 bg-surface/10 p-5">
                  <h3 className="text-2xl font-black text-turmeric">Best first offer: Starter Pack</h3>
                  <p className="mt-3 leading-7 text-surface/80 text-pretty">
                    Course access, one private lesson, 50 useful Thai phrases, and 7 days of WhatsApp voice-note practice.
                  </p>
                  <p className="mt-4 text-3xl font-black">฿990 online / ฿1,290 in person</p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <CheckoutButton>Book on WhatsApp</CheckoutButton>
                    <a href="/products/50-thai-phrases-chiang-mai.pdf" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-surface/20 px-6 py-3 font-bold text-surface transition duration-200 ease-out hover:-translate-y-0.5 hover:border-turmeric focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                      Download free PDF
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {packages.map((item) => (
                  <article key={item.name} className="rounded-[1.5rem] border border-surface/10 bg-surface p-5 text-tamarind shadow-lg shadow-indigo/20">
                    <h3 className="text-xl font-black leading-tight text-balance">{item.name}</h3>
                    <p className="mt-3 text-2xl font-black text-temple">{item.price}</p>
                    <p className="mt-3 leading-7 text-tamarind/70 text-pretty">{item.detail}</p>
                  </article>
                ))}
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
                className="h-72 w-full rounded-[1.5rem] object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-black uppercase text-temple">Why this is different</p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-balance md:text-5xl">
                Built for Chiang Mai life, not classroom memorization.
              </h2>
              <p className="mt-5 text-lg leading-8 text-tamarind/72 text-pretty">
                Thai Lessons Chiang Mai focuses on the situations foreigners actually face here: ordering coffee, buying fruit, talking to drivers, greeting neighbors, visiting temples, and asking simple daily questions politely.
              </p>
              <ul className="mt-6 grid gap-3">
                {trustPoints.map((point) => (
                  <li key={point} className="flex gap-3 rounded-2xl border border-tamarind/10 bg-surface p-4 shadow-sm">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-banana text-xs font-black text-surface" aria-hidden="true">✓</span>
                    <span className="leading-6 text-tamarind/76 text-pretty">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
