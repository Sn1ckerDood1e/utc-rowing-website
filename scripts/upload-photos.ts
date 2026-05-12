/**
 * Seed photos + photo_people + new alumni records into Supabase.
 *
 * Run after migration 0003_photos.sql and after scripts/process-photos.py.
 *
 *   npx tsx scripts/upload-photos.ts
 *
 * Required env (.env.local):
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...
 *
 * What it does:
 *   1. Adds 3 new alumni discovered via Beverly's IMG_6907 (Jennifer Strasser,
 *      Bridget Raymor, Katya).
 *   2. Uploads every photo in PHOTOS to the `photos` bucket.
 *   3. Inserts a public.photos row per upload (metadata).
 *   4. For IMG_6907, inserts 5 photo_people rows naming the 4 rowers + an
 *      unidentified cox.
 *
 * Idempotent: uses upsert by storage_path / slug.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, statSync } from "node:fs";
import { basename } from "node:path";
import { config } from "dotenv";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const ARC = "/mnt/c/Users/hb/OneDrive/Desktop/UTC ARC";
const BUCKET = "photos";

// Known alumni IDs (queried before run)
const ALUMNI = {
  beverly: "e94abdfa-c412-4cb2-a412-d9b39271b4bd",
  susan: "84377ce2-ad94-4d42-8b6f-80cb5af3f72f",
  beery: "018eb067-69e6-4543-9adb-e9dfc5a9316c",
  thomas: "59454828-30c9-44a9-8738-430b5f82256d",
  bruce: "7d9b5adf-c213-471d-af06-95833ad82dcb",
  espeseth: "11bb748a-be29-4f84-8980-f5fc40dc3b85",
  meeks: "dc984fe2-61bc-4cd4-9be2-55d7eff837d0",
  turner: "bedcbb49-9f57-4d72-b5c2-022acd4b9b20",
  schlatter: "6455531c-c04b-4e5e-aad6-b94111bc518f",
};

const BEVERLY_SUBMISSION = "1dbef8b6-b5c3-4fc1-92c6-8f26f5153fd8";

// New alumni surfaced by Beverly's IMG_6907 identification
const NEW_ALUMNI = [
  {
    slug: "jennifer-strasser",
    canonical_name: "Jennifer Strasser",
    variants: "Jennifer Ross",
    first_year: 1995,
    last_year: 1998,
    era: "espeseth",
    sources: `submission:${BEVERLY_SUBMISSION} (identified by Beverly Newell as bow seat in IMG_6907, Fall 1995)`,
  },
  {
    slug: "bridget-raymor",
    canonical_name: "Bridget Raymor",
    variants: "Bridget Gibson",
    first_year: 1995,
    last_year: 1998,
    era: "espeseth",
    sources: `submission:${BEVERLY_SUBMISSION} (identified by Beverly Newell as 3 seat in IMG_6907, Fall 1995)`,
  },
  {
    slug: "katya-unknown-surname",
    canonical_name: "Katya (last name unknown)",
    first_year: 1995,
    last_year: 1998,
    era: "espeseth",
    sources: `submission:${BEVERLY_SUBMISSION} (identified by Beverly Newell as 4 seat in IMG_6907, Fall 1995; from former Soviet Union, "probably Russia")`,
  },
];

type PhotoEntry = {
  localPath: string;
  storagePath: string;
  caption: string;
  date_taken_text?: string;
  date_taken_year?: number;
  era?: string;
  regatta?: string;
  location?: string;
  boat_type?: string;
  submitter_alumni_id?: string;
  submitter_name: string;
  submitter_email?: string;
  attribution: "attributed" | "anonymous" | "internal" | "pending";
  credit_note?: string;
  source_submission_id?: string;
  source_email_thread_id?: string;
  status: "draft" | "review" | "published" | "hidden";
  needs_identification: boolean;
  identification_notes?: string;
  admin_notes?: string;
  featured_rank?: number;
  is_hero_eligible?: boolean;
};

const BEV_DIR = `${ARC}/Submissions/2026-05-12 Beverly Newell`;
const SUS_DIR = `${ARC}/Submissions/2026-05-12 Susan Lazenby`;
const FB_DIR = `${ARC}/Submissions/From Social Media`;
const MEDIA_DIR = `${ARC}/Website Build/Media`;
const HEAD_DIR = `${ARC}/Headshots`;

const PHOTOS: PhotoEntry[] = [
  // ----- Beverly Newell submission (the identified boat photo) -----
  {
    localPath: `${BEV_DIR}/IMG_6907.upload.jpg`,
    storagePath: "submissions/2026-05-12-beverly-newell/img-6907.jpg",
    caption: "Women's coxed four on the river, Fall ~1995",
    date_taken_text: "Fall 1995 (approx.)",
    date_taken_year: 1995,
    era: "espeseth",
    regatta: "head race (specific event TBD — Beverly suggested Bridget would know)",
    boat_type: "women's 4+",
    submitter_alumni_id: ALUMNI.beverly,
    submitter_name: "Beverly Newell",
    submitter_email: "beverlyfnewell@gmail.com",
    attribution: "pending",
    source_submission_id: BEVERLY_SUBMISSION,
    source_email_thread_id: "19e1be244680f28e",
    status: "review",
    needs_identification: true,
    identification_notes:
      "4 of 5 boat members identified by Beverly. Coxswain (yellow UTC CREW jersey, dark braid, facing rowers) not yet identified.",
    is_hero_eligible: true,
  },
  // ----- Beverly's 5 additional photos (unidentified) -----
  {
    localPath: `${BEV_DIR}/IMG_9711.upload.jpg`,
    storagePath: "submissions/2026-05-12-beverly-newell/img-9711.jpg",
    caption: "Crew portage at a boatyard / staging area, year unknown",
    era: "espeseth",
    submitter_alumni_id: ALUMNI.beverly,
    submitter_name: "Beverly Newell",
    submitter_email: "beverlyfnewell@gmail.com",
    attribution: "pending",
    source_submission_id: BEVERLY_SUBMISSION,
    source_email_thread_id: "19e1be244680f28e",
    status: "review",
    needs_identification: true,
    admin_notes: "Rotation baked in via exif_transpose. Woman in red jacket carries shell overhead; man in knit cap shares stern. Boat racks behind.",
  },
  {
    localPath: `${BEV_DIR}/IMG_9712.upload.jpg`,
    storagePath: "submissions/2026-05-12-beverly-newell/img-9712.jpg",
    caption: "Boathouse scene, person walking away in yellow/black UTC CREW jacket",
    era: "espeseth",
    submitter_alumni_id: ALUMNI.beverly,
    submitter_name: "Beverly Newell",
    submitter_email: "beverlyfnewell@gmail.com",
    attribution: "pending",
    source_submission_id: BEVERLY_SUBMISSION,
    source_email_thread_id: "19e1be244680f28e",
    status: "review",
    needs_identification: true,
    is_hero_eligible: true,
  },
  {
    localPath: `${BEV_DIR}/IMG_9713.upload.jpg`,
    storagePath: "submissions/2026-05-12-beverly-newell/img-9713.jpg",
    caption: "Women's 8+ portage on a dock",
    era: "espeseth",
    boat_type: "women's 8+",
    submitter_alumni_id: ALUMNI.beverly,
    submitter_name: "Beverly Newell",
    submitter_email: "beverlyfnewell@gmail.com",
    attribution: "pending",
    source_submission_id: BEVERLY_SUBMISSION,
    source_email_thread_id: "19e1be244680f28e",
    status: "review",
    needs_identification: true,
  },
  {
    localPath: `${BEV_DIR}/IMG_9714.upload.jpg`,
    storagePath: "submissions/2026-05-12-beverly-newell/img-9714.jpg",
    caption: "Women's 8+ rowing on the river (low-angle action shot)",
    era: "espeseth",
    boat_type: "women's 8+",
    submitter_alumni_id: ALUMNI.beverly,
    submitter_name: "Beverly Newell",
    submitter_email: "beverlyfnewell@gmail.com",
    attribution: "pending",
    source_submission_id: BEVERLY_SUBMISSION,
    source_email_thread_id: "19e1be244680f28e",
    status: "review",
    needs_identification: true,
    admin_notes: "Rotation baked in via exif_transpose. Foreground rower has long blonde hair and yellow tank top — possibly Beverly herself; confirm.",
  },
  {
    localPath: `${BEV_DIR}/IMG_9715.upload.jpg`,
    storagePath: "submissions/2026-05-12-beverly-newell/img-9715.jpg",
    caption: "Solo rower at a regatta site (pink hat, red jacket, white pants)",
    era: "espeseth",
    submitter_alumni_id: ALUMNI.beverly,
    submitter_name: "Beverly Newell",
    submitter_email: "beverlyfnewell@gmail.com",
    attribution: "pending",
    source_submission_id: BEVERLY_SUBMISSION,
    source_email_thread_id: "19e1be244680f28e",
    status: "review",
    needs_identification: true,
  },
  // ----- Susan Lazenby submission -----
  {
    localPath: `${SUS_DIR}/Screenshot_20240901_223820_Gallery.jpg`,
    storagePath: "submissions/2026-05-12-susan-lazenby/augusta-invitational-medal-podium.jpg",
    caption: "Augusta Invitational Rowing Regatta — medal podium with five UTC rowers and a coach",
    date_taken_text: "1991-1998 (NationsBank sponsor era)",
    era: "espeseth",
    regatta: "Augusta Invitational Rowing Regatta",
    location: "Augusta, GA",
    submitter_alumni_id: ALUMNI.susan,
    submitter_name: "Susan Lazenby",
    submitter_email: "susanlazenby@yahoo.com",
    attribution: "pending",
    source_submission_id: "a888ed8f-fdbc-4635-8eaa-0221146f5b66",
    source_email_thread_id: "19e1be2535abab21",
    status: "review",
    needs_identification: true,
    identification_notes:
      "5 rowers with medals + older man in red shorts on far left (likely Coach Espeseth). Susan is probably one of the 5.",
  },
  {
    localPath: `${SUS_DIR}/Screenshot_20240901_223913_Gallery.jpg`,
    storagePath: "submissions/2026-05-12-susan-lazenby/dock-with-vespoli-shell.jpg",
    caption: "Three women at a dock next to a Vespoli shell, mid-90s",
    era: "espeseth",
    submitter_alumni_id: ALUMNI.susan,
    submitter_name: "Susan Lazenby",
    submitter_email: "susanlazenby@yahoo.com",
    attribution: "pending",
    source_submission_id: "a888ed8f-fdbc-4635-8eaa-0221146f5b66",
    source_email_thread_id: "19e1be2535abab21",
    status: "review",
    needs_identification: true,
  },
  {
    localPath: `${SUS_DIR}/Screenshot_20240901_223930_Gallery.jpg`,
    storagePath: "submissions/2026-05-12-susan-lazenby/race-start-view.jpg",
    caption: "Race-start view from inside a UTC boat (start-line buoys, other crews lined up)",
    era: "espeseth",
    submitter_alumni_id: ALUMNI.susan,
    submitter_name: "Susan Lazenby",
    submitter_email: "susanlazenby@yahoo.com",
    attribution: "pending",
    source_submission_id: "a888ed8f-fdbc-4635-8eaa-0221146f5b66",
    source_email_thread_id: "19e1be2535abab21",
    status: "review",
    needs_identification: true,
  },
  // ----- From the women's alumni Facebook group -----
  {
    localPath: `${FB_DIR}/2026-05-12 UTC Womens Alumni FB Group - Modern Training Photo.jpg`,
    storagePath: "submissions/2026-05-12-fb-group/modern-training-multiple-eights.jpg",
    caption: "Modern UTC women's training — multiple eights on the Tennessee River with hillside houses behind",
    era: "resurrection",
    submitter_name: "UTC Women's Alumni Facebook Group (via Susan Lazenby's share)",
    attribution: "pending",
    status: "review",
    needs_identification: true,
    admin_notes: "Original filename 516676083_10235488865978915_8205051020609569049_n.jpg — Facebook content-id pattern. Provenance to be confirmed.",
  },
  // ----- Program photography: Dusk Single Series (already used as videos on /alumni) -----
  ...[
    { num: "02", filename: "Dusk Single Series - 02 - Single Rower with Riverfront Lights at Dusk.jpg", caption: "Single rower with riverfront lights at dusk" },
    { num: "03", filename: "Dusk Single Series - 03 - Single Rower Under Cliffs Dusk.jpg", caption: "Single rower under cliffs at dusk" },
    { num: "04", filename: "Dusk Single Series - 04 - Single Rower Under Cliffs Reflection.jpg", caption: "Single rower under cliffs, reflection on water" },
    { num: "05", filename: "Dusk Single Series - 05 - Single Rower Under Cliffs Sunset.jpg", caption: "Single rower under cliffs at sunset" },
    { num: "06", filename: "Dusk Single Series - 06 - Single Rower with Tennessee Aquarium Backdrop.jpg", caption: "Single rower with Tennessee Aquarium backdrop" },
    { num: "07", filename: "Dusk Single Series - 07 - Single Silhouette Sunset (companion to Single silhouette video).jpg", caption: "Single silhouette at sunset (companion still to Single silhouette video)" },
    { num: "08", filename: "Dusk Single Series - 08 - Single Rower with Hunter Museum and Walnut Street Bridge.jpg", caption: "Single rower with Hunter Museum and Walnut Street Bridge" },
    { num: "09", filename: "Dusk Single Series - 09 - Single Rower Sunset Wide.jpg", caption: "Single rower at sunset — wide view" },
    { num: "10", filename: "Dusk Single Series - 10 - Single Rower Bow-On Sunset Silhouette.jpg", caption: "Single rower silhouette at sunset, bow-on view" },
  ].map<PhotoEntry>(({ num, filename, caption }) => ({
    localPath: `${MEDIA_DIR}/${filename}`,
    storagePath: `program-media/dusk-single-series-${num}.jpg`,
    caption,
    era: "resurrection",
    location: "Tennessee River, downtown Chattanooga",
    boat_type: "single",
    submitter_name: "UTC Rowing Program",
    attribution: "internal",
    status: "published",
    needs_identification: false,
    is_hero_eligible: true,
  })),
  // ----- HEIC stills (now converted to JPEG) -----
  ...["IMG_1070", "IMG_1071", "IMG_1537", "IMG_1541"].map<PhotoEntry>((stem) => ({
    localPath: `${MEDIA_DIR}/${stem}.jpg`,
    storagePath: `program-media/${stem.toLowerCase()}.jpg`,
    caption: `Program photography — ${stem} (additional shoot still)`,
    era: "resurrection",
    submitter_name: "UTC Rowing Program",
    attribution: "internal",
    status: "published",
    needs_identification: true,
    admin_notes: "Converted from HEIC. Pending caption + identification.",
  })),
  // ----- Headshots -----
  {
    localPath: `${HEAD_DIR}/2025 Kinsey Michael - Head Coach Headshot.jpg`,
    storagePath: "headshots/kinsey-michael-2025.jpg",
    caption: "Michael Kinsey — Head Coach, UTC Rowing (2025)",
    date_taken_year: 2025,
    era: "resurrection",
    submitter_name: "UTC Rowing Program",
    attribution: "internal",
    status: "published",
    needs_identification: false,
  },
  {
    localPath: `${HEAD_DIR}/Harden Joel - 2025.jpg`,
    storagePath: "headshots/harden-joel-2025.jpg",
    caption: "Joel Harden — UTC Rowing (2025)",
    date_taken_year: 2025,
    era: "resurrection",
    submitter_name: "UTC Rowing Program",
    attribution: "internal",
    status: "published",
    needs_identification: false,
    admin_notes: "Class year / context to confirm.",
  },
];

async function ensureAlumni(): Promise<Record<string, string>> {
  console.log("\n== Ensuring new alumni records ==");
  const ids: Record<string, string> = {};
  for (const row of NEW_ALUMNI) {
    const { data, error } = await supabase
      .from("alumni")
      .upsert(
        {
          slug: row.slug,
          canonical_name: row.canonical_name,
          variants: row.variants ?? null,
          first_year: row.first_year,
          last_year: row.last_year,
          era: row.era,
          sources: row.sources,
          n_appearances: 0,
          is_published: true,
        },
        { onConflict: "slug" }
      )
      .select("id, slug")
      .single();
    if (error) throw error;
    ids[row.slug] = data!.id;
    console.log(`  ${row.slug} -> ${data!.id}`);
  }
  return ids;
}

async function uploadOnePhoto(entry: PhotoEntry): Promise<string> {
  // upload bytes
  const bytes = readFileSync(entry.localPath);
  const size = statSync(entry.localPath).size;
  console.log(`  upload ${entry.storagePath} (${(size / 1024).toFixed(0)} KB)`);
  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(entry.storagePath, bytes, {
      contentType: "image/jpeg",
      upsert: true,
    });
  if (upErr) throw upErr;

  // upsert metadata
  const { data, error } = await supabase
    .from("photos")
    .upsert(
      {
        storage_path: entry.storagePath,
        mime_type: "image/jpeg",
        caption: entry.caption,
        date_taken_text: entry.date_taken_text ?? null,
        date_taken_year: entry.date_taken_year ?? null,
        era: entry.era ?? null,
        regatta: entry.regatta ?? null,
        location: entry.location ?? null,
        boat_type: entry.boat_type ?? null,
        submitter_alumni_id: entry.submitter_alumni_id ?? null,
        submitter_name: entry.submitter_name,
        submitter_email: entry.submitter_email ?? null,
        attribution: entry.attribution,
        credit_note: entry.credit_note ?? null,
        source_submission_id: entry.source_submission_id ?? null,
        source_email_thread_id: entry.source_email_thread_id ?? null,
        status: entry.status,
        needs_identification: entry.needs_identification,
        identification_notes: entry.identification_notes ?? null,
        admin_notes: entry.admin_notes ?? null,
        featured_rank: entry.featured_rank ?? null,
        is_hero_eligible: entry.is_hero_eligible ?? false,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "storage_path" }
    )
    .select("id")
    .single();
  if (error) throw error;
  return data!.id;
}

async function seedPhotoPeople(
  img6907Id: string,
  newAlumIds: Record<string, string>
): Promise<void> {
  console.log("\n== Seeding photo_people for IMG_6907 ==");
  // Delete existing rows for this photo to keep idempotent across re-runs.
  // (UNIQUE on photo_id,alumni_id,role treats NULL alumni_id as distinct, so
  // a fresh upsert of the cox row would create duplicates without this.)
  const { error: delErr } = await supabase
    .from("photo_people")
    .delete()
    .eq("photo_id", img6907Id);
  if (delErr) throw delErr;
  const rows = [
    {
      photo_id: img6907Id,
      alumni_id: newAlumIds["jennifer-strasser"],
      role: "bow",
      confidence: "submitter",
      identified_by_alumni_id: ALUMNI.beverly,
      identified_by_submission_id: BEVERLY_SUBMISSION,
      notes: "Identified by Beverly Newell (12:07 UTC email reply 2026-05-12). Now Jennifer Ross.",
    },
    {
      photo_id: img6907Id,
      alumni_id: ALUMNI.beverly,
      role: "2",
      confidence: "submitter",
      identified_by_alumni_id: ALUMNI.beverly,
      identified_by_submission_id: BEVERLY_SUBMISSION,
      notes: "Self-identified by Beverly Newell.",
    },
    {
      photo_id: img6907Id,
      alumni_id: newAlumIds["bridget-raymor"],
      role: "3",
      confidence: "submitter",
      identified_by_alumni_id: ALUMNI.beverly,
      identified_by_submission_id: BEVERLY_SUBMISSION,
      notes: "Identified by Beverly Newell. Now Bridget Gibson.",
    },
    {
      photo_id: img6907Id,
      alumni_id: newAlumIds["katya-unknown-surname"],
      role: "stroke",
      confidence: "submitter",
      identified_by_alumni_id: ALUMNI.beverly,
      identified_by_submission_id: BEVERLY_SUBMISSION,
      notes: "Identified as Katya by Beverly Newell; last name unknown. From former Soviet Union (\"probably Russia\").",
    },
    {
      photo_id: img6907Id,
      alumni_id: null,
      role: "cox",
      position_in_photo: "yellow UTC CREW jersey, dark braid, facing the rowers",
      confidence: "submitter",
      identified_by_alumni_id: ALUMNI.beverly,
      identified_by_submission_id: BEVERLY_SUBMISSION,
      notes: "Visible in photo; name not yet provided by Beverly. Asked in 2026-05-12 follow-up email.",
    },
  ];
  const { error: insErr } = await supabase.from("photo_people").insert(rows);
  if (insErr) throw insErr;
  for (const row of rows) {
    console.log(`  ${row.role}: ${row.alumni_id ?? "(unidentified)"}`);
  }
}

async function seedFeaturedAlumni(): Promise<void> {
  console.log("\n== Marking 5 featured alumni ==");
  const featured = [
    { id: ALUMNI.beery, rank: 1 },
    { id: ALUMNI.bruce, rank: 2 },
    { id: ALUMNI.meeks, rank: 3 },
    { id: ALUMNI.turner, rank: 4 },
    { id: ALUMNI.schlatter, rank: 5 },
    { id: ALUMNI.thomas, rank: 6 },
    { id: ALUMNI.espeseth, rank: 7 },
  ];
  for (const f of featured) {
    const { error } = await supabase
      .from("alumni")
      .update({ is_featured: true, featured_rank: f.rank })
      .eq("id", f.id);
    if (error) throw error;
  }
  console.log(`  marked ${featured.length} alumni as featured`);
}

async function main() {
  console.log(`Uploading ${PHOTOS.length} photos to Supabase Storage bucket "${BUCKET}"`);

  const newAlumIds = await ensureAlumni();

  console.log("\n== Uploading photos ==");
  const photoIdByPath: Record<string, string> = {};
  for (const entry of PHOTOS) {
    try {
      const id = await uploadOnePhoto(entry);
      photoIdByPath[entry.storagePath] = id;
    } catch (e) {
      console.error(`  FAILED ${entry.storagePath}:`, e);
      throw e;
    }
  }

  const img6907Id = photoIdByPath["submissions/2026-05-12-beverly-newell/img-6907.jpg"];
  if (img6907Id) {
    await seedPhotoPeople(img6907Id, newAlumIds);
    // Link Beverly's featured_photo_id to IMG_6907
    const { error } = await supabase
      .from("alumni")
      .update({ featured_photo_id: img6907Id })
      .eq("id", ALUMNI.beverly);
    if (error) throw error;
    console.log("  linked beverly-newell.featured_photo_id -> IMG_6907");
  }

  await seedFeaturedAlumni();

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
