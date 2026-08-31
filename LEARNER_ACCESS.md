# Protected learner access boundary

`/lessons` and `/lessons/week-*` remain intentionally public free-preview routes for SEO. They are not paid-content protection and must not be described as protected.

The protected delivery foundation is:

- `/learn` — server-rendered learner home.
- `/learn/[slug]` — server-rendered lesson delivery for the four allowlisted slugs (`week-1` through `week-4`).
- The route reads the Supabase access token from the browser session cookie, verifies it with Supabase Auth, then reads the matching `profiles.subscription_tier` server-side with the service-role client. Only `lifetime` is entitled.
- Missing/invalid auth, missing profile, pending entitlement, missing server configuration, and unprocessed payment all resolve to a non-content access message.
- The browser cookie is only a bearer token; it is never treated as proof of payment. Supabase verifies it, and the server checks the profile entitlement.

## Current content boundary blocker

The repository Markdown used by `/learn/[slug]` is also currently rendered by the public preview routes. Therefore this slice creates a real server-side entitlement gate for the learner delivery boundary, but it does **not** make the Markdown exclusive. Before calling the paid course content-protected, split or replace the public preview content and keep only the full content behind `/learn/[slug]`.

## Activation prerequisite

Do not apply migrations as part of this change. Before live activation, apply the existing SQL migration that creates `stripe_webhook_events` (and confirm the base `schema.sql` is installed), configure Supabase/Stripe server environment variables, and verify that the signed webhook updates the purchaser's profile to `subscription_tier = 'lifetime'`. Checkout success only reports payment verification; it never grants access by itself.
