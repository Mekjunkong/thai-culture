'use client'

import { useEffect, useMemo, useState } from 'react'

type FoodItem = {
  id: string
  emoji: string
  label: string
  thai: string
  roman: string
}

type SpiceLevel = {
  id: string
  label: string
  thai: string
  roman: string
  meaning: string
}

type DiningOption = {
  id: string
  label: string
  thai: string
  roman: string
  meaning: string
}

const foods: FoodItem[] = [
  { id: 'khao-soi', emoji: '🍜', label: 'Khao soi', thai: 'ข้าวซอย', roman: 'khaao soi' },
  { id: 'pad-thai', emoji: '🥢', label: 'Pad Thai', thai: 'ผัดไทย', roman: 'phat thai' },
  { id: 'fried-rice', emoji: '🍚', label: 'Fried rice', thai: 'ข้าวผัด', roman: 'khaao phat' },
  { id: 'noodle-soup', emoji: '🍲', label: 'Noodle soup', thai: 'ก๋วยเตี๋ยว', roman: 'guay-dtiaao' },
]

const spiceLevels: SpiceLevel[] = [
  { id: 'not-spicy', label: 'Not spicy', thai: 'ไม่เผ็ด', roman: 'mai phet', meaning: 'not spicy' },
  { id: 'little-spicy', label: 'A little spicy', thai: 'เผ็ดนิดหน่อย', roman: 'phet nit noi', meaning: 'a little spicy' },
  { id: 'normal-spicy', label: 'Normal spicy', thai: 'เผ็ดปกติ', roman: 'phet bpa-ga-dti', meaning: 'normal spicy' },
]

const diningOptions: DiningOption[] = [
  { id: 'eat-here', label: 'Eat here', thai: 'กินที่นี่', roman: 'gin thee nee', meaning: 'eat here' },
  { id: 'takeaway', label: 'Take away', thai: 'กลับบ้าน', roman: 'glap baan', meaning: 'take away' },
]

const steps = ['Choose food', 'Choose spice', 'Choose eat here or takeaway', 'Answer restaurant staff']

