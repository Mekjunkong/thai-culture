'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  emptyLearnerProgress,
  getFirstIncompleteLesson,
  learnerLessons,
  type LessonProgressStatus,
} from '@/lib/learner-course'
import { readLearnerProgress, setLearnerLessonStatus, writeLearnerProgress } from '@/lib/learner-progress'

export default function LearnerHub() {
  const [progress, setProgress] = useState<Record<number, LessonProgressStatus>>(emptyLearnerProgress)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setProgress(readLearnerProgress())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) writeLearnerProgress(progress)
  }, [hydrated, progress])

  const nextLesson = useMemo(() => getFirstIncompleteLesson(progress), [progress])
  const completedCount = learnerLessons.filter(lesson => progress[lesson.week] === 'complete').length

  function startLesson(week: number) {
    const current = readLearnerProgress()
    const status = current[week] === 'complete' ? 'complete' : 'in-progress'
    setProgress(setLearnerLessonStatus(week, status))
  }

  function toggleComplete(week: number) {
    const current = readLearnerProgress()
    const nextStatus = current[week] === 'complete' ? 'in-progress' : 'complete'
    setProgress(setLearnerLessonStatus(week, nextStatus))
  }

  return (
    <main className="bg-paper font-public text-ink">
      <section className="mx-auto max-w-[1180px] px-6 pb-12 pt-14 md:pb-16 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[.14em] text-clay">Preview learning hub</p>
            <h1 className="mt-4 max-w-[12ch] font-serif text-5xl font-bold leading-[1.05] text-ink sm:text-6xl">Keep your Thai practice moving.</h1>
            <p className="mt-5 max-w-[58ch] text-lg leading-[1.7] text-ink/68">A simple home for the four existing preview lessons. Choose a week, practise at your pace, and use the missions when you want a real-life prompt.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={nextLesson.href} onClick={() => startLesson(nextLesson.week)} className="inline-flex min-h-12 items-center justify-center bg-clay px-6 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">
                Continue with Week {nextLesson.week} →
              </Link>
              <span className="text-sm text-ink/55" aria-live="polite">{hydrated ? `${completedCount} of ${learnerLessons.length} complete` : 'Loading device progress…'}</span>
            </div>
          </div>
          <aside className="border-l-2 border-honey bg-jasmine/55 p-6 md:p-8">
            <p className="text-xs font-medium uppercase tracking-[.14em] text-clay">A clear boundary</p>
            <p className="mt-3 font-serif text-2xl leading-tight">This is a preview and learning hub.</p>
            <p className="mt-4 text-sm leading-6 text-ink/68">Your progress is saved on this device only. It is not synced to an account, and this page is not a paid entitlement gate.</p>
          </aside>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-sand/10 px-6 py-12" aria-labelledby="weeks-heading">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-xs font-medium uppercase tracking-[.14em] text-clay">Four weeks, in order</p>
          <h2 id="weeks-heading" className="mt-3 font-serif text-3xl">Pick up where you left off.</h2>
          <div className="mt-8 border-t border-ink/12">
            {learnerLessons.map(lesson => {
              const status = hydrated ? progress[lesson.week] : 'not-started'
              const statusLabel = status === 'in-progress' ? 'In progress' : status === 'complete' ? 'Complete' : 'Not started'
              return (
                <div key={lesson.href} className="grid gap-4 border-b border-ink/12 py-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6">
                  <span className="font-serif text-4xl text-clay" aria-hidden="true">{lesson.week}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[.08em] text-ink/50">
                      <span>Week {lesson.week}</span><span aria-hidden="true">·</span><span>{lesson.duration}</span><span aria-hidden="true">·</span><span>{statusLabel}</span>
                    </div>
                    <h3 className="mt-2 font-serif text-[22px] text-ink">{lesson.title}</h3>
                    <p className="mt-2 text-sm text-ink/60">{lesson.audio}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <Link href={lesson.href} onClick={() => startLesson(lesson.week)} className="inline-flex min-h-11 items-center justify-center border border-ink/20 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-clay hover:text-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">Open lesson</Link>
                    <button type="button" onClick={() => toggleComplete(lesson.week)} aria-pressed={status === 'complete'} className="inline-flex min-h-11 items-center justify-center bg-ink px-4 py-2 text-sm font-semibold text-paper transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">{status === 'complete' ? 'Mark in progress' : 'Mark complete'}</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] gap-8 px-6 py-14 md:grid-cols-2" aria-labelledby="practice-heading">
        <div>
          <p className="text-xs font-medium uppercase tracking-[.14em] text-clay">Keep practising</p>
          <h2 id="practice-heading" className="mt-3 font-serif text-3xl">Use the interactive practice app.</h2>
          <p className="mt-3 max-w-[52ch] leading-7 text-ink/68">Review useful phrases with the existing flashcards and quizzes, then come back here for your next lesson.</p>
          <Link href="/practice" className="mt-5 inline-flex min-h-11 items-center bg-ink px-5 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">Open practice app →</Link>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[.14em] text-clay">Try a real situation</p>
          <h2 className="mt-3 font-serif text-3xl">Practise with a mission.</h2>
          <p className="mt-3 max-w-[52ch] leading-7 text-ink/68">The mission library has short interactive prompts for coffee, markets, food, and transport.</p>
          <Link href="/missions" className="mt-5 inline-flex min-h-11 items-center border border-ink/20 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-clay hover:text-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">See interactive missions →</Link>
        </div>
      </section>
    </main>
  )
}
