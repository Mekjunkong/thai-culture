# Protected learner access boundary

`/lessons` and `/lessons/week-*` remain intentionally public free-preview routes for SEO. They are not paid-content protection and must not be described as protected.

The protected delivery foundation is:

- `/learn` — server-rendered learner home.
- `/learn/[slug]` — server-rendered lesson delivery for the four allowlisted slugs (`week-1` through `week-4`).
- The route reads the Supabase access token from the browser session cookie, verifies it with Supabase Auth, then reads the matching `profiles.subscription_tier` server-side with the service-role client. Only `lifetime` is entitled.
- Missing/invalid auth, missing profile, pending entitlement, missing server configuration, and unprocessed payment all resolve to a non-content access message.
- The browser cookie is only a bearer token; it is never treated as proof of payment. Supabase verifies it, and the server checks the profile entitlement.

## Content boundary

Each course lesson has two Markdown sources under `content/lessons/week-*`:

- `preview.md` is the limited, useful content rendered by public `/lessons/week-*` routes.
- `full.md` is rendered only by `/learn/[slug]`, after verified Supabase authentication and `profiles.subscription_tier = 'lifetime'` access.

`lib/course-content.ts` is the single allowlisted content model. The protected route remains dynamic and reads `full.md` only after the entitlement check; invalid slugs resolve to `notFound()` before any content read. The deterministic `npm run check:course-content` check verifies the four-slug allowlist, source split, preview markers, and route wiring.

## Activation prerequisite

Do not apply migrations as part of this change. Before live activation, apply the existing SQL migration that creates `stripe_webhook_events` (and confirm the base `schema.sql` is installed), configure Supabase/Stripe server environment variables, and verify that the signed webhook updates the purchaser's profile to `subscription_tier = 'lifetime'`. Checkout success only reports payment verification; it never grants access by itself.
