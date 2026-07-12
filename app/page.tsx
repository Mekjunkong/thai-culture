import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  alternates: { canonical: '/' },
}

const btnSolid =
  'inline-flex min-h-11 items-center justify-center gap-2 bg-ink px-7 py-[15px] text-sm font-semibold text-paper transition-opacity duration-150 ease-out hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay'
const btnAccent =
  'inline-flex min-h-11 items-center justify-center gap-2 bg-clay px-7 py-[15px] text-sm font-semibold text-paper transition-opacity duration-150 ease-out hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink'
const btnOutline =
  'inline-flex min-h-11 items-center justify-center border border-ink/30 px-[26px] py-3.5 text-sm font-semibold text-ink transition-colors duration-150 ease-out hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay'
const eyebrow = 'text-xs font-medium uppercase tracking-[.14em] text-clay'

const tones = [
  { path: 'M4,20 L48,20', label: 'Mid', syllable: 'อา' },
  { path: 'M4,30 L48,30', label: 'Low', syllable: 'อ่า' },
  { path: 'M4,10 Q26,6 30,18 T48,32', label: 'Falling', syllable: 'อ้า' },
  { path: 'M4,20 Q20,10 26,8 T48,6', label: 'High', syllable: 'อ๊า' },
  { path: 'M4,28 Q20,32 24,20 T48,8', label: 'Rising', syllable: 'อ๋า' },
]

const stats = [
  { value: '5 min', label: 'short missions' },
  { value: '2 ways', label: 'online / in person' },
  { value: '1 phrase', label: "until it's usable" },
]

const missions = [
  { title: 'Order coffee less sweet', tag: 'Cafe', href: '/missions/order-coffee' },
  { title: 'Ask the market price', tag: 'Market', href: '/missions/market-price' },
  { title: 'Choose your spice level', tag: 'Restaurant', href: '/missions/order-food-spice' },
  { title: 'Tell a driver to stop', tag: 'Transport', href: '/missions/driver-stop' },
]

const pricing = [
  {
    tag: 'Start here',
    name: 'Free missions & course',
    price: '฿0',
    detail: 'Interactive missions, the practice app, and a 4-week beginner course. No card needed.',
    cta: 'Start learning free',
    href: '/missions',
    featured: false,
  },
  {
    tag: 'Best first lesson',
    name: '30-minute trial',
    price: '฿199 online / ฿299 in person',
    detail: 'A friendly level check, one real situation, and speaking correction from a real teacher.',
    cta: 'Book a trial',
    href: '/book',
    featured: true,
  },
  {
    tag: 'Most useful',
    name: 'Starter Pack',
    price: '฿990 online / ฿1,290 in person',
    detail: 'One private lesson, 50 Chiang Mai phrases, all missions, and 7 days of voice-note practice.',
    cta: 'Book Starter Pack',
    href: '/book',
    featured: false,
  },
]

