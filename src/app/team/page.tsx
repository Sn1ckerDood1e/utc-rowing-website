import Image from "next/image";
import Link from "next/link";
import { UTCMark } from "@/components/svg-rowing";

export const metadata = {
  title: "Team · UTC Rowing",
  description:
    "Meet UTC Rowing's 2026–27 squad and coaching staff, and see what's next on the calendar.",
};

type Athlete = {
  name: string;
  seat: string;
  classYear?: string;
  hometown?: string;
  major?: string;
  affiliation?: string; // e.g. "U.S. Army active duty" — omit for civilian rowers
  bio?: string;
  photo?: { src: string; width: number; height: number; alt: string };
};

// Returning rowers from the 2026 ACRA M4x. Abraham Mako (stroke) moved to
// head coach for 2026–27 and is on the coaching card below.
// Burkett, Richardson, and Pollard are active-duty U.S. Army.
const ROSTER: Athlete[] = [
  {
    name: "Connor Richardson",
    seat: "Returning · 2026 ACRA M4x",
    classYear: "Class of 2027",
    hometown: "Hanau, Germany",
    major: "Applied Leadership",
    affiliation: "U.S. Army active duty",
    bio: "First pulled an oar on April 6, 2026 — the day after Easter, about six weeks before ACRA.",
    photo: {
      src: "/photos/team/richardson-acra-portrait.jpg",
      width: 800,
      height: 1000,
      alt: "Connor Richardson at ACRA Nationals, Melton Hill Lake, May 16, 2026.",
    },
  },
  {
    name: "Tyler Burkett",
    seat: "Returning · 2026 ACRA M4x",
    classYear: "Class of 2027",
    hometown: "Red Lion, PA",
    major: "Applied Leadership",
    affiliation: "U.S. Army active duty",
    bio: "First day in a boat: April 6, 2026. Six weeks of training later, he raced the B final at nationals.",
    photo: {
      src: "/photos/team/burkett-acra-portrait.jpg",
      width: 800,
      height: 1000,
      alt: "Tyler Burkett at ACRA Nationals, Melton Hill Lake, May 16, 2026.",
    },
  },
  {
    name: "Jay Pollard",
    seat: "Returning · 2026 ACRA M4x",
    classYear: "Class of 2027",
    hometown: "Kingston, NY",
    major: "Applied Leadership",
    affiliation: "U.S. Army active duty",
    bio: "Started rowing April 6, 2026. Rowed bow in the ACRA M4x — the seat that feels every wobble first.",
    photo: {
      src: "/photos/team/pollard-acra-portrait.jpg",
      width: 800,
      height: 1000,
      alt: "Jay Pollard at ACRA Nationals, Melton Hill Lake, May 16, 2026.",
    },
  },
];

// New to the squad for 2026–27. Names only until bios and portraits come in —
// add classYear / hometown / major / bio / photo as they arrive.
const INCOMING: Athlete[] = [
  {
    name: "Paxton Anderson",
    seat: "New for 2026–27",
    classYear: "Class of 2027",
    hometown: "Chattanooga, TN",
    major: "Mechanical Engineering",
  },
  { name: "Ben Pesterfield", seat: "New for 2026–27" },
  { name: "Joshua Newburry", seat: "New for 2026–27" },
  { name: "Lucas Cupples", seat: "New for 2026–27" },
  { name: "Luke Schomburg", seat: "New for 2026–27" },
  { name: "Merrit DeVries", seat: "New for 2026–27" },
];

type Regatta = {
  name: string;
  date: string;
  location: string;
  entries: string;
};

