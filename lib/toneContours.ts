import contours from '@/data/tone-contours.json'

const map = contours as Record<string, number[]>

/** Native pitch curve for an audio file, or null if we don't have one. */
export function getContour(audioPath: string): number[] | null {
  const c = map[audioPath]
  return c && c.length > 0 ? c : null
}
