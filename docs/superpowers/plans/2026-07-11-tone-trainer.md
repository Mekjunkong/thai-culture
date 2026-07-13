# Tone Trainer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A three-level Thai tone trainer at `/tones` — perception drills plus pitch-curve feedback on the learner's own recordings — with all analysis client-side and all native audio generated at build time.

**Architecture:** Curriculum is a typed data file; a build-time script calls Azure neural TTS to produce MP3s and extracts each file's pitch contour into JSON. In the browser, `lib/pitch.ts` (pure functions) analyzes the learner's recording and a canvas overlays their curve on the native one with a gentle shape hint. Progress uses the existing SM-2 store in `lib/srs.ts`.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Tailwind (site tokens: `tamarind`, `jasmine`, `indigo`, `temple`, `surface`), `pitchy` (McLeod pitch detection), `mpg123-decoder` (WASM MP3 decode in Node), `tsx` (script runner), Vitest (new).

Spec: `docs/superpowers/specs/2026-07-11-tone-trainer-design.md`

## Global Constraints

- Import alias is `@/*` → repo root (see `tsconfig.json`).
- All browser audio/mic code lives in `'use client'` components/hooks with runtime guards; nothing touches `window` at module top level.
- Learner audio never leaves the device. No new API routes, no runtime TTS.
- `lib/pitch.ts` must stay free of browser and Node APIs (pure functions on `Float32Array`/`number[]`) — it runs in both the browser and the generation script.
- Feedback is a visual overlay + gentle hint. Never a numeric score, never "fail".
- UI copy in English; Thai text in Thai script + romanization (Paiboon-style with tone diacritics, matching existing site copy like `bpâa`).
- Existing SRS API (`lib/srs.ts`) is used as-is: `gradeCard(id, grade)`, `getDueIds`, `getLearnedCount`, `countDue`. Do not modify it.
- WhatsApp deep link: `https://wa.me/66929894495` (used by existing missions).
- Styling follows existing conventions: `rounded-2xl`, `min-h-11` tap targets, `font-black` headings, mobile-first.
- `AZURE_SPEECH_KEY` / `AZURE_SPEECH_REGION` come from env (`.env.local`), never committed.
- Generated MP3s (`public/audio/tones/`), `data/tone-contours.json`, and `data/tone-audio-manifest.json` ARE committed.
- No `console.log` in app code (script may use `console.log` for progress output).
- Verification gate for UI tasks: `npm run build` and `npm run lint` pass.

---

### Task 1: Vitest setup + pitch detection (`detectPitch`)

**Files:**
- Modify: `package.json` (deps + `test` script)
- Create: `vitest.config.ts`
- Create: `lib/pitch.ts`
- Test: `tests/pitch.test.ts`

**Interfaces:**
- Produces: `detectPitch(samples: Float32Array, sampleRate: number): number[]` — Hz values for voiced frames only (unvoiced/silent frames dropped). Also exports `type Shape` and `type Tone` placeholders for Task 2? No — Task 2 adds them. Task 1 exports only `detectPitch`.

- [ ] **Step 1: Install dependencies**

```bash
npm install pitchy && npm install -D vitest tsx mpg123-decoder
```

- [ ] **Step 2: Add test script and vitest config**

In `package.json` scripts, add:

```json
"test": "vitest run"
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
  resolve: {
    alias: { '@': path.resolve(__dirname) },
  },
})
```

- [ ] **Step 3: Write the failing test**

Create `tests/pitch.test.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/lib/pitch`.

- [ ] **Step 5: Implement `detectPitch`**

Create `lib/pitch.ts`:

```ts
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
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test`
Expected: PASS (3 tests).

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts lib/pitch.ts tests/pitch.test.ts
git commit -m "feat: add vitest and client-side pitch detection"
```

---

### Task 2: Contour normalization, shape classification, hints

**Files:**
- Modify: `lib/pitch.ts`
- Test: `tests/pitch.test.ts` (append)

**Interfaces:**
- Consumes: `detectPitch` from Task 1.
- Produces (all from `@/lib/pitch`):
  - `CONTOUR_POINTS = 32`
  - `type Shape = 'rising' | 'falling' | 'flat' | 'dipping' | 'peaking'`
  - `type Tone = 'mid' | 'low' | 'falling' | 'high' | 'rising'`
  - `normalizeContour(hz: number[]): number[]` — 32 samples, semitones relative to the median; `[]` if fewer than 4 input frames.
  - `classifyShape(contour: number[]): Shape | null` — null for empty/short contours.
  - `toneHint(tone: Tone, shape: Shape | null): { ok: boolean; message: string }`

**Design note (from spec):** normalization is relative to the speaker's own median pitch of that one word, so absolute register (mid vs low vs high level tones) is invisible — only *shape* is judged. Acceptable shapes per tone reflect real Thai contours: falling tone rises briefly then falls (`falling` or `peaking`); rising tone dips then rises (`rising` or `dipping`); mid/low/high are level-ish (`flat`, low also tolerates `falling`, high also tolerates `rising`).

- [ ] **Step 1: Write the failing tests**

Append to `tests/pitch.test.ts`:

```ts
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
```

- [ ] **Step 2: Run tests to verify the new ones fail**

Run: `npm test`
Expected: FAIL — `normalizeContour` etc. not exported.

- [ ] **Step 3: Implement**

Append to `lib/pitch.ts`:

```ts
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (all tests).

- [ ] **Step 5: Commit**

```bash
git add lib/pitch.ts tests/pitch.test.ts
git commit -m "feat: contour normalization, shape classification, and tone hints"
```

---

### Task 3: Curriculum data + validation test

**Files:**
- Create: `data/tone-curriculum.ts`
- Test: `tests/curriculum.test.ts`

**Interfaces:**
- Consumes: `type Tone` from `@/lib/pitch`.
- Produces (from `@/data/tone-curriculum`):
  - `interface ToneItem { id: string; kind: 'tone-id' | 'minimal-pair' | 'production'; thai: string; roman: string; gloss: string; tone?: Tone; audio: string; pairWith?: string[]; level: 1 | 2 | 3 }`
  - `export const TONE_CURRICULUM: ToneItem[]` (~104 items)
  - `export const TONE_LABELS: Record<Tone, { label: string; glyph: string; hook: string }>`
  - `maleVariant(audio: string): string` — `/audio/tones/x.mp3` → `/audio/tones/x-m.mp3`
- `tone` is required for `tone-id` and `minimal-pair`, optional for `production` (phrases span many tones).
- Audio path convention: `/audio/tones/<id>.mp3`; minimal-pair items additionally get `<id>-m.mp3` (male voice).

- [ ] **Step 1: Write the failing validation test**

Create `tests/curriculum.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { maleVariant, TONE_CURRICULUM } from '@/data/tone-curriculum'

describe('tone curriculum', () => {
  it('has 100+ items with unique ids', () => {
    expect(TONE_CURRICULUM.length).toBeGreaterThanOrEqual(100)
    const ids = TONE_CURRICULUM.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every pairWith id resolves to a real item', () => {
    const ids = new Set(TONE_CURRICULUM.map((i) => i.id))
    for (const item of TONE_CURRICULUM) {
      for (const ref of item.pairWith ?? []) {
        expect(ids.has(ref), `${item.id} → ${ref}`).toBe(true)
      }
    }
  })

  it('tone-id and minimal-pair items always carry a tone; minimal-pair carries pairWith', () => {
    for (const item of TONE_CURRICULUM) {
      if (item.kind !== 'production') expect(item.tone, item.id).toBeDefined()
      if (item.kind === 'minimal-pair') expect(item.pairWith?.length, item.id).toBeGreaterThan(0)
    }
  })

  it('audio paths follow the /audio/tones/<id>.mp3 convention', () => {
    for (const item of TONE_CURRICULUM) {
      expect(item.audio, item.id).toBe(`/audio/tones/${item.id}.mp3`)
    }
    expect(maleVariant('/audio/tones/x.mp3')).toBe('/audio/tones/x-m.mp3')
  })

  it('each level has content', () => {
    for (const level of [1, 2, 3] as const) {
      expect(TONE_CURRICULUM.filter((i) => i.level === level).length).toBeGreaterThan(10)
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — module not found.

- [ ] **Step 3: Create the curriculum**

Create `data/tone-curriculum.ts`. A helper keeps rows compact; `audio` is derived from `id`:

```ts
import type { Tone } from '@/lib/pitch'

