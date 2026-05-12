-- =====================================================================
-- UTC Rowing Alumni Site — photos & identification
-- 0003 (2026-05-12)
--
-- Adds:
--   - photos: core entity for all program & alumni-contributed photography
--   - photo_people: who is in each photo (approved identifications)
--   - photo_identification_proposals: pending crowdsourced IDs
--   - alumni.is_featured / featured_rank / featured_photo_id (data-driven
--     replacement for the hardcoded FeaturedAlumni component)
--   - views: v_contributors, v_recent_activity, v_alumni_contributions
--   - photos storage bucket + public-read policy
-- =====================================================================

-- ---------------------------------------------------------------------
-- photos: core entity
-- ---------------------------------------------------------------------
create table public.photos (
  id uuid primary key default gen_random_uuid(),

  -- storage
  storage_path text not null unique,
  mime_type text not null,
  width int,
  height int,
  rotation int default 0 check (rotation in (0, 90, 180, 270)),

  -- what it is
  caption text,
  date_taken_text text,
  date_taken_year int,
  era text check (era in ('founding','carney','espeseth','worth','resurrection')),
  regatta text,
  location text,
  boat_type text,

  -- attribution
  submitter_alumni_id uuid references public.alumni(id),
  submitter_name text not null,
  submitter_email text,
  attribution text not null default 'pending'
    check (attribution in ('attributed','anonymous','internal','pending')),
  credit_note text,

  -- provenance
  source_submission_id uuid references public.submissions(id),
  source_email_thread_id text,

  -- workflow
  status text not null default 'review'
    check (status in ('draft','review','published','hidden')),
  needs_identification boolean not null default true,
  identification_notes text,
  admin_notes text,

  -- featured / hero use
  featured_rank int,
  is_hero_eligible boolean default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index photos_status_published_idx on public.photos (status)
  where status = 'published';
create index photos_needs_id_idx on public.photos (needs_identification, status)
  where needs_identification = true and status = 'published';
create index photos_era_idx on public.photos (era);
create index photos_submitter_idx on public.photos (submitter_alumni_id);
create index photos_featured_idx on public.photos (featured_rank)
  where featured_rank is not null;

-- ---------------------------------------------------------------------
-- photo_people: approved identifications. NULL alumni_id = unidentified.
-- ---------------------------------------------------------------------
create table public.photo_people (
  id uuid primary key default gen_random_uuid(),
  photo_id uuid not null references public.photos(id) on delete cascade,

  alumni_id uuid references public.alumni(id),
  role text,                         -- 'bow','2','3','4','stroke','cox','rower','coach','subject'
  position_in_photo text,            -- free text: 'left','center','wearing yellow CREW jacket'

  identified_by_alumni_id uuid references public.alumni(id),
  identified_by_submission_id uuid references public.submissions(id),
  identified_by_name text,
  confidence text not null default 'submitter'
    check (confidence in ('confirmed','submitter','crowd','guess')),

  notes text,
  identified_at timestamptz not null default now(),

  unique (photo_id, alumni_id, role)
);

create index photo_people_alumni_idx on public.photo_people (alumni_id)
  where alumni_id is not null;
create index photo_people_photo_idx on public.photo_people (photo_id);

-- ---------------------------------------------------------------------
-- photo_identification_proposals: crowdsourced IDs awaiting admin review
-- ---------------------------------------------------------------------
create table public.photo_identification_proposals (
  id uuid primary key default gen_random_uuid(),
  photo_id uuid not null references public.photos(id) on delete cascade,

  proposed_alumni_id uuid references public.alumni(id),
  proposed_name text,
  proposed_role text,
  proposed_position_in_photo text,
  proposed_year int,
  proposed_event text,

  submitter_alumni_id uuid references public.alumni(id),
  submitter_email text,
  submitter_name text,

  confidence text default 'guess'
    check (confidence in ('eyewitness','secondhand','family','guess')),
  notes text,

  status text not null default 'pending'
    check (status in ('pending','approved','rejected','duplicate')),
  resulting_photo_people_id uuid references public.photo_people(id),

  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id),
  admin_notes text,

  created_at timestamptz not null default now()
);

create index proposals_photo_idx on public.photo_identification_proposals (photo_id);
create index proposals_pending_idx on public.photo_identification_proposals (status)
  where status = 'pending';

-- ---------------------------------------------------------------------
-- alumni: add featured fields (data-driven FeaturedAlumni)
-- ---------------------------------------------------------------------
alter table public.alumni
  add column is_featured boolean not null default false,
  add column featured_rank int,
  add column featured_photo_id uuid references public.photos(id);

create index alumni_featured_idx on public.alumni (featured_rank)
  where is_featured = true;

-- ---------------------------------------------------------------------
-- Views
-- ---------------------------------------------------------------------

-- Contributors: aggregate published-attributed photos by submitter.
-- Drives /acknowledgments page + "Contributed N photos" badges.
create view public.v_contributors as
select
  submitter_name,
  submitter_alumni_id,
  count(*)::int as photo_count,
  min(created_at) as first_contribution,
  max(created_at) as latest_contribution
from public.photos
where status = 'published' and attribution = 'attributed'
group by submitter_name, submitter_alumni_id;

-- Recent activity: alumni signups + photo publications, latest first.
-- Drives "Recently added" feed on /alumni.
create view public.v_recent_activity as
  select 'alum_added'::text as kind,
         canonical_name as title,
         created_at,
         id as ref_id
    from public.alumni
   where is_published = true
  union all
  select 'photo_published'::text as kind,
         coalesce(caption, '(no caption)') as title,
         created_at,
         id as ref_id
    from public.photos
   where status = 'published';

-- Per-alumni photo contribution count (drives badges on alumni cards).
create view public.v_alumni_contributions as
select
  submitter_alumni_id as alumni_id,
  count(*)::int as contributed_count
from public.photos
where status = 'published' and submitter_alumni_id is not null
group by submitter_alumni_id;

-- ---------------------------------------------------------------------
-- RLS policies
-- ---------------------------------------------------------------------

alter table public.photos enable row level security;
create policy photos_public_read on public.photos
  for select using (status = 'published');

alter table public.photo_people enable row level security;
create policy photo_people_public_read on public.photo_people
  for select using (true);

alter table public.photo_identification_proposals enable row level security;
create policy proposals_anon_insert on public.photo_identification_proposals
  for insert with check (true);

-- ---------------------------------------------------------------------
-- Storage bucket for photos
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'photos',
  'photos',
  true,
  26214400,  -- 25MB
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do nothing;

-- Public read on bucket objects. Writes happen via service role only.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'photos_public_read'
  ) then
    create policy photos_public_read on storage.objects
      for select using (bucket_id = 'photos');
  end if;
end$$;
