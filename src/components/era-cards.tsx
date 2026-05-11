import Link from "next/link";
import { ChevronRight } from "./svg-rowing";

type Era = {
  slug: string;
  label: string;
  span: string;
  count: number | null;
  headline: string;
  detail: string;
  gradient: string;
};

export function EraCards({ eraCounts }: { eraCounts: Record<string, number> }) {
  const eras: Era[] = [
    {
      slug: "founding",
      label: "First pulls",
      span: "1971 – 1983",
      count: eraCounts.founding ?? null,
      headline: "Pocock shells, an HPER class, and LRC",
      detail:
        "Bill Raoul donates 8 Pocock singles to UTC in 1971. In 1974 he, Jack Fish, and Terry Carney found Lookout Rowing Club. UTC affiliates row under the LRC umbrella.",
      gradient: "from-utc-navy-darker to-river-blue-dark",
    },
    {
      slug: "carney",
      label: "Carney era",
      span: "1983 – 1989",
      count: eraCounts.carney ?? null,
      headline: "First UTC crews and first medals",
      detail:
        "Coach Terry Carney takes UTC into competition. 1985: first medal (M Nov 4+, Hooch Atlanta). 1988: first national-championship medal (W V 4+ bronze, Dad Vail).",
      gradient: "from-river-blue-dark to-utc-navy",
    },
    {
      slug: "espeseth",
      label: "Espeseth era",
      span: "1989 – 2017",
      count: eraCounts.espeseth ?? null,
      headline: "Olympic talent on Tennessee water",
      detail:
        "Twenty-eight years. Three USRowing Academic All-Americans in 1995–96 alone. Beery's 2004 Olympic gold. The Tennessee Indoor Rowing Championship.",
      gradient: "from-utc-navy to-utc-gold-deep",
    },
    {
      slug: "worth",
      label: "Worth era",
      span: "2018 – 2022/23",
      count: eraCounts.worth ?? null,
      headline: "A roster we still need to fill in",
      detail:
        "Racing through 2022, then the boats lost in the December 2022 – January 2023 ice and a slow exit from competition. Almost zero roster data on file — the biggest gap we're asking alumni to close.",
      gradient: "from-utc-gold-deep to-river-blue",
    },
    {
      slug: "resurrection",
      label: "Resurrection",
      span: "2025 – now",
      count: eraCounts.resurrection ?? null,
      headline: "ACRA-bound, Fall 2025 restart",
      detail:
        "Four athletes, an ACRA M4x, and the first competitive UTC entry in five years. The fleet is aging and the boathouse is shared, but the boat is on the water and the program is back.",
      gradient: "from-river-blue to-utc-gold-bright",
    },
  ];

  return (
    <section className="bg-paper-grain">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="text-utc-navy/60 uppercase text-xs tracking-[0.2em] font-semibold mb-3">
            Five eras
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-utc-navy leading-tight">
            One Tennessee. Five chapters. <span className="italic text-utc-gold-deep">One program.</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {eras.map((era) => (
            <Link
              key={era.slug}
              href={`/alumni#${era.slug}`}
              aria-label={`Browse ${era.label} alumni`}
              className="group relative overflow-hidden rounded-xl bg-utc-navy text-white transition-transform duration-300 hover:translate-y-[-3px] hover:shadow-2xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${era.gradient} opacity-90`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_50%)]" />

              <div className="relative p-6 min-h-[240px] flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-widest font-semibold">
                      {era.span}
                    </p>
                    <h3 className="font-display text-2xl font-bold mt-1">{era.label}</h3>
                  </div>
                  {era.count !== null && era.count > 0 && (
                    <div className="text-right">
                      <div className="font-mono-numbers text-3xl font-bold text-utc-gold-bright">
                        {era.count}
                      </div>
                      <div className="text-white/75 text-xs uppercase tracking-widest">
                        on file
                      </div>
                    </div>
                  )}
                </div>

                <p className="font-semibold text-white mb-2 mt-2">{era.headline}</p>
                <p className="text-white/70 text-sm leading-relaxed flex-1">{era.detail}</p>

                <div
                  aria-hidden="true"
                  className="mt-4 inline-flex items-center text-utc-gold-bright text-sm font-semibold"
                >
                  Browse {era.label.toLowerCase()} alumni
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
