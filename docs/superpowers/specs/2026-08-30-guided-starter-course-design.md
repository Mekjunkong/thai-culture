# Guided Starter Course — Product Design Specification

**Date:** 2026-08-30  
**Status:** Approved design; implementation not included in this document  
**Product:** ฿690 Self-study Lifetime Course

> **Commercial approval gate:** The price, inclusions, and payment activation described here require Mike's explicit commercial approval before launch. The repository's current Stripe configuration is not proof of an active checkout. Do not represent a payment as successful unless the selected payment flow has been executed and verified in the real environment.

## 1. Product overview

**Guided Starter Course** is a self-study beginner Thai course for people who want a practical, structured way to start speaking in everyday Chiang Mai situations. It is a one-time **฿690** purchase with lifetime access, subject to the commercial approval gate above.

The product combines a guided four-week path with reusable practice: lesson pages, audio, quizzes, and practice materials. The experience should feel like a warm local field guide—clear, useful, and grounded in Chiang Mai—not like a generic SaaS dashboard.

### Included in the approved design

- Four-week beginner course
- Audio practice
- Quizzes and self-checks
- Practice materials and real-life missions/links
- Course home with progress across the four weeks
- Lifetime access after real access has been granted

### Explicitly not included

- Private lessons
- WhatsApp voice correction
- Personal support or individualized coaching
- Subscription billing
- Support upsells inside this product

## 2. Evidence and scope basis

This design is intentionally limited to capabilities and content already evidenced in the repository or explicitly approved:

| Evidence | Design implication |
|---|---|
| `content/lessons/week-1` through `week-4/content.md` exist and cover greetings, prices, food/spice, transport/etiquette | A four-week curriculum is a reasonable content model; content quality and final publication still require review. |
| The lesson content includes goals, phrase tables, dialogues, pronunciation/listening practice, missions, and self-checks | Lesson screens should expose a consistent goal → audio/practice → quiz/check → next lesson rhythm. |
| `public/assets/audio/` contains recordings for Week 1 and Week 2 topics; assets README defines MP3 conventions | Audio is part of the experience, but coverage must be audited before claiming every lesson has final audio. |
| Existing `/lessons`, `/practice`, and `/missions` routes and the product page exist | The paid course can connect to existing free learning surfaces without redesigning the public site in this spec. |
| `schema.sql` has lessons, progress, profiles, subscriptions, and RLS policies | Existing data concepts can inform future implementation, but they do not prove the product is configured or safe to launch. |
| `lib/stripe.ts` contains test fallback Price IDs and a lifetime amount of 69,000 satang | The intended amount is visible in code, but current Stripe config is not evidence of an active, verified checkout. |
| Existing docs describe a free layer and teacher-supported products | The paid course must clearly separate self-study access from private lessons and voice-note correction. |

The repository also contains stale or conflicting readiness signals: the README describes Weeks 3–4 as planned while their markdown files are present, and the existing product page describes other products and support services. These are evidence gaps to resolve during implementation, not reasons to expand this spec or alter public copy now.

## 3. Target user, problem, and outcome

### Target user

A beginner foreign resident, traveler, or new arrival in Chiang Mai who wants a dependable first month of useful Thai, can study independently, and prefers real situations over textbook abstraction. They may have limited time and may not yet know whether they want live lessons.

### Problem

Free resources are fragmented: a learner can find phrases, missions, or lessons but lacks a single, bounded path that answers what to study this week, how to practice it, and whether they are ready to move on. The learner also needs cultural context so that polite Thai is usable rather than merely memorized.

### Intended outcome

After working through the four-week path, a learner should be able to rehearse and attempt foundational Chiang Mai interactions: greet politely, ask and understand common prices, order food or drinks with basic preferences, and handle simple transport/help/etiquette situations. The course promises structured practice and usable foundations; it does **not** promise fluency, personal correction, or guaranteed real-world performance.

## 4. Free vs paid boundary

The boundary must be legible before sign-in or payment and must remain honest during rollout.

### Free access

- Existing free lessons, practice app, and missions that are currently public.
- At minimum, the existing free Week 1 lesson and existing free practice surfaces remain usable without purchasing.
- Public previews may explain the four-week path and show representative lesson structure, but must not imply paid access has been granted.

### Paid access

- The complete Guided Starter Course path, including the paid course home, four-week progress tracking, paid lesson materials, course audio where finalized, quizzes, and practice-material links designated for purchasers.
- Lifetime access means no recurring subscription and no planned expiry after access is granted.

### Boundary rules

