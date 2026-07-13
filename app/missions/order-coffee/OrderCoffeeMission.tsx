'use client'

import { useEffect, useMemo, useState } from 'react'

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

function chooseBestThaiVoice(voices: SpeechSynthesisVoice[]) {
  const thaiVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith('th'))
  if (thaiVoices.length === 0) return null

  const preferredNames = ['google', 'microsoft', 'premwadee', 'kanya', 'narisa', 'thai']
  return [...thaiVoices].sort((a, b) => {
    const score = (voice: SpeechSynthesisVoice) => preferredNames.reduce(
      (total, keyword, index) => total + (voice.name.toLowerCase().includes(keyword) ? 20 - index : 0),
      voice.localService ? 3 : 0,
    )
    return score(b) - score(a)
  })[0]
}

export default function OrderCoffeeMission() {
  const [drinkId, setDrinkId] = useState(drinks[0].id)
  const [sweetnessId, setSweetnessId] = useState('less')
  const [particle, setParticle] = useState<'ครับ' | 'ค่ะ'>('ครับ')
  const [checks, setChecks] = useState({ listened: false, repeated: false, noLook: false })
  const [quizChoice, setQuizChoice] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)
  const [thaiVoiceName, setThaiVoiceName] = useState<string | null>(null)
  const [speechReady, setSpeechReady] = useState(false)
  const [audioMessage, setAudioMessage] = useState('')

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
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeechReady(true)
      return
    }

    const loadVoices = () => {
      const voice = chooseBestThaiVoice(window.speechSynthesis.getVoices())
      setThaiVoiceName(voice?.name ?? null)
      setSpeechReady(true)
    }

    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
  }, [])

  useEffect(() => {
    if (canComplete) {
      window.localStorage.setItem('tlcm-order-coffee-complete', 'true')
      setCompleted(true)
    }
  }, [canComplete])

  function speak(speed: 'slow' | 'natural') {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const selectedVoice = chooseBestThaiVoice(window.speechSynthesis.getVoices())

    if (!selectedVoice) {
      setAudioMessage('This browser does not have a good Thai voice. Skip the robot audio and use the speak-out-loud cards below, then send Mike a real voice note for correction.')
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(phrase)
    utterance.voice = selectedVoice
    utterance.lang = selectedVoice.lang || 'th-TH'
    utterance.rate = speed === 'slow' ? 0.68 : 0.88
    utterance.pitch = 0.96
    window.speechSynthesis.speak(utterance)
    setThaiVoiceName(selectedVoice.name)
    setAudioMessage(`Computer audio: ${selectedVoice.name}. Real Thai pronunciation still needs a human voice-note correction.`)
    setChecks((current) => ({ ...current, listened: true }))
  }

  function toggleCheck(key: keyof typeof checks) {
    setChecks((current) => ({ ...current, [key]: !current[key] }))
  }

  const whatsappText = encodeURIComponent(
    `Hi Mike, I completed the Order Coffee Thai mission. Can I send you a voice note for correction? My phrase is: ${phrase}`,
  )

  return (
    <div className="bg-paper text-ink">
      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm font-bold text-tamarind/60">
            <a href="/missions" className="text-clay underline-offset-4 hover:underline">Missions</a>
            <span aria-hidden="true">/</span>
            <span>Order coffee</span>
          </nav>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[.14em] text-clay">
                Free 5-minute Thai mission
              </p>
              <h1 className="mt-5 font-serif text-[clamp(2.5rem,7vw,5.6rem)] font-bold leading-[1.05] text-balance">
                Order coffee in Chiang Mai.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-tamarind/75 md:text-xl md:leading-9">
                Choose your drink, choose sweetness, build the Thai phrase, then answer cafe staff. No grammar lecture - just one real phrase you can use today.
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
                  {completed ? '🏆' : '☕'}
                </div>
              </div>
              <div className="mt-4 h-4 overflow-hidden rounded-full bg-jasmine" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent} aria-label="Mission progress">
                <div className="h-full rounded-full bg-sand transition-all duration-150 ease-out" style={{ width: `${progressPercent}%` }} />
              </div>
              <p className="mt-4 rounded-none bg-jasmine p-4 text-sm leading-6 text-tamarind/75">
                Today’s Thai win: <strong>I can order one drink politely in Thai.</strong>
              </p>
              <p className="mt-3 text-sm font-bold text-clay">Next: {nextAction}</p>
            </aside>
          </div>
        </div>
      </section>

      <main className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-none border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
            <h2 className="text-2xl font-serif font-normal tracking-[-0.03em]">1. Choose your drink</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {drinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDrinkId(item.id)}
                  className={`rounded-none border p-4 text-left transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${drinkId === item.id ? 'border-honey bg-sand/12' : 'border-tamarind/10 bg-jasmine hover:border-honey/60'}`}
                  aria-pressed={drinkId === item.id}
                >
                  <span className="text-3xl" aria-hidden="true">{item.emoji}</span>
                  <span className="mt-3 block font-bold text-tamarind">{item.label}</span>
                  <span className="mt-1 block text-lg font-bold text-clay">{item.thai}</span>
                  <span className="text-sm text-tamarind/60">{item.roman}</span>
                </button>
              ))}
            </div>

            <h2 className="mt-8 text-2xl font-serif font-normal tracking-[-0.03em]">2. Choose sweetness</h2>
            <div className="mt-5 grid gap-3">
              {sweetnessLevels.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSweetnessId(item.id)}
                  className={`rounded-none border p-4 text-left transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${sweetnessId === item.id ? 'border-honey bg-sand/12' : 'border-tamarind/10 bg-jasmine hover:border-honey/60'}`}
                  aria-pressed={sweetnessId === item.id}
                >
                  <span className="font-bold text-tamarind">{item.label}</span>
                  <span className="ml-2 font-bold text-clay">{item.thai}</span>
                  <span className="mt-1 block text-sm text-tamarind/60">{item.roman}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="grid gap-6">
            <div className="rounded-none border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-serif font-normal tracking-[-0.03em]">3. Build your Thai phrase</h2>
                <div className="rounded-full bg-jasmine p-1 text-sm font-bold">
                  {(['ครับ', 'ค่ะ'] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setParticle(item)}
                      className={`rounded-full px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay ${particle === item ? 'bg-ink text-surface' : 'text-tamarind/65'}`}
                      aria-pressed={particle === item}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-none bg-ink p-5 text-surface md:p-7">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-honey">Say this</p>
                <p className="mt-3 text-4xl font-bold leading-tight md:text-5xl">{phrase}</p>
                <p className="mt-4 text-lg text-surface/78">{roman}</p>
                <p className="mt-2 text-surface/78">{meaning}</p>
              </div>

              <div className="mt-5 rounded-none border border-honey/30 bg-sand/10 p-4 text-sm leading-6 text-tamarind/75">
                <p className="font-bold text-tamarind">Pronunciation note</p>
                <p>
                  Browser Thai voices can sound robotic or wrong. Use them only as an optional rough demo.
                  The main practice is: read the rhythm cards, speak out loud, then send a real voice note for correction.
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-clay">
                  {speechReady && thaiVoiceName ? `Optional browser voice: ${thaiVoiceName}` : 'No reliable Thai browser voice detected'}
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => speak('slow')} className="rounded-none bg-sand px-5 py-4 font-bold text-tamarind transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">
                  🔊 Optional computer demo - slow
                </button>
                <button type="button" onClick={() => speak('natural')} className="rounded-none border border-tamarind/10 bg-jasmine px-5 py-4 font-bold text-tamarind transition duration-150 ease-out hover:border-honey focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">
                  🗣️ Optional computer demo - natural
                </button>
              </div>

              {audioMessage && (
                <p className="mt-3 rounded-none bg-jasmine p-4 text-sm font-semibold leading-6 text-tamarind/70">
                  {audioMessage}
                </p>
              )}

              <div className="mt-5 grid gap-3 rounded-none bg-jasmine p-4 sm:grid-cols-3">
                <div className="rounded-none bg-surface p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-clay">Chunk 1</p>
                  <p className="mt-2 text-2xl font-bold text-clay">ขอ {drink.thai}</p>
                  <p className="text-sm text-tamarind/60">khǎaw {drink.roman}</p>
                </div>
                {!isWater && (
                  <div className="rounded-none bg-surface p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-clay">Chunk 2</p>
                    <p className="mt-2 text-2xl font-bold text-clay">{sweetness.thai}</p>
                    <p className="text-sm text-tamarind/60">{sweetness.roman}</p>
                  </div>
                )}
                <div className="rounded-none bg-surface p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-clay">Polite ending</p>
                  <p className="mt-2 text-2xl font-bold text-clay">{particle}</p>
                  <p className="text-sm text-tamarind/60">{particle === 'ครับ' ? 'khrap' : 'kha'}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {([
                  ['listened', 'I checked the pronunciation guide'],
                  ['repeated', 'I repeated it 3 times'],
                  ['noLook', 'I can say it without looking'],
                ] as const).map(([key, label]) => (
                  <label key={key} className="flex cursor-pointer items-center gap-3 rounded-none bg-jasmine p-4 font-semibold text-tamarind/78">
                    <input type="checkbox" checked={checks[key]} onChange={() => toggleCheck(key)} className="h-5 w-5 accent-clay" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-none border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
              <h2 className="text-2xl font-serif font-normal tracking-[-0.03em]">4. Cafe roleplay</h2>
              <p className="mt-2 text-tamarind/70">Cafe staff says:</p>
              <p className="mt-3 rounded-none bg-jasmine p-4 text-3xl font-bold text-clay">เอาอะไรคะ?</p>
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
                      className={`rounded-none border p-4 text-left text-lg font-bold transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${isSelected && isCorrect ? 'border-honey bg-sand/15 text-honey' : isSelected ? 'border-clay/40 bg-clay/10 text-clay' : 'border-tamarind/10 bg-jasmine text-tamarind hover:border-honey/60'}`}
                      aria-pressed={isSelected}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
              {quizChoice && (
                <p className={`mt-4 rounded-none p-4 font-bold ${quizChoice === phrase ? 'bg-sand/12 text-honey' : 'bg-clay/10 text-clay'}`}>
                  {quizChoice === phrase ? 'Correct - cafe mission almost complete!' : 'Good try. Choose the answer that orders your drink.'}
                </p>
              )}
            </div>
          </section>
        </div>

        <section className="mx-auto mt-6 max-w-6xl rounded-none border border-tamarind/10 bg-ink p-6 text-surface md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-honey">{completed ? 'Mission complete 🏆' : 'Finish the checklist to complete'}</p>
              <h2 className="mt-3 text-3xl font-serif font-normal tracking-[-0.04em] md:text-4xl">Send your voice note for correction.</h2>
              <p className="mt-3 max-w-2xl leading-7 text-surface/82">
                Reading is not enough. Record yourself saying the phrase and send it to Mike. He can correct pronunciation, speed, tone feeling, and politeness.
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
