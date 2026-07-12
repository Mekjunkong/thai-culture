'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { classifyShape, toneHint, type Tone } from '@/lib/pitch'
import { gradeCard } from '@/lib/srs'
import { buildSession } from '@/lib/toneSession'
import { TONE_CURRICULUM, type ToneItem } from '@/data/tone-curriculum'
import { getContour } from '@/lib/toneContours'
import { useToneRecorder } from '@/lib/useToneRecorder'
import PitchCanvas from '@/components/tones/PitchCanvas'

const SESSION_SIZE = 8
const WHATSAPP = 'https://wa.me/66929894495'

export default function ProductionDrill() {
  const pool = useMemo(() => TONE_CURRICULUM.filter((i) => i.kind === 'production'), [])
  const [queue, setQueue] = useState<ToneItem[]>(() => buildSession(pool, SESSION_SIZE))
  const [doneCount, setDoneCount] = useState(0)
  const [progress, setProgress] = useState(1)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const recorder = useToneRecorder()
  const current = queue[0]
  const native = current ? getContour(current.audio) : null

  function playTeacher() {
    const el = audioRef.current
    if (!el || !current) return
    el.src = current.audio
    setProgress(0)
    el.ontimeupdate = () => setProgress(el.duration ? el.currentTime / el.duration : 1)
    el.onended = () => setProgress(1)
    void el.play().catch(() => undefined)
  }

  useEffect(() => {
    recorder.reset()
    if (current) playTeacher()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id])

  if (!current) {
    return (
      <div className="rounded-2xl border border-tamarind/10 bg-surface p-6 text-center">
        <p className="text-3xl">🗣️</p>
        <p className="mt-2 font-black text-tamarind">{doneCount} phrases practiced</p>
        <p className="mt-1 text-sm text-tamarind/60">Send any recording to Mike for real human feedback.</p>
        <div className="mt-4 flex justify-center gap-3">
          <button type="button" onClick={() => { setQueue(buildSession(pool, SESSION_SIZE)); setDoneCount(0) }} className="min-h-11 rounded-2xl bg-indigo px-4 py-2 font-black text-surface">Practice again</button>
          <Link href="/tones" className="min-h-11 rounded-2xl border border-tamarind/15 px-4 py-2 font-black text-tamarind">Back</Link>
        </div>
      </div>
    )
  }

  const shape = recorder.result ? classifyShape(recorder.result.contour) : null
  const hint = recorder.result && current.tone ? toneHint(current.tone as Tone, shape) : null

  function next(grade: 'good' | 'again') {
    if (recorder.result || grade === 'again') gradeCard(current.id, grade)
    setDoneCount((n) => n + 1)
    setQueue((q) => q.slice(1))
  }

  const whatsappHref = `${WHATSAPP}?text=${encodeURIComponent(`Hi Mike! Can you check my tone on "${current.thai}" (${current.roman})?`)}`

  return (
    <div className="rounded-2xl border border-tamarind/10 bg-surface p-4 sm:p-6">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} className="hidden" />
      <p className="text-xs font-semibold uppercase tracking-wide text-tamarind/50">Phrase {doneCount + 1} of {SESSION_SIZE}</p>
      <p className="mt-2 text-3xl font-black text-tamarind">{current.thai}</p>
      <p className="text-sm text-tamarind/60">{current.roman} · {current.gloss}</p>

      {native && (
        <div className="mt-4">
          <PitchCanvas native={native} learner={recorder.result?.contour ?? null} progress={progress} />
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="button" onClick={playTeacher} className="min-h-11 rounded-2xl border border-indigo/30 bg-jasmine px-4 py-2 font-black text-indigo">▶ Teacher</button>
        {recorder.supported ? (
          <button
            type="button"
            onClick={recorder.toggle}
            className={`min-h-11 rounded-2xl px-4 py-2 font-black text-surface transition ${recorder.recording ? 'animate-pulse bg-temple' : 'bg-indigo'}`}
          >
            {recorder.recording ? '■ Stop' : recorder.result ? '🎙 Try again' : '🎙 Record yourself'}
          </button>
        ) : (
          <p className="text-xs text-tamarind/60">Enable your microphone to practice speaking — you can still listen and repeat.</p>
        )}
        {recorder.result && (
          <audio controls src={recorder.result.url} className="h-9 min-w-0 flex-1" />
        )}
      </div>

      {recorder.error && <p className="mt-2 text-xs text-temple">{recorder.error}</p>}

      {recorder.result && (
        <div className="mt-3 rounded-xl bg-jasmine p-3">
          <p className={`text-sm font-bold ${hint?.ok ? 'text-lime-700' : 'text-tamarind'}`}>
            {hint ? hint.message : 'Compare the shape of your melody with the teacher\'s — aim for the same rises and falls.'}
          </p>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-bold text-indigo underline">
            Not sure? Ask Mike on WhatsApp →
          </a>
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button type="button" onClick={() => next('good')} className="min-h-11 flex-1 rounded-2xl bg-indigo font-black text-surface sm:flex-none sm:px-6">Next →</button>
        <button type="button" onClick={() => next('again')} className="text-xs font-semibold text-tamarind/60 underline">Mark for more practice</button>
      </div>
    </div>
  )
}
