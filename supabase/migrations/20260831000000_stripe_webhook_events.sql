-- DO NOT APPLY IN PRODUCTION UNTIL THE WEBHOOK HANDLER HAS BEEN REVIEWED.
-- This migration is required before Stripe webhook activation.
create table if not exists public.stripe_webhook_events (
  event_id     text primary key,
  event_type   text not null,
  status       text not null default 'processing' check (status in ('processing', 'processed', 'failed')),
  attempts     integer not null default 1,
  claimed_at   timestamptz not null default now(),
  last_error   text,
  processed_at timestamptz,
  created_at   timestamptz not null default now()
);

alter table public.stripe_webhook_events enable row level security;
-- No client-facing policies: only the Supabase service role may access events.
