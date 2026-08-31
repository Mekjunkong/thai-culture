# Stripe security prerequisites

Stripe remains disabled until all of these are true:

1. Apply `supabase/migrations/20260831000000_stripe_webhook_events.sql` to the intended Supabase project. The webhook deliberately returns `503` while this event-idempotency table is unavailable.
2. Regenerate `lib/database.types.ts` from the applied schema if the project uses generated types.
3. Set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_LIFETIME`, and the Supabase service-role configuration in the server environment. Never expose secret values to the client.
4. In production set `NEXT_PUBLIC_APP_URL=https://thai-culture-ruby.vercel.app` (the checkout route rejects other origins and all HTTP origins). Local development may use `http://localhost:3000`.
5. Configure the Stripe webhook endpoint and test signature delivery only after the migration and environment checks are complete. No production activation is performed by this change.

The migration includes a retryable `failed` state and a ten-minute processing lease. If a handler crashes, a later delivery can reclaim the event; apply the migration before enabling the endpoint. Stripe test events must use an `sk_test_` key, and live events must use an `sk_live_` key; mismatches are rejected.

## Access enforcement status

The existing `/lessons/week-*` routes remain public previews for SEO and product discovery. This change does **not** claim those pages are protected. The webhook grants the `lifetime` profile/subscription state only after strict Stripe object validation, profile existence validation, and event-level idempotency.

A full-course protected delivery route still requires an agreed auth/content architecture (and likely moving paid lesson content out of the public bundle). Until that work is designed and deployed, paid access must not be represented as enforced on the current public lesson routes.
