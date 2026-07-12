# CLAUDE.md

## 1. What this is

Thai Lessons Chiang Mai — a free missions/course/practice web app that funnels learners
toward paid private lessons with Mike, a Chiang Mai–based Thai teacher. Free content
(Week 1 greetings/wai/politeness, browsable Week 2 numbers/prices/colors) hooks learners;
the tone trainer, missions, and practice tools build engagement; `app/book` and
`app/products` convert interested learners into paying students.

Live at https://thai-culture-ruby.vercel.app.

## 2. Stack

- **Framework:** Next.js 14 (App Router), TypeScript in strict mode
- **Styling:** Tailwind CSS with custom design tokens defined in `tailwind.config.ts`:
  `tamarind`, `jasmine`, `indigo` (+ `indigo-soft`), `temple`, `surface`, plus `thai.*`
  and `turmeric`/`banana` accents — all defined as `oklch()` colors
- **Backend:** Supabase (auth, profiles, lessons, progress) — see `SUPABASE_SETUP.md`
- **Payments:** Stripe (`lib/stripe.ts`, `components/checkout/`)
- **Testing:** Vitest (`npm run test`)
- **Audio/pitch:** `pitchy` for client-side pitch detection, `mpg123-decoder` for decoding
  generated MP3s inside the audio-generation script

## 3. Directory map

- `app/` — routes: `missions/` (driver-stop, market-price, order-coffee,
  order-food-spice), `lessons/` (week-1..4), `practice/`, `tones/` (+ `level-1`,
  `level-2`, `level-3`), `book/` (intake form to book with Mike), `products/`,
  `teacher-dashboard/`, `auth/`, `login/`, `api/`
- `components/` — `tones/` (drill UI: `ToneIdDrill`, `MinimalPairDrill`,
  `ProductionDrill`, `PitchCanvas`, `ToneLandingClient`), `lesson/` (incl.
  `RecordCompare`), `quiz/`, `checkout/`, `auth/`, `ui/`
- `lib/` — `srs.ts` (spaced repetition), `pitch.ts` (pitch detection, contour
  normalization, tone-shape classification), `speech.ts` (browser TTS voice
  selection), `useToneRecorder.ts` (mic recording hook), `supabase.ts`, `stripe.ts`,
  `database.types.ts`, `toneContours.ts` (runtime contour lookup)
- `data/` — `tone-curriculum.ts` (119 tone-trainer items: 31 tone-id, 34
  minimal-pair, 54 production), plus generated `tone-contours.json` and
  `tone-audio-manifest.json` (committed once populated — not committed yet as of
  this writing, since the audio-generation step hasn't run)
- `scripts/` — `generate-tone-audio.mts`, the audio-generation pipeline, run via
  `npm run tones:generate`
- `public/audio/tones/` — generated MP3s, committed once generated; currently empty
  because audio generation hasn't run yet

## 4. Tone pipeline how-to

To add a new drill item:

1. Add a row to `TONE_CURRICULUM` in `data/tone-curriculum.ts`. Each row is a tuple:
   `[id, kind, thai, roman, gloss, level, tone?, pairWith?]`. The `audio` path is
   derived automatically as `/audio/tones/${id}.mp3` — don't set it by hand.
   - `tone` is required for every item except `production`-kind phrases (single
     production words still carry a tone for the shape hint; longer phrases omit it).
   - `minimal-pair` items should list their confusable(s) in `pairWith` (item IDs,
     not audio paths); pairs reference each other both ways.
2. Run `AZURE_SPEECH_KEY=... npm run tones:generate`. This synthesizes any new or
   changed text via Azure TTS — `th-TH-PremwadeeNeural` (female) for every item, plus
   `th-TH-NiwatNeural` (male) for `minimal-pair` items via `maleVariant()` — writes
   MP3s under `public/audio/tones/`, extracts pitch contours into
   `data/tone-contours.json`, and updates `data/tone-audio-manifest.json` (a
   content-hash cache keyed by text+voice+rate, so unchanged items are skipped).
3. Commit the new/changed MP3s in `public/audio/tones/` together with the updated
   `tone-contours.json` and `tone-audio-manifest.json`.

**Teacher-swap path:** to replace a specific voice recording (e.g. drop in a real
teacher's take) without re-running TTS, overwrite the MP3 in place at its existing
path, then run `npm run tones:generate -- --local-only` to re-extract just that
file's pitch contour without calling Azure.

**Never hand-edit** `tone-contours.json` or `tone-audio-manifest.json` — they are
generated artifacts keyed by content hash; manual edits will be silently
overwritten or cause hash mismatches on the next generation run.

## 5. SRS conventions

All learnable items (lessons, tone drills, etc.) grade through `lib/srs.ts`'s
`gradeCard(id, grade)` (an SM-2-lite scheduler, client-side only, no backend sync).
Every item ID shares one flat namespace inside a single localStorage key:
`thai-expat-srs-v1`.

Because progress is keyed purely by ID, **never rename a published item ID** —
renaming orphans any learner's existing progress for that item (it will look
"never studied" again on next load). Give new items new, permanent IDs instead.

## 6. Commands

```bash
npm run dev             # start the dev server
npm run build            # production build
npm run lint               # next lint
npm run test                 # vitest run
npm run tones:generate         # run the tone audio-generation pipeline (see §4)
```

## 7. Rules

- **Feedback stays gentle** — no scores, percentages, or fail states. Drills use
  encouraging retry language (e.g. `lib/pitch.ts`'s `toneHint()` returns
  `{ ok, message }`, with misses phrased as "Your pitch was rising — this tone
  drops firmly at the end... Listen once more and copy the melody" rather than
  "Wrong" or a numeric score; hits get a short "Rising ✓ — great dip-and-rise").
- **Learner audio never leaves the device** — `lib/useToneRecorder.ts` records via
  `MediaRecorder`, then decodes and analyzes the pitch contour entirely in-browser
  (`AudioContext.decodeAudioData` + `lib/pitch.ts`). The recording is never
  uploaded or transmitted anywhere.
- **UI is English; learning content is Thai + Paiboon-style romanization** (e.g.
  `khâa`, `sà-wàt-dii khráp`) — see any row in `data/tone-curriculum.ts` for the
  pattern.
- **Browser TTS (`lib/speech.ts`) is the fallback voice for non-tone content
  only.** It picks the best installed Thai system voice (weighting
  "natural"/"online"/"neural"/"wavenet" names above generic on-device voices) for
  playback outside the tone trainer. The tone trainer itself always plays the
  pre-generated Azure neural-voice MP3s from `public/audio/tones/`, never browser TTS.
