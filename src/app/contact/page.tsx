export const metadata = {
  title: "Contact — UTC Rowing",
  description: "How to reach the UTC Rowing program.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <p className="text-utc-gold uppercase text-sm tracking-widest mb-2">
            Get in touch
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">Contact</h1>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-utc-navy mb-2">
              Coach Michael Kinsey
            </h2>
            <p className="text-foreground/80">
              Email:{" "}
              <a
                href="mailto:kinseymi@radl.solutions"
                className="underline decoration-utc-gold underline-offset-4"
              >
                kinseymi@radl.solutions
              </a>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              For alumni outreach, fundraising coordination, named-giving
              opportunities, or to schedule a boathouse visit.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-utc-navy mb-2">
              Prospective rowers
            </h2>
            <p className="text-foreground/80">
              Want to row at UTC? No experience needed. Email Coach Kinsey
              and we&rsquo;ll get you on the water.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-utc-navy mb-2">
              Submission form
            </h2>
            <p className="text-foreground/80">
              For alumni stories, photos, or roster corrections, please use{" "}
              <a
                href="/submit"
                className="underline decoration-utc-gold underline-offset-4"
              >
                the submission form
              </a>{" "}
              — we triage submissions there and reply faster than email.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-utc-navy mb-2">
              Program affiliations
            </h2>
            <ul className="text-foreground/80 list-disc ml-6 space-y-1">
              <li>University of Tennessee at Chattanooga · Club Sports</li>
              <li>American Collegiate Rowing Association (ACRA) — South region</li>
              <li>Southern Intercollegiate Rowing Association (SIRA)</li>
              <li>USRowing — collegiate club member</li>
              <li>Lookout Rowing Club — host of the William Raoul Rowing Center</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
