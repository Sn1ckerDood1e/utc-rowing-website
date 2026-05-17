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

Saturday — I won't grade them on place. These boys will compete with whatever is next to them. The only thing I can't watch is a crab — an oar that stops the boat. Anything else, we live with.

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

const ACRA_RESULTS_BODY = `UTC's last team boat at ACRA was a Men's 2x in 2018 — second in the B final. McDarmont raced the W1x in 2019. Then COVID, then the program went dark for four years. The M4x in lane six Friday morning was the first UTC team boat at ACRA in eight years, and the first since the program restarted last fall. Mako on stroke; Richardson, Burkett, Pollard in the bow three. Three of them first sat in a shell on April 6.

Friday at 9:54 we went off the line in Heat 1 against Purdue, GMU, Bowdoin, Vanderbilt, and Grand Valley. We finished sixth in the heat. Time was 7:42.797. The heat winner, Purdue, posted 7:01.460. We weren't in the conversation. First 2k of their lives for the bow three. Nobody talked much at the dock after.

Top two crews plus the next two fastest times moved on to the Grand Final. We dropped to the B final.

Saturday at 15:37 the B final went off — five boats. UTC, Virginia RA, Vanderbilt, Bowdoin, Grand Valley. Photofinish on for the final lengths.

We took third by 0.562 seconds. Time: 7:37.900 — almost five seconds faster than the heat. Bowdoin won the B final with 7:23.273. We held off Virginia RA at the line. Vanderbilt, who had been right behind us in the heat, finished five and a half seconds behind us in the B.

Five seconds in a 2k overnight isn't fitness. Fitness takes months. Five seconds in twenty-four hours is the four of them figuring out how to row together under race conditions. None of the bow three had been in a 2k race before Friday morning.

What I asked them to do before the heat was: don't catch a crab, and compete with whatever is next to you. They didn't crab in either race. They competed with what was next to them. Friday that wasn't enough. Saturday it was.

The boat goes back on the trailer. Hooch is in the fall. The next thing is recruiting five more rowers who want to race against whatever is next to them — and getting enough of our own equipment in working order that we don't have to borrow it next time.

If you rowed at UTC, the site is at utcrowing.org. Send your photos, your memories, the names of teammates we don't have on the roster yet. The program is back. It'll be built by the people who came before it — and by whoever shows up next.`;

export const posts: JournalPost[] = [
  {
    slug: "2026-05-16-acra-third-in-the-b-final",
    title: "Back at ACRA — and third in the B final",
    date: "2026-05-16",
    author: "Michael Kinsey, Head Coach",
    excerpt:
      "UTC's last team boat at ACRA was an M2x in 2018 — second in the B final. Saturday, eight years and a program restart later, four guys in a Vespoli loaner — three of them six weeks into the sport — took third in the M4x B final by half a second in a photo finish.",
    body: ACRA_RESULTS_BODY,
    hero: "/photos/journal/2026-05-16-acra-team-post-race.jpg",
    heroAlt:
      "UTC Rowing's 2026 ACRA M4x crew with Coach Kinsey on the dock at Melton Hill Lake after the B final — Abraham Mako, Conner Richardson, Tyler Burkett, Jay Pollard, and the coach.",
    heroVideo: "/videos/journal/2026-05-16-acra-b-final-start.mp4",
    heroVideoPoster: "/videos/journal/2026-05-16-acra-b-final-start-poster.jpg",
    bodyImage: {
      src: "/photos/journal/2026-05-16-acra-m4x-lane-six.jpg",
      alt: "UTC Rowing's M4x in the water at ACRA Nationals, Melton Hill Lake, Oak Ridge TN — all four rowers (Mako, Richardson, Burkett, Pollard) seated in the boat, side profile, lane buoys visible.",
      caption: "The M4x in lane six. Melton Hill Lake, Oak Ridge.",
      afterParagraph: 3,
    },
  },
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
