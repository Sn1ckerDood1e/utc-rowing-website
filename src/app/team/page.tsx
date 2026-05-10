import Image from "next/image";
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
  bio: string;
  photo?: { src: string; width: number; height: number; alt: string };
};

// M4x lineup, stroke → bow (the order the boat is rigged from the coxswain's
// view, and the order Coach Kinsey reads them off).
// All UTC class of 2027. Only Burkett, Richardson, and Pollard are active-duty
// U.S. Army — Mako is NOT military.
const ROSTER: Athlete[] = [
  {
    name: "Abraham Mako",
    seat: "Stroke · 4 seat",
    classYear: "Class of 2027",
    bio: "The program's most experienced rower and the bow-stroke of the M4x. Started at Chattanooga Juniors, then helped Jack Cawood stand up Chattanooga State Rowing before transferring to UTC. Sets the rate the other three follow.",
    photo: {
      src: "/photos/abraham-single-aquarium.jpg",
      width: 1280,
      height: 1752,
      alt: "Abraham Mako rowing a single past the Tennessee Aquarium at sunset, the glass pyramid reflected in the river",
    },
  },
  {
    name: "Conner Richardson",
    seat: "3 seat",
    classYear: "Class of 2027 · U.S. Army active duty",
    bio: "First pulled an oar on April 6, 2026 — the day after Easter, about six weeks before ACRA.",
  },
  {
    name: "Tyler Burkett",
    seat: "2 seat",
    classYear: "Class of 2027 · U.S. Army active duty",
    bio: "First day in a boat: April 6, 2026. Six weeks of training before nationals.",
  },
  {
    name: "Jay Pollard",
    seat: "Bow · 1 seat",
    classYear: "Class of 2027 · U.S. Army active duty",
    bio: "Started rowing April 6, 2026. Anchors the bow and balances the boat from the seat that feels every wobble first.",
  },
];

type Regatta = {
  name: string;
  date: string;
  location: string;
  entries: string;
};

// "Where the boat goes next" — confirmed by Coach Kinsey, May 2026.
// Dates beyond ACRA 2026 are seasonal only; do not invent exact days.
const UPCOMING: Regatta[] = [
  {
    name: "ACRA Championships",
    date: "May 17, 2026",
    location: "Melton Hill Lake · Oak Ridge, TN",
    entries: "Men's M4x — the immediate target",
  },
  {
    name: "Head of the Hooch",
    date: "Fall 2026",
    location: "Chattanooga, TN",
    entries: "UTC boats, including alumni boat(s)",
  },
  {
    name: "TIRC — Tennessee Intercollegiate Rowing Championship",
    date: "Spring 2027",
    location: "Tennessee",
    entries: "UTC entries plus an alumni event",
  },
  {
    name: "SIRA Championship",
    date: "Spring 2027",
    location: "Southeast Intercollegiate Rowing Association",
    entries: "UTC entries",
  },
  {
    name: "ACRA Championships",
    date: "Spring 2027",
    location: "TBD",
    entries: "UTC entries",
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

          <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden grid sm:grid-cols-[320px_1fr]">
            <div className="relative bg-utc-navy-deep">
              <Image
                src="/photos/kinsey-headshot.jpg"
                alt="Coach Michael Kinsey at a UTC men's basketball game"
                width={1280}
                height={824}
                preload
                sizes="(min-width: 640px) 320px, 100vw"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-utc-gold-deep uppercase text-xs tracking-[0.2em] font-semibold mb-2">
                Head Coach · December 2025 – present
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy mb-3">
                Michael Kinsey
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Coach Kinsey has been on the launch at Chattanooga Rowing since 2022,
                mentored under Bill Zack, and spent his last two summers coaching at
                the Craftsbury Outdoor Center in Vermont. He&rsquo;s a UTC mechatronics
                graduate (December 2025) and the founder of Radl &mdash; and in Fall
                2025, five months out from his own graduation, he restarted UTC Rowing.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                He&rsquo;s also the founding head coach of Chattanooga State Rowing,
                running both programs out of the same boathouse.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                <span className="block">
                  <a
                    href="mailto:kinseymi@radl.solutions"
                    className="link-draw text-utc-navy font-semibold"
                  >
                    kinseymi@radl.solutions
                  </a>
                </span>
                <span className="block font-mono-numbers text-utc-navy/85">
                  <a href="tel:+14236024277" className="link-draw">
                    (423) 602-4277
                  </a>
                </span>
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
              on &mdash; check back after Oak Ridge.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Athlete cards — stroke-to-bow (Mako → Richardson → Burkett → Pollard) */}
            <ul className="grid gap-5 sm:grid-cols-2">
              {ROSTER.map((a) => (
                <li
                  key={a.name}
                  className="bg-white border border-border rounded-xl shadow-sm overflow-hidden flex flex-col"
                >
                  {a.photo && (
                    <div className="relative aspect-[4/5] bg-utc-navy-deep">
                      <Image
                        src={a.photo.src}
                        alt={a.photo.alt}
                        width={a.photo.width}
                        height={a.photo.height}
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col">
                    <p className="text-utc-gold-deep uppercase text-[11px] tracking-[0.22em] font-bold mb-2">
                      {a.seat}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-utc-navy mb-2">
                      {a.name}
                    </h3>
                    {/* TODO(launch): hometown — coach to fill in */}
                    <p className="text-xs text-utc-navy/60 uppercase tracking-[0.18em] font-semibold mb-2">
                      {a.classYear}
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {a.bio}
                    </p>
                  </div>
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
                aria-label="UTC Rowing's 2026 ACRA crew at the May 2 scrimmage in Oak Ridge — Abraham Mako, Tyler Burkett, Conner Richardson, Jay Pollard"
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
                Scrimmage at Oak Ridge &mdash; May 2, 2026.
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
              Where the boat goes next.
            </h2>
            <p className="mt-4 text-foreground/75">
              ACRA first. Then a full year of racing &mdash; Hooch in the fall, the
              spring circuit through TIRC, SIRA, and back to ACRA.
            </p>
          </div>

          <ol className="relative border-l-2 border-utc-gold/40 ml-2 sm:ml-4 space-y-5">
            {UPCOMING.map((r, i) => (
              <li
                key={`${r.name}-${r.date}`}
                className="relative pl-6 sm:pl-8"
              >
                <span
                  aria-hidden
                  className={`absolute -left-[7px] top-6 w-3 h-3 rounded-full ring-4 ring-paper-grain ${
                    i === 0 ? "bg-utc-gold-bright" : "bg-utc-gold/70"
                  }`}
                />
                <div className="bg-white border border-border rounded-xl shadow-sm p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-sm text-muted-foreground">
            Dates beyond ACRA 2026 firm up as regatta calendars publish.
          </p>
        </div>
      </section>
    </>
  );
}