export interface ToneItem {
  id: string
  kind: 'tone-id' | 'minimal-pair' | 'production'
  thai: string
  roman: string
  gloss: string
  tone?: Tone
  audio: string
  pairWith?: string[]
  level: 1 | 2 | 3
}

export const TONE_LABELS: Record<Tone, { label: string; glyph: string; hook: string }> = {
  mid: { label: 'Mid', glyph: '→', hook: 'Flat and steady, like counting "one, two, three".' },
  low: { label: 'Low', glyph: '↘', hook: 'Starts low and relaxes down — a flat "meh".' },
  falling: { label: 'Falling', glyph: '⌢', hook: 'Up then firmly down — like a satisfied "ahh".' },
  high: { label: 'High', glyph: '↗', hook: 'Squeezed high, straining upward at the end.' },
  rising: { label: 'Rising', glyph: '⌣', hook: 'Dips then rises — like asking "yes?".' },
}

export function maleVariant(audio: string): string {
  return audio.replace(/\.mp3$/, '-m.mp3')
}

type Row = [id: string, kind: ToneItem['kind'], thai: string, roman: string, gloss: string, level: 1 | 2 | 3, tone?: Tone, pairWith?: string[]]

function items(rows: Row[]): ToneItem[] {
  return rows.map(([id, kind, thai, roman, gloss, level, tone, pairWith]) => ({
    id, kind, thai, roman, gloss, level, tone, pairWith, audio: `/audio/tones/${id}.mp3`,
  }))
}

