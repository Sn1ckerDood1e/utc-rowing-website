# UTC Rowing — Alumni Site

Next.js + Supabase + Vercel. Built for the **ACRA Nationals launch May 17, 2026**.

This README is the deployment runbook. Follow it top-to-bottom to get the site live.

---

## What's in here

```
src/app/                 # Next.js App Router pages
src/components/          # nav, footer, hero pieces, submit-form, SVG illustrations
src/lib/                 # supabase clients, email (Resend), markdown loader
src/types/               # domain types
content/timeline.md      # public history (rendered on /history)
supabase/migrations/     # SQL migrations (apply via Supabase Studio or `supabase db push`)
scripts/import-alumni-csv.ts   # one-off: load 433 canonical alumni
tests/e2e/               # Playwright end-to-end tests
playwright.config.ts     # test config (baseURL = production by default)
```

Pages:
- `/` — Home with ACRA crew callout
- `/history` — Timeline (renders `content/timeline.md`)
- `/alumni` — Searchable roster, grouped by era
- `/submit` — Form 1 (alumni signup) + Form 2 (memory/correction)
- `/submit/thank-you`
- `/donate` — Links to gomocs.com/giving
- `/contact`
- `/api/submit` — POST handler that writes to Supabase + sends emails

---

## Step 1 — Local setup (~10 min)

You'll need **Node 20.9+**. Check with `node -v`.

```bash
git clone <your-repo-url> utc-rowing-website
cd utc-rowing-website
npm install
cp .env.local.example .env.local
```

Don't try to start the dev server yet — the Supabase env vars need values first.

---

## Step 2 — Create Supabase project (~5 min)

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**
2. Name it `utc-rowing` (or whatever). Pick a region close to Tennessee (`us-east-1`).
3. Save the database password somewhere safe.
4. Wait for the project to provision (~2 min).
5. Once ready, go to **Project Settings → API** and copy:
   - `Project URL` → put in `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (secret) → `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 3 — Apply migrations (~2 min)

Two options:

### Option A — Supabase Studio (browser)
1. In the Supabase dashboard, go to **SQL Editor → New query**
2. Paste the contents of `supabase/migrations/0001_init.sql` → Run
3. Paste the contents of `supabase/migrations/0002_rls_policies.sql` → Run

### Option B — Supabase CLI (faster)
```bash
npm install -g supabase
supabase login
supabase link --project-ref <YOUR_PROJECT_REF>   # found in Supabase URL
supabase db push
```

Verify in Studio: **Table Editor** should show `alumni`, `submissions`, `subscribers`, `audit_log`, `admin_emails`. The `admin_emails` table should have one row: `kinseymi@radl.solutions`.

---

## Step 4 — Import alumni roster (~1 min)

The CSV is at `~/utc-rowing-scraper/out/utc_alumni_canonical.csv` (433 rows). The import script reads it, generates URL slugs, maps each alum to an era, and inserts into Supabase.

```bash
npx tsx scripts/import-alumni-csv.ts
```

Expected output:
```
Reading /home/hb/utc-rowing-scraper/out/utc_alumni_canonical.csv...
Parsed 433 rows. Building inserts...
Inserting 429 alumni rows in batches of 100...
.....
Done. 429 alumni in public.alumni.
Verified count: 429
```

(429 instead of 433 because 4 non-individual rows like "UTC" and "E. Placeholder9" are filtered out.)

If the CSV lives elsewhere, override:
```bash
ALUMNI_CSV_PATH=/abs/path/to/utc_alumni_canonical.csv npx tsx scripts/import-alumni-csv.ts
```

---

## Step 5 — Set up email (Resend) (~5 min)

Submission confirmation + admin notification emails go through Resend.

