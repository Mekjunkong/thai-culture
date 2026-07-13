import type { Metadata } from 'next'
import Link from 'next/link'
import ProductionDrill from '@/components/tones/ProductionDrill'

export const metadata: Metadata = {
  title: 'Level 3 · Say it right | Thai Lessons Chiang Mai',
  description: 'Record yourself and see your pitch curve on top of the teacher\'s — real feedback on your Thai tones.',
}

export default function ToneLevel3Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/tones" className="text-sm font-semibold text-indigo">← Tone trainer</Link>
      <h1 className="mt-2 text-2xl font-black text-tamarind">Level 3 · Say it right</h1>
      <p className="mt-1 text-sm text-tamarind/60">Watch the teacher&apos;s melody draw as she speaks, then record yourself and match the shape. Your recording never leaves this device.</p>
      <div className="mt-5">
        <ProductionDrill />
      </div>
    </main>
  )
}
