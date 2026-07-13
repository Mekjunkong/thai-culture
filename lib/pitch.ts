// Pure pitch analysis shared by the browser (learner recordings) and the
// build-time generation script (native audio). No browser or Node APIs here.
import { PitchDetector } from 'pitchy'

const WINDOW = 2048
const HOP = 512
const MIN_HZ = 50
const MAX_HZ = 500
const MIN_CLARITY = 0.9
const MIN_AMPLITUDE = 0.01

/**
 * Pitch (Hz) per voiced frame. Silent or unclear frames are dropped so the
 * result is the contour of the voiced part only.
 */
export function detectPitch(samples: Float32Array, sampleRate: number): number[] {
  if (samples.length < WINDOW) return []
  const detector = PitchDetector.forFloat32Array(WINDOW)
  const out: number[] = []
  for (let start = 0; start + WINDOW <= samples.length; start += HOP) {
    const frame = samples.subarray(start, start + WINDOW)
    let peak = 0
    for (let i = 0; i < frame.length; i++) peak = Math.max(peak, Math.abs(frame[i]))
    if (peak < MIN_AMPLITUDE) continue
    const [hz, clarity] = detector.findPitch(frame, sampleRate)
    if (clarity >= MIN_CLARITY && hz >= MIN_HZ && hz <= MAX_HZ) out.push(hz)
  }
  return out
}

export const CONTOUR_POINTS = 32

export type Shape = 'rising' | 'falling' | 'flat' | 'dipping' | 'peaking'
export type Tone = 'mid' | 'low' | 'falling' | 'high' | 'rising'

/** Semitones relative to the speaker's median pitch, resampled to CONTOUR_POINTS. */
export function normalizeContour(hz: number[]): number[] {
  if (hz.length < 4) return []
  const sorted = [...hz].sort((a, b) => a - b)
  const median = sorted[Math.floor(sorted.length / 2)]
  const semis = hz.map((f) => 12 * Math.log2(f / median))
  const out: number[] = []
  for (let i = 0; i < CONTOUR_POINTS; i++) {
    const pos = (i / (CONTOUR_POINTS - 1)) * (semis.length - 1)
    const lo = Math.floor(pos)
    const hi = Math.min(lo + 1, semis.length - 1)
    out.push(semis[lo] + (semis[hi] - semis[lo]) * (pos - lo))
  }
  return out
}

const SHAPE_THRESHOLD = 1.5 // semitones

export function classifyShape(contour: number[]): Shape | null {
  if (contour.length < 6) return null
  const third = Math.floor(contour.length / 3)
  const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length
  const a = mean(contour.slice(0, third))
  const b = mean(contour.slice(third, 2 * third))
  const c = mean(contour.slice(2 * third))
  if (b > a + SHAPE_THRESHOLD && b > c + SHAPE_THRESHOLD) return 'peaking'
  if (b < a - SHAPE_THRESHOLD && b < c - SHAPE_THRESHOLD) return 'dipping'
  if (c - a >= SHAPE_THRESHOLD) return 'rising'
  if (a - c >= SHAPE_THRESHOLD) return 'falling'
  return 'flat'
}

const ACCEPTABLE: Record<Tone, Shape[]> = {
  mid: ['flat'],
  low: ['flat', 'falling'],
  falling: ['falling', 'peaking'],
  high: ['flat', 'rising'],
  rising: ['rising', 'dipping'],
}

const TARGET_DESCRIPTION: Record<Tone, string> = {
  mid: 'stays level all the way through',
  low: 'stays low and level, relaxing down at the end',
  falling: 'drops firmly at the end — like sighing "ahh"',
  high: 'sits high and strains slightly upward at the end',
  rising: 'dips first, then rises at the end — like asking "yes?"',
}

const OK_MESSAGE: Record<Tone, string> = {
  mid: 'Level ✓ — nice and steady.',
  low: 'Low and level ✓.',
  falling: 'Falling ✓ — good drop at the end.',
  high: 'High ✓ — good lift.',
  rising: 'Rising ✓ — great dip-and-rise.',
}

export function toneHint(tone: Tone, shape: Shape | null): { ok: boolean; message: string } {
  if (shape === null) {
    return { ok: false, message: "We couldn't hear a clear pitch — try again a little louder, in a quieter spot." }
  }
  if (ACCEPTABLE[tone].includes(shape)) return { ok: true, message: OK_MESSAGE[tone] }
  return { ok: false, message: `Your pitch was ${shape} — this tone ${TARGET_DESCRIPTION[tone]}. Listen once more and copy the melody.` }
}
