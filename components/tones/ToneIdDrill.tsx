'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import type { Tone } from '@/lib/pitch'
import { gradeCard } from '@/lib/srs'
import { TONE_CURRICULUM, TONE_LABELS, type ToneItem } from '@/data/tone-curriculum'
import { getContour } from '@/lib/toneContours'
import PitchCanvas from '@/components/tones/PitchCanvas'

const TONES: Tone[] = ['mid', 'low', 'falling', 'high', 'rising']
const SESSION_SIZE = 10

function shuffle<T>(xs: T[]): T[] {
  const out = [...xs]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export default function ToneIdDrill() {
  const pool = useMemo(() => TONE_CURRICULUM.filter((i) => i.kind === 'tone-id'), [])
  const [queue, setQueue] = useState<ToneItem[]>(() => shuffle(pool).slice(0, SESSION_SIZE))
  const [answered, setAnswered] = useState<Tone | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [doneCount, setDoneCount] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const current = queue[0]

  function play(src: string) {
    if (!audioRef.current) return
    audioRef.current.onended = null
    audioRef.current.src = src
    void audioRef.current.play().catch(() => undefined)
  }

  useEffect(() => {
    if (current) play(current.audio)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id])

  if (!current) {
    return (
      <div className="rounded-2xl border border-tamarind/10 bg-surface p-6 text-center">
        <p className="text-3xl">🎉</p>
        <p className="mt-2 font-black text-tamarind">{correctCount} / {doneCount} first-try correct</p>
        <p className="mt-1 text-sm text-tamarind/60">Tones you missed will come back in your daily review.</p>
        <div className="mt-4 flex justify-center gap-3">
          <button type="button" onClick={() => { setQueue(shuffle(pool).slice(0, SESSION_SIZE)); setCorrectCount(0); setDoneCount(0) }} className="min-h-11 rounded-2xl bg-indigo px-4 py-2 font-black text-surface">Practice again</button>
          <Link href="/tones" className="min-h-11 rounded-2xl border border-tamarind/15 px-4 py-2 font-black text-tamarind">Back</Link>
        </div>
      </div>
    )
  }

  function pick(tone: Tone) {
    if (answered) return
    setAnswered(tone)
    const correct = tone === current.tone
    gradeCard(current.id, correct ? 'good' : 'again')
    if (correct) setCorrectCount((n) => n + 1)
    if (!correct) {
      // Contrast: replay the right answer, then the tone they picked from the same set when available.
      const setPrefix = current.id.split('-')[0]
      const picked = TONE_CURRICULUM.find((i) => i.kind === 'tone-id' && i.id.startsWith(`${setPrefix}-`) && i.tone === tone)
      play(current.audio)
      if (picked && audioRef.current) {
        audioRef.current.onended = () => {
          play(picked.audio)
          if (audioRef.current) audioRef.current.onended = null
        }
      }
    }
  }

  function next() {
    setDoneCount((n) => n + 1)
    setQueue((q) => (answered === current.tone ? q.slice(1) : [...q.slice(1), current]))
    setAnswered(null)
  }

  const contour = answered ? getContour(current.audio) : null

  return (
    <div className="rounded-2xl border border-tamarind/10 bg-surface p-4 sm:p-6">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} className="hidden" />
      <p className="text-xs font-semibold uppercase tracking-wide text-tamarind/50">Question {doneCount + 1} · {correctCount} correct</p>
      <div className="mt-3 flex items-center gap-3">
        <button type="button" onClick={() => play(current.audio)} className="min-h-12 rounded-2xl bg-indigo px-5 py-2 font-black text-surface">▶ Listen</button>
        <p className="text-sm text-tamarind/60">Which tone did you hear?</p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-5">
        {TONES.map((tone) => {
          const meta = TONE_LABELS[tone]
          const isPicked = answered === tone
          const isRight = answered && tone === current.tone
          return (
            <button
              key={tone}
              type="button"
              onClick={() => pick(tone)}
              disabled={!!answered}
              className={`min-h-14 rounded-2xl border p-2 text-left transition ${
                isRight ? 'border-lime-600 bg-lime-50' : isPicked ? 'border-temple bg-temple/10' : 'border-tamarind/15 bg-jasmine'
              }`}
            >
              <span className="block font-black text-tamarind">{meta.glyph} {meta.label}</span>
              <span className="block text-[11px] leading-tight text-tamarind/60">{meta.hook}</span>
            </button>
          )
        })}
      </div>
      {answered && (
        <div className="mt-4 space-y-3">
          <p className="font-black text-tamarind">
            {answered === current.tone ? '✓ Correct — ' : '✗ It was '}
            <span className="text-2xl">{current.thai}</span> <span className="text-tamarind/60">{current.roman} · {current.gloss} · {TONE_LABELS[current.tone as Tone].label} tone</span>
          </p>
          {contour && <PitchCanvas native={contour} />}
          <button type="button" onClick={next} className="min-h-11 w-full rounded-2xl bg-indigo font-black text-surface sm:w-auto sm:px-6">Next →</button>
        </div>
      )}
    </div>
  )
}
