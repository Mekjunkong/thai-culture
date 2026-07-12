import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRightIcon,
  BasketIcon,
  BowlFoodIcon,
  BuildingApartmentIcon,
  CarIcon,
  CoffeeIcon,
  HandWavingIcon,
  MapPinIcon,
  ToiletIcon,
} from '@phosphor-icons/react/ssr'
import Navbar from '@/components/ui/Navbar'
import SiteFooter from '@/components/ui/SiteFooter'
import Reveal from '@/components/ui/Reveal'

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

const missions = [
  {
    title: 'Order coffee less sweet',
    href: '/missions/order-coffee',
    icon: CoffeeIcon,
    status: 'Live interactive mission',
    time: '5 min',
    level: 'Beginner',
    phrase: 'ขอกาแฟเย็นหวานน้อยครับ',
    outcome: 'Order one drink politely in a Chiang Mai cafe.',
    bestFor: 'cafe confidence',
  },
  {
    title: 'Ask the price at a market',
    href: '/missions/market-price',
    icon: BasketIcon,
    status: 'Live interactive mission',
    time: '5 min',
    level: 'Beginner',
    phrase: 'ราคาเท่าไหร่ครับ',
    outcome: 'Ask how much and buy one simple item confidently.',
    bestFor: 'market survival',
  },
  {
    title: 'Say hello politely',
    href: '/lessons/week-1',
    icon: HandWavingIcon,
    status: 'Lesson ready',
    time: '3 min',
    level: 'Beginner',
    phrase: 'สวัสดีครับ / ค่ะ',
    outcome: 'Greet people naturally and understand wai + khrap/kha.',
    bestFor: 'first impressions',
  },
  {
    title: 'Order food and spice level',
    href: '/missions/order-food-spice',
    icon: BowlFoodIcon,
    status: 'Live interactive mission',
    time: '6 min',
    level: 'Practical',
    phrase: 'ไม่เผ็ดครับ',
    outcome: 'Order local food and ask for not spicy / a little spicy.',
    bestFor: 'restaurants',
  },
  {
    title: 'Tell a driver where to stop',
    href: '/missions/driver-stop',
    icon: CarIcon,
    status: 'Live interactive mission',
    time: '5 min',
    level: 'Practical',
    phrase: 'จอดตรงนี้ครับ',
    outcome: 'Use simple directions with Grab, songthaew, or local drivers.',
    bestFor: 'transport',
  },
  {
    title: 'Ask where the bathroom is',
    href: '/products/50-thai-phrases-chiang-mai.html',
    icon: ToiletIcon,
    status: 'Phrasebook',
    time: '2 min',
    level: 'Easy',
    phrase: 'ห้องน้ำอยู่ที่ไหนครับ',
    outcome: 'Ask for the bathroom in a cafe, mall, temple, or restaurant.',
    bestFor: 'urgent basics',
  },
  {
    title: 'Talk to condo security',
    href: '/products/50-thai-phrases-chiang-mai.html',
    icon: BuildingApartmentIcon,
    status: 'Planned mission',
    time: '5 min',
    level: 'Daily life',
    phrase: 'ช่วยหน่อยได้ไหมครับ',
    outcome: 'Ask for simple help around your condo or apartment.',
    bestFor: 'daily living',
  },
  {
    title: 'Visit a temple politely',
    href: '/lessons/week-4',
    icon: MapPinIcon,
    status: 'Lesson ready',
    time: '5 min',
    level: 'Culture',
    phrase: 'ถ่ายรูปได้ไหมครับ',
    outcome: 'Ask permission and avoid awkward cultural mistakes.',
    bestFor: 'culture',
  },
]

const filters = ['Start with live missions', 'Then learn polite basics', 'Then book correction']

