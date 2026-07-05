'use client'

import { FormEvent, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const localAccountKey = 'thai-culture-local-account'

type Mode = 'login' | 'signup'

export default function AuthForm() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setSignedInEmail(window.localStorage.getItem(localAccountKey))
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSignedInEmail(data.session?.user.email ?? null)
    })
  }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setMessage(null)

    if (!isSupabaseConfigured || !supabase) {
      window.localStorage.setItem(localAccountKey, email)
      setSignedInEmail(email)
      setMessage(mode === 'signup'
        ? 'Your account has been created on this device. Your progress will be saved here.'
        : 'You are logged in on this device. Your progress is saved here.'
      )
      window.dispatchEvent(new Event('thai-culture-auth-change'))
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setIsLoading(true)
    try {
      const result = mode === 'signup'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password })

      if (result.error) throw result.error

      const currentEmail = result.data.user?.email ?? email
      setSignedInEmail(currentEmail)
      setMessage(mode === 'signup'
        ? 'Account created. If email confirmation is needed, check your inbox before logging in.'
        : 'You are logged in. Welcome back to your course.'
      )
      window.dispatchEvent(new Event('thai-culture-auth-change'))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  async function signInWithGoogle() {
    setError(null)
    setMessage(null)

    if (!isSupabaseConfigured || !supabase) {
      setError('Google login requires an internet connection. You can still log in with email/password.')
      return
    }

    setIsLoading(true)
    const redirectTo = `${window.location.origin}/auth/callback?next=/lessons/week-1`
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    })

    if (oauthError) {
      setError(oauthError.message)
      setIsLoading(false)
    }
  }

  async function signOut() {
    if (!isSupabaseConfigured || !supabase) {
      window.localStorage.removeItem(localAccountKey)
      setSignedInEmail(null)
      setMessage('Signed out.')
      window.dispatchEvent(new Event('thai-culture-auth-change'))
      return
    }

    await supabase.auth.signOut()
    setSignedInEmail(null)
    setMessage('Signed out.')
    window.dispatchEvent(new Event('thai-culture-auth-change'))
  }

  return (
    <div className="rounded-[2rem] border border-tamarind/10 bg-surface p-6 shadow-2xl shadow-tamarind/10 md:p-8">
      <div className="flex rounded-2xl bg-jasmine p-1">
        {(['login', 'signup'] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setMode(item)
              setError(null)
              setMessage(null)
            }}
            className={`min-h-11 flex-1 rounded-xl px-4 py-2 text-sm font-black transition ${mode === item ? 'bg-indigo text-surface shadow-sm' : 'text-tamarind/62 hover:text-indigo'}`}
          >
            {item === 'login' ? 'Login' : 'Create account'}
          </button>
        ))}
      </div>

      {isSupabaseConfigured && supabase ? (
        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={isLoading}
          className="mt-6 flex min-h-12 w-full items-center justify-center gap-3 rounded-2xl border border-tamarind/12 bg-white px-5 py-3 font-black text-tamarind shadow-sm transition hover:-translate-y-0.5 hover:border-indigo hover:text-indigo disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface text-base" aria-hidden="true">G</span>
          Continue with Google
        </button>
      ) : null}

      <div className="my-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-tamarind/38">
        <span className="h-px flex-1 bg-tamarind/10" />
        <span>Email</span>
        <span className="h-px flex-1 bg-tamarind/10" />
      </div>

      {signedInEmail ? (
        <div className="mt-6 rounded-2xl border border-banana/20 bg-banana/8 p-4">
          <p className="font-bold text-tamarind">Signed in as</p>
          <p className="mt-1 break-all text-sm text-tamarind/70">{signedInEmail}</p>
          <button
            type="button"
            onClick={signOut}
            className="mt-4 rounded-xl border border-tamarind/10 px-4 py-2 text-sm font-bold text-tamarind transition hover:border-temple hover:text-temple"
          >
            Sign out
          </button>
        </div>
      ) : null}

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="text-sm font-bold text-tamarind">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-tamarind/12 bg-white px-4 py-3 text-tamarind outline-none transition focus:border-indigo focus:ring-4 focus:ring-indigo/10"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-bold text-tamarind">Password</label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-tamarind/12 bg-white px-4 py-3 text-tamarind outline-none transition focus:border-indigo focus:ring-4 focus:ring-indigo/10"
            placeholder="At least 6 characters"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-2xl bg-indigo px-5 py-3 font-black text-surface transition hover:-translate-y-0.5 hover:bg-indigo-soft disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turmeric"
        >
          {isLoading ? 'Please wait…' : mode === 'login' ? 'Login to course' : 'Create course account'}
        </button>
      </form>

      {message ? <p className="mt-4 rounded-2xl bg-banana/10 p-3 text-sm font-semibold text-banana">{message}</p> : null}
      {error ? <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}

      <p className="mt-5 text-sm leading-6 text-tamarind/60">
        Your course progress is saved on this device. Use the same browser when you return to keep your place.
      </p>
    </div>
  )
}
