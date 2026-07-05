# Thai Culture Language App

A practical Thai language course for foreigners — built around the cultural context that makes the language make sense.

**Live focus:** Week 1 (greetings, wai, politeness particles) is free. Week 2 (numbers, prices, colors, daily objects) is browsable. Weeks 3–4 are planned.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Auth:** Supabase Auth (email/password + Google OAuth)
- **Database:** Supabase (profiles, lessons, progress, subscriptions)
- **Payments:** Stripe (checkout ready, not yet wired to a price)
- **Styling:** Tailwind CSS
- **Content:** Markdown lessons via `react-markdown` + `remark-gfm`

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # fill in Supabase + Stripe keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For the live Supabase connection steps, see [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md).

## Curriculum

| Week | Topic | Status |
|------|-------|--------|
| 1 | Greetings, wai & politeness particles | Free |
| 2 | Numbers, prices, colors & daily objects | Built |
| 3 | Ordering food and handling spice levels | Planned |
| 4 | Temple, market and local etiquette | Planned |

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `NEXTAUTH_SECRET` | Random secret for NextAuth |
| `NEXTAUTH_URL` | App base URL |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
