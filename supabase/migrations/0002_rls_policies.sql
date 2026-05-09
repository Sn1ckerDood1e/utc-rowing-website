-- =====================================================================
-- UTC Rowing Alumni Site — Row Level Security
-- =====================================================================

-- ---------------------------------------------------------------------
-- alumni
-- ---------------------------------------------------------------------
alter table public.alumni enable row level security;

create policy alumni_public_read
  on public.alumni for select
  using (is_published = true);

create policy alumni_admin_all
  on public.alumni for all
  to authenticated
  using (auth.jwt() ->> 'email' in (select email from public.admin_emails))
  with check (auth.jwt() ->> 'email' in (select email from public.admin_emails));

-- (Owner-update policy — wired up in v1 when we ship the claim flow)
-- create policy alumni_owner_update
--   on public.alumni for update
--   to authenticated
--   using (claimed_by = auth.uid())
--   with check (claimed_by = auth.uid());

-- ---------------------------------------------------------------------
-- submissions
-- ---------------------------------------------------------------------
alter table public.submissions enable row level security;

-- anyone can submit (this is the whole point)
create policy submissions_anon_insert
  on public.submissions for insert
  to anon, authenticated
  with check (true);

-- only admins can read / update / delete
create policy submissions_admin_select
  on public.submissions for select
  to authenticated
  using (auth.jwt() ->> 'email' in (select email from public.admin_emails));

create policy submissions_admin_update
  on public.submissions for update
  to authenticated
  using (auth.jwt() ->> 'email' in (select email from public.admin_emails));

create policy submissions_admin_delete
  on public.submissions for delete
  to authenticated
  using (auth.jwt() ->> 'email' in (select email from public.admin_emails));

-- ---------------------------------------------------------------------
-- subscribers
-- ---------------------------------------------------------------------
alter table public.subscribers enable row level security;

create policy subscribers_anon_insert
  on public.subscribers for insert
  to anon, authenticated
  with check (true);

create policy subscribers_admin_select
  on public.subscribers for select
  to authenticated
  using (auth.jwt() ->> 'email' in (select email from public.admin_emails));

-- ---------------------------------------------------------------------
-- audit_log
-- ---------------------------------------------------------------------
alter table public.audit_log enable row level security;

create policy audit_admin_select
  on public.audit_log for select
  to authenticated
  using (auth.jwt() ->> 'email' in (select email from public.admin_emails));

-- ---------------------------------------------------------------------
-- admin_emails — locked down. Only manageable via Supabase Studio
-- (service role) or the migration files in this repo.
-- ---------------------------------------------------------------------
alter table public.admin_emails enable row level security;
-- no policies = no access for anon or authenticated users; admin must
-- use Supabase Studio to add/remove admin emails.
