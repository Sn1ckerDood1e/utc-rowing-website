/**
 * One-off: load utc_alumni_canonical.csv into Supabase public.alumni
 *
 * Run after applying migrations:
 *   npx tsx scripts/import-alumni-csv.ts
 *
 * Required env (in .env.local):
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...
 *   ALUMNI_CSV_PATH=/abs/path/to/utc_alumni_canonical.csv
 *     (defaults to ~/utc-rowing-scraper/out/utc_alumni_canonical.csv)
 */

import { createClient } from "@supabase/supabase-js";
import { parse } from "csv-parse/sync";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { config } from "dotenv";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const CSV_PATH =
  process.env.ALUMNI_CSV_PATH ||
  join(homedir(), "utc-rowing-scraper/out/utc_alumni_canonical.csv");

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "Missing env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

type CsvRow = {
  canonical_name: string;
  n_appearances: string;
  first_year: string;
  last_year: string;
  variants: string;
  regattas: string;
  sources: string;
};

function slugify(name: string, taken: Set<string>): string {
  const base = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  let slug = base || "alum";
  let n = 2;
  while (taken.has(slug)) slug = `${base}-${n++}`;
  taken.add(slug);
  return slug;
}

function eraOf(firstYear: number | null): string {
  if (firstYear === null) return "espeseth";
  if (firstYear < 1989) return "carney";
  if (firstYear <= 2017) return "espeseth";
  if (firstYear <= 2024) return "worth";
  return "resurrection";
}

function intOrNull(s: string): number | null {
  if (!s || s.trim() === "") return null;
  const n = parseInt(s, 10);
  return Number.isNaN(n) ? null : n;
}

async function main() {
  console.log(`Reading ${CSV_PATH}...`);
  const text = readFileSync(CSV_PATH, "utf8");
  const rows = parse(text, {
    columns: true,
    skip_empty_lines: true,
  }) as CsvRow[];

  console.log(`Parsed ${rows.length} rows. Building inserts...`);

  const slugs = new Set<string>();
  const inserts = rows
    .filter(
      (r) =>
        r.canonical_name &&
        r.canonical_name.trim() &&
        // skip team-level non-individual rows
        !/^utc(\W|$)/i.test(r.canonical_name.trim()) &&
        !/^e\.?\s*placeholder/i.test(r.canonical_name.trim())
    )
    .map((r) => {
      const firstYear = intOrNull(r.first_year);
      return {
        slug: slugify(r.canonical_name, slugs),
        canonical_name: r.canonical_name.trim(),
        variants: r.variants || null,
        first_year: firstYear,
        last_year: intOrNull(r.last_year),
        era: eraOf(firstYear),
        regattas: r.regattas || null,
        sources: r.sources || null,
        n_appearances: intOrNull(r.n_appearances) ?? 0,
      };
    });

  console.log(`Inserting ${inserts.length} alumni rows in batches of 100...`);

  for (let i = 0; i < inserts.length; i += 100) {
    const batch = inserts.slice(i, i + 100);
    const { error } = await supabase.from("alumni").upsert(batch, {
      onConflict: "slug",
      ignoreDuplicates: false,
    });
    if (error) {
      console.error(`Batch ${i}-${i + batch.length} failed:`, error);
      process.exit(1);
    }
    process.stdout.write(`.`);
  }

  console.log(`\nDone. ${inserts.length} alumni in public.alumni.`);

  const { count } = await supabase
    .from("alumni")
    .select("*", { count: "exact", head: true });
  console.log(`Verified count: ${count}`);

  // Era distribution
  const eras = ["carney", "espeseth", "worth", "resurrection", "founding"];
  for (const era of eras) {
    const { count: c } = await supabase
      .from("alumni")
      .select("*", { count: "exact", head: true })
      .eq("era", era);
    console.log(`  ${era}: ${c}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
