# Tone Trainer — Design Spec

Date: 2026-07-11
Status: Approved design, pending implementation plan
Branch: feat/voice-practice
Research basis: `claudedocs/learning-improvement-research.md`

## Goal

Give learners a way to *hear* and *produce* Thai's five tones — the #1 obstacle for foreign learners — through perception drills and pitch-curve feedback on their own recordings. No Thai learning product currently offers pitch-curve comparison; this is the site's differentiator, and it feeds the paid-lesson funnel via "ask the teacher" hand-offs.

## Decisions made during brainstorming

| Question | Decision |
|---|---|
| Scope | Tone trainer release (pitch curves + minimal pairs + real audio) |
| Model audio | Neural TTS generated at build time now; teacher recordings swap in file-by-file later |
| Placement | New `/tones` section + upgrade existing `RecordCompare` component |
| Feedback style | Visual curve overlay + gentle shape hint ("try falling more"). No numeric score, no pass/fail |
| V1 content | Full curriculum: 100+ items — 5-tone sets, tone minimal pairs, vowel-length pairs, aspirated/unaspirated pairs, production phrases from existing missions |
| Architecture | Approach A: fully client-side analysis, build-time audio + contour generation, zero runtime services |
| Extra deliverable | Create repo `CLAUDE.md` documenting project conventions incl. the tone pipeline |

## Architecture

```
data/tone-curriculum.ts            curriculum as typed data (human-edited)
data/tone-contours.json            native pitch curves (script-generated)
scripts/generate-tone-audio.mts    build-time: TTS → MP3 + contour extraction
lib/pitch.ts                       pitch detection, normalization, shape hints (pure)
app/tones/                         trainer pages (landing + 3 levels)
components/lesson/RecordCompare.tsx  upgraded with curve overlay (backward compatible)
public/audio/tones/*.mp3           generated audio, committed
```

Everything runs client-side at runtime. No API routes, no runtime TTS, no audio leaves the device.

## Data model

```ts
type Tone = 'mid' | 'low' | 'falling' | 'high' | 'rising'

type ToneItem = {
  id: string                  // 'mp-paa-throw-aunt'
  kind: 'tone-id' | 'minimal-pair' | 'production'
  thai: string                // ป้า
  roman: string               // bpâa
  gloss: string               // aunt
  tone: Tone
  audio: string               // /audio/tones/paa-falling.mp3
  pairWith?: string[]         // ids of confusable items (minimal-pair options)
  level: 1 | 2 | 3
}
```

- Contours are stored separately in `data/tone-contours.json` keyed by audio path (32 samples, semitones relative to speaker median) so the human-edited file stays clean.
- Curriculum growth = add rows + rerun the script.
- Curriculum content: level 1 = five-tone sets (maa, mai, khaa…); level 2 = tone pairs, vowel-length pairs (ใกล้/ไกล class), aspirated/unaspirated pairs (ปา/พา); level 3 = production phrases reused from the four existing missions.

## Audio & contour pipeline (`scripts/generate-tone-audio.mts`)

1. Read curriculum; skip items whose audio is up to date (manifest of `hash(thai + voice)`).
2. Call Azure TTS — default `th-TH-PremwadeeNeural` (female); minimal-pair items also get `th-TH-NiwatNeural` (male) so learners hear tones across voice ranges. Voice variants follow a path convention: `item.audio` is the female file (`{base}.mp3`), the male variant is `{base}-m.mp3`, and both get contour entries keyed by their own path. The UI picks a variant per question. Key from `AZURE_SPEECH_KEY` env var, never committed.
3. Write MP3s to `public/audio/tones/`, decode each, run the same pitch detector the browser uses, write normalized contours to `data/tone-contours.json`.
4. MP3s + contours are committed; deploys stay static and CDN-served.

**Teacher swap:** drop a real recording at the same path, rerun with `--local-only`; contour is re-extracted from her file. No other changes.

**Known scale limit:** ~200 MP3s ≈ 2–4 MB in git is fine. If curriculum grows ~10×, move audio to Supabase Storage. Not built now.

## `lib/pitch.ts` (pure, unit-tested)

- `detectPitch(buffer): number[]` — autocorrelation (McLeod, via `pitchy`) over 50ms windows; unvoiced/silent frames dropped.
- `normalizeContour(hz[]): number[]` — semitones relative to the speaker's own median pitch (voice-range invariant), trim silence, resample to 32 points.
- `classifyShape(contour)` → `'rising' | 'falling' | 'flat' | 'dipping' | 'peaking'` via slope thresholds on curve thirds. Deterministic, no ML.
- `hint(expectedTone, actualShape): string` — gentle copy: "Rising ✓", "Your pitch fell — this one rises at the end".

## `/tones` UX

**Landing:** hero with the five `maa` words tappable for instant audio; three level cards with SRS-derived progress; linked from missions page and practice app home.

**Level 1 — Meet the tones (tone-id):** hear a syllable → pick 1 of 5 tones (arrow glyphs + memory hooks). Wrong answer replays picked vs correct tone back-to-back.

**Level 2 — Train your ear (minimal pairs):** hear one word → choose between 2–3 confusable glosses. Alternates female/male voices per question.

**Level 3 — Say it right (production):**
1. Native curve animates on canvas in sync with audio playback.
2. Hold-to-record; learner curve overlays in a second color.
3. Gentle hint; buttons: Try again · Compare side-by-side · Next · **Ask the teacher** (WhatsApp deep-link, phrase pre-filled).

All levels grade `again/good` into the existing `lib/srs.ts` store — tone items mix into daily review alongside phrase cards. Mobile-first, existing visual system.

## RecordCompare upgrade

Keeps current record/playback behavior; gains the same canvas overlay + hint used in Level 3. Reads contours from `data/tone-contours.json` by audio path. **If no contour exists for a phrase, renders exactly as today** — zero breakage on existing missions/lessons content.

## Error handling

| Failure | Behavior |
|---|---|
| Mic denied / unsupported | Item degrades to perception-only + "enable mic to practice speaking" note. Never a dead end. |
| No usable pitch (whisper/noise) | "We couldn't hear you clearly — try in a quieter spot"; attempt not graded. |
| Audio 404 / slow network | Loading state → retry; drill skippable. |
| SSR | All audio/mic code behind `'use client'` + runtime guards, matching existing patterns. |

## Testing

- **`lib/pitch.ts` (Vitest):** synthetic sine sweeps with known shapes must classify correctly; normalization invariant to octave shift (same contour at 110Hz and 220Hz → same output); silence/noise returns empty contour.
- **Curriculum validation test:** unique IDs; every `pairWith` resolves; post-generation, every item has audio + contour.
- **UI:** manual verification + `npm run build` type/lint gate, per existing project practice. No new e2e infra in v1.

## Additional deliverable: repo `CLAUDE.md`

Create `CLAUDE.md` at repo root covering: project purpose and stack, directory map, how the tone curriculum/audio pipeline works (adding items, running the script, teacher-swap flow), SRS integration conventions, and build/test commands.

## Out of scope (explicit)

- Numeric pronunciation scores or pass/fail grading
- Server-side analysis / Thai STT intelligibility check (future extension via API route)
- Moving SRS to Supabase (separate Tier 2 project)
- Thai script reading instruction
