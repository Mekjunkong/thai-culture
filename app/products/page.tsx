import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import CheckoutButton from '@/components/checkout/CheckoutButton'

export const metadata: Metadata = {
  title: 'Thai Lesson Products Online & On-site | Thai Lessons Chiang Mai',
  description:
    'Choose online Thai coaching, in-person Chiang Mai lessons, Starter Pack, workbook, and voice-note correction for practical Thai speaking.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Thai Lesson Products Online & On-site',
    description: 'A clear product ladder for practical Thai missions, online coaching, on-site Chiang Mai lessons, and voice-note correction.',
    url: '/products',
    type: 'website',
  },
}

const productLadder = [
  {
    level: '01',
    name: 'Free Practice App',
    price: '฿0',
    bestFor: 'Trying the method before paying',
    outcome: 'Learn useful phrases with flashcards, quizzes, stars, and short Chiang Mai categories.',
    includes: ['Cafe, market, restaurant, transport, and polite basics', 'No login and no credit card', 'Progress saved in your browser'],
    href: '/practice',
    cta: 'Open practice app',
  },
  {
    level: '02',
    name: '30-Minute Speaking Trial',
    price: '฿199 online / ฿299 on-site',
    bestFor: 'First correction and confidence check',
    outcome: 'Leave with one sentence you can say more naturally and one clear next step.',
    includes: ['Friendly level check', 'One mission roleplay', 'Pronunciation correction for tone, rhythm, and polite ending'],
    href: '#book',
    cta: 'Book trial',
  },
  {
    level: '03',
    name: 'Starter Pack',
    price: '฿990 online / ฿1,290 on-site',
    bestFor: 'Beginners who want a useful first week',
    outcome: 'Practice 5 real-life Chiang Mai situations and get 7 days of voice-note correction.',
    includes: ['One private lesson', 'Branded PDF workbook', 'Practice app + missions', '7 days WhatsApp voice correction'],
    href: '#book',
    cta: 'Book Starter Pack',
  },
  {
    level: '04',
    name: 'Chiang Mai Mission Walk',
    price: '฿1,500–฿2,500',
    bestFor: 'On-site learners who want real-world practice',
    outcome: 'Practice Thai in a real cafe, market, transport, or condo situation with teacher support.',
    includes: ['Printed mission card', 'Real-world roleplay', 'Teacher correction notes', 'After-class voice-note homework'],
    href: '#book',
    cta: 'Ask for mission walk',
  },
  {
    level: '05',
    name: '5-Lesson Survival Path',
    price: 'Custom package',
    bestFor: 'Expats staying in Chiang Mai for 1 month or longer',
    outcome: 'Build a practical beginner foundation across cafe, market, food, transport, and personal life.',
    includes: ['5 private sessions', 'Personal phrase bank', 'Weekly speaking homework', 'Before/after confidence tracker'],
    href: '#book',
    cta: 'Plan 5 lessons',
  },
]

const onlineFlow = [
  ['Before class', 'Choose one mission and send what you want to say in real life.'],
  ['During class', 'Video-call roleplay, phrase builder, pronunciation correction, and likely Thai replies.'],
  ['After class', 'Send a WhatsApp voice note, get correction, and repeat with the practice app.'],
]

const onsiteFlow = [
  ['Before meeting', 'Pick a location type: cafe, market, restaurant, transport, condo, or social Thai.'],
  ['During lesson', 'Use the printed workbook/mission card, roleplay, then try the phrase in the real place when appropriate.'],
  ['After lesson', 'Receive correction notes, one homework challenge, and a recommendation for the next mission.'],
]

const curriculum = [
  { lesson: 'Lesson 1', focus: 'Cafe + polite endings', result: 'Order one drink naturally.' },
  { lesson: 'Lesson 2', focus: 'Market + numbers', result: 'Ask price and buy one item.' },
  { lesson: 'Lesson 3', focus: 'Food + spice level', result: 'Order food and control spicy/sweet/ice details.' },
  { lesson: 'Lesson 4', focus: 'Transport + directions', result: 'Guide a driver and say where to stop.' },
  { lesson: 'Lesson 5', focus: 'Your personal situation', result: 'Build phrases for condo, gym, work, dating, or travel.' },
]