const faqs = [
  {
    question: 'Is this for complete beginners?',
    answer: 'Yes. Start with zero Thai. Each mission teaches one practical phrase and one simple roleplay.',
  },
  {
    question: 'Online or in person?',
    answer: 'Both. Missions and the free course are online. Private lessons can be online or in Chiang Mai.',
  },
  {
    question: 'How do I fix my pronunciation?',
    answer: 'Practice the pitch first, then send a voice note or book a trial for real correction.',
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
      priceRange: '฿199-฿2,500',
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

function ToneCard({ path, label, syllable }: { path: string; label: string; syllable: string }) {
  return (
    <div className="min-w-[88px] flex-1 bg-sand px-2.5 pb-4 pt-[18px] text-center">
      <svg width="52" height="40" viewBox="0 0 52 40" aria-hidden="true">
        <line x1="4" y1="8" x2="48" y2="8" stroke="rgba(43,38,32,.15)" strokeWidth="1" />
        <line x1="4" y1="32" x2="48" y2="32" stroke="rgba(43,38,32,.15)" strokeWidth="1" />
        <path d={path} fill="none" className="stroke-clay" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <p className="mt-2.5 font-serif text-[22px] leading-none text-ink" lang="th">
        {syllable}
      </p>
      <p className="mt-1 text-[13px] text-ink">{label}</p>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="bg-paper font-public text-ink">
        <div className="mx-auto max-w-[1180px]">
          <nav
            aria-label="Main"
            className="flex items-center justify-between border-b border-ink/8 px-6 py-[26px]"
          >
            <Link href="/" className="font-serif text-xl text-ink">
              Thai Lessons <span className="font-bold italic text-clay">Chiang Mai</span>
            </Link>
            <div className="hidden gap-8 text-[13.5px] text-ink/65 md:flex">
              <Link href="/missions" className="inline-flex min-h-11 items-center hover:text-clay">
                Missions
              </Link>
              <Link href="/lessons" className="inline-flex min-h-11 items-center hover:text-clay">
                Free course
              </Link>
              <a href="#pricing" className="inline-flex min-h-11 items-center hover:text-clay">
                Pricing
              </a>
            </div>
            <a
              href="#pricing"
              className="inline-flex min-h-11 items-center justify-center bg-clay px-[22px] py-[11px] text-[13px] font-semibold text-paper transition-opacity duration-150 ease-out hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              Book a trial
            </a>
          </nav>

          <section className="grid items-center gap-12 px-6 pt-16 lg:grid-cols-2">
            <div>
              <span className={eyebrow}>Learn by living it</span>
              <h1 className="mt-[18px] font-serif text-4xl font-bold leading-[1.12] text-ink sm:text-5xl">
                Thai for real Chiang Mai mornings.
              </h1>
              <p className="mt-5 max-w-[36ch] text-base leading-[1.7] text-ink/68">
                Coffee, markets, food, transport — one small, real conversation at a time.
              </p>
              <div className="mt-[30px] flex flex-wrap gap-3.5">
                <Link href="/missions" className={btnSolid}>
                  Try a free mission
                </Link>
                <a href="#pricing" className={btnOutline}>
                  Book a trial
                </a>
              </div>
              <div className="mt-[26px] flex max-w-[34ch] flex-col gap-1 bg-ink px-5 py-4 text-paper">
                <span className="font-serif text-[22px] font-medium text-honey">
                  kǐor gaa-fae yen wăan nói kráp
                </span>
                <span
                  className="mt-0.5 self-start bg-paper px-2 py-0.5 text-sm font-medium text-clay"
                  lang="th"
                >
                  ขอกาแฟเย็นหวานน้อยครับ
                </span>
                <span className="text-[15px] text-paper/55">&ldquo;less sweet, please&rdquo;</span>
              </div>
            </div>
            <div className="grid h-[300px] grid-cols-[1.2fr_1fr] grid-rows-2 gap-3.5 sm:h-[380px]">
              <div className="relative row-span-2">
                <Image
                  src="/assets/images/mission-market-price.jpg"
                  alt="Fresh produce stall at a Chiang Mai morning market"
                  fill
                  priority
                  sizes="(min-width: 1024px) 350px, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="relative">
                <Image
                  src="/assets/images/mission-order-coffee.jpg"
                  alt="Iced Thai coffee on a cafe table"
                  fill
                  priority
                  sizes="(min-width: 1024px) 240px, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="relative">
                <Image
                  src="/assets/images/thai-culture-homepage-banner.png"
                  alt="Notebook with Thai study notes next to a drink"
                  fill
                  sizes="(min-width: 1024px) 240px, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          <section className="mt-10 grid items-center gap-9 px-6 pb-2 pt-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className={eyebrow}>Why it&apos;s hard</span>
              <h2 className="mt-3 font-serif text-[26px] font-normal text-ink">
                Thai has 5 tones — one sentence proves it
              </h2>
              <p className="mt-3.5 text-sm leading-[1.7] text-ink/65">
                The same syllable, said five ways, means five different things. Missions teach the
                pitch, not just the words.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {tones.map(tone => (
                <ToneCard key={tone.label} {...tone} />
              ))}
            </div>
          </section>

          <section className="mt-14 flex flex-col justify-between gap-6 bg-sand px-6 py-10 sm:flex-row sm:gap-0">
            {stats.map((stat, index) => (
              <div
                key={stat.value}
                className={`flex-1 text-center ${index > 0 ? 'border-ink/12 sm:border-l' : ''}`}
              >
                <p className="font-serif text-[22px] text-ink">{stat.value}</p>
                <p className="mt-1.5 text-xs text-ink/55">{stat.label}</p>
              </div>
            ))}
          </section>

          <section className="px-6 py-16">
            <div className="flex flex-wrap items-baseline justify-between gap-5">
              <div>
                <span className={eyebrow}>Missions</span>
                <h2 className="mt-3.5 font-serif text-[32px] font-normal text-ink">
                  Four situations to start with.
                </h2>
              </div>
              <Link
                href="/missions"
                className="border-b border-ink/30 text-sm font-semibold hover:text-clay"
              >
                See all missions →
              </Link>
            </div>
            <div className="mt-9 grid gap-x-10 gap-y-0 md:grid-cols-2">
              {missions.map((mission, index) => (
                <Link
                  key={mission.href}
                  href={mission.href}
                  className={`flex items-baseline justify-between border-t border-ink/12 py-[18px] hover:text-clay ${
                    index >= missions.length - 2 ? 'md:border-b' : ''
                  } ${index === missions.length - 1 ? 'border-b' : ''}`}
                >
                  <span className="font-serif text-lg text-ink">{mission.title}</span>
                  <span className="text-xs text-ink/45">{mission.tag}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-6 mb-16 grid items-center gap-10 bg-sand lg:grid-cols-[0.9fr_1.1fr]">
            <div className="px-8 py-14 lg:pr-0">
              <span className={eyebrow}>Free 4-week course</span>
              <h2 className="mt-3.5 font-serif text-3xl font-normal text-ink">
                Want structure? Follow the beginner path.
              </h2>
              <p className="mt-3.5 max-w-[36ch] text-[15px] leading-[1.7] text-ink/68">
                Four weekly lessons with audio practice and cultural notes. Completely free.
              </p>
              <Link href="/lessons" className={`${btnSolid} mt-[22px]`}>
                See the full course
              </Link>
            </div>
            <div className="relative mx-8 mb-8 h-[280px] lg:mx-0 lg:mb-0 lg:mr-8">
              <Image
                src="/assets/images/thai-culture-homepage-photo.png"
                alt="Friendly Thai tutor helping an adult learner practice phrases"
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          </section>

          <section id="pricing" className="scroll-mt-6 px-6 pb-16">
            <span className={eyebrow}>Lessons and pricing</span>
            <h2 className="mb-10 mt-3.5 font-serif text-[32px] font-normal text-ink">
              Start free. Book help when you want feedback.
            </h2>
            <div className="grid gap-px bg-ink/12 md:grid-cols-3">
              {pricing.map(tier => (
                <div
                  key={tier.name}
                  className={`flex flex-col p-7 pt-8 ${
                    tier.featured ? 'bg-ink text-paper' : 'bg-paper'
                  }`}
                >
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-[.06em] ${
                      tier.featured ? 'text-clay' : 'text-ink/50'
                    }`}
                  >
                    {tier.tag}
                  </span>
                  <h3 className={`mt-3.5 font-serif text-[22px] ${tier.featured ? '' : 'text-ink'}`}>
                    {tier.name}
                  </h3>
                  <p
                    className={`mt-3 font-serif text-[22px] ${
                      tier.featured ? 'text-honey' : 'text-clay'
                    }`}
                  >
                    {tier.price}
                  </p>
                  <p
                    className={`mb-6 mt-3.5 flex-1 text-sm leading-[1.7] ${
                      tier.featured ? 'text-paper/72' : 'text-ink/65'
                    }`}
                  >
                    {tier.detail}
                  </p>
                  <Link href={tier.href} className={tier.featured ? btnAccent : btnOutline}>
                    {tier.cta}
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="px-6 pb-[72px]">
            <span className={eyebrow}>Questions</span>
            <h2 className="mb-8 mt-3.5 font-serif text-3xl font-normal text-ink">
              Quick answers before you start.
            </h2>
            <div className="grid">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`border-t border-ink/12 py-5 ${
                    index === faqs.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <h3 className="font-serif text-lg text-ink">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-[1.7] text-ink/65">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-6 mb-16 bg-ink px-8 py-14 text-center text-paper sm:px-12">
            <p className="font-serif text-2xl italic">
              Start free — book a trial when you&apos;re ready for feedback.
            </p>
            <a href="#pricing" className={`${btnAccent} mt-6`}>
              Book a 30-minute trial
            </a>
          </section>

          <footer className="mx-6 flex flex-col items-center justify-between gap-3 border-t border-ink/10 pb-10 pt-6 text-[13px] text-ink/55 sm:flex-row">
            <span>© {new Date().getFullYear()} Thai Lessons Chiang Mai</span>
            <div className="flex gap-6">
              <Link href="/missions" className="hover:text-clay">
                Missions
              </Link>
              <Link href="/lessons" className="hover:text-clay">
                Free course
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
