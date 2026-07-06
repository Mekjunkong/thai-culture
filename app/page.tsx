import Image from 'next/image'
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

const missionCards = [
  {
    title: 'Order coffee less sweet',
    time: '5 min',
    level: 'Easy',
    href: '/missions/order-coffee',
    emoji: '☕',
    skill: 'Drink + sweetness + polite order',
    outcome: 'Build one real cafe phrase and practice it before you visit a coffee shop.',
  },
  {
    title: 'Say hello without feeling awkward',
    time: '3 min',
    level: 'Easy',
    href: '/lessons/week-1',
    emoji: '🙏',
    skill: 'Greeting + wai + polite ending',
    outcome: 'Know when to say sawasdee and how khrap/kha changes the feeling.',
  },
  {
    title: 'Buy something at a market',
    time: '5 min',
    level: 'Real life',
    href: '/lessons/week-2',
    emoji: '🥭',
    skill: 'Ask price + quantity',
    outcome: 'Ask how much and buy one simple item without freezing.',
  },
  {
    title: 'Tell a driver where to stop',
    time: '5 min',
    level: 'Real life',
    href: '/lessons/week-4',
    emoji: '🚗',
    skill: 'Directions + stop here',
    outcome: 'Use simple Thai with Grab, red truck or local drivers.',
  },
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
    status: 'Full lesson',
    href: '/lessons/week-3',
    situation: 'Lunch at a local shop',
    outcome: 'Order one dish clearly, ask for spice level, and respond naturally when staff answer.',
  },
  {
    week: 'Week 4',
    title: 'Temple, market and local etiquette',
    status: 'Full lesson',
    href: '/lessons/week-4',
    situation: 'Moving through daily public life',
    outcome: 'Avoid awkward mistakes and understand the polite behavior locals expect.',
  },
]

const included = [
  '4 complete beginner modules with dialogues, drills, scripts and homework',
  'Audio-first phrase practice, speaking drills and printable lesson sheets',
  'Cultural explanations in normal English',
  'Quick quizzes, real-life missions and teacher correction prompts',
  'Lifetime access to the starter course updates',
]

const livePackages = [
  {
    name: '30-minute trial',
    price: '฿199 online / ฿299 in person',
    detail: 'A friendly level check and first speaking practice for new learners.',
  },
  {
    name: 'Online Thai lesson',
    price: '฿450 / 60 min',
    detail: 'Private Zoom or video-call lesson focused on your daily situations.',
  },
  {
    name: 'Chiang Mai in-person lesson',
    price: '฿600 / 60 min',
    detail: 'Meet at a cafe or calm local spot and practice real-life Thai together.',
  },
  {
    name: 'Starter Pack',
    price: '฿990 online / ฿1,290 in person',
    detail: 'Course access, one private lesson, 50 phrases, and 7 days of WhatsApp voice practice.',
  },
]

