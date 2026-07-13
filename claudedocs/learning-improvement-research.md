# Research: Making thai-culture-ruby.vercel.app Much Better for Learning

Date: 2026-07-11
Scope: Evidence-based review of the live site + language-acquisition research + tech feasibility for Thai specifically.

---

## 1. Where the site stands today

What already exists (and is genuinely good pedagogy):

| Feature | Status | Assessment |
|---|---|---|
| Situational missions (coffee, market, food, transport) | 4 live | Task-based learning — research-aligned. Too few of them. |
| Flashcards + quiz + SM-2 spaced repetition | Live (localStorage) | The right mechanism, but progress is trapped on one device. |
| Streaks + daily review | Live | Correct habit mechanic; missing "streak repair" safety net. |
| Record & compare (RecordCompare) | Live | Records learner audio but gives **no feedback** — the learner must judge themselves. |
| Browser TTS | Live (recently improved) | Risky for a tonal language: imperfect TTS tones actively teach errors. |
| Human voice feedback via WhatsApp | Live | Real differentiator vs. every app. Underleveraged in the product loop. |
| Teacher dashboard, lesson reports, Supabase | Live | Infrastructure exists but isn't connected to learner practice data. |

## 2. What the research says

### Tones are the single biggest obstacle for Thai learners
Every source on Thai acquisition converges: the 5-tone system is the #1 challenge, and learners of non-tonal L1s literally cannot *hear* the differences at first. Two proven interventions:

1. **Minimal-pair perception training** — drills on word pairs differing only in tone (ปา bpaa "throw" vs ป้า bpâa "aunt") or vowel length. Perception must come **before** production; you can't produce a tone you can't hear.
2. **Pitch contour visualization** — studies on L2 Mandarin (Praat-based, and apps like Yutone/TonePerfect) show that letting learners *see* the native speaker's pitch curve overlaid with their own measurably improves tone production. **Nobody is doing this for Thai** — it's an open differentiator.

### Retrieval + spacing beats everything else
Roediger & Karpicke (2006) and the spaced-retrieval literature: effortful recall at expanding intervals is the highest-leverage technique, and the site already has SM-2. The gaps are in *what* gets retrieved (currently visual-only cards; audio-first recall and speak-aloud recall are stronger for a speaking-focused course) and *where* progress lives (localStorage only).

### Comprehensible input (i+1)
Krashen's input hypothesis: learners acquire fastest from messages slightly above their level. The site has almost no *listening* content beyond single phrases — no dialogues, no slow/native-speed toggle.

### Habit formation (Duolingo's published research)
- A 7-day streak makes a learner **2.4× more likely** to return the next day.
- One missed day doesn't kill a habit — two or three in a row does → streak-freeze/repair mechanics matter.
- Pacing beats binging: learners who binge abandon at higher rates; small daily goals (5 min) win.
- Habit forms in ~2–4 weeks of consistent same-context repetition — daily reminders in the learner's channel (LINE/WhatsApp/email) are the trigger.

## 3. Tech feasibility findings (Thai-specific)

| Capability | Verdict |
|---|---|
| Azure Pronunciation Assessment for Thai | ❌ **Not supported** (th-TH absent from the supported list). Automated phoneme-level scoring is off the table. |
| Thai speech-to-text (Azure, Google, Whisper) | ✅ Supported. Enables an **intelligibility check**: learner speaks → STT transcribes → compare to target phrase → "a Thai listener would have understood you." |
| Neural Thai TTS | ✅ Azure has 5 th-TH neural voices (incl. MAI-Voice-2 voices with emotion styles); ElevenLabs supports Thai with the most natural output. Pre-generating MP3s at build time makes runtime cost ≈ $0. |
| Pitch contour extraction | ✅ **Fully client-side and free** via Web Audio API autocorrelation — no API, no backend. RecordCompare already captures the audio. |

## 4. Prioritized recommendations

