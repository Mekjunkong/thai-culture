'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

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
    <div className="bg-paper text-ink">
      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm font-bold text-tamarind/60">
            <a href="/missions" className="text-clay underline-offset-4 hover:underline">Missions</a>
            <span aria-hidden="true">/</span>
            <span>Tell a driver where to stop</span>
          </nav>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[.14em] text-clay">
                Free 5-minute Thai mission
              </p>
              <h1 className="mt-5 font-serif text-[clamp(2.5rem,7vw,5.6rem)] font-bold leading-[1.05] text-balance">
                Tell a driver where to stop.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-tamarind/75 text-pretty md:text-xl md:leading-9">
                Practice the transport Thai you need with songthaews, Grab calls, taxis, and local drivers: stop here, go straight, turn left, and turn right.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-4" aria-label="Mission steps">
                {steps.map((step, index) => (
                  <div key={step} className={`rounded-none border p-3 text-sm font-bold ${progress[index] ? 'border-honey/50 bg-sand/12 text-honey' : 'border-tamarind/10 bg-surface text-tamarind/65'}`}>
                    <span className="block text-xs uppercase">Step {index + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-none border border-tamarind/10 bg-surface p-5 md:p-6" aria-label="Mission progress">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase text-clay">Mission progress</p>
                  <p className="mt-1 text-3xl font-bold text-clay">{progressPercent}%</p>
                </div>
                <div className="flex size-20 items-center justify-center rounded-full bg-jasmine text-4xl shadow-inner" aria-hidden="true">
                  {completed ? '🏆' : '🚗'}
                </div>
              </div>
              <div className="mt-4 h-4 overflow-hidden rounded-full bg-jasmine" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent} aria-label="Mission progress">
                <div className="h-full rounded-full bg-sand transition-all duration-150 ease-out" style={{ width: `${progressPercent}%` }} />
              </div>
              <p className="mt-4 rounded-none bg-jasmine p-4 text-sm leading-6 text-tamarind/75">
                Today’s Thai win: <strong>I can tell a driver where to stop politely.</strong>
              </p>
              <p className="mt-3 text-sm font-bold text-clay">Next: {nextAction}</p>
            </aside>
          </div>
        </div>
      </section>

      <main className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-none border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
            <h2 className="text-2xl font-serif font-normal tracking-[-0.03em]">1. Choose where to stop</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {places.map((item) => (
                <button key={item.id} type="button" onClick={() => { setPlaceId(item.id); resetRoleplay() }} className={`rounded-none border p-4 text-left transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${placeId === item.id ? 'border-honey bg-sand/12' : 'border-tamarind/10 bg-jasmine hover:border-honey/60'}`} aria-pressed={placeId === item.id}>
                  <span className="font-bold text-tamarind">{item.label}</span>
                  <span className="mt-1 block text-lg font-bold text-clay" lang="th">{item.thai}</span>
                  <span className="block text-sm text-tamarind/60">{item.roman} · {item.clue}</span>
                </button>
              ))}
            </div>

            <h2 className="mt-8 text-2xl font-serif font-normal tracking-[-0.03em]">2. Practice one direction</h2>
            <div className="mt-5 grid gap-3">
              {directions.map((item) => (
                <button key={item.id} type="button" onClick={() => { setDirectionId(item.id); resetRoleplay() }} className={`rounded-none border p-4 text-left transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${directionId === item.id ? 'border-honey bg-sand/12' : 'border-tamarind/10 bg-jasmine hover:border-honey/60'}`} aria-pressed={directionId === item.id}>
                  <span className="font-bold text-tamarind">{item.label}</span>
                  <span className="ml-2 font-bold text-clay" lang="th">{item.thai}</span>
                  <span className="mt-1 block text-sm text-tamarind/60">{item.roman}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="grid gap-6">
            <div className="rounded-none border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-serif font-normal tracking-[-0.03em]">3. Build your driver phrases</h2>
                <div className="rounded-full bg-jasmine p-1 text-sm font-bold">
                  {(['ครับ', 'ค่ะ'] as const).map((ending) => (
                    <button key={ending} type="button" onClick={() => { setParticle(ending); resetRoleplay() }} className={`rounded-full px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay ${particle === ending ? 'bg-ink text-surface' : 'text-tamarind/65'}`} aria-pressed={particle === ending} lang="th">
                      {ending}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-none bg-ink p-5 text-surface md:p-7">
                  <p className="text-sm font-bold uppercase text-honey">Say this to stop</p>
                  <p className="mt-3 text-4xl font-bold leading-tight md:text-5xl" lang="th">{stopPhrase}</p>
                  <p className="mt-4 text-lg text-surface/78">{stopRoman}</p>
                  <p className="mt-2 text-surface/78">Please stop {place.label.toLowerCase()}.</p>
                </div>
                <div className="rounded-none bg-jasmine p-5 md:p-7">
                  <p className="text-sm font-bold uppercase text-clay">Direction phrase</p>
                  <p className="mt-3 text-4xl font-bold leading-tight text-clay md:text-5xl" lang="th">{directionPhrase}</p>
                  <p className="mt-4 text-lg text-tamarind/70">{directionRoman}</p>
                  <p className="mt-2 text-tamarind/70">{direction.meaning}, please.</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 rounded-none bg-jasmine p-4 sm:grid-cols-3">
                <div className="rounded-none bg-surface p-4">
                  <p className="text-xs font-bold uppercase text-clay">Stop</p>
                  <p className="mt-2 text-2xl font-bold text-clay" lang="th">จอด</p>
                  <p className="text-sm text-tamarind/60">jawt</p>
                </div>
                <div className="rounded-none bg-surface p-4">
                  <p className="text-xs font-bold uppercase text-clay">Place</p>
                  <p className="mt-2 text-2xl font-bold text-clay" lang="th">{place.thai}</p>
                  <p className="text-sm text-tamarind/60">{place.roman}</p>
                </div>
                <div className="rounded-none bg-surface p-4">
                  <p className="text-xs font-bold uppercase text-clay">Polite</p>
                  <p className="mt-2 text-2xl font-bold text-clay" lang="th">{particle}</p>
                  <p className="text-sm text-tamarind/60">{particle === 'ครับ' ? 'khrap' : 'kha'}</p>
                </div>
              </div>

              <div className="mt-5 rounded-none border border-honey/30 bg-sand/10 p-4 text-sm leading-6 text-tamarind/75">
                <p className="font-bold text-tamarind">Natural Thai note</p>
                <p><strong lang="th">จอดตรงนี้ครับ/ค่ะ</strong> is short, polite, and enough for most local transport situations. Pointing at the map or place helps.</p>
              </div>

              <div className="mt-5 grid gap-3">
                {([
                  ['stop', 'I repeated the stop phrase 3 times'],
                  ['directions', 'I practiced go straight / left / right'],
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
              <h2 className="text-2xl font-serif font-normal tracking-[-0.03em]">4. Driver roleplay</h2>
              <p className="mt-2 text-tamarind/70">Driver asks on the phone:</p>
              <p className="mt-3 rounded-none bg-jasmine p-4 text-3xl font-bold text-clay" lang="th">อยู่ตรงไหนครับ?</p>
              <p className="mt-2 text-sm text-tamarind/60">yuu dtrong nai khrap? - Where are you?</p>

              <p className="mt-5 font-bold text-tamarind">Choose how to say stop here:</p>
              <div className="mt-3 grid gap-3">
                {driverOptions.map((option) => {
                  const isSelected = driverChoice === option
                  const isCorrect = option === stopPhrase
                  return <button key={option} type="button" onClick={() => setDriverChoice(option)} className={`rounded-none border p-4 text-left text-lg font-bold transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${isSelected && isCorrect ? 'border-honey bg-sand/15 text-honey' : isSelected ? 'border-clay/40 bg-clay/10 text-clay' : 'border-tamarind/10 bg-jasmine text-tamarind hover:border-honey/60'}`} aria-pressed={isSelected} lang="th">{option}</button>
                })}
              </div>

              <p className="mt-6 font-bold text-tamarind">If the driver needs one direction, choose:</p>
              <div className="mt-3 grid gap-3">
                {directionOptions.map((option) => {
                  const isSelected = directionChoice === option
                  const isCorrect = option === directionPhrase
                  return <button key={option} type="button" onClick={() => setDirectionChoice(option)} className={`rounded-none border p-4 text-left text-lg font-bold transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${isSelected && isCorrect ? 'border-honey bg-sand/15 text-honey' : isSelected ? 'border-clay/40 bg-clay/10 text-clay' : 'border-tamarind/10 bg-jasmine text-tamarind hover:border-honey/60'}`} aria-pressed={isSelected} lang="th">{option}</button>
                })}
              </div>

              {(driverChoice || directionChoice) && (
                <p className={`mt-4 rounded-none p-4 font-bold ${driverChoice === stopPhrase && directionChoice === directionPhrase ? 'bg-sand/12 text-honey' : 'bg-jasmine text-tamarind/70'}`}>
                  {driverChoice === stopPhrase && directionChoice === directionPhrase ? 'Correct - transport mission almost complete!' : 'Keep going. Choose the stop phrase, then choose the direction phrase.'}
                </p>
              )}
            </div>
          </section>
        </div>

        <section className="mx-auto mt-6 max-w-6xl rounded-none border border-tamarind/10 bg-ink p-6 text-surface md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase text-honey">{completed ? 'Mission complete 🏆' : 'Finish the roleplay to complete'}</p>
              <h2 className="mt-3 text-3xl font-serif font-normal tracking-[-0.04em] text-balance md:text-4xl">Send your driver voice note for correction.</h2>
              <p className="mt-3 max-w-2xl leading-7 text-surface/82 text-pretty">
                Record yourself saying “{stopPhrase}” and “{directionPhrase}”. Mike can correct pronunciation, rhythm, and polite feeling.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={`https://wa.me/66929894495?text=${whatsappText}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-none bg-honey px-6 py-3 text-center font-bold text-tamarind transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface">
                WhatsApp Mike
              </a>
              <Link href="/book" className="inline-flex min-h-12 items-center justify-center rounded-none border border-surface/40 px-6 py-3 text-center font-bold text-surface transition duration-150 ease-out hover:border-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface">
                Book a lesson
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
