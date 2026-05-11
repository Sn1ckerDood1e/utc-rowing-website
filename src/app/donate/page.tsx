import Link from "next/link";
import { ChevronRight, RiverBendCurve } from "@/components/svg-rowing";

export const metadata = {
  title: "Support UTC Rowing",
  description:
    "Help rebuild UTC Rowing — covered racks at the boathouse, an on-campus indoor training room, and the path back to ACRA-level competition.",
};

const GIVING_URL =
  "https://giving.utc.edu/campaigns/42934/donations/new?_gl=1*pfvcug*_gcl_au*MzkyNTMzNTAwLjE3NzUwNjQzMzM.";

// All three tier CTAs open in a new tab (target="_blank") so the visitor
// doesn't lose the UTC Rowing page when they click through:
//   - Tier 1 "Give once"        → target="_blank" → giving.utc.edu
//   - Tier 2 "Give monthly"     → target="_blank" → giving.utc.edu
//   - Tier 3 "Email the program" → target="_blank" → mailto:
const TIERS = [
  {
    label: "Single donation",
    amount: "Any amount",
    detail: "Goes to the rowing program through UTC's official giving portal.",
    cta: "Give once",
    href: GIVING_URL,
  },
  {
    label: "Monthly sustaining donor",
    amount: "$25 / $50 / $100 / $250",
    detail: "Monthly giving is what builds the program back.",
    cta: "Give monthly",
    href: GIVING_URL,
    featured: true,
  },
  {
    label: "Named giving",
    amount: "$1k seat → $25k 8+",
    detail: "Named gifts can be directed to specific boats, racks, or training infrastructure. Send a note and we'll match it to the right line item.",
    cta: "Email the program",
    href: "mailto:kinseymi@radl.solutions?subject=UTC%20Rowing%20named%20giving",
  },
];

// UTC fleet inventory (May 2026): 16 shells, all on the trailer outside since
// 2023, all weather-damaged, several with structural damage.
//   6× 8+    Vespoli (1988–2012) — Biderman, EPB Telecom, William Raoul,
//            John Fish III, Dan Berry, Lee Patton
//   1× 4x    Empacher "Chattanooga" (1980s/90s) — hull breach
//   5× 4+    Vespoli (1996–2009) — Little Debbie, Black Magic, Ultralight,
//            SGA Walker, Ron Nelson
//   1× 2-    Vespoli 2000 — John & Mike Madzi
//   2× 2x    Vespoli 1987 — Patton, Lookout
//   1× 1x    Swift 2020 — Scrappy (the only modern shell)
const NEEDS = [
  {
    title: "Covered racks at the boathouse — a 20×80 pole barn",
    estimate: "Top priority · Fall 2026",
    why: "Sixteen UTC shells live on the team trailer outside, where they've sat since 2023. Every hull has weather damage; several have structural damage. The plan is a fleet of eights to race and pairs to train — none of that is possible while the boats are stacked on a trailer in the open. A 20×80 pole barn at the boathouse gets them under cover and onto stretchers we can actually maintain.",
  },
  {
    title: "Repair the Empacher 'Chattanooga' (4x)",
    estimate: "Boat-specific",
    why: "UTC's own quad — an Empacher from the 1980s/90s named for the city — is sidelined by a hole in the hull big enough to put a fist through. Patching it returns a competition-grade sculling boat to the water under UTC colors. The crew is racing ACRA this year on a 4x loaned from Vespoli; the Empacher is the boat behind it.",
  },
  {
    title: "Maclellan Gym indoor training room",
    estimate: "On-campus",
    why: "UTC has a room in Maclellan Gymnasium reserved for the team. It needs a clean-out, paint, lights, a roof repair (it leaks, with possible mold), and ergs to outfit it. Year-round training space on campus — not weather-dependent, not borrowed.",
  },
  {
    title: "Bridge: Lookout Rowing Club partnership",
    estimate: "Spring 2026",
    why: "This semester the four athletes joined Lookout Rowing Club so they could train and race on water-worthy equipment. LRC keeps the program on the water while the racks and the Empacher repair get funded. Membership and shared-equipment fees are real line items — a bridge, not the destination.",
  },
];

