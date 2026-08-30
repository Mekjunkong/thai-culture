# SEO Phase 2 Report

Date: 2026-08-30
Branch: `seo/phase-2-content-links`

## Exact changes

- Fixed the phrasebook table-of-contents link in `public/products/50-thai-phrases-chiang-mai.html` from `#greetings-politess` to the existing section ID `#greetings-politeness`.
- Added one clear internal CTA, `View the Starter Pack and book online`, linking to `/book` near the existing Starter Pack CTA. The existing WhatsApp CTA remains unchanged.
- Changed only the on-site product H2 in `app/products/page.tsx` to `On-site Thai lessons in Chiang Mai`.
- Did not change prices, schemas, claims, routes, package files, auth/API code, or unrelated copy.

## Intent and internal-link rationale

- The corrected TOC target restores navigation to the existing Greetings & politeness section.
- The phrasebook already introduces the Starter Pack. Linking that CTA to the existing `/book` route gives phrasebook readers a direct next step for booking while preserving the WhatsApp option.
- The on-site H2 uses the approved Chiang Mai on-site lesson intent directly; the surrounding existing content continues to provide the supporting lesson details.

## Checks

- `git diff --check` — passed.
- `npm run lint` — passed with no ESLint warnings or errors.
- `npm run build` — passed; Next.js compiled successfully, type checking completed, and 27 routes generated.

## Deployment status

No deploy, commit, or push was performed. The branch is ready for review and deployment through the normal reviewed process.