// "Where the boat goes next." Hooch dates verified (hoochregatta);
// spring dates stay seasonal until the regattas publish — do not invent days.
const UPCOMING: Regatta[] = [
  {
    name: "ACRA Championships",
    date: "Completed May 16, 2026",
    location: "Melton Hill Lake · Oak Ridge, TN",
    entries: "M4x — 3rd in the B Final (7:37.900, photo finish 0.562s over Virginia RA). First UTC team boat at ACRA in eight years.",
  },
  {
    name: "Head of the Hooch",
    date: "November 7–8, 2026",
    location: "Chattanooga, TN",
    entries: "UTC boats on home water, plus alumni boat(s)",
  },
  {
    name: "TIRC — Tennessee Indoor Rowing Championships",
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
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-3">
            The 2026&ndash;27 program
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
            This year&rsquo;s squad.
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed">
            Nine rowers on the Tennessee River out of the William Raoul
            Rowing Center &mdash; Hooch on home water this fall, then the
            spring run to SIRA and ACRA.
          </p>
        </div>
      </section>

      {/* Roster + portrait M4x video — athletes first */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-12 max-w-2xl">
            <p className="text-utc-navy/60 uppercase text-xs tracking-[0.2em] font-semibold mb-3">
              Returning
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-utc-navy leading-tight">
              Back from Oak Ridge. <span className="italic text-utc-navy/70">Now they set the standard.</span>
            </h2>
            <p className="mt-4 text-foreground/75">
              Three of the four who raced UTC&rsquo;s 2026 ACRA M4x to a
              photo-finish third in the B final are back for year two.
            </p>
          </div>

          {/* 3 returning athletes + the ACRA-prep video = one 4-tile row on lg */}
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ROSTER.map((a) => (
              <li
                key={a.name}
                className="bg-white border border-border rounded-xl shadow-sm overflow-hidden flex flex-col"
              >
                {a.photo ? (
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
                ) : (
                  // Placeholder photo slot so all four M4x cards carry equal
                  // visual weight — Mako's portrait doesn't dominate the
                  // stack. Same UTCMark-on-gradient treatment used on the
                  // Harden faculty card below.
                  <div
                    aria-hidden
                    className="relative aspect-[4/5] bg-gradient-to-br from-utc-navy-deep via-utc-navy to-utc-navy-deep flex items-center justify-center"
                  >
                    <UTCMark className="text-5xl text-white/70" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1 min-h-[360px]">
                  <p className="text-utc-navy/65 uppercase text-[11px] tracking-[0.22em] font-bold mb-2">
                    {a.seat}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-utc-navy mb-2">
                    {a.name}
                  </h3>
                  <p className="text-xs text-utc-navy/60 uppercase tracking-[0.18em] font-semibold mb-1">
                    {a.classYear} · {a.hometown}
                  </p>
                  <p className="text-xs text-utc-navy/55 mb-3 leading-snug">
                    {a.major}
                    {a.affiliation && (
                      <>
                        {" · "}
                        <span className="text-utc-navy/70 font-medium">
                          {a.affiliation}
                        </span>
                      </>
                    )}
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {a.bio}
                  </p>
                </div>
              </li>
            ))}
            {/* Vertical M4x video panel — fourth tile */}
            <li>
              <figure className="relative rounded-xl overflow-hidden shadow-lg ring-1 ring-utc-navy/10 bg-utc-navy-deep h-full min-h-[480px]">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/videos/m4x-acra-prep-poster.jpg"
                  aria-label="UTC Rowing's 2026 ACRA crew at the May 2 scrimmage in Oak Ridge — Abraham Mako, Tyler Burkett, Connor Richardson, Jay Pollard"
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
            </li>
          </ul>
        </div>
      </section>

      {/* Joining the program — incoming athletes (visually distinct from M4x) */}
      <section className="bg-paper-grain border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8 max-w-2xl">
            <p className="text-utc-navy/60 uppercase text-xs tracking-[0.2em] font-semibold mb-3">
              New this year
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy leading-tight">
              Six new rowers in the boathouse.
            </h2>
            <p className="mt-3 text-sm text-foreground/70">
              New to the squad for 2026&ndash;27. Bios and portraits fill in
              as the season goes.
            </p>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INCOMING.map((a) => (
              <li
                key={a.name}
                className="bg-white/70 border border-border/70 rounded-xl shadow-sm overflow-hidden flex flex-col"
              >
                {a.photo ? (
                  <div className="relative aspect-[4/5] bg-utc-navy-deep">
                    <Image
                      src={a.photo.src}
                      alt={a.photo.alt}
                      width={a.photo.width}
                      height={a.photo.height}
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  // Placeholder so incoming-athlete cards carry the same visual
                  // weight as the ROSTER cards above. Same UTCMark-on-gradient
                  // treatment used for missing M4x photos.
                  <div
                    aria-hidden
                    className="relative aspect-[16/9] bg-gradient-to-br from-utc-navy-deep via-utc-navy to-utc-navy-deep flex items-center justify-center"
                  >
                    <UTCMark className="text-4xl text-white/60" />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <p className="inline-flex self-start items-center text-utc-navy uppercase text-[10px] tracking-[0.22em] font-bold bg-utc-gold/20 border border-utc-gold/40 rounded-full px-2.5 py-0.5 mb-3">
                    2026&ndash;27
                  </p>
                  <h3 className="font-display text-xl font-bold text-utc-navy mb-2">
                    {a.name}
                  </h3>
                  {(a.classYear || a.hometown) && (
                    <p className="text-xs text-utc-navy/60 uppercase tracking-[0.18em] font-semibold mb-1">
                      {[a.classYear, a.hometown].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {a.major && (
                    <p className="text-xs text-utc-navy/55 mb-3 leading-snug">
                      {a.major}
                    </p>
                  )}
                  {a.bio && (
                    <p className="text-sm text-foreground/75 leading-relaxed">
                      {a.bio}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Program leadership — head coach, alumni relations, faculty sponsor.
          Three equal cards, athlete-card visual weight, all 4:5 photos. */}
      <section className="bg-paper-grain border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8 max-w-2xl">
            <p className="text-utc-navy/60 uppercase text-xs tracking-[0.2em] font-semibold mb-3">
              Program leadership
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy leading-tight">
              Coaches &amp; staff.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* Head coach — Abraham Mako took over for 2026–27 after stroking
                the 2026 ACRA M4x. Photo: single scull at the Tennessee
                Aquarium (portrait source, 1280×1752). */}
            <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="relative aspect-[4/5] bg-utc-navy-deep">
                <Image
                  src="/photos/abraham-single-aquarium.jpg"
                  alt="Head Coach Abraham Mako sculling past the Tennessee Aquarium at dusk"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="w-full h-full object-cover object-[center_55%]"
                />
              </div>
              <div className="p-6 flex flex-col">
                <p className="text-utc-gold-deep uppercase text-[11px] tracking-[0.22em] font-bold mb-2">
                  Head Coach
                </p>
                <h3 className="font-display text-2xl font-bold text-utc-navy mb-2">
                  Abraham Mako
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                  Came up through Chattanooga Junior Rowing and co-founded
                  Chattanooga State Rowing before transferring to UTC, where
                  he helped restart the program in Fall 2025 and stroked the
                  2026 ACRA M4x. Head coach of UTC Rowing for 2026&ndash;27.
                </p>
                <p className="text-sm leading-relaxed mb-3">
                  <a
                    href="mailto:rowutc@gmail.com"
                    className="link-draw text-utc-navy font-semibold"
                  >
                    rowutc@gmail.com
                  </a>
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-utc-navy font-semibold link-draw text-sm"
                >
                  More ways to get in touch &rarr;
                </Link>
              </div>
            </div>

            {/* Alumni relations — Michael Kinsey, head coach from the Fall 2025
                restart through ACRA 2026. Headshot source is 1280×824; the
                subject is centered so the 4:5 crop holds. */}
            <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="relative aspect-[4/5] bg-utc-navy-deep">
                <Image
                  src="/photos/kinsey-headshot.jpg"
                  alt="Michael Kinsey at a UTC men's basketball game"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  preload={false}
                  className="w-full h-full object-cover object-[47%_center]"
                />
              </div>
              <div className="p-6 flex flex-col">
                <p className="text-utc-gold-deep uppercase text-[11px] tracking-[0.22em] font-bold mb-2">
                  Alumni Relations Director
                </p>
                <h3 className="font-display text-2xl font-bold text-utc-navy mb-2">
                  Michael Kinsey
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                  Head coach from the Fall 2025 restart through the 2026 ACRA
                  M4x. Now leads alumni relations &mdash; the alumni roster,
                  stories and photos from every era, and named giving. A UTC
                  mechatronics graduate, he is now a boatman for University
                  of Wisconsin Rowing.
                </p>
                <p className="text-sm leading-relaxed mb-3">
                  <a
                    href="mailto:kinseymi@radl.solutions?subject=UTC%20Rowing%20alumni"
                    className="link-draw text-utc-navy font-semibold"
                  >
                    kinseymi@radl.solutions
                  </a>
                </p>
                <Link
                  href="/submit"
                  className="inline-flex items-center text-utc-navy font-semibold link-draw text-sm"
                >
                  Share a story or photo &rarr;
                </Link>
              </div>
            </div>

            {/* Faculty sponsor — same shape as coach card. Portrait headshot
                pulled from UTC HHP faculty page; native dimensions 800×1200
                (2:3), cropped to the athlete-card 4:5 aspect for consistency
                with the M4x portrait cards above. preload={false} — Joel
                sits below the fold, not the LCP. */}
            <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="relative aspect-[4/5] bg-utc-navy-deep">
                <Image
                  src="/photos/joel-harden.jpg"
                  alt="Dr. Joel Harden, UTC Health & Human Performance"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  preload={false}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6 flex flex-col">
                <p className="text-utc-gold-deep uppercase text-[11px] tracking-[0.22em] font-bold mb-2">
                  Faculty sponsor
                </p>
                <h3 className="font-display text-2xl font-bold text-utc-navy mb-2">
                  Dr. Joel Harden
                </h3>
                <p className="text-xs text-utc-navy/60 uppercase tracking-[0.18em] font-semibold mb-3">
                  Assistant Professor, Health &amp; Human Performance
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Coordinator of UTC&rsquo;s HHP Sports Lab, where students
                  and community athletes get personalized performance
                  testing through the College of Health, Education and
                  Professional Studies. Agreed to advise the rowing program
                  in May 2026, formalizing the club&rsquo;s academic
                  standing as the M4x heads to ACRA.
                </p>
              </div>
            </div>
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
              Year two starts at home: the Head of the Hooch in November, then the
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
                    <p className="text-utc-navy/65 uppercase text-[11px] tracking-[0.22em] font-bold mb-1.5">
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
            Spring dates firm up as regatta calendars publish.
          </p>
        </div>
      </section>

      {/* Footer CTA — mirrors /history pattern */}
      <section className="relative bg-utc-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(200,182,130,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
          <p className="text-utc-gold uppercase text-xs tracking-[0.25em] font-semibold mb-4">
            Help the crew
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5 leading-tight">
            ACRA is in the books. Hooch is next.
            <br className="hidden sm:block" />
            <span className="italic text-utc-gold-bright">The boat goes where alumni take it.</span>
          </h2>
          <p className="text-lg text-white/75 max-w-2xl mx-auto mb-10">
            Travel, the Vespoli loaner, the next boat, racks at the boathouse — every
            piece of the rebuild rides on the people who came before this crew.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/donate"
              className="bg-utc-gold text-utc-navy-deep font-semibold px-7 py-3.5 rounded-md hover:bg-utc-gold-bright transition-all hover:shadow-xl"
            >
              Back the rebuild &rarr;
            </Link>
            <Link
              href="/submit"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3.5 rounded-md hover:bg-white/20 transition-all"
            >
              I rowed at UTC &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
