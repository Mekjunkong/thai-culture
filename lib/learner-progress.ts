import {
  emptyLearnerProgress,
  learnerLessons,
  LEARNER_PROGRESS_KEY,
  type LessonProgressStatus,
} from '@/lib/learner-course'

const validStatuses: LessonProgressStatus[] = ['not-started', 'in-progress', 'complete']

export function readLearnerProgress(storage?: Storage): Record<number, LessonProgressStatus> {
  const progress = emptyLearnerProgress()
  const target = storage ?? (typeof window === 'undefined' ? undefined : window.localStorage)

  if (!target) return progress

  try {
    const saved = JSON.parse(target.getItem(LEARNER_PROGRESS_KEY) ?? '{}') as Record<string, unknown>
    for (const lesson of learnerLessons) {
      const status = saved[String(lesson.week)]
      if (validStatuses.includes(status as LessonProgressStatus)) {
        progress[lesson.week] = status as LessonProgressStatus
      }
    }
  } catch {
    // Corrupt or unavailable local storage leaves the learner at a truthful blank state.
  }

  return progress
}

export function writeLearnerProgress(progress: Record<number, LessonProgressStatus>, storage?: Storage) {
  const target = storage ?? (typeof window === 'undefined' ? undefined : window.localStorage)
  if (!target) return

  try {
    target.setItem(LEARNER_PROGRESS_KEY, JSON.stringify(progress))
  } catch {
    // A blocked or full local storage should not interrupt lesson reading.
  }
}

export function setLearnerLessonStatus(week: number, status: LessonProgressStatus, storage?: Storage) {
  const progress = readLearnerProgress(storage)
  progress[week] = status
  writeLearnerProgress(progress, storage)
  return progress
}

export { LEARNER_PROGRESS_KEY }
