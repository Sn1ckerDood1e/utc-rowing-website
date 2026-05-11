import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Contact — UTC Rowing",
  description: "How to reach the UTC Rowing program.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero photo banner — full-bleed, with navy gradient + heading overlay */}
      <section className="relative bg-utc-navy text-white overflow-hidden">
        <Image
          src="/photos/pair-tennessee-river.jpg"
          alt="UTC Rowing pair at sunset on the Tennessee River below Lookout Mountain."
          fill
          sizes="100vw"
          preload
          quality={75}
          className="object-cover object-center"
        />

        {/* Navy gradient for legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-utc-navy via-utc-navy/70 to-utc-navy/30 pointer-events-none"
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl px-4 pt-32 pb-16 sm:pt-44">
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-3">
            Get in touch
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold">Contact</h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            One inbox, one coach, one Tennessee.
          </p>
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
            <p className="mt-3 text-sm text-foreground/80">
              Chattanooga Rowing Club — 1001 Riverside Dr, Chattanooga, TN
            </p>
            <p className="mt-3 text-sm text-foreground/80">
              <a
                href="tel:+14236024277"
                className="link-draw text-utc-navy font-semibold"
              >
                (423) 602-4277
              </a>
            </p>
            <p className="mt-2 text-sm text-foreground/80">
              Instagram:{" "}
              <a
                href="https://www.instagram.com/utc_rowing"
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw text-utc-navy font-semibold"
              >
                @utc_rowing
              </a>
            </p>
            {/* TODO(launch): Facebook handle — coach hasn't provided one yet */}
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
              Best ways to reach us
            </h2>
            <ol className="text-foreground/80 text-sm space-y-2 list-decimal list-inside">
              <li>
                <span className="font-semibold text-utc-navy">Alumni story or photo:</span>{" "}
                <Link href="/submit" className="link-draw text-utc-navy">
                  the submission form
                </Link>{" "}
                — fastest triage.
              </li>
              <li>
                <span className="font-semibold text-utc-navy">Roster correction:</span> same form,
                expand the &ldquo;corrections&rdquo; section.
              </li>
              <li>
                <span className="font-semibold text-utc-navy">Everything else:</span> email Coach
                Kinsey directly.
              </li>
            </ol>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-utc-navy mb-3">
              Affiliations
            </h2>
            <ul className="text-foreground/80 text-sm space-y-1">
              <li>UTC Club Sports</li>
              <li>ACRA — South region</li>
              <li>SIRA — Southeast Intercollegiate Rowing Association</li>
              <li>USRowing collegiate club member</li>
              <li>Lookout Rowing Club · William Raoul Rowing Center</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-utc-gold uppercase text-xs tracking-[0.25em] font-semibold mb-4">
            Two ways in
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5 leading-tight">
            Back the crew, or join the roster.
          </h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8">
            Email is one path. These are the other two.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/donate"
              className="bg-utc-gold text-utc-navy-deep font-semibold px-7 py-3.5 rounded-md hover:bg-utc-gold-bright transition-all hover:shadow-xl inline-flex items-center gap-2"
            >
              Send the crew off →
            </Link>
            <Link
              href="/submit"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3.5 rounded-md hover:bg-white/20 hover:border-utc-gold/60 transition-all"
            >
              Add yourself to the roster →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