export default function MissionsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-jasmine text-tamarind">
        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <p className="inline-flex min-h-11 items-center rounded-full border border-tamarind/10 bg-surface px-4 py-2 text-sm font-black text-indigo shadow-sm">
                  Free Thai practice · No login to start
                </p>
                <h1 className="mt-6 text-5xl font-black leading-none tracking-[-0.06em] text-balance md:text-7xl">
                  Pick one Thai mission and use it today.
                </h1>
                <p className="mt-6 text-lg leading-8 text-tamarind/72 text-pretty md:text-xl md:leading-9">
                  Short practical missions for Chiang Mai life: cafes, markets, food, transport, greetings, condos, and temples. Start free, then book human correction when you want help speaking clearly.
                </p>
              </div>
              <div className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-sm">
                <p className="text-sm font-bold text-temple">Recommended learning path</p>
                <div className="mt-4 grid gap-3">
                  {filters.map((item, index) => (
                    <div key={item} className="flex gap-3 rounded-2xl bg-jasmine p-4">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo text-sm font-black text-surface">{index + 1}</span>
                      <p className="font-bold leading-7 text-tamarind/78 text-pretty">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {missions.map((mission, index) => {
                const isLive = mission.status.startsWith('Live')
                const MissionIcon = mission.icon
                return (
                  <Reveal key={mission.title} index={index}>
                    <Link href={mission.href} className="group block h-full rounded-[1.5rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                      <article className={`h-full rounded-[1.5rem] border p-5 shadow-sm transition duration-150 ease-out group-hover:-translate-y-0.5 group-hover:shadow-lg ${isLive ? 'border-turmeric bg-banana/10' : 'border-tamarind/10 bg-surface'} ${index === 0 ? 'lg:col-span-2' : ''}`}>
                        <div className="flex items-start justify-between gap-4">
                          <span className="flex size-12 items-center justify-center rounded-2xl bg-jasmine text-indigo shadow-inner" aria-hidden="true">
                            <MissionIcon className="size-6" weight="duotone" />
                          </span>
                          <span className="rounded-full bg-jasmine px-3 py-1 text-xs font-black text-indigo">{mission.time}</span>
                        </div>
                        <p className="mt-5 text-xs font-black uppercase text-temple">{mission.status} · {mission.level}</p>
                        <h2 className="mt-2 text-2xl font-black leading-tight text-balance">{mission.title}</h2>
                        <p className="mt-2 text-sm font-bold text-tamarind/55">Best for: {mission.bestFor}</p>
                        <div className="mt-4 rounded-2xl bg-indigo p-4 text-surface">
                          <p className="text-xl font-black">{mission.phrase}</p>
                        </div>
                        <p className="mt-4 min-h-20 text-sm leading-6 text-tamarind/70 text-pretty">{mission.outcome}</p>
                        <p className="mt-5 inline-flex items-center gap-2 border-t border-tamarind/10 pt-4 font-black text-indigo">
                          {isLive ? 'Start interactive mission' : 'Open lesson'}
                          <ArrowRightIcon className="size-4 transition duration-150 ease-out group-hover:translate-x-1" weight="bold" aria-hidden="true" />
                        </p>
                      </article>
                    </Link>
                  </Reveal>
                )
              })}
              <Reveal index={missions.length}>
                <Link href="/tones" className="group block h-full rounded-[1.5rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                  <article className="flex h-full flex-col justify-between rounded-[1.5rem] border border-turmeric bg-banana/10 p-5 shadow-sm transition duration-150 ease-out group-hover:-translate-y-0.5 group-hover:shadow-lg">
                    <div>
                      <p className="text-xs font-black uppercase text-temple">New tool</p>
                      <h2 className="mt-2 text-2xl font-black leading-tight text-balance">🎵 New: Tone trainer — hear and speak the 5 tones</h2>
                    </div>
                    <p className="mt-5 inline-flex items-center gap-2 border-t border-tamarind/10 pt-4 font-black text-indigo">
                      Start tone trainer
                      <ArrowRightIcon className="size-4 transition duration-150 ease-out group-hover:translate-x-1" weight="bold" aria-hidden="true" />
                    </p>
                  </article>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-surface px-4 py-14">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="text-sm font-bold text-temple">Practice design</p>
              <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] text-balance">
                Practice first. Explanation second.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {['Real situation', 'One useful phrase', 'Human correction'].map((item, index) => (
                <Reveal key={item} index={index}>
                  <div className="rounded-2xl border border-tamarind/10 bg-jasmine p-5 shadow-sm">
                    <p className="font-black text-indigo">{item}</p>
                    <p className="mt-2 text-sm leading-6 text-tamarind/65 text-pretty">Small, practical, and easy to try in Chiang Mai today.</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
