# Active

## Current Focus
Tone trainer feature complete on feat/voice-practice — PR #2 open (https://github.com/Mekjunkong/thai-culture/pull/2).

## Just Completed
- /tones trainer (3 levels), lib/pitch.ts + 18 tests, 119-item curriculum, generation script, RecordCompare overlay, landing + links, CLAUDE.md
- Final whole-branch review passed (ready to merge)

## Next Steps
- [ ] Add AZURE_SPEECH_KEY to .env.local (free F0 Speech resource, region southeastasia)
- [ ] Run `npm run tones:generate`, commit public/audio/tones/ + data/tone-contours.json + manifest
- [ ] Post-audio browser QA (drill audio, curves, mic overlay on mobile), then merge PR #2