- Do not lock content that is currently free merely to manufacture scarcity.
- Do not describe a preview, login, redirect, or unverified payment return as purchase success.
- Do not place private support, WhatsApp correction, or a support upsell in the paid-course promise.
- The exact list of free versus paid lesson/material assets must be approved before implementation; this spec does not silently convert every existing route or asset to paid.

## 5. Product experience and UX/screens

This is a mobile-first information architecture, not an implementation prescription. Existing public routes and copy are out of scope for this spec.

### 5.1 Product explanation / offer page

Purpose: help a prospective learner decide whether the self-study course fits.

Must show:

- Product name and one-time price, marked as pending Mike commercial approval until activated.
- Four-week beginner outcome and what is included.
- Clear “self-study, lifetime access” explanation.
- Clear exclusions: no private lessons, WhatsApp voice correction, or personal support.
- Free preview path and a truthful purchase CTA whose state reflects the actual payment/access setup.
- No fake testimonials, reviews, scarcity, or purchase-success language.

### 5.2 Course home

Purpose: orient the learner after access is verified.

Must show:

- Course title and access status.
- Four-week progress overview with completed, current, and upcoming states.
- A prominent **Start Here** action that works for a first-time learner.
- Week navigation that remains usable on a narrow screen.
- Links to practice materials and missions associated with each week.
- Resume behavior based on the learner's latest recorded progress, without blocking direct navigation.

### 5.3 Start Here

A short orientation should explain:

- How the four-week rhythm works.
- How to use audio, practice, quizzes, and missions.
- That the learner can repeat lessons and progress is not a grade or guarantee.
- How to report a broken link, unclear phrase, or audio issue.

### 5.4 Week and lesson screen

Each lesson should make the same next action obvious while preserving local, editorial character:

1. **Lesson goal** — a concrete situation-based capability.
2. **Learn** — Thai script, romanization where useful, English meaning, cultural context, and examples.
3. **Audio** — an accessible player with clear loading/error states; only label audio as final when the asset has been reviewed.
4. **Practice** — repetition, roleplay, listening, or a linked mission/material.
5. **Quiz/self-check** — a short check with feedback and retry, not a high-stakes assessment.
6. **Next lesson** — explicit continuation plus return to week navigation.

The lesson template should accommodate the evidence already present in markdown: goal, phrase table, dialogue, pronunciation/listening practice, real-life mission, and self-check.

### 5.5 Access and account states

Design distinct states for:

- Visitor viewing free content.
- Signed-out visitor viewing paid-course explanation.
- Signed-in user without verified course access.
- User with verified lifetime access.
- Payment initiated but not yet verified.
- Manual-access request pending review.
- Access revoked or support issue, if that operation is later needed.

No state should imply access merely because a checkout button was clicked or a browser returned from a provider.

## 6. Content structure

### Course-level structure

- Course overview and Start Here
- Week 1: Greetings, wai, and politeness particles
- Week 2: Numbers, prices, colors, and daily objects
- Week 3: Ordering food, coffee, and spice/sweetness preferences
- Week 4: Transport, directions, help, temples, markets, and local etiquette
- Completion/review view focused on revision and next practice, not a fabricated certificate or credential

### Lesson-level content contract

Every published lesson should have:

- A measurable beginner goal.
- Thai script, readable romanization, and plain-English meaning where appropriate.
- Cultural or situational guidance that avoids overgeneralizing Thai people or contexts.
- At least one model dialogue or realistic exchange.
- Audio references that resolve to reviewed assets, or an explicit “audio coming soon” state before launch—not a broken or misleading player.
- Practice activity and a real-life mission or safe substitute rehearsal.
- Quiz/self-check with answer feedback and a retry path.
- A next-lesson link and a route back to course home.

### Content QA requirements

Before paid launch, Mike or an approved Thai-language reviewer should confirm pronunciation/romanization, cultural framing, audio accuracy, links, quiz answers, and mobile readability. Existing markdown is a strong starting source, not final commercial sign-off.

## 7. Delivery and access model options

Only the following MVP models are in scope:

### Option A — Manual payment and access

Mike provides approved payment instructions or confirms payment through an agreed manual channel, then grants lifetime access through an auditable admin process.

**Pros:** can launch without assuming Stripe is live; supports local payment realities.  
**Risks:** operational delay, manual mistakes, need for a clear receipt/access record, and no claim of instant access.

Required UX: payment instructions, “waiting for confirmation” state, expected response window approved by Mike, and a support/contact path that does not promise personal course support.

### Option B — Mike-approved Stripe Payment Link