export default function OrderFoodSpiceMission() {
  const [foodId, setFoodId] = useState(foods[0].id)
  const [spiceId, setSpiceId] = useState(spiceLevels[0].id)
  const [diningId, setDiningId] = useState(diningOptions[0].id)
  const [particle, setParticle] = useState<'ครับ' | 'ค่ะ'>('ครับ')
  const [checks, setChecks] = useState({ repeated: false, noLook: false })
  const [roleplayChoice, setRoleplayChoice] = useState<string | null>(null)
  const [billChoice, setBillChoice] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)

  const food = foods.find((item) => item.id === foodId) ?? foods[0]
  const spice = spiceLevels.find((item) => item.id === spiceId) ?? spiceLevels[0]
  const dining = diningOptions.find((item) => item.id === diningId) ?? diningOptions[0]

  const orderPhrase = `เอา${food.thai}${spice.thai}${dining.thai}${particle}`
  const orderRoman = `ao ${food.roman} ${spice.roman} ${dining.roman} ${particle === 'ครับ' ? 'khrap' : 'kha'}`
  const orderMeaning = `I’ll have ${food.label.toLowerCase()}, ${spice.meaning}, ${dining.meaning}, please.`
  const billPhrase = `คิดเงิน${particle}`
  const billRoman = `khit ngoen ${particle === 'ครับ' ? 'khrap' : 'kha'}`

  const roleplayOptions = useMemo(
    () => [
      orderPhrase,
      `ราคาเท่าไหร่${particle}`,
      `ห้องน้ำอยู่ที่ไหน${particle}`,
    ],
    [orderPhrase, particle],
  )

  const billOptions = useMemo(
    () => [
      billPhrase,
      `ไม่เผ็ด${particle}`,
      `จอดตรงนี้${particle}`,
    ],
    [billPhrase, particle],
  )

  const progress = [Boolean(foodId), Boolean(spiceId) && Boolean(diningId), checks.repeated, roleplayChoice === orderPhrase && billChoice === billPhrase]
  const progressCount = progress.filter(Boolean).length
  const progressPercent = Math.round((progressCount / steps.length) * 100)
  const canComplete = progressCount === steps.length && checks.noLook
  const nextAction = progressCount < 1 ? 'Choose food' : progressCount < 2 ? 'Choose spice and eat here/takeaway' : progressCount < 3 ? 'Repeat the full phrase' : progressCount < 4 ? 'Finish the restaurant roleplay' : checks.noLook ? 'Mission complete' : 'Say it once without looking'

  useEffect(() => {
    const saved = window.localStorage.getItem('tlcm-order-food-spice-complete')
    if (saved === 'true') setCompleted(true)
  }, [])

  useEffect(() => {
    if (canComplete) {
      window.localStorage.setItem('tlcm-order-food-spice-complete', 'true')
      setCompleted(true)
    }
  }, [canComplete])

  function toggleCheck(key: keyof typeof checks) {
    setChecks((current) => ({ ...current, [key]: !current[key] }))
  }

  function resetRoleplay() {
    setRoleplayChoice(null)
    setBillChoice(null)
  }

  const whatsappText = encodeURIComponent(
    `Hi Mike, I completed the Order Food Thai mission. Can I send you a voice note for correction? My phrases are: ${orderPhrase} / ${billPhrase}`,
  )

  return (
    <div className="bg-jasmine text-tamarind">
      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm font-bold text-tamarind/60">
            <a href="/missions" className="text-indigo underline-offset-4 hover:underline">Missions</a>
            <span aria-hidden="true">/</span>
            <span>Order food and spice level</span>
          </nav>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="inline-flex min-h-11 items-center rounded-full border border-turmeric/40 bg-surface px-4 py-2 text-sm font-black uppercase text-indigo shadow-sm">
                Free 6-minute Thai mission
              </p>
              <h1 className="mt-5 text-[clamp(2.5rem,7vw,5.6rem)] font-black leading-[0.94] tracking-[-0.06em] text-balance">
                Order food and choose spice level.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-tamarind/75 text-pretty md:text-xl md:leading-9">
                Build one practical restaurant phrase: choose food, choose spice level, say eat here or takeaway, then ask for the bill.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-4" aria-label="Mission steps">
                {steps.map((step, index) => (
                  <div key={step} className={`rounded-2xl border p-3 text-sm font-bold ${progress[index] ? 'border-banana/50 bg-banana/12 text-banana' : 'border-tamarind/10 bg-surface text-tamarind/65'}`}>
                    <span className="block text-xs uppercase">Step {index + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-2xl shadow-tamarind/12 md:p-6" aria-label="Mission progress">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase text-temple">Mission progress</p>
                  <p className="mt-1 text-3xl font-black text-indigo">{progressPercent}%</p>
                </div>
                <div className="flex size-20 items-center justify-center rounded-full bg-jasmine text-4xl shadow-inner" aria-hidden="true">
                  {completed ? '🏆' : '🍜'}
                </div>
              </div>
              <div className="mt-4 h-4 overflow-hidden rounded-full bg-jasmine" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent} aria-label="Mission progress">
                <div className="h-full rounded-full bg-banana transition-all duration-150 ease-out" style={{ width: `${progressPercent}%` }} />
              </div>
              <p className="mt-4 rounded-2xl bg-jasmine p-4 text-sm leading-6 text-tamarind/75">
                Today’s Thai win: <strong>I can order one meal and control spice level.</strong>
              </p>
              <p className="mt-3 text-sm font-black text-indigo">Next: {nextAction}</p>
            </aside>
          </div>
        </div>
      </section>

      <main className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
            <h2 className="text-2xl font-black tracking-[-0.03em]">1. Choose your food</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {foods.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setFoodId(item.id)
                    resetRoleplay()
                  }}
                  className={`rounded-2xl border p-4 text-left transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric ${foodId === item.id ? 'border-turmeric bg-banana/12 shadow-md shadow-tamarind/8' : 'border-tamarind/10 bg-jasmine hover:border-turmeric/60'}`}
                  aria-pressed={foodId === item.id}
                >
                  <span className="text-3xl" aria-hidden="true">{item.emoji}</span>
                  <span className="mt-3 block font-black text-tamarind">{item.label}</span>
                  <span className="mt-1 block text-lg font-bold text-indigo">{item.thai}</span>
                  <span className="text-sm text-tamarind/60">{item.roman}</span>
                </button>
              ))}
            </div>

            <h2 className="mt-8 text-2xl font-black tracking-[-0.03em]">2. Choose spice level</h2>
            <div className="mt-5 grid gap-3">
              {spiceLevels.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSpiceId(item.id)
                    resetRoleplay()
                  }}
                  className={`rounded-2xl border p-4 text-left transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric ${spiceId === item.id ? 'border-turmeric bg-banana/12 shadow-md shadow-tamarind/8' : 'border-tamarind/10 bg-jasmine hover:border-turmeric/60'}`}
                  aria-pressed={spiceId === item.id}
                >
                  <span className="font-black text-tamarind">{item.label}</span>
                  <span className="ml-2 font-bold text-indigo">{item.thai}</span>
                  <span className="mt-1 block text-sm text-tamarind/60">{item.roman}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="grid gap-6">
            <div className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-black tracking-[-0.03em]">3. Build your restaurant phrase</h2>
                <div className="rounded-full bg-jasmine p-1 text-sm font-bold">
                  {(['ครับ', 'ค่ะ'] as const).map((ending) => (
                    <button
                      key={ending}
                      type="button"
                      onClick={() => {
                        setParticle(ending)
                        resetRoleplay()
                      }}
                      className={`rounded-full px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turmeric ${particle === ending ? 'bg-indigo text-surface' : 'text-tamarind/65'}`}
                      aria-pressed={particle === ending}
                    >
                      {ending}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {diningOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setDiningId(item.id)
                      resetRoleplay()
                    }}
                    className={`rounded-2xl border p-4 text-left transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric ${diningId === item.id ? 'border-turmeric bg-banana/12 shadow-md shadow-tamarind/8' : 'border-tamarind/10 bg-jasmine hover:border-turmeric/60'}`}
                    aria-pressed={diningId === item.id}
                  >
                    <span className="font-black text-tamarind">{item.label}</span>
                    <span className="mt-1 block text-lg font-bold text-indigo">{item.thai}</span>
                    <span className="text-sm text-tamarind/60">{item.roman}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-[1.5rem] bg-indigo p-5 text-surface md:p-7">
                <p className="text-sm font-black uppercase text-turmeric">Say this</p>
                <p className="mt-3 text-4xl font-black leading-tight md:text-5xl">{orderPhrase}</p>
                <p className="mt-4 text-lg text-surface/78">{orderRoman}</p>
                <p className="mt-2 text-surface/78">{orderMeaning}</p>
              </div>

              <div className="mt-5 grid gap-3 rounded-[1.5rem] bg-jasmine p-4 sm:grid-cols-4">
                <div className="rounded-2xl bg-surface p-4">
                  <p className="text-xs font-black uppercase text-temple">Order</p>
                  <p className="mt-2 text-2xl font-black text-indigo">เอา {food.thai}</p>
                  <p className="text-sm text-tamarind/60">ao {food.roman}</p>
                </div>
                <div className="rounded-2xl bg-surface p-4">
                  <p className="text-xs font-black uppercase text-temple">Spice</p>
                  <p className="mt-2 text-2xl font-black text-indigo">{spice.thai}</p>
                  <p className="text-sm text-tamarind/60">{spice.roman}</p>
                </div>
                <div className="rounded-2xl bg-surface p-4">
                  <p className="text-xs font-black uppercase text-temple">Place</p>
                  <p className="mt-2 text-2xl font-black text-indigo">{dining.thai}</p>
                  <p className="text-sm text-tamarind/60">{dining.roman}</p>
                </div>
                <div className="rounded-2xl bg-surface p-4">
                  <p className="text-xs font-black uppercase text-temple">Polite</p>
                  <p className="mt-2 text-2xl font-black text-indigo">{particle}</p>
                  <p className="text-sm text-tamarind/60">{particle === 'ครับ' ? 'khrap' : 'kha'}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-turmeric/30 bg-banana/10 p-4 text-sm leading-6 text-tamarind/75">
                <p className="font-black text-tamarind">Natural Thai note</p>
                <p>In small restaurants, <strong>เอา...</strong> is a common simple way to say “I’ll take...” Add <strong>{particle}</strong> to make it polite.</p>
              </div>

              <div className="mt-5 grid gap-3">
                {([
                  ['repeated', 'I repeated the full order 3 times'],
                  ['noLook', 'I can say it without looking'],
                ] as const).map(([key, label]) => (
                  <label key={key} className="flex cursor-pointer items-center gap-3 rounded-2xl bg-jasmine p-4 font-semibold text-tamarind/78">
                    <input type="checkbox" checked={checks[key]} onChange={() => toggleCheck(key)} className="h-5 w-5 accent-indigo" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
              <h2 className="text-2xl font-black tracking-[-0.03em]">4. Restaurant roleplay</h2>
              <p className="mt-2 text-tamarind/70">Restaurant staff says:</p>
              <p className="mt-3 rounded-2xl bg-jasmine p-4 text-3xl font-black text-indigo">รับอะไรดีคะ?</p>
              <p className="mt-2 text-sm text-tamarind/60">rap a-rai dee kha? — What would you like?</p>

              <p className="mt-5 font-black text-tamarind">Choose your answer:</p>
              <div className="mt-3 grid gap-3">
                {roleplayOptions.map((option) => {
                  const isSelected = roleplayChoice === option
                  const isCorrect = option === orderPhrase
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRoleplayChoice(option)}
                      className={`rounded-2xl border p-4 text-left text-lg font-bold transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric ${isSelected && isCorrect ? 'border-banana bg-banana/15 text-banana' : isSelected ? 'border-red-300 bg-red-50 text-red-700' : 'border-tamarind/10 bg-jasmine text-tamarind hover:border-turmeric/60'}`}
                      aria-pressed={isSelected}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>

              <p className="mt-6 font-black text-tamarind">After eating, ask for the bill:</p>
              <div className="mt-3 grid gap-3">
                {billOptions.map((option) => {
                  const isSelected = billChoice === option
                  const isCorrect = option === billPhrase
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setBillChoice(option)}
                      className={`rounded-2xl border p-4 text-left text-lg font-bold transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric ${isSelected && isCorrect ? 'border-banana bg-banana/15 text-banana' : isSelected ? 'border-red-300 bg-red-50 text-red-700' : 'border-tamarind/10 bg-jasmine text-tamarind hover:border-turmeric/60'}`}
                      aria-pressed={isSelected}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>

              {(roleplayChoice || billChoice) && (
                <p className={`mt-4 rounded-2xl p-4 font-bold ${roleplayChoice === orderPhrase && billChoice === billPhrase ? 'bg-banana/12 text-banana' : 'bg-jasmine text-tamarind/70'}`}>
                  {roleplayChoice === orderPhrase && billChoice === billPhrase
                    ? 'Correct — restaurant mission almost complete!'
                    : 'Keep going. First choose the full food order, then choose the phrase for the bill.'}
                </p>
              )}
            </div>
          </section>
        </div>

        <section className="mx-auto mt-6 max-w-6xl rounded-[2rem] border border-tamarind/10 bg-indigo p-6 text-surface shadow-xl shadow-tamarind/12 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-black uppercase text-turmeric">{completed ? 'Mission complete 🏆' : 'Finish the roleplay to complete'}</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-balance md:text-4xl">Send your restaurant voice note for correction.</h2>
              <p className="mt-3 max-w-2xl leading-7 text-surface/82 text-pretty">
                Record yourself saying “{orderPhrase}” and “{billPhrase}”. Mike can correct pronunciation, rhythm, tone feeling, and politeness.
              </p>
            </div>
            <a
              href={`https://wa.me/66929894495?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-turmeric px-6 py-3 text-center font-black text-tamarind shadow-lg shadow-tamarind/20 transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface"
            >
              WhatsApp Mike
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
