import Image from "next/image";
import Link from "next/link";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { AnimatedCounter } from "@/components/animated-counter";
import { FeaturedAlumni } from "@/components/featured-alumni";
import { EraCards } from "@/components/era-cards";
import {
  RiverBendCurve,
  ChevronRight,
} from "@/components/svg-rowing";

export const revalidate = 3600;

const ERA_KEYS = ["founding", "carney", "espeseth", "worth", "resurrection"] as const;
type EraKey = (typeof ERA_KEYS)[number];

export default async function Home() {
  let alumniCount = 0;
  const eraCounts: Record<string, number> = {
    founding: 0,
    carney: 0,
    espeseth: 0,
    worth: 0,
    resurrection: 0,
  };

  try {
    // Anon-only client — no cookies, so the route stays statically renderable / ISR-eligible.
    const supabase = createSupabasePublicClient();
    // Single round-trip: pull all published alumni eras and tally in JS.
    const { data, error } = await supabase
      .from("alumni")
      .select("era")
      .eq("is_published", true);
    if (error) throw error;
    if (data) {
      alumniCount = data.length;
      for (const row of data) {
        const era = (row as { era: string | null }).era;
        if (era && (ERA_KEYS as readonly string[]).includes(era)) {
          eraCounts[era as EraKey] += 1;
        }
      }
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
      <section className="relative bg-utc-navy-darker text-white overflow-hidden">
        {/* SSR baseline: photograph (LCP) — guaranteed paint, also the video poster fallback */}
        <Image
          src="/photos/morning-row-tennessee.jpg"
          alt="UTC Rowing crew on the Tennessee River, Chattanooga."
          fill
          sizes="100vw"
          preload
          fetchPriority="high"
          quality={75}
          className="object-cover object-center"
        />

        {/*
          Atmospheric loop layered over the photo. Plays once it's playable;
          poster covers the gap on slow connections. Muted + playsInline +
          autoPlay are all required for iOS autoplay.
        */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/pair-tennessee-river-poster.jpg"
          aria-hidden="true"
        >
          <source src="/videos/pair-tennessee-river.webm" type="video/webm" />
          <source src="/videos/pair-tennessee-river.mp4" type="video/mp4" />
        </video>

        {/* Navy gradient overlay for legibility — sits on TOP of both photo and video */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-utc-navy/90 via-utc-navy/60 to-transparent pointer-events-none"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-32 sm:pt-28 sm:pb-44">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-5">
              Rowing at UTC since 1971 · Competing since 1983
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Fifty-five years on
              <br />
              <span className="text-gradient-gold italic">the Tennessee River.</span>
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-white/85 max-w-2xl leading-relaxed">
              One Olympic gold. Three USRowing Academic All-Americans in a single year.{" "}
              <span className="text-utc-gold-bright font-semibold">
                {alumniCount.toLocaleString()} alumni
              </span>{" "}
              and counting.
            </p>
            <p className="mt-3 text-lg text-white/70 max-w-2xl">
              Under Coach Michael Kinsey, we&rsquo;re rebuilding the program from the same stretch
              of water under the Walnut Street Bridge, and we need every alum to help us tell its
              story.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 animate-fade-up delay-200">
              <Link
                href="/donate"
                className="bg-utc-gold text-utc-navy-deep font-semibold px-7 py-4 rounded-md hover:bg-utc-gold-bright transition-all hover:shadow-xl hover:shadow-utc-gold/30 inline-flex items-center gap-2"
              >
                Send the crew off
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/submit"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-4 rounded-md hover:bg-white/20 hover:border-utc-gold/60 transition-all"
              >
                I rowed at UTC →
              </Link>
              {/* Desktop: tertiary text-link — recruit pathway */}
              <Link
                href="/join"
                className="hidden sm:inline-flex text-white/80 underline decoration-utc-gold underline-offset-8 decoration-2 px-3 py-3.5 text-base hover:text-utc-gold-bright transition-colors items-center"
              >
                Want to row at UTC? →
              </Link>
            </div>
            {/* Mobile: tertiary as quieter text-link on its own row */}
            <div className="mt-4 sm:hidden">
              <Link
                href="/join"
                className="text-white/75 underline decoration-utc-gold underline-offset-4 decoration-1 text-sm hover:text-utc-gold-bright transition-colors"
              >
                Want to row at UTC? →
              </Link>
            </div>
          </div>
        </div>

        {/* River bend transition into next section */}
        <div className="absolute bottom-0 left-0 right-0 text-paper pointer-events-none" aria-hidden>
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
                    Racing Saturday · ACRA Nationals · May 17, 2026
                  </p>
                </div>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-utc-navy">
                  <span className="sm:whitespace-nowrap">Abraham Mako</span>
                  {" · "}
                  <span className="sm:whitespace-nowrap">Conner Richardson</span>
                  {" · "}
                  <span className="sm:whitespace-nowrap">Tyler Burkett</span>
                  {" · "}
                  <span className="sm:whitespace-nowrap">Jay Pollard</span>
                  <span className="block text-base font-normal text-utc-navy/65 font-sans mt-1">
                    UTC&rsquo;s first ACRA crew since the program restarted Fall 2025.
                  </span>
                </h2>
              </div>
              <Link
                href="/donate"
                className="bg-utc-navy text-white font-semibold px-6 py-3.5 rounded-md hover:bg-utc-navy-deep transition-all hover:shadow-lg whitespace-nowrap inline-flex items-center justify-center gap-2"
              >
                Send the crew off
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATS — animated count-up
         ============================================================ */}
      <section className="relative overflow-hidden bg-utc-navy">
        <Image
          src="/photos/pair-tennessee-river.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-utc-navy/85 pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {/* TODO(2027): bump to 56 / derive from year */}
            <Stat number={55} suffix="" label="years on the river" hint="1971–present" />
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
            Most of it is in alumni filing cabinets and phones.
          </h2>
          <p className="text-lg text-white/75 max-w-2xl mx-auto mb-10">
            We have {alumniCount.toLocaleString()} names on file. We&rsquo;re missing thousands of
            stories, hundreds of photos, and most of what made each crew unforgettable to itself.
            If you rowed at UTC, or know someone who did, your contribution closes the gaps in
            the record.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/submit"
              className="bg-utc-gold text-utc-navy-deep font-semibold px-7 py-4 rounded-md hover:bg-utc-gold-bright transition-all hover:shadow-xl"
            >
              Add yourself to the record
            </Link>
            <Link
              href="/alumni"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-4 rounded-md hover:bg-white/20 transition-all"
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
        className="block font-display text-6xl sm:text-7xl font-bold text-utc-gold-bright"
      />
      <div className="mt-3 text-base font-medium text-white/85">{label}</div>
      {hint && (
        <div className="mt-1 text-sm text-white/60 italic">{hint}</div>
      )}
    </div>
  );
}