export const TONE_CURRICULUM: ToneItem[] = items([
  // ── Level 1: Meet the tones (tone-id) ────────────────────────────────
  // khaa set — the classic five-way contrast
  ['khaa-mid', 'tone-id', 'คา', 'khaa', 'to be stuck', 1, 'mid'],
  ['khaa-low', 'tone-id', 'ข่า', 'khàa', 'galangal', 1, 'low'],
  ['khaa-falling', 'tone-id', 'ค่า', 'khâa', 'value, fee', 1, 'falling'],
  ['khaa-high', 'tone-id', 'ค้า', 'kháa', 'to trade', 1, 'high'],
  ['khaa-rising', 'tone-id', 'ขา', 'khăa', 'leg', 1, 'rising'],
  // bpaa set
  ['bpaa-mid', 'tone-id', 'ปา', 'bpaa', 'to throw', 1, 'mid'],
  ['bpaa-low', 'tone-id', 'ป่า', 'bpàa', 'forest', 1, 'low'],
  ['bpaa-falling', 'tone-id', 'ป้า', 'bpâa', 'aunt', 1, 'falling'],
  ['bpaa-high', 'tone-id', 'ป๊า', 'bpáa', 'dad (informal)', 1, 'high'],
  ['bpaa-rising', 'tone-id', 'ป๋า', 'bpăa', 'daddy (informal)', 1, 'rising'],
  // mai set
  ['mai-mid', 'tone-id', 'ไมล์', 'mai', 'mile', 1, 'mid'],
  ['mai-low', 'tone-id', 'ใหม่', 'mài', 'new', 1, 'low'],
  ['mai-falling', 'tone-id', 'ไม่', 'mâi', 'not, no', 1, 'falling'],
  ['mai-high', 'tone-id', 'ไม้', 'mái', 'wood', 1, 'high'],
  ['mai-rising', 'tone-id', 'ไหม', 'măi', 'question word', 1, 'rising'],
  // maa set (three-way)
  ['maa-mid', 'tone-id', 'มา', 'maa', 'to come', 1, 'mid'],
  ['maa-high', 'tone-id', 'ม้า', 'máa', 'horse', 1, 'high'],
  ['maa-rising', 'tone-id', 'หมา', 'măa', 'dog', 1, 'rising'],
  // suea set
  ['suea-rising', 'tone-id', 'เสือ', 'sŭea', 'tiger', 1, 'rising'],
  ['suea-low', 'tone-id', 'เสื่อ', 'sùea', 'mat', 1, 'low'],
  ['suea-falling', 'tone-id', 'เสื้อ', 'sûea', 'shirt', 1, 'falling'],
  // khao set
  ['khao-rising', 'tone-id', 'ขาว', 'khăao', 'white', 1, 'rising'],
  ['khao-low', 'tone-id', 'ข่าว', 'khàao', 'news', 1, 'low'],
  ['khao-falling', 'tone-id', 'ข้าว', 'khâao', 'rice', 1, 'falling'],
  // naa set
  ['naa-mid', 'tone-id', 'นา', 'naa', 'rice field', 1, 'mid'],
  ['naa-high', 'tone-id', 'น้า', 'náa', 'aunt/uncle (younger)', 1, 'high'],
  ['naa-falling', 'tone-id', 'หน้า', 'nâa', 'face, front', 1, 'falling'],
  // yaa set
  ['yaa-mid', 'tone-id', 'ยา', 'yaa', 'medicine', 1, 'mid'],
  ['yaa-low', 'tone-id', 'อย่า', 'yàa', "don't", 1, 'low'],
  ['yaa-falling', 'tone-id', 'ย่า', 'yâa', 'grandma (paternal)', 1, 'falling'],
  ['yaa-grass', 'tone-id', 'หญ้า', 'yâa', 'grass', 1, 'falling'],

  // ── Level 2: Train your ear (minimal pairs) ──────────────────────────
  // Tone pairs (reference level-1 items as confusables)
  ['mp-glai-near', 'minimal-pair', 'ใกล้', 'glâi', 'near', 2, 'falling', ['mp-glai-far']],
  ['mp-glai-far', 'minimal-pair', 'ไกล', 'glai', 'far', 2, 'mid', ['mp-glai-near']],
  ['mp-paa-forest', 'minimal-pair', 'ป่า', 'bpàa', 'forest', 2, 'low', ['mp-paa-aunt', 'bpaa-mid']],
  ['mp-paa-aunt', 'minimal-pair', 'ป้า', 'bpâa', 'aunt', 2, 'falling', ['mp-paa-forest', 'bpaa-mid']],
  ['mp-khao-white', 'minimal-pair', 'ขาว', 'khăao', 'white', 2, 'rising', ['mp-khao-news', 'mp-khao-rice']],
  ['mp-khao-news', 'minimal-pair', 'ข่าว', 'khàao', 'news', 2, 'low', ['mp-khao-white', 'mp-khao-rice']],
  ['mp-khao-rice', 'minimal-pair', 'ข้าว', 'khâao', 'rice', 2, 'falling', ['mp-khao-white', 'mp-khao-news']],
  ['mp-mai-not', 'minimal-pair', 'ไม่', 'mâi', 'not, no', 2, 'falling', ['mp-mai-wood', 'mai-rising']],
  ['mp-mai-wood', 'minimal-pair', 'ไม้', 'mái', 'wood', 2, 'high', ['mp-mai-not', 'mai-rising']],
  ['mp-maa-dog', 'minimal-pair', 'หมา', 'măa', 'dog', 2, 'rising', ['mp-maa-horse', 'maa-mid']],
  ['mp-maa-horse', 'minimal-pair', 'ม้า', 'máa', 'horse', 2, 'high', ['mp-maa-dog', 'maa-mid']],
  ['mp-suea-tiger', 'minimal-pair', 'เสือ', 'sŭea', 'tiger', 2, 'rising', ['mp-suea-shirt', 'suea-low']],
  ['mp-suea-shirt', 'minimal-pair', 'เสื้อ', 'sûea', 'shirt', 2, 'falling', ['mp-suea-tiger', 'suea-low']],
  ['mp-khaa-value', 'minimal-pair', 'ค่า', 'khâa', 'value, fee', 2, 'falling', ['mp-khaa-trade', 'khaa-rising']],
  ['mp-khaa-trade', 'minimal-pair', 'ค้า', 'kháa', 'to trade', 2, 'high', ['mp-khaa-value', 'khaa-rising']],
  ['mp-khao-he', 'minimal-pair', 'เขา', 'khăo', 'he, she', 2, 'rising', ['mp-khao-knee', 'mp-khao-enter']],
  ['mp-khao-knee', 'minimal-pair', 'เข่า', 'khào', 'knee', 2, 'low', ['mp-khao-he', 'mp-khao-enter']],
  // Vowel-length pairs
  ['mp-khao-enter', 'minimal-pair', 'เข้า', 'khâo', 'to enter (short vowel)', 2, 'falling', ['mp-khao-rice']],
  ['mp-gao-nine', 'minimal-pair', 'เก้า', 'gâo', 'nine (short vowel)', 2, 'falling', ['mp-gao-step']],
  ['mp-gao-step', 'minimal-pair', 'ก้าว', 'gâao', 'step (long vowel)', 2, 'falling', ['mp-gao-nine']],
  ['mp-gao-old', 'minimal-pair', 'เก่า', 'gào', 'old', 2, 'low', ['mp-gao-nine', 'mp-gao-scratch']],
  ['mp-gao-scratch', 'minimal-pair', 'เกา', 'gao', 'to scratch', 2, 'mid', ['mp-gao-old', 'mp-gao-nine']],
  ['mp-wan-day', 'minimal-pair', 'วัน', 'wan', 'day (short vowel)', 2, 'mid', ['mp-waan-sweet']],
  ['mp-waan-sweet', 'minimal-pair', 'หวาน', 'wăan', 'sweet (long vowel)', 2, 'rising', ['mp-wan-day']],
  // Aspiration / consonant pairs
  ['mp-bpaa-throw', 'minimal-pair', 'ปา', 'bpaa', 'to throw (unaspirated)', 2, 'mid', ['mp-phaa-take']],
  ['mp-phaa-take', 'minimal-pair', 'พา', 'phaa', 'to take someone (aspirated)', 2, 'mid', ['mp-bpaa-throw']],
  ['mp-dtaa-eye', 'minimal-pair', 'ตา', 'dtaa', 'eye (unaspirated)', 2, 'mid', ['mp-thaa-apply']],
  ['mp-thaa-apply', 'minimal-pair', 'ทา', 'thaa', 'to apply (aspirated)', 2, 'mid', ['mp-dtaa-eye']],
  ['mp-gai-chicken', 'minimal-pair', 'ไก่', 'gài', 'chicken (unaspirated)', 2, 'low', ['mp-khai-egg']],
  ['mp-khai-egg', 'minimal-pair', 'ไข่', 'khài', 'egg (aspirated)', 2, 'low', ['mp-gai-chicken']],
  ['mp-baa-crazy', 'minimal-pair', 'บ้า', 'bâa', 'crazy (b sound)', 2, 'falling', ['mp-bpaa-aunt2']],
  ['mp-bpaa-aunt2', 'minimal-pair', 'ป้า', 'bpâa', 'aunt (bp sound)', 2, 'falling', ['mp-baa-crazy']],
  ['mp-bpuu-crab', 'minimal-pair', 'ปู', 'bpuu', 'crab', 2, 'mid', ['mp-bpuu-grandpa']],
  ['mp-bpuu-grandpa', 'minimal-pair', 'ปู่', 'bpùu', 'grandpa (paternal)', 2, 'low', ['mp-bpuu-crab']],

  // ── Level 3: Say it right (production) ───────────────────────────────
  // Single words with clear tones first (hints available)…
  ['num-1', 'production', 'หนึ่ง', 'nùeng', 'one', 3, 'low'],
  ['num-2', 'production', 'สอง', 'sŏong', 'two', 3, 'rising'],
  ['num-3', 'production', 'สาม', 'săam', 'three', 3, 'rising'],
  ['num-4', 'production', 'สี่', 'sìi', 'four', 3, 'low'],
  ['num-5', 'production', 'ห้า', 'hâa', 'five', 3, 'falling'],
  ['num-6', 'production', 'หก', 'hòk', 'six', 3, 'low'],
  ['num-7', 'production', 'เจ็ด', 'jèt', 'seven', 3, 'low'],
  ['num-8', 'production', 'แปด', 'bpàet', 'eight', 3, 'low'],
  ['num-9', 'production', 'เก้า', 'gâo', 'nine', 3, 'falling'],
  ['num-10', 'production', 'สิบ', 'sìp', 'ten', 3, 'low'],
  ['num-20', 'production', 'ยี่สิบ', 'yîi-sìp', 'twenty', 3],
  ['num-100', 'production', 'ร้อย', 'rói', 'hundred', 3, 'high'],
  ['word-dai', 'production', 'ได้', 'dâi', 'can, okay', 3, 'falling'],
  ['word-mai-dai', 'production', 'ไม่ได้', 'mâi dâi', 'cannot', 3],
  ['word-mii-mai', 'production', 'มีไหม', 'mii măi', 'do you have…?', 3],
  ['word-mai-mii', 'production', 'ไม่มี', 'mâi mii', "there isn't / don't have", 3],
  ['word-mai-ruu', 'production', 'ไม่รู้', 'mâi rúu', "I don't know", 3],
  ['word-dii-maak', 'production', 'ดีมาก', 'dii mâak', 'very good', 3],
  // …then phrases from the four missions and daily life (overlay only, no shape hint)
  ['ph-sawatdee-krap', 'production', 'สวัสดีครับ', 'sà-wàt-dii khráp', 'hello (male speaker)', 3],
  ['ph-sawatdee-ka', 'production', 'สวัสดีค่ะ', 'sà-wàt-dii khâ', 'hello (female speaker)', 3],
  ['ph-khopkhun-krap', 'production', 'ขอบคุณครับ', 'khàawp-khun khráp', 'thank you (male)', 3],
  ['ph-khopkhun-ka', 'production', 'ขอบคุณค่ะ', 'khàawp-khun khâ', 'thank you (female)', 3],
  ['ph-mai-pen-rai', 'production', 'ไม่เป็นไร', 'mâi bpen rai', "it's okay / no worries", 3],
  ['ph-thao-rai', 'production', 'เท่าไหร่ครับ', 'thâo-rài khráp', 'how much?', 3],
  ['ph-lot-noi', 'production', 'ลดหน่อยได้ไหม', 'lót nòi dâi măi', 'can you lower the price a little?', 3],
  ['ph-phaeng-pai', 'production', 'แพงไปหน่อย', 'phaaeng bpai nòi', "that's a bit expensive", 3],
  ['ph-ao-an-nii', 'production', 'เอาอันนี้', 'ao an níi', "I'll take this one", 3],
  ['ph-mai-ao-thung', 'production', 'ไม่เอาถุงครับ', 'mâi ao thŭng khráp', 'no bag, please', 3],
  ['ph-nueng-kilo', 'production', 'หนึ่งกิโล', 'nùeng gì-loo', 'one kilo', 3],
  ['ph-gluai-nueng-luuk', 'production', 'กล้วยหนึ่งลูก', 'glûai nùeng lûuk', 'one banana', 3],
  ['ph-mamuang-nueng-kilo', 'production', 'มะม่วงหนึ่งกิโล', 'má-mûang nùeng gì-loo', 'one kilo of mangoes', 3],
  ['ph-saam-sip-haa-baht', 'production', 'สามสิบห้าบาท', 'săam-sìp-hâa bàat', 'thirty-five baht', 3],
  ['ph-gaafae-yen', 'production', 'กาแฟเย็น', 'gaa-faae yen', 'iced coffee', 3],
  ['ph-latte-ron', 'production', 'ลาเต้ร้อน', 'laa-dtêe ráawn', 'hot latte', 3],
  ['ph-waan-noi', 'production', 'หวานน้อย', 'wăan nói', 'less sweet', 3],
  ['ph-mai-waan', 'production', 'ไม่หวาน', 'mâi wăan', 'no sugar', 3],
  ['ph-gaew-yai', 'production', 'แก้วใหญ่', 'gâaeo yài', 'large cup', 3],
  ['ph-phet-nit-noi', 'production', 'เผ็ดนิดหน่อย', 'phèt nít nòi', 'a little spicy', 3],
  ['ph-mai-phet', 'production', 'ไม่เผ็ด', 'mâi phèt', 'not spicy', 3],
  ['ph-phet-pokati', 'production', 'เผ็ดปกติ', 'phèt bpòk-gà-dtì', 'normal spicy', 3],
  ['ph-aroi-maak', 'production', 'อร่อยมาก', 'à-ròi mâak', 'delicious!', 3],
  ['ph-khao-soi', 'production', 'ข้าวซอยหนึ่งชาม', 'khâao-soi nùeng chaam', 'one bowl of khao soi', 3],
  ['ph-kho-nam-plao', 'production', 'ขอน้ำเปล่า', 'khăaw náam bplàao', 'water, please', 3],
  ['ph-check-bin', 'production', 'เช็คบิลครับ', 'chék bin khráp', 'the bill, please', 3],
  ['ph-hong-nam-yuu-nai', 'production', 'ห้องน้ำอยู่ไหน', 'hâawng-náam yùu năi', 'where is the restroom?', 3],
  ['ph-jot-naa-seven', 'production', 'จอดหน้าเซเว่น', 'jàawt nâa see-wên', 'stop in front of the 7-Eleven', 3],
  ['ph-jot-trong-nii', 'production', 'จอดตรงนี้', 'jàawt dtrong níi', 'stop right here', 3],
  ['ph-trong-pai', 'production', 'ตรงไป', 'dtrong bpai', 'go straight', 3],
  ['ph-liao-sai', 'production', 'เลี้ยวซ้าย', 'líao sáai', 'turn left', 3],
  ['ph-liao-khwa', 'production', 'เลี้ยวขวา', 'líao khwăa', 'turn right', 3],
  ['ph-thueng-laeo', 'production', 'ถึงแล้ว', 'thŭeng láaeo', "we've arrived", 3],
  ['ph-pai-nai', 'production', 'ไปไหน', 'bpai năi', 'where are you going?', 3],
  ['ph-hiu-khao', 'production', 'หิวข้าว', 'hĭu khâao', "I'm hungry", 3],
  ['ph-ron-maak', 'production', 'ร้อนมาก', 'ráawn mâak', "it's very hot", 3],
])
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS. If the 100-item check fails, count is off by a few — the totals above are 31 (L1) + 35 (L2) + 38 (L3) = 104.

