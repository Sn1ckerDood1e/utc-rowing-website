/**
 * Structured timeline data — the source of truth for the interactive
 * /history page. Each era contains an ordered list of moments. A moment
 * has a year (or year range), a title, a short summary body, and
 * optional fields for pull-quotes, sources, and visual emphasis.
 *
 * The long-form prose version lives in `content/timeline.md`.
 */

export type Kind =
  | "founding"
  | "achievement"
  | "milestone"
  | "person"
  | "challenge"
  | "transition";

export type Moment = {
  /** Year or "1989-1990" or "1995-96"; used for the date pill on the card */
  year: string;
  /** A sortable numeric year (for ordering within era and scroll-jumping) */
  sortYear: number;
  /** Headline. Keep it short (≤ 8 words). */
  title: string;
  /** 1-3 sentence summary that's visible by default. */
  summary: string;
  /** Optional longer body shown when the card is expanded. Markdown allowed (basic — bold, italic, paragraph breaks). */
  detail?: string;
  /** Optional pull-quote that gets a special visual treatment. */
  pullQuote?: { text: string; attribution?: string };
  /** Categorization — drives icon + color accent. */
  kind: Kind;
  /** Optional source citation. */
  source?: string;
};

export type Era = {
  slug: "founding" | "carney" | "espeseth" | "worth" | "resurrection";
  label: string;
  span: string;
  /** Tailwind gradient classes (matches era-cards on home) */
  gradient: string;
  /** One-line setup paragraph shown above the moments. */
  intro: string;
  moments: Moment[];
};

