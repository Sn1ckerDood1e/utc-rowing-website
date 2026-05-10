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

const PRE_ACRA_BODY = `A week from now, four UTC athletes will be at Melton Hill Lake in Oak Ridge for the ACRA Championships, racing the M4x. The number on the side of the boat says May 17, 2026. The number that matters more is April 6, 2026 — the day after Easter. That is the day Tyler Burkett, Conner Richardson, and Jay Pollard each sat in a rowing shell for the first time. Six weeks ago.

The lineup, bow to stern: Jay Pollard, Tyler Burkett, Conner Richardson, Abraham Mako stroking. Mako is the only one with real water under him — he rowed at Chattanooga Juniors, helped Jack Cawood start Chattanooga State Rowing, and transferred to UTC to row in the resurrected program. He is the most experienced rower in the boat. He is not a co-founder of UTC Rowing, and I want that on the record because the earlier draft of this post got it wrong. The boat sets up around Mako because the bow three are still learning what a clean catch feels like.

All four are UTC class of 2027 — one shared season, not a multi-year arc. Three of them — Conner, Tyler, and Jay — are U.S. Army active duty earning their UTC degrees alongside their service. I mention that once and move on; they don't lead with it either. Erg pieces happen between obligations that are not negotiable. They show up anyway.

On Saturday May 2 we drove to Oak Ridge for a scrimmage on Melton Hill, the same lake the championship runs on. We went up two weeks early on purpose — you cannot simulate the line, the warm-up dock pressure, or a competitive 2k on your home river. At some point the boat has to be on the course with other boats. We got those race miles. The footage on the donate and team pages is from that morning.

About the equipment. UTC owns sixteen shells. They have lived on the team trailer, outside, since 2023. The Empacher 4x "Chattanooga" — the 1980s/90s boat — has a hole in the hull big enough to put a fist through. Most of the fleet is twenty-plus years old. The newest hull we own is a 2020 Swift 1x the boys call "Scrappy." That is the inventory. It is why the four of them joined Lookout Rowing Club this semester, and it is why the boat going to ACRA is borrowed water-worthy equipment, not ours.

What fall '26 needs to look like, concretely:

- A 20×80 pole barn at the boathouse, so the UTC shells worth saving live under cover instead of on a trailer in the weather.
- The on-campus room at Maclellan Gym turned into a real indoor training space — clean-out, lights, paint, a leaking roof patched, possible mold work, ergs in the room.
- Move the UTC fleet to Chattanooga Rowing's footprint while the storage gets built.
- A men's eight and a women's four, both filled out, by September.

The regatta calendar I am building toward, in order: Head of the Hooch with alumni boats entered, TIRC with an alumni event, SIRA, ACRA. Each of those is a place for graduates of this program to come back into a UTC seat. That is not symbolic. The fastest path to a competitive eight in 2027 is alumni rowers in the boat now, not three years from now.

Saturday is the race. After Saturday is the slower work — recruiting for fall, fixing the storage problem, and finishing the equipment audit. If you want a hand in any of that: /donate is real, /submit is how we close the alumni gaps, and the Hooch alumni boats need names against seats. Come pull.

— Coach Kinsey`;

export const posts: JournalPost[] = [
  {
    slug: "2026-05-10-pre-acra-where-we-are",
    title: "Pre-ACRA: Where We Are",
    date: "2026-05-10",
    author: "Michael Kinsey, Head Coach",
    excerpt:
      "A week out from ACRA at Melton Hill Lake. Three of the four athletes started rowing six weeks ago. Here's where the program actually is — the boat, the equipment, and what fall '26 needs to look like.",
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
