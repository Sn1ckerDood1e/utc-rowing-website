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
      label: "Founding",
      span: "1974 – 1983",
      count: eraCounts.founding ?? null,
      headline: "Lookout Rowing Club born",
      detail:
        "Bill Raoul, Jack Fish, and Terry Carney start LRC. UTC affiliates row under the LRC umbrella.",
      gradient: "from-utc-navy-darker to-river-blue-dark",
    },
    {
      slug: "carney",
      label: "Carney era",
      span: "1983 – 1989",
      count: eraCounts.carney ?? null,
      headline: "First UTC crews on the river",
      detail:
        "Coach Terry Carney (Kent School, MIT) takes UTC into competition. Most of this era is undocumented — we need alumni to fill it in.",
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
      span: "2018 – 2024",
      count: eraCounts.worth ?? null,
      headline: "Cohort that needs surfacing",
      detail:
        "Worth-era racing through 2022 then COVID + barge loss. Almost zero roster data on file. The biggest gap we're asking alumni to close.",
      gradient: "from-utc-gold-deep to-river-blue",
    },
    {
      slug: "resurrection",
      label: "Resurrection",
      span: "2025 – now",
      count: eraCounts.resurrection ?? null,
      headline: "ACRA-bound, Fall 2025 restart",
      detail:
        "Four athletes, one M4x, an aging fleet, and a head coach two months out of mechatronics school. The program is back.",
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
            One river. Five chapters. <span className="italic text-utc-gold-deep">One program.</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {eras.map((era) => (
            <Link
              key={era.slug}
              href={`/alumni#${era.slug}`}
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
                      <div className="text-white/50 text-[10px] uppercase tracking-widest">
                        on file
                      </div>
                    </div>
                  )}
                </div>

                <p className="font-semibold text-white mb-2 mt-2">{era.headline}</p>
                <p className="text-white/70 text-sm leading-relaxed flex-1">{era.detail}</p>

                <div className="mt-4 inline-flex items-center text-utc-gold-bright text-sm font-semibold">
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
