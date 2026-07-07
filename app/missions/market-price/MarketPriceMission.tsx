'use client'

import { useEffect, useMemo, useState } from 'react'

type MarketItem = {
  id: string
  emoji: string
  label: string
  thai: string
  roman: string
  price: number
}

type Quantity = {
  id: string
  label: string
  thai: string
  roman: string
  multiplier: number
}

const items: MarketItem[] = [
  { id: 'mango', emoji: '🥭', label: 'Mangoes', thai: 'มะม่วง', roman: 'ma-muang', price: 60 },
  { id: 'banana', emoji: '🍌', label: 'Bananas', thai: 'กล้วย', roman: 'gluay', price: 35 },
  { id: 'coconut', emoji: '🥥', label: 'Coconut', thai: 'มะพร้าว', roman: 'ma-phrao', price: 40 },
  { id: 'watermelon', emoji: '🍉', label: 'Watermelon', thai: 'แตงโม', roman: 'dtaeng-moh', price: 30 },
]

const quantities: Quantity[] = [
  { id: 'one-kilo', label: '1 kilo', thai: 'หนึ่งกิโล', roman: 'neung gi-loh', multiplier: 1 },
  { id: 'half-kilo', label: 'Half kilo', thai: 'ครึ่งกิโล', roman: 'khreung gi-loh', multiplier: 0.5 },
  { id: 'one-piece', label: '1 piece', thai: 'หนึ่งลูก', roman: 'neung luuk', multiplier: 1 },
]

const priceWords = [
  { value: 30, thai: 'สามสิบบาท', roman: 'saam-sip baht' },
  { value: 35, thai: 'สามสิบห้าบาท', roman: 'saam-sip haa baht' },
  { value: 40, thai: 'สี่สิบบาท', roman: 'see-sip baht' },
  { value: 60, thai: 'หกสิบบาท', roman: 'hok-sip baht' },
]

const steps = [
  'Ask the price',
  'Choose fruit',
  'Say quantity',
  'Answer vendor',
]

function priceToThai(price: number) {
  return priceWords.find((item) => item.value === price) ?? { value: price, thai: `${price} บาท`, roman: `${price} baht` }
}