export const ERAS: Era[] = [
  // =========================================================================
  // First Pulls — 1971-1983
  // =========================================================================
  {
    slug: "founding",
    label: "First Pulls",
    span: "1971 — 1983",
    gradient: "from-utc-navy-darker to-river-blue-dark",
    intro:
      "Before there was a UTC rowing team, there were eight Pocock singles, a Tennessee River, and a few people willing to teach themselves how to row.",
    moments: [
      {
        year: "1971",
        sortYear: 1971,
        title: "Bill Raoul donates 8 Pocock singles to UTC",
        summary:
          "William G. Raoul — Lookout Mountain native, Dartmouth '33, WWII artillery officer, Cavalier Corp executive — donates eight Pocock single shells to UTC. The school stands up an HPER course around them.",
        detail:
          "No formal team yet, no coach, no competitive program. Just equipment, water, and student interest. This is the date the UTC Rowing Constitution names as the program's origin.",
        kind: "founding",
        source: "UTC Rowing Constitution Article 2a (Aug 27 2018)",
      },
      {
        year: "1974",
        sortYear: 1974,
        title: "Lookout Rowing Club is founded",
        summary:
          "Raoul (now teaching himself to row at age 57), TVA engineer Jack Fish, and UTC professor Terry Carney found the modern Lookout Rowing Club. Initial membership: ~15 community members and UTC affiliates.",
        detail:
          'The club takes its name from a Chattanooga rowing club Raoul found in an 1876 newspaper account. For the next decade UTC rowers row under LRC\'s umbrella — the club, equipment, and coaching are one and the same.',
        kind: "founding",
        source: "CityScope Magazine + Chattanooga Rowing history page",
      },
      {
        year: "1975",
        sortYear: 1975,
        title: "First UTC race entry — Head of the Tennessee",
        summary:
          "Students from the HPER class race at the Head of the Tennessee Regatta in Knoxville. UTC's first competitive entry, eight years before formal team status.",
        kind: "milestone",
        source: "UTC Rowing Constitution Article 2a",
      },
      {
        year: "1977",
        sortYear: 1977,
        title: "First refurbished freight barge",
        summary:
          "LRC obtains its first refurbished freight barge — the floating dock and storage that makes river access workable as the club grows.",
        kind: "milestone",
      },
      {
        year: "1983",
        sortYear: 1983,
        title: "UTC begins competing as its own program",
        summary:
          "Coach Terry Carney — Kent School and MIT alumnus — takes UTC's first crews to regattas under the UTC banner. Randy Larramore is the first UTC-specific alumnus identified in the archive (1983-85 LRC scrapbook).",
        kind: "transition",
      },
    ],
  },

  // =========================================================================
  // Carney Era — 1983-1989
  // =========================================================================
  {
    slug: "carney",
    label: "Carney Era",
    span: "1983 — 1989",
    gradient: "from-river-blue-dark to-utc-navy",
    intro:
      "Six years of building. Most of this era is undocumented in the public record — but two firsts survive that anchor the program's competitive history.",
    moments: [
      {
        year: "1985",
        sortYear: 1985,
        title: "UTC's first medal — Head of the Chattahoochie",
        summary:
          "A UTC Men's Novice 4+ wins the Head of the Chattahoochie regatta in Atlanta. The first competitive medal of any kind in program history, two years into Carney's tenure.",
        kind: "achievement",
        source: "UTC Rowing Constitution Article 2a",
      },
      {
        year: "1987",
        sortYear: 1987,
        title: "Pete Seridino donates UTC's dedicated barge",
        summary:
          "A second LRC barge — donated by Pete Seridino — becomes the dedicated UTC barge. Names matter; donors who stick get named.",
        kind: "person",
      },
      {
        year: "1988",
        sortYear: 1988,
        title: "First national-championship medal — Dad Vail bronze",
        summary:
          "Coach Carney takes a UTC Women's Varsity 4+ to a third-place finish at the Dad Vail Regatta in Philadelphia — the program's first medal at a national-championship event. One year before Espeseth would take the program over.",
        kind: "achievement",
        source: "UTC Rowing Constitution",
      },
      {
        year: "1989",
        sortYear: 1989.0,
        title: "Chattanooga Rowing incorporates",
        summary:
          "Feb 18 1989: Raoul, Fish, and H. Grant Law Jr. sign the Charter of Chattanooga Rowing in Hamilton County (Book 3090, Page 976). IRS recognizes it as a 501(c)(3) public charity July 31 1989. The parent organization that will shelter UTC Rowing for the next 35+ years is in place.",
        kind: "milestone",
        source: "Hamilton County records + IRS determination letter",
      },
    ],
  },

  // =========================================================================
  // Espeseth Era — 1989-2017
  // =========================================================================
  {
    slug: "espeseth",
    label: "Espeseth Era",
    span: "1989 — 2017",
    gradient: "from-utc-navy to-utc-gold-deep",
    intro:
      "Twenty-eight years. An Olympic medalist on the deck, an Olympic gold medalist on the team, the most USRowing Academic All-Americans in the country in a single year, and a national champion regatta launched on the Tennessee River.",
    moments: [
      {
        year: "1989",
        sortYear: 1989.5,
        title: "Robert Espeseth is hired",
        summary:
          "Sunday Oct 29 1989: the Chattanooga News-Free Press runs 'UTC's Rowing Team Seeks Fresh Start With Espeseth.' UTC and LRC together hire 1976 Olympian, 1980 boycott alternate, 1984 LA Olympic bronze medalist, and 1986 World Champion Robert Espeseth — and Coordinator of Club Sports.",
        kind: "person",
        pullQuote: {
          text: "UTC's Rowing Team Seeks Fresh Start With Espeseth",
          attribution: "Chattanooga News-Free Press, Oct 29 1989",
        },
        source: "News-Free Press feature in UTC ARC",
      },
      {
        year: "1990",
        sortYear: 1990.5,
        title: "UTC marked attending at SIRA roll-call",
        summary:
          "By Nov 30 1990 UTC is on the SIRA membership roster — a founding-era member of the Southern Intercollegiate Rowing Association within months of Espeseth's hire.",
        kind: "milestone",
      },
      {
        year: "1991",
        sortYear: 1991,
        title: "TIRC launches",
        summary:
          "The Tennessee Indoor Rowing Championships — UTC's signature winter event — runs for the first time, born from the 1990 'Greenleaf Tennessee Indoor Regatta.' UTC will win it every documented year.",
        kind: "milestone",
      },
      {
        year: "1991",
        sortYear: 1991.5,
        title: "WGR memo — Requirements for the New Boathouse",
        summary:
          'July 28 1991: William G. Raoul writes a 2-page brief specifying the future Rowing Center — explicitly accommodating UTC chase boats and barges. Three years before opening day.',
        kind: "milestone",
        source: "WGR memo, UTC ARC Records & Correspondence",
      },
      {
        year: "1992",
        sortYear: 1992,
        title: "Chattanooga Head Race begins",
        summary:
          "The first Chattanooga Head Race runs on the Tennessee River — UTC and LRC's home regatta, growing toward its current scale.",
        kind: "milestone",
      },
      {
        year: "1993",
        sortYear: 1993,
        title: "UTC wins the Florida Crew Classic — 1st of 10 teams",
        summary:
          "March 21 1993: UTC wins six events at the Florida Crew Classic in Jacksonville, finishing 1st in team standings out of 10 schools. The strongest single-regatta team result documented in the early Espeseth era.",
        detail:
          "Athletes named in the News-Free Press article: Robert Meeks (later 1995-96 USRowing AA), Phillip Daniels, Todd Stansbury, Ed McCormick, Howell Strain, Eric Gregory, Trae Calfee, Paul Brinkman, Andy Foxwell, Christi Pitner, Stephanie Martin, Tracey Davis, Renee Holeton, Kim Tatum.",
        kind: "achievement",
        source: "News-Free Press, March 21 1993",
      },
      {
        year: "1993-94",
        sortYear: 1993.7,
        title: "Keith Bruce — UTC's first USRowing All-American",
        summary:
          "Keith Bruce becomes the first UTC athlete named a USRowing Collegiate Academic All-American. Two years before the 1995-96 sweep.",
        kind: "achievement",
      },
      {
        year: "1993",
        sortYear: 1993.5,
        title: "U.S. Women's National Team residency begins",
        summary:
          "Through Espeseth's national-team contacts, the U.S. Women's Rowing Team adopts Chattanooga as a Tennessee River training base in preparation for the 1996 Atlanta Olympics.",
        kind: "milestone",
      },
      {
        year: "1994",
        sortYear: 1994,
        title: "William G. Raoul Rowing Center opens",
        summary:
          'August 1994: the LRC newsletter announces "Rowing Center Opens." After three years of design and construction, UTC finally has a proper home.',
        kind: "milestone",
        source: "LRC Aug 1994 newsletter",
      },
      {
        year: "1995",
        sortYear: 1995,
        title: "U.S. women win 4 golds at Tampere",
        summary:
          "The Chattanooga-trained U.S. Women's National Team wins gold in the 8+, 4-, 2-, and lwt 2- at the World Rowing Championships in Tampere, Finland — and previews what 1996 Atlanta will look like.",
        kind: "achievement",
      },
      {
        year: "1995",
        sortYear: 1995.5,
        title: "Espeseth races and wins — Clouter Creek Challenge",
        summary:
          "Nov 16 1995, Charleston SC: Espeseth wins the Men's Open Single (1X) at Clouter Creek in 19:09. He's coaching UTC; he's also still racing. UTC-Chattanooga wins M Open 4 (15:48), M Club 4 (14:57), W Novice 4 (15:08) the same day.",
        kind: "achievement",
        source: "Clouter Creek 1995 results, UTC ARC Other Regattas",
      },
      {
        year: "1995-96",
        sortYear: 1996,
        title: "Three USRowing Academic All-Americans — most in nation",
        summary:
          "Per UTC press release Oct 10 1996: Robert Meeks, Paul Turner, and Valerie Schlatter are named USRowing Collegiate Academic All-Americans for 1995-96 — more than any other U.S. college program that year, including Harvard, Yale, MIT, and Princeton.",
        detail:
          "This is the program's peak academic-athletic moment. A program our size, in a club-sport status, producing more All-Americans than the elite varsity programs.",
        kind: "achievement",
        pullQuote: {
          text: "More than Harvard, Yale, MIT, and Princeton.",
          attribution: "UTC press release, Oct 10 1996",
        },
        source: "UTC press release in UTC Rowing Program Archive/1996/",
      },
      {
        year: "1996",
        sortYear: 1996.2,
        title: "Trailer arson — and a borrowed-boat win two days later",
        summary:
          "March 22 1996, ~3 a.m.: arson destroys 9 boats (1 UTC eight, 3 UTC fours, 1 of Espeseth's personal eights, 3 McCallie fours, 1 Chattanooga Youth four), 40 oars, 9 cox boxes, and the trailer itself. UTC's insurance claim totals $57,157.72.",
        detail:
          "Two days later at the Augusta Invitational, the UTC women's novice B 4+ rows to victory in *borrowed boats*. The community fundraises within months. A replacement trailer is procured July/August 1996.",
        kind: "challenge",
        pullQuote: {
          text: "UTC Novice Crew Wins",
          attribution: "Chattanooga Free Press, March 24 1996",
        },
        source: "Trailer Arson 1996 folder, UTC ARC",
      },
      {
        year: "1996",
        sortYear: 1996.5,
        title: "U.S. women take silver at Atlanta",
        summary:
          "The Chattanooga-prepared U.S. Women's Rowing Team takes two silver medals at the Atlanta Olympics. UTC and the Tennessee River are part of the story.",
        kind: "achievement",
      },
      {
        year: "1997",
        sortYear: 1997,
        title: "Stephen Thomas at the World Championships",
        summary:
          "Stephen Thomas (UTC class of 1995) competes for the U.S. lightweight quad at the 1997 World Rowing Championships in Aiguebelette. UTC's first international rower at the senior World level — five years before Beery's first international medal.",
        kind: "achievement",
        source: "Free Press Aug 31 1997, UTC ARC",
      },
      {
        year: "1997",
        sortYear: 1997.5,
        title: "William G. Raoul passes",
        summary:
          "Bill Raoul — co-founder of LRC, donor of the original Pocock fleet, and namesake of the Rowing Center — dies in 1997. The LRC newsletter runs his obituary that November.",
        kind: "person",
      },
      {
        year: "1998",
        sortYear: 1998,
        title: "Dan Beery on the Raoul Cup MV8+",
        summary:
          "Aug 21 1998: Espeseth's memo to Chancellor Bill Stacy lists upcoming UTC Rowing functions and the 1998 Raoul Cup men's varsity 8+ — Dan Beery seated #7. Beery is a UTC sophomore. Six years before he'll win Olympic gold.",
        kind: "person",
        source: "Stacy memo Aug 21 1998, UTC ARC",
      },
      {
        year: "1999",
        sortYear: 1999,
        title: "Bonnie Blair speaks at the UTC Rowing banquet",
        summary:
          "April 10 1999: 5x Olympic gold-medal speed-skater Bonnie Blair is the guest speaker at the UTC Rowing annual banquet — a measure of the public profile UTC Rowing carried at the late-1990s peak.",
        kind: "person",
      },
      {
        year: "2000",
        sortYear: 2000,
        title: "Beery's senior year — and first documented 1X",
        summary:
          "Jan 2000 TIRC: Dan Beery, UTC, age 25, races Open Men 1X in 10:50.4 (1:42.6 split). Four months before his UTC graduation. Three years before his first World gold. Four years before the Olympics.",
        kind: "person",
      },
      {
        year: "2003-2007",
        sortYear: 2003,
        title: "Beery's international medals roll in",
        summary:
          "World Championship gold in the U.S. men's eight in 2003, 2005, and 2007. Olympic silver at Beijing 2008. The interval that includes the Athens gold.",
        kind: "achievement",
      },
      {
        year: "2004",
        sortYear: 2004,
        title: "Athens — Olympic gold",
        summary:
          "Athens 2004: Dan Beery wins Olympic gold in the U.S. Men's Eight — the first U.S. men's eight Olympic gold in 40 years. World-record 5:19.85 in the heat. UTC class of 2000.",
        detail:
          "Espeseth recruited Beery off a UTC basketball court in fall 1996, four years before this moment.",
        kind: "achievement",
        pullQuote: {
          text: "World-record 5:19.85 in the heat.",
        },
        source: "Chattanoogan, Aug 16 2004",
      },
      {
        year: "2005-06",
        sortYear: 2005.5,
        title: "Title IX — UTC considers women's-rowing varsity status",
        summary:
          "UTC's Athletic Department considers elevating women's rowing to NCAA Division I varsity status as part of a Title IX compliance push. Ultimately UTC selects another sport — but the conversation is real, and on the record.",
        kind: "milestone",
      },
      {
        year: "2005",
        sortYear: 2005.7,
        title: "Head of the Hooch arrives in Chattanooga",
        summary:
          "After outgrowing Lake Lanier under Atlanta Rowing Club, the Head of the Hooch relocates to Chattanooga in 2005. UTC supplies the venue. Today it is the second-largest regatta in the United States.",
        kind: "milestone",
      },
      {
        year: "2010-11",
        sortYear: 2010.5,
        title: "Beery in the UTC Hall of Fame",
        summary:
          "Dec 17 2010: UTC Alumni Affairs notifies Dan Beery he is the 2010 Joe Morrison Award recipient. He is inducted into the UTC Athletic Hall of Fame Feb 11-12 2011 — the only UTC rower in the institution's varsity-only Athletic Hall of Fame.",
        detail:
          "Beery was also inducted into the National Rowing Foundation Hall of Fame March 20 2010 at Mystic Seaport. Dr. Leroy Fanning, the UTC faculty member who identified Beery's nutritional needs early in his career, is credited at the announcement.",
        kind: "achievement",
        source: "UTC Alumni Affairs letter, UTC ARC Program Archive/2010/",
      },
      {
        year: "2010-2015",
        sortYear: 2012,
        title: "TIRC: undefeated home stronghold",
        summary:
          "UTC wins TIRC every documented year. 2015 standings: UTC 403.5 · Murray State 386.5 · UT-Knoxville 255.5 · Berry 181.5 · NSU 157. Axel Marshall is the most-documented athlete of the 2010-13 cohort.",
        kind: "achievement",
      },
      {
        year: "2016-17",
        sortYear: 2016.5,
        title: "Program nearly ends — alumni save it",
        summary:
          "Fall 2016: UTC tells Espeseth the program will be terminated at the end of Spring 2017, driven by the loss of barge maintenance funding. Coach Espeseth notifies the alumni network. A campaign organized in part by Keith Bruce makes the case for keeping the program running.",
        detail:
          "The campaign works. UTC opens a head-coach search in spring 2017 with a clear bar: the new coach will deliver a sustainable annual fundraising plan. **The program almost ended, and alumni kept it alive long enough for a new coach to be hired** — that's the bridge between the Espeseth era and what came next.",
        kind: "challenge",
        pullQuote: {
          text: "Alumni kept it alive long enough for a new coach to be hired.",
        },
      },
      {
        year: "2017",
        sortYear: 2017,
        title: "Espeseth retires after 28 years",
        summary:
          "After 28 seasons — the longest tenure in UTC Rowing history — Robert Espeseth steps down. He stays engaged with the program informally as a volunteer assistant on merchandise and fundraising operations.",
        kind: "transition",
      },
    ],
  },

  // =========================================================================
  // Worth Era — 2018-2024
  // =========================================================================
  {
    slug: "worth",
    label: "Worth Era",
    span: "2018 — 2024",
    gradient: "from-utc-gold-deep to-river-blue",
    intro:
      "A Chattanooga rowing product takes over. The next 30 years get foundation-laid. Then COVID + a barge loss end the chapter early.",
    moments: [
      {
        year: "2017",
        sortYear: 2017.5,
        title: "Ryan Worth is hired",
        summary:
          "Spring 2017: Ryan Worth is hired (interview April 17, 2017) and takes over for the 2017-18 season. A Chattanooga Junior Rowing alum (first documented at TIRC 2005 Never-Ever Men). Concept2 24-hour World Record holder in his age category. Two Guinness World Records for ocean rowing.",
        kind: "person",
      },
      {
        year: "2017-18",
        sortYear: 2017.6,
        title: "Coaching staff and faculty advisor",
        summary:
          "Worth's staff: Drew Steadman (UTC alum, Lead Novice Coach), Jessica Brand and Aaron Shimel as assistants. Konstantine Vlasis joins Fall 2018. Dr. Brian O'Leary becomes faculty advisor in Fall 2017.",
        kind: "person",
      },
      {
        year: "2018",
        sortYear: 2018,
        title: "UTC Rowing Constitution updated",
        summary:
          "August 27, 2018: the UTC Rowing Constitution is formally updated (originally adopted Aug 22, 2013). Three-tier program structure: Group Fitness Class drop-in, Club Member ($100/sem), Travel Squad ($200/sem) racing in Knoxville, Nashville, Gainesville, Tampa, Orlando, Charleston, and Boston.",
        source: "UTC Rowing Constitution, Aug 27 2018",
        kind: "milestone",
      },
      {
        year: "2019",
        sortYear: 2019,
        title: "Sarah McDarmont — first ACRA W1x for UTC",
        summary:
          "June 2019: Sarah McDarmont, then a sophomore, finishes 7th in the women's single at the ACRA National Championship Regatta on Lake Lanier — UTC's first entry in a varsity women's event at ACRA Nationals. McDarmont had finished 3rd at TIRC 2019 four months earlier.",
        kind: "achievement",
      },
      {
        year: "2020",
        sortYear: 2020,
        title: "COVID disruption",
        summary:
          "Spring 2020 racing season is lost. UTC Rowing's Board of Directors keeps detailed minutes through the pandemic. In August 2020, the team votes unanimously to spend $5,500 of $9,016 cash on hand on six oarboards (land-based rowing simulators) so athletes can train individually. New dock installed October 2020.",
        kind: "challenge",
      },
      {
        year: "2020-21",
        sortYear: 2021,
        title: "Pandemic-era leadership",
        summary:
          "Officers Virginia Willis (President), Emily Murr (VP), Omar Morales (Treasurer). Women's captain Chynna Knight, men's captain Brandon Humphrys lead the boats through reduced operations.",
        kind: "person",
      },
      {
        year: "2022",
        sortYear: 2022,
        title: "SIRA at Oak Ridge — and the barges go",
        summary:
          "UTC races SIRA at Oak Ridge, April 15-16, 2022. The 2022 club-sports banquet recognizes Karoline Bonastia (MVP) and Steven Stanford (HOT). Later in 2022 UTC's barges are lost — the program's river-access infrastructure is gone.",
        kind: "challenge",
      },
      {
        year: "2023",
        sortYear: 2023,
        title: "Bonastia's final roster",
        summary:
          "Karoline Bonastia takes club president for the 2023 academic year, leading a 9-rower roster: Steven Stanford (VP), Ethan Hitchcock (Treasurer), Rileigh Arrington (Safety Officer), and athletes with significant junior-rowing experience like Henri Collins (4.5 years) and Rya Potts (5 years).",
        kind: "person",
      },
      {
        year: "2024",
        sortYear: 2024,
        title: "End of the Worth chapter",
        summary:
          "Detailed event-by-event UTC results from 2018-2024 are largely gated behind RegattaCentral's bot protections and have not been recovered for this timeline. We know UTC competed at ACRA, Dad Vail, Hooch, SIRA, and the regional regattas through this entire window. The exact placings remain on the open-question list — and the alumni-submission form is the most likely path to closing it.",
        kind: "transition",
      },
    ],
  },

  // =========================================================================
  // Resurrection — 2025-now
  // =========================================================================
  {
    slug: "resurrection",
    label: "Resurrection",
    span: "2025 — now",
    gradient: "from-river-blue to-utc-gold-bright",
    intro:
      "Four athletes, an aging fleet, and a head coach two months out of mechatronics school. The program is back.",
    moments: [
      {
        year: "2025",
        sortYear: 2025,
        title: "Restart, Fall 2025",
        summary:
          "Abraham Mako and Michael Kinsey co-restart UTC Rowing. Four athletes total. ACRA M4x. The first competitive UTC crew since the program went dark.",
        kind: "founding",
      },
      {
        year: "2025",
        sortYear: 2025.3,
        title: "Athletes vs. Engineers — first event",
        summary:
          "Nov 2025 UTC News covers the inaugural Athletes vs. Engineers Tennessee River Race / Concrete Canoe — UTC's first organized event of the new chapter, naming Mako and Kinsey.",
        kind: "milestone",
      },
      {
        year: "2025",
        sortYear: 2025.5,
        title: "Michael Kinsey graduates UTC mechatronics",
        summary:
          "December 2025: Michael Kinsey graduates with a UTC mechatronics degree and immediately steps into the unpaid Head Coach role at UTC Rowing while also serving as founding Head Coach of Chattanooga State Rowing.",
        kind: "transition",
      },
      {
        year: "2026",
        sortYear: 2026,
        title: "ACRA Nationals — May 17",
        summary:
          "UTC's M4x — Abraham Mako, Conner, Tyler, Jay — race at ACRA Nationals on May 17, 2026. The first UTC ACRA crew since the program restarted. The site you're reading was built for this moment.",
        kind: "achievement",
      },
    ],
  },
];

/**
 * Total moments across all eras (used for stats).
 */
export const TIMELINE_TOTAL_MOMENTS = ERAS.reduce(
  (acc, era) => acc + era.moments.length,
  0
);
