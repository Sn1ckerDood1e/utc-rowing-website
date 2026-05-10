import Link from "next/link";
import { ChevronRight, OarMark, RiverBendCurve } from "@/components/svg-rowing";

export const metadata = {
  title: "Support UTC Rowing",
  description:
    "Help rebuild UTC Rowing — boats, the boathouse expansion, ACRA travel, and equipment.",
};

const TIERS = [
  {
    label: "Single donation",
    amount: "Any amount",
    detail: "Goes to the rowing program through UTC Athletics' giving portal.",
    cta: "Give once",
    href: "https://gomocs.com/sports/2018/9/26/giving.aspx",
    accent: "bg-utc-gold/20",
  },
  {
    label: "Monthly sustaining donor",
    amount: "$25 / $50 / $100 / $250",
    detail: "Monthly giving is what builds the program back. Sustained, predictable, real.",
    cta: "Give monthly",
    href: "https://gomocs.com/sports/2018/9/26/giving.aspx",
    accent: "bg-utc-gold/30",
    featured: true,
  },
  {
    label: "Named giving",
    amount: "$1k seat → $100k+ bay",
    detail: "Name a seat, an oar, a boat, or the boathouse bay. Email to coordinate.",
    cta: "Email Coach Kinsey",
    href: "mailto:kinseymi@radl.solutions?subject=UTC%20Rowing%20named%20giving",
    accent: "bg-river-blue/20",
  },
];

const NEEDS = [
  {
    title: "20 × 80 pole barn",
    estimate: "Capital project",
    why: "Boathouse expansion + secure on-site equipment storage. Currently UTC operates without dedicated covered storage.",
  },
  {
    title: "Replacement barges",
    estimate: "High priority",
    why: "UTC's barges were lost in the 2022 flood. Restoring practice infrastructure is the most direct path to growing the team back.",
  },
  {
    title: "ACRA-level shells",
    estimate: "4x and 8+",
    why: "Modern shells to compete at the American Collegiate Rowing Association national level. Current ACRA crew rows on borrowed equipment.",
  },
  {
    title: "Trailer + tow vehicle",
    estimate: "Travel-critical",
    why: "Reliable transport to away regattas. Spring travel circuit covers SIRA, Dad Vail, and ACRA Nationals.",
  },
];

export default function DonatePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-river-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(200,182,130,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-5">
              Support the rebuild
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
              Help bring UTC Rowing
              <br />
              <span className="text-gradient-gold italic">all the way back.</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
              An Olympic gold medalist. Three USRowing All-Americans in a single year. Forty-plus
              years of Tennessee River competitors.
            </p>
            <p className="text-lg text-white/65 max-w-2xl mt-3">
              After a hard chapter, the program is back with four athletes. We&rsquo;re asking the
              alumni community to help us rebuild what comes next.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-paper" aria-hidden>
          <RiverBendCurve className="w-full h-20" />
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
              Concrete needs, not abstractions.
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
      <section className="bg-utc-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(200,182,130,0.12),transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-20">
          <div className="mb-12 max-w-2xl">
            <p className="text-utc-gold uppercase text-xs tracking-[0.2em] font-semibold mb-3">
              How to give
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Three paths. <span className="italic text-utc-gold-bright">All flow through UTC Athletics.</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {TIERS.map((t) => (
              <div
                key={t.label}
                className={`relative rounded-xl p-6 border ${
                  t.featured
                    ? "bg-gradient-to-br from-utc-gold-bright to-utc-gold text-utc-navy-deep border-utc-gold-bright shadow-2xl shadow-utc-gold/30 scale-[1.02]"
                    : "bg-white/5 border-white/15 text-white"
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-utc-navy text-utc-gold text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                    Recommended
                  </span>
                )}
                <h3 className={`font-display text-xl font-bold mb-2 ${t.featured ? "" : ""}`}>
                  {t.label}
                </h3>
                <p
                  className={`font-mono-numbers text-2xl font-bold mb-3 ${
                    t.featured ? "text-utc-navy-deep" : "text-utc-gold-bright"
                  }`}
                >
                  {t.amount}
                </p>
                <p className={`text-sm mb-6 leading-relaxed ${t.featured ? "text-utc-navy-deep/85" : "text-white/70"}`}>
                  {t.detail}
                </p>
                <a
                  href={t.href}
                  rel="noreferrer"
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

          <p className="mt-8 text-sm text-white/50 max-w-3xl">
            Donations route through UTC Athletics&rsquo; official giving portal. Tag the gift{" "}
            &ldquo;Rowing&rdquo; or &ldquo;Club Sports — Rowing&rdquo; if prompted. UTC is a
            qualified 501(c)(3) tax-exempt institution.
          </p>
        </div>
      </section>

      {/* Alternative help */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <span className="inline-block text-utc-gold w-16 mb-4">
            <OarMark className="w-16" />
          </span>
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
