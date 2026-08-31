"use client"

import { useEffect, useMemo, useState } from 'react'

type IntakeState = {
  name: string
  email: string
  contact: string
  location: string
  format: string
  level: string
  goal: string
  situations: string[]
  schedule: string
  notes: string
}

const whatsappNumber = '66929894495'
const DRAFT_KEY = 'tlcm-intake-draft-v2'

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
  name: '', email: '', contact: '', location: '', format: 'Online video lesson',
  level: 'Complete beginner', goal: '', situations: ['Cafe / ordering drinks'], schedule: '', notes: '',
}

const inputClass = 'min-h-12 w-full rounded-none border border-tamarind/15 bg-jasmine px-4 py-3 font-semibold outline-none transition focus:border-clay focus:ring-4 focus:ring-clay/10'

export default function IntakeForm() {
  const [form, setForm] = useState<IntakeState>(initialState)
  const [courseRequest, setCourseRequest] = useState(false)

  useEffect(() => {
    setCourseRequest(new URLSearchParams(window.location.search).get('product') === 'guided-starter-course')
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY)
      if (raw) setForm(current => ({ ...current, ...JSON.parse(raw) }))
    } catch {
      // Ignore a corrupted draft and start fresh.
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(form))
  }, [form])

  function updateField(field: keyof IntakeState, value: string) {
    setForm(current => ({ ...current, [field]: value }))
  }

  function handleSend() {
    // Keep the draft until the user confirms the request was sent successfully.
  }

  function toggleSituation(option: string) {
    setForm(current => ({
      ...current,
      situations: current.situations.includes(option)
        ? current.situations.filter(item => item !== option)
        : [...current.situations, option],
    }))
  }

  const message = useMemo(() => encodeURIComponent([
    courseRequest
      ? 'Hi Mike, I want to request the Guided Starter Course (฿690, self-study, lifetime access).'
      : 'Hi Mike, I want to book Thai Lessons Chiang Mai.',
    '',
    `Name: ${form.name || '-'}`,
    courseRequest ? `Login/account email: ${form.email || '-'}` : `Email: ${form.email || '-'}`,
    `WhatsApp/contact: ${form.contact || '-'}`,
    ...(courseRequest
      ? [`Beginner goal (optional): ${form.goal || '-'}`]
      : [
          `Where I live/stay: ${form.location || '-'}`,
          `Lesson format: ${form.format}`,
          `Thai level: ${form.level}`,
          `Main goal: ${form.goal || '-'}`,
          `Situations I need: ${form.situations.join(', ') || '-'}`,
          `Best time/day: ${form.schedule || '-'}`,
          `Notes: ${form.notes || '-'}`,
        ]),
    '',
    courseRequest
      ? 'Please reply with the current manual payment instructions and confirm access after payment is checked. I understand this request is not an automatic purchase or instant access.'
      : 'Please suggest the best first mission and price.',
  ].join('\n')), [form, courseRequest])

  const courseMissing = !form.name.trim() || !form.email.trim() || !form.contact.trim()
  const lessonMissing = !form.name.trim() || !form.goal.trim()

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr]">
      <form className="min-w-0 rounded-none border border-tamarind/10 bg-surface p-5 md:p-7" aria-labelledby="intake-heading">
        <h2 id="intake-heading" className="sr-only">{courseRequest ? 'Guided Starter Course request' : 'Lesson intake'}</h2>
        {courseRequest && (
          <p className="mb-5 border border-honey bg-jasmine px-4 py-3 text-sm font-semibold leading-6 text-tamarind/75">
            <span className="block text-clay">Guided Starter Course · ฿690</span>
            Self-study, lifetime access. This is a manual access request. Mike confirms payment and grants access after review. Nothing is purchased or unlocked automatically.
          </p>
        )}
        <p className="mb-5 bg-jasmine px-4 py-3 text-sm font-semibold leading-6 text-tamarind/75">
          Your answers build a WhatsApp message. Nothing is sent until you tap the button. Your draft is saved in this browser so you can return later.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <label htmlFor="intake-name" className="grid gap-2 font-bold text-tamarind/78">Name
            <input id="intake-name" name="name" required value={form.name} onChange={event => updateField('name', event.target.value)} className={inputClass} placeholder="Your name" autoComplete="name" />
          </label>
          <label htmlFor="intake-email" className="grid gap-2 font-bold text-tamarind/78">{courseRequest ? 'Login or account email' : 'Email'}
            <input id="intake-email" name="email" type="email" required={courseRequest} value={form.email} onChange={event => updateField('email', event.target.value)} className={inputClass} placeholder="you@example.com" autoComplete="email" aria-describedby={courseRequest ? 'email-help' : undefined} />
            {courseRequest && <span id="email-help" className="text-xs font-normal text-tamarind/60">Use the email you want matched to course access.</span>}
          </label>
          <label htmlFor="intake-contact" className="grid gap-2 font-bold text-tamarind/78">WhatsApp or contact number
            <input id="intake-contact" name="contact" required={courseRequest} value={form.contact} onChange={event => updateField('contact', event.target.value)} className={inputClass} placeholder="WhatsApp number or another contact" autoComplete="tel" />
          </label>
        </div>

        {courseRequest ? (
          <label htmlFor="course-goal" className="mt-5 grid gap-2 font-bold text-tamarind/78">Beginner goal <span className="text-sm font-normal text-tamarind/55">optional</span>
            <textarea id="course-goal" name="goal" value={form.goal} onChange={event => updateField('goal', event.target.value)} className={`${inputClass} min-h-28`} placeholder="What would you like to handle in Thai during your first month?" />
          </label>
        ) : (
          <>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label htmlFor="intake-location" className="grid gap-2 font-bold text-tamarind/78">Where are you based?
                <input id="intake-location" name="location" value={form.location} onChange={event => updateField('location', event.target.value)} className={inputClass} placeholder="Nimman, Old City, online, etc." />
              </label>
              <label htmlFor="intake-format" className="grid gap-2 font-bold text-tamarind/78">Lesson format
                <select id="intake-format" name="format" value={form.format} onChange={event => updateField('format', event.target.value)} className={inputClass}><option>Online video lesson</option><option>On-site cafe lesson in Chiang Mai</option><option>Chiang Mai Mission Walk</option><option>Not sure yet</option></select>
              </label>
              <label htmlFor="intake-level" className="grid gap-2 font-bold text-tamarind/78">Thai level
                <select id="intake-level" name="level" value={form.level} onChange={event => updateField('level', event.target.value)} className={inputClass}><option>Complete beginner</option><option>I know a few words</option><option>I can order simple things</option><option>I studied Thai before but need speaking confidence</option></select>
              </label>
            </div>
            <label htmlFor="intake-goal" className="mt-5 grid gap-2 font-bold text-tamarind/78">Main speaking goal
              <textarea id="intake-goal" name="goal" value={form.goal} onChange={event => updateField('goal', event.target.value)} className={`${inputClass} min-h-28`} placeholder="Example: I want to order food and use polite Thai without feeling shy." />
            </label>
            <fieldset className="mt-5"><legend className="font-bold text-tamarind">Which real-life situations do you need?</legend><p className="mt-1 text-sm text-tamarind/60">Choose as many as apply.</p><div className="mt-3 grid gap-2 md:grid-cols-2">{situationOptions.map(option => { const checked = form.situations.includes(option); return <button key={option} type="button" onClick={() => toggleSituation(option)} aria-pressed={checked} className={`min-h-11 border px-4 py-3 text-left font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay ${checked ? 'border-honey bg-sand/15 text-clay' : 'border-tamarind/10 bg-jasmine text-tamarind/70 hover:border-clay'}`}>{checked ? '✓ ' : '+ '}{option}</button> })}</div></fieldset>
            <div className="mt-5 grid gap-4 md:grid-cols-2"><label htmlFor="intake-schedule" className="grid gap-2 font-bold text-tamarind/78">Best time/day<input id="intake-schedule" name="schedule" value={form.schedule} onChange={event => updateField('schedule', event.target.value)} className={inputClass} placeholder="Weekday morning, Sunday, etc." /></label><label htmlFor="intake-notes" className="grid gap-2 font-bold text-tamarind/78">Extra notes<input id="intake-notes" name="notes" value={form.notes} onChange={event => updateField('notes', event.target.value)} className={inputClass} placeholder="Accent, goal, deadline, hotel area..." /></label></div>
          </>
        )}
      </form>

      <aside className="min-w-0 border border-honey bg-sand/10 p-5 md:p-7">
        <p className="text-sm font-bold uppercase text-clay">{courseRequest ? 'Course request' : 'Booking message'}</p>
        <h2 className="mt-3 text-3xl font-serif font-normal leading-tight">{courseRequest ? 'Request access, then match your account.' : 'Send a cleaner intake before the first lesson.'}</h2>
        <p className="mt-4 leading-7 text-tamarind/70">{courseRequest ? 'Mike will reply with the current manual payment instructions and confirm access after checking payment. The account email helps match access later.' : 'Your answers help Mike prepare the right mission, phrase bank, and correction focus.'}</p>
        <div className="mt-5 bg-surface p-4 text-sm leading-6 text-tamarind/72"><p><strong>Name:</strong> {form.name || 'Not written yet'}</p><p><strong>Email:</strong> {form.email || 'Not written yet'}</p><p><strong>Contact:</strong> {form.contact || 'Not written yet'}</p>{courseRequest ? <p><strong>Goal:</strong> {form.goal || 'Optional, not written'}</p> : <><p><strong>Format:</strong> {form.format}</p><p><strong>Situations:</strong> {form.situations.join(', ') || '-'}</p></>}</div>
        {(courseRequest ? courseMissing : lessonMissing) && <p role="alert" className="mt-4 text-sm font-semibold text-clay">{courseRequest ? 'Add your name, account email, and contact before sending the course request.' : 'Add your name and goal above, or send as-is if you would rather explain over chat.'}</p>}
        <a href={`https://wa.me/${whatsappNumber}?text=${message}`} target="_blank" rel="noreferrer" onClick={handleSend} className="mt-5 inline-flex min-h-12 w-full items-center justify-center bg-ink px-6 py-3 text-center font-bold text-surface transition hover:bg-ink/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">{courseRequest ? 'Send course request on WhatsApp' : 'Send intake on WhatsApp'}</a>
        {!courseRequest && <a href="/lesson-report" className="mt-3 inline-flex min-h-12 w-full items-center justify-center border border-tamarind/15 bg-surface px-6 py-3 text-center font-bold text-clay transition hover:border-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">View lesson report template</a>}
      </aside>
    </div>
  )
}
