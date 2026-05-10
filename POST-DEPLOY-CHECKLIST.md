# Post-Deploy Checklist

Actions that require external dashboards, DNS, or manual verification — anything this codebase cannot do automatically. Grouped by urgency.

## Pre-launch (must complete before May 17, 2026)

### Domain + Vercel

- [ ] Point domain (e.g., `utcrowing.org`) at the Vercel project
- [ ] Set `NEXT_PUBLIC_SITE_URL` env var in Vercel to the final production URL
- [ ] Pin Vercel project to Node 20+ (Next 16 requires it; Node 18 builds fail)
- [ ] Enable Vercel Analytics in the project dashboard (one toggle, free tier)
- [ ] Enable Vercel Web Analytics for the production deployment

### Email (Resend)

- [ ] Verify `radl.solutions` (or chosen sender domain) in the Resend dashboard
- [ ] Update `EMAIL_FROM` env var to the verified sender
- [ ] Without verified sender, confirmation emails will land in spam

### Supabase

- [ ] Apply Supabase migrations to the production project (`supabase db push` or via the dashboard)
- [ ] Verify Supabase RLS — manually `curl` the public reads + the anon submit (README has the command around line 191)

### Production environment variables (Vercel)

Set all of these in the Vercel project settings:

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `RESEND_API_KEY`
- [ ] `EMAIL_FROM`
- [ ] `NEXT_PUBLIC_SITE_URL`

### Smoke test

- [ ] Visit prod URL, hit each page (home, history, alumni, donate, submit, contact, privacy)
- [ ] Submit the contact form end-to-end and confirm the email arrives

## Should-do this week

- [ ] Add Sentry (free tier) for runtime error monitoring — `error.tsx` handles client errors but server errors only land in Vercel function logs
- [ ] Replace placeholder favicon if a designed UTC mark exists (current `app/icon.tsx` is a generated navy/gold "U")
- [ ] Audit OG share preview using Facebook's Sharing Debugger and Twitter's Card Validator after the domain is pointed
- [ ] Add archival photos to `/public` or upload via Supabase Storage; reference from history / featured-alumni pages once available
- [ ] Add UTC Foundation EIN + mailing address to donate page only if alumni feedback indicates the external giving link doesn't fully cover it (currently it does)

## Post-launch follow-ups

- [ ] Wire `subscribers` table to a UI (table exists, no signup form yet) for capturing leads at ACRA
- [ ] Set up `pg_dump` GitHub Action for nightly backups beyond Supabase's 7-day default (mentioned in README, not built)
- [ ] Generate Supabase TypeScript types via `supabase gen types typescript` — currently hand-typed in `src/types/domain.ts`
- [ ] Bump `tsconfig.json` target ES2017 → ES2022
- [ ] Replace footer "Program site" link if `utcrowing.org` becomes self-referential after domain pointing

## ACRA day (May 17)

- [ ] Have the QR code printed and tested night-before
- [ ] Spot-check `/alumni` and `/donate` from a phone on regatta wifi
- [ ] Watch Vercel Analytics for traffic spikes / error rates
- [ ] Tag any reconnect-form submissions for follow-up that week
