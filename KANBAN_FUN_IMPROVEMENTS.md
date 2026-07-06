# Thai Lessons Chiang Mai — Fun Learning Improvement Kanban

This board turns the critique into concrete missions. Goal: make the product feel less like a lecture and more like a fun, easy, real-life Thai practice game for expats.

## Product principle

Do not start with a grammar explanation. Start with a real-life mission.

**Old feeling:** “Read this lesson about Thai.”  
**New feeling:** “Can you order coffee in Thai in 5 minutes?”

---

## 🎯 North Star

Create a beginner Thai product where learners can:

1. complete a useful mission in under 5 minutes,
2. hear and repeat Thai before reading long explanations,
3. choose answers and roleplay real situations,
4. feel small wins through badges/checklists,
5. naturally book live correction with Mike.

---

## 🚧 Mission 1 — Build the first fun interactive lesson

### Title
**Mission: Order Coffee in Chiang Mai**

### Why this first
- every expat orders drinks
- easy to understand visually
- useful on day one
- good marketing hook
- easy to connect to live lesson booking

### Tasks
- [ ] Create route `/missions/order-coffee`
- [ ] Add hero scene: “You are at a Chiang Mai cafe. Order iced coffee less sweet.”
- [ ] Add choose-your-drink buttons: iced coffee, Thai tea, water, smoothie
- [ ] Add choose sweetness buttons: normal, less sweet, no sugar
- [ ] Generate the correct Thai phrase from the learner’s choices
- [ ] Add slow audio button placeholder for each phrase
- [ ] Add “repeat 3 times” checklist
- [ ] Add mini roleplay: staff asks “เอาอะไรคะ?” learner chooses response
- [ ] Add success badge: “Cafe Mission Complete”
- [ ] Add CTA: “Send your voice note to Mike for correction”

### Acceptance criteria
- Learner can finish in 3–5 minutes
- Page has more interaction than text
- At least 3 clickable choices
- Ends with clear next action

---

## 🚧 Mission 2 — Redesign lesson structure into mission cards

### Problem
Current lessons are useful but still feel like textbook pages.

### Tasks
- [ ] Rename Week 1 to “Mission: Say Hello Without Feeling Awkward”
- [ ] Rename Week 2 to “Mission: Buy Something at a Market”
- [ ] Rename Week 3 to “Mission: Order Food or Coffee”
- [ ] Rename Week 4 to “Mission: Tell a Driver Where to Stop”
- [ ] Add mission cards at top of homepage
- [ ] Add estimated time per mission: 3 min, 5 min, 7 min
- [ ] Add difficulty labels: Easy, Normal, Real Life
- [ ] Add “Start mission” instead of “Open lesson”

### Acceptance criteria
- Homepage feels action-based, not curriculum-based
- User sees what they can do after each mission
- Mission names are easy for non-language learners to understand

---

## 🚧 Mission 3 — Add audio-first practice

### Problem
Thai cannot be learned well from text only.

### Tasks
- [ ] Record Week 3 audio: cafe order, sweetness, spice levels
- [ ] Record Week 4 audio: driver phrases, help phrases, bathroom phrase
- [ ] Add slow-speed audio and natural-speed audio
- [ ] Add repeat buttons beside key phrases
- [ ] Add “listen first, then reveal text” pattern
- [ ] Add audio QR codes to PDF after audio is live

### Acceptance criteria
- Every core phrase has audio
- Learner can practice without reading first
- PDF connects to audio practice

---

## 🚧 Mission 4 — Make phrase learning card-based

### Problem
Tables are good for reference but boring for learning.

### Tasks
- [ ] Create reusable `PhraseCard` component
- [ ] Show Thai phrase on front
- [ ] Add buttons: Show meaning, Show romanization, Play audio, I can say it
- [ ] Replace long phrase tables on lesson pages with card groups
- [ ] Keep table only as “Reference sheet” at bottom
- [ ] Track simple progress in browser localStorage

### Acceptance criteria
- Learner interacts with phrases one at a time
- Page visually feels lighter
- Student can mark phrases as learned

---

## 🚧 Mission 5 — Add game progress and confidence

### Problem
Learners need visible progress to keep going.

### Tasks
- [ ] Add mission completion badge
- [ ] Add confidence checklist:
  - [ ] I recognize it
  - [ ] I can repeat it
  - [ ] I can say it without looking
  - [ ] I used it in real life
- [ ] Add progress bar on mission pages
- [ ] Add “Today’s Thai win” completion message
- [ ] Add homepage progress cards

### Acceptance criteria
- Learner feels a small win after each mission
- Progress survives page refresh
- CTA to book correction appears after completion

---

## 🚧 Mission 6 — Convert PDF into a challenge booklet

### Problem
Current PDF is useful but list-like.

### Tasks
- [ ] Rename PDF subtitle to “7-Day Chiang Mai Thai Challenge”
- [ ] Add daily challenge pages:
  - [ ] Day 1: greet 3 people
  - [ ] Day 2: order one drink
  - [ ] Day 3: ask one price
  - [ ] Day 4: tell a driver where to stop
  - [ ] Day 5: ask for help
  - [ ] Day 6: introduce yourself
  - [ ] Day 7: record a 60-second Thai survival story
- [ ] Add checkboxes and reflection prompts
- [ ] Add “send voice note to Mike” QR/WhatsApp CTA
- [ ] Add printable certificate page

### Acceptance criteria
- PDF feels like a challenge, not a dictionary
- Learner has one clear task per day
- PDF naturally leads to live lesson booking

---

## 🚧 Mission 7 — Make teaching room playful for live lessons

### Problem
Teaching room is useful, but it can be more dynamic.

### Tasks
- [ ] Add “spin the situation” section: cafe, market, taxi, condo, temple
- [ ] Add roleplay card randomizer
- [ ] Add teacher correction buttons: tone, particle, speed, confidence
- [ ] Add student score: pronunciation / politeness / confidence
- [ ] Add one-click WhatsApp lesson report generator
- [ ] Add “next lesson recommendation” generator

### Acceptance criteria
- Mike can use it live without preparing slides
- Student sees clear feedback
- Follow-up message is easy to send after class

---

## 🔜 Backlog — Marketing after fun lesson exists

- [ ] Record short demo video: “Order coffee in Thai in 30 seconds”
- [ ] Create Facebook post: “Free 5-minute Thai coffee mission for Chiang Mai expats”
- [ ] Create 10 reels/TikTok scripts from the coffee mission
- [ ] Add lead magnet CTA: “Get the 7-Day Chiang Mai Thai Challenge PDF”
- [ ] Collect first 3 student testimonials

---

## Priority order

1. Build `/missions/order-coffee`
2. Add mission cards to homepage
3. Add audio for coffee phrases
4. Convert PDF into challenge booklet
5. Add progress/badges
6. Improve all weeks into mission pages

## Definition of “fun enough”

The product is fun enough when a new visitor can say:

> “Oh, I can try this now. It only takes 5 minutes.”

Not:

> “I need to study this later.”
