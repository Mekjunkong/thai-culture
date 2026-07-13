'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { getLearnedCount } from '@/lib/srs'
import { TONE_CURRICULUM, TONE_LABELS } from '@/data/tone-curriculum'
import { getContour } from '@/lib/toneContours'
import PitchCanvas from '@/components/tones/PitchCanvas'
import type { Tone } from '@/lib/pitch'

const HERO_IDS = ['khaa-mid', 'khaa-low', 'khaa-falling', 'khaa-high', 'khaa-rising']

const LEVELS = [
  { n: 1, href: '/tones/level-1', title: 'Meet the tones', blurb: 'Hear the five tones and learn to tell them apart.' },
  { n: 2, href: '/tones/level-2', title: 'Train your ear', blurb: 'Minimal pairs — one sound apart, totally different meaning.' },
  { n: 3, href: '/tones/level-3', title: 'Say it right', blurb: 'Record yourself and match the teacher’s pitch curve.' },
] as const

export default function ToneLandingClient() {
  const heroItems = HERO_IDS.map((id) => TONE_CURRICULUM.find((i) => i.id === id)!).filter(Boolean)
  const [active, setActive] = useState(heroItems[0])
  const [progress, setProgress] = useState<Record<number, { learned: number; total: number }>>({})
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const next: Record<number, { learned: number; total: number }> = {}
    for (const level of [1, 2, 3]) {
      const ids = TONE_CURRICULUM.filter((i) => i.level === level).map((i) => i.id)
      next[level] = { learned: getLearnedCount(ids), total: ids.length }
    }
    setProgress(next)
  }, [])

  function playHero(id: string) {
    const item = heroItems.find((i) => i.id === id)
    if (!item || !audioRef.current) return
    setActive(item)
    audioRef.current.src = item.audio
    void audioRef.current.play().catch(() => undefined)
  }

  const contour = active ? getContour(active.audio) : null

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} className="hidden" />
      <section className="rounded-2xl border border-tamarind/10 bg-jasmine p-4 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-tamarind/50">Same syllable · five meanings</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {heroItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => playHero(item.id)}
              className={`min-h-11 rounded-2xl border px-3 py-1.5 text-center transition ${active?.id === item.id ? 'border-indigo bg-indigo text-surface' : 'border-tamarind/15 bg-surface text-tamarind'}`}
            >
              <span className="block text-xl font-black">{item.thai}</span>
              <span className={`block text-[11px] ${active?.id === item.id ? 'text-surface/80' : 'text-tamarind/60'}`}>{item.gloss}</span>
            </button>
          ))}
        </div>
        {active && (
          <div className="mt-3">
            <p className="mb-2 text-sm text-tamarind/70">
              <strong>{active.roman}</strong> · {TONE_LABELS[active.tone as Tone].label} tone — {TONE_LABELS[active.tone as Tone].hook}
            </p>
            {contour && <PitchCanvas native={contour} />}
          </div>
        )}
      </section>

      <section className="mt-6 grid gap-3">
        {LEVELS.map((level) => (
          <Link key={level.n} href={level.href} className="flex items-center justify-between rounded-2xl border border-tamarind/10 bg-surface p-4 transition hover:border-indigo/40">
            <div>
              <p className="font-black text-tamarind">Level {level.n} · {level.title}</p>
              <p className="text-sm text-tamarind/60">{level.blurb}</p>
            </div>
            <div className="text-right">
              {progress[level.n] && <p className="text-xs font-bold text-indigo">{progress[level.n].learned}/{progress[level.n].total}</p>}
              <p className="font-black text-indigo">→</p>
            </div>
          </Link>
        ))}
      </section>

      <p className="mt-6 text-xs text-tamarind/50">
        🎙 Recordings stay on your device — nothing is uploaded. Want human feedback?{' '}
        <a href="https://wa.me/66929894495" target="_blank" rel="noopener noreferrer" className="font-bold text-indigo underline">Message Mike on WhatsApp</a>.
      </p>
    </div>
  )
}
