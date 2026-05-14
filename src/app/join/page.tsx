import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "@/components/svg-rowing";

export const metadata = {
  title: "Join the team — UTC Rowing",
  description:
    "Want to row at UTC? No experience needed. How to get on the water with UTC Rowing — UTC undergrads and grad students, any major, any year.",
};

export default function JoinPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-utc-navy text-white overflow-hidden">
        <Image
          src="/photos/morning-row-tennessee.jpg"
          alt="UTC Rowing crew on the Tennessee River, Chattanooga."
          fill
          sizes="100vw"
          preload
          quality={75}
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-utc-navy via-utc-navy/70 to-utc-navy/30 pointer-events-none"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 pt-32 pb-16 sm:pt-44">
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-3">
            Want to row at UTC?
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold">
            No experience needed.
          </h1>
          <p className="mt-4 text-lg text-white/85 max-w-2xl">
            UTC Rowing is a club sport. We row out of the William Raoul Rowing Center on the
            Tennessee River. If you want to be in a boat, email Coach Kinsey.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-utc-navy mb-3">
              How to start
            </h2>
            <p className="text-foreground/80 mb-2">
              <a
                href="mailto:kinseymi@radl.solutions?subject=UTC%20Rowing%20%E2%80%94%20interested%20in%20joining"
                className="link-draw text-utc-navy font-semibold"
              >
                kinseymi@radl.solutions
              </a>
            </p>
            <p className="text-foreground/80 mb-2">
              <a
                href="tel:+14236024277"
                className="link-draw text-utc-navy font-semibold"
              >
                (423) 602-4277
              </a>
            </p>
            <p className="text-sm text-muted-foreground">
              Tell us your year, your major, and whether you&rsquo;ve ever sat in a rowing shell.
              Either answer is fine.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-utc-navy mb-3">
              Where we row
            </h2>
            <p className="text-foreground/80">
              Chattanooga Rowing Club, 1001 Riverside Dr, Chattanooga, TN. We row early &mdash;
              typically before class. Coach will pick a morning, walk you through the equipment,
              and put you in a boat.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-utc-navy mb-3">
              Who can row
            </h2>
            <ul className="text-foreground/80 text-sm space-y-2">
              <li>UTC undergrads and grad students. Any major, any year.</li>
              <li>
                No experience required. Most of the current crew started rowing in April 2026.
              </li>
              <li>
                Rowed in high school or a junior program? Bring your erg score and your boat
                history &mdash; we&rsquo;ll find the right seat.
              </li>
              <li>
                Walk-on from Chattanooga State or another local campus? Ask the coach about
                partnership options.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-utc-navy mb-3">
              What it costs you
            </h2>
            <ul className="text-foreground/80 text-sm space-y-2">
              <li>Time. Practice 4&ndash;5 mornings a week in season, plus erg work off-season.</li>
              <li>
                Travel to regattas in the fall (Hooch) and spring (TIRC, SIRA, ACRA).
              </li>
              <li>
                A small annual club fee. UTC Club Sports + USRowing cover insurance for practice
                and travel.
              </li>
              <li>
                Equipment is provided. Bring tight athletic clothes, a water bottle, and a
                willingness to be cold sometimes.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-utc-gold uppercase text-xs tracking-[0.25em] font-semibold mb-4">
            Get on the water
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5 leading-tight">
            One email. The boat ride is the rest.
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:kinseymi@radl.solutions?subject=UTC%20Rowing%20%E2%80%94%20interested%20in%20joining"
              className="bg-utc-gold text-utc-navy-deep font-semibold px-7 py-3.5 rounded-md hover:bg-utc-gold-bright transition-all hover:shadow-xl inline-flex items-center gap-2"
            >
              Email Coach Kinsey
              <ChevronRight className="w-4 h-4" />
            </a>
            <Link
              href="/team"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3.5 rounded-md hover:bg-white/20 hover:border-utc-gold/60 transition-all"
            >
              Meet the current crew &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
