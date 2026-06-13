-- ============================================================
-- Thai Culture & Language — Supabase Schema
-- Run via: supabase db push  OR  paste into Supabase SQL editor
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────────
create table if not exists public.profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  email             text not null,
  full_name         text,
  avatar_url        text,
  subscription_tier text not null default 'free'
                      check (subscription_tier in ('free', 'pro', 'lifetime')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Auto-create profile on sign-up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────
-- LESSONS
-- ─────────────────────────────────────────────
create table if not exists public.lessons (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  week         integer not null default 1,
  description  text,
  content_url  text,        -- path to markdown file (e.g. /content/lessons/week-1/content.md)
  video_url    text,        -- YouTube ID or hosted URL
  audio_url    text,        -- path to /public/assets/audio/
  is_free      boolean not null default false,
  sort_order   integer not null default 0,
  published_at timestamptz,
  created_at   timestamptz not null default now()
);

-- Seed Week 1 lesson
insert into public.lessons (slug, title, week, description, is_free, sort_order, published_at)
values (
  'week-1-greetings',
  'Greetings & Politeness Particles',
  1,
  'Learn สวัสดี (sawasdee), the wai gesture, and the essential politeness particles ครับ/ค่ะ.',
  true,
  1,
  now()
) on conflict (slug) do nothing;

-- ─────────────────────────────────────────────
-- PROGRESS
-- ─────────────────────────────────────────────
create table if not exists public.progress (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null references public.profiles(id) on delete cascade,
  lesson_id               uuid not null references public.lessons(id) on delete cascade,
  completed               boolean not null default false,
  quiz_score              integer check (quiz_score between 0 and 100),
  last_position_seconds   integer not null default 0,
  completed_at            timestamptz,
  created_at              timestamptz not null default now(),
  unique (user_id, lesson_id)
);

-- ─────────────────────────────────────────────
-- SUBSCRIPTIONS
-- ─────────────────────────────────────────────
create table if not exists public.subscriptions (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null references public.profiles(id) on delete cascade unique,
  stripe_customer_id      text unique,
  stripe_subscription_id  text unique,
  status                  text not null default 'active'
                            check (status in ('active','canceled','past_due','trialing','incomplete')),
  plan                    text not null
                            check (plan in ('monthly','annual','lifetime')),
  current_period_start    timestamptz,
  current_period_end      timestamptz,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────
alter table public.profiles     enable row level security;
alter table public.lessons      enable row level security;
alter table public.progress     enable row level security;
alter table public.subscriptions enable row level security;

-- profiles: users can only read/update their own
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- lessons: free lessons readable by all auth'd users; paid lessons only for pro/lifetime
create policy "lessons_free" on public.lessons for select
  using (is_free = true or exists (
    select 1 from public.profiles
    where id = auth.uid() and subscription_tier in ('pro','lifetime')
  ));

-- progress: users own their own progress rows
create policy "progress_own" on public.progress for all using (auth.uid() = user_id);

-- subscriptions: users read their own
create policy "subscriptions_own" on public.subscriptions for select using (auth.uid() = user_id);
