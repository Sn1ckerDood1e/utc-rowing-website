import Image from "next/image";
import Link from "next/link";
import { UTCMark } from "@/components/svg-rowing";

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
          alt="UTC Rowing pair on the Tennessee River."
          width={1920}
          height={1080}
          sizes="100vw"
          preload
          quality={75}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Navy gradient for legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-utc-navy via-utc-navy/70 to-utc-navy/30 pointer-events-none"
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl px-4 pt-32 pb-16 sm:pt-44">
          <UTCMark className="w-12 h-12 mb-4" />
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-3">
            Get in touch
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold">Contact</h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            One inbox, one coach, one river.
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
            {/* TODO(launch): phone + Instagram + Facebook handles */}
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
