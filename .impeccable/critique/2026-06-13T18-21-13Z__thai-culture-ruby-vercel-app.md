---
target: "https://thai-culture-ruby.vercel.app/"
total_score: 34
p0_count: 0
p1_count: 2
timestamp: 2026-06-13T18-21-13Z
slug: thai-culture-ruby-vercel-app
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Week readiness is visible, but the old page used internal MVP wording. |
| 2 | Match System / Real World | 4 | Thai scenes, wai, prices, and social ease now map directly to learner situations. |
| 3 | User Control and Freedom | 3 | Primary lesson routes are clear; planned weeks remain non-clickable. |
| 4 | Consistency and Standards | 3 | CTAs, lesson cards, focus states, and navigation are more consistent after polish. |
| 5 | Error Prevention | 3 | Planned weeks no longer feel like broken paths, but checkout remains future-facing. |
| 6 | Recognition Rather Than Recall | 4 | Curriculum cards now explain situation and outcome without requiring prior knowledge. |
| 7 | Flexibility and Efficiency | 3 | Week 1 and Week 2 are reachable from hero, nav, cards, and offer. |
| 8 | Aesthetic and Minimalist Design | 4 | Stronger hierarchy and cultural specificity without extra gimmicks. |
| 9 | Error Recovery | 2 | No major error paths on homepage; deeper app states still need later hardening. |
| 10 | Help and Documentation | 4 | Page now teaches what the course does and why culture matters. |
| **Total** | | **34/40** | **Strong landing/app hybrid after redesign.** |

#### Anti-Patterns Verdict

**LLM assessment:** The original page was clear but looked like a generic blue-and-cream course/SaaS landing page. It used internal MVP language and identical cards, so the cultural promise was stronger than the visual experience. The redesign moves it toward a warmer Thai learning surface with real situational examples, stronger type, richer OKLCH color roles, and outcome-driven curriculum cards.

**Deterministic scan:** Attempted `node /root/.hermes/skills/impeccable/scripts/detect.mjs --json app/page.tsx components/ui/Navbar.tsx`; the bundled detector returned `Error: bundled detector not found.` Manual browser and source review were used as fallback.

**Visual overlays:** No overlay available because the detector bundle was unavailable.

#### Overall Impression

The page now feels more like a culturally grounded Thai course and less like a placeholder MVP. The biggest improvement is that the hero and curriculum now show actual learner situations instead of describing the product abstractly.

#### What's Working

- The hero now has a strong emotional hook: respect and confidence, not generic language learning.
- Thai phrase examples give the page a concrete cultural artifact without using tourism clichés.
- Curriculum cards now explain situation, outcome, readiness, and action in one scan.

#### Priority Issues Addressed

- **[P1] Generic visual identity:** Replaced default blue/cream SaaS feel with jasmine, tamarind, indigo, temple red, turmeric, and banana-leaf OKLCH roles.
- **[P1] Internal MVP copy:** Removed user-facing MVP language and changed the offer to learner-facing confidence copy.
- **[P2] Flat curriculum cards:** Added situation and outcome copy for every week.
- **[P2] Mobile/touch polish:** CTAs and nav targets use 44px+ minimum heights where relevant; mobile screenshots show no horizontal overflow.
- **[P3] Copy polish:** Removed em dashes in touched UI copy and metadata.

#### Persona Red Flags

**Jordan, first-time learner:** The original page did not show enough real examples to prove the course was practical. The new phrase scenes reduce uncertainty before clicking into lessons.

**Maya, foreigner living in Thailand:** The original offer sounded like a product roadmap. The new copy speaks to confidence in daily life, which better matches her motivation.

**Alex, fast scanner:** The original identical cards made weeks hard to compare. The redesigned cards expose week, situation, status, outcome, and action.

#### Minor Observations

- Week 3 and Week 4 still need real lesson pages before they should become active links.
- Audio and video placeholders still exist inside lesson pages. They are acceptable for MVP, but they are the next trust gap.
- Future checkout copy should become more concrete once the price and full course scope are final.

#### Questions to Consider

- Should the next pass add real local imagery or keep the current text-led artifact style?
- Should Week 3 food/café Thai become the next build priority before checkout?
- Should the full course offer mention the ₪ price once the sales page is ready?
