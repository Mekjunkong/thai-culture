import Link from 'next/link'
import type { Metadata } from 'next'
import { getLearnerAccess, LEARNER_LESSONS } from '@/lib/learner-access'

export const metadata: Metadata = {
  title: 'Learner area | Thai Lessons Chiang Mai',
  description: 'Protected learner area for the Guided Starter Course.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function LearnerHomePage() {
  const access = await getLearnerAccess()

  if (access.status === 'unauthenticated') {
    return <AccessMessage title="Log in to open your learner area." body="Your learner area checks your verified Supabase account and never trusts browser-only progress or payment claims." action={{ href: '/login?next=/learn', label: 'Log in' }} />
  }

  if (access.status !== 'entitled') {
    return <AccessMessage title="Your access is still pending." body="Your account is recognised, but the signed Stripe webhook and lifetime entitlement have not been confirmed yet. If you have already paid, ask Mike to check the webhook and your account email." action={{ href: '/book?product=guided-starter-course', label: 'Ask Mike about access' }} secondary={{ href: '/lessons', label: 'View free previews' }} />
  }

  return (
    <main className="min-h-screen bg-paper px-6 py-16 text-ink">
      <section className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay">Protected learner area</p>
        <h1 className="mt-4 font-serif text-5xl font-bold">Your Guided Starter Course</h1>
        <p className="mt-4 max-w-2xl leading-7 text-ink/70">Signed in as {access.user.email ?? 'your account'}. Choose a lesson below. The public /lessons pages remain free previews.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {LEARNER_LESSONS.map((lesson) => (
            <Link key={lesson.slug} href={`/learn/${lesson.slug}`} className="border border-ink/15 bg-surface p-6 transition hover:-translate-y-0.5 hover:border-clay">
              <span className="text-sm font-semibold uppercase tracking-[0.14em] text-clay">{lesson.slug.replace('-', ' ')}</span>
              <h2 className="mt-3 font-serif text-2xl">{lesson.title}</h2>
              <span className="mt-5 block text-sm font-semibold text-clay">Open protected lesson →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

function AccessMessage({
  title,
  body,
  action,
  secondary,
}: {
  title: string
  body: string
  action: { href: string; label: string }
  secondary?: { href: string; label: string }
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6 py-16 text-ink">
      <section className="max-w-xl border border-ink/15 bg-surface p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay">Learner area</p>
        <h1 className="mt-4 font-serif text-4xl font-bold">{title}</h1>
        <p className="mt-5 leading-7 text-ink/70">{body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={action.href} className="bg-ink px-5 py-3 font-semibold text-surface">{action.label}</Link>
          {secondary ? <Link href={secondary.href} className="border border-ink/20 px-5 py-3 font-semibold">{secondary.label}</Link> : null}
        </div>
      </section>
    </main>
  )
}
