'use client'

import { useEffect, useMemo, useState } from 'react'
import SpeakButton from '@/components/ui/SpeakButton'

type Place = { id: string; label: string; thai: string; roman: string; clue: string }
type Direction = { id: string; label: string; thai: string; roman: string; meaning: string }

const places: Place[] = [
  { id: 'here', label: 'Here', thai: 'ตรงนี้', roman: 'dtrong nee', clue: 'best when you are close' },
  { id: 'gate', label: 'At the gate', thai: 'หน้าประตู', roman: 'naa bpratuu', clue: 'condo / hotel gate' },
  { id: 'corner', label: 'At the corner', thai: 'ตรงหัวมุม', roman: 'dtrong hua-mum', clue: 'street corner' },
  { id: 'seven', label: 'At 7-Eleven', thai: 'หน้าเซเว่น', roman: 'naa se-wen', clue: 'easy landmark' },
]

const directions: Direction[] = [
  { id: 'straight', label: 'Go straight', thai: 'ตรงไป', roman: 'dtrong bpai', meaning: 'go straight' },
  { id: 'left', label: 'Turn left', thai: 'เลี้ยวซ้าย', roman: 'liao saai', meaning: 'turn left' },
  { id: 'right', label: 'Turn right', thai: 'เลี้ยวขวา', roman: 'liao khwaa', meaning: 'turn right' },
]

const steps = ['Choose stop place', 'Practice directions', 'Answer driver', 'Say without looking']

