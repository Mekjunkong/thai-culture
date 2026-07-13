import type { Metadata } from 'next'
import Link from 'next/link'
import ToneIdDrill from '@/components/tones/ToneIdDrill'

export const metadata: Metadata = {
  title: 'Level 1 · Meet the Thai tones | Thai Lessons Chiang Mai',
  description: 'Hear the five Thai tones on classic words like khaa and paa, and learn to tell them apart.',
}

export default function ToneLevel1Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/tones" className="text-sm font-semibold text-indigo">← Tone trainer</Link>
      <h1 className="mt-2 text-2xl font-black text-tamarind">Level 1 · Meet the tones</h1>
      <p className="mt-1 text-sm text-tamarind/60">Listen and pick which of the five tones you heard. Same syllable, five different words.</p>
      <div className="mt-5">
        <ToneIdDrill />
      </div>
    </main>
  )
}
