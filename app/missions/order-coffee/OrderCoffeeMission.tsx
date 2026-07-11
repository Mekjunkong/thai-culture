'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { useThaiVoice } from '@/lib/speech'

type Drink = {
  id: string
  emoji: string
  label: string
  thai: string
  roman: string
}

type Sweetness = {
  id: string
  label: string
  thai: string
  roman: string
  meaning: string
}

const drinks: Drink[] = [
  { id: 'iced-coffee', emoji: '🧊☕', label: 'Iced coffee', thai: 'กาแฟเย็น', roman: 'gaa-fae yen' },
  { id: 'thai-tea', emoji: '🧋', label: 'Thai tea', thai: 'ชาเย็น', roman: 'chaa yen' },
  { id: 'water', emoji: '💧', label: 'Water', thai: 'น้ำเปล่า', roman: 'naam bplao' },
  { id: 'smoothie', emoji: '🥭', label: 'Smoothie', thai: 'สมูทตี้', roman: 'sa-moot-dtii' },
]

const sweetnessLevels: Sweetness[] = [
  { id: 'normal', label: 'Normal sweet', thai: 'หวานปกติ', roman: 'waan bpa-ga-dti', meaning: 'normal sweetness' },
  { id: 'less', label: 'Less sweet', thai: 'หวานน้อย', roman: 'waan noi', meaning: 'less sweet' },
  { id: 'none', label: 'No sugar', thai: 'ไม่ใส่น้ำตาล', roman: 'mai sai naam-dtaan', meaning: 'no sugar' },
]

const steps = [
  'Pick a drink',
  'Pick sweetness',
  'Practice out loud',
  'Answer cafe staff',
]