- [ ] **Step 5: Commit**

```bash
git add data/tone-curriculum.ts tests/curriculum.test.ts
git commit -m "feat: full tone curriculum data (104 items across 3 levels)"
```

---

### Task 4: Generation script (TTS + contour extraction)

**Files:**
- Create: `scripts/generate-tone-audio.mts`
- Test: `tests/generate-helpers.test.ts`
- Modify: `package.json` (script), `.gitignore` (nothing new — audio IS committed), `.env.local` note in CLAUDE.md later

**Interfaces:**
- Consumes: `TONE_CURRICULUM`, `maleVariant` from Task 3; `detectPitch`, `normalizeContour` from Tasks 1–2.
- Produces on disk: `public/audio/tones/<id>.mp3` (+ `<id>-m.mp3` for minimal pairs), `data/tone-contours.json` (`Record<string, number[]>` keyed by audio path), `data/tone-audio-manifest.json` (`Record<string, string>` audio path → content hash).
- Exports (for tests): `ssmlFor(text: string, voice: string): string`, `contentHash(text: string, voice: string): string`.

**Behavior:**
- Skips items whose manifest hash matches (idempotent reruns).
- `--local-only` flag: no TTS calls; re-extracts contours for every MP3 already on disk (the teacher-swap path).
- Env: `AZURE_SPEECH_KEY` (required unless `--local-only`), `AZURE_SPEECH_REGION` (default `southeastasia`).
- Voices: female `th-TH-PremwadeeNeural` for every item; male `th-TH-NiwatNeural` extra file for `minimal-pair` items.
- Output format header: `X-Microsoft-OutputFormat: audio-24khz-48kbitrate-mono-mp3`.
- MP3 → PCM via `mpg123-decoder` (WASM, no native deps), then the same `detectPitch`/`normalizeContour` the browser uses.

- [ ] **Step 1: Write the failing test for the pure helpers**

Create `tests/generate-helpers.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { contentHash, ssmlFor } from '../scripts/generate-tone-audio.mts'

describe('generation helpers', () => {
  it('builds SSML with the voice and escaped text', () => {
    const ssml = ssmlFor('ข้าว & ไข่', 'th-TH-PremwadeeNeural')
    expect(ssml).toContain('th-TH-PremwadeeNeural')
    expect(ssml).toContain('ข้าว &amp; ไข่')
    expect(ssml).toContain('xml:lang="th-TH"')
  })

  it('hash changes when text or voice changes', () => {
    const a = contentHash('ข้าว', 'th-TH-PremwadeeNeural')
    expect(contentHash('ข้าว', 'th-TH-PremwadeeNeural')).toBe(a)
    expect(contentHash('ไข่', 'th-TH-PremwadeeNeural')).not.toBe(a)
    expect(contentHash('ข้าว', 'th-TH-NiwatNeural')).not.toBe(a)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the script**

Create `scripts/generate-tone-audio.mts`:

```ts
// Build-time generator: neural TTS → public/audio/tones/*.mp3 + pitch contours.
// Usage:
//   AZURE_SPEECH_KEY=... npx tsx scripts/generate-tone-audio.mts
//   npx tsx scripts/generate-tone-audio.mts --local-only   (re-extract contours only)
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { MPEGDecoder } from 'mpg123-decoder'
import { detectPitch, normalizeContour } from '../lib/pitch'
import { maleVariant, TONE_CURRICULUM } from '../data/tone-curriculum'

const ROOT = path.resolve(__dirname, '..')
const AUDIO_DIR = path.join(ROOT, 'public')
const CONTOURS_PATH = path.join(ROOT, 'data', 'tone-contours.json')
const MANIFEST_PATH = path.join(ROOT, 'data', 'tone-audio-manifest.json')

const FEMALE_VOICE = 'th-TH-PremwadeeNeural'
const MALE_VOICE = 'th-TH-NiwatNeural'

function escapeXml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function ssmlFor(text: string, voice: string): string {
  return `<speak version="1.0" xml:lang="th-TH"><voice name="${voice}"><prosody rate="-10%">${escapeXml(text)}</prosody></voice></speak>`
}

export function contentHash(text: string, voice: string): string {
  return createHash('sha256').update(`${text}|${voice}|rate:-10%`).digest('hex').slice(0, 16)
}

async function synthesize(text: string, voice: string, key: string, region: string): Promise<Buffer> {
  const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
    },
    body: ssmlFor(text, voice),
  })
  if (!res.ok) throw new Error(`TTS ${res.status} for "${text}" (${voice}): ${await res.text()}`)
  return Buffer.from(await res.arrayBuffer())
}

async function extractContour(mp3: Uint8Array): Promise<number[]> {
  const decoder = new MPEGDecoder()
  await decoder.ready
  const { channelData, sampleRate } = decoder.decode(mp3)
  decoder.free()
  return normalizeContour(detectPitch(channelData[0], sampleRate))
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(file, 'utf8')) as T
  } catch {
    return fallback
  }
}

