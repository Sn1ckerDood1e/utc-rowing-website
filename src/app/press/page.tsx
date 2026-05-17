import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Press — UTC Rowing",
  description:
    "Press kit and media contact for UTC Rowing. Quick facts, current crew, coach bio, and direct phone/email.",
};

const QUICK_FACTS: { label: string; value: string }[] = [
  { label: "Founded", value: "1971 (Pocock-shell donation from William G. Raoul)" },
  { label: "First competing as UTC", value: "1983 (under Coach Terry Carney)" },
  { label: "Status", value: "Club sport — UTC Club Sports + USRowing" },
  { label: "Boathouse", value: "William Raoul Rowing Center, 1001 Riverside Dr, Chattanooga, TN" },
  { label: "Olympic alumni", value: "Dan Beery, gold medalist, U.S. Men's Eight, Athens 2004" },
  { label: "Current head coach", value: "Michael Kinsey (since 2025)" },
  { label: "Current roster", value: "Four athletes (M4x), Class of 2027 — first UTC team boat at ACRA in eight years" },
  { label: "Last race", value: "ACRA Nationals, May 15-17 2026, Melton Hill Lake, Oak Ridge TN — M4x 3rd in B Final (7:37.900)" },
  { label: "Next race", value: "Head of the Hooch, Fall 2026, Chattanooga TN" },
];

const CREW: { name: string; seat: string; hometown: string; affiliation?: string }[] = [
  { name: "Abraham Mako", seat: "Stroke · 4 seat", hometown: "Chattanooga, TN" },
  {
    name: "Conner Richardson",
    seat: "3 seat",
    hometown: "Hanau, Germany",
    affiliation: "U.S. Army active duty",
  },
  {
    name: "Tyler Burkett",
    seat: "2 seat",
    hometown: "Red Lion, PA",
    affiliation: "U.S. Army active duty",
  },
  {
    name: "Jay Pollard",
    seat: "Bow · 1 seat",
    hometown: "Kingston, NY",
    affiliation: "U.S. Army active duty",
  },
];

export default function PressPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-utc-navy text-white overflow-hidden">
        <Image
          src="/photos/pair-tennessee-river.jpg"
          alt="UTC Rowing pair on the Tennessee River below Lookout Mountain."
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
            For media
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold">Press kit.</h1>
          <p className="mt-4 text-lg text-white/85 max-w-2xl">
            Quick facts, the current crew, the coach, and a phone number that goes to the actual
            coach. No PR layer.
          </p>
        </div>
      </section>

      {/* Press contact — first thing a reporter needs */}
      <section className="bg-paper-grain border-b border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <p className="text-utc-navy/60 uppercase text-xs tracking-[0.2em] font-semibold mb-3">
            Press contact
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy mb-3">
            Coach Michael Kinsey
          </h2>
          <p className="text-foreground/85 mb-1">
            <a
              href="mailto:kinseymi@radl.solutions?subject=Press%20inquiry%20%E2%80%94%20UTC%20Rowing"
              className="link-draw text-utc-navy font-semibold"
            >
              kinseymi@radl.solutions
            </a>
          </p>
          <p className="text-foreground/85 mb-1">
            <a href="tel:+14236024277" className="link-draw text-utc-navy font-semibold">
              (423) 602-4277
            </a>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Reach out directly. Coach handles his own press; expect a same-day response in race
            week.
          </p>
        </div>
      </section>

      {/* Quick facts */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy mb-6">
            Quick facts
          </h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {QUICK_FACTS.map((f) => (
              <div key={f.label} className="bg-white border-l-4 border-utc-gold rounded-md p-4">
                <dt className="text-utc-navy/60 uppercase text-[11px] tracking-[0.2em] font-bold mb-1">
                  {f.label}
                </dt>
                <dd className="text-foreground/85 text-sm leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 2026 crew lineup */}
      <section className="bg-paper-grain border-y border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy mb-2">
            2026 ACRA crew (M4x)
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Stroke to bow. All Class of 2027.
          </p>
          <ul className="space-y-3">
            {CREW.map((a) => (
              <li
                key={a.name}
                className="bg-white border border-border rounded-md p-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
              >
                <div>
                  <p className="font-display text-lg font-bold text-utc-navy">{a.name}</p>
                  <p className="text-xs text-utc-navy/70 uppercase tracking-[0.18em] font-semibold">
                    {a.seat}
                  </p>
                </div>
                <p className="text-sm text-foreground/75">
                  {a.hometown}
                  {a.affiliation && (
                    <>
                      {" · "}
                      <span className="text-utc-navy/80 font-medium">{a.affiliation}</span>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Coach bio */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy mb-6">
            Coach Michael Kinsey
          </h2>
          <div className="grid gap-6 sm:grid-cols-[180px_1fr]">
            <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-utc-navy-deep ring-1 ring-utc-navy/10 max-w-[180px]">
              <Image
                src="/photos/kinsey-headshot.jpg"
                alt="Coach Michael Kinsey, head coach of UTC Rowing."
                width={1280}
                height={824}
                sizes="180px"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="text-foreground/85 text-sm leading-relaxed space-y-3">
              <p>
                Head coach of UTC Rowing since the program restarted in Fall 2025. Has been on the
                launch at Chattanooga Rowing since 2022, mentored under Bill Zack, and spent his
                last two summers coaching at the Craftsbury Outdoor Center in Vermont.
              </p>
              <p>
                Founder of Radl and a UTC mechatronics graduate (December 2025). Spent time at
                UTSI &mdash; the University of Tennessee Space Institute &mdash; researching
                deposition onto carbon fiber for hypersonic travel.
              </p>
              <p>Also coaches at Chattanooga State, out of the same boathouse.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo + video assets */}
      <section className="bg-paper-grain border-y border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy mb-3">
            Photos &amp; video
          </h2>
          <p className="text-foreground/80 mb-3 text-sm">
            Anything visible on this site is available at higher resolution on request &mdash;
            email Coach Kinsey with the page or asset you need. The sources currently in use:
          </p>
          <ul className="text-foreground/80 text-sm space-y-1.5 list-disc list-inside">
            <li>M4x ACRA-prep video (May 2 2026 scrimmage at Oak Ridge)</li>
            <li>Empacher hull-damage photograph (May 2026, the boat UTC isn&rsquo;t racing)</li>
            <li>Coach Kinsey headshot</li>
            <li>Athlete portraits (Mako)</li>
            <li>River photography (sunrise pair on the Tennessee River)</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
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
        </div>
      </section>

      {/* Recent journal */}
      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-utc-gold uppercase text-xs tracking-[0.25em] font-semibold mb-4">
            Background reading
          </p>
          <h2 className="font-display text-3xl font-bold mb-5 leading-tight">
            Coach&rsquo;s notes from the season.
          </h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8">
            The journal is the program&rsquo;s record in the coach&rsquo;s voice &mdash; useful for
            quotes and color.
          </p>
          <Link
            href="/journal"
            className="bg-utc-gold text-utc-navy-deep font-semibold px-7 py-3.5 rounded-md hover:bg-utc-gold-bright transition-all hover:shadow-xl inline-flex items-center gap-2"
          >
            Read the journal &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
