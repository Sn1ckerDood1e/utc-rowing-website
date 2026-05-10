import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AnimatedCounter } from "@/components/animated-counter";
import { FeaturedAlumni } from "@/components/featured-alumni";
import { EraCards } from "@/components/era-cards";
import {
  RowingShellSilhouette,
  WaterRipplePattern,
  RiverBendCurve,
  ChevronRight,
} from "@/components/svg-rowing";

const ERA_KEYS = ["founding", "carney", "espeseth", "worth", "resurrection"] as const;

export default async function Home() {
  let alumniCount = 429;
  const eraCounts: Record<string, number> = {
    founding: 0,
    carney: 0,
    espeseth: 0,
    worth: 0,
    resurrection: 0,
  };

  try {
    const supabase = await createSupabaseServerClient();
    const { count } = await supabase
      .from("alumni")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true);
    if (count !== null) alumniCount = count;

    for (const era of ERA_KEYS) {
      const { count: c } = await supabase
        .from("alumni")
        .select("*", { count: "exact", head: true })
        .eq("is_published", true)
        .eq("era", era);
      eraCounts[era] = c ?? 0;
    }
  } catch (e) {
    console.error("[/] Supabase fetch failed", {
      message: e instanceof Error ? e.message : String(e),
    });
  }

  return (
    <>
      {/* ============================================================
          HERO — full-bleed athletic
         ============================================================ */}
      <section className="relative bg-river-gradient text-white overflow-hidden">
        {/* Water ripple texture */}
        <div className="absolute inset-0 text-utc-gold-bright opacity-50 pointer-events-none">
          <WaterRipplePattern />
        </div>

        {/* Glowing orbs */}
        <div
          className="absolute top-20 -right-20 w-96 h-96 bg-utc-gold rounded-full blur-3xl opacity-20 animate-pulse-ring"
          aria-hidden
        />
        <div
          className="absolute bottom-40 -left-20 w-72 h-72 bg-river-blue-light rounded-full blur-3xl opacity-25 animate-pulse-ring"
          aria-hidden
          style={{ animationDelay: "1.5s" }}
        />

        {/* Animated rowing shell gliding across */}
        <div className="absolute top-1/2 left-0 w-full h-20 -translate-y-12 text-utc-gold/40 pointer-events-none animate-glide" aria-hidden>
          <RowingShellSilhouette className="w-[600px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-32 sm:pt-28 sm:pb-44">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-5">
              Established 1983 · Tennessee River
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Forty years on the
              <br />
              <span className="text-gradient-gold italic">Tennessee River.</span>
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-white/80 max-w-2xl leading-relaxed">
              An Olympic gold. Three USRowing All-Americans in a single year. The Tennessee
              Indoor Rowing Championships. <span className="text-utc-gold-bright font-semibold">429 alumni</span>{" "}
              and counting.
            </p>
            <p className="mt-3 text-lg text-white/65 max-w-2xl">
              We&rsquo;re rebuilding the program — and we need every alum to help us tell its story.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 animate-fade-up delay-200">
              <Link
                href="/history"
                className="bg-utc-gold text-utc-navy-deep font-semibold px-7 py-3.5 rounded-md hover:bg-utc-gold-bright transition-all hover:shadow-xl hover:shadow-utc-gold/30 inline-flex items-center gap-2"
              >
                Read our history
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/submit"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3.5 rounded-md hover:bg-white/20 hover:border-utc-gold/60 transition-all"
              >
                I rowed at UTC
              </Link>
              <Link
                href="/donate"
                className="text-white/80 underline decoration-utc-gold underline-offset-8 decoration-2 px-3 py-3.5 hover:text-utc-gold-bright transition-colors"
              >
                Support the team →
              </Link>
            </div>
          </div>
        </div>

        {/* River bend transition into next section */}
        <div className="absolute bottom-0 left-0 right-0 text-paper" aria-hidden>
          <RiverBendCurve className="w-full h-24 sm:h-32" />
        </div>
      </section>

      {/* ============================================================
          ACRA NATIONALS BANNER — pulse with urgency
         ============================================================ */}
      <section className="bg-paper relative">
        <div className="mx-auto max-w-6xl px-4 -mt-12 relative z-10">
          <div className="bg-gradient-to-r from-utc-gold-bright via-utc-gold to-utc-gold-deep rounded-2xl shadow-2xl shadow-utc-navy/15 p-1">
            <div className="bg-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                  <p className="text-utc-navy uppercase text-xs tracking-[0.25em] font-bold">
                    Racing now · ACRA Nationals · May 17, 2026
                  </p>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy">
                  Mako · Conner · Tyler · Jay
                  <span className="block text-base font-normal text-utc-navy/65 font-sans mt-1">
                    UTC&rsquo;s first ACRA crew since the program restarted Fall 2025. Coached by
                    Michael Kinsey.
                  </span>
                </h2>
              </div>
              <Link
                href="/donate"
                className="bg-utc-navy text-white font-semibold px-6 py-3.5 rounded-md hover:bg-utc-navy-deep transition-all hover:shadow-lg whitespace-nowrap inline-flex items-center justify-center gap-2"
              >
                Send them off
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATS — animated count-up
         ============================================================ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            <Stat number={42} suffix="" label="years of UTC Rowing" hint="1983 — present" />
            <Stat number={alumniCount} label="alumni on the roster" hint="and growing" />
            <Stat number={1} label="Olympic gold medal" hint="Beery · Athens 2004" />
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED ALUMNI — Olympians, scholars, lifers
         ============================================================ */}
      <FeaturedAlumni />

      {/* ============================================================
          ERA CARDS — five chapters
         ============================================================ */}
      <EraCards eraCounts={eraCounts} />

      {/* ============================================================
          CALL TO ACTION — Help complete the record
         ============================================================ */}
      <section className="bg-utc-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(200,182,130,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center">
          <p className="text-utc-gold uppercase text-xs tracking-[0.25em] font-semibold mb-4">
            The biggest archive isn&rsquo;t institutional
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            It&rsquo;s in alumni filing cabinets, phones, and memory.
          </h2>
          <p className="text-lg text-white/75 max-w-2xl mx-auto mb-10">
            We have 429 names on file. We&rsquo;re missing thousands of stories, hundreds of photos,
            and most of what made each crew unforgettable to itself. If you rowed at UTC — or know
            someone who did — your contribution makes the picture more complete.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/submit"
              className="bg-utc-gold text-utc-navy-deep font-semibold px-7 py-3.5 rounded-md hover:bg-utc-gold-bright transition-all hover:shadow-xl"
            >
              Add yourself to the record
            </Link>
            <Link
              href="/alumni"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3.5 rounded-md hover:bg-white/20 transition-all"
            >
              Browse the alumni roster
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({
  number,
  suffix = "",
  label,
  hint,
}: {
  number: number;
  suffix?: string;
  label: string;
  hint?: string;
}) {
  return (
    <div>
      <AnimatedCounter
        end={number}
        suffix={suffix}
        className="block font-display text-6xl sm:text-7xl font-bold text-utc-navy"
      />
      <div className="mt-3 text-base font-medium text-utc-navy/80">{label}</div>
      {hint && (
        <div className="mt-1 text-sm text-muted-foreground italic">{hint}</div>
      )}
    </div>
  );
}
