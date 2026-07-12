// Session queue builder shared by the tone drills. Seeds each session with SRS-due
// items first (overdue reviews, then a capped batch of never-seen items), then tops
// up with the remaining pool so drills actually resurface graded items instead of
// drawing purely at random.
import { getDueIds } from '@/lib/srs'
import type { ToneItem } from '@/data/tone-curriculum'

/** Session queue: due/new items from SRS first (shuffled), topped up with random others. */
export function buildSession(pool: ToneItem[], size: number): ToneItem[] {
  const byId = new Map(pool.map((i) => [i.id, i]))
  const due = getDueIds(pool.map((i) => i.id), size)
    .due.map((id) => byId.get(id))
    .filter((i): i is ToneItem => i !== undefined)
  const rest = pool.filter((i) => !due.some((d) => d.id === i.id))
  return [...shuffle(due), ...shuffle(rest)].slice(0, size)
}

function shuffle<T>(xs: T[]): T[] {
  const out = [...xs]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
