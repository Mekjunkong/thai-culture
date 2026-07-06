# Thai Lessons Chiang Mai — Fun Learning Mission Kanban

This board turns the honest critique into buildable missions. The goal is to make the product feel less like a lecture and more like a fun, easy, real-life Thai practice game for Chiang Mai expats.

## Product principle

Do not start with grammar. Start with a real-life win.

**Old feeling:** “Read this lesson about Thai.”  
**New feeling:** “Complete this 5-minute mission and use Thai today.”

## North Star

A beginner expat should be able to open the site, complete one mission in 3–5 minutes, feel confident, and naturally book a live correction lesson with Mike.

## Critique summary

| Current issue | Why it hurts learning | New direction |
|---|---|---|
| Too much text before action | Beginner expats feel like they are studying in a classroom | Start with a situation and one small challenge |
| Phrase tables feel like reference notes | Useful, but boring and easy to forget | Use interactive phrase cards and choices |
| Not enough audio-first learning | Thai pronunciation cannot be learned from romanization only | Listen → repeat → reveal text |
| Lessons feel like curriculum weeks | Sounds academic and slow | Rename as missions with clear outcomes |
| PDF feels like a phrase list | Useful but not exciting | Convert to a 7-day challenge booklet |
| Live lesson room is functional but flat | Teacher can use it, but it needs more energy | Add roleplay randomizer, scores, and reports |

---

# Kanban workflow

## Status meanings

- **Backlog** — useful idea, not ready to build yet
- **Ready** — clear enough to start
- **In progress** — currently being designed/built
- **Review** — needs test with real learner or teacher
- **Done** — shipped and verified

## Priority order

1. Build one polished interactive mission first: **Order Coffee in Chiang Mai**
2. Convert homepage/lessons to mission cards
3. Add audio-first practice
4. Convert PDF into challenge booklet
5. Make live teaching room playful
6. Market the free mission

---

# NOW — Sprint 1: Build the first fun mission

## Mission card 1 — Order Coffee in Chiang Mai

**Status:** Ready  
**Route:** `/missions/order-coffee`  
**Learning promise:** “In 5 minutes, you can order iced coffee less sweet in Thai.”  
**Business goal:** Make the product feel fun immediately and create a reason to book a correction lesson.

### Learner story

As an expat in Chiang Mai, I want to order coffee in simple Thai, so I can feel confident in a real cafe today.

### Screen flow

1. **Scene intro**
   - “You are at a Chiang Mai cafe.”
   - Goal: order one drink with sweetness level.
   - Big button: “Start cafe mission”

2. **Choose your drink**
   - Iced coffee — กาแฟเย็น
   - Thai tea — ชาไทย
   - Water — น้ำเปล่า
   - Smoothie — สมูทตี้

3. **Choose sweetness**
   - Normal sweet — หวานปกติ
   - Less sweet — หวานน้อย
   - No sugar — ไม่ใส่น้ำตาล

4. **Build my Thai phrase**
   - Pattern: `เอา + drink + หนึ่งแก้ว + sweetness + ครับ/ค่ะ`
   - Example: `เอากาแฟเย็นหนึ่งแก้ว หวานน้อยครับ`
   - Show meaning: “I’ll have one iced coffee, less sweet.”

5. **Listen and repeat**
   - Slow audio placeholder
   - Natural audio placeholder
   - Checklist:
     - [ ] I listened
     - [ ] I repeated 3 times
     - [ ] I can say it without looking

6. **Cafe staff roleplay**
   - Staff asks: `เอาอะไรคะ?` — “What would you like?”
   - Learner chooses correct answer from 3 options

7. **Success badge**
   - “Cafe Mission Complete”
   - “Today’s Thai win: I can order a drink in Thai.”

8. **Booking CTA**
   - “Want Mike to correct your pronunciation? Send a WhatsApp voice note.”
   - Link to WhatsApp with prefilled text.

### Build tasks

