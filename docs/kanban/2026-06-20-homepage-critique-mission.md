# Kanban Mission: Thai Culture Homepage Upgrade

Date: 2026-06-20
Project: Thai Culture & Language
Source critique: `.impeccable/critique/2026-06-20T06-28-33Z__app-page-tsx.md`

## Mission goal
Turn the current promising course site into a more buyer-ready homepage and learning product flow by fixing trust copy, aligning visuals, and simplifying conversion.

## Board snapshot

### Running

- **Generate homepage banner + warm photo assets**
  - Owner/mode: creative asset generation
  - Acceptance criteria:
    - Landscape banner concept suitable for homepage hero/course path
    - Warm Thai learning photo concept suitable for trust/about/sample section
    - Assets delivered to Mike for review before code integration

### Next

#### 1. Trust/copy fix

- **Title:** Remove prototype/backend language from learner-facing pages
- **Owner/mode:** content + conversion
- **Why:** The site currently exposes MVP/Supabase/Stripe/local-device language, which makes the paid course feel unfinished.
- **Scope:** Homepage pricing note, login page, auth form messages, Week 2 label, payment/access reassurance.
- **Acceptance criteria:**
  - No learner-facing copy says `MVP`, `Supabase`, `Stripe configured`, `first version`, `local device`, or `can be added next`.
  - Manual access/payment is explained in buyer-safe language.
  - Login page sells learner benefit: account, access, course continuity.
  - Week 2 status feels intentional, not prototype-like.
- **Suggested Impeccable command:** `impeccable clarify`

#### 2. Visual polish

- **Title:** Make lesson pages feel like the same warm Thai Culture product as the homepage
- **Owner/mode:** frontend/design
- **Why:** Homepage uses jasmine/tamarind/indigo warmth, but lessons rely on generic slate/white SaaS cards.
- **Scope:** Week 1, Week 2, lesson shell, Markdown content, quiz block, audio block, lesson map.
- **Acceptance criteria:**
  - Lesson pages use existing warm brand tokens where practical.
  - Generic `slate-*`/white-card feel is reduced.
  - Lesson map and audio sections feel calm, cultural, and course-like.
  - Accessibility/focus states remain intact.
- **Suggested Impeccable command:** `impeccable polish`

#### 3. Homepage conversion

- **Title:** Simplify homepage path and add trust/sample proof
- **Owner/mode:** conversion + frontend
- **Why:** The first screen has multiple CTAs and not enough concrete proof for a paid course.
- **Scope:** Hero CTA hierarchy, course path, sample audio/photo area, buyer reassurance, planned week cards.
- **Acceptance criteria:**
  - Primary route is clear: Try Week 1 → hear/sample practice → unlock lifetime access.
  - Payment/access reassurance is visible near pricing.
  - Planned weeks are not dead `href="#"` cards.
  - Homepage has at least one warm visual asset or placeholder-ready art direction.
- **Suggested Impeccable command:** `impeccable layout` then `impeccable harden`

### Waiting

- **Real Supabase values from Mike's laptop**
  - Waiting on: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
  - Not blocking: design/copy/frontend mission
  - Blocking: real production auth verification

### Review

- **Mike review of generated banner/photo assets**
  - Decision needed: approve one/both images for homepage integration, or revise style.

### Done

- Critique completed and archived.
- Supabase setup checklist created in `SUPABASE_SETUP.md`.
- Build/lint previously passed after Supabase wiring changes.

## Recommended execution order

1. Trust/copy fix first, highest buyer-trust impact.
2. Homepage conversion second, because the copy choices determine the layout.
3. Visual polish third, to make the lesson experience match the improved homepage.
4. Final QA: lint, build, mobile screenshot, live Vercel check after deployment.
