import { OarMark } from "@/components/svg-rowing";

export const metadata = {
  title: "Contact — UTC Rowing",
  description: "How to reach the UTC Rowing program.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <span className="inline-block text-utc-gold w-12 mb-4">
            <OarMark className="w-12" />
          </span>
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-3">
            Get in touch
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold">Contact</h1>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-utc-navy mb-3">
              Coach Michael Kinsey
            </h2>
            <p className="text-foreground/80 mb-2">
              <a
                href="mailto:kinseymi@radl.solutions"
                className="link-draw text-utc-navy font-semibold"
              >
                kinseymi@radl.solutions
              </a>
            </p>
            <p className="text-sm text-muted-foreground">
              Alumni outreach, fundraising coordination, named-giving opportunities, or scheduling
              a boathouse visit.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-utc-navy mb-3">
              Prospective rowers
            </h2>
            <p className="text-foreground/80">
              Want to row at UTC? No experience needed.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Email Coach Kinsey and we&rsquo;ll get you on the water.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-utc-navy mb-3">
              Submission form
            </h2>
            <p className="text-foreground/80">
              For alumni stories, photos, or roster corrections, please use{" "}
              <a href="/submit" className="link-draw text-utc-navy font-semibold">
                the submission form
              </a>
              . We triage there and reply faster than email.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-utc-navy mb-3">
              Affiliations
            </h2>
            <ul className="text-foreground/80 text-sm space-y-1">
              <li>UTC Club Sports</li>
              <li>ACRA — South region</li>
              <li>SIRA — Southern Intercollegiate Rowing</li>
              <li>USRowing collegiate club member</li>
              <li>Lookout Rowing Club · William Raoul Rowing Center</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