export default function MarketPriceMission() {
  const [itemId, setItemId] = useState(items[0].id)
  const [quantityId, setQuantityId] = useState(quantities[0].id)
  const [particle, setParticle] = useState<'ครับ' | 'ค่ะ'>('ครับ')
  const [checks, setChecks] = useState({ asked: false, repeated: false, noLook: false })
  const [priceChoice, setPriceChoice] = useState<number | null>(null)
  const [roleplayChoice, setRoleplayChoice] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)

  const item = items.find((marketItem) => marketItem.id === itemId) ?? items[0]
  const quantity = quantities.find((marketQuantity) => marketQuantity.id === quantityId) ?? quantities[0]
  const totalPrice = Math.round(item.price * quantity.multiplier)
  const priceWord = priceToThai(totalPrice)

  const askPhrase = `ราคาเท่าไหร่${particle}`
  const askRoman = `raa-khaa thao-rai ${particle === 'ครับ' ? 'khrap' : 'kha'}`
  const buyPhrase = `ขอ${item.thai}${quantity.thai}${particle}`
  const buyRoman = `khǎaw ${item.roman} ${quantity.roman} ${particle === 'ครับ' ? 'khrap' : 'kha'}`

  const roleplayOptions = useMemo(
    () => [
      buyPhrase,
      `ห้องน้ำอยู่ที่ไหน${particle}`,
      `ขอกาแฟเย็นหวานน้อย${particle}`,
    ],
    [buyPhrase, particle],
  )

  const progress = [checks.asked, Boolean(itemId), checks.repeated, priceChoice === totalPrice && roleplayChoice === buyPhrase]
  const progressCount = progress.filter(Boolean).length
  const progressPercent = Math.round((progressCount / steps.length) * 100)
  const canComplete = progressCount === steps.length && checks.noLook

  useEffect(() => {
    const saved = window.localStorage.getItem('tlcm-market-price-complete')
    if (saved === 'true') setCompleted(true)
  }, [])

  useEffect(() => {
    if (canComplete) {
      window.localStorage.setItem('tlcm-market-price-complete', 'true')
      setCompleted(true)
    }
  }, [canComplete])

  function toggleCheck(key: keyof typeof checks) {
    setChecks((current) => ({ ...current, [key]: !current[key] }))
  }

  const whatsappText = encodeURIComponent(
    `Hi Mike, I completed the Market Price Thai mission. Can I send you a voice note for correction? My phrases are: ${askPhrase} / ${buyPhrase}`,
  )

  return (
    <div className="bg-jasmine text-tamarind">
      <section className="relative overflow-hidden px-4 py-12 md:py-16">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_12%_12%,oklch(78%_0.14_84/.30),transparent_30%),radial-gradient(circle_at_82%_6%,oklch(58%_0.18_31/.15),transparent_34%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-turmeric/40 bg-surface px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-indigo shadow-sm">
                Free 5-minute Thai mission
              </p>
              <h1 className="mt-5 text-[clamp(2.5rem,7vw,5.6rem)] font-black leading-[0.94] tracking-[-0.06em] text-balance">
                Ask the price at a Chiang Mai market.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-tamarind/75 md:text-xl md:leading-9">
                Practice two useful phrases: ask “How much?” and buy fruit politely. Short, practical, and made for real market confidence.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-4">
                {steps.map((step, index) => (
                  <div key={step} className={`rounded-2xl border p-3 text-sm font-bold ${progress[index] ? 'border-banana/50 bg-banana/12 text-banana' : 'border-tamarind/10 bg-surface text-tamarind/65'}`}>
                    <span className="block text-xs uppercase tracking-[0.12em]">Step {index + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-2xl shadow-tamarind/12 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-temple">Mission progress</p>
                  <p className="mt-1 text-3xl font-black text-indigo">{progressPercent}%</p>
                </div>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-jasmine text-4xl shadow-inner" aria-hidden="true">
                  {completed ? '🏆' : '🥭'}
                </div>
              </div>
              <div className="mt-4 h-4 overflow-hidden rounded-full bg-jasmine">
                <div className="h-full rounded-full bg-banana transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>
              <p className="mt-4 rounded-2xl bg-jasmine p-4 text-sm leading-6 text-tamarind/75">
                Today’s Thai win: <strong>I can ask a price and buy one thing at a market.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
            <h2 className="text-2xl font-black tracking-[-0.03em]">1. Ask the price</h2>
            <div className="mt-5 rounded-[1.5rem] bg-indigo p-5 text-surface md:p-7">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-turmeric">Say this first</p>
              <p className="mt-3 text-4xl font-black leading-tight md:text-5xl">{askPhrase}</p>
              <p className="mt-4 text-lg text-surface/78">{askRoman}</p>
              <p className="mt-2 text-surface/78">How much is it?</p>
            </div>

            <div className="mt-5 rounded-2xl border border-turmeric/30 bg-banana/10 p-4 text-sm leading-6 text-tamarind/75">
              <p className="font-black text-tamarind">Pronunciation rhythm</p>
              <p>Break it into chunks. Do not rush: <strong>ราคา</strong> · <strong>เท่าไหร่</strong> · <strong>{particle}</strong></p>
            </div>

            <div className="mt-5 grid gap-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-jasmine p-4 font-semibold text-tamarind/78">
                <input type="checkbox" checked={checks.asked} onChange={() => toggleCheck('asked')} className="h-5 w-5 accent-indigo" />
                I asked the price out loud 3 times
              </label>
            </div>

            <h2 className="mt-8 text-2xl font-black tracking-[-0.03em]">2. Choose what you want to buy</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {items.map((marketItem) => (
                <button
                  key={marketItem.id}
                  type="button"
                  onClick={() => {
                    setItemId(marketItem.id)
                    setPriceChoice(null)
                    setRoleplayChoice(null)
                  }}
                  className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${itemId === marketItem.id ? 'border-turmeric bg-banana/12 shadow-md shadow-tamarind/8' : 'border-tamarind/10 bg-jasmine hover:border-turmeric/60'}`}
                >
                  <span className="text-3xl" aria-hidden="true">{marketItem.emoji}</span>
                  <span className="mt-3 block font-black text-tamarind">{marketItem.label}</span>
                  <span className="mt-1 block text-lg font-bold text-indigo">{marketItem.thai}</span>
                  <span className="text-sm text-tamarind/60">{marketItem.roman}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="grid gap-6">
            <div className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-black tracking-[-0.03em]">3. Build your buying phrase</h2>
                <div className="rounded-full bg-jasmine p-1 text-sm font-bold">
                  {(['ครับ', 'ค่ะ'] as const).map((ending) => (
                    <button
                      key={ending}
                      type="button"
                      onClick={() => setParticle(ending)}
                      className={`rounded-full px-4 py-2 ${particle === ending ? 'bg-indigo text-surface' : 'text-tamarind/65'}`}
                    >
                      {ending}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {quantities.map((marketQuantity) => (
                  <button
                    key={marketQuantity.id}
                    type="button"
                    onClick={() => {
                      setQuantityId(marketQuantity.id)
                      setPriceChoice(null)
                      setRoleplayChoice(null)
                    }}
                    className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${quantityId === marketQuantity.id ? 'border-turmeric bg-banana/12 shadow-md shadow-tamarind/8' : 'border-tamarind/10 bg-jasmine hover:border-turmeric/60'}`}
                  >
                    <span className="font-black text-tamarind">{marketQuantity.label}</span>
                    <span className="mt-1 block text-lg font-bold text-indigo">{marketQuantity.thai}</span>
                    <span className="text-sm text-tamarind/60">{marketQuantity.roman}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-[1.5rem] bg-indigo p-5 text-surface md:p-7">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-turmeric">Then buy it</p>
                <p className="mt-3 text-4xl font-black leading-tight md:text-5xl">{buyPhrase}</p>
                <p className="mt-4 text-lg text-surface/78">{buyRoman}</p>
                <p className="mt-2 text-surface/78">I’d like {item.label.toLowerCase()}, {quantity.label.toLowerCase()}, please.</p>
              </div>

              <div className="mt-5 grid gap-3 rounded-[1.5rem] bg-jasmine p-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-surface p-4">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-temple">Chunk 1</p>
                  <p className="mt-2 text-2xl font-black text-indigo">ขอ {item.thai}</p>
                  <p className="text-sm text-tamarind/60">khǎaw {item.roman}</p>
                </div>
                <div className="rounded-2xl bg-surface p-4">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-temple">Chunk 2</p>
                  <p className="mt-2 text-2xl font-black text-indigo">{quantity.thai}</p>
                  <p className="text-sm text-tamarind/60">{quantity.roman}</p>
                </div>
                <div className="rounded-2xl bg-surface p-4">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-temple">Polite ending</p>
                  <p className="mt-2 text-2xl font-black text-indigo">{particle}</p>
                  <p className="text-sm text-tamarind/60">{particle === 'ครับ' ? 'khrap' : 'kha'}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {([
                  ['repeated', 'I repeated the buying phrase 3 times'],
                  ['noLook', 'I can say both phrases without looking'],
                ] as const).map(([key, label]) => (
                  <label key={key} className="flex cursor-pointer items-center gap-3 rounded-2xl bg-jasmine p-4 font-semibold text-tamarind/78">
                    <input type="checkbox" checked={checks[key]} onChange={() => toggleCheck(key)} className="h-5 w-5 accent-indigo" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
              <h2 className="text-2xl font-black tracking-[-0.03em]">4. Market roleplay</h2>
              <p className="mt-2 text-tamarind/70">Vendor says:</p>
              <p className="mt-3 rounded-2xl bg-jasmine p-4 text-3xl font-black text-indigo">{priceWord.thai}</p>
              <p className="mt-2 text-sm text-tamarind/60">{priceWord.roman} — {totalPrice} baht</p>

              <p className="mt-5 font-black text-tamarind">What price did you hear?</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {[totalPrice, totalPrice + 10, Math.max(20, totalPrice - 10)].map((price) => {
                  const isSelected = priceChoice === price
                  const isCorrect = price === totalPrice
                  return (
                    <button
                      key={price}
                      type="button"
                      onClick={() => setPriceChoice(price)}
                      className={`rounded-2xl border p-4 text-center text-lg font-black transition hover:-translate-y-0.5 ${isSelected && isCorrect ? 'border-banana bg-banana/15 text-banana' : isSelected ? 'border-red-300 bg-red-50 text-red-700' : 'border-tamarind/10 bg-jasmine text-tamarind hover:border-turmeric/60'}`}
                    >
                      {price} baht
                    </button>
                  )
                })}
              </div>

              <p className="mt-6 font-black text-tamarind">Now answer the vendor politely:</p>
              <div className="mt-3 grid gap-3">
                {roleplayOptions.map((option) => {
                  const isSelected = roleplayChoice === option
                  const isCorrect = option === buyPhrase
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRoleplayChoice(option)}
                      className={`rounded-2xl border p-4 text-left text-lg font-bold transition hover:-translate-y-0.5 ${isSelected && isCorrect ? 'border-banana bg-banana/15 text-banana' : isSelected ? 'border-red-300 bg-red-50 text-red-700' : 'border-tamarind/10 bg-jasmine text-tamarind hover:border-turmeric/60'}`}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>

              {(priceChoice || roleplayChoice) && (
                <p className={`mt-4 rounded-2xl p-4 font-bold ${priceChoice === totalPrice && roleplayChoice === buyPhrase ? 'bg-banana/12 text-banana' : 'bg-jasmine text-tamarind/70'}`}>
                  {priceChoice === totalPrice && roleplayChoice === buyPhrase
                    ? 'Correct — market mission almost complete!'
                    : 'Keep going. Listen for the baht amount, then choose the phrase that buys your item.'}
                </p>
              )}
            </div>
          </section>
        </div>

        <section className="mx-auto mt-6 max-w-6xl rounded-[2rem] border border-tamarind/10 bg-indigo p-6 text-surface shadow-xl shadow-tamarind/12 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-turmeric">{completed ? 'Mission complete 🏆' : 'Finish the roleplay to complete'}</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-4xl">Send your market voice note for correction.</h2>
              <p className="mt-3 max-w-2xl leading-7 text-surface/82">
                Record yourself saying “{askPhrase}” and “{buyPhrase}”. Mike can correct pronunciation, rhythm, tone feeling, and politeness.
              </p>
            </div>
            <a
              href={`https://wa.me/66929894495?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-turmeric px-6 py-3 text-center font-black text-tamarind shadow-lg shadow-tamarind/20 transition hover:-translate-y-0.5"
            >
              WhatsApp Mike
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
