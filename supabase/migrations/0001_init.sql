-- =====================================================================
-- UTC Rowing Alumni Site — initial schema
-- v0 (ACRA launch May 17, 2026)
-- =====================================================================

create extension if not exists pg_trgm;

-- ---------------------------------------------------------------------
-- Alumni canonical roster
-- ---------------------------------------------------------------------
create table public.alumni (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  canonical_name text not null,
  variants text,                                  -- pipe-separated OCR variants
  first_year int,
  last_year int,
  era text not null check (era in ('founding','carney','espeseth','worth','resurrection')),
  regattas text,                                  -- pipe-separated, denormalized for display
  sources text,                                   -- pipe-separated source PDFs
  n_appearances int default 0,

  -- editable / submission-driven fields (used in v1+)
  bio text,
  hometown text,
  major text,
  graduation_year int,
  achievements text,
  hero_image_url text,

  -- metadata
  claimed_by uuid references auth.users(id),
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index alumni_canonical_name_trgm on public.alumni
  using gin (canonical_name gin_trgm_ops);
create index alumni_variants_trgm on public.alumni
  using gin (variants gin_trgm_ops);
create index alumni_era_idx on public.alumni (era);
create index alumni_year_range_idx on public.alumni (first_year, last_year);

-- ---------------------------------------------------------------------
-- Submissions from alumni
-- ---------------------------------------------------------------------
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  form_level int not null check (form_level in (1, 2, 3)) default 1,
  status text not null default 'pending'
    check (status in ('pending','approved','rejected','needs_followup')),

  -- submitter identity
  submitter_name text not null,
  submitter_email text not null,
  years_rowed text,
  coach_during_rowing text,

  -- form-2 fields
  topic text,                                     -- 'memory','correction','photo','boat_name','other'
  body text,
  publish_permission text check (publish_permission in ('attributed','anonymous','internal')),

  -- form-3 fields (v1+)
  gap_addressed text,
  confidence text check (confidence in ('eyewitness','secondhand','family','guess')),

  -- linking
  related_alumni_id uuid references public.alumni(id),
  attachment_paths text[],

  -- admin metadata
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  admin_notes text,

  created_at timestamptz default now()
);

create index submissions_status_idx on public.submissions (status, created_at desc);
create index submissions_email_idx on public.submissions (submitter_email);

-- ---------------------------------------------------------------------
-- Mailing list / newsletter signups (deferred for ACRA launch but
-- table exists so footer signup can be wired in cheaply later)
-- ---------------------------------------------------------------------
create table public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz,
  source text                                     -- 'footer','submit_form','manual'
);

-- ---------------------------------------------------------------------
-- Audit log
-- ---------------------------------------------------------------------
create table public.audit_log (
  id bigserial primary key,
  actor uuid references auth.users(id),
  action text not null,
  target_table text,
  target_id text,
  diff jsonb,
  at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- Admin allow-list
-- ---------------------------------------------------------------------
create table public.admin_emails (
  email text primary key,
  added_at timestamptz default now(),
  added_by text
);

-- Bootstrap the head coach as admin
insert into public.admin_emails (email, added_by)
values ('kinseymi@radl.solutions', 'bootstrap')
on conflict (email) do nothing;