- [ ] Create `/missions/order-coffee` route/page
- [ ] Add mission hero with cafe scene and clear 5-minute promise
- [ ] Add drink choice buttons
- [ ] Add sweetness choice buttons
- [ ] Generate phrase based on selected choices
- [ ] Add polite particle toggle: `ครับ` / `ค่ะ`
- [ ] Add slow/natural audio placeholders
- [ ] Add repeat-3-times checklist using browser state
- [ ] Add roleplay quiz with staff prompt
- [ ] Add completion badge
- [ ] Save completion to `localStorage`
- [ ] Add WhatsApp voice-correction CTA
- [ ] Link mission from homepage
- [ ] Add SEO metadata: “Order coffee in Thai Chiang Mai”
- [ ] Test mobile layout

### Acceptance criteria

- [ ] Learner can complete the page in 3–5 minutes
- [ ] Page has at least 5 interactive actions
- [ ] Text blocks are short; no large lecture sections
- [ ] A beginner can understand without grammar knowledge
- [ ] Page ends with a clear small win and booking CTA
- [ ] Works on mobile
- [ ] `npm run lint` passes
- [ ] `npm run build` passes

### Marketing hook after shipped

- Facebook post title: “Free 5-minute Thai mission: order coffee in Chiang Mai”
- Reel/TikTok hook: “Can you order coffee in Thai before this video ends?”

---

# NEXT — Sprint 2: Turn course into mission cards

## Mission card 2 — Redesign homepage around missions

**Status:** Ready  
**Goal:** Make the first impression feel playful and action-based.

### Current problem

The homepage explains the course, but learners should immediately see practical missions they can complete.

### New homepage section

Title: **Choose today’s Thai mission**

Cards:

1. **Say hello without feeling awkward**
   - Time: 3 minutes
   - Skill: greeting + wai + polite ending
   - CTA: Start mission

2. **Order coffee less sweet**
   - Time: 5 minutes
   - Skill: drink + sweetness + polite order
   - CTA: Start mission

3. **Buy mangoes at a market**
   - Time: 5 minutes
   - Skill: ask price + quantity
   - CTA: Start mission

4. **Tell a driver where to stop**
   - Time: 5 minutes
   - Skill: directions + stop here
   - CTA: Start mission

### Build tasks

- [ ] Add mission card section near top of homepage
- [ ] Replace “course week” language above the fold with “mission” language
- [ ] Add time labels: 3 min / 5 min / 7 min
- [ ] Add difficulty labels: Easy / Real Life / Challenge
- [ ] Link coffee card to `/missions/order-coffee`
- [ ] Keep SEO phrase “Thai Lessons Chiang Mai” visible
- [ ] Keep pricing and WhatsApp CTA visible

### Acceptance criteria

- [ ] Homepage feels like “try something now,” not “read about a course”
- [ ] At least one mission is immediately clickable
- [ ] Visitor understands the offer in 10 seconds

---

# NEXT — Sprint 3: Audio-first practice

## Mission card 3 — Add audio before long explanations

**Status:** Backlog until first mission UI is shipped  
**Goal:** Make Thai pronunciation easier and less dependent on romanization.

### Build tasks

- [ ] Record teacher/native audio for core coffee phrases
- [ ] Add slow-speed and natural-speed versions
- [ ] Add reusable audio button component
- [ ] Add “listen first, then reveal text” pattern
- [ ] Add audio to Week 1–4 key phrases
- [ ] Add QR/audio links in PDF after audio is live

### Acceptance criteria

- [ ] Every core mission phrase has audio
- [ ] Learner can practice without reading first
- [ ] Audio works on mobile browsers

---

# NEXT — Sprint 4: Replace lecture tables with phrase cards

## Mission card 4 — Phrase cards instead of large tables

**Status:** Backlog  
**Goal:** Make phrase practice feel lighter and interactive.

### Build tasks

