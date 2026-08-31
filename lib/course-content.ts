import { readFileSync } from 'fs'
import { join } from 'path'

export const COURSE_LESSONS = [
  {
    slug: 'week-1',
    title: 'Greetings & politeness',
    previewSource: 'content/lessons/week-1/preview.md',
    fullSource: 'content/lessons/week-1/full.md',
  },
  {
    slug: 'week-2',
    title: 'Numbers, prices, colors & objects',
    previewSource: 'content/lessons/week-2/preview.md',
    fullSource: 'content/lessons/week-2/full.md',
  },
  {
    slug: 'week-3',
    title: 'Food, coffee & spice levels',
    previewSource: 'content/lessons/week-3/preview.md',
    fullSource: 'content/lessons/week-3/full.md',
  },
  {
    slug: 'week-4',
    title: 'Transport & local etiquette',
    previewSource: 'content/lessons/week-4/preview.md',
    fullSource: 'content/lessons/week-4/full.md',
  },
] as const

export type CourseLesson = (typeof COURSE_LESSONS)[number]
export type CourseContentVariant = 'preview' | 'full'

export function getCourseLesson(slug: string): CourseLesson | null {
  return COURSE_LESSONS.find((lesson) => lesson.slug === slug) ?? null
}

export function getCourseContent(slug: string, variant: CourseContentVariant): string {
  const lesson = getCourseLesson(slug)
  if (!lesson) return ''

  const source = variant === 'preview' ? lesson.previewSource : lesson.fullSource
  return readFileSync(join(process.cwd(), source), 'utf-8')
}
