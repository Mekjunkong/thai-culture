"use client"

import { useEffect, useMemo, useState } from 'react'

type IntakeState = {
  name: string
  location: string
  format: string
  level: string
  goal: string
  situations: string[]
  schedule: string
  notes: string
}

const whatsappNumber = '66929894495'
const DRAFT_KEY = 'tlcm-intake-draft-v1'

const situationOptions = [
  'Cafe / ordering drinks',
  'Market / prices / numbers',
  'Restaurant / spice level',
  'Driver / Grab / songthaew',
  'Condo / security / repair',
  'Work / staff / customers',
  'Social / friends / dating',
  'Travel / temple / polite culture',
]

const initialState: IntakeState = {
  name: '',
  location: '',
  format: 'Online video lesson',
  level: 'Complete beginner',
  goal: '',
  situations: ['Cafe / ordering drinks'],
  schedule: '',
  notes: '',
}

export default function IntakeForm() {
  const [form, setForm] = useState<IntakeState>(initialState)

  // Restore an in-progress draft (e.g. phone locked mid-form, tab reloaded).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY)
      if (raw) setForm((current) => ({ ...current, ...JSON.parse(raw) }))
    } catch {
      // Ignore a corrupted draft and start fresh.
    }
  }, [])

  // Autosave the draft as the learner fills it in.
  useEffect(() => {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(form))
  }, [form])

  function updateField(field: keyof IntakeState, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSend() {
    window.localStorage.removeItem(DRAFT_KEY)
  }

  function toggleSituation(option: string) {
    setForm((current) => {
      const exists = current.situations.includes(option)
      return {
        ...current,
        situations: exists
          ? current.situations.filter((item) => item !== option)
          : [...current.situations, option],
      }
    })
  }

  const message = useMemo(() => {
    return encodeURIComponent(
      [
        'Hi Mike, I want to book Thai Lessons Chiang Mai.',
        '',
        `Name: ${form.name || '-'}`,
        `Where I live/stay: ${form.location || '-'}`,
        `Lesson format: ${form.format}`,
        `Thai level: ${form.level}`,
        `Main goal: ${form.goal || '-'}`,
        `Situations I need: ${form.situations.join(', ') || '-'}`,
        `Best time/day: ${form.schedule || '-'}`,
        `Notes: ${form.notes || '-'}`,
        '',
        'Please suggest the best first mission and price.',
      ].join('\n')
    )
  }, [form])

  const needsNudge = !form.name.trim() || !form.goal.trim()

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr]">
      <form className="min-w-0 rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-xl shadow-tamarind/10 md:p-7">
        <p className="mb-5 rounded-2xl bg-jasmine px-4 py-3 text-sm font-semibold leading-6 text-tamarind/75">
          Your answers below build a WhatsApp message to Mike - nothing is sent until you tap the button. Your progress is saved automatically if you need to come back to this later.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 font-bold text-tamarind/78">
            Name
            <input
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              className="min-h-12 rounded-2xl border border-tamarind/15 bg-jasmine px-4 py-3 font-semibold outline-none transition focus:border-clay focus:ring-4 focus:ring-clay/10"
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-2 font-bold text-tamarind/78">
            Where are you based?
            <input
              value={form.location}
              onChange={(event) => updateField('location', event.target.value)}
              className="min-h-12 rounded-2xl border border-tamarind/15 bg-jasmine px-4 py-3 font-semibold outline-none transition focus:border-clay focus:ring-4 focus:ring-clay/10"
              placeholder="Nimman, Old City, online, etc."
            />
          </label>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="grid min-w-0 gap-2 font-bold text-tamarind/78">
            Lesson format
            <select
              value={form.format}
              onChange={(event) => updateField('format', event.target.value)}
              className="min-h-12 w-full min-w-0 rounded-2xl border border-tamarind/15 bg-jasmine px-4 py-3 font-semibold outline-none transition focus:border-clay focus:ring-4 focus:ring-clay/10"
            >
              <option>Online video lesson</option>
              <option>On-site cafe lesson in Chiang Mai</option>
              <option>Chiang Mai Mission Walk</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label className="grid min-w-0 gap-2 font-bold text-tamarind/78">
            Thai level
            <select
              value={form.level}
              onChange={(event) => updateField('level', event.target.value)}
              className="min-h-12 w-full min-w-0 rounded-2xl border border-tamarind/15 bg-jasmine px-4 py-3 font-semibold outline-none transition focus:border-clay focus:ring-4 focus:ring-clay/10"
            >
              <option>Complete beginner</option>
              <option>I know a few words</option>
              <option>I can order simple things</option>
              <option>I studied Thai before but need speaking confidence</option>
            </select>
          </label>
        </div>

        <label className="mt-5 grid gap-2 font-bold text-tamarind/78">
          Main speaking goal
          <textarea
            value={form.goal}
            onChange={(event) => updateField('goal', event.target.value)}
            className="min-h-28 rounded-2xl border border-tamarind/15 bg-jasmine px-4 py-3 font-semibold outline-none transition focus:border-clay focus:ring-4 focus:ring-clay/10"
            placeholder="Example: I want to order food, talk to condo staff, and use polite Thai without feeling shy."
          />
        </label>

        <fieldset className="mt-5">
          <legend className="font-black text-tamarind">Which real-life situations do you need?</legend>
          <p className="mt-1 text-sm text-tamarind/60">Choose as many as apply.</p>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {situationOptions.map((option) => {
              const checked = form.situations.includes(option)
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleSituation(option)}
                  aria-pressed={checked}
                  className={`rounded-2xl border px-4 py-3 text-left font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${
                    checked ? 'border-honey bg-sand/15 text-clay' : 'border-tamarind/10 bg-jasmine text-tamarind/70 hover:border-clay'
                  }`}
                >
                  {checked ? '✓ ' : '+ '}{option}
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 font-bold text-tamarind/78">
            Best time/day
            <input
              value={form.schedule}
              onChange={(event) => updateField('schedule', event.target.value)}
              className="min-h-12 rounded-2xl border border-tamarind/15 bg-jasmine px-4 py-3 font-semibold outline-none transition focus:border-clay focus:ring-4 focus:ring-clay/10"
              placeholder="Weekday morning, Sunday, etc."
            />
          </label>
          <label className="grid gap-2 font-bold text-tamarind/78">
            Extra notes
            <input
              value={form.notes}
              onChange={(event) => updateField('notes', event.target.value)}
              className="min-h-12 rounded-2xl border border-tamarind/15 bg-jasmine px-4 py-3 font-semibold outline-none transition focus:border-clay focus:ring-4 focus:ring-clay/10"
              placeholder="Accent, goal, deadline, hotel area..."
            />
          </label>
        </div>
      </form>

      <aside className="min-w-0 rounded-[2rem] border border-honey bg-sand/10 p-5 shadow-xl shadow-tamarind/10 md:p-7">
        <p className="text-sm font-black uppercase text-clay">Your booking message</p>
        <h2 className="mt-3 text-3xl font-black leading-tight">Send a cleaner intake before the first lesson.</h2>
        <p className="mt-4 leading-7 text-tamarind/70">
          This makes the lesson more professional: Mike can prepare the right mission, phrase bank, and correction focus before the call or on-site class.
        </p>
        <div className="mt-5 rounded-2xl bg-surface p-4 text-sm leading-6 text-tamarind/72">
          <p><strong>Format:</strong> {form.format}</p>
          <p><strong>Level:</strong> {form.level}</p>
          <p><strong>Situations:</strong> {form.situations.join(', ') || '-'}</p>
          <p><strong>Goal:</strong> {form.goal || 'Not written yet'}</p>
        </div>
        {needsNudge && (
          <p className="mt-4 text-sm font-semibold text-clay">
            Add your name and goal above so Mike can prepare the right first lesson - or send as-is if you&apos;d rather explain over chat.
          </p>
        )}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noreferrer"
          onClick={handleSend}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-ink px-6 py-3 text-center font-black text-surface transition hover:bg-ink/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
        >
          Send intake on WhatsApp
        </a>
        <a
          href="/lesson-report"
          className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-tamarind/15 bg-surface px-6 py-3 text-center font-black text-clay transition hover:border-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
        >
          View lesson report template
        </a>
      </aside>
    </div>
  )
}
