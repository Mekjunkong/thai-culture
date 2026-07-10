// Client-side spaced repetition (SM-2 lite) for the Thai practice app. localStorage only, no backend.
'use client'

export type Grade = 'again' | 'hard' | 'good' | 'easy'

export interface CardState {
  reps: number // successful reviews in a row
  ease: number // ease factor, starts 2.5
  interval: number // days
  due: number // epoch ms
}

const SRS_KEY = 'thai-expat-srs-v1'
const DAY_MS = 24 * 60 * 60 * 1000
const MAX_INTERVAL_DAYS = 180

type SrsStore = Record<string, CardState>

/**
 * Local calendar date as YYYY-MM-DD. Using local getters (not toISOString, which is UTC)
 * so a learner's "day" flips at their own midnight, not UTC midnight — otherwise streaks
 * can break or award incorrectly for anyone outside UTC (e.g. Chiang Mai is UTC+7).
 */
export function localDateKey(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function localYesterdayKey(): string {
  return localDateKey(new Date(Date.now() - DAY_MS))
}

function loadStore(): SrsStore {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(window.localStorage.getItem(SRS_KEY) ?? '{}') as SrsStore
  } catch {
    return {}
  }
}

function saveStore(store: SrsStore) {
  window.localStorage.setItem(SRS_KEY, JSON.stringify(store))
}

/** Cards due now: overdue reviews first, then a capped number of never-seen cards. */
export function getDueIds(allIds: string[], maxNew = 10): { due: string[]; newCount: number; reviewCount: number } {
  const store = loadStore()
  const now = Date.now()
  const reviews = allIds.filter((id) => store[id] && store[id].due <= now)
  const fresh = allIds.filter((id) => !store[id]).slice(0, maxNew)
  return { due: [...reviews, ...fresh], newCount: fresh.length, reviewCount: reviews.length }
}

export function countDue(allIds: string[]): number {
  return getDueIds(allIds).due.length
}

export function gradeCard(id: string, grade: Grade) {
  const store = loadStore()
  const prev: CardState = store[id] ?? { reps: 0, ease: 2.5, interval: 0, due: 0 }
  let { reps, ease, interval } = prev

  if (grade === 'again') {
    reps = 0
    interval = 0
    ease = Math.max(1.3, ease - 0.2)
  } else {
    if (grade === 'hard') {
      ease = Math.max(1.3, ease - 0.15)
      interval = Math.max(1, interval * 1.2)
    } else if (grade === 'good') {
      interval = reps === 0 ? 1 : interval * ease
    } else {
      ease = ease + 0.15
      interval = reps === 0 ? 3 : interval * ease * 1.3
    }
    reps += 1
  }

  interval = Math.min(interval, MAX_INTERVAL_DAYS)
  const due = grade === 'again' ? Date.now() + 10 * 60 * 1000 : Date.now() + Math.round(interval * DAY_MS)
  store[id] = { reps, ease, interval, due }
  saveStore(store)
}

export function getLearnedCount(allIds: string[]): number {
  const store = loadStore()
  return allIds.filter((id) => store[id] && store[id].reps > 0).length
}
