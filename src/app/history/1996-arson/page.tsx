import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "1996 Trailer Arson — UTC Rowing",
  description:
    "March 22 1996, 3 a.m.: arson destroyed nine boats and the team trailer outside UTC Rowing's boathouse. The team rowed at the Augusta Invitational two days later, in borrowed boats, and won. Photo documentation by Ben Robbs.",
};

type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
  /** Tailwind aspect-ratio class — most are landscape; the 4 portraits get a different cell shape */
  portrait?: boolean;
};

const PHOTOS: GalleryPhoto[] = [
  {
    src: "/photos/arson-1996/01-trailer-skeleton-dawn.jpg",
    alt: "The burnt steel skeleton of the UTC Rowing trailer the morning after the arson, two figures sifting through ash.",
    caption:
      "Morning, March 22 1996. The trailer that held nine boats the night before.",
    portrait: true,
  },
  {
    src: "/photos/arson-1996/02-students-embrace.jpg",
    alt: "Two UTC Rowing athletes embracing at the burn site.",
    caption: "Two athletes at the site that morning.",
    portrait: true,
  },
  {
    src: "/photos/arson-1996/03-fragment-aftermath.jpg",
    alt: "Two UTC Rowing athletes examining a charred shell fragment in the grass next to the burnt trailer.",
    caption: "Examining a fragment. The black sedan in the background is parked just past the trailer.",
    portrait: true,
  },
  {
    src: "/photos/arson-1996/04-night-of-fire.jpg",
    alt: "Pieces of a destroyed shell hull on pavement, photographed at night.",
    caption: "Shot the night the fire was discovered. Pieces of hull on the asphalt.",
  },
  {
    src: "/photos/arson-1996/05-nameplate-closeup.jpg",
    alt: "Close-up of a charred boat nameplate reading 'Robert G. N…' — the rest is destroyed by fire.",
    caption:
      "One of the destroyed shells bore the dedication 'Robert G. N___'. The rest of the surname is charred. If you know who this boat was named for, please tell us.",
  },
  {
    src: "/photos/arson-1996/06-nameplate-context.jpg",
    alt: "Stacked charred shell pieces with the 'Robert G. N…' nameplate visible at the right.",
    caption: "Wider context — the same nameplate, in the pile.",
  },
  {
    src: "/photos/arson-1996/07-police-tape-trailer.jpg",
    alt: "The burnt trailer surrounded by yellow police 'NO PARKING' tape, with an investigator visible.",
    caption: "Police tape across the trailer. The fire was investigated as arson.",
  },
  {
    src: "/photos/arson-1996/08-team-lifting.jpg",
    alt: "A group of UTC Rowing athletes lifting a salvaged shell piece together in a winter field.",
    caption: "The team in the field, lifting what was left.",
  },
  {
    src: "/photos/arson-1996/09-police-tape-pieces.jpg",
    alt: "Charred shell pieces separated on the grass, with yellow police tape across one piece.",
    caption: "Police tape across one of the salvageable pieces.",
  },
  {
    src: "/photos/arson-1996/10-fontaine-truck.jpg",
    alt: "A Fontaine Truck Equipment flatbed loaded with burnt shell debris, parked next to the burn site.",
    caption: "Removal logistics — a Fontaine flatbed loaded with what couldn't be saved.",
  },
  {
    src: "/photos/arson-1996/11-utc-vest-salvage.jpg",
    alt: "A mixed-gender group of UTC Rowing athletes salvaging shell pieces from a winter field, one wearing a UTC CREW vest.",
    caption: "Mixed-gender crew salvaging. UTC CREW vest visible.",
  },
  {
    src: "/photos/arson-1996/12-salvage-wide.jpg",
    alt: "Wide view of the salvage operation: five or more UTC athletes working among shell pieces in a winter field, with the boathouse structure visible in the background.",
    caption: "Wide view of the salvage operation. Boathouse in the background.",
  },
];

