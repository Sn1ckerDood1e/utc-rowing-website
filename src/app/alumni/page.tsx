import Link from "next/link";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { AlumniSearch } from "@/components/alumni-search";
import type { Alumni } from "@/types/domain";

export const revalidate = 3600;

export const metadata = {
  title: "Alumni — UTC Rowing",
  description:
    "Searchable roster of UTC Rowing alumni from 1983 to present, grouped by coaching era.",
};

export default async function AlumniPage() {
  let initial: Alumni[] = [];
  let dbReady = true;
  try {
    // Anon-only client — no cookies, so /alumni stays statically renderable / ISR-eligible.
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("alumni")
      .select(
        "id, canonical_name, era, first_year, last_year, variants, regattas, achievements"
      )
      .eq("is_published", true)
      .order("canonical_name", { ascending: true })
      .limit(500);
    if (error) throw error;
    initial = (data ?? []) as Alumni[];
  } catch (e) {
    console.error("[/alumni] Supabase fetch failed", {
      message: e instanceof Error ? e.message : String(e),
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      urlPrefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30),
    });
    dbReady = false;
  }

  return (
    <>
      <section className="relative bg-utc-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(200,182,130,0.12),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-3">
            The roster
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-[1.05] mb-4">
            UTC Rowing alumni
          </h1>
          <p className="text-lg text-white/80 max-w-3xl leading-relaxed">
            {initial.length > 0
              ? `${initial.length.toLocaleString()} alumni on file, drawn from regatta results, lineup sheets, and program archives spanning 1983 to today. Search by name or scroll by era.`
              : "Alumni roster — currently loading."}
          </p>
          <p className="mt-3 text-base text-white/65 max-w-3xl">
            If you don&rsquo;t see yourself,{" "}
            <Link href="/submit" className="link-draw text-utc-gold-bright font-semibold">
              add yourself
            </Link>
            . If a teammate comes to mind, nudge them.
          </p>
        </div>
      </section>

      <section className="bg-paper-grain">
        <div className="mx-auto max-w-6xl px-4 py-12">
          {!dbReady ? (
            <DatabaseNotReady />
          ) : (
            <AlumniSearch initialAlumni={initial} />
          )}
        </div>
      </section>
    </>
  );
}

function DatabaseNotReady() {
  return (
    <div className="border border-utc-gold/40 bg-utc-gold-bright/10 rounded p-6 max-w-2xl">
      <h2 className="text-lg font-semibold text-utc-navy mb-2">
        Roster loading…
      </h2>
      <p className="text-sm text-foreground/80">
        The alumni database is being populated. Check back soon, or in the
        meantime,{" "}
        <a
          href="/submit"
          className="underline decoration-utc-gold underline-offset-4 font-semibold"
        >
          submit your own entry
        </a>{" "}
        — every alum on file makes the next visitor&rsquo;s search a little
        more complete.
      </p>
    </div>
  );
}
