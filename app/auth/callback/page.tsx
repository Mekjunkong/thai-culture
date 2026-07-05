'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/ui/Navbar'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [message, setMessage] = useState('Finishing Google login…')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function finishLogin() {
      if (!isSupabaseConfigured || !supabase) {
        setError('Google login requires an internet connection. You can still log in with email/password.')
        setMessage('Could not finish Google login.')
        return
      }

      const params = new URLSearchParams(window.location.search)
      const next = params.get('next') || '/lessons/week-1'
      const hasAuthCode = params.has('code')

      const { data, error: sessionError } = hasAuthCode
        ? await supabase.auth.exchangeCodeForSession(window.location.href)
        : await supabase.auth.getSession()

      if (sessionError) {
        setError(sessionError.message)
        setMessage('Could not finish Google login.')
        return
      }

      if (!data.session) {
        setError('No login session was returned. Please try Google login again.')
        setMessage('Could not finish Google login.')
        return
      }

      setMessage('Google login complete. Sending you to the course…')
      window.dispatchEvent(new Event('thai-culture-auth-change'))
      router.replace(next)
    }

    finishLogin()
  }, [router])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-jasmine px-4 py-16 text-tamarind">
        <section className="mx-auto max-w-xl rounded-[2rem] border border-tamarind/10 bg-surface p-6 text-center shadow-2xl shadow-tamarind/10 md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-temple">Google login</p>
          <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-balance">{message}</h1>
          {error ? <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p> : null}
          <Link href="/login" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-indigo px-6 py-3 font-black text-surface transition hover:bg-indigo-soft">
            Back to login
          </Link>
        </section>
      </main>
    </>
  )
}
