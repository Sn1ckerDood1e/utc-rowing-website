/**
 * One-off: seed Chynna Knight Cohen's 37 photos from her 2026-05-25 email
 * ("UTC Crew Connection", Gmail thread 19e5edb40fe99125).
 *
 *   npx tsx scripts/seed-chynna-2026-05-25.ts
 *
 * What it does:
 *   1. Upserts the `chynna-knight` alumni row (Worth era, 2019-2022).
 *   2. Backfills `related_alumni_id` on her existing approved submission.
 *   3. Uploads every *.upload.jpg under
 *      Submissions/2026-05-25 Chynna Knight Cohen/photos/ to the `photos`
 *      bucket, and upserts a public.photos row per upload.
 *
 *   All photo rows land as status='review', needs_identification=true,
 *   era='worth' — Chynna's offered to caption them; until she does, they
 *   sit in /identify with a generic caption.
 *
 * Idempotent: upserts on slug / storage_path. Safe to re-run.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { config } from "dotenv";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET = "photos";
const ARC = "/mnt/c/Users/hb/OneDrive/Desktop/UTC ARC";
const CHY_DIR = `${ARC}/Submissions/2026-05-25 Chynna Knight Cohen/photos`;

const CHYNNA_SUBMISSION = "7d99b328-fa34-4243-8807-ce1746b9a46b";
const CHYNNA_THREAD = "19e5edb40fe99125";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

function slugFromUploadName(name: string): string {
  // "21F3D8FC-195B-4B26-8638-2AAD5115A66C_Original.upload.jpg" -> "21f3d8fc-195b-4b26-8638-2aad5115a66c"
  // "IMG_4549_Original.upload.jpg"                            -> "img-4549"
  // "DSC_0709_Original.upload.jpg"                            -> "dsc-0709"
  // "Resized_IMG-20211106-WA0013_Original.upload.jpg"         -> "resized-img-20211106-wa0013"
  return name
    .replace(/\.upload\.jpg$/i, "")
    .replace(/_Original$/i, "")
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

async function upsertAlumni(): Promise<string> {
  console.log("== Upserting Chynna's alumni row ==");
  const { data, error } = await supabase
    .from("alumni")
    .upsert(
      {
        slug: "chynna-knight",
        canonical_name: "Chynna Knight Cohen",
        variants: "Chynna Cohen",
        first_year: 2019,
        last_year: 2022,
        era: "worth",
        sources: `submission:${CHYNNA_SUBMISSION} (self-identified via Form 2 memory submission, 2026-05-25; women's team president & captain 2019-2022)`,
        n_appearances: 0,
        is_published: true,
      },
      { onConflict: "slug" }
    )
    .select("id")
    .single();
  if (error) throw error;
  console.log(`  chynna-knight -> ${data!.id}`);
  return data!.id;
}

async function linkSubmission(alumniId: string): Promise<void> {
  console.log("== Linking submission to alumni ==");
  const { error } = await supabase
    .from("submissions")
    .update({ related_alumni_id: alumniId })
    .eq("id", CHYNNA_SUBMISSION);
  if (error) throw error;
  console.log(`  submission ${CHYNNA_SUBMISSION} -> alumni ${alumniId}`);
}

async function uploadOne(localPath: string, storagePath: string, alumniId: string) {
  const bytes = readFileSync(localPath);
  const size = statSync(localPath).size;
  console.log(`  upload ${storagePath} (${(size / 1024).toFixed(0)} KB)`);
  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, bytes, {
      contentType: "image/jpeg",
      upsert: true,
    });
  if (upErr) throw upErr;

  const { error } = await supabase.from("photos").upsert(
    {
      storage_path: storagePath,
      mime_type: "image/jpeg",
      caption: "Worth-era photo from Chynna Knight Cohen's 2026-05-25 submission — caption pending",
      era: "worth",
      submitter_alumni_id: alumniId,
      submitter_name: "Chynna Knight Cohen",
      submitter_email: "chynna.knight@gmail.com",
      attribution: "attributed",
      source_submission_id: CHYNNA_SUBMISSION,
      source_email_thread_id: CHYNNA_THREAD,
      status: "review",
      needs_identification: true,
      admin_notes: "From Chynna's 37-photo batch (Gmail thread 19e5edb40fe99125). Worth-era 2019-2022. Rotation baked in via process-photos.py. Caption + per-photo regatta/boat/people identification pending — Chynna offered to label.",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "storage_path" }
  );
  if (error) throw error;
}

async function main() {
  const alumniId = await upsertAlumni();
  await linkSubmission(alumniId);

  console.log(`\n== Uploading photos from ${CHY_DIR} ==`);
  const uploads = readdirSync(CHY_DIR)
    .filter((n) => n.endsWith(".upload.jpg"))
    .sort();
  console.log(`  found ${uploads.length} .upload.jpg files`);

  for (const name of uploads) {
    const slug = slugFromUploadName(name);
    const storagePath = `submissions/2026-05-25-chynna-knight-cohen/${slug}.jpg`;
    await uploadOne(`${CHY_DIR}/${name}`, storagePath, alumniId);
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