const seoProof = [
  'Thai lessons in Chiang Mai for expats and travelers',
  'Online Thai course with culture notes and audio practice',
  'Private Thai tutor support by WhatsApp',
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
                Thai Lessons Chiang Mai · Online + in-person lessons
              </p>
              <h1 className="mt-5 max-w-3xl text-[clamp(2.75rem,7vw,5.9rem)] font-black leading-[0.93] tracking-[-0.065em] text-tamarind text-balance">
                Learn Thai for real life in Chiang Mai.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-tamarind/75 text-pretty md:text-xl md:leading-9">
                Practical Thai lessons and an online course for expats, digital nomads, retirees, and travelers. Learn the useful phrases and the culture behind them.
              </p>
              
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                              <Link
                                href="/missions/order-coffee"
                                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-indigo px-6 py-3 font-semibold text-surface shadow-lg shadow-indigo/20 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
                              >
                                Start free coffee mission
                              </Link>
                              <Link
                                href="#audio-sample"
                                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-tamarind/15 bg-surface px-6 py-3 font-semibold text-tamarind shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
                              >
                                Hear a sample
                              </Link>
                            </div>
                            <div id="audio-sample" className="mt-6">
                              <audio controls preload="none" className="w-full max-w-md rounded-xl" aria-label="Sample Thai greeting audio" >
                                <source src="/assets/audio/week-1-greetings.mp3" type="audio/mpeg" />
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                            <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                              {['Free Week 1', 'Private lessons', 'Online course', 'Chiang Mai practice'].map((point) => (
                                <div key={point} className="rounded-2xl border border-tamarind/10 bg-surface/70 p-3 shadow-sm shadow-tamarind/5">
                                  <dt className="text-xs font-bold uppercase text-temple">Course</dt>
                                  <dd className="mt-1 text-sm font-semibold text-tamarind">{point}</dd>
                                </div>
                              ))}
                            </dl>
            </div>
            <aside aria-label="Starter course offer" className="relative">
              <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-banana/15 blur-2xl" aria-hidden="true" />
              <div className="relative rounded-[2rem] border border-tamarind/10 bg-surface p-4 shadow-2xl shadow-tamarind/15 md:p-5">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-indigo text-surface">
                  <Image
                    src="/assets/images/thai-culture-homepage-banner.png"
                    alt="Notebook, Thai tea, and audio practice setup for learning Thai in a warm local setting"
                    width={1536}
                    height={1024}
                    priority
                    className="h-72 w-full object-cover md:h-80"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-indigo/88 p-5 md:p-6">
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-turmeric">Starter course</p>
                    <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-balance">
                      A real starter course, not just a phrase list.
                    </h2>
                    <p className="mt-4 max-w-prose leading-7 text-surface/86 text-pretty">
                      Four complete beginner modules for greetings, prices, food, transport, temples, markets and polite local life in Chiang Mai.
                    </p>
                  </div>
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

        <section id="missions" className="bg-surface px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-[0.7fr_1fr] md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-temple">Choose today’s Thai mission</p>
                <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] text-tamarind text-balance md:text-5xl">
                  Less lecture. More real-life wins.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-tamarind/70 text-pretty">
                Start with one useful situation, tap your choices, say the phrase, then try it outside. The first mission is free and interactive.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {missionCards.map((mission, index) => (
                <Link key={mission.title} href={mission.href} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                  <article className={`h-full rounded-[1.5rem] border p-5 shadow-sm shadow-tamarind/5 transition duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-tamarind/10 ${index === 0 ? 'border-turmeric/70 bg-banana/12' : 'border-tamarind/10 bg-jasmine'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-2xl shadow-inner" aria-hidden="true">{mission.emoji}</span>
                      <span className="rounded-full bg-surface px-3 py-1 text-xs font-black text-indigo">{mission.time}</span>
                    </div>
                    <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-temple">{mission.level} mission</p>
                    <h3 className="mt-2 text-2xl font-black leading-tight tracking-[-0.03em] text-tamarind text-balance">{mission.title}</h3>
                    <p className="mt-3 text-sm font-bold text-indigo">{mission.skill}</p>
                    <p className="mt-3 leading-7 text-tamarind/68 text-pretty">{mission.outcome}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-tamarind/10 pt-4">
                      <span className="font-black text-indigo">Start mission</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-sm font-black text-temple transition group-hover:bg-turmeric group-hover:text-tamarind" aria-hidden="true">→</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="curriculum" className="bg-jasmine px-4 py-16 md:py-20">
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
                const isLive = Boolean(lesson.href)
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
                  <Link key={lesson.week} href={lesson.href ?? '/lessons/week-1'} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                    {card}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-indigo px-4 py-16 text-surface md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 rounded-[2rem] border border-surface/10 bg-indigo-soft p-6 shadow-2xl shadow-indigo/30 md:grid-cols-[0.82fr_1.18fr] md:p-10">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-turmeric">Online course + live Thai lessons</p>
                <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] text-balance md:text-5xl">
                  Choose self-study, private practice, or the full Starter Pack.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-surface/78 text-pretty">
                  Start free with Week 1. When you are ready, book online or in-person Thai practice in Chiang Mai through WhatsApp.
                </p>
                <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-surface/12 bg-surface/8">
                  <Image
                    src="/assets/images/thai-culture-homepage-photo.png"
                    alt="Friendly Thai tutor practicing beginner Thai phrases with an adult learner"
                    width={1536}
                    height={1024}
                    className="h-56 w-full object-cover"
                  />
                  <p className="p-4 text-sm font-semibold leading-6 text-surface/78 text-pretty">
                    Friendly, practical Thai for expats: listen, repeat, roleplay, and use the phrase in a real Chiang Mai situation.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <article className="rounded-[1.5rem] border border-turmeric/40 bg-surface p-5 text-tamarind shadow-lg shadow-tamarind/10">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.14em] text-temple">Best first offer</p>
                      <h3 className="mt-2 text-2xl font-black tracking-[-0.025em] text-balance">Thai for Chiang Mai Life — Starter Pack</h3>
                      <p className="mt-3 leading-7 text-tamarind/70 text-pretty">Course access, one private lesson, 50 useful Thai phrases, and 7 days of WhatsApp voice-note practice.</p>
                    </div>
                    <p className="shrink-0 rounded-2xl bg-turmeric px-4 py-3 text-center text-xl font-black text-tamarind">฿990+</p>
                  </div>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <CheckoutButton>Book on WhatsApp</CheckoutButton>
                    <Link
                      href="/lessons/week-1"
                      className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-tamarind/15 px-6 py-3 font-bold text-tamarind transition duration-200 ease-out hover:-translate-y-0.5 hover:border-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
                    >
                      Try Week 1 free
                    </Link>
                    <a
                      href="/products/50-thai-phrases-chiang-mai.pdf"
                      className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-tamarind/15 px-6 py-3 font-bold text-tamarind transition duration-200 ease-out hover:-translate-y-0.5 hover:border-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
                    >
                      Download free PDF
                    </a>
                  </div>
                </article>

                <div className="grid gap-3 sm:grid-cols-2">
                  {livePackages.map((item) => (
                    <article key={item.name} className="rounded-[1.25rem] border border-surface/10 bg-surface/8 p-4">
                      <h3 className="text-lg font-black text-surface text-balance">{item.name}</h3>
                      <p className="mt-2 text-xl font-black text-turmeric">{item.price}</p>
                      <p className="mt-2 text-sm leading-6 text-surface/72 text-pretty">{item.detail}</p>
                    </article>
                  ))}
                </div>

                <article className="rounded-[1.25rem] border border-surface/10 bg-surface/8 p-4">
                  <h3 className="text-lg font-black text-surface">Self-study online course</h3>
                  <p className="mt-2 text-3xl font-black text-turmeric">฿690 lifetime access</p>
                  <ul className="mt-4 grid gap-2 text-sm leading-6 text-surface/78 sm:grid-cols-2">
                    {included.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-turmeric" aria-hidden="true">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-jasmine px-4 py-14 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.7fr_1fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-temple">Why learn with us</p>
              <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] text-tamarind text-balance">
                Learn Thai with the local context that makes the words feel natural.
              </h2>
            </div>
            <div className="rounded-[1.5rem] border border-tamarind/10 bg-surface p-5 shadow-sm shadow-tamarind/5">
              <p className="text-lg leading-8 text-tamarind/72 text-pretty">
                Thai Lessons Chiang Mai is built for real daily life: polite greetings, food orders, market prices, simple conversation, and the small cultural details that help foreigners feel more comfortable in Thailand.
              </p>
              <ul className="mt-5 grid gap-3">
                {seoProof.map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl bg-jasmine p-3 text-sm font-semibold text-tamarind/75">
                    <span className="text-temple" aria-hidden="true">•</span>
                    <span>{item}</span>
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
