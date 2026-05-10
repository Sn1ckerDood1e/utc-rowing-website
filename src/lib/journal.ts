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
};

const PRE_ACRA_BODY = `A week from now four athletes from UTC will be on the line at Lake Lanier in the M4x at the ACRA Championships. That sentence still feels strange to type. For most of the last five years there was no UTC Rowing program to speak of. The team went dark during COVID, the trailer and most of the fleet went out the door in 2022, and the club existed mostly as a name in the alumni group chat. Last fall, four students said they wanted to row, and a handful of alumni said they would help us figure out how. That is the entire reason any of this is happening.

The athletes are Abraham Mako, Tyler Burkett, Conner Richardson, and Jay Pollard. None of them came in as recruited rowers. Two of them had never sat in a boat before September. They have erged in the dark, run hill repeats up Cardiac, fixed riggers with vise grips, and put a quad together that — on a good day — actually moves. They have earned the right to race under the UTC name on May 17.

We are racing as guests at the William Raoul Rowing Center in Chattanooga, under the umbrella of the Chattanooga Rowing Club, who have been more generous with rack space and coaching time than we had any right to ask for. The 4x sitting on stretchers there is on loan. The launch is on loan. Most of the oars are on loan. That is a temporary arrangement, and the next thing we are building is a permanent one.

The 1996 trailer arson is the story I keep coming back to this spring. UTC Rowing lost almost everything to that fire — boats, oars, riggers, trailer. The program rebuilt anyway, and went on to its strongest decade. I am not going to pretend losing the fleet in 2022 was the same kind of moment, but the lesson rhymes. Equipment burns, equipment walks off, equipment ages out. The program continues if the people decide it does. That is what the 1996 generation taught us, and that is what this fall taught us again.

The next concrete thing is a 20 by 80 foot pole barn at the Chattanooga Rowing site — covered rack space for our boats and the club's, dry storage for oars and slings, and somewhere to do indoor work that is not a parking lot. It is the smallest physical home that lets the program plan past the next regatta. We are about a third of the way to funded. Names on the beams will get attached to specific athletes for as long as the building stands.

To the alumni who answered emails this fall, who showed up to bring an ergometer, a check, or a few hours of coaching time — thank you. There is no version of this season where the program races at ACRA without you.

Looking past Saturday: post-ACRA we start recruiting for fall '26. The goal is a men's eight on the water by next October.

If you want to help: the donate page is at /donate, and if you rowed at UTC and are not on the roster yet, the submission form is at /submit. Both make a difference.

— Coach Kinsey`;

export const posts: JournalPost[] = [
  {
    slug: "2026-05-10-pre-acra-where-we-are",
    title: "Pre-ACRA: Where We Are",
    date: "2026-05-10",
    author: "Michael Kinsey, Head Coach",
    excerpt:
      "A week out from ACRA, with four athletes, a borrowed shed, and a program that refused to stay dead.",
    body: PRE_ACRA_BODY,
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