export default function DriverStopMission() {
  const [placeId, setPlaceId] = useState(places[0].id)
  const [directionId, setDirectionId] = useState(directions[0].id)
  const [particle, setParticle] = useState<'ครับ' | 'ค่ะ'>('ครับ')
  const [checks, setChecks] = useState({ stop: false, directions: false, noLook: false })
  const [driverChoice, setDriverChoice] = useState<string | null>(null)
  const [directionChoice, setDirectionChoice] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)

  const place = places.find((item) => item.id === placeId) ?? places[0]
  const direction = directions.find((item) => item.id === directionId) ?? directions[0]
  const stopPhrase = `จอด${place.thai}${particle}`
  const stopRoman = `jawt ${place.roman} ${particle === 'ครับ' ? 'khrap' : 'kha'}`
  const directionPhrase = `${direction.thai}${particle}`
  const directionRoman = `${direction.roman} ${particle === 'ครับ' ? 'khrap' : 'kha'}`

  const driverOptions = useMemo(() => [stopPhrase, `คิดเงิน${particle}`, `ไม่เผ็ด${particle}`], [stopPhrase, particle])
  const directionOptions = useMemo(() => [directionPhrase, `ราคาเท่าไหร่${particle}`, `ห้องน้ำอยู่ที่ไหน${particle}`], [directionPhrase, particle])

  const progress = [Boolean(placeId), checks.directions, driverChoice === stopPhrase && directionChoice === directionPhrase, checks.noLook]
  const progressCount = progress.filter(Boolean).length
  const progressPercent = Math.round((progressCount / steps.length) * 100)
  const canComplete = progressCount === steps.length && checks.stop
  const nextAction = progressCount < 1 ? 'Choose where to stop' : progressCount < 2 ? 'Practice one direction phrase' : progressCount < 3 ? 'Finish the driver roleplay' : checks.stop ? 'Mission complete' : 'Say stop here out loud'

  useEffect(() => {
    if (window.localStorage.getItem('tlcm-driver-stop-complete') === 'true') setCompleted(true)
  }, [])

  useEffect(() => {
    if (canComplete) {
      window.localStorage.setItem('tlcm-driver-stop-complete', 'true')
      setCompleted(true)
    }
  }, [canComplete])

  function resetRoleplay() {
    setDriverChoice(null)
    setDirectionChoice(null)
  }

  function toggleCheck(key: keyof typeof checks) {
    setChecks((current) => ({ ...current, [key]: !current[key] }))
  }

  const whatsappText = encodeURIComponent(
    `Hi Mike, I completed the Driver Thai mission. Can I send a voice note for correction? My phrases are: ${stopPhrase} / ${directionPhrase}`,
  )

  return (
    <div className="bg-jasmine text-tamarind">
      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm font-bold text-tamarind/60">
            <a href="/missions" className="text-indigo underline-offset-4 hover:underline">Missions</a>
            <span aria-hidden="true">/</span>
            <span>Tell a driver where to stop</span>
          </nav>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="inline-flex min-h-11 items-center rounded-full border border-turmeric/40 bg-surface px-4 py-2 text-sm font-black uppercase text-indigo shadow-sm">
                Free 5-minute Thai mission
              </p>
              <h1 className="mt-5 text-[clamp(2.5rem,7vw,5.6rem)] font-black leading-[0.94] tracking-[-0.06em] text-balance">
                Tell a driver where to stop.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-tamarind/75 text-pretty md:text-xl md:leading-9">
                Practice the transport Thai you need with songthaews, Grab calls, taxis, and local drivers: stop here, go straight, turn left, and turn right.
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
                  {completed ? '🏆' : '🚗'}
                </div>
              </div>
              <div className="mt-4 h-4 overflow-hidden rounded-full bg-jasmine" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent} aria-label="Mission progress">
                <div className="h-full rounded-full bg-banana transition-all duration-150 ease-out" style={{ width: `${progressPercent}%` }} />
              </div>
              <p className="mt-4 rounded-2xl bg-jasmine p-4 text-sm leading-6 text-tamarind/75">
                Today’s Thai win: <strong>I can tell a driver where to stop politely.</strong>
              </p>
              <p className="mt-3 text-sm font-black text-indigo">Next: {nextAction}</p>
            </aside>
          </div>
        </div>
      </section>

      <main className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
            <h2 className="text-2xl font-black tracking-[-0.03em]">1. Choose where to stop</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {places.map((item) => (
                <button key={item.id} type="button" onClick={() => { setPlaceId(item.id); resetRoleplay() }} className={`rounded-2xl border p-4 text-left transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric ${placeId === item.id ? 'border-turmeric bg-banana/12 shadow-md shadow-tamarind/8' : 'border-tamarind/10 bg-jasmine hover:border-turmeric/60'}`} aria-pressed={placeId === item.id}>
                  <span className="font-black text-tamarind">{item.label}</span>
                  <span className="mt-1 block text-lg font-bold text-indigo">{item.thai}</span>
                  <span className="block text-sm text-tamarind/60">{item.roman} · {item.clue}</span>
                </button>
              ))}
            </div>

            <h2 className="mt-8 text-2xl font-black tracking-[-0.03em]">2. Practice one direction</h2>
            <div className="mt-5 grid gap-3">
              {directions.map((item) => (
                <button key={item.id} type="button" onClick={() => { setDirectionId(item.id); resetRoleplay() }} className={`rounded-2xl border p-4 text-left transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric ${directionId === item.id ? 'border-turmeric bg-banana/12 shadow-md shadow-tamarind/8' : 'border-tamarind/10 bg-jasmine hover:border-turmeric/60'}`} aria-pressed={directionId === item.id}>
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
                <h2 className="text-2xl font-black tracking-[-0.03em]">3. Build your driver phrases</h2>
                <div className="rounded-full bg-jasmine p-1 text-sm font-bold">
                  {(['ครับ', 'ค่ะ'] as const).map((ending) => (
                    <button key={ending} type="button" onClick={() => { setParticle(ending); resetRoleplay() }} className={`rounded-full px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turmeric ${particle === ending ? 'bg-indigo text-surface' : 'text-tamarind/65'}`} aria-pressed={particle === ending}>
                      {ending}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] bg-indigo p-5 text-surface md:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-black uppercase text-turmeric">Say this to stop</p>
                    <SpeakButton text={stopPhrase} onSpeak={() => setChecks((current) => ({ ...current, stop: true }))} />
                  </div>
                  <p className="mt-3 text-4xl font-black leading-tight md:text-5xl">{stopPhrase}</p>
                  <p className="mt-4 text-lg text-surface/78">{stopRoman}</p>
                  <p className="mt-2 text-surface/78">Please stop {place.label.toLowerCase()}.</p>
                </div>
                <div className="rounded-[1.5rem] bg-jasmine p-5 md:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-black uppercase text-temple">Direction phrase</p>
                    <SpeakButton text={directionPhrase} onSpeak={() => setChecks((current) => ({ ...current, directions: true }))} />
                  </div>
                  <p className="mt-3 text-4xl font-black leading-tight text-indigo md:text-5xl">{directionPhrase}</p>
                  <p className="mt-4 text-lg text-tamarind/70">{directionRoman}</p>
                  <p className="mt-2 text-tamarind/70">{direction.meaning}, please.</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 rounded-[1.5rem] bg-jasmine p-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-surface p-4">
                  <p className="text-xs font-black uppercase text-temple">Stop</p>
                  <p className="mt-2 text-2xl font-black text-indigo">จอด</p>
                  <p className="text-sm text-tamarind/60">jawt</p>
                </div>
                <div className="rounded-2xl bg-surface p-4">
                  <p className="text-xs font-black uppercase text-temple">Place</p>
                  <p className="mt-2 text-2xl font-black text-indigo">{place.thai}</p>
                  <p className="text-sm text-tamarind/60">{place.roman}</p>
                </div>
                <div className="rounded-2xl bg-surface p-4">
                  <p className="text-xs font-black uppercase text-temple">Polite</p>
                  <p className="mt-2 text-2xl font-black text-indigo">{particle}</p>
                  <p className="text-sm text-tamarind/60">{particle === 'ครับ' ? 'khrap' : 'kha'}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-turmeric/30 bg-banana/10 p-4 text-sm leading-6 text-tamarind/75">
                <p className="font-black text-tamarind">Natural Thai note</p>
                <p><strong>จอดตรงนี้ครับ/ค่ะ</strong> is short, polite, and enough for most local transport situations. Pointing at the map or place helps.</p>
              </div>

              <div className="mt-5 grid gap-3">
                {([
                  ['stop', 'I repeated the stop phrase 3 times'],
                  ['directions', 'I practiced go straight / left / right'],
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
              <h2 className="text-2xl font-black tracking-[-0.03em]">4. Driver roleplay</h2>
              <p className="mt-2 text-tamarind/70">Driver asks on the phone:</p>
              <p className="mt-3 rounded-2xl bg-jasmine p-4 text-3xl font-black text-indigo">อยู่ตรงไหนครับ?</p>
              <p className="mt-2 text-sm text-tamarind/60">yuu dtrong nai khrap? - Where are you?</p>

              <p className="mt-5 font-black text-tamarind">Choose how to say stop here:</p>
              <div className="mt-3 grid gap-3">
                {driverOptions.map((option) => {
                  const isSelected = driverChoice === option
                  const isCorrect = option === stopPhrase
                  return <button key={option} type="button" onClick={() => setDriverChoice(option)} className={`rounded-2xl border p-4 text-left text-lg font-bold transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric ${isSelected && isCorrect ? 'border-banana bg-banana/15 text-banana' : isSelected ? 'border-temple/40 bg-temple/10 text-temple' : 'border-tamarind/10 bg-jasmine text-tamarind hover:border-turmeric/60'}`} aria-pressed={isSelected}>{option}</button>
                })}
              </div>

              <p className="mt-6 font-black text-tamarind">If the driver needs one direction, choose:</p>
              <div className="mt-3 grid gap-3">
                {directionOptions.map((option) => {
                  const isSelected = directionChoice === option
                  const isCorrect = option === directionPhrase
                  return <button key={option} type="button" onClick={() => setDirectionChoice(option)} className={`rounded-2xl border p-4 text-left text-lg font-bold transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric ${isSelected && isCorrect ? 'border-banana bg-banana/15 text-banana' : isSelected ? 'border-temple/40 bg-temple/10 text-temple' : 'border-tamarind/10 bg-jasmine text-tamarind hover:border-turmeric/60'}`} aria-pressed={isSelected}>{option}</button>
                })}
              </div>

              {(driverChoice || directionChoice) && (
                <p className={`mt-4 rounded-2xl p-4 font-bold ${driverChoice === stopPhrase && directionChoice === directionPhrase ? 'bg-banana/12 text-banana' : 'bg-jasmine text-tamarind/70'}`}>
                  {driverChoice === stopPhrase && directionChoice === directionPhrase ? 'Correct - transport mission almost complete!' : 'Keep going. Choose the stop phrase, then choose the direction phrase.'}
                </p>
              )}
            </div>
          </section>
        </div>

        <section className="mx-auto mt-6 max-w-6xl rounded-[2rem] border border-tamarind/10 bg-indigo p-6 text-surface shadow-xl shadow-tamarind/12 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-black uppercase text-turmeric">{completed ? 'Mission complete 🏆' : 'Finish the roleplay to complete'}</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-balance md:text-4xl">Send your driver voice note for correction.</h2>
              <p className="mt-3 max-w-2xl leading-7 text-surface/82 text-pretty">
                Record yourself saying “{stopPhrase}” and “{directionPhrase}”. Mike can correct pronunciation, rhythm, and polite feeling.
              </p>
            </div>
            <a href={`https://wa.me/66929894495?text=${whatsappText}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-turmeric px-6 py-3 text-center font-black text-tamarind shadow-lg shadow-tamarind/20 transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface">
              WhatsApp Mike
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
