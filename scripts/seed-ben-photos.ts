/**
 * One-off: seed Ben's 5 contributed photos forwarded by Susan Lazenby
 * on 2026-05-12 (Gmail thread 19e1be2535abab21, message 19e1cbe1f20be0a6).
 *
 *   npx tsx scripts/seed-ben-photos.ts
 *
 * Skips the duplicate Augusta podium that Ben sent (Susan already provided
 * that scene); seeds 4 unique photos.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { config } from "dotenv";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET = "photos";
const ARC = "/mnt/c/Users/hb/OneDrive/Desktop/UTC ARC";
const BEN_DIR = `${ARC}/Submissions/2026-05-12 From Ben (via Susan Lazenby)`;

const SUSAN_SUBMISSION = "a888ed8f-fdbc-4635-8eaa-0221146f5b66";
const SUSAN_THREAD = "19e1be2535abab21";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const PHOTOS = [
  {
    localPath: `${BEN_DIR}/Mens Medal Podium - Fox Appliance Parts banner.jpg`,
    storagePath: "submissions/2026-05-12-from-ben/mens-medal-podium-fox-appliance.jpg",
    caption:
      "Men's medal podium under a Fox Appliance Parts banner — five UTC rowers in yellow/black kit",
    date_taken_text: "mid-1990s (estimated)",
    era: "espeseth",
    boat_type: "men's crew (5-person medal lineup)",
    identification_notes:
      "5 men on the podium, all wearing medals. Setting is a regatta with a Fox Appliance Parts sponsor banner — likely a Southeast regional regatta. Ben is potentially one of the rowers.",
  },
  {
    localPath: `${BEN_DIR}/Mens Medal Group - waterfront.jpg`,
    storagePath: "submissions/2026-05-12-from-ben/mens-medal-group-waterfront.jpg",
    caption:
      "Men's medal group at a waterfront regatta — five UTC rowers in yellow/black kit",
    date_taken_text: "mid-1990s (estimated)",
    era: "espeseth",
    boat_type: "men's crew (5-person medal lineup)",
    identification_notes:
      "Same 5 rowers as the Fox Appliance podium photo, different angle/location at the same regatta. Ben is potentially one of them.",
  },
  {
    localPath: `${BEN_DIR}/Team Group Photo on Stadium Steps.jpg`,
    storagePath: "submissions/2026-05-12-from-ben/team-group-on-stadium-steps.jpg",
    caption:
      "UTC Rowing team group photo on stadium-style steps — approximately 25 men and women",
    date_taken_text: "mid-1990s (estimated)",
    era: "espeseth",
    boat_type: null,
    identification_notes:
      "Full-team photo. Both men's and women's program. Likely an end-of-season or regatta team shot. Many faces to identify — high-value for the /identify queue.",
  },
  {
    localPath: `${BEN_DIR}/Mens 8 Launching at Dock.jpg`,
    storagePath: "submissions/2026-05-12-from-ben/mens-eight-launching-at-dock.jpg",
    caption:
      "Men's 8+ launching at a dock — eight rowers in yellow/black UTC kit, coach assisting at bow",
    date_taken_text: "mid-1990s (estimated)",
    era: "espeseth",
    boat_type: "men's 8+",
    identification_notes:
      "Coach (figure with backpack reaching toward bow) is likely Espeseth, pending confirmation. Eight identifiable faces among the rowers.",
  },
];

async function main() {
  console.log(`Uploading ${PHOTOS.length} photos from Ben to bucket "${BUCKET}"`);

  for (const entry of PHOTOS) {
    const bytes = readFileSync(entry.localPath);
    console.log(`  upload ${entry.storagePath} (${(bytes.length / 1024).toFixed(0)} KB)`);
    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(entry.storagePath, bytes, {
        contentType: "image/jpeg",
        upsert: true,
      });
    if (upErr) throw upErr;

    const { error } = await supabase.from("photos").upsert(
      {
        storage_path: entry.storagePath,
        mime_type: "image/jpeg",
        caption: entry.caption,
        date_taken_text: entry.date_taken_text,
        era: entry.era,
        boat_type: entry.boat_type,
        submitter_name: "Ben (via Susan Lazenby)",
        attribution: "pending",
        source_submission_id: SUSAN_SUBMISSION,
        source_email_thread_id: SUSAN_THREAD,
        status: "published",
        needs_identification: true,
        identification_notes: entry.identification_notes,
        admin_notes:
          "Forwarded by Susan Lazenby on 2026-05-12 (message 19e1cbe1f20be0a6). Ben's full name + email pending — Susan was asked for his contact.",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "storage_path" }
    );
    if (error) throw error;
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
