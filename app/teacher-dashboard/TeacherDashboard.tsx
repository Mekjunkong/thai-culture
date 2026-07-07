'use client'

import { useMemo, useState } from 'react'

const leadStages = [
  { label: 'New lead', goal: 'Reply fast and choose the right product.' },
  { label: 'Intake received', goal: 'Match their real-life situation to a mission.' },
  { label: 'Trial booked', goal: 'Prepare phrase bank and correction focus.' },
  { label: 'Lesson done', goal: 'Send report, homework, and next offer.' },
]

const prepChecklist = [
  'Read the student intake and choose one main situation only.',
  'Prepare 3 core Thai phrases, 2 likely replies, and 1 emergency fallback phrase.',
  'Open the matching mission page or workbook section before class.',
  'Decide the correction focus: tone, rhythm, vowel length, polite ending, or confidence.',
  'Prepare the next-step offer: trial → Starter Pack, Starter Pack → 5-Lesson Survival Path.',
]

const afterClassChecklist = [
  'Write the phrase bank while the lesson is still fresh.',
  'Mark one pronunciation win and one pronunciation correction.',
  'Give one tiny real-world homework challenge within 24 hours.',
  'Send the lesson report link or PDF note on WhatsApp.',
  'Invite the student to book the next mission with a specific recommendation.',
]

const productScripts = [
  {
    title: 'Fast reply to new lead',
    text: 'Hi! Yes, I can help you speak practical Thai for real Chiang Mai situations. Before I suggest the best lesson, please fill this short intake: https://thailessonschiangmai.com/book — then I’ll recommend online, on-site, or a mission walk.',
  },
  {
    title: 'After trial → Starter Pack',
    text: 'Nice work today. Your strongest next step is the Starter Pack: one full private lesson, workbook, practice missions, and 7 days of WhatsApp voice correction. We can focus on cafe, market, food, driver, or your personal daily situation.',
  },
  {
    title: 'After Starter Pack → 5-Lesson Path',
    text: 'You now have a good start. If you want Thai to become usable in daily Chiang Mai life, I recommend the 5-Lesson Survival Path: cafe, market, food, transport, and your personal situation. Each lesson gives phrases, correction, and real homework.',
  },
  {
    title: 'On-site mission walk offer',
    text: 'If you want to practice outside the classroom, we can do a Chiang Mai Mission Walk. We meet at a cafe, market, restaurant, or transport spot, prepare the phrase, roleplay it, then try it in the real situation with teacher support.',
  },
]

const missionMatches = [
  ['Cafe / coffee', 'Order coffee less sweet', '/missions/order-coffee', 'Starter Pack or cafe mission walk'],
  ['Market / shopping', 'Ask the market price', '/missions/market-price', 'Market mission walk'],
  ['Restaurant / spice', 'Order food and spice level', '/missions/order-food-spice', 'Food lesson + voice correction'],
  ['Transport / driver', 'Tell a driver to stop', '/missions/driver-stop', 'Transport lesson'],
  ['Condo / daily help', 'Condo help Thai', '/products/onsite-chiang-mai-thai-lesson-pack.pdf', 'Custom 5-Lesson Path'],
]