### Tier 1 — Highest learning impact, plays to your unique strengths
1. **Tone trainer with pitch-curve feedback.** Extend RecordCompare: draw the native speaker's pitch contour, record the learner, overlay their contour. Client-side Web Audio API — zero running cost. This is the Mandarin-app playbook applied to Thai, where no competitor does it.
2. **Minimal-pair listening drills.** New quiz type: play audio, learner picks which word/tone they heard. Start with the classic Thai confusion sets (tone pairs, vowel length, aspirated/unaspirated). Cheap to build with the existing QuizBlock pattern.
3. **Replace TTS with real recorded audio for core phrases** (or pre-generated neural TTS as fallback). For a tonal language, model audio quality is not cosmetic — it's the curriculum. Recording the actual teacher also markets the paid lessons.

### Tier 2 — Strengthen the loop you already have
4. **Move SRS progress to Supabase** (keep localStorage as offline cache). Unlocks: cross-device continuity, and the teacher dashboard showing each student's weak phrases — which makes paid lessons better and stickier.
5. **Audio-first and speak-aloud card types.** Hear Thai → recall meaning; see English → say it in Thai (mic + Thai STT intelligibility check).
6. **Missions feed the SRS deck.** Finish "Order coffee" → those phrases automatically enter your review queue. Closes the learn→retain loop.
7. **Streak repair + daily reminder opt-in** (LINE/WhatsApp fits the Chiang Mai audience). Small daily goal framing ("5 minutes").

### Tier 3 — Content depth
8. **More missions** (4 → 10–12: pharmacy, landlord, motorbike taxi, 7-Eleven, immigration small talk…). The format is proven; volume is the constraint.
9. **Listening dialogues at i+1** with slow/native speed toggle and tap-for-translation.
10. **Weekly can-do checkpoints** ("Order a coffee entirely in Thai") that route users to book a trial lesson to verify with a human — connecting free learning to the paid funnel.

## 5. Suggested build order

`1 → 2 → 3` form one coherent "hear and produce Thai tones" release (the voice-practice branch is already pointed here). Then `4 → 6` (Supabase progress + mission→SRS), then reminders and content expansion.

## Sources

- [Preply — Thai minimal pairs](https://preply.com/en/blog/thai-minimal-pairs/)
- [Ling — What makes Thai hard to learn](https://ling-app.com/blog/thai-hard-to-learn/)
- [Talkpal — Mastering Thai tone rules](https://talkpal.ai/mastering-thai-tone-rules-a-simple-guide-to-perfect-pronunciation/)
- [ResearchGate — Visualization of tone for learning Mandarin Chinese](https://www.researchgate.net/publication/305506851_Visualization_of_tone_for_learning_Mandarin_Chinese)
- [Yutone — real-time pitch feedback for Mandarin](https://yutone.app/) · [TonePerfect](https://toneperfect.app/features)
- [Frontiers in Education — Spaced retrieval with A1 adult learners (2025)](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2025.1715111/full)
- [The Language Gym — Top 10 research-backed instructional techniques](https://gianfrancoconti.com/2025/03/27/the-science-of-modern-language-teaching-success-the-top-10-research-backed-instructional-techniques/)
- [Duolingo blog — How streaks keep learners committed](https://blog.duolingo.com/how-streaks-keep-duolingo-learners-committed-to-their-language-goals/) · [The streak & habit research](https://blog.duolingo.com/how-duolingo-streak-builds-habit/)
- [Science Based Learning — Building a language app habit](https://www.sciencebasedlearning.com/blog/language-learning-app-habit)
- [Microsoft Learn — Azure Speech language support](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support) (Thai: STT/TTS ✅, Pronunciation Assessment ❌)
- [ElevenLabs — Thai text to speech](https://elevenlabs.io/text-to-speech/thai)
- [Speechmatics — Best TTS APIs 2026 comparison](https://www.speechmatics.com/company/articles-and-news/best-tts-apis-in-2025-top-12-text-to-speech-services-for-developers)
