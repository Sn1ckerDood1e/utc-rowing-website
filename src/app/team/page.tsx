import Link from "next/link";
import { UTCMark } from "@/components/svg-rowing";

export const metadata = {
  title: "Team · UTC Rowing",
  description:
    "Meet UTC Rowing's 2026 crew and see what's next on the calendar.",
};

type Athlete = {
  name: string;
  seat: string;
  classYear: string;
  hometown: string;
};

// M4x lineup, bow → stroke. Matches the order used on the donate page.
const ROSTER: Athlete[] = [
  {
    name: "Abraham Mako",
    seat: "Bow",
    classYear: "Class of TBD",
    hometown: "Hometown TBD",
  },
  {
    name: "Tyler Burkett",
    seat: "2 seat",
    classYear: "Class of TBD",
    hometown: "Hometown TBD",
  },
  {
    name: "Conner Richardson",
    seat: "3 seat",
    classYear: "Class of TBD",
    hometown: "Hometown TBD",
  },
  {
    name: "Jay Pollard",
    seat: "Stroke",
    classYear: "Class of TBD",
    hometown: "Hometown TBD",
  },
];

type Regatta = {
  name: string;
  date: string;
  location: string;
  entries: string;
};

const UPCOMING: Regatta[] = [
  {
    name: "ACRA Championships",
    date: "May 17, 2026",
    location: "Lake Lanier · Gainesville, GA",
    entries: "Men's M4x",
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Hero — full-bleed pair video on the Tennessee River */}
      <section className="relative bg-utc-navy text-white overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/pair-tennessee-river-poster.jpg"
          aria-hidden="true"
        >
          <source src="/videos/pair-tennessee-river.webm" type="video/webm" />
          <source src="/videos/pair-tennessee-river.mp4" type="video/mp4" />
        </video>

        {/* Navy gradient for legibility — on top of the video */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-utc-navy via-utc-navy/70 to-utc-navy/40 pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(200,182,130,0.12),transparent_55%)] pointer-events-none"
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl px-4 pt-32 pb-20 sm:pt-44 sm:pb-28">
          <UTCMark className="w-12 h-12 mb-4" />
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-3">
            The 2026 program
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
            This year&rsquo;s boat.
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed">
            Four athletes, one M4x, racing the Tennessee River and the country.
          </p>
        </div>
      </section>

      {/* Coach */}
      <section className="bg-paper-grain">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <div className="mb-10 max-w-2xl">
            <p className="text-utc-navy/60 uppercase text-xs tracking-[0.2em] font-semibold mb-3">
              Head coach
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-utc-navy leading-tight">
              The coach who brought the program back.
            </h2>
          </div>

          <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden grid sm:grid-cols-[260px_1fr]">
            {/* TODO(launch): coach headshot */}
            <div
              className="relative bg-gradient-to-br from-utc-navy to-utc-navy-deep flex items-center justify-center min-h-[220px] sm:min-h-full"
              aria-hidden
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,210,0,0.18),transparent_55%)]" />
              <UTCMark className="relative w-28 h-28 opacity-90" />
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-utc-gold-deep uppercase text-xs tracking-[0.2em] font-semibold mb-2">
                Head Coach · December 2025 – present
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy mb-3">
                Michael Kinsey
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-3">
                UTC mechatronics graduate (December 2025). Resurrected UTC
                Rowing in Fall 2025 after the program lapsed during COVID and
                the 2022 barge loss. Also founding head coach of Chattanooga
                State Rowing.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Reach Coach Kinsey at{" "}
                <a
                  href="mailto:kinseymi@radl.solutions"
                  className="link-draw text-utc-navy font-semibold"
                >
                  kinseymi@radl.solutions
                </a>
                .
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-utc-navy font-semibold link-draw"
              >
                More ways to get in touch &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Roster + portrait M4x video */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-12 max-w-2xl">
            <p className="text-utc-navy/60 uppercase text-xs tracking-[0.2em] font-semibold mb-3">
              The crew
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-utc-navy leading-tight">
              Bow to stroke. <span className="italic text-utc-gold-deep">Four seats, one boat.</span>
            </h2>
            <p className="mt-4 text-foreground/75">
              UTC&rsquo;s 2026 ACRA M4x. Bios will fill in as the season rolls
              on &mdash; check back after Lake Lanier.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Athlete cards */}
            <ul className="grid gap-5 sm:grid-cols-2">
              {ROSTER.map((a) => (
                <li
                  key={a.name}
                  className="bg-white border border-border rounded-xl shadow-sm p-6 flex flex-col"
                >
                  <p className="text-utc-gold-deep uppercase text-[11px] tracking-[0.22em] font-bold mb-2">
                    {a.seat}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-utc-navy mb-2">
                    {a.name}
                  </h3>
                  {/* TODO(launch): athlete bio + class year + hometown */}
                  <p className="text-sm text-muted-foreground">
                    {a.classYear} &middot; {a.hometown}
                  </p>
                </li>
              ))}
            </ul>

            {/* Vertical M4x video panel */}
            <figure className="relative rounded-xl overflow-hidden shadow-lg ring-1 ring-utc-navy/10 bg-utc-navy-deep self-start">
              <video
                className="w-full h-auto block"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/videos/m4x-acra-prep-poster.jpg"
                aria-label="UTC Rowing M4x at race pace — Tennessee River, May 2026"
              >
                <source src="/videos/m4x-acra-prep.mp4" type="video/mp4" />
              </video>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-utc-navy-deep/70 via-transparent to-transparent pointer-events-none"
              />
              <figcaption className="absolute bottom-4 left-4 right-4 text-white/95 text-sm font-medium">
                <span className="text-utc-gold-bright uppercase text-[10px] tracking-[0.25em] font-bold block mb-1">
                  ACRA prep
                </span>
                The boat in action &mdash; Tennessee River, May 2026.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="bg-paper-grain border-t border-border/60">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <div className="mb-10 max-w-2xl">
            <p className="text-utc-navy/60 uppercase text-xs tracking-[0.2em] font-semibold mb-3">
              On the calendar
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-utc-navy leading-tight">
              Upcoming racing.
            </h2>
          </div>

          <ul className="grid gap-4">
            {UPCOMING.map((r) => (
              <li
                key={`${r.name}-${r.date}`}
                className="bg-white border border-border rounded-xl shadow-sm p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <p className="text-utc-gold-deep uppercase text-[11px] tracking-[0.22em] font-bold mb-1.5">
                    {r.date}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-utc-navy">
                    {r.name}
                  </h3>
                  <p className="text-sm text-foreground/75 mt-1">
                    {r.location}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-utc-navy/60 uppercase text-[10px] tracking-[0.2em] font-semibold mb-1">
                    Entries
                  </p>
                  <p className="font-semibold text-utc-navy">{r.entries}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* TODO(post-ACRA): future regattas — Hooch, TIRC, Dad Vail */}
          <p className="mt-6 text-sm text-muted-foreground">
            More fall and spring regattas added as they&rsquo;re confirmed.
          </p>
        </div>
      </section>
    </>
  );
}