async function main() {
  const localOnly = process.argv.includes('--local-only')
  const key = process.env.AZURE_SPEECH_KEY
  const region = process.env.AZURE_SPEECH_REGION ?? 'southeastasia'
  if (!localOnly && !key) throw new Error('AZURE_SPEECH_KEY is not set (or pass --local-only)')

  const contours = await readJson<Record<string, number[]>>(CONTOURS_PATH, {})
  const manifest = await readJson<Record<string, string>>(MANIFEST_PATH, {})
  await mkdir(path.join(AUDIO_DIR, 'audio', 'tones'), { recursive: true })

  // Every (audio path, voice, text) triple we need.
  const targets = TONE_CURRICULUM.flatMap((item) => {
    const t: Array<{ audio: string; voice: string; text: string }> = [{ audio: item.audio, voice: FEMALE_VOICE, text: item.thai }]
    if (item.kind === 'minimal-pair') t.push({ audio: maleVariant(item.audio), voice: MALE_VOICE, text: item.thai })
    return t
  })

  let generated = 0
  let extracted = 0
  for (const { audio, voice, text } of targets) {
    const filePath = path.join(AUDIO_DIR, audio)
    const hash = contentHash(text, voice)
    const upToDate = manifest[audio] === hash && existsSync(filePath)
    if (!localOnly && !upToDate) {
      const mp3 = await synthesize(text, voice, key as string, region)
      await writeFile(filePath, mp3)
      manifest[audio] = hash
      generated++
      console.log(`tts  ${audio}  (${text})`)
    }
    if (existsSync(filePath) && (!upToDate || localOnly || !contours[audio]?.length)) {
      contours[audio] = await extractContour(new Uint8Array(await readFile(filePath)))
      extracted++
      if (contours[audio].length === 0) console.warn(`warn: empty contour for ${audio}`)
    }
  }

  await writeFile(CONTOURS_PATH, JSON.stringify(contours, null, 1))
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 1))
  console.log(`done: ${generated} synthesized, ${extracted} contours extracted, ${targets.length} total files`)
}

// Only run when executed directly (not when imported by tests).
if (process.argv[1]?.includes('generate-tone-audio')) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
```

Add to `package.json` scripts:

```json
"tones:generate": "tsx scripts/generate-tone-audio.mts"
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (helper tests; no network calls in tests).

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-tone-audio.mts tests/generate-helpers.test.ts package.json
git commit -m "feat: build-time tone audio generation script (Azure TTS + contours)"
```

---

### Task 5: Generate the audio (requires user's Azure key)

**Files:**
- Create (generated): `public/audio/tones/*.mp3` (~139 files: 104 female + 35 male), `data/tone-contours.json`, `data/tone-audio-manifest.json`

**⚠️ Human-in-the-loop:** this task needs `AZURE_SPEECH_KEY`. If the user doesn't have one: Azure portal → create a "Speech service" resource (free F0 tier is enough; region `southeastasia`) → copy key into `.env.local` as `AZURE_SPEECH_KEY=...`. STOP and ask the user rather than skipping.

- [ ] **Step 1: Run the generator**

```bash
set -a && source .env.local && set +a && npm run tones:generate
```

Expected output ends with: `done: 139 synthesized, 139 contours extracted, 139 total files`

- [ ] **Step 2: Spot-check quality**

Play 5 random files (e.g. `afplay public/audio/tones/khaa-falling.mp3`) and confirm: natural Thai voice, correct word, no truncation. Check `data/tone-contours.json` has no more than a handful of `warn: empty contour` entries (very short syllables can defeat the detector; those items still work — the drill just shows audio without a curve).

- [ ] **Step 3: Run the full test suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 4: Commit the generated assets**

```bash
git add public/audio/tones data/tone-contours.json data/tone-audio-manifest.json
git commit -m "feat: generated tone audio (Azure neural TTS) and pitch contours"
```

---

### Task 6: Contour lookup + PitchCanvas component

**Files:**
- Create: `lib/toneContours.ts`
- Create: `components/tones/PitchCanvas.tsx`

**Interfaces:**
- Consumes: `data/tone-contours.json` (static import), `CONTOUR_POINTS` from `@/lib/pitch`.
- Produces:
  - `getContour(audioPath: string): number[] | null` from `@/lib/toneContours` — null when missing/empty.
  - `<PitchCanvas native={number[]} learner={number[] | null} progress={number} />` — canvas, native curve in `#1a1a2e`-on-jasmine style using CSS classes on a wrapper; native drawn up to `progress` (0–1, for playback animation; pass 1 for static), learner overlaid in a second color when present.

- [ ] **Step 1: Implement `lib/toneContours.ts`**

```ts
import contours from '@/data/tone-contours.json'

const map = contours as Record<string, number[]>

/** Native pitch curve for an audio file, or null if we don't have one. */
export function getContour(audioPath: string): number[] | null {
  const c = map[audioPath]
  return c && c.length > 0 ? c : null
}
```

Note: `tsconfig.json` already has `"resolveJsonModule": true` in Next 14 defaults; if the build complains, add it under `compilerOptions`.

- [ ] **Step 2: Implement `components/tones/PitchCanvas.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'

interface PitchCanvasProps {
  native: number[]
  learner?: number[] | null
  /** 0–1: how much of the native curve to reveal (playback animation). */
  progress?: number
}

const RANGE_SEMITONES = 6 // curve is clamped to ±6 st around the median

