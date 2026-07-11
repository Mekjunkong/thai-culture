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
