# Supabase connection checklist

Use this when connecting the Thai Culture app to a real Supabase project.

## 1) Create/apply the database schema

In Supabase Dashboard → SQL Editor, paste and run `schema.sql` from this repo.

The schema creates:

- `profiles` auto-created from `auth.users`
- `lessons`
- `progress`
- `subscriptions`
- Row Level Security policies for learner-owned data

## 2) Set app environment variables

In Vercel → Project → Settings → Environment Variables → Production, set real values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=https://thai-culture-ruby.vercel.app
NEXTAUTH_URL=https://thai-culture-ruby.vercel.app
```

Important: do not leave Vercel values as empty strings (`""`). The app treats empty/placeholder values as not connected and falls back to local-device login.

## 3) Enable Supabase auth providers

### Email/password

Supabase Dashboard → Authentication → Providers → Email:

- Enable Email provider
- For fastest MVP testing, disable email confirmation; for production, enable confirmation after testing redirects.

### Google OAuth

Supabase Dashboard → Authentication → Providers → Google:

- Enable Google provider
- Add the Google Client ID and Client Secret

Google Cloud Console → OAuth Client → Authorized redirect URI:

```text
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```

Supabase Dashboard → Authentication → URL Configuration:

- Site URL: `https://thai-culture-ruby.vercel.app`
- Redirect URLs:

```text
https://thai-culture-ruby.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

## 4) Verify

After redeploying Vercel:

1. Open `/login`
2. Create an email/password account
3. Confirm a new row appears in `public.profiles`
4. Try Google login and confirm it returns to `/auth/callback`, then redirects to `/lessons/week-1`

## Current code behavior

- If Supabase env vars are missing, placeholder, or empty, login falls back to local-device mode.
- If real env vars are present, email/password and Google login use Supabase Auth.
- Stripe webhook writes subscription changes through the Supabase service-role server client.
