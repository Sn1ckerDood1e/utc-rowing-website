/**
 * One-off: seed 5 photos from Ben Robbs' "UTC Rowing Throwback" Dropbox
 * (sent 2026-05-14 after Susan Lazenby connected him with the program).
 *
 *   npx tsx scripts/seed-ben-throwback-photos.ts
 *
 * These 5 are the immediate-engagement-window picks for the /identify
 * page — they have the most identifiable faces and the strongest
 * regatta-banner / context cues. The full collection is 288 photos
 * across 5 Facebook albums; the rest will be seeded in batches as we
 * caption them. Catalog lives at:
 *   /UTC ARC/Submissions/2026-05-14 From Ben Robbs (Throwback Dropbox)/CATALOG.md
 *
 * Photos are read from the source Dropbox folder, resized to ~1600px
 * max edge, JPEG q85, then uploaded to the public `photos` bucket
 * under `submissions/2026-05-14-from-ben-throwback/<slug>.jpg`.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { config } from "dotenv";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET = "photos";
const ARC = "/mnt/c/Users/hb/OneDrive/Desktop/UTC ARC";
const SRC_BASE = `${ARC}/Submissions/2026-05-14 From Ben Robbs (Throwback Dropbox)`;
const TMP_DIR = "/tmp/utc-rowing-throwback-resized";

const SUSAN_SUBMISSION = "a888ed8f-fdbc-4635-8eaa-0221146f5b66";
const SUSAN_THREAD = "19e1be2535abab21";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

type PhotoEntry = {
  /** Source filename within the Dropbox album folder */
  srcFile: string;
  /** Web-friendly slug used both in /tmp/ and in storage */
  slug: string;
  caption: string;
  date_taken_text: string;
  date_taken_year: number | null;
  era: "founding" | "carney" | "espeseth" | "worth" | "resurrection";
  regatta: string | null;
  location: string | null;
  boat_type: string | null;
  identification_notes: string;
};

const PHOTOS: PhotoEntry[] = [
  {
    srcFile: `UTCRowing__mOCUi4iRg/1923515_1091690647170_6619_n_1091690647170.jpg`,
    slug: "augusta-invitational-medal-podium-five-rowers",
    caption:
      "Augusta Invitational Rowing Regatta medal podium — five UTC athletes in yellow kit, NationsBank + CellularOne sponsor banner overhead",
    date_taken_text: "1995 or 1996 (per banner sponsors)",
    date_taken_year: 1995,
    era: "espeseth",
    regatta: "Augusta Invitational",
    location: "Augusta, GA",
    boat_type: null,
    identification_notes:
      "Five UTC athletes on the Augusta podium — leftmost arm raised in celebration, one being held aloft by another. The NationsBank + CellularOne sponsor banner dates the photo to the mid-1990s. Susan (Davis) Lazenby's heavyweight 4 from this era was: Susan, Kate Hall, Sherry Junell Cox, Becky [last name TBD], Gretchen (Moniz) Turner. If this is that crew, please confirm or correct.",
  },
  {
    srcFile: `UTCRowing__mOCUi4iRg/2325_1091168114107_7143_n_1091168114107.jpg`,
    slug: "utc-rowing-full-team-photo-mid-1990s",
    caption:
      "Full UTC Rowing team photo — approximately 60 rowers in yellow/black uniforms with oars laid in front",
    date_taken_text: "mid-1990s (estimated)",
    date_taken_year: null,
    era: "espeseth",
    regatta: null,
    location: null,
    boat_type: null,
    identification_notes:
      "Full-program team photo from the Espeseth era. ~60 rowers in matching UTC yellow/black uniforms, posed in 3–4 rows with oars laid across the front. This is the highest-density identification photo in the entire Robbs collection — many faces to name. Likely a season-end or pre-regatta team shot.",
  },
  {
    srcFile: `UTCRowing__mOCUi4iRg/1923981_1093407370087_7423_n_1093407370087.jpg`,
    slug: "four-women-cox-cha-cha-boat-golden-hour",
    caption:
      "Four UTC women rowers and a coxswain sitting on top of the 'Cha-Cha' (Chattanooga) 4+ at golden hour, post-race",
    date_taken_text: "mid-1990s (estimated)",
    date_taken_year: null,
    era: "espeseth",
    regatta: null,
    location: "Tennessee River (Chattanooga)",
    boat_type: "women's 4+ (named 'Cha-Cha' / Chattanooga)",
    identification_notes:
      "Four women rowers in UTC apparel sitting on the boat hull, one cox in a blue rain jacket on the right. Cars + boat racks visible behind. Possibly the Susan/Kate/Sherry/Becky/Gretchen heavyweight 4. Boat hull is labeled CHA-CHA (Chattanooga).",
  },
  {
    srcFile: `UTCRowing__mOCUi4iRg/1923981_1093407850099_804_n_1093407850099.jpg`,
    slug: "mens-team-medal-lineup-nine-rowers",
    caption:
      "Nine UTC men in yellow/blue jerseys lined up at a regatta venue, several with medals around necks",
    date_taken_text: "mid-1990s (estimated)",
    date_taken_year: null,
    era: "espeseth",
    regatta: null,
    location: null,
    boat_type: "men's crew (9-person medal lineup)",
    identification_notes:
      "Nine UTC men's rowers lined up against their boat at a regatta venue. UTC yellow/blue jerseys, several wearing medals. Background shows parking lot + spectators. Likely an 8+ crew + cox or alternate. Strong candidate for the men's crew of the era.",
  },
  {
    srcFile: `UTCRowing19961997SlideShow_IPuqsoAfNw/278524_2019475921222_5990881_o_2019475921222.jpg`,
    slug: "utc-crew-dock-railing-launch-1996-97",
    caption:
      "UTC CREW jackets and a crowd of athletes on a dock railing, watching/managing a launch",
    date_taken_text: "1996–1997 season",
    date_taken_year: 1996,
    era: "espeseth",
    regatta: null,
    location: null,
    boat_type: null,
    identification_notes:
      "Crowd on a dock railing during a launch. Multiple UTC CREW yellow jackets visible. Likely from a 1996–97 regatta. Good for putting names to faces in the back-half-of-Espeseth-era women's program.",
  },
];

