import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'

export const metadata: Metadata = {
  title: '5-Minute Thai Missions for Chiang Mai | Thai Lessons Chiang Mai',
  description:
    'Free and practical Thai missions for expats in Chiang Mai. Learn cafe Thai, market Thai, transport phrases, polite greetings, and daily Thai situations.',
  alternates: {
    canonical: '/missions',
  },
  openGraph: {
    title: '5-Minute Thai Missions for Chiang Mai',
    description: 'Choose a real Chiang Mai situation and practice one useful Thai phrase in 3–5 minutes.',
    url: '/missions',
    type: 'website',
  },
}

const missions = [
  {
    title: 'Order coffee less sweet',
    href: '/missions/order-coffee',
    emoji: '☕',
    status: 'Live',
    time: '5 min',
    level: 'Beginner',
    phrase: 'ขอกาแฟเย็นหวานน้อยครับ',
    outcome: 'Order one drink politely in a Chiang Mai cafe.',
  },
  {
    title: 'Say hello politely',
    href: '/lessons/week-1',
    emoji: '🙏',
    status: 'Lesson ready',
    time: '3 min',
    level: 'Beginner',
    phrase: 'สวัสดีครับ / ค่ะ',
    outcome: 'Greet people naturally and understand wai + khrap/kha.',
  },
  {
    title: 'Ask the price at a market',
    href: '/missions/market-price',
    emoji: '🥭',
    status: 'Live',
    time: '5 min',
    level: 'Beginner',
    phrase: 'ราคาเท่าไหร่ครับ',
    outcome: 'Ask how much and buy one simple item confidently.',
  },
  {
    title: 'Order food and spice level',
    href: '/lessons/week-3',
    emoji: '🍜',
    status: 'Lesson ready',
    time: '6 min',
    level: 'Practical',
    phrase: 'ไม่เผ็ดครับ',
    outcome: 'Order local food and ask for not spicy / a little spicy.',
  },
  {
    title: 'Tell a driver where to stop',
    href: '/lessons/week-4',
    emoji: '🚗',
    status: 'Lesson ready',
    time: '5 min',
    level: 'Practical',
    phrase: 'จอดตรงนี้ครับ',
    outcome: 'Use simple directions with Grab, songthaew, or local drivers.',
  },
  {
    title: 'Ask where the bathroom is',
    href: '/products/50-thai-phrases-chiang-mai.html',
    emoji: '🚻',
    status: 'Phrasebook',
    time: '2 min',
    level: 'Easy',
    phrase: 'ห้องน้ำอยู่ที่ไหนครับ',
    outcome: 'Ask for the bathroom in a cafe, mall, temple, or restaurant.',
  },
  {
    title: 'Talk to condo security',
    href: '/products/50-thai-phrases-chiang-mai.html',
    emoji: '🏢',
    status: 'Planned mission',
    time: '5 min',
    level: 'Daily life',
    phrase: 'ช่วยหน่อยได้ไหมครับ',
    outcome: 'Ask for simple help around your condo or apartment.',
  },
  {
    title: 'Visit a temple politely',
    href: '/lessons/week-4',
    emoji: '🛕',
    status: 'Lesson ready',
    time: '5 min',
    level: 'Culture',
    phrase: 'ถ่ายรูปได้ไหมครับ',
    outcome: 'Ask permission and avoid awkward cultural mistakes.',
  },
]

export default function MissionsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-jasmine text-tamarind">
        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="inline-flex min-h-11 items-center rounded-full border border-tamarind/10 bg-surface px-4 py-2 text-sm font-bold text-indigo shadow-sm">
                Mission library · No login to start
              </p>
              <h1 className="mt-6 text-5xl font-black leading-none text-balance md:text-7xl">
                5-minute Thai missions for Chiang Mai.
              </h1>
              <p className="mt-6 text-lg leading-8 text-tamarind/72 text-pretty md:text-xl md:leading-9">
                Choose one real situation, learn one useful Thai phrase, complete a small roleplay, then use it outside. This is built to feel easier than a lecture and more practical than a phrase list.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {missions.map((mission, index) => (
                <Link key={mission.title} href={mission.href} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                  <article className={`h-full rounded-[1.5rem] border p-5 shadow-sm transition duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-lg ${index === 0 ? 'border-turmeric bg-banana/10' : 'border-tamarind/10 bg-surface'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-jasmine text-2xl shadow-inner" aria-hidden="true">{mission.emoji}</span>
                      <span className="rounded-full bg-jasmine px-3 py-1 text-xs font-black text-indigo">{mission.time}</span>
                    </div>
                    <p className="mt-5 text-xs font-black uppercase text-temple">{mission.status} · {mission.level}</p>
                    <h2 className="mt-2 text-2xl font-black leading-tight text-balance">{mission.title}</h2>
                    <div className="mt-4 rounded-2xl bg-indigo p-4 text-surface">
                      <p className="text-xl font-black">{mission.phrase}</p>
                    </div>
                    <p className="mt-4 min-h-20 text-sm leading-6 text-tamarind/70 text-pretty">{mission.outcome}</p>
                    <p className="mt-5 border-t border-tamarind/10 pt-4 font-black text-indigo">Open mission →</p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface px-4 py-14">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="text-sm font-black uppercase text-temple">Design rule</p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-balance">
                Practice first. Explanation second.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {['Real situation', 'One useful phrase', 'Human correction'].map((item) => (
                <div key={item} className="rounded-2xl border border-tamarind/10 bg-jasmine p-5 shadow-sm">
                  <p className="font-black text-indigo">{item}</p>
                  <p className="mt-2 text-sm leading-6 text-tamarind/65">Small, practical, and easy to try in Chiang Mai today.</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
