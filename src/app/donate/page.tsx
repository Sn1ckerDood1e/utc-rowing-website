import Link from "next/link";
import { ChevronRight, OarMark, RiverBendCurve } from "@/components/svg-rowing";

export const metadata = {
  title: "Support UTC Rowing",
  description:
    "Help rebuild UTC Rowing — covered rack space at Chattanooga Rowing, replacement 8+ shells, and the path back to ACRA-level competition.",
};

const GIVING_URL =
  "https://giving.utc.edu/campaigns/42934/donations/new?_gl=1*pfvcug*_gcl_au*MzkyNTMzNTAwLjE3NzUwNjQzMzM.";

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
    detail: "Monthly giving is what builds the program back. Sustained, predictable, real.",
    cta: "Give monthly",
    href: GIVING_URL,
    featured: true,
  },
  {
    label: "Named giving",
    amount: "$1k seat → $25k 8+",
    detail: "Name a seat in the new eight, name the boat, or sponsor a covered rack bay. Email to coordinate.",
    cta: "Email Coach Kinsey",
    href: "mailto:kinseymi@radl.solutions?subject=UTC%20Rowing%20named%20giving",
  },
];

const NEEDS = [
  {
    title: "Covered rack space",
    estimate: "Top priority",
    why: "UTC needs dedicated covered rack space at Chattanooga Rowing — protected outdoor storage that keeps shells safe between practices and frees the program from improvised arrangements.",
  },
  {
    title: "Replacement 8+ shell",
    estimate: "ACRA-grade",
    why: "Our long-term direction is racing eights. Replacing UTC's eight with an ACRA-grade competitive shell is the centerpiece capital ask — and it's how the resurrection era starts to compete at the level UTC's history demands.",
  },
  {
    title: "Replacement small boats",
    estimate: "Fleet renewal",
    why: "Modernizing 4+ and 4x equipment so every UTC crew — novice and varsity — rows on shells that match what they meet at the line.",
  },
  {
    title: "Race travel + indoor training",
    estimate: "Operational",
    why: "Spring travel circuit (SIRA, Dad Vail, ACRA), TIRC operations, and ergometer / training-room equipment for the dryland program.",
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
              <span className="text-gradient-gold italic">back to the eight.</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
              An Olympic gold medalist. Three USRowing Academic All-Americans in a single year.
              Rowing on the Tennessee River since 1971.
            </p>
            <p className="text-lg text-white/65 max-w-2xl mt-3">
              The program is back with four athletes and one M4x. Where we go from here — the
              covered rack space, the racing eight — is decided by what alumni and friends help
              us build.
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
      <section className="bg-utc-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(200,182,130,0.12),transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-20">
          <div className="mb-12 max-w-2xl">
            <p className="text-utc-gold uppercase text-xs tracking-[0.2em] font-semibold mb-3">
              How to give
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Three paths. <span className="italic text-utc-gold-bright">All flow through UTC&rsquo;s official giving portal.</span>
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
            All gifts route through UTC&rsquo;s official giving portal — campaign 42934 is dedicated
            to UTC Rowing. UTC is a qualified 501(c)(3) tax-exempt institution.
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
