import Link from "next/link";

export const metadata = {
  title: "Support UTC Rowing",
  description:
    "Help rebuild UTC Rowing — boats, the boathouse expansion, ACRA travel, and equipment.",
};

const TIERS = [
  {
    label: "Single donation",
    detail:
      "Any amount. Goes to the rowing program through UTC Athletics' giving portal.",
    cta: "Give once",
    href: "https://gomocs.com/sports/2018/9/26/giving.aspx",
  },
  {
    label: "Monthly sustaining donor",
    detail:
      "$25 / $50 / $100 / $250 per month. Sustained giving is what builds the program back.",
    cta: "Give monthly",
    href: "https://gomocs.com/sports/2018/9/26/giving.aspx",
  },
  {
    label: "Named giving",
    detail:
      "Name a seat ($1k), an oar ($2.5k), a boat ($25k), or the boathouse bay ($100k+). Email us to coordinate.",
    cta: "Email us",
    href: "mailto:kinseymi@radl.solutions?subject=UTC%20Rowing%20named%20giving",
  },
];

const NEEDS = [
  {
    title: "20×80 pole barn",
    why: "Boathouse expansion + secure equipment storage. Currently the program operates without dedicated covered storage on-site.",
  },
  {
    title: "Replacement barges",
    why: "UTC's barges were lost in the 2022 flood; restoring practice infrastructure is the most direct path to growing the team back.",
  },
  {
    title: "ACRA-level shells (4x and 8+)",
    why: "Modern shells to compete at the American Collegiate Rowing Association national level. Current ACRA crew rows on borrowed equipment.",
  },
  {
    title: "Trailer + tow vehicle",
    why: "Reliable transport to away regattas. Spring travel circuit covers SIRA, Dad Vail, and ACRA Nationals.",
  },
];

export default function DonatePage() {
  return (
    <>
      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <p className="text-utc-gold uppercase text-sm tracking-widest mb-2">
            Support the rebuild
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Help bring UTC Rowing back
          </h1>
          <p className="mt-3 text-white/85 max-w-2xl">
            UTC Rowing produced an Olympic gold medalist, three USRowing
            Academic All-Americans in a single year, and 40+ years of
            Tennessee River competitors. After a hard chapter, the program
            is back with four athletes — and we&rsquo;re asking the alumni
            community to help us rebuild what comes next.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-2xl font-bold text-utc-navy mb-6">
            Where the money goes
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {NEEDS.map((n) => (
              <div
                key={n.title}
                className="border border-border rounded p-5 hover:border-utc-gold transition-colors"
              >
                <h3 className="font-semibold text-utc-navy mb-2">{n.title}</h3>
                <p className="text-sm text-foreground/80">{n.why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-2xl font-bold text-utc-navy mb-6">
            How to give
          </h2>
          <div className="space-y-4">
            {TIERS.map((t) => (
              <div
                key={t.label}
                className="bg-white border border-border rounded p-5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-semibold text-utc-navy text-lg">
                    {t.label}
                  </h3>
                  <p className="text-sm text-foreground/80 mt-1">{t.detail}</p>
                </div>
                <a
                  href={t.href}
                  className="bg-utc-navy text-white font-semibold px-5 py-2.5 rounded hover:bg-utc-navy-deep transition-colors whitespace-nowrap text-center"
                  rel="noreferrer"
                >
                  {t.cta} →
                </a>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            Donations route through UTC Athletics&rsquo; official giving
            portal. Tag the gift &ldquo;Rowing&rdquo; or &ldquo;Club Sports
            — Rowing&rdquo; if prompted.
          </p>
        </div>
      </section>

      <section className="bg-utc-gold-bright/30 border-t border-utc-gold/40">
        <div className="mx-auto max-w-4xl px-4 py-10 text-center">
          <p className="text-utc-navy font-medium">
            Not ready to give? Help in another way:{" "}
            <Link
              href="/submit"
              className="underline decoration-utc-gold underline-offset-4 hover:text-utc-navy-deep"
            >
              add yourself or a teammate to the alumni roster.
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
