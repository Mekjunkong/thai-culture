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