- [ ] Create reusable `PhraseCard` component
- [ ] Card front: Thai phrase only
- [ ] Buttons: Show meaning, Show romanization, Play audio, I can say it
- [ ] Save “I can say it” state in `localStorage`
- [ ] Convert Week 1 phrases into cards
- [ ] Convert Week 2 phrases into cards
- [ ] Keep a small reference table at bottom only

### Acceptance criteria

- [ ] Learner sees one phrase at a time
- [ ] Lesson pages feel visually lighter
- [ ] Learner can mark progress

---

# NEXT — Sprint 5: Game progress and confidence

## Mission card 5 — Add mission progress and badges

**Status:** Backlog  
**Goal:** Give learners motivation and small wins.

### Build tasks

- [ ] Add mission progress bar
- [ ] Add badge component
- [ ] Add confidence checklist:
  - [ ] I recognize it
  - [ ] I can repeat it
  - [ ] I can say it without looking
  - [ ] I used it in real life
- [ ] Save progress in `localStorage`
- [ ] Add “Today’s Thai win” message
- [ ] Show completed missions on homepage

### Acceptance criteria

- [ ] Learner feels rewarded at the end
- [ ] Progress survives refresh
- [ ] CTA to book correction appears after completion

---

# NEXT — Sprint 6: Convert PDF into challenge booklet

## Mission card 6 — 7-Day Chiang Mai Thai Challenge

**Status:** Backlog  
**Goal:** Make the PDF feel like an activity product, not only a phrase list.

### New title

**50 Thai Phrases for Chiang Mai Life: 7-Day Challenge**

### Daily challenge plan

- Day 1: Greet 3 people politely
- Day 2: Order one drink
- Day 3: Ask one price at a market
- Day 4: Tell a driver where to stop
- Day 5: Ask for help or the bathroom
- Day 6: Introduce yourself simply
- Day 7: Record a 60-second Thai survival story

### Build tasks

- [ ] Add daily challenge pages
- [ ] Add checkboxes
- [ ] Add reflection prompts
- [ ] Add “record your voice” task
- [ ] Add WhatsApp CTA for correction
- [ ] Add printable certificate page
- [ ] Regenerate PDF

### Acceptance criteria

- [ ] PDF has one clear action per day
- [ ] It feels like a guided challenge
- [ ] It naturally leads to live lesson booking

---

# NEXT — Sprint 7: Make live lessons playful

## Mission card 7 — Playful online teaching room

**Status:** Backlog  
**Goal:** Help Mike teach lively private lessons without preparing slides.

### Build tasks

- [ ] Add “spin the situation” randomizer: cafe, market, taxi, condo, temple
- [ ] Add random roleplay cards
- [ ] Add correction buttons: tone, particle, speed, confidence
- [ ] Add student score: pronunciation / politeness / confidence
- [ ] Add one-click WhatsApp lesson report generator
- [ ] Add next-lesson recommendation generator

### Acceptance criteria

- [ ] Teacher can run a lesson from one page
- [ ] Student sees clear feedback
- [ ] Follow-up message is easy to send after class

---

# REVIEW — Real learner testing checklist

After the coffee mission is live, test with 3 people.

## Test questions

- [ ] Can they finish without help?
- [ ] Do they smile or feel it is fun?
- [ ] Can they say the phrase after 5 minutes?
- [ ] Do they understand when to use it?
- [ ] Would they send a voice note for correction?
- [ ] Would they pay for a live lesson?

## Success target

- 2 out of 3 testers complete mission without explanation
- 2 out of 3 can say the phrase from memory
- 1 out of 3 asks about live lesson or correction

---

# DONE

- [x] Honest critique created: `docs/fun-learning-critique.md`
- [x] Fun-learning kanban created
- [x] Main product kanban links to fun-learning direction

---

# Immediate next action

Build **Mission: Order Coffee in Chiang Mai** at `/missions/order-coffee`, then link it from the homepage as the first free interactive mission.