function drawCurve(ctx: CanvasRenderingContext2D, curve: number[], w: number, h: number, upTo: number, color: string, width: number) {
  const n = Math.max(2, Math.floor(curve.length * upTo))
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  for (let i = 0; i < n; i++) {
    const x = (i / (curve.length - 1)) * (w - 16) + 8
    const clamped = Math.max(-RANGE_SEMITONES, Math.min(RANGE_SEMITONES, curve[i]))
    const y = h / 2 - (clamped / RANGE_SEMITONES) * (h / 2 - 10)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
}

/** Overlays the learner's pitch curve on the native speaker's. Pure display. */
export default function PitchCanvas({ native, learner = null, progress = 1 }: PitchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, w, h)
    // midline
    ctx.strokeStyle = 'rgba(60,47,47,0.12)'
    ctx.lineWidth = 1
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(8, h / 2)
    ctx.lineTo(w - 8, h / 2)
    ctx.stroke()
    ctx.setLineDash([])
    if (native.length > 1) drawCurve(ctx, native, w, h, progress, '#4f46e5', 3.5) // indigo — teacher
    if (learner && learner.length > 1) drawCurve(ctx, learner, w, h, 1, '#dc2626', 2.5) // temple red — you
  }, [native, learner, progress])

  return (
    <div className="rounded-xl border border-tamarind/10 bg-surface p-2">
      <canvas ref={canvasRef} className="h-28 w-full" aria-label="Pitch curve comparison" />
      <div className="flex gap-4 px-1 text-[11px] font-semibold text-tamarind/60">
        <span><span className="mr-1 inline-block h-1 w-4 rounded bg-indigo align-middle" />Teacher</span>
        {learner && learner.length > 1 && <span><span className="mr-1 inline-block h-1 w-4 rounded bg-temple align-middle" />You</span>}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/toneContours.ts components/tones/PitchCanvas.tsx
git commit -m "feat: contour lookup and pitch-curve canvas"
```

---

### Task 7: `useToneRecorder` hook

**Files:**
- Create: `lib/useToneRecorder.ts`

**Interfaces:**
- Consumes: `detectPitch`, `normalizeContour` from `@/lib/pitch`.
- Produces: `useToneRecorder(): { supported: boolean; recording: boolean; error: string | null; result: { url: string; contour: number[] } | null; toggle(): void; reset(): void }` — MediaRecorder capture (same pattern as `components/lesson/RecordCompare.tsx:30-60`), then decode via `AudioContext.decodeAudioData` and analyze. `contour` is `[]` when no clear pitch was found (caller shows the "couldn't hear you" hint via `toneHint(tone, null)`).

- [ ] **Step 1: Implement**

Create `lib/useToneRecorder.ts`:

```ts
'use client'

import { useEffect, useRef, useState } from 'react'
import { detectPitch, normalizeContour } from '@/lib/pitch'

interface ToneRecording {
  url: string
  contour: number[]
}

/**
 * Record the learner's voice and extract a normalized pitch contour.
 * Audio never leaves the device.
 */
export function useToneRecorder() {
  const [supported, setSupported] = useState(true)
  const [recording, setRecording] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ToneRecording | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const urlRef = useRef<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined')) {
      setSupported(false)
    }
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop())
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    }
  }, [])

  async function analyze(blob: Blob): Promise<number[]> {
    try {
      const ctx = new AudioContext()
      const buffer = await ctx.decodeAudioData(await blob.arrayBuffer())
      const samples = buffer.getChannelData(0)
      const contour = normalizeContour(detectPitch(samples, buffer.sampleRate))
      void ctx.close()
      return contour
    } catch {
      return []
    }
  }

  function reset() {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    urlRef.current = null
    setResult(null)
    setError(null)
  }

  async function toggle() {
    setError(null)
    if (recording) {
      recorderRef.current?.stop()
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const recorder = new MediaRecorder(stream)
      recorderRef.current = recorder
      chunksRef.current = []
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        if (urlRef.current) URL.revokeObjectURL(urlRef.current)
        const url = URL.createObjectURL(blob)
        urlRef.current = url
        const contour = await analyze(blob)
        setResult({ url, contour })
        setRecording(false)
        stream.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
      recorder.start()
      setRecording(true)
    } catch {
      setError('Microphone access was blocked. Allow the microphone in your browser to practice speaking.')
    }
  }

  return { supported, recording, error, result, toggle, reset }
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/useToneRecorder.ts
git commit -m "feat: tone recorder hook with client-side pitch analysis"
```

---

### Task 8: Level 1 — Meet the tones (tone-id drill)

**Files:**
- Create: `components/tones/ToneIdDrill.tsx`
- Create: `app/tones/level-1/page.tsx`

**Interfaces:**
- Consumes: `TONE_CURRICULUM`, `TONE_LABELS` (Task 3), `gradeCard` from `@/lib/srs`, `PitchCanvas` + `getContour` (Task 6).
- Produces: page at `/tones/level-1`.

**Behavior:** shuffled queue of `kind === 'tone-id'` items. Per question: auto-play audio (with replay button) → learner picks 1 of 5 tone buttons (glyph + label + hook shown) → immediate feedback. Correct: green flash, `gradeCard(id, 'good')`, show the word + curve (PitchCanvas static), next. Wrong: show correct answer, replay the audio, then play the picked tone's example from the same set when one exists (contrast), `gradeCard(id, 'again')`, item re-queued at the end. Session = 10 questions, then a summary screen (n correct, "Practice again" / "Back to tone trainer" links).

- [ ] **Step 1: Implement `components/tones/ToneIdDrill.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `app/tones/level-1/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import ToneIdDrill from '@/components/tones/ToneIdDrill'

export const metadata: Metadata = {
  title: 'Level 1 · Meet the Thai tones | Thai Lessons Chiang Mai',
  description: 'Hear the five Thai tones on classic words like khaa and paa, and learn to tell them apart.',
}

export default function ToneLevel1Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/tones" className="text-sm font-semibold text-indigo">← Tone trainer</Link>
      <h1 className="mt-2 text-2xl font-black text-tamarind">Level 1 · Meet the tones</h1>
      <p className="mt-1 text-sm text-tamarind/60">Listen and pick which of the five tones you heard. Same syllable, five different words.</p>
      <div className="mt-5">
        <ToneIdDrill />
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: builds clean; `/tones/level-1` in the route list.

- [ ] **Step 4: Commit**

```bash
git add components/tones/ToneIdDrill.tsx app/tones/level-1/page.tsx
git commit -m "feat: level 1 tone identification drill"
```

---

### Task 9: Level 2 — Train your ear (minimal pairs)

**Files:**
- Create: `components/tones/MinimalPairDrill.tsx`
- Create: `app/tones/level-2/page.tsx`

**Interfaces:**
- Consumes: `TONE_CURRICULUM`, `maleVariant` (Task 3), `gradeCard`, `getContour`, `PitchCanvas`.
- Produces: page at `/tones/level-2`.

**Behavior:** queue of `kind === 'minimal-pair'` items (session of 10, shuffled). Per question: play ONE word — female or male voice chosen at random (`maleVariant(item.audio)`); options are the item + its `pairWith` items rendered as gloss + romanization buttons (shuffled). Correct → `gradeCard(id,'good')`; wrong → play both words back-to-back (the one they heard, then the one they picked), `gradeCard(id,'again')`, re-queue. After answering, reveal Thai script + curve. Same session-summary screen pattern as Level 1.

- [ ] **Step 1: Implement `components/tones/MinimalPairDrill.tsx`**

Structure is the same as `ToneIdDrill` with these differences (write the full component, reusing the `shuffle` helper locally):

```tsx
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { gradeCard } from '@/lib/srs'
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
  const [queue, setQueue] = useState<ToneItem[]>(() => shuffle(pool).slice(0, SESSION_SIZE))
  const [useMale, setUseMale] = useState(false)
  const [options, setOptions] = useState<ToneItem[]>([])
  const [answered, setAnswered] = useState<string | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [doneCount, setDoneCount] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const current = queue[0]

  function srcFor(item: ToneItem, male: boolean) {
    return male ? maleVariant(item.audio) : item.audio
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
          <button type="button" onClick={() => { setQueue(shuffle(pool).slice(0, SESSION_SIZE)); setCorrectCount(0); setDoneCount(0) }} className="min-h-11 rounded-2xl bg-indigo px-4 py-2 font-black text-surface">Practice again</button>
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

  const contour = answered ? getContour(current.audio) : null

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
```

- [ ] **Step 2: Create `app/tones/level-2/page.tsx`**

Same shell as level 1 with title `Level 2 · Train your ear`, description `One sound apart — did she say "throw" or "aunt"? Sharpen your ear on Thai minimal pairs.`, rendering `<MinimalPairDrill />`.

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import MinimalPairDrill from '@/components/tones/MinimalPairDrill'

export const metadata: Metadata = {
  title: 'Level 2 · Train your ear | Thai Lessons Chiang Mai',
  description: 'One sound apart — did she say "throw" or "aunt"? Sharpen your ear on Thai minimal pairs.',
}

export default function ToneLevel2Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/tones" className="text-sm font-semibold text-indigo">← Tone trainer</Link>
      <h1 className="mt-2 text-2xl font-black text-tamarind">Level 2 · Train your ear</h1>
      <p className="mt-1 text-sm text-tamarind/60">Hear one word, pick its meaning. The options differ by a single tone, vowel length, or puff of air.</p>
      <div className="mt-5">
        <MinimalPairDrill />
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: clean, `/tones/level-2` present.

- [ ] **Step 4: Commit**

```bash
git add components/tones/MinimalPairDrill.tsx app/tones/level-2/page.tsx
git commit -m "feat: level 2 minimal-pair listening drill"
```

---

### Task 10: Level 3 — Say it right (production with pitch overlay)

**Files:**
- Create: `components/tones/ProductionDrill.tsx`
- Create: `app/tones/level-3/page.tsx`

**Interfaces:**
- Consumes: `useToneRecorder` (Task 7), `PitchCanvas` + `getContour` (Task 6), `classifyShape`, `toneHint`, `type Tone` from `@/lib/pitch`, `gradeCard`, curriculum.
- Produces: page at `/tones/level-3`.

**Behavior:** queue of `kind === 'production'` items (session of 8, shuffled). Per item:
1. Native curve animates during playback: `<audio>` `ontimeupdate` sets `progress = currentTime / duration` on `PitchCanvas`.
2. Record button (toggle, reusing `useToneRecorder`). While recording, pulse styling like `RecordCompare`.
3. On result: learner curve overlays. If `item.tone` is set, show `toneHint(item.tone, classifyShape(result.contour))`; if not (multi-tone phrase), show neutral copy: "Compare the shape of your melody with the teacher's — aim for the same rises and falls."
4. Buttons: **Try again** (reset + re-record), **▶ Teacher** / **▶ You** replay, **Next** (grades `good` if hint was ok or self-advanced without hint, `again` never auto — production is self-judged; grade `good` on Next, `again` only via an explicit "Mark for more practice" link), **Ask the teacher** → `https://wa.me/66929894495?text=<encoded>` with text `Hi Mike! Can you check my tone on "<thai>" (<roman>)?`.
5. If mic unsupported/denied: perception-only fallback — show curve + audio + note "Enable your microphone to practice speaking", still allow Next (`good` not recorded; no grade).
6. If item has no contour (empty at generation): hide canvas, keep record/playback A/B comparison (RecordCompare-style).

- [ ] **Step 1: Implement `components/tones/ProductionDrill.tsx`**

```tsx
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { classifyShape, toneHint, type Tone } from '@/lib/pitch'
import { gradeCard } from '@/lib/srs'
import { TONE_CURRICULUM, type ToneItem } from '@/data/tone-curriculum'
import { getContour } from '@/lib/toneContours'
import { useToneRecorder } from '@/lib/useToneRecorder'
import PitchCanvas from '@/components/tones/PitchCanvas'

const SESSION_SIZE = 8
const WHATSAPP = 'https://wa.me/66929894495'

function shuffle<T>(xs: T[]): T[] {
  const out = [...xs]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export default function ProductionDrill() {
  const pool = useMemo(() => TONE_CURRICULUM.filter((i) => i.kind === 'production'), [])
  const [queue, setQueue] = useState<ToneItem[]>(() => shuffle(pool).slice(0, SESSION_SIZE))
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
          <button type="button" onClick={() => { setQueue(shuffle(pool).slice(0, SESSION_SIZE)); setDoneCount(0) }} className="min-h-11 rounded-2xl bg-indigo px-4 py-2 font-black text-surface">Practice again</button>
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
            {hint ? hint.message : 'Compare the shape of your melody with the teacher’s — aim for the same rises and falls.'}
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
```

- [ ] **Step 2: Create `app/tones/level-3/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import ProductionDrill from '@/components/tones/ProductionDrill'

export const metadata: Metadata = {
  title: 'Level 3 · Say it right | Thai Lessons Chiang Mai',
  description: 'Record yourself and see your pitch curve on top of the teacher’s — real feedback on your Thai tones.',
}

export default function ToneLevel3Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/tones" className="text-sm font-semibold text-indigo">← Tone trainer</Link>
      <h1 className="mt-2 text-2xl font-black text-tamarind">Level 3 · Say it right</h1>
      <p className="mt-1 text-sm text-tamarind/60">Watch the teacher&apos;s melody draw as she speaks, then record yourself and match the shape. Your recording never leaves this device.</p>
      <div className="mt-5">
        <ProductionDrill />
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: clean, `/tones/level-3` present.

- [ ] **Step 4: Commit**

```bash
git add components/tones/ProductionDrill.tsx app/tones/level-3/page.tsx
git commit -m "feat: level 3 production drill with pitch-curve overlay"
```

---

### Task 11: `/tones` landing page + entry links

**Files:**
- Create: `app/tones/page.tsx`
- Create: `components/tones/ToneLandingClient.tsx`
- Modify: `app/missions/page.tsx` (add a link card/banner to `/tones`)
- Modify: `app/practice/ThaiPracticeApp.tsx` (home screen: add a "Tone trainer" link card near the category list, around the review card at `app/practice/ThaiPracticeApp.tsx:230-260`)

**Interfaces:**
- Consumes: `TONE_CURRICULUM`, `TONE_LABELS`, `getLearnedCount` from `@/lib/srs`, `getContour`, `PitchCanvas`.
- Produces: page at `/tones` with metadata; links from missions + practice.

**Behavior:**
- Server page (`app/tones/page.tsx`) provides metadata (title `Thai tone trainer — hear and speak the 5 tones`, description mentioning pitch-curve feedback) and renders the client component.
- Client component:
  - Hero: "Same word, five meanings" — the five `khaa` items as tappable chips (`คา ข่า ค่า ค้า ขา`) that play their audio and show that word's curve in a single shared `PitchCanvas` beneath.
  - Three level cards, each with title, one-line description, per-level progress `getLearnedCount(levelIds)}/{levelIds.length}` (client-side, after mount to avoid hydration mismatch — same pattern the practice app uses), and a Start link to `/tones/level-{n}`.
  - Footer note: "Recordings stay on your device" + WhatsApp CTA.
- Missions page: card at the end of the mission list: "🎵 New: Tone trainer — hear and speak the 5 tones → /tones" following the existing card markup pattern in that file.
- Practice app home: same-styled small card linking to `/tones`.

- [ ] **Step 1: Implement `components/tones/ToneLandingClient.tsx`** (hero chips + level cards as described; use `useState` for selected hero word and `useEffect`-gated progress counts)

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { getLearnedCount } from '@/lib/srs'
import { TONE_CURRICULUM, TONE_LABELS } from '@/data/tone-curriculum'
import { getContour } from '@/lib/toneContours'
import PitchCanvas from '@/components/tones/PitchCanvas'
import type { Tone } from '@/lib/pitch'

const HERO_IDS = ['khaa-mid', 'khaa-low', 'khaa-falling', 'khaa-high', 'khaa-rising']

const LEVELS = [
  { n: 1, href: '/tones/level-1', title: 'Meet the tones', blurb: 'Hear the five tones and learn to tell them apart.' },
  { n: 2, href: '/tones/level-2', title: 'Train your ear', blurb: 'Minimal pairs — one sound apart, totally different meaning.' },
  { n: 3, href: '/tones/level-3', title: 'Say it right', blurb: 'Record yourself and match the teacher’s pitch curve.' },
] as const

export default function ToneLandingClient() {
  const heroItems = HERO_IDS.map((id) => TONE_CURRICULUM.find((i) => i.id === id)!).filter(Boolean)
  const [active, setActive] = useState(heroItems[0])
  const [progress, setProgress] = useState<Record<number, { learned: number; total: number }>>({})
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const next: Record<number, { learned: number; total: number }> = {}
    for (const level of [1, 2, 3]) {
      const ids = TONE_CURRICULUM.filter((i) => i.level === level).map((i) => i.id)
      next[level] = { learned: getLearnedCount(ids), total: ids.length }
    }
    setProgress(next)
  }, [])

  function playHero(id: string) {
    const item = heroItems.find((i) => i.id === id)
    if (!item || !audioRef.current) return
    setActive(item)
    audioRef.current.src = item.audio
    void audioRef.current.play().catch(() => undefined)
  }

  const contour = active ? getContour(active.audio) : null

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} className="hidden" />
      <section className="rounded-2xl border border-tamarind/10 bg-jasmine p-4 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-tamarind/50">Same syllable · five meanings</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {heroItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => playHero(item.id)}
              className={`min-h-11 rounded-2xl border px-3 py-1.5 text-center transition ${active?.id === item.id ? 'border-indigo bg-indigo text-surface' : 'border-tamarind/15 bg-surface text-tamarind'}`}
            >
              <span className="block text-xl font-black">{item.thai}</span>
              <span className={`block text-[11px] ${active?.id === item.id ? 'text-surface/80' : 'text-tamarind/60'}`}>{item.gloss}</span>
            </button>
          ))}
        </div>
        {active && (
          <div className="mt-3">
            <p className="mb-2 text-sm text-tamarind/70">
              <strong>{active.roman}</strong> · {TONE_LABELS[active.tone as Tone].label} tone — {TONE_LABELS[active.tone as Tone].hook}
            </p>
            {contour && <PitchCanvas native={contour} />}
          </div>
        )}
      </section>

      <section className="mt-6 grid gap-3">
        {LEVELS.map((level) => (
          <Link key={level.n} href={level.href} className="flex items-center justify-between rounded-2xl border border-tamarind/10 bg-surface p-4 transition hover:border-indigo/40">
            <div>
              <p className="font-black text-tamarind">Level {level.n} · {level.title}</p>
              <p className="text-sm text-tamarind/60">{level.blurb}</p>
            </div>
            <div className="text-right">
              {progress[level.n] && <p className="text-xs font-bold text-indigo">{progress[level.n].learned}/{progress[level.n].total}</p>}
              <p className="font-black text-indigo">→</p>
            </div>
          </Link>
        ))}
      </section>

      <p className="mt-6 text-xs text-tamarind/50">
        🎙 Recordings stay on your device — nothing is uploaded. Want human feedback?{' '}
        <a href="https://wa.me/66929894495" target="_blank" rel="noopener noreferrer" className="font-bold text-indigo underline">Message Mike on WhatsApp</a>.
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Create `app/tones/page.tsx`**

```tsx
import type { Metadata } from 'next'
import ToneLandingClient from '@/components/tones/ToneLandingClient'

