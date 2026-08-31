import Link from 'next/link'
import { notFound } from 'next/navigation'
import MarkdownContent from '@/components/lesson/MarkdownContent'
import { getLearnerAccess, getLearnerLesson } from '@/lib/learner-access'
import { getCourseContent } from '@/lib/course-content'

export const dynamic = 'force-dynamic'

export default async function ProtectedLessonPage({ params }: { params: { slug: string } }) {
  const lesson = getLearnerLesson(params.slug)
  if (!lesson) notFound()

  const access = await getLearnerAccess()
  if (access.status !== 'entitled') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper px-6 py-16 text-ink">
        <section className="max-w-xl border border-ink/15 bg-surface p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay">Protected lesson</p>
          <h1 className="mt-4 font-serif text-4xl font-bold">Access is not active yet.</h1>
          <p className="mt-5 leading-7 text-ink/70">
            {access.status === 'unauthenticated'
              ? 'Log in first. This route verifies your Supabase session on the server.'
              : 'Your account is waiting for a verified Stripe webhook and lifetime entitlement. This page does not grant access from a checkout redirect.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={access.status === 'unauthenticated' ? `/login?next=/learn/${lesson.slug}` : '/book?product=guided-starter-course'} className="bg-ink px-5 py-3 font-semibold text-surface">
              {access.status === 'unauthenticated' ? 'Log in' : 'Ask Mike about access'}
            </Link>
            <Link href="/lessons" className="border border-ink/20 px-5 py-3 font-semibold">View free previews</Link>
          </div>
        </section>
      </main>
    )
  }

  const content = getCourseContent(params.slug, 'full')
  return (
    <main className="min-h-screen bg-paper px-4 py-10 text-ink md:py-14">
      <article className="mx-auto max-w-4xl border border-ink/10 bg-surface p-6 shadow-sm md:p-10">
        <Link href="/learn" className="text-sm font-semibold text-clay hover:underline">← Back to learner area</Link>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-clay">Protected delivery · {lesson.slug.replace('-', ' ')}</p>
        <h1 className="mt-3 font-serif text-4xl font-bold md:text-5xl">{lesson.title}</h1>
        <div className="mt-8"><MarkdownContent content={content} /></div>
      </article>
    </main>
  )
}