export default function TeacherDashboard() {
  const [checkedPrep, setCheckedPrep] = useState<string[]>([])
  const [checkedAfter, setCheckedAfter] = useState<string[]>([])
  const [copied, setCopied] = useState<string>('')

  const totalTasks = prepChecklist.length + afterClassChecklist.length
  const completedTasks = checkedPrep.length + checkedAfter.length
  const progress = Math.round((completedTasks / totalTasks) * 100)

  const nextAction = useMemo(() => {
    if (checkedPrep.length < prepChecklist.length) return 'Finish lesson preparation before class.'
    if (checkedAfter.length < afterClassChecklist.length) return 'Send report, homework, and next offer after class.'
    return 'Workflow complete. Follow up tomorrow if the student has not replied.'
  }, [checkedAfter.length, checkedPrep.length])

  function toggle(value: string, list: string[], setList: (items: string[]) => void) {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value])
  }

  async function copyScript(title: string, text: string) {
    await navigator.clipboard.writeText(text)
    setCopied(title)
    window.setTimeout(() => setCopied(''), 1800)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
        <p className="text-sm font-black uppercase text-temple">Today&apos;s operating system</p>
        <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] md:text-4xl">Run every student through the same professional workflow.</h2>
        <div className="mt-6 rounded-2xl bg-jasmine p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="font-black text-indigo">Workflow progress</p>
            <p className="text-2xl font-black text-tamarind">{progress}%</p>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-surface" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Teacher workflow progress">
            <div className="h-full rounded-full bg-turmeric transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-sm font-bold text-tamarind/65">Next: {nextAction}</p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {leadStages.map((stage) => (
            <article key={stage.label} className="rounded-2xl border border-tamarind/10 bg-jasmine p-4">
              <h3 className="font-black text-indigo">{stage.label}</h3>
              <p className="mt-2 text-sm leading-6 text-tamarind/70">{stage.goal}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-turmeric bg-banana/10 p-5 shadow-lg shadow-tamarind/10 md:p-6">
        <p className="text-sm font-black uppercase text-temple">Lead matching</p>
        <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] md:text-4xl">Turn messy messages into a clear product recommendation.</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-tamarind/10 bg-surface">
          <div className="grid grid-cols-[1fr_1fr_0.9fr] gap-3 bg-indigo px-4 py-3 text-sm font-black text-surface">
            <span>Student says</span>
            <span>Send them to</span>
            <span>Offer</span>
          </div>
          {missionMatches.map(([need, mission, href, offer]) => (
            <div key={need} className="grid grid-cols-[1fr_1fr_0.9fr] gap-3 border-t border-tamarind/10 px-4 py-3 text-sm leading-6 text-tamarind/72">
              <span className="font-bold text-tamarind">{need}</span>
              <a className="font-black text-indigo underline-offset-4 hover:underline" href={href}>{mission}</a>
              <span>{offer}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
        <p className="text-sm font-black uppercase text-temple">Before class checklist</p>
        <div className="mt-5 grid gap-3">
          {prepChecklist.map((item) => (
            <label key={item} className="flex cursor-pointer gap-3 rounded-2xl border border-tamarind/10 bg-jasmine p-4 transition hover:border-temple">
              <input
                type="checkbox"
                checked={checkedPrep.includes(item)}
                onChange={() => toggle(item, checkedPrep, setCheckedPrep)}
                className="mt-1 size-5 accent-indigo"
              />
              <span className="font-bold leading-7 text-tamarind/74">{item}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
        <p className="text-sm font-black uppercase text-temple">After class checklist</p>
        <div className="mt-5 grid gap-3">
          {afterClassChecklist.map((item) => (
            <label key={item} className="flex cursor-pointer gap-3 rounded-2xl border border-tamarind/10 bg-jasmine p-4 transition hover:border-temple">
              <input
                type="checkbox"
                checked={checkedAfter.includes(item)}
                onChange={() => toggle(item, checkedAfter, setCheckedAfter)}
                className="mt-1 size-5 accent-indigo"
              />
              <span className="font-bold leading-7 text-tamarind/74">{item}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="lg:col-span-2 rounded-[2rem] border border-tamarind/10 bg-surface p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-temple">WhatsApp follow-up scripts</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] md:text-4xl">Copy messages that sell the next step without sounding pushy.</h2>
          </div>
          {copied ? <p className="rounded-full bg-turmeric px-4 py-2 text-sm font-black text-tamarind">Copied: {copied}</p> : null}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {productScripts.map((script) => (
            <article key={script.title} className="rounded-[1.5rem] border border-tamarind/10 bg-jasmine p-5">
              <h3 className="text-xl font-black text-indigo">{script.title}</h3>
              <p className="mt-3 min-h-28 leading-7 text-tamarind/70">{script.text}</p>
              <button
                type="button"
                onClick={() => copyScript(script.title, script.text)}
                className="mt-5 inline-flex min-h-12 items-center justify-center rounded-2xl bg-indigo px-5 py-3 font-black text-surface transition hover:bg-indigo-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
              >
                Copy script
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
