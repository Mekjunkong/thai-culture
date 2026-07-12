import type { Metadata } from 'next'
import ToneLandingClient from '@/components/tones/ToneLandingClient'

export const metadata: Metadata = {
  title: 'Thai tone trainer — hear and speak the 5 tones | Thai Lessons Chiang Mai',
  description: 'Free Thai tone trainer: minimal-pair listening drills and pitch-curve feedback on your own voice. See your melody on top of a native speaker’s.',
}

export default function TonesPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-black text-tamarind">Tone trainer</h1>
      <p className="mt-1 text-sm text-tamarind/60">Thai has five tones — same syllable, five different words. Train your ear, then your voice.</p>
      <div className="mt-5">
        <ToneLandingClient />
      </div>
    </main>
  )
}
