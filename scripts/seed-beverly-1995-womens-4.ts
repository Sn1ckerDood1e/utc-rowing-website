/**
 * One-off: seed Beverly Newell's Fall ~1995 women's 4+ photo to /identify
 * with the rowers she's already named — asks the dinner crew to fill in
 * the coxswain.
 *
 *   npx tsx scripts/seed-beverly-1995-womens-4.ts
 *
 * Source notes live at:
 *   /UTC ARC/Submissions/2026-05-12 Beverly Newell/NOTES.md
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { config } from "dotenv";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET = "photos";
const LOCAL_PATH = "/tmp/beverly-1995-womens-4plus.jpg";
const STORAGE_PATH =
  "submissions/2026-05-12-beverly-newell/womens-4plus-fall-1995-named-crew-cox-unknown.jpg";

// Beverly's submission row (Form 1 alumni signup, May 11 2026)
const BEVERLY_SUBMISSION = "1dbef8b6-b5c3-4fc1-92c6-8f26f5153fd8";
const BEVERLY_THREAD = "19e1be244680f28e";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

async function main() {
  const bytes = readFileSync(LOCAL_PATH);
  console.log(`Uploading ${STORAGE_PATH} (${(bytes.length / 1024).toFixed(0)} KB)`);
  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(STORAGE_PATH, bytes, {
      contentType: "image/jpeg",
      upsert: true,
    });
  if (upErr) throw upErr;

  const { error } = await supabase.from("photos").upsert(
    {
      storage_path: STORAGE_PATH,
      mime_type: "image/jpeg",
      caption:
        "UTC women's 4+ at a fall head race, ~1995. Four rowers named, coxswain not yet identified.",
      date_taken_text: "Fall 1995 (approximate)",
      date_taken_year: 1995,
      era: "espeseth",
      regatta: null,
      location: null,
      boat_type: "women's 4+",
      submitter_name: "Beverly Newell",
      attribution: "pending",
      source_submission_id: BEVERLY_SUBMISSION,
      source_email_thread_id: BEVERLY_THREAD,
      status: "published",
      needs_identification: true,
      identification_notes:
        "Beverly Newell named four of five athletes: bow Jennifer Strasser (now Jennifer Ross), 2 seat Beverly Newell herself, 3 seat Bridget Raymor (now Bridget Gibson), 4 seat Katya (last name unknown — émigré from the former Soviet Union, possibly Russia). The coxswain in the yellow UTC CREW jersey with dark braid is not yet identified. Anyone from the Espeseth-era women's program who recognizes the cox or remembers Katya's last name — please reach out.",
      admin_notes:
        "From Beverly Newell's email submission 2026-05-12 (Gmail thread 19e1be244680f28e, photo IMG_6907.jpeg). Beverly hasn't yet confirmed credit preference (attributed vs anonymous) — defaulting to `pending` until she replies. Also held back from full publication elsewhere until that's confirmed.",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "storage_path" }
  );
  if (error) throw error;
  console.log("✓ photos row upserted. View on /identify.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
