import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import SiteFooter from '@/components/ui/SiteFooter'

export const metadata: Metadata = {
  title: '5-Minute Thai Missions for Chiang Mai | Thai Lessons Chiang Mai',
  description:
    'Free and practical Thai missions for expats in Chiang Mai. Learn cafe Thai, market Thai, transport phrases, polite greetings, and daily Thai situations.',
  alternates: {
    canonical: '/missions',
  },
  openGraph: {
    title: '5-Minute Thai Missions for Chiang Mai',
    description: 'Choose a real Chiang Mai situation and practice one useful Thai phrase in 3-5 minutes.',
    url: '/missions',
    type: 'website',
  },
}

const eyebrow = 'text-xs font-medium uppercase tracking-[.14em] text-clay'
const btnSolid =
  'inline-flex min-h-11 items-center justify-center gap-2 bg-ink px-[26px] py-3.5 text-sm font-semibold text-paper transition-opacity duration-150 ease-out hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay'

const missions = [
  {
    tag: 'Cafe',
    status: 'Free · 5 min',
    title: 'Order coffee less sweet',
    roman: 'kǐor gaa-fae yen wăan nói kráp',
    thai: 'ขอกาแฟเย็นหวานน้อยครับ',
    translation: '"I\'d like iced coffee, less sweet, please."',
    outcome: 'Order a drink politely without switching to English.',
    href: '/missions/order-coffee',
    cta: 'Start mission',
  },
  {
    tag: 'Market',
    status: 'Free · 5 min',
    title: 'Ask the market price',
    roman: 'raa-khaa thâo-rài kráp',
    thai: 'ราคาเท่าไหร่ครับ',
    translation: '"How much is this?"',
    outcome: 'Ask how much, hear a price, and buy fruit confidently.',
    href: '/missions/market-price',
    cta: 'Start mission',
  },
  {
    tag: 'Restaurant',
    status: 'Free · 6 min',
    title: 'Order food, choose spice level',
    roman: 'ao khâo-soy mâi phèt kráp',
    thai: 'เอาข้าวซอยไม่เผ็ดครับ',
    translation: '"I\'ll have khao soi, not spicy, please."',
    outcome: 'Order one meal, choose spice level, and ask for the bill.',
    href: '/missions/order-food-spice',
    cta: 'Start mission',
  },
  {
    tag: 'Transport',
    status: 'Free · 5 min',
    title: 'Tell a driver to stop',
    roman: 'jòt trong-níi kráp',
    thai: 'จอดตรงนี้ครับ',
    translation: '"Stop right here, please."',
    outcome: 'Use simple directions with Grab, songthaew, or local drivers.',
    href: '/missions/driver-stop',
    cta: 'Start mission',
  },
  {
    tag: 'Greetings',
    status: 'Lesson · 3 min',
    title: 'Say hello politely',
    roman: 'sà-wàt-dii kráp',
    thai: 'สวัสดีครับ / ค่ะ',
    translation: '"Hello" (with wai + khrap/kha).',
    outcome: 'Greet people naturally and understand the wai gesture.',
    href: '/lessons/week-1',
    cta: 'Open lesson',
  },
  {
    tag: 'Daily basics',
    status: 'Phrasebook · 2 min',
    title: 'Ask where the bathroom is',
    roman: 'hông-náam yùu thîi-năi kráp',
    thai: 'ห้องน้ำอยู่ที่ไหนครับ',
    translation: '"Where is the bathroom?"',
    outcome: 'Ask in a cafe, mall, temple, or restaurant.',
    href: '/products/50-thai-phrases-chiang-mai.html',
    cta: 'Open phrasebook',
  },
  {
    tag: 'Culture',
    status: 'Lesson · 5 min',
    title: 'Visit a temple politely',
    roman: 'thàai rûup dâai măi kráp',
    thai: 'ถ่ายรูปได้ไหมครับ',
    translation: '"May I take a photo?"',
    outcome: 'Ask permission and avoid awkward cultural mistakes.',
    href: '/lessons/week-4',
    cta: 'Open lesson',
  },
  {
    tag: 'Daily life',
    status: 'Planned mission',
    title: 'Talk to condo security',
    roman: 'chûai nòi dâai măi kráp',
    thai: 'ช่วยหน่อยได้ไหมครับ',
    translation: '"Could you please help me?"',
    outcome: 'Ask for simple help around your condo or apartment.',
    href: '/products/50-thai-phrases-chiang-mai.html',
    cta: 'Open phrasebook',
  },
]

export default function MissionsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper font-public text-ink">
        <div className="mx-auto max-w-[1180px] px-6 pt-16">
          <span className={eyebrow}>Free Thai missions</span>
          <h1 className="mt-4 max-w-[16ch] font-serif text-4xl font-bold leading-[1.15] text-ink sm:text-5xl">
            Learn by doing one real situation at a time.
          </h1>
          <p className="mt-[18px] max-w-[52ch] text-base leading-[1.7] text-ink/68">
            Every mission is a small practical win: phrase, meaning, pitch, and one
            mini challenge. Start free, then book human correction when you want
            help speaking clearly.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1180px] gap-7 px-6 py-14 md:grid-cols-2">
          {missions.map(mission => (
            <article key={mission.title} className="border border-ink/10 p-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-clay">{mission.tag}</span>
                <span className="text-xs text-ink/50">{mission.status}</span>
              </div>
              <h2 className="mt-3.5 font-serif text-[26px] font-normal text-ink">{mission.title}</h2>
              <div className="mt-5 flex flex-col gap-1 bg-ink px-5 py-4 text-paper">
                <span className="font-serif text-[21px] font-medium text-honey">{mission.roman}</span>
                <span
                  className="mt-0.5 self-start bg-paper px-2 py-0.5 text-[13px] font-medium text-clay"
                  lang="th"
                >
                  {mission.thai}
                </span>
                <span className="text-sm text-paper/55">{mission.translation}</span>
              </div>
              <p className="mt-[18px] text-sm leading-[1.7] text-ink/65">{mission.outcome}</p>
              <Link href={mission.href} className={`${btnSolid} mt-5`}>
                {mission.cta} →
              </Link>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
