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
  const nextAction = progressCount < 1 ? 'Ask the price out loud' : progressCount < 2 ? 'Choose fruit' : progressCount < 3 ? 'Practice the buying phrase' : progressCount < 4 ? 'Finish the vendor roleplay' : checks.noLook ? 'Mission complete' : 'Say both phrases without looking'

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
    <div className="bg-paper text-ink">
      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm font-bold text-tamarind/60">
            <a href="/missions" className="text-clay underline-offset-4 hover:underline">Missions</a>
            <span aria-hidden="true">/</span>
            <span>Market price</span>
          </nav>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[.14em] text-clay">
                Free 5-minute Thai mission
              </p>
              <h1 className="mt-5 font-serif text-[clamp(2.5rem,7vw,5.6rem)] font-bold leading-[1.05] text-balance">
                Ask the price at a Chiang Mai market.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-tamarind/75 md:text-xl md:leading-9">
                Practice two useful phrases: ask “How much?” and buy fruit politely. Short, practical, and made for real market confidence.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-4" aria-label="Mission steps">
                {steps.map((step, index) => (
                  <div key={step} className={`rounded-none border p-3 text-sm font-bold ${progress[index] ? 'border-honey/50 bg-sand/12 text-honey' : 'border-tamarind/10 bg-surface text-tamarind/65'}`}>
                    <span className="block text-xs uppercase tracking-[0.12em]">Step {index + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-none border border-tamarind/10 bg-surface p-5 md:p-6" aria-label="Mission progress">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-clay">Mission progress</p>
                  <p className="mt-1 text-3xl font-bold text-clay">{progressPercent}%</p>
                </div>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-jasmine text-4xl shadow-inner" aria-hidden="true">
                  {completed ? '🏆' : '🥭'}
                </div>
              </div>
              <div className="mt-4 h-4 overflow-hidden rounded-full bg-jasmine" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent} aria-label="Mission progress">
                <div className="h-full rounded-full bg-sand transition-all duration-150 ease-out" style={{ width: `${progressPercent}%` }} />
              </div>
              <p className="mt-4 rounded-none bg-jasmine p-4 text-sm leading-6 text-tamarind/75">
                Today’s Thai win: <strong>I can ask a price and buy one thing at a market.</strong>
              </p>
              <p className="mt-3 text-sm font-bold text-clay">Next: {nextAction}</p>
            </aside>
          </div>
        </div>
      </section>

      <main className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-none border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
            <h2 className="text-2xl font-serif font-normal tracking-[-0.03em]">1. Ask the price</h2>
            <div className="mt-5 rounded-none bg-ink p-5 text-surface md:p-7">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-honey">Say this first</p>
              <p className="mt-3 text-4xl font-bold leading-tight md:text-5xl">{askPhrase}</p>
              <p className="mt-4 text-lg text-surface/78">{askRoman}</p>
              <p className="mt-2 text-surface/78">How much is it?</p>
            </div>

            <div className="mt-5 rounded-none border border-honey/30 bg-sand/10 p-4 text-sm leading-6 text-tamarind/75">
              <p className="font-bold text-tamarind">Pronunciation rhythm</p>
              <p>Break it into chunks. Do not rush: <strong>ราคา</strong> · <strong>เท่าไหร่</strong> · <strong>{particle}</strong></p>
            </div>

            <div className="mt-5 grid gap-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-none bg-jasmine p-4 font-semibold text-tamarind/78">
                <input type="checkbox" checked={checks.asked} onChange={() => toggleCheck('asked')} className="h-5 w-5 accent-clay" />
                I asked the price out loud 3 times
              </label>
            </div>

            <h2 className="mt-8 text-2xl font-serif font-normal tracking-[-0.03em]">2. Choose what you want to buy</h2>
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
                  className={`rounded-none border p-4 text-left transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${itemId === marketItem.id ? 'border-honey bg-sand/12' : 'border-tamarind/10 bg-jasmine hover:border-honey/60'}`}
                  aria-pressed={itemId === marketItem.id}
                >
                  <span className="text-3xl" aria-hidden="true">{marketItem.emoji}</span>
                  <span className="mt-3 block font-bold text-tamarind">{marketItem.label}</span>
                  <span className="mt-1 block text-lg font-bold text-clay">{marketItem.thai}</span>
                  <span className="text-sm text-tamarind/60">{marketItem.roman}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="grid gap-6">
            <div className="rounded-none border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-serif font-normal tracking-[-0.03em]">3. Build your buying phrase</h2>
                <div className="rounded-full bg-jasmine p-1 text-sm font-bold">
                  {(['ครับ', 'ค่ะ'] as const).map((ending) => (
                    <button
                      key={ending}
                      type="button"
                      onClick={() => setParticle(ending)}
                      className={`rounded-full px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay ${particle === ending ? 'bg-ink text-surface' : 'text-tamarind/65'}`}
                      aria-pressed={particle === ending}
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
                    className={`rounded-none border p-4 text-left transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${quantityId === marketQuantity.id ? 'border-honey bg-sand/12' : 'border-tamarind/10 bg-jasmine hover:border-honey/60'}`}
                    aria-pressed={quantityId === marketQuantity.id}
                  >
                    <span className="font-bold text-tamarind">{marketQuantity.label}</span>
                    <span className="mt-1 block text-lg font-bold text-clay">{marketQuantity.thai}</span>
                    <span className="text-sm text-tamarind/60">{marketQuantity.roman}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-none bg-ink p-5 text-surface md:p-7">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-honey">Then buy it</p>
                <p className="mt-3 text-4xl font-bold leading-tight md:text-5xl">{buyPhrase}</p>
                <p className="mt-4 text-lg text-surface/78">{buyRoman}</p>
                <p className="mt-2 text-surface/78">I’d like {item.label.toLowerCase()}, {quantity.label.toLowerCase()}, please.</p>
              </div>

              <div className="mt-5 grid gap-3 rounded-none bg-jasmine p-4 sm:grid-cols-3">
                <div className="rounded-none bg-surface p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-clay">Chunk 1</p>
                  <p className="mt-2 text-2xl font-bold text-clay">ขอ {item.thai}</p>
                  <p className="text-sm text-tamarind/60">khǎaw {item.roman}</p>
                </div>
                <div className="rounded-none bg-surface p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-clay">Chunk 2</p>
                  <p className="mt-2 text-2xl font-bold text-clay">{quantity.thai}</p>
                  <p className="text-sm text-tamarind/60">{quantity.roman}</p>
                </div>
                <div className="rounded-none bg-surface p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-clay">Polite ending</p>
                  <p className="mt-2 text-2xl font-bold text-clay">{particle}</p>
                  <p className="text-sm text-tamarind/60">{particle === 'ครับ' ? 'khrap' : 'kha'}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {([
                  ['repeated', 'I repeated the buying phrase 3 times'],
                  ['noLook', 'I can say both phrases without looking'],
                ] as const).map(([key, label]) => (
                  <label key={key} className="flex cursor-pointer items-center gap-3 rounded-none bg-jasmine p-4 font-semibold text-tamarind/78">
                    <input type="checkbox" checked={checks[key]} onChange={() => toggleCheck(key)} className="h-5 w-5 accent-clay" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-none border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
              <h2 className="text-2xl font-serif font-normal tracking-[-0.03em]">4. Market roleplay</h2>
              <p className="mt-2 text-tamarind/70">Vendor says:</p>
              <p className="mt-3 rounded-none bg-jasmine p-4 text-3xl font-bold text-clay">{priceWord.thai}</p>
              <p className="mt-2 text-sm text-tamarind/60">{priceWord.roman} - {totalPrice} baht</p>

              <p className="mt-5 font-bold text-tamarind">What price did you hear?</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {[totalPrice, totalPrice + 10, Math.max(20, totalPrice - 10)].map((price) => {
                  const isSelected = priceChoice === price
                  const isCorrect = price === totalPrice
                  return (
                    <button
                      key={price}
                      type="button"
                      onClick={() => setPriceChoice(price)}
                      className={`rounded-none border p-4 text-center text-lg font-bold transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${isSelected && isCorrect ? 'border-honey bg-sand/15 text-honey' : isSelected ? 'border-clay/40 bg-clay/10 text-clay' : 'border-tamarind/10 bg-jasmine text-tamarind hover:border-honey/60'}`}
                      aria-pressed={isSelected}
                    >
                      {price} baht
                    </button>
                  )
                })}
              </div>

              <p className="mt-6 font-bold text-tamarind">Now answer the vendor politely:</p>
              <div className="mt-3 grid gap-3">
                {roleplayOptions.map((option) => {
                  const isSelected = roleplayChoice === option
                  const isCorrect = option === buyPhrase
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRoleplayChoice(option)}
                      className={`rounded-none border p-4 text-left text-lg font-bold transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${isSelected && isCorrect ? 'border-honey bg-sand/15 text-honey' : isSelected ? 'border-clay/40 bg-clay/10 text-clay' : 'border-tamarind/10 bg-jasmine text-tamarind hover:border-honey/60'}`}
                      aria-pressed={isSelected}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>

              {(priceChoice || roleplayChoice) && (
                <p className={`mt-4 rounded-none p-4 font-bold ${priceChoice === totalPrice && roleplayChoice === buyPhrase ? 'bg-sand/12 text-honey' : 'bg-jasmine text-tamarind/70'}`}>
                  {priceChoice === totalPrice && roleplayChoice === buyPhrase
                    ? 'Correct - market mission almost complete!'
                    : 'Keep going. Listen for the baht amount, then choose the phrase that buys your item.'}
                </p>
              )}
            </div>
          </section>
        </div>

        <section className="mx-auto mt-6 max-w-6xl rounded-none border border-tamarind/10 bg-ink p-6 text-surface md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-honey">{completed ? 'Mission complete 🏆' : 'Finish the roleplay to complete'}</p>
              <h2 className="mt-3 text-3xl font-serif font-normal tracking-[-0.04em] md:text-4xl">Send your market voice note for correction.</h2>
              <p className="mt-3 max-w-2xl leading-7 text-surface/82">
                Record yourself saying “{askPhrase}” and “{buyPhrase}”. Mike can correct pronunciation, rhythm, tone feeling, and politeness.
              </p>
            </div>
            <a
              href={`https://wa.me/66929894495?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-none bg-honey px-6 py-3 text-center font-bold text-tamarind transition duration-150 ease-out"
            >
              WhatsApp Mike
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
