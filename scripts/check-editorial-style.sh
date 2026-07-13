#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")/.."

targets=(app components)
legacy_pattern='rounded-(xl|2xl|3xl|\[[^]]+\])|shadow-(md|lg|xl|2xl)|border-\[3px\]|font-black|<h[23][^>]*font-bold'

matches="$(rg -n --glob '*.{ts,tsx}' "$legacy_pattern" "${targets[@]}" || true)"

if [[ -n "$matches" ]]; then
  echo "Editorial style check failed."
  echo "Large rounded cards, heavy shadows, and chunky borders belong to the retired app-shell design:"
  echo "$matches"
  exit 1
fi

if ! rg -q 'font-public antialiased' app/layout.tsx; then
  echo "Editorial style check failed."
  echo "The shared layout must use Public Sans so inner pages match the homepage typography."
  exit 1
fi

root_matches="$(rg -n --glob '*.tsx' '<main className="[^"]*bg-jasmine|<div className="bg-jasmine text-tamarind' app || true)"
if [[ -n "$root_matches" ]]; then
  echo "Editorial style check failed."
  echo "Page canvases must use the homepage paper background:"
  echo "$root_matches"
  exit 1
fi

if rg -q 'logo-mark|next/image' components/ui/BrandLogo.tsx; then
  echo "Editorial style check failed."
  echo "Shared navigation must use the homepage's text wordmark, not the retired icon badge."
  exit 1
fi

if rg -q 'sticky top-0|backdrop-blur|bg-surface/95' components/ui/Navbar.tsx; then
  echo "Editorial style check failed."
  echo "Shared navigation must use the homepage's quiet paper header rather than the floating app chrome."
  exit 1
fi

if rg -q 'inline-flex min-h-11 items-center rounded-full' app/missions --glob '*Mission.tsx'; then
  echo "Editorial style check failed."
  echo "Mission eyebrows must use the homepage label treatment, not a pill badge."
  exit 1
fi

if rg -qi 'kids-app style|kids learning app idea' app/practice/ThaiPracticeApp.tsx; then
  echo "Editorial style check failed."
  echo "Practice copy must describe the learner experience, not the retired kids-app design concept."
  exit 1
fi

if rg -q '<Reveal|import Reveal' app/products/page.tsx; then
  echo "Editorial style check failed."
  echo "Product cards must render in the document immediately instead of leaving below-fold blank regions."
  exit 1
fi

echo "Editorial style check passed."
