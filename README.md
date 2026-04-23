# MarketConnect

MarketConnect is a mobile-first MVP web app for helping customers find local produce vendors in markets where locations and availability change daily. The app focuses on simple discovery, low-bandwidth UX, and quick vendor-side updates.

## Stack

- Next.js
- Tailwind CSS
- Supabase for auth and database
- Mapbox for interactive maps

## MVP features

- Home screen with interactive Mapbox map and clickable vendor markers
- Vendor detail page with status, location, and produce availability
- Vendor authentication flow with Supabase email/password auth
- Vendor dashboard for updating profile, stock, activity status, and current location
- Server-side dashboard persistence with protected vendor mutations
- Supabase auth callback handling and protected dashboard sessions
- Stronger client/server form validation for auth and vendor updates
- Vendor profile photo upload through Supabase Storage
- Supabase schema and seed data for immediate demo data
- Local mock fallback so the UI still works before credentials are configured

## Project structure

```text
app/
  auth/                 Vendor sign in and sign up
  dashboard/            Vendor dashboard UI
  vendors/[slug]/       Vendor detail page
components/
  auth/                 Authentication UI
  dashboard/            Dashboard forms and controls
  map/                  Mapbox map component
  vendors/              Vendor cards and detail views
lib/
  data/                 Mock and Supabase-backed data loading
  supabase/             Browser and server Supabase clients
supabase/
  schema.sql            Tables, indexes, and RLS policies
  seed.sql              Sample vendor and product data
```

## Environment variables

Copy `.env.example` to `.env.local` and add your values:

```bash
cp .env.example .env.local
```

Required:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`

Optional:

- `NEXT_PUBLIC_SUPABASE_VENDOR_PHOTOS_BUCKET` defaults to `vendor-photos`

## Local setup

1. Install dependencies with your package manager:

```bash
npm install
```

2. Start the Next.js dev server:

```bash
npm run dev
```

3. In Supabase SQL editor, run:

```sql
-- first
\i supabase/schema.sql

-- then
\i supabase/seed.sql

-- optional for vendor photo uploads
\i supabase/storage.sql
```

If you are using the Supabase dashboard SQL editor, paste the files in sequence instead of using `\i`.

## Supabase notes

- `public.users` mirrors authenticated users from `auth.users`
- `public.vendors` stores public vendor profile data and daily active state
- `public.products` stores current produce listings
- `public.vendor_locations` stores current vendor location for map display
- Row-level security is included so vendors can manage only their own records
- `supabase/storage.sql` creates a public `vendor-photos` bucket with simple authenticated upload policies

## Current implementation notes

- The customer-facing experience is ready immediately using mock fallback data.
- The auth form is wired to Supabase email/password auth when env vars are set.
- The dashboard is protected when Supabase is configured and saves vendor changes through server actions.
- Dashboard saves are validated on both the client and server before they reach the database.
- Vendor photo uploads work when Supabase Storage is configured and fall back gracefully when it is not.
- If Supabase env vars are missing, the dashboard falls back to demo mode so the MVP can still be explored locally.

## Auth flow notes

- `middleware.ts` refreshes Supabase auth state for dashboard and callback routes.
- `app/auth/callback/route.ts` exchanges the Supabase auth code for a session and returns the vendor to `/dashboard`.
- `app/dashboard/actions.ts` handles vendor profile, location, and produce persistence on the server.

## Easy next extensions

- Reservation requests per product
- Payment links or cashless checkout
- Vendor availability history
- Customer saved vendors and alerts
- Lightweight offline caching for slower networks
