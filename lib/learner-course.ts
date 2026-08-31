export type LessonProgressStatus = 'not-started' | 'in-progress' | 'complete'

export type LearnerLesson = {
  week: number
  href: string
  title: string
  duration: string
  audio: string
}

export const LEARNER_PROGRESS_KEY = 'tlcm-learner-course-progress'

export const learnerLessons: LearnerLesson[] = [
  {
    week: 1,
    href: '/lessons/week-1',
    title: 'Greetings & Politeness Particles',
    duration: '25 min',
    audio: 'Reviewed MP3 tracks available',
  },
  {
    week: 2,
    href: '/lessons/week-2',
    title: 'Numbers, Prices, Colors & Everyday Objects',
    duration: '30 min',
    audio: 'Reviewed MP3 tracks available',
  },
  {
    week: 3,
    href: '/lessons/week-3',
    title: 'Ordering Food, Coffee & Spice Levels',
    duration: '35 min',
    audio: 'Reviewed recording not available yet',
  },
  {
    week: 4,
    href: '/lessons/week-4',
    title: 'Transport, Temples, Markets & Local Etiquette',
    duration: '40 min',
    audio: 'Reviewed recording not available yet',
  },
]

export const emptyLearnerProgress = (): Record<number, LessonProgressStatus> =>
  Object.fromEntries(learnerLessons.map(lesson => [lesson.week, 'not-started']))

export function getFirstIncompleteLesson(progress: Record<number, LessonProgressStatus>) {
  return learnerLessons.find(lesson => progress[lesson.week] !== 'complete') ?? learnerLessons[0]
}
