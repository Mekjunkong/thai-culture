import { cookies } from 'next/headers'
import { createAdminClient, getAuthenticatedUser } from '@/lib/supabase'
import { ACCESS_TOKEN_COOKIE } from '@/lib/auth-cookie'
import { COURSE_LESSONS } from '@/lib/course-content'

export const LEARNER_LESSONS = COURSE_LESSONS.map(({ slug, title, fullSource: source }) => ({ slug, title, source }))

export type LearnerLesson = (typeof LEARNER_LESSONS)[number]
export type LearnerAccess =
  | { status: 'unauthenticated'; user: null }
  | { status: 'pending'; user: { id: string; email?: string }; reason: 'profile-missing' | 'not-entitled' | 'server-not-configured' }
  | { status: 'entitled'; user: { id: string; email?: string } }

export function getLearnerLesson(slug: string): LearnerLesson | null {
  return LEARNER_LESSONS.find((lesson) => lesson.slug === slug) ?? null
}

export async function getLearnerAccess(): Promise<LearnerAccess> {
  const token = cookies().get(ACCESS_TOKEN_COOKIE)?.value
  if (!token) return { status: 'unauthenticated', user: null }

  let user
  try {
    user = await getAuthenticatedUser(token)
  } catch {
    return { status: 'pending', user: { id: 'unknown' }, reason: 'server-not-configured' }
  }
  if (!user) return { status: 'unauthenticated', user: null }

  try {
    const db = createAdminClient()
    const { data: profile, error } = await db
      .from('profiles')
      .select('id, email, subscription_tier')
      .eq('id', user.id)
      .maybeSingle()

    if (error || !profile) {
      return { status: 'pending', user: { id: user.id, email: user.email }, reason: 'profile-missing' }
    }

    return profile.subscription_tier === 'lifetime'
      ? { status: 'entitled', user: { id: user.id, email: user.email } }
      : { status: 'pending', user: { id: user.id, email: user.email }, reason: 'not-entitled' }
  } catch {
    return { status: 'pending', user: { id: user.id, email: user.email }, reason: 'server-not-configured' }
  }
}
