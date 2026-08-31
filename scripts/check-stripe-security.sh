#!/usr/bin/env bash
set -euo pipefail

# Deterministic guardrails for the Stripe review; no network or credentials required.
repo_root="$(cd "$(dirname "$0")/.." && pwd)"
webhook="$repo_root/app/api/stripe/webhook/route.ts"
validation="$repo_root/lib/stripe-validation.ts"
checkout="$repo_root/app/api/stripe/checkout/route.ts"
success="$repo_root/app/checkout/success/page.tsx"

for needle in \
  "constructEvent(body, sig, webhookSecret)" \
  "session.payment_status === 'paid'" \
  "session.mode === 'payment'" \
  "session.metadata?.product === APPROVED_PRODUCT_KEY" \
  "retrieveAndValidateLifetimeSession" \
  "stripe_webhook_events" \
  "status: 'processed'"; do
  grep -Fq "$needle" "$webhook" || grep -Fq "$needle" "$validation"
done

grep -Fq "NEXT_PUBLIC_APP_URL is required in production" "$checkout"
grep -Fq "url.protocol !== 'https:'" "$checkout"
grep -Fq "Access is granted only after the signed Stripe webhook" "$success"

echo "Stripe security static checks passed"
