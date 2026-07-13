import { describe, expect, it } from 'vitest'
import { detectPitch } from '@/lib/pitch'

/** Synthetic sine wave: `seconds` long at `hz`, optionally sweeping to `endHz`. */
export function sine(hz: number, seconds = 0.5, sampleRate = 48000, endHz?: number): Float32Array {
  const n = Math.floor(seconds * sampleRate)
  const out = new Float32Array(n)
  let phase = 0
  for (let i = 0; i < n; i++) {
    const f = endHz === undefined ? hz : hz + (endHz - hz) * (i / n)
    phase += (2 * Math.PI * f) / sampleRate
    out[i] = Math.sin(phase) * 0.8
  }
  return out
}

function median(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b)
  return s[Math.floor(s.length / 2)]
}

describe('detectPitch', () => {
  it('finds the frequency of a steady sine', () => {
    const hz = detectPitch(sine(220), 48000)
    expect(hz.length).toBeGreaterThan(5)
    expect(median(hz)).toBeGreaterThan(210)
    expect(median(hz)).toBeLessThan(230)
  })

  it('returns an empty array for silence', () => {
    expect(detectPitch(new Float32Array(48000), 48000)).toEqual([])
  })

  it('tracks a rising sweep', () => {
    const hz = detectPitch(sine(150, 0.6, 48000, 300), 48000)
    expect(hz[hz.length - 1]).toBeGreaterThan(hz[0] + 80)
  })
})

import { classifyShape, CONTOUR_POINTS, normalizeContour, toneHint } from '@/lib/pitch'

describe('normalizeContour', () => {
  it('resamples to CONTOUR_POINTS and centers on the median', () => {
    const c = normalizeContour([200, 200, 200, 200, 200, 200])
    expect(c).toHaveLength(CONTOUR_POINTS)
    expect(Math.max(...c.map(Math.abs))).toBeLessThan(0.01)
  })

  it('is invariant to octave shifts', () => {
    const low = normalizeContour([110, 115, 120, 130, 140, 150])
    const high = normalizeContour([220, 230, 240, 260, 280, 300])
    for (let i = 0; i < CONTOUR_POINTS; i++) expect(low[i]).toBeCloseTo(high[i], 1)
  })

  it('returns [] for too-short input', () => {
    expect(normalizeContour([200, 210])).toEqual([])
  })
})

describe('classifyShape', () => {
  const flat = normalizeContour(Array(20).fill(200))
  // Semitone math: 200→260 Hz ≈ +4.5 st; 200→150 ≈ -5 st — well past the 1.5 st threshold.
  const rising = normalizeContour(Array.from({ length: 20 }, (_, i) => 180 + i * 6))
  const falling = normalizeContour(Array.from({ length: 20 }, (_, i) => 300 - i * 7))
  const dip = normalizeContour(Array.from({ length: 20 }, (_, i) => 240 - Math.sin((i / 19) * Math.PI) * 70))
  const peak = normalizeContour(Array.from({ length: 20 }, (_, i) => 180 + Math.sin((i / 19) * Math.PI) * 70))

  it('classifies the five shapes', () => {
    expect(classifyShape(flat)).toBe('flat')
    expect(classifyShape(rising)).toBe('rising')
    expect(classifyShape(falling)).toBe('falling')
    expect(classifyShape(dip)).toBe('dipping')
    expect(classifyShape(peak)).toBe('peaking')
  })

  it('returns null for an empty contour', () => {
    expect(classifyShape([])).toBeNull()
  })
})

describe('toneHint', () => {
  it('accepts correct shapes', () => {
    expect(toneHint('rising', 'rising').ok).toBe(true)
    expect(toneHint('rising', 'dipping').ok).toBe(true)
    expect(toneHint('falling', 'peaking').ok).toBe(true)
    expect(toneHint('mid', 'flat').ok).toBe(true)
  })

  it('gives a gentle corrective message otherwise', () => {
    const hint = toneHint('rising', 'falling')
    expect(hint.ok).toBe(false)
    expect(hint.message).toMatch(/rise/i)
    expect(hint.message).not.toMatch(/wrong|fail|bad/i)
  })

  it('handles null shape (nothing detected)', () => {
    expect(toneHint('mid', null).ok).toBe(false)
  })
})
