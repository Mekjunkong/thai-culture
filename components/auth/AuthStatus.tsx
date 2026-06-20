'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const localAccountKey = 'thai-culture-local-account'

export default function AuthStatus() {
  const [email, setEmail] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      const syncLocal = () => setEmail(window.localStorage.getItem(localAccountKey))
      syncLocal()
      setIsReady(true)
      window.addEventListener('thai-culture-auth-change', syncLocal)
      window.addEventListener('storage', syncLocal)
      return () => {
        window.removeEventListener('thai-culture-auth-change', syncLocal)
        window.removeEventListener('storage', syncLocal)
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null)
      setIsReady(true)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function signOut() {
    if (!isSupabaseConfigured || !supabase) {
      window.localStorage.removeItem(localAccountKey)
      setEmail(null)
      window.dispatchEvent(new Event('thai-culture-auth-change'))
      return
    }

    await supabase.auth.signOut()
    setEmail(null)
  }

  if (!isReady) {
    return <span className="text-tamarind/50">Account</span>
  }

  if (!email) {
    return (
      <Link href="/login" className="inline-flex min-h-11 items-center text-tamarind/68 transition hover:text-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric">
        Login
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="max-w-36 truncate text-tamarind/68" title={email}>
        {email}
      </span>
      <button
        type="button"
        onClick={signOut}
        className="rounded-xl border border-tamarind/10 px-3 py-2 font-bold text-tamarind/70 transition hover:border-temple hover:text-temple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
      >
        Sign out
      </button>
    </div>
  )
}
