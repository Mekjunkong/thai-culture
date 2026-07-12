import type { Metadata } from 'next'
import Link from 'next/link'
import MinimalPairDrill from '@/components/tones/MinimalPairDrill'

export const metadata: Metadata = {
  title: 'Level 2 · Train your ear | Thai Lessons Chiang Mai',
  description: 'One sound apart — did she say "throw" or "aunt"? Sharpen your ear on Thai minimal pairs.',
}

export default function ToneLevel2Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/tones" className="text-sm font-semibold text-indigo">← Tone trainer</Link>
      <h1 className="mt-2 text-2xl font-black text-tamarind">Level 2 · Train your ear</h1>
      <p className="mt-1 text-sm text-tamarind/60">Hear one word, pick its meaning. The options differ by a single tone, vowel length, or puff of air.</p>
      <div className="mt-5">
        <MinimalPairDrill />
      </div>
    </main>
  )
}
