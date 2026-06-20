import Link from 'next/link'
import AuthForm from '@/components/auth/AuthForm'
import Navbar from '@/components/ui/Navbar'

export const metadata = {
  title: 'Login | Thai Culture Starter Course',
  description: 'Login or create an account for the Thai Culture Starter Course.',
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-jasmine px-4 py-12 text-tamarind md:py-18">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <section className="rounded-[2rem] bg-indigo p-6 text-surface shadow-2xl shadow-indigo/20 md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-turmeric">Course account</p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] text-balance md:text-5xl">
              Login and keep your Thai culture course in one place.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-surface/78 text-pretty">
              Create an account before or after buying lifetime access. The first version gives learners a working login; saved progress and paid lesson locks can be added next.
            </p>
            <ul className="mt-8 grid gap-3 text-sm leading-6 text-surface/82">
              {['Email/password login', 'Persistent browser session', 'Ready for future progress tracking', 'Works with the existing Supabase setup'].map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-surface/10 bg-surface/8 p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-turmeric text-xs font-black text-tamarind" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/lessons/week-1" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-2xl border border-surface/18 px-6 py-3 font-bold text-surface transition hover:-translate-y-0.5 hover:border-turmeric hover:text-turmeric focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface">
              Try Week 1 first
            </Link>
          </section>

          <AuthForm />
        </div>
      </main>
    </>
  )
}
