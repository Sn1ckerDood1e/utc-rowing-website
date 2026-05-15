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
  /**
   * Optional inline image rendered mid-body. Inserted *after* the Nth
   * paragraph (zero-indexed), with a captioned figure treatment matching
   * the donate-page need photos.
   */
  bodyImage?: {
    src: string;
    alt: string;
    caption: string;
    afterParagraph: number;
  };
};

const PRE_ACRA_BODY = `Saturday is the ACRA Championships at Melton Hill Lake in Oak Ridge. UTC races a men's quadruple sculls (M4x) — Mako on stroke, then Richardson, Burkett, Pollard. First UTC crew at ACRA since the program restarted in Fall 2025.

Three of those four guys started rowing on April 6 — six weeks ago. Mako has been rowing for years; the bow three are still working on timing and getting comfortable in their seats. You can hear them laughing from across the river when they're out on the water.

May 2 we took the boat to Oak Ridge for a scrimmage on the race course.

I don't care what place they give us. These boys will compete against anything next to them. The only thing I don't want to see is a crab — an oar that stops the boat. Anything else, we live with.

UTC's own 4x — an Empacher — isn't racing this weekend. Mako and I pulled it off the trailer two weeks ago to look it over. There's a soft spot in the middle of the hull. We're not racing it.

That's why Saturday's boat is a Vespoli loaner.

If you rowed at UTC, send us your photos, your memories, the names of teammates we don't have on the roster yet. Drop them in. The program is back. It'll be built by the people who came before it.`;

// =====================================================================
// ARSON PHOTOS POST SKELETON — uncomment and fill in any time after
// the ACRA recap is published. Writing draft + voice notes live in:
//   content/journal/_draft-arson-photos-after-30-years.md
//
// Steps to publish:
//   1. Open the markdown draft, pick the right opener (A/B/C), fill in
//      the bracketed placeholders, delete the writing notes.
//   2. Pick a final title (4 options at the top of the markdown file).
//   3. Pick a publish date and update both `slug` and `date`.
//   4. Paste the final body into ARSON_POST_BODY below + uncomment the
//      posts[] entry. Hero photo defaults to the gallery hero.
//   5. `npm run build` locally, commit, push.
// =====================================================================

// const ARSON_POST_BODY = `[PASTE FINAL BODY HERE — paragraphs separated by blank lines]`;

// {
//   slug: "2026-05-XX-arson-photos-after-30-years",
//   title: "Thirty years late, the arson photos arrived",
//   date: "2026-05-XX",
//   author: "Michael Kinsey, Head Coach",
//   excerpt:
//     "[ONE OR TWO SENTENCES — lead with the network beat, the date, or the human moment.]",
//   body: ARSON_POST_BODY,
//   hero: "/photos/arson-1996/01-trailer-skeleton-dawn.jpg",
//   heroAlt:
//     "The burnt steel skeleton of UTC Rowing's trailer the morning after the March 22, 1996 arson.",
//   bodyImage: {
//     src: "/photos/arson-1996/02-students-embrace.jpg",
//     alt: "Two UTC Rowing athletes embracing at the burn site, March 22, 1996.",
//     caption: "Two athletes at the site that morning. Photo by Ben Robbs.",
//     afterParagraph: 2,
//   },
// },

// =====================================================================
// RACE-DAY POST SKELETON — uncomment and fill in Saturday May 17 evening.
// Writing draft + voice notes live in:
//   content/journal/2026-05-17-acra-results.md
//
// Steps to publish:
//   1. Open the markdown file, pick the right opener (A/B/C), fill in
//      the bracketed placeholders, delete the writing notes.
//   2. Paste the final body text into ACRA_RESULTS_BODY below.
//   3. Update title + excerpt. Confirm or change the hero photo/video.
//      A photo from race day in /public/photos/ is ideal — drop a JPG
//      and reference it as `hero`.
//   4. Uncomment the posts[] entry below.
//   5. `npm run build` locally to confirm, then commit + push.
//      Vercel auto-deploys; the post is live in ~60s.
// =====================================================================

// const ACRA_RESULTS_BODY = `[PASTE FINAL BODY HERE — paragraphs separated by blank lines]`;

export const posts: JournalPost[] = [
  // {
  //   slug: "2026-05-17-acra-results",
  //   title: "Saturday at Oak Ridge",
  //   date: "2026-05-17",
  //   author: "Michael Kinsey, Head Coach",
  //   excerpt:
  //     "[ONE OR TWO SENTENCES that work as a teaser on /journal and as the OG description on social. Lead with the fact: place, time, or the moment that defined the race.]",
  //   body: ACRA_RESULTS_BODY,
  //   // Hero — pick ONE: a still photo from the dock or finish line is
  //   // ideal. If you don't have one yet, leave the pre-ACRA poster as
  //   // fallback (won't break, just looks generic).
  //   hero: "/photos/[ACRA-RACE-DAY-PHOTO].jpg",
  //   heroAlt: "[Describe the photo — e.g., 'UTC's M4x at the Melton Hill Lake finish line, Saturday afternoon.']",
  //   // Optional: short video clip of the boat, dock interview, etc.
  //   // heroVideo: "/videos/[CLIP].mp4",
  //   // heroVideoPoster: "/videos/[POSTER].jpg",
  //   // Optional inline body image (e.g. a finish-line shot, a podium photo,
  //   // the boys at the trailer afterward). afterParagraph is zero-indexed.
  //   // bodyImage: {
  //   //   src: "/photos/[INLINE-PHOTO].jpg",
  //   //   alt: "[Describe the photo]",
  //   //   caption: "[One short caption.]",
  //   //   afterParagraph: 1,
  //   // },
  // },
  {
    slug: "2026-05-10-pre-acra-where-we-are",
    title: "Pre-ACRA: Where We Are",
    date: "2026-05-10",
    author: "Michael Kinsey, Head Coach",
    excerpt:
      "Saturday is the ACRA Championships at Melton Hill Lake. Three of the four guys in UTC's M4x started rowing six weeks ago. Their own boat isn't seaworthy. They race anyway.",
    body: PRE_ACRA_BODY,
    hero: "/photos/abraham-single-boathouse.jpg",
    heroAlt:
      "Abraham Mako rowing a single past the Lookout Rowing Club boathouse at sunset.",
    heroVideo: "/videos/quad-acra-prep.mp4",
    heroVideoPoster: "/videos/quad-acra-prep-poster.jpg",
    bodyImage: {
      src: "/photos/empacher-damage.jpg",
      alt: "The underside of UTC's Empacher 4x hull showing a large soft spot in the middle, giving way under pressure",
      caption: "What we found when Mako and I pulled it off the trailer.",
      afterParagraph: 4,
    },
    // afterParagraph counts paragraphs split on blank lines, zero-indexed.
    // The "Empacher" paragraph (UTC's own 4x isn't racing) is index 4.
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