export default function DonatePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-river-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(200,182,130,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            {/* Photo first on mobile, second on lg */}
            <div className="order-1 lg:order-2 relative rounded-xl overflow-hidden shadow-2xl shadow-utc-navy-deep/50 ring-1 ring-white/10 max-w-md mx-auto lg:max-w-none">
              <video
                className="w-full h-auto block"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/videos/m4x-acra-prep-poster.jpg"
                aria-label="UTC Rowing's 2026 ACRA crew at the May 2 scrimmage in Oak Ridge — Abraham Mako, Tyler Burkett, Conner Richardson, Jay Pollard"
              >
                <source src="/videos/m4x-acra-prep.mp4" type="video/mp4" />
              </video>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-utc-navy-deep/60 via-transparent to-transparent"
              />
              <p className="absolute bottom-4 left-4 right-4 text-white/95 text-sm font-medium tracking-wide">
                <span className="text-utc-gold-bright uppercase text-[10px] tracking-[0.25em] font-bold block mb-1">
                  Fund the boat
                </span>
                Mako · Burkett · Richardson · Pollard — ACRA M4x
              </p>
            </div>

            <div className="order-2 lg:order-1 max-w-2xl">
              <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-5">
                Support the rebuild
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
                Help bring UTC Rowing
                <br />
                <span className="text-gradient-gold italic">back to ACRA.</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                An Olympic gold. Three USRowing Academic All-Americans in one season. Rowing on
                the Tennessee River between the Walnut Street Bridge and Williams Island since 1971.
              </p>
              <p className="text-lg text-white/75 mt-3">
                The program is back with four athletes and one M4x at ACRA this year, racing on a
                Vespoli loaner &mdash; UTC&rsquo;s own 4x has a hole in the hull big enough to put a
                fist through. The longer view is a fleet of eights to race and pairs to train. What
                gets built — the racks, the boats, the training space — is decided by what alumni
                and friends fund.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-paper" aria-hidden>
          <RiverBendCurve className="w-full h-20" />
        </div>
      </section>

      {/* Pre-ACRA urgency banner */}
      <section className="bg-paper relative">
        <div className="mx-auto max-w-6xl px-4 -mt-10 sm:-mt-12 relative z-10">
          <div className="bg-gradient-to-r from-utc-gold-bright via-utc-gold to-utc-gold-deep rounded-2xl shadow-2xl shadow-utc-navy/15 p-1">
            <div className="bg-white rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                  <p className="text-utc-navy uppercase text-xs tracking-[0.25em] font-bold">
                    Pre-ACRA push · Send the crew off May 17
                  </p>
                </div>
                <p className="text-utc-navy/80 text-base sm:text-lg leading-snug">
                  Four athletes, one M4x, racing at Melton Hill Lake in Oak Ridge in seven days.
                  Every gift before May 17 goes to this crew&rsquo;s travel and the next boat
                  behind them.
                </p>
              </div>
              <a
                href="#how-to-give"
                className="bg-utc-navy text-white font-semibold px-5 py-3 rounded-md hover:bg-utc-navy-deep transition-all hover:shadow-lg whitespace-nowrap inline-flex items-center justify-center gap-2 self-start sm:self-auto"
              >
                Give now
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Where the money goes */}
      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <div className="mb-12 max-w-2xl">
            <p className="text-utc-navy/60 uppercase text-xs tracking-[0.2em] font-semibold mb-3">
              Where the money goes
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-utc-navy leading-tight">
              Concrete needs, in priority order.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {NEEDS.map((n) => (
              <div
                key={n.title}
                className="bg-white border-l-4 border-utc-gold rounded-md p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-display text-xl font-bold text-utc-navy">{n.title}</h3>
                  <span className="text-utc-gold-deep text-xs font-semibold uppercase tracking-wider whitespace-nowrap mt-1.5">
                    {n.estimate}
                  </span>
                </div>
                <p className="text-foreground/80">{n.why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to give */}
      <section id="how-to-give" className="bg-utc-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(200,182,130,0.12),transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-20">
          <div className="mb-12 max-w-2xl">
            <p className="text-utc-gold uppercase text-xs tracking-[0.2em] font-semibold mb-3">
              How to give
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Three paths <span className="italic text-utc-gold-bright">in.</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-3 overflow-visible">
            {TIERS.map((t) => (
              <div
                key={t.label}
                className={`relative overflow-visible rounded-xl p-6 ${
                  t.featured
                    ? "bg-gradient-to-br from-utc-gold-bright to-utc-gold text-utc-navy-deep border-2 border-utc-gold shadow-lg shadow-utc-gold/30"
                    : "border bg-white/5 border-white/15 text-white"
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-utc-navy text-utc-gold text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                    Recommended
                  </span>
                )}
                <h3 className="font-display text-xl font-bold mb-2">{t.label}</h3>
                <p
                  className={`font-mono-numbers text-2xl font-bold mb-3 ${
                    t.featured ? "text-utc-navy-deep" : "text-utc-gold-bright"
                  }`}
                >
                  {t.amount}
                </p>
                <p
                  className={`text-sm mb-6 leading-relaxed ${
                    t.featured ? "text-utc-navy-deep/85" : "text-white/70"
                  }`}
                >
                  {t.detail}
                </p>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 font-semibold ${
                    t.featured
                      ? "bg-utc-navy text-white px-5 py-2.5 rounded-md hover:bg-utc-navy-deep transition-colors"
                      : "text-utc-gold-bright link-draw"
                  }`}
                >
                  {t.cta}
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-white/75 max-w-3xl">
            All gifts route through UTC&rsquo;s official giving portal — campaign 42934 is dedicated
            to UTC Rowing. UTC is a qualified 501(c)(3) tax-exempt institution.
          </p>
        </div>
      </section>

      {/* Alternative help */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="font-display text-2xl text-utc-navy">
            Not ready to give?{" "}
            <Link href="/submit" className="link-draw text-utc-gold-deep">
              Add yourself or a teammate to the alumni roster.
            </Link>
          </p>
          <p className="mt-3 text-muted-foreground text-sm">
            Alumni network density is its own form of capital.
          </p>
        </div>
      </section>
    </>
  );
}
