import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AlumniSearch } from "@/components/alumni-search";
import type { Alumni } from "@/types/domain";

export const metadata = {
  title: "Alumni — UTC Rowing",
  description:
    "Searchable roster of UTC Rowing alumni from 1983 to present, grouped by coaching era.",
};

export default async function AlumniPage() {
  let initial: Alumni[] = [];
  let dbReady = true;
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("alumni")
      .select("*")
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
      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-utc-gold uppercase text-sm tracking-widest mb-2">
            The roster
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">UTC Rowing Alumni</h1>
          <p className="mt-3 text-white/80 max-w-3xl">
            {initial.length > 0
              ? `${initial.length.toLocaleString()} alumni on file, drawn from regatta results, lineup sheets, and program archives. Search by name or scroll by era. If you don't see yourself, please `
              : "Alumni roster — currently being loaded. If you don't see yourself, please "}
            <a
              href="/submit"
              className="underline decoration-utc-gold underline-offset-4 hover:text-utc-gold-bright"
            >
              add yourself.
            </a>
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
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