export const metadata: Metadata = {
  title: 'Thai tone trainer — hear and speak the 5 tones | Thai Lessons Chiang Mai',
  description: 'Free Thai tone trainer: minimal-pair listening drills and pitch-curve feedback on your own voice. See your melody on top of a native speaker’s.',
}

export default function TonesPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-black text-tamarind">Tone trainer</h1>
      <p className="mt-1 text-sm text-tamarind/60">Thai has five tones — same syllable, five different words. Train your ear, then your voice.</p>
      <div className="mt-5">
        <ToneLandingClient />
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Add entry links**

In `app/missions/page.tsx`: after the mission cards list, add a card matching the page's existing card markup, linking to `/tones` with copy: `🎵 New: Tone trainer — hear and speak the 5 tones`. Read the file first and copy its exact card classes.

In `app/practice/ThaiPracticeApp.tsx` home screen (`screen === 'home'` branch, after the daily-review card ~line 230–260): add:

```tsx
<Link href="/tones" className="mt-3 block rounded-2xl border border-indigo/30 bg-surface p-3 font-bold text-indigo">
  🎵 New: Tone trainer — hear &amp; speak the 5 tones →
</Link>
```

(Add `import Link from 'next/link'` if not present.)

- [ ] **Step 4: Verify**

Run: `npm run build && npm run lint`
Expected: clean; `/tones` in route list.

