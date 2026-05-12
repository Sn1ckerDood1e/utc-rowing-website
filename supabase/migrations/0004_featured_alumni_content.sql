-- =====================================================================
-- UTC Rowing Alumni Site — seed featured alumni display content
-- 0004 (2026-05-12)
--
-- Adds the display fields the data-driven FeaturedAlumni component needs,
-- then seeds the 7 featured names with the rich content that was previously
-- hardcoded in src/components/featured-alumni.tsx.
-- =====================================================================

alter table public.alumni
  add column if not exists featured_medal_label text,   -- e.g. "Gold", "AA x 3", "Coach"
  add column if not exists featured_medal_kind text,    -- 'gold' | 'national' | 'coach' | 'first'
  add column if not exists featured_class_label text;   -- e.g. "Class of 2000" or "Head Coach 1989-2017"

-- Re-rank for grid rhythm: row 1 = Beery / Bruce / Espeseth,
-- row 2 = the AA sweep (Meeks / Turner / Schlatter), row 3 = Thomas.
update public.alumni set
  featured_rank = 1,
  achievements = 'Olympic Gold · Athens 2004',
  bio = 'The first U.S. men''s eight to win Olympic gold in 40 years. World-record 5:19.85 in the heat.',
  graduation_year = 2000,
  featured_medal_label = 'Gold',
  featured_medal_kind = 'gold',
  featured_class_label = 'Class of 2000'
where slug = 'dan-beery';

update public.alumni set
  featured_rank = 2,
  achievements = 'First UTC USRowing All-American · 1993-94',
  bio = 'The original — UTC''s first USRowing Collegiate Academic All-American, two years before the 1995-96 sweep.',
  graduation_year = 1994,
  featured_medal_label = 'First',
  featured_medal_kind = 'first',
  featured_class_label = 'Class of 1994'
where slug = 'keith-bruce';

update public.alumni set
  featured_rank = 3,
  achievements = '1984 Olympic Bronze · USRowing Hall of Fame',
  bio = 'Twenty-eight years at UTC. Coached Beery to gold. Brought the U.S. Women''s National Team to Chattanooga for 1996 Olympic prep.',
  featured_medal_label = 'Coach',
  featured_medal_kind = 'coach',
  featured_class_label = 'Head Coach 1989-2017'
where slug = 'robert-espeseth';

update public.alumni set
  featured_rank = 4,
  achievements = 'USRowing Academic All-American · 1995-96',
  bio = 'One of three UTC rowers named All-American in 1995-96 — more than any other U.S. college program that year, including Harvard, Yale, MIT, and Princeton.',
  featured_medal_label = 'AA x 3',
  featured_medal_kind = 'gold',
  featured_class_label = 'Class of 1996'
where slug = 'robert-meeks';

update public.alumni set
  featured_rank = 5,
  achievements = 'USRowing Academic All-American · 1995-96',
  bio = 'One of three UTC rowers named All-American in 1995-96 — more than any other U.S. college program that year, including Harvard, Yale, MIT, and Princeton.',
  featured_medal_label = 'AA x 3',
  featured_medal_kind = 'gold',
  featured_class_label = 'Class of 1996'
where slug = 'paul-turner';

update public.alumni set
  featured_rank = 6,
  achievements = 'USRowing Academic All-American · 1995-96',
  bio = 'One of three UTC rowers named All-American in 1995-96 — more than any other U.S. college program that year, including Harvard, Yale, MIT, and Princeton.',
  featured_medal_label = 'AA x 3',
  featured_medal_kind = 'gold',
  featured_class_label = 'Class of 1996'
where slug = 'valerie-schlatter';

update public.alumni set
  featured_rank = 7,
  achievements = '1997 World Lightweight Quad',
  bio = 'Raced for the U.S. lightweight quad at the World Championships in Aiguebelette.',
  graduation_year = 1995,
  featured_medal_label = 'Worlds',
  featured_medal_kind = 'national',
  featured_class_label = 'Class of 1995'
where slug = 'stephen-thomas';