Use one specific Stripe Payment Link after Mike confirms the product, amount, currency, tax/refund language, destination account, and access-granting workflow. Access must be granted only from a real, verified Stripe event or an explicitly reconciled transaction record.

**Pros:** less manual handling and clearer payment records.  
**Risks:** current code's fallback/test Price IDs do not establish that a live link, live price, webhook, or fulfillment path exists.

Required UX: provider handoff, pending verification state, verified success state, failure/cancellation state, and a recovery path when payment succeeded but access has not yet appeared.

### Not approved for MVP

- Subscription or recurring billing.
- A custom checkout built before the payment/access flow is verified.
- Gating free content while payment operations are still unconfirmed.
- Simulated success, test-mode success presented as production access, or client-only entitlement flags.

## 8. Data, security, and privacy

The minimum data model should distinguish **course entitlement** from generic subscription status. A lifetime purchase is not a recurring subscription, even if existing schema names use `subscriptions` or `subscription_tier`.

### Data minimization

Collect only what is needed to authenticate, fulfill access, save progress, and handle payment reconciliation:

- Account identifier and email supplied by the auth/payment flow.
- Course entitlement status, source, granted/reconciled time, and provider reference where applicable.
- Lesson progress, quiz scores, and last position.
- Operational audit data for manual grants or corrections.

Do not collect voice recordings, identity documents, unnecessary profile details, or behavioral data for this self-study product.

### Security requirements

- Verify payment server-side or through a controlled manual reconciliation process; never trust a client-supplied “paid” flag.
- Keep provider secret keys and webhook secrets server-side; do not expose them in browser bundles or logs.
- Use authenticated authorization checks for paid lesson content and progress writes.
- Preserve row-level ownership so a learner cannot read or modify another learner's profile, entitlement, progress, or payment record.
- Treat provider IDs and emails as sensitive operational data; redact them from analytics and public URLs where possible.
- Make entitlement changes auditable and reversible by an authorized operator.
- Define retention and deletion handling for account, progress, and payment-reconciliation data before launch.

Existing `schema.sql` RLS and auth tables are useful evidence but require a security review against the final entitlement design; they are not acceptance of a new implementation.

## 9. Analytics and feedback

Analytics should answer whether the course is understandable and usable, not surveil learners.

### MVP events (privacy-conscious)

Use anonymous or pseudonymous course identifiers where possible:

- Offer page viewed.
- Start Here opened/completed.
- Week opened.
- Lesson started/completed.
- Audio play/error.
- Practice or mission link opened.
- Quiz submitted and retried (store aggregate result, not answer text unless necessary).
- Access flow entered, verified, failed, or left pending.
- Feedback submitted.

Do not log payment secrets, full payment payloads, raw audio, or unnecessary free-form personal data. Document event names, properties, retention, and consent/legal basis in implementation planning.

### Feedback loop

Provide a lightweight “Was this clear?” or issue-report affordance on lessons. Classify feedback into content accuracy, audio, navigation, quiz, access/payment, and privacy/support expectations. Review early cohort evidence before adding new features. Private support is not part of the product promise, but a bug/access reporting channel is required for a paid product.

## 10. Acceptance criteria

The design is ready for implementation only when all of the following are true:

- The product is named Guided Starter Course and is consistently described as self-study lifetime access.
- The approved price is shown as ฿690 only after Mike commercial approval; no subscription language appears.
- The approved inclusion list is exactly four-week beginner course, audio, quizzes, and practice materials, with no private lessons, WhatsApp voice correction, or personal support promise.
- The free/paid boundary is documented asset-by-asset before any content is gated.
- The proposed screens cover product explanation, course home, four-week progress, Start Here, week navigation, practice/missions links, and lesson goal/audio/practice/quiz/next lesson.
- All four weeks have a content readiness checklist; missing or unreviewed audio is visible rather than represented as complete.
- The design has distinct pending, failed, canceled, and verified access states.
- MVP delivery is limited to manual payment/access or a Mike-approved Stripe Payment Link.
- No public success state can be reached without real verified payment/access evidence.
- Existing free content remains accessible until the paid flow and entitlement checks are proven in the real environment.
- Data collection is minimized, entitlement is separated conceptually from recurring subscriptions, and authorization/audit requirements are defined.
- Analytics and feedback are limited to the stated usability and access questions.
- The visual direction uses the existing sand/ink/clay/honey palette, Thai-readable typography, mobile-first layouts, and a warm editorial Chiang Mai field-guide feel.
- No fake testimonials/reviews, fake payment success, premature gating, price change, subscription, or support upsell is introduced.

## 11. Non-goals

