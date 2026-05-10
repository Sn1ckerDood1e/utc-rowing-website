import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Home() {
  let alumniCount: number | null = null;
  try {
    const supabase = await createSupabaseServerClient();
    const { count } = await supabase
      .from("alumni")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true);
    alumniCount = count;
  } catch (e) {
    console.error("[/] Supabase count failed", {
      message: e instanceof Error ? e.message : String(e),
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });
    alumniCount = null;
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="text-utc-gold uppercase text-sm tracking-widest mb-4">
            Established 1983 · Club sport since
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Rowing has been part of UTC for{" "}
            <span className="text-utc-gold">over 40 years.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/85 max-w-2xl mb-8">
            We&rsquo;re rebuilding the program — and asking every alum to help
            us tell its story.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/history"
              className="bg-utc-gold text-utc-navy-deep font-semibold px-6 py-3 rounded hover:bg-utc-gold-bright transition-colors"
            >
              Read our history
            </Link>
            <Link
              href="/submit"
              className="bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 rounded hover:bg-white/20 transition-colors"
            >
              Submit your story
            </Link>
            <Link
              href="/donate"
              className="bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 rounded hover:bg-white/20 transition-colors"
            >
              Support the team
            </Link>
          </div>
        </div>
      </section>

      {/* ACRA crew callout */}
      <section className="bg-utc-gold-bright/30 border-y border-utc-gold/40">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
            <div>
              <p className="text-utc-navy uppercase text-xs tracking-widest font-semibold mb-2">
                Racing now
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-utc-navy mb-2">
                UTC at ACRA Nationals · May 17, 2026
              </h2>
              <p className="text-utc-navy/85">
                Cheering on our M4x crew —{" "}
                <strong>Abraham Mako, Conner, Tyler, and Jay</strong> —
                coached by <strong>Michael Kinsey</strong>. The first
                UTC crew to race ACRA since the program restarted Fall
                2025.
              </p>
            </div>
            <div>
              <Link
                href="/donate"
                className="inline-block bg-utc-navy text-white font-semibold px-6 py-3 rounded hover:bg-utc-navy-deep transition-colors whitespace-nowrap"
              >
                Send them off →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stat banner */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <Stat number="40+" label="years of UTC Rowing" />
          <Stat
            number={alumniCount ? alumniCount.toLocaleString() : "433"}
            label="alumni on the roster"
          />
          <Stat number="1" label="Olympic gold · Beery, 2004" />
        </div>
      </section>

      {/* What's happening now */}
      <section className="bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-bold text-utc-navy mb-6">
            Where we are right now
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 text-base">
            <div>
              <h3 className="font-semibold text-utc-navy mb-2 text-lg">
                Resurrected, Fall 2025
              </h3>
              <p className="text-foreground/80">
                After the program went dormant post-2022, four athletes
                restarted UTC Rowing in Fall 2025. Coach Michael Kinsey
                (UTC mechatronics, Dec 2025) leads the crew.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-utc-navy mb-2 text-lg">
                Rebuilding the boathouse
              </h3>
              <p className="text-foreground/80">
                Active fundraising for a 20×80 pole barn, replacement
                barges, ACRA-level shells, and a tow vehicle. Alumni
                support is what makes the comeback possible.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-utc-navy mb-2 text-lg">
                A program with a story
              </h3>
              <p className="text-foreground/80">
                UTC produced an Olympic gold medalist (Dan Beery, Athens
                2004) and three USRowing Academic All-Americans in a
                single year (1995–96 — most in the nation). The
                Tennessee Indoor Rowing Championships (TIRC) was founded
                here in 1991 and remains a UTC home stronghold.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-utc-navy mb-2 text-lg">
                Help us complete the record
              </h3>
              <p className="text-foreground/80">
                Most of UTC Rowing&rsquo;s history isn&rsquo;t in any
                official archive — it&rsquo;s in alumni filing cabinets,
                phones, and memories. Add yours.
              </p>
              <Link
                href="/submit"
                className="inline-block mt-3 text-utc-navy underline underline-offset-4 decoration-utc-gold font-semibold hover:text-utc-navy-deep"
              >
                Submit a memory, photo, or correction →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ number, label }: { number: string | number; label: string }) {
  return (
    <div>
      <div className="text-5xl font-bold text-utc-navy">{number}</div>
      <div className="mt-2 text-muted-foreground">{label}</div>
    </div>
  );
}
