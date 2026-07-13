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
      <main className="min-h-screen bg-paper px-4 py-16 text-tamarind">
        <section className="mx-auto max-w-xl rounded-none border border-tamarind/10 bg-surface p-6 text-center md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Google login</p>
          <h1 className="mt-4 font-serif text-3xl font-bold text-balance">{message}</h1>
          {error ? <p className="mt-4 rounded-none bg-clay/10 p-4 text-sm font-semibold text-clay">{error}</p> : null}
          <Link href="/login" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-none bg-ink px-6 py-3 font-bold text-surface transition hover:bg-ink/85">
            Back to login
          </Link>
        </section>
      </main>
    </>
  )
}