1. Sign up at [resend.com](https://resend.com) (free tier = 100 emails/day, plenty)
2. **For ACRA launch (fast path):** skip domain verification — use Resend's pre-verified `onboarding@resend.dev` as `EMAIL_FROM` (already the default). You can verify a real domain like `radl.solutions` or `utcrowing.org` after launch.
3. Create an API key → put in `.env.local` as `RESEND_API_KEY=re_...`
4. Confirm `EMAIL_FROM=onboarding@resend.dev` in `.env.local` (or your own verified domain if you've set one up)
5. Confirm `EMAIL_ADMIN_TO=kinseymi@radl.solutions` (or wherever you want notifications to land)

If you skip Resend, the site will still work — submissions land in the Supabase `submissions` table, you just won't get emails.

---

## Step 6 — Run locally and verify (~5 min)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Check each page:

- [ ] `/` — Home loads, ACRA crew callout shows
- [ ] `/history` — Timeline renders with era markers
- [ ] `/alumni` — Roster appears, search works (try "beery")
- [ ] `/submit` — Form 1 visible, "+ Add a memory…" expands Form 2
- [ ] Submit a test entry → check `/submit/thank-you` redirect
- [ ] Verify the test entry shows in Supabase Studio → `submissions` table
- [ ] Check your email for the confirmation + admin notification
- [ ] `/donate`, `/contact` load

If `/alumni` shows "Roster loading…" instead of the list, the env vars aren't loaded — restart `npm run dev` after editing `.env.local`.

---

## Step 7 — Push to GitHub (~2 min)

```bash
git init
git add .
git commit -m "Initial v0 of UTC Rowing alumni site"
git branch -M main
git remote add origin git@github.com:<YOUR_USERNAME>/utc-rowing-website.git
git push -u origin main
```

---

## Step 8 — Deploy to Vercel (~5 min)

1. Go to [vercel.com/new](https://vercel.com/new) → Import the GitHub repo
2. Framework preset: **Next.js** (auto-detected)
3. Environment variables — add ALL of these (Production + Preview):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `EMAIL_ADMIN_TO`
   - `NEXT_PUBLIC_SITE_URL` (set to `https://YOUR_DEPLOYMENT.vercel.app` once known)
4. Deploy
5. After ~1 min you'll get a `*.vercel.app` URL. Open it on your phone — verify Submit works mobile.

Update `NEXT_PUBLIC_SITE_URL` env var in Vercel to the actual deployed URL, then redeploy.

---

## Step 9 — Pre-launch checklist (May 16, 2026)

Run through this the day before ACRA:

- [ ] Submit form works on iPhone Safari
- [ ] Submit form works on Android Chrome
- [ ] Confirmation email lands in inbox (check Gmail spam folder too)
- [ ] Admin email notification lands at `EMAIL_ADMIN_TO`
- [ ] `/alumni` search returns results for partial names
- [ ] `/history` renders cleanly on mobile (long text, scrolling smooth)
- [ ] Site loads in under 3s on cellular
- [ ] OG image renders when URL is shared via SMS / Facebook DM
- [ ] All env vars set in Vercel Production environment
- [ ] Supabase RLS denies direct anon access to `submissions` table:
  ```bash
  curl "https://YOUR_PROJECT.supabase.co/rest/v1/submissions" \
    -H "apikey: YOUR_ANON_KEY"
  # should return [] or 401, NOT a list of submissions
  ```

---

## Step 10 — Soft-launch

Send the URL to ~10–20 known alumni 24–48 hours before ACRA. Watch the Supabase `submissions` table fill up. Approve / reject in Studio (Table Editor → submissions → status column).

After ACRA:
- Email the broader alumni community with race results + the site link
- Pull stats: how many submissions, what topics, what gaps closed
- Plan v1 features based on what alumni actually used

---

## Running E2E tests

We have a Playwright suite at `tests/e2e/` covering all six pages, the submit
form (including a real submission round-trip), search/filter behavior, and RLS
security checks.

By default tests run against the **production** URL
(`https://utc-rowing-website.vercel.app`). Override via env:

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test
```

```bash
# First time only:
npx playwright install chromium

# Run tests:
npx playwright test
# → 21 tests across home, alumni, submit, static-pages, security
```

To enable iPhone emulation tests too, you need webkit + system deps:
```bash
sudo npx playwright install-deps webkit
npx playwright install webkit
PLAYWRIGHT_MOBILE=1 npx playwright test
```

Each submit-form test inserts a real `*@test.invalid` row into the production
`submissions` table. They're harmless but accumulate over time; you can clean
them up with one SQL line in Supabase Studio:
```sql
delete from public.submissions where submitter_email like '%@test.invalid';
```

---

## Reviewing submissions (admin workflow)

Until the admin dashboard is built (deferred to v1), review submissions directly in Supabase Studio:

1. **supabase.com/dashboard → your project → Table Editor → submissions**
2. Filter `status = 'pending'`
3. For each:
   - Read `body`, check `publish_permission`
   - If approving: change `status` → `approved`, add `admin_notes` if helpful
   - If it relates to an existing alum: set `related_alumni_id` to that alum's UUID (look up in `alumni` table)
   - If rejecting: change `status` → `rejected`, add a note in `admin_notes`
4. For roster corrections: edit the `alumni` row directly. Audit log captures who/when via Supabase auth metadata.

---

## Adding more admins later

In Supabase Studio → SQL Editor:
```sql
insert into public.admin_emails (email, added_by)
values ('newadmin@example.com', 'kinseymi@radl.solutions');
```

---

## What's deferred to v1 (not in this build)

- Magic-link auth + admin dashboard UI (use Supabase Studio for now)
- Photo upload on submit form
- Alumni "claim your profile" flow
- Mailing list signup in footer (table exists; UI is v1)
- `/alumni/[slug]` individual profile pages
- Comments / replies on submitted memories
- Form 3 (specific gap-closing) per `GAPS-AND-ASKS.md`
- Race results live feed
- Featured-alumnus rotation on home

See `WEBSITE-PLAN.md` and `BUILD-V0.md` in the UTC ARC archive folder for the full v1+v2 roadmap.

---

## Maintenance

- **Backups**: Supabase free tier does daily backups for 7 days. For belt-and-suspenders, set up a GitHub Actions workflow to `pg_dump` weekly into a private artifact.
- **Domain**: when ready, in Vercel → project → Settings → Domains, add `alumni.utcrowing.org` (subdomain — recommended for soft launch) or `utcrowing.org` (root). Then update `NEXT_PUBLIC_SITE_URL` env var.
- **Updates to history**: edit `content/timeline.md`, push to `main`, Vercel rebuilds.
- **Updates to alumni**: edit rows directly in Supabase Studio (live, no rebuild needed).

---

## Stuck?

The four planning docs in `/UTC ARC/Website Build/` cover everything:
- `TIMELINE.md` — public history (already in `content/timeline.md`)
- `ALUMNI-BY-ERA.md` — full roster reference (parallel data to Supabase)
- `GAPS-AND-ASKS.md` — drives v1 Form 3
- `WEBSITE-PLAN.md` + `BUILD-V0.md` — overall plan + this v0 spec

When in doubt, the goal is alumni-network rebuild + ACRA fundraising. If something's not on the critical path for that, defer it.
