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

const PRE_ACRA_BODY = `Six weeks ago, three of the four athletes in the M4x going to ACRA had never sat in a rowing shell. April 6, the day after Easter, Tyler Burkett, Conner Richardson, and Jay Pollard came down to the dock for their first row. May 17 they race at Melton Hill Lake in Oak Ridge against crews that have been rowing for years.

No one in their right mind would tell a group six weeks into the sport that they will win a national championship. The boat is not chasing that. The boat is chasing a clean catch, a connected drive, and another stroke after that. Wherever that adds up to on May 17 is where the boat finishes.

Bow to stern: Pollard, Burkett, Richardson, Abraham Mako stroking. Mako rowed at Chattanooga Junior Rowing, helped start Chattanooga State Rowing under Jack Cawood, then transferred to UTC and co-founded the resurrected program in Fall 2025. He is the experience in the boat. The bow three are still finding the catch. The boat sets up around him and they all work toward the same set.

Burkett, Richardson, and Pollard are U.S. Army active duty, finishing UTC degrees alongside the service. Practice gets fit around obligations that are not optional. They show up anyway.

May 2 the boat went up to Oak Ridge two weeks early for a scrimmage on the ACRA course. The reason is straightforward: at some point a crew has to row next to other crews on the actual race water, not on the home river. Those race miles are now in the legs.

A note on the equipment. UTC owns sixteen shells. They have lived on the team trailer, outside, since 2023. The Empacher 4x "Chattanooga," from the late 80s, has a hole in the hull big enough to put a fist through. Most of the fleet is over twenty years old. The newest hull is a 2020 Swift 1x the boys named "Scrappy." That is why the four of them joined Lookout Rowing Club this semester to get on usable water, and why the boat racing at ACRA is on loan from Vespoli.

After Saturday the work changes shape, not character. A heated room at Maclellan Gym with ergs on the floor. A 20×80 pole barn at the boathouse so the shells worth keeping live under cover. A men's eight and a women's four filled out by September. Alumni back in seats for the Hooch.

Saturday first. Then the next stroke.`;

export const posts: JournalPost[] = [
  {
    slug: "2026-05-10-pre-acra-where-we-are",
    title: "Pre-ACRA: Where We Are",
    date: "2026-05-10",
    author: "Michael Kinsey, Head Coach",
    excerpt:
      "Six weeks ago, three of the four athletes in the M4x racing ACRA had never sat in a rowing shell. May 17 they go to Melton Hill against crews that have been rowing for years. The work is the work.",
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