function resizeToTmp(srcAbs: string, slug: string): string {
  if (!existsSync(TMP_DIR)) mkdirSync(TMP_DIR, { recursive: true });
  const dst = `${TMP_DIR}/${slug}.jpg`;
  // Use Python (Pillow) — same toolchain we used for the arson + empacher conversions
  const py = `
from PIL import Image, ImageOps
img = Image.open('${srcAbs.replace(/'/g, "\\'")}')
img = ImageOps.exif_transpose(img)
img = img.convert('RGB')
w, h = img.size
MAX = 1600
if max(w, h) > MAX:
    s = MAX / max(w, h)
    img = img.resize((int(w*s), int(h*s)), Image.LANCZOS)
img.save('${dst}', 'JPEG', quality=85, optimize=True, progressive=True)
print(img.size[0], img.size[1])
`;
  const out = execSync(`python3 -c "${py.replace(/"/g, '\\"')}"`).toString().trim();
  return dst;
}

async function main() {
  console.log(
    `Seeding ${PHOTOS.length} photos from Ben's Throwback Dropbox to bucket "${BUCKET}"`
  );

  for (const entry of PHOTOS) {
    const srcAbs = `${SRC_BASE}/${entry.srcFile}`;
    if (!existsSync(srcAbs)) {
      throw new Error(`Source not found: ${srcAbs}`);
    }
    const resized = resizeToTmp(srcAbs, entry.slug);
    const bytes = readFileSync(resized);
    const storagePath = `submissions/2026-05-14-from-ben-throwback/${entry.slug}.jpg`;

    console.log(`  upload ${storagePath} (${(bytes.length / 1024).toFixed(0)} KB)`);
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
        caption: entry.caption,
        date_taken_text: entry.date_taken_text,
        date_taken_year: entry.date_taken_year,
        era: entry.era,
        regatta: entry.regatta,
        location: entry.location,
        boat_type: entry.boat_type,
        submitter_name: "Ben Robbs (via Susan Lazenby)",
        attribution: "pending",
        source_submission_id: SUSAN_SUBMISSION,
        source_email_thread_id: SUSAN_THREAD,
        status: "published",
        needs_identification: true,
        identification_notes: entry.identification_notes,
        admin_notes:
          "From Ben's 'UTC Rowing Throwback' Dropbox (288 photos across 5 FB albums) sent 2026-05-14. Full catalog at /UTC ARC/Submissions/2026-05-14 From Ben Robbs (Throwback Dropbox)/CATALOG.md. Ben's email: bengigi@charter.net.",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "storage_path" }
    );
    if (error) throw error;
    console.log(`    ✓ photos row upserted`);
  }

  console.log("\nDone. View on /identify.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
