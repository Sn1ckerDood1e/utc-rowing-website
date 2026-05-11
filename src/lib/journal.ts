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
  /**
   * Optional hero video path (e.g. "/videos/foo.mp4"). When set, the
   * post page renders a `<video>` element instead of the `hero` photo
   * as the lead visual. The `hero` photo (if present) is still used
   * as fallback for the journal index card / OG image.
   */
  heroVideo?: string;
  /** Optional poster image for the hero video; shown until autoplay kicks in. */
  heroVideoPoster?: string;
};

const PRE_ACRA_BODY = `Six weeks ago, three of the four guys in the M4x going to ACRA had never sat in a rowing shell. April 6, the day after Easter, Tyler Burkett, Conner Richardson, and Jay Pollard came down to the dock for their first row. They're all class of 2027. May 17 they race at Melton Hill Lake in Oak Ridge against crews that have been rowing for years.

We're not going up there for a medal. We're going to take clean strokes and keep taking them, and see what that gets us at the finish.

Bow to stern: Pollard, Burkett, Richardson, Abraham Mako on stroke. Mako rowed at Chattanooga Junior Rowing, co-founded Chattanooga State Rowing with Jack Cawood, then transferred to UTC and helped get the program back on the water in Fall 2025. He's the experience in the boat. The bow three are still learning the catch and the timing. They follow him out of stroke seat.

Burkett, Richardson, and Pollard are U.S. Army active duty, finishing UTC degrees alongside the service. They build practice around obligations that aren't optional. They show up anyway.

May 2 we took the boat up to Oak Ridge two weeks early for a scrimmage on the ACRA course. The water at Melton is wider and flatter than what they're used to on the river. A crew has to row next to other crews on the actual race water at some point, not just at home. Those miles are in the legs now.

UTC owns sixteen shells, and they've all lived on the team trailer, outside, since 2023. The Empacher 4x "Chattanooga," from the late 80s, has a hole in the hull big enough to put a fist through. Most of the fleet is over twenty years old. The newest hull is a 2020 Swift 1x the boys named "Scrappy." That's why the four of them joined Lookout Rowing Club this semester for usable water, and why the boat racing Saturday is a Vespoli loaner.

After Saturday the work changes shape, not character. A heated room at Maclellan Gym with ergs on the floor. A 20×80 pole barn at the boathouse so the shells worth keeping live under cover. A men's eight and a women's four filled out by September. Alumni back in seats for the Hooch.

Saturday first. Then the next stroke.`;

export const posts: JournalPost[] = [
  {
    slug: "2026-05-10-pre-acra-where-we-are",
    title: "Pre-ACRA: Where We Are",
    date: "2026-05-10",
    author: "Michael Kinsey, Head Coach",
    excerpt:
      "Six weeks ago, three of the four guys in the M4x racing ACRA had never sat in a rowing shell. May 17 they go to Melton Hill against crews that have been rowing for years. The work is the work.",
    body: PRE_ACRA_BODY,
    hero: "/photos/abraham-single-boathouse.jpg",
    heroAlt:
      "Abraham Mako rowing a single past the Lookout Rowing Club boathouse at sunset.",
    heroVideo: "/videos/quad-acra-prep.mp4",
    heroVideoPoster: "/videos/quad-acra-prep-poster.jpg",
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
