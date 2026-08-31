'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { learnerLessons, type LessonProgressStatus } from '@/lib/learner-course'
import { readLearnerProgress, setLearnerLessonStatus } from '@/lib/learner-progress'

type LessonNavigationProps = {
  week: number
}

function statusLabel(status: LessonProgressStatus) {
  if (status === 'complete') return 'Complete'
  if (status === 'in-progress') return 'In progress'
  return 'Not started'
}

export default function LessonNavigation({ week }: LessonNavigationProps) {
  const lessonIndex = learnerLessons.findIndex(lesson => lesson.week === week)
  const lesson = learnerLessons[lessonIndex]
  const previousLesson = lessonIndex > 0 ? learnerLessons[lessonIndex - 1] : undefined
  const nextLesson = lessonIndex >= 0 && lessonIndex < learnerLessons.length - 1 ? learnerLessons[lessonIndex + 1] : undefined
  const [status, setStatus] = useState<LessonProgressStatus>('not-started')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const progress = readLearnerProgress()
    const currentStatus = progress[week] ?? 'not-started'
    setStatus(currentStatus)
    setHydrated(true)

    if (currentStatus !== 'complete') {
      setLearnerLessonStatus(week, 'in-progress')
      setStatus('in-progress')
    }
  }, [week])

  if (!lesson) return null

  const isComplete = status === 'complete'

  function toggleCompletion() {
    const nextStatus = isComplete ? 'in-progress' : 'complete'
    setLearnerLessonStatus(week, nextStatus)
    setStatus(nextStatus)
  }

  return (
    <section aria-labelledby="lesson-progress-heading" className="mt-6 border border-tamarind/10 bg-surface p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-clay">Lesson navigation</p>
          <h2 id="lesson-progress-heading" className="mt-3 font-serif text-2xl font-normal text-tamarind">Week {week} of {learnerLessons.length}</h2>
          <p className="mt-2 text-sm leading-6 text-tamarind/70">{lesson.title}</p>
          <p className="mt-3 text-sm font-semibold text-tamarind" aria-live="polite">
            Status: {hydrated ? statusLabel(status) : 'Loading device progress…'}
          </p>
        </div>
        <button
          type="button"
          onClick={toggleCompletion}
          aria-pressed={isComplete}
          aria-label={isComplete ? `Mark Week ${week} in progress` : `Mark Week ${week} complete`}
          className="inline-flex min-h-11 min-w-11 items-center justify-center border border-ink bg-ink px-5 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
        >
          {isComplete ? 'Mark in progress' : 'Mark complete'}
        </button>
      </div>
      <nav aria-label={`Week ${week} lesson navigation`} className="mt-6 flex flex-col gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        {previousLesson ? (
          <Link href={previousLesson.href} className="inline-flex min-h-11 min-w-11 items-center text-sm font-semibold text-clay hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">
            ← Week {previousLesson.week}: {previousLesson.title}
          </Link>
        ) : <span aria-hidden="true" />}
        <Link href="/learn" className="inline-flex min-h-11 min-w-11 items-center text-sm font-semibold text-tamarind underline decoration-tamarind/30 underline-offset-4 hover:text-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">
          Back to learning hub
        </Link>
        {nextLesson ? (
          <Link href={nextLesson.href} className="inline-flex min-h-11 min-w-11 items-center justify-end text-sm font-semibold text-clay hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">
            Week {nextLesson.week}: {nextLesson.title} →
          </Link>
        ) : <span aria-hidden="true" />}
      </nav>
    </section>
  )
}