- Implementing routes, components, database migrations, payment code, analytics code, or content rewrites.
- Changing public copy, route names, navigation, pricing elsewhere on the site, or existing product offerings.
- Replacing the free practice app, free lessons, missions, or workbook.
- Building a subscription, private-lesson funnel, WhatsApp correction service, community, certificate system, or personal coaching layer.
- Choosing a payment provider or claiming that Stripe is active.
- Adding testimonials, reviews, urgency, discounts, or a price experiment.
- Locking free content before real access and rollback behavior are verified.

## 12. Risks and mitigations

| Risk | Mitigation |
|---|---|
| The four-week content or audio is incomplete or inconsistent | Run content/audio QA and publish explicit readiness states before paid launch. |
| Learner buys but access is delayed or missing | Use pending/reconciliation states, an auditable grant path, and a recovery procedure. |
| Test/fallback Stripe configuration is mistaken for live commerce | Require Mike approval and a real end-to-end verification record before enabling checkout claims. |
| Existing schema models lifetime access as a subscription | Design entitlement separately; review and migrate deliberately during implementation. |
| Paid gating accidentally blocks free learning | Maintain an explicit free-content allowlist and test signed-out access. |
| Product feels like generic SaaS rather than local learning | Use editorial hierarchy, real Chiang Mai situations, Thai-readable type, and restrained progress UI. |
| Learners expect teacher correction or support | Repeat exclusions at the offer and onboarding points; provide only operational issue reporting. |
| Cultural or language inaccuracies reduce trust | Require Thai-language/audio review and a correction process before launch. |
| Excess analytics creates privacy burden | Track only listed product events, minimize identifiers, and define retention/consent. |

## 13. Business decisions still needed

Mike must decide and record these before implementation or launch:

1. Confirm the commercial offer: **฿690**, one-time, lifetime access.
2. Confirm the exact paid asset list and what remains free, including whether any existing Week 2–4 routes are previews, free, or paid.
3. Confirm final audio coverage and who approves Thai pronunciation/recordings.
4. Choose manual payment/access or a specific Stripe Payment Link for MVP.
5. If Stripe is chosen, confirm live mode, exact product/price/currency, refund/tax wording, account destination, and the verified entitlement/fulfillment mechanism.
6. Define the manual-access operator, review cadence, expected access timing, and reconciliation/audit record.
7. Confirm authentication requirement and account-recovery behavior.
8. Approve privacy notice, data retention/deletion rules, analytics consent/legal basis, and payment-provider disclosures.
9. Approve the operational channel for access problems without turning it into personal course support.
10. Approve content/audio/quiz QA ownership and the minimum launch-readiness threshold.

Until these decisions are made, this document is a product design boundary, not a launch authorization.

## 14. Phased implementation plan

Implementation is intentionally deferred from this commit. Once the business decisions above are approved, use these phases:

### Phase 0 — Commercial and content readiness

- Confirm price, inclusions, free/paid boundary, payment model, refund language, and support expectations.
- Inventory all four weeks, audio, quizzes, practice materials, and links.
- Complete Thai-language, cultural, accessibility, and mobile content QA.
- Write the entitlement and access-state contract before changing routes or database structures.

**Exit evidence:** Mike approval record, content inventory, QA checklist, and selected delivery model.

### Phase 1 — Experience foundation

- Implement the product explanation, course home, Start Here, week navigation, and lesson template.
- Connect existing content and free surfaces without changing public routes/copy outside the approved scope.
- Add truthful loading, missing-audio, error, and progress states.

**Exit evidence:** mobile usability review, accessibility review, and signed-out free-content regression check.

### Phase 2 — Entitlement and delivery

- Implement the chosen manual access flow or Mike-approved Stripe Payment Link integration.
- Add server-side verification/reconciliation, entitlement checks, audit trail, and recovery states.
- Test success, pending, failure, cancellation, duplicate/retry, and revoked-access cases in the appropriate environment.

**Exit evidence:** real verified fulfillment record or documented manual reconciliation run; no client-only success path.

### Phase 3 — Measurement and controlled launch

- Add the approved privacy-conscious analytics and lesson feedback mechanism.
- Run a small controlled cohort with real access and collect usability/content issues.
- Fix blocking content, access, mobile, and privacy issues before wider promotion.

**Exit evidence:** event audit, feedback review, access reconciliation, and Mike's launch approval.

### Phase 4 — Iteration only from evidence

- Review completion, audio errors, quiz retries, access issues, and qualitative feedback.
- Improve clarity and content before adding features.
- Do not add subscriptions, support upsells, testimonials, or price changes without a new commercial decision and updated spec.
