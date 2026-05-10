/**
 * Journal posts.
 *
 * Inline TypeScript data — body stored as a plain-text string. Render
 * with paragraph splitting on `\n\n`. The corresponding `.md` files in
 * `content/journal/` are the source-of-truth note for the editorial
 * workflow ("Coach drops a markdown file, we copy it in here"); they
 * are not read at runtime.
 *
 * To add a post: append a new entry to `posts` below. Keep slugs
 * unique and ISO-formatted dates.
 */

export type JournalPost = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
  excerpt: string;
  body: string; // plain text, paragraphs separated by blank lines
  /** Optional hero photo path (e.g. "/photos/foo.jpg"); rendered above the post body. */
  hero?: string;
  /** Alt text for the hero photo. Required when `hero` is set. */
  heroAlt?: string;
};

const PRE_ACRA_BODY = `A week from now, four UTC athletes will race the M4x at the ACRA Championships on Melton Hill Lake in Oak Ridge. Three of them — Tyler Burkett, Conner Richardson, and Jay Pollard — first sat in a rowing shell on April 6, the day after Easter. Six weeks ago.

The lineup, bow to stern: Pollard, Burkett, Richardson, and Abraham Mako stroking. Mako rowed at Chattanooga Junior Rowing, helped Jack Cawood start Chattanooga State Rowing, then transferred to UTC and co-founded the resurrected program with me in Fall 2025. He is the most experienced rower in the boat by a wide margin, and the bow three are still learning what a clean catch feels like. The boat sets up around him.

All four are UTC class of 2027. One shared season unless we replenish behind them. Conner, Tyler, and Jay are U.S. Army active duty, earning their UTC degrees alongside their service. Erg pieces happen between obligations that are not negotiable. They show up anyway.

On Saturday May 2 we drove up to Oak Ridge for a scrimmage on Melton Hill, the same course ACRA runs on. We went two weeks early on purpose — at some point the boat has to be next to other boats on the actual race line, not on the home river. We got those miles.

About the equipment. UTC owns sixteen shells. They have lived on the team trailer, outside, since 2023. The Empacher 4x "Chattanooga," from the late 80s and early 90s, has a hole in the hull big enough to put a fist through. Most of the fleet is twenty-plus years old. The newest hull we own is a 2020 Swift 1x the boys call "Scrappy." That is why the four of them joined Lookout Rowing Club this semester to get on usable water, and it is why the boat racing at ACRA is not ours. Vespoli is lending us a 4x for the regatta. UTC is racing a Vespoli loaner because the program's own quad has a hole in it.

What fall '26 has to look like: the on-campus room at Maclellan Gym turned into a real indoor training space — cleaned out, painted, lights in, the leaking roof patched, mold work where it's needed, ergs on the floor. A 20×80 pole barn at the boathouse so the shells worth saving live under cover. A men's eight and a women's four, both filled out, by September.

The calendar I am building toward: Head of the Hooch with UTC alumni boats entered, TIRC with an alumni event, SIRA, ACRA again. The fastest way to a competitive eight in 2027 is alumni rowers in seats now.

Saturday is the race. After Saturday is the slower work — recruiting, storage, the gym. If you want a hand in any of that, the donate page is real, the alumni submission form is how we close the gaps in our roster history, and the Hooch alumni boats need names against seats. Come pull.

— Coach Kinsey`;

export const posts: JournalPost[] = [
  {
    slug: "2026-05-10-pre-acra-where-we-are",
    title: "Pre-ACRA: Where We Are",
    date: "2026-05-10",
    author: "Michael Kinsey, Head Coach",
    excerpt:
      "A week out from ACRA. Three of the four athletes first sat in a shell on April 6. The boat going to the line is a Vespoli loaner — UTC's own quad has a hole in it.",
    body: PRE_ACRA_BODY,
    hero: "/photos/abraham-single-boathouse.jpg",
    heroAlt:
      "Abraham Mako rowing a single past the Lookout Rowing Club boathouse at sunset.",
  },
];

/** Posts in reverse-chronological order (newest first). */
export function getAllPosts(): JournalPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Find a post by slug, or `undefined` if not found. */
export function getPostBySlug(slug: string): JournalPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** All slugs (for `generateStaticParams`). */
export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

/** Format an ISO date as e.g. "May 10, 2026". */
export function formatPostDate(iso: string): string {
  // Append explicit time/timezone so the date isn't shifted by the local TZ
  // when this runs at build time on Vercel.
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Split a plain-text body into paragraphs on blank lines. */
export function splitParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}