export default function OrderCoffeeMission() {
  const [drinkId, setDrinkId] = useState(drinks[0].id)
  const [sweetnessId, setSweetnessId] = useState('less')
  const [particle, setParticle] = useState<'ครับ' | 'ค่ะ'>('ครับ')
  const [checks, setChecks] = useState({ listened: false, repeated: false, noLook: false })
  const [quizChoice, setQuizChoice] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)
  const { ready: speechReady, voiceName: thaiVoiceName, message: audioMessage, speak: speakText } = useThaiVoice()

  const drink = drinks.find((item) => item.id === drinkId) ?? drinks[0]
  const sweetness = sweetnessLevels.find((item) => item.id === sweetnessId) ?? sweetnessLevels[1]

  const isWater = drink.id === 'water'
  const phrase = useMemo(
    () => isWater ? `ขอ${drink.thai}${particle}` : `ขอ${drink.thai}${sweetness.thai}${particle}`,
    [drink.thai, sweetness.thai, particle, isWater],
  )
  const roman = useMemo(
    () => isWater
      ? `khǎaw ${drink.roman} ${particle === 'ครับ' ? 'khrap' : 'kha'}`
      : `khǎaw ${drink.roman} ${sweetness.roman} ${particle === 'ครับ' ? 'khrap' : 'kha'}`,
    [drink.roman, sweetness.roman, particle, isWater],
  )
  const meaning = isWater ? 'I’d like plain water, please.' : `I’d like ${drink.label.toLowerCase()}, ${sweetness.meaning}, please.`

  const quizOptions = useMemo(
    () => [
      phrase,
      `ห้องน้ำอยู่ที่ไหน${particle}`,
      `ราคาเท่าไหร่${particle}`,
    ],
    [phrase, particle],
  )

  const progress = [Boolean(drinkId), Boolean(sweetnessId), checks.listened && checks.repeated, quizChoice === phrase]
  const progressCount = progress.filter(Boolean).length
  const progressPercent = Math.round((progressCount / steps.length) * 100)
  const canComplete = progressCount === steps.length && checks.noLook
  const nextAction = progressCount < 2 ? 'Choose your drink and sweetness' : progressCount < 3 ? 'Practice the phrase out loud' : progressCount < 4 ? 'Finish the cafe roleplay' : checks.noLook ? 'Mission complete' : 'Say it once without looking'

  useEffect(() => {
    const saved = window.localStorage.getItem('tlcm-order-coffee-complete')
    if (saved === 'true') setCompleted(true)
  }, [])

  useEffect(() => {
    if (canComplete) {
      window.localStorage.setItem('tlcm-order-coffee-complete', 'true')
      setCompleted(true)
    }
  }, [canComplete])

  function speak(speed: 'slow' | 'natural') {
    speakText(phrase, speed)
    setChecks((current) => ({ ...current, listened: true }))
  }

  function toggleCheck(key: keyof typeof checks) {
    setChecks((current) => ({ ...current, [key]: !current[key] }))
  }

  const whatsappText = encodeURIComponent(
    `Hi Mike, I completed the Order Coffee Thai mission. Can I send you a voice note for correction? My phrase is: ${phrase}`,
  )

  return (
    <div className="bg-jasmine text-tamarind">
      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm font-bold text-tamarind/60">
            <a href="/missions" className="text-indigo underline-offset-4 hover:underline">Missions</a>
            <span aria-hidden="true">/</span>
            <span>Order coffee</span>
          </nav>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="inline-flex min-h-11 items-center rounded-full border border-turmeric/40 bg-surface px-4 py-2 text-sm font-black uppercase text-indigo shadow-sm">
                Free 5-minute Thai mission
              </p>
              <h1 className="mt-5 text-[clamp(2.5rem,7vw,5.6rem)] font-black leading-[0.94] tracking-[-0.06em] text-balance">
                Order coffee in Chiang Mai.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-tamarind/75 md:text-xl md:leading-9">
                Choose your drink, choose sweetness, build the Thai phrase, then answer cafe staff. No grammar lecture - just one real phrase you can use today.
              </p>
              <div className="mt-6 overflow-hidden rounded-[1.5rem] shadow-lg shadow-tamarind/10">
                <Image
                  src="/assets/images/mission-order-coffee.jpg"
                  alt="Iced coffee in a glass on a cafe table"
                  width={1600}
                  height={1068}
                  priority
                  className="h-48 w-full object-cover md:h-56"
                />
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-4" aria-label="Mission steps">
                {steps.map((step, index) => (
                  <div key={step} className={`rounded-2xl border p-3 text-sm font-bold ${progress[index] ? 'border-banana/50 bg-banana/12 text-banana' : 'border-tamarind/10 bg-surface text-tamarind/65'}`}>
                    <span className="block text-xs uppercase tracking-[0.12em]">Step {index + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-2xl shadow-tamarind/12 md:p-6" aria-label="Mission progress">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-temple">Mission progress</p>
                  <p className="mt-1 text-3xl font-black text-indigo">{progressPercent}%</p>
                </div>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-jasmine text-4xl shadow-inner" aria-hidden="true">
                  {completed ? '🏆' : '☕'}
                </div>
              </div>
              <div className="mt-4 h-4 overflow-hidden rounded-full bg-jasmine" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent} aria-label="Mission progress">
                <div className="h-full rounded-full bg-banana transition-all duration-150 ease-out" style={{ width: `${progressPercent}%` }} />
              </div>
              <p className="mt-4 rounded-2xl bg-jasmine p-4 text-sm leading-6 text-tamarind/75">
                Today’s Thai win: <strong>I can order one drink politely in Thai.</strong>
              </p>
              <p className="mt-3 text-sm font-black text-indigo">Next: {nextAction}</p>
            </aside>
          </div>
        </div>
      </section>

      <main className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
            <h2 className="text-2xl font-black tracking-[-0.03em]">1. Choose your drink</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {drinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDrinkId(item.id)}
                  className={`rounded-2xl border p-4 text-left transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric ${drinkId === item.id ? 'border-turmeric bg-banana/12 shadow-md shadow-tamarind/8' : 'border-tamarind/10 bg-jasmine hover:border-turmeric/60'}`}
                  aria-pressed={drinkId === item.id}
                >
                  <span className="text-3xl" aria-hidden="true">{item.emoji}</span>
                  <span className="mt-3 block font-black text-tamarind">{item.label}</span>
                  <span className="mt-1 block text-lg font-bold text-indigo">{item.thai}</span>
                  <span className="text-sm text-tamarind/60">{item.roman}</span>
                </button>
              ))}
            </div>

            <h2 className="mt-8 text-2xl font-black tracking-[-0.03em]">2. Choose sweetness</h2>
            <div className="mt-5 grid gap-3">
              {sweetnessLevels.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSweetnessId(item.id)}
                  className={`rounded-2xl border p-4 text-left transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric ${sweetnessId === item.id ? 'border-turmeric bg-banana/12 shadow-md shadow-tamarind/8' : 'border-tamarind/10 bg-jasmine hover:border-turmeric/60'}`}
                  aria-pressed={sweetnessId === item.id}
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
                <h2 className="text-2xl font-black tracking-[-0.03em]">3. Build your Thai phrase</h2>
                <div className="rounded-full bg-jasmine p-1 text-sm font-bold">
                  {(['ครับ', 'ค่ะ'] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setParticle(item)}
                      className={`rounded-full px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turmeric ${particle === item ? 'bg-indigo text-surface' : 'text-tamarind/65'}`}
                      aria-pressed={particle === item}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-[1.5rem] bg-indigo p-5 text-surface md:p-7">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-turmeric">Say this</p>
                <p className="mt-3 text-4xl font-black leading-tight md:text-5xl">{phrase}</p>
                <p className="mt-4 text-lg text-surface/78">{roman}</p>
                <p className="mt-2 text-surface/78">{meaning}</p>
              </div>

              <div className="mt-5 rounded-2xl border border-turmeric/30 bg-banana/10 p-4 text-sm leading-6 text-tamarind/75">
                <p className="font-black text-tamarind">Pronunciation note</p>
                <p>
                  Browser Thai voices can sound robotic or wrong. Use them only as an optional rough demo.
                  The main practice is: read the rhythm cards, speak out loud, then send a real voice note for correction.
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-temple">
                  {speechReady && thaiVoiceName ? `Optional browser voice: ${thaiVoiceName}` : 'No reliable Thai browser voice detected'}
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => speak('slow')} className="rounded-2xl bg-banana px-5 py-4 font-black text-tamarind transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo">
                  🔊 Optional computer demo - slow
                </button>
                <button type="button" onClick={() => speak('natural')} className="rounded-2xl border border-tamarind/10 bg-jasmine px-5 py-4 font-black text-tamarind transition duration-150 ease-out hover:border-turmeric focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
                  🗣️ Optional computer demo - natural
                </button>
              </div>

              {audioMessage && (
                <p className="mt-3 rounded-2xl bg-jasmine p-4 text-sm font-semibold leading-6 text-tamarind/70">
                  {audioMessage}
                </p>
              )}

              <div className="mt-5 grid gap-3 rounded-[1.5rem] bg-jasmine p-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-surface p-4">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-temple">Chunk 1</p>
                  <p className="mt-2 text-2xl font-black text-indigo">ขอ {drink.thai}</p>
                  <p className="text-sm text-tamarind/60">khǎaw {drink.roman}</p>
                </div>
                {!isWater && (
                  <div className="rounded-2xl bg-surface p-4">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-temple">Chunk 2</p>
                    <p className="mt-2 text-2xl font-black text-indigo">{sweetness.thai}</p>
                    <p className="text-sm text-tamarind/60">{sweetness.roman}</p>
                  </div>
                )}
                <div className="rounded-2xl bg-surface p-4">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-temple">Polite ending</p>
                  <p className="mt-2 text-2xl font-black text-indigo">{particle}</p>
                  <p className="text-sm text-tamarind/60">{particle === 'ครับ' ? 'khrap' : 'kha'}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {([
                  ['listened', 'I checked the pronunciation guide'],
                  ['repeated', 'I repeated it 3 times'],
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
              <h2 className="text-2xl font-black tracking-[-0.03em]">4. Cafe roleplay</h2>
              <p className="mt-2 text-tamarind/70">Cafe staff says:</p>
              <p className="mt-3 rounded-2xl bg-jasmine p-4 text-3xl font-black text-indigo">เอาอะไรคะ?</p>
              <p className="mt-2 text-sm text-tamarind/60">ao a-rai kha? - What would you like?</p>
              <div className="mt-5 grid gap-3">
                {quizOptions.map((option) => {
                  const isSelected = quizChoice === option
                  const isCorrect = option === phrase
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setQuizChoice(option)}
                      className={`rounded-2xl border p-4 text-left text-lg font-bold transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric ${isSelected && isCorrect ? 'border-banana bg-banana/15 text-banana' : isSelected ? 'border-temple/40 bg-temple/10 text-temple' : 'border-tamarind/10 bg-jasmine text-tamarind hover:border-turmeric/60'}`}
                      aria-pressed={isSelected}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
              {quizChoice && (
                <p className={`mt-4 rounded-2xl p-4 font-bold ${quizChoice === phrase ? 'bg-banana/12 text-banana' : 'bg-temple/10 text-temple'}`}>
                  {quizChoice === phrase ? 'Correct - cafe mission almost complete!' : 'Good try. Choose the answer that orders your drink.'}
                </p>
              )}
            </div>
          </section>
        </div>

        <section className="mx-auto mt-6 max-w-6xl rounded-[2rem] border border-tamarind/10 bg-indigo p-6 text-surface shadow-xl shadow-tamarind/12 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-turmeric">{completed ? 'Mission complete 🏆' : 'Finish the checklist to complete'}</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-4xl">Send your voice note for correction.</h2>
              <p className="mt-3 max-w-2xl leading-7 text-surface/82">
                Reading is not enough. Record yourself saying the phrase and send it to Mike. He can correct pronunciation, speed, tone feeling, and politeness.
              </p>
            </div>
            <a
              href={`https://wa.me/66929894495?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-turmeric px-6 py-3 text-center font-black text-tamarind shadow-lg shadow-tamarind/20 transition duration-150 ease-out"
            >
              WhatsApp Mike
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
