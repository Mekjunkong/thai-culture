#!/usr/bin/env bash
set -euo pipefail

# Deterministic guardrails for the Stripe review; no network or credentials required.
repo_root="$(cd "$(dirname "$0")/.." && pwd)"
webhook="$repo_root/app/api/stripe/webhook/route.ts"
validation="$repo_root/lib/stripe-validation.ts"
checkout="$repo_root/app/api/stripe/checkout/route.ts"
success="$repo_root/app/checkout/success/page.tsx"
auth_cookie="$repo_root/lib/auth-cookie.ts"
auth_route="$repo_root/app/api/auth/session/route.ts"
redirect="$repo_root/lib/safe-redirect.ts"

for needle in \
  "constructEvent(body, sig, webhookSecret)" \
  "session.payment_status === 'paid'" \
  "session.mode === 'payment'" \
  "session.metadata?.product === APPROVED_PRODUCT_KEY" \
  "retrieveAndValidateLifetimeSession" \
  "stripe_webhook_events" \
  "status: 'processed'" \
  "claimed_at" \
  "getStripeMode"; do
  grep -Fq "$needle" "$webhook" || grep -Fq "$needle" "$validation"
done

grep -Fq "NEXT_PUBLIC_APP_URL is required in production" "$checkout"
grep -Fq "url.protocol !== 'https:'" "$checkout"
grep -Fq "Access is granted only after the signed Stripe webhook" "$success"
grep -Fq "safeInternalPath" "$redirect"
grep -Fq "safeInternalPath" "$repo_root/components/auth/AuthForm.tsx"
grep -Fq "safeInternalPath" "$repo_root/app/auth/callback/page.tsx"
! grep -Fq "document.cookie" "$auth_cookie"
grep -Fq "httpOnly: true" "$auth_route"
grep -Fq "event.livemode !== keyIsLive" "$webhook"
grep -Fq "status: 'failed'" "$webhook"

echo "Stripe security static checks passed"
