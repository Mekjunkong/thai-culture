'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { gradeCard } from '@/lib/srs'
import { buildSession } from '@/lib/toneSession'
import { maleVariant, TONE_CURRICULUM, TONE_LABELS, type ToneItem } from '@/data/tone-curriculum'
import { getContour } from '@/lib/toneContours'
import PitchCanvas from '@/components/tones/PitchCanvas'
import type { Tone } from '@/lib/pitch'

const SESSION_SIZE = 10

function shuffle<T>(xs: T[]): T[] {
  const out = [...xs]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const byId = new Map(TONE_CURRICULUM.map((i) => [i.id, i]))

export default function MinimalPairDrill() {
  const pool = useMemo(() => TONE_CURRICULUM.filter((i) => i.kind === 'minimal-pair'), [])
  const [queue, setQueue] = useState<ToneItem[]>(() => buildSession(pool, SESSION_SIZE))
  const [useMale, setUseMale] = useState(false)
  const [options, setOptions] = useState<ToneItem[]>([])
  const [answered, setAnswered] = useState<string | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [doneCount, setDoneCount] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const current = queue[0]

  function srcFor(item: ToneItem, male: boolean) {
    return male && item.kind === 'minimal-pair' ? maleVariant(item.audio) : item.audio
  }

  function play(src: string, then?: string) {
    const el = audioRef.current
    if (!el) return
    el.onended = then
      ? () => {
          el.onended = null
          el.src = then
          void el.play().catch(() => undefined)
        }
      : null
    el.src = src
    void el.play().catch(() => undefined)
  }

  useEffect(() => {
    if (!current) return
    const male = Math.random() < 0.5
    setUseMale(male)
    setOptions(shuffle([current, ...(current.pairWith ?? []).map((id) => byId.get(id)!).filter(Boolean)]))
    play(srcFor(current, male))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id])

  if (!current) {
    return (
      <div className="rounded-2xl border border-tamarind/10 bg-surface p-6 text-center">
        <p className="text-3xl">👂</p>
        <p className="mt-2 font-black text-tamarind">{correctCount} / {doneCount} first-try correct</p>
        <p className="mt-1 text-sm text-tamarind/60">Pairs you missed will resurface in your daily review.</p>
        <div className="mt-4 flex justify-center gap-3">
          <button type="button" onClick={() => { setQueue(buildSession(pool, SESSION_SIZE)); setCorrectCount(0); setDoneCount(0) }} className="min-h-11 rounded-2xl bg-indigo px-4 py-2 font-black text-surface">Practice again</button>
          <Link href="/tones" className="min-h-11 rounded-2xl border border-tamarind/15 px-4 py-2 font-black text-tamarind">Back</Link>
        </div>
      </div>
    )
  }

  function pick(option: ToneItem) {
    if (answered) return
    setAnswered(option.id)
    const correct = option.id === current.id
    gradeCard(current.id, correct ? 'good' : 'again')
    if (correct) setCorrectCount((n) => n + 1)
    else play(srcFor(current, useMale), srcFor(option, useMale))
  }

  function next() {
    setDoneCount((n) => n + 1)
    setQueue((q) => (answered === current.id ? q.slice(1) : [...q.slice(1), current]))
    setAnswered(null)
  }

  const contour = answered ? getContour(srcFor(current, useMale)) : null

  return (
    <div className="rounded-2xl border border-tamarind/10 bg-surface p-4 sm:p-6">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} className="hidden" />
      <p className="text-xs font-semibold uppercase tracking-wide text-tamarind/50">Question {doneCount + 1} · {correctCount} correct · {useMale ? 'male' : 'female'} voice</p>
      <div className="mt-3 flex items-center gap-3">
        <button type="button" onClick={() => play(srcFor(current, useMale))} className="min-h-12 rounded-2xl bg-indigo px-5 py-2 font-black text-surface">▶ Listen</button>
        <p className="text-sm text-tamarind/60">Which word did you hear?</p>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const isPicked = answered === option.id
          const isRight = answered && option.id === current.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => pick(option)}
              disabled={!!answered}
              className={`min-h-14 rounded-2xl border p-3 text-left transition ${
                isRight ? 'border-lime-600 bg-lime-50' : isPicked ? 'border-temple bg-temple/10' : 'border-tamarind/15 bg-jasmine'
              }`}
            >
              <span className="block font-black text-tamarind">{option.gloss}</span>
              <span className="block text-xs text-tamarind/60">{option.roman}</span>
            </button>
          )
        })}
      </div>
      {answered && (
        <div className="mt-4 space-y-3">
          <p className="font-black text-tamarind">
            {answered === current.id ? '✓ Correct — ' : '✗ It was '}
            <span className="text-2xl">{current.thai}</span>{' '}
            <span className="text-tamarind/60">{current.roman} · {current.gloss}{current.tone ? ` · ${TONE_LABELS[current.tone as Tone].label} tone` : ''}</span>
          </p>
          {contour && <PitchCanvas native={contour} />}
          <button type="button" onClick={next} className="min-h-11 w-full rounded-2xl bg-indigo font-black text-surface sm:w-auto sm:px-6">Next →</button>
        </div>
      )}
    </div>
  )
}