export default function Arson1996Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-utc-navy text-white overflow-hidden">
        <Image
          src="/photos/arson-1996/01-trailer-skeleton-dawn.jpg"
          alt="The burnt skeleton of UTC Rowing's trailer the morning of March 22, 1996."
          fill
          sizes="100vw"
          preload
          quality={75}
          className="object-cover object-center opacity-50"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-utc-navy via-utc-navy/85 to-utc-navy/40 pointer-events-none"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 pt-32 pb-20 sm:pt-44">
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-3">
            March 22, 1996 · ~3 a.m.
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-[1.05]">
            The trailer arson.
          </h1>
          <p className="mt-5 text-lg text-white/85 max-w-2xl leading-relaxed">
            Arson destroyed nine boats, forty oars, nine cox boxes, and the team
            trailer. UTC&rsquo;s insurance claim totaled $57,157.72. Two days
            later, the women&rsquo;s novice B 4+ rowed at the Augusta
            Invitational in borrowed boats and won.
          </p>
        </div>
      </section>

      {/* What was lost */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <p className="text-utc-navy/60 uppercase text-xs tracking-[0.2em] font-semibold mb-3">
            What was lost
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy leading-tight mb-4">
            Nine boats and a trailer.
          </h2>
          <ul className="text-foreground/85 text-base leading-relaxed list-disc list-inside space-y-1.5 mb-6">
            <li>1 UTC eight</li>
            <li>3 UTC fours</li>
            <li>1 of Coach Espeseth&rsquo;s personal eights</li>
            <li>3 McCallie fours</li>
            <li>1 Chattanooga Youth four</li>
            <li>40 oars · 9 cox boxes · the trailer itself</li>
          </ul>
          <p className="text-foreground/80 text-sm leading-relaxed">
            Source: Trailer Arson 1996 folder, UTC ARC. Insurance claim figures
            from program records.
          </p>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="bg-paper-grain border-y border-border/60">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="mb-8 max-w-2xl">
            <p className="text-utc-navy/60 uppercase text-xs tracking-[0.2em] font-semibold mb-3">
              The photo record
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy leading-tight mb-3">
              Documented by Ben Robbs.
            </h2>
            <p className="text-foreground/80 text-sm leading-relaxed">
              Ben Robbs was a UTC rower in the mid-1990s and the team&rsquo;s
              de-facto photographer. He sent these photos in May 2026 after
              re-connecting with the program through Susan Lazenby&rsquo;s
              women&rsquo;s-crew dinner group. The site previously had one
              photograph from this event; with these, the morning of March 22
              becomes a documented event.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PHOTOS.map((photo) => (
              <figure
                key={photo.src}
                className="bg-white border border-border rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div
                  className={`relative w-full bg-utc-navy-deep ${
                    photo.portrait ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-4 text-sm text-foreground/80 leading-snug">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted-foreground italic">
            Photographer: Ben Robbs (UTC Rowing alumnus). Contributed May 2026
            via Dropbox.
          </p>
        </div>
      </section>

      {/* How the press covered it */}
      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="mb-8 max-w-2xl">
            <p className="text-utc-navy/60 uppercase text-xs tracking-[0.2em] font-semibold mb-3">
              How the press covered it
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy leading-tight mb-3">
              The University Echo and the Free Press both ran it.
            </h2>
            <p className="text-foreground/80 text-sm leading-relaxed">
              UTC&rsquo;s student paper led with the fire and the police
              investigation. The Chattanooga Free Press ran the Augusta win
              two days later under &ldquo;Area Spotlight.&rdquo; Both clippings
              are part of the program archive.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[3fr_2fr] items-start">
            <figure className="bg-white border border-border rounded-md overflow-hidden shadow-sm">
              <div className="relative w-full aspect-[3/2] bg-paper-grain">
                <Image
                  src="/photos/clippings/1996-03-28-university-echo-arson.jpg"
                  alt="University Echo, March 28 1996, front-page article: 'Rowing team loses equipment in fire' by Rebecca Carlisle. Includes a photo of UTC athletes inspecting hull remains."
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="p-4 text-sm text-foreground/80 leading-snug">
                <strong className="text-utc-navy">University Echo, March 28 1996.</strong>
                {" "}&ldquo;Rowing team loses equipment in fire.&rdquo; By Rebecca
                Carlisle. The student paper&rsquo;s front-page coverage, with a
                photo of athletes inspecting the remains.
              </figcaption>
            </figure>

            <figure className="bg-white border border-border rounded-md overflow-hidden shadow-sm">
              {/* Portrait newsprint clipping — narrow aspect would crop the body
                  text illegibly. Use aspect-[2/3] + object-contain so the
                  full column is always visible on mobile and desktop. */}
              <div className="relative w-full aspect-[2/3] bg-paper-grain">
                <Image
                  src="/photos/clippings/1996-03-24-cfp-augusta-win.jpg"
                  alt="Chattanooga Free Press, Area Spotlight, March 24 1996: 'UTC Novice Crew Wins' — coverage of the women's novice B 4+ Augusta Invitational victory two days after the trailer arson."
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="p-4 text-sm text-foreground/80 leading-snug">
                <strong className="text-utc-navy">Chattanooga Free Press, March 24 1996.</strong>
                {" "}Area Spotlight: &ldquo;UTC Novice Crew Wins.&rdquo; The
                Augusta Invitational story — borrowed boats from Clemson,
                Stetson, Furman, Tennessee, Georgia State, Army, and Bucknell;
                oars from McCallie and Chattanooga Junior Rowing.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* What happened next */}
      <section className="bg-paper-grain border-t border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <p className="text-utc-navy/60 uppercase text-xs tracking-[0.2em] font-semibold mb-3">
            Two days later
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy leading-tight mb-4">
            The novice B 4+ won at Augusta in borrowed boats.
          </h2>
          <p className="text-foreground/85 leading-relaxed mb-3">
            Two days after the fire, UTC&rsquo;s women&rsquo;s novice B 4+ rowed
            the Augusta Invitational in shells loaned by other programs and
            won their division.
          </p>
          <p className="text-foreground/85 leading-relaxed mb-6">
            The community fundraised within months. A replacement trailer was
            procured July/August 1996. The program kept rowing.
          </p>
          <blockquote className="border-l-4 border-utc-gold pl-4 py-1">
            <p className="font-display text-xl italic text-utc-navy leading-snug">
              &ldquo;UTC Novice Crew Wins&rdquo;
            </p>
            <footer className="mt-1 text-sm text-muted-foreground">
              &mdash; Chattanooga Free Press, March 24 1996
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA — help fill the record */}
      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-utc-gold uppercase text-xs tracking-[0.25em] font-semibold mb-4">
            Help fill the record
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 leading-tight">
            Were you there? Do you know who &ldquo;Robert G. N___&rdquo; was?
          </h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8 text-base">
            One of the destroyed shells bore that dedication. We can&rsquo;t
            read the surname. If you remember the boat, the donor, or anything
            from those days &mdash; or if you&rsquo;re in any of these photos
            &mdash; tell us.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/submit"
              className="bg-utc-gold text-utc-navy-deep font-semibold px-7 py-3.5 rounded-md hover:bg-utc-gold-bright transition-all hover:shadow-xl"
            >
              Submit a memory or photo
            </Link>
            <Link
              href="/history"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3.5 rounded-md hover:bg-white/20 transition-all"
            >
              &larr; Back to the timeline
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
