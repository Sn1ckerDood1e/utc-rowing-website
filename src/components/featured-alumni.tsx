import type { ReactNode } from "react";
import Link from "next/link";
import { MedalIcon } from "./svg-rowing";

type Featured = {
  key: string;
  name: ReactNode;
  classOf: string;
  achievement: string;
  detail: string;
  medalLabel: string;
  medalTone: string;
};

const FEATURED: Featured[] = [
  {
    key: "beery",
    name: "Dan Beery",
    classOf: "Class of 2000",
    achievement: "Olympic Gold · Athens 2004",
    detail:
      "The first U.S. men's eight to win Olympic gold in 40 years. World-record 5:19.85 in the heat.",
    medalLabel: "Gold",
    medalTone: "from-utc-gold-bright to-utc-gold-deep",
  },
  {
    key: "aa-1995-96",
    name: (
      <>
        <span className="whitespace-nowrap">Robert Meeks</span>{" · "}
        <span className="whitespace-nowrap">Paul Turner</span>{" · "}
        <span className="whitespace-nowrap">Valerie Schlatter</span>
      </>
    ),
    classOf: "1995–96",
    achievement: "Three USRowing Academic All-Americans",
    detail:
      "More than any other U.S. college program that year — including Harvard, Yale, MIT, and Princeton.",
    medalLabel: "AA × 3",
    medalTone: "from-utc-gold-bright to-utc-gold-deep",
  },
  {
    key: "thomas",
    name: "Stephen Thomas",
    classOf: "Class of 1995",
    achievement: "1997 World Lightweight Quad",
    detail:
      "Raced for the U.S. lightweight quad at the World Championships in Aiguebelette.",
    medalLabel: "Worlds",
    medalTone: "from-river-blue-light to-river-blue-dark",
  },
  {
    key: "bruce",
    name: "Keith Bruce",
    classOf: "Class of 1994",
    achievement: "First UTC USRowing All-American · 1993–94",
    detail:
      "The original — UTC's first USRowing Collegiate Academic All-American, two years before the 1995–96 sweep.",
    medalLabel: "First",
    medalTone: "from-utc-gold-bright to-utc-gold-deep",
  },
  {
    key: "espeseth",
    name: "Robert Espeseth",
    classOf: "Head Coach 1989–2017",
    achievement: "1984 Olympic Bronze · USRowing Hall of Fame",
    detail:
      "Twenty-eight years at UTC. Coached Beery to gold. Brought the U.S. Women's National Team to Chattanooga for 1996 Olympic prep.",
    medalLabel: "Coach",
    medalTone: "from-utc-navy to-utc-navy-deep",
  },
];

export function FeaturedAlumni() {
  return (
    <section className="bg-utc-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-utc-gold blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-river-blue blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="text-utc-gold uppercase text-xs tracking-[0.2em] font-semibold mb-3">
            Fifty-five years of rowers
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            UTC has produced <span className="text-gradient-gold">Olympians, scholars, and lifers.</span>
          </h2>
          <p className="mt-5 text-white/70 text-lg">
            These names came out of a club. They didn&rsquo;t act like one.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((f, i) => (
            <article
              key={f.key}
              className={`relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-utc-gold/40 transition-all duration-300 hover:translate-y-[-2px] ${
                i === 1 ? "lg:col-span-1 sm:col-span-2 lg:col-start-auto" : ""
              }`}
            >
              <div
                className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${f.medalTone} text-utc-navy-deep text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4`}
              >
                <MedalIcon className="w-3.5 h-3.5" />
                {f.medalLabel}
              </div>
              <h3 className="font-display text-xl font-bold leading-tight mb-1">{f.name}</h3>
              <p className="text-utc-gold-bright text-sm font-medium mb-3">{f.classOf}</p>
              <p className="font-semibold text-white mb-2">{f.achievement}</p>
              <p className="text-white/65 text-sm leading-relaxed">{f.detail}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-white/50 text-sm">
          More alumni to surface as submissions come in. If you know a UTC rower whose story belongs
          here,{" "}
          <Link href="/submit" className="text-utc-gold-bright link-draw">
            tell us
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