- [ ] **Step 5: Commit**

```bash
git add app/tones/page.tsx components/tones/ToneLandingClient.tsx app/missions/page.tsx app/practice/ThaiPracticeApp.tsx
git commit -m "feat: tone trainer landing page and entry links"
```

---

### Task 12: RecordCompare pitch overlay upgrade

**Files:**
- Modify: `components/lesson/RecordCompare.tsx`

**Interfaces:**
- Consumes: `getContour` (Task 6), `useToneRecorder` — **no**: RecordCompare keeps its own recorder (it exposes playback UX that differs); instead it reuses `detectPitch` + `normalizeContour` from `@/lib/pitch` and `PitchCanvas`.
- Produces: same component API (`{ nativeSrc: string }`) — **backward compatible**. When `getContour(nativeSrc)` is null (all current call sites, since existing lesson audio isn't in the tones manifest), renders exactly as today.

**Behavior:** after `recorder.onstop` builds the blob, ALSO decode + analyze it (same `analyze` logic as `useToneRecorder`) into a `myContour` state. If `getContour(nativeSrc)` returns a curve, render `<PitchCanvas native={nativeContour} learner={myContour} />` between the buttons row and the tip paragraph. No hint text here (nativeSrc may be a multi-tone phrase) — the existing "compare the rise and fall" copy already explains it.

- [ ] **Step 1: Implement the change**

In `components/lesson/RecordCompare.tsx`:
- Add imports: `import { detectPitch, normalizeContour } from '@/lib/pitch'`, `import { getContour } from '@/lib/toneContours'`, `import PitchCanvas from '@/components/tones/PitchCanvas'`.
- Add state: `const [myContour, setMyContour] = useState<number[] | null>(null)` and `const nativeContour = getContour(nativeSrc)`.
- In `recorder.onstop`, after `setMyAudioUrl(url)`, add:

```ts
void (async () => {
  try {
    const ctx = new AudioContext()
    const buffer = await ctx.decodeAudioData(await blob.arrayBuffer())
    setMyContour(normalizeContour(detectPitch(buffer.getChannelData(0), buffer.sampleRate)))
    void ctx.close()
  } catch {
    setMyContour(null)
  }
})()
```

- After the buttons `<div>` (line ~92), add:

```tsx
{nativeContour && myAudioUrl && (
  <div className="mt-3">
    <PitchCanvas native={nativeContour} learner={myContour} />
  </div>
)}
```

- [ ] **Step 2: Verify backward compatibility**

Run: `npm run build`
Expected: clean. Open a lesson page with RecordCompare (`npm run dev`, visit `/lessons/week-1`) — component renders identically to before (no contour exists for lesson audio paths).

- [ ] **Step 3: Commit**

```bash
git add components/lesson/RecordCompare.tsx
git commit -m "feat: pitch-curve overlay in RecordCompare when contours exist"
```

---

### Task 13: Repo CLAUDE.md

**Files:**
- Create: `CLAUDE.md` (repo root)

- [ ] **Step 1: Write it**

Content must cover, in this order (write real prose, not placeholders):
1. **What this is:** Thai Lessons Chiang Mai — free missions/course/practice app funneling to paid lessons with Mike. Live at thai-culture-ruby.vercel.app.
2. **Stack:** Next.js 14 App Router, TypeScript strict, Tailwind (custom tokens `tamarind`, `jasmine`, `indigo`, `temple`, `surface`), Supabase, Stripe, Vitest.
3. **Directory map:** `app/` routes (missions, lessons, practice, tones, book, products, teacher-dashboard), `components/`, `lib/` (srs, pitch, speech, supabase, stripe), `data/` (tone curriculum + generated contours/manifest), `scripts/`, `public/audio/tones/` (generated, committed).
4. **Tone pipeline how-to:** add rows to `data/tone-curriculum.ts` (id ⇒ audio path convention, `pairWith` rules, tone required except phrases) → `AZURE_SPEECH_KEY=... npm run tones:generate` → commit MP3s + `tone-contours.json` + manifest. Teacher-swap: replace an MP3 in place, run `npm run tones:generate -- --local-only`. Never hand-edit `tone-contours.json` or the manifest.
5. **SRS conventions:** all learnable items grade through `lib/srs.ts` `gradeCard(id, grade)`; IDs share one namespace in localStorage key `thai-expat-srs-v1`; never rename published item IDs (renames orphan learner progress).
6. **Commands:** `npm run dev` / `build` / `lint` / `test` / `tones:generate`.
7. **Rules:** feedback stays gentle (no scores/fail states); learner audio never leaves the device; UI English, content Thai + Paiboon-style romanization; browser TTS (`lib/speech.ts`) is the fallback voice for non-tone content only.

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add repo CLAUDE.md with tone pipeline conventions"
```

---

### Task 14: Final verification + QA

**Files:** none new.

- [ ] **Step 1: Full gates**

```bash
npm test && npm run lint && npm run build
```
Expected: all pass.

- [ ] **Step 2: Manual QA checklist (npm run dev)**

- `/tones`: hero chips play audio and swap the curve; level cards show progress after completing a session.
- `/tones/level-1`: audio auto-plays; wrong answer replays correct-then-picked contrast; summary appears after 10.
- `/tones/level-2`: voice alternates female/male across questions; options are confusables; wrong answer plays heard-then-picked.
- `/tones/level-3`: curve animates with playback; record → overlay + hint; phrase items (no `tone`) show neutral copy; WhatsApp link opens with prefilled text; deny mic → perception-only fallback with note.
- `/lessons/week-1` RecordCompare: unchanged appearance (no contour), recording still works.
- `/practice`: tone drills graded earlier now appear in daily review counts; tone trainer link card visible.
- Mobile viewport (375px): all tap targets ≥44px, no horizontal scroll on any tones page.

- [ ] **Step 3: Update memory + commit anything outstanding**

Per project memory protocol, update `.claude/memory/active.md` and `summary.md` (create the folder if missing). Commit:

```bash
git add -A && git commit -m "chore: QA fixes and memory update for tone trainer"
```

(Skip the commit if nothing changed.)

---

## Self-review notes

- **Spec coverage:** curriculum data (T3), generation script + teacher swap + manifest (T4–5), pitch lib (T1–2), `/tones` three levels (T8–10), landing + links (T11), RecordCompare upgrade backward compatible (T12), SRS integration (grade calls in T8–10, progress in T11), error handling (mic/pitch/audio fallbacks in T7/T10, empty-contour fallback in T10/T12), tests (T1–4), CLAUDE.md (T13), out-of-scope items untouched. ✓
- **Type consistency:** `ToneItem`, `Tone`, `Shape`, `getContour`, `maleVariant`, `useToneRecorder` signatures match across tasks. ✓
- **Known judgment calls:** Level-3 grades `good` on Next (self-judged production; explicit "Mark for more practice" for `again`) — matches the no-fail feedback constraint. Multi-word phrases get overlay-only feedback (single-tone `toneHint` doesn't apply); single-word items carry `tone` and get hints.
