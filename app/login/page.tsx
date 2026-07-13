import Link from 'next/link'
import AuthForm from '@/components/auth/AuthForm'
import Navbar from '@/components/ui/Navbar'
import SiteFooter from '@/components/ui/SiteFooter'

export const metadata = {
  title: 'Login | Thai Culture Starter Course',
  description: 'Login or create an account for the Thai Culture Starter Course.',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-paper px-4 py-12 text-tamarind md:py-18">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <section className="rounded-none bg-ink p-6 text-surface md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-honey">Course account</p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-balance md:text-5xl">
              Login and keep your Thai culture course in one place.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-surface/78 text-pretty">
              Create an account before or after buying lifetime access. Keep your course access, practice notes and lesson progress easier to return to.
            </p>
            <ul className="mt-8 grid gap-3 text-sm leading-6 text-surface/82">
              {['Email/password login', 'Persistent browser session', 'Save your progress on this device', 'Easy course access after purchase'].map((item) => (
                <li key={item} className="flex gap-3 rounded-none border border-surface/10 bg-surface/8 p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-honey text-xs font-bold text-tamarind" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/lessons/week-1" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-none border border-surface/18 px-6 py-3 font-bold text-surface transition hover:-translate-y-0.5 hover:border-honey hover:text-honey focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface">
              Try Week 1 first
            </Link>
          </section>

          <AuthForm />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
