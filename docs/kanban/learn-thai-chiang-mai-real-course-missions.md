# Kanban Missions — Learn Thai Chiang Mai Real Course + PDF Product

Purpose: turn the current Thai Culture app into a real sellable Thai-for-expats course business with online lessons, printable/PDF products, and a clear sales funnel.

## Board columns

- **Backlog** — valuable but not started
- **Ready** — scoped, can start now
- **Doing** — actively being built
- **Review** — needs Mike/QA review
- **Done** — verified and usable

---

## Mission 1 — Product offer and curriculum lock

**Status:** Ready  
**Owner/mode:** Product + content

**User value:** A learner understands what they will get and why it is worth paying for.

**Scope:**
- Finalize course name: **Learn Thai Chiang Mai**
- Finalize core paid package: **Thai for Chiang Mai Life — Starter Pack**
- Lock Week 1–4 beginner curriculum
- Define self-study vs live lesson paths

**Acceptance criteria:**
- Course promise fits on one line
- Week 1–4 topics have outcomes, lesson assets, and practice exercises
- Prices are visible and match the website
- Manual checkout path is documented

**Dependencies:** None

**Risk:** If curriculum becomes too broad, launch will slow down. Keep it beginner/practical.

---

## Mission 2 — Real lesson content: Week 3 and Week 4

**Status:** Ready  
**Owner/mode:** Content

**User value:** The paid course feels complete beyond the free preview.

**Scope:**
- Week 3: ordering food, spice levels, allergy/diet phrases, paying politely
- Week 4: markets, temples, local etiquette, directions, respectful behavior
- Add phrases, romanization, English meaning, culture notes, and quiz questions

**Acceptance criteria:**
- Week 3 and Week 4 pages exist in the app
- Each lesson has at least 15 phrases and 5 practice prompts
- Each lesson has a quiz/checkpoint
- Beginner wording is clear and not academic

**Dependencies:** Mission 1

**Risk:** Tone explanations must be respectful and not stereotype Thai culture.

---

## Mission 3 — Audio practice product

**Status:** Ready  
**Owner/mode:** Content + media

**User value:** Learners can hear and repeat real phrases, making the course feel more complete.

**Scope:**
- Record/generate short MP3 practice tracks for each week
- Add audio blocks to lesson pages
- Create “listen → repeat → use it” practice structure

**Acceptance criteria:**
- At least 2 audio files per week
- Audio loads on desktop/mobile
- Every audio block includes transcript and practice instruction
- Build passes after adding assets

**Dependencies:** Mission 2 for Week 3–4 scripts

**Risk:** Bad audio quality lowers trust. Use clean, short tracks.

---

## Mission 4 — PDF lead magnet: 50 Thai phrases for Chiang Mai life

**Status:** Doing / first HTML draft created
**Owner/mode:** Content + design

**User value:** A free or low-cost downloadable product collects leads and gives immediate value.

**Scope:**
- Create printable HTML/PDF phrasebook
- Sections: greetings, food, market, transport, politeness, emergency/help, WhatsApp booking
- Add QR/CTA back to booking page

**Acceptance criteria:**
- HTML product exists under `/products/50-thai-phrases-chiang-mai.html`
- Printable PDF can be generated from the HTML
- Includes at least 50 useful phrases
- CTA includes WhatsApp and Starter Pack offer

**Dependencies:** Mission 1 pricing

**Risk:** PDF must look professional enough to share, not like notes.

---

## Mission 5 — Online teaching classroom HTML

**Status:** Doing / first HTML draft created
**Owner/mode:** Teaching ops + content

**User value:** Mike has a practical teaching page to use during Zoom/Google Meet/in-person lessons.

**Scope:**
- Build a single-page teacher console
- Include lesson flow, warmup, phrases, roleplays, homework, booking CTA
- Keep it browser-only and printable

**Acceptance criteria:**
- HTML exists under `/teach-online/index.html`
- Works without login
- Has 60-minute lesson plan
- Has roleplay prompts for cafe/market/taxi/greetings
- Can be screen-shared during online class

**Dependencies:** Mission 1

**Risk:** Too much content on one screen. Keep sections scannable.

---

## Mission 6 — Sales page conversion pass

**Status:** Ready
**Owner/mode:** Frontend + conversion

**User value:** Visitors understand the offer and can book quickly.

**Scope:**
- Homepage hero clear: Learn Thai in Chiang Mai + online
- Add pricing cards
- Add WhatsApp CTA
- Add links to free lesson, phrasebook, and teacher page if public
- Add testimonials section placeholder

**Acceptance criteria:**
- Above-the-fold CTA visible on mobile
- Pricing visible without login
- WhatsApp opens with prefilled booking message
- SEO title/description use Learn Thai Chiang Mai

**Dependencies:** Mission 4–5 if linking resources publicly

**Risk:** Too many CTAs. Primary CTA should remain WhatsApp booking.

---

## Mission 7 — Payment and access MVP

**Status:** Backlog
**Owner/mode:** Backend + ops

**User value:** Learners can pay and get access reliably.

**Scope:**
- Manual payment first: WhatsApp → PromptPay/bank transfer/cash → access
- Later: Stripe or payment link if suitable
- Supabase auth/progress setup
- Simple admin SOP for unlocking access

**Acceptance criteria:**
- Manual fulfillment SOP documented
- Supabase env vars configured in Vercel when ready
- No secret keys committed
- Test account can access paid lessons

**Dependencies:** Mission 1 and production deployment

**Risk:** Payment automation can delay launch. Manual first.

---

## Mission 8 — SEO foundation and custom domain

**Status:** Waiting on domain decision
**Owner/mode:** SEO + deployment

**User value:** The business has a memorable and searchable URL.

**Scope:**
- Preferred name: **Learn Thai Chiang Mai**
- Recommended domains:
  1. `learnthaichiangmai.com`
  2. `learnthaicnx.com`
  3. `thaiforexpatschiangmai.com`
  4. `chiangmaithailessons.com`
- Attach chosen domain to Vercel project
- Verify DNS and SSL

**Acceptance criteria:**
- Domain points to the correct Vercel project
- Apex and `www` work if available
- Canonical URL updated to chosen domain
- Production page loads with no SSL warning

**Dependencies:** Mike chooses/owns/buys a domain

**Risk:** Domain purchase/DNS can take time. Use Vercel URL until domain is ready.

---

## Mission 9 — Launch content sprint

**Status:** Backlog
**Owner/mode:** Marketing

**User value:** First students discover the course.

**Scope:**
- 10 short posts/videos
- 3 Facebook group post variants
- 20 local outreach messages to cafes/coworking/hostels/expat groups
- Free PDF CTA

**Acceptance criteria:**
- 10 posts drafted
- 3 group posts drafted
- Outreach tracker created
- First 5 trial lesson target tracked

**Dependencies:** Mission 4 and deployed page

**Risk:** Avoid spammy group posting. Lead with free value.

---

## Mission 10 — Student feedback and proof loop

**Status:** Backlog
**Owner/mode:** Operations + QA

**User value:** The course improves from real learner questions and builds trust.

**Scope:**
- Run 5 trial lessons
- Ask 3 feedback questions after each
- Collect testimonials
- Turn repeated questions into lesson updates

**Acceptance criteria:**
- Feedback form or simple WhatsApp script exists
- 5 trial sessions logged
- At least 2 testimonials collected
- Course backlog updated from real student problems

**Dependencies:** Missions 5–6 and first marketing push

**Risk:** No feedback means course becomes assumption-driven.