const deliverables = [
  'Practice app with stars, quizzes, and beginner phrase categories',
  'Interactive 5-minute missions for coffee, market, food, and transport',
  'Branded printable onsite workbook with QR codes',
  'Teacher correction boxes for tone, rhythm, vowel length, and confidence',
  'WhatsApp voice-note correction path after class',
  'Clear upgrade path from free practice to trial, Starter Pack, and 5 lessons',
]

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-jasmine text-tamarind">
        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-tamarind/10 bg-surface px-4 py-2 text-sm font-black uppercase text-indigo shadow-sm">
                Online + on-site Thai learning products
              </p>
              <h1 className="mt-6 text-5xl font-black leading-none tracking-[-0.06em] md:text-7xl">
                Choose the Thai product that matches your real life.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-tamarind/72 md:text-xl md:leading-9">
                Start free, book a short correction session, or learn on-site in Chiang Mai with printable mission cards and real-world practice.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#products" className="inline-flex min-h-13 items-center justify-center rounded-2xl bg-indigo px-7 py-4 font-black text-surface shadow-lg shadow-indigo/20 transition hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                  Compare products
                </Link>
                <a href="/products/onsite-chiang-mai-thai-lesson-pack.pdf" className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-tamarind/15 bg-surface px-7 py-4 font-black text-tamarind shadow-sm transition hover:border-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                  Download workbook
                </a>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-2xl shadow-tamarind/10">
              <p className="text-sm font-black uppercase text-temple">Product promise</p>
              <h2 className="mt-3 text-3xl font-black leading-tight">One useful Thai sentence you can use today.</h2>
              <div className="mt-5 grid gap-3">
                {deliverables.slice(0, 4).map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-jasmine p-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-banana text-xs font-black text-surface">✓</span>
                    <p className="font-bold leading-6 text-tamarind/75">{item}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="products" className="bg-surface px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase text-temple">Product ladder</p>
              <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] md:text-5xl">From free practice to real speaking support.</h2>
              <p className="mt-4 leading-8 text-tamarind/70">This makes the business easier to understand: free practice gets attention, trials create trust, and packages sell the transformation.</p>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-5">
              {productLadder.map((product) => (
                <article key={product.name} className={`rounded-[1.5rem] border p-5 shadow-sm ${product.name === 'Starter Pack' ? 'border-turmeric bg-banana/10 shadow-lg shadow-tamarind/10' : 'border-tamarind/10 bg-jasmine'}`}>
                  <p className="text-sm font-black text-temple">{product.level}</p>
                  <h3 className="mt-3 text-2xl font-black leading-tight">{product.name}</h3>
                  <p className="mt-3 text-xl font-black text-indigo">{product.price}</p>
                  <p className="mt-3 text-sm font-bold text-tamarind/55">Best for: {product.bestFor}</p>
                  <p className="mt-4 min-h-24 leading-7 text-tamarind/70">{product.outcome}</p>
                  <ul className="mt-4 space-y-2 border-t border-tamarind/10 pt-4 text-sm leading-6 text-tamarind/70">
                    {product.includes.map((item) => <li key={item}>✓ {item}</li>)}
                  </ul>
                  {product.href === '#book' ? (
                    <div className="mt-5"><CheckoutButton>{product.cta}</CheckoutButton></div>
                  ) : (
                    <Link href={product.href} className="mt-5 inline-flex min-h-12 items-center justify-center rounded-2xl bg-indigo px-5 py-3 font-black text-surface transition hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                      {product.cta}
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-tamarind/10 bg-surface p-6 shadow-sm">
              <p className="text-sm font-black uppercase text-temple">Online product</p>
              <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em]">Remote lessons that still feel personal.</h2>
              <div className="mt-6 grid gap-3">
                {onlineFlow.map(([step, detail]) => (
                  <div key={step} className="rounded-2xl bg-jasmine p-4">
                    <p className="font-black text-indigo">{step}</p>
                    <p className="mt-1 leading-7 text-tamarind/70">{detail}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-[2rem] border border-turmeric bg-banana/10 p-6 shadow-lg shadow-tamarind/10">
              <p className="text-sm font-black uppercase text-temple">On-site product</p>
              <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em]">Chiang Mai lessons should feel like a local mission.</h2>
              <div className="mt-6 grid gap-3">
                {onsiteFlow.map(([step, detail]) => (
                  <div key={step} className="rounded-2xl bg-surface p-4">
                    <p className="font-black text-indigo">{step}</p>
                    <p className="mt-1 leading-7 text-tamarind/70">{detail}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="bg-indigo px-4 py-16 text-surface md:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-black uppercase text-turmeric">5-lesson survival path</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] md:text-5xl">A real beginner package, not random lessons.</h2>
            <div className="mt-10 grid gap-3 md:grid-cols-5">
              {curriculum.map((item) => (
                <article key={item.lesson} className="rounded-[1.5rem] border border-surface/10 bg-surface/10 p-5">
                  <p className="text-sm font-black text-turmeric">{item.lesson}</p>
                  <h3 className="mt-3 text-xl font-black leading-tight">{item.focus}</h3>
                  <p className="mt-3 text-sm leading-6 text-surface/75">{item.result}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="book" className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-surface p-6 text-center shadow-2xl shadow-tamarind/10 md:p-10">
            <p className="text-sm font-black uppercase text-temple">Best next step</p>
            <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] md:text-5xl">Start with one trial or one Starter Pack.</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-tamarind/70">Send one message with your situation: cafe, market, restaurant, driver, condo, work, dating, or daily life. I will suggest the best lesson format.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <CheckoutButton>Book on WhatsApp</CheckoutButton>
              <Link href="/practice" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-tamarind/15 px-6 py-3 font-black text-indigo transition hover:border-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                Try free practice first
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
