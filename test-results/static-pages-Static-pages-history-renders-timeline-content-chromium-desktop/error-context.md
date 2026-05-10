# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: static-pages.spec.ts >> Static pages >> /history renders timeline content
- Location: tests/e2e/static-pages.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /UTC Rowing/i, level: 1 })
Expected: visible
Error: strict mode violation: getByRole('heading', { name: /UTC Rowing/i, level: 1 }) resolved to 2 elements:
    1) <h1 class="font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight">…</h1> aka getByRole('heading', { name: 'UTC Rowing a history' })
    2) <h1>UTC Rowing — A Timeline (1974–2026)</h1> aka getByRole('heading', { name: 'UTC Rowing — A Timeline (1974' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /UTC Rowing/i, level: 1 })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "U UTCRowing" [ref=e4] [cursor=pointer]:
        - /url: /
        - generic [ref=e5]: U
        - generic [ref=e6]: UTCRowing
      - navigation [ref=e7]:
        - list [ref=e8]:
          - listitem [ref=e9]:
            - link "History" [ref=e10] [cursor=pointer]:
              - /url: /history
          - listitem [ref=e11]:
            - link "Alumni" [ref=e12] [cursor=pointer]:
              - /url: /alumni
          - listitem [ref=e13]:
            - link "Submit" [ref=e14] [cursor=pointer]:
              - /url: /submit
          - listitem [ref=e15]:
            - link "Donate" [ref=e16] [cursor=pointer]:
              - /url: /donate
          - listitem [ref=e17]:
            - link "Contact" [ref=e18] [cursor=pointer]:
              - /url: /contact
          - listitem [ref=e19]:
            - link "Support →" [ref=e20] [cursor=pointer]:
              - /url: /donate
  - main [ref=e21]:
    - generic [ref=e24]:
      - generic [ref=e25]:
        - img [ref=e27]
        - paragraph [ref=e30]: Volume 1 · Our Story
        - img [ref=e32]
      - heading "UTC Rowing a history" [level=1] [ref=e35]:
        - text: UTC Rowing
        - text: a history
      - paragraph [ref=e36]: From the founding of the Lookout Rowing Club in 1974 through the resurrection of UTC Rowing in 2025 — compiled from primary sources in the program archive, public records, and alumni recollections.
      - paragraph [ref=e37]: Last revised May 2026 · Verified across 200+ archival documents
    - article [ref=e42]:
      - heading "UTC Rowing — A Timeline (1974–2026)" [level=1] [ref=e43]
      - paragraph [ref=e44]:
        - emphasis [ref=e45]: A narrative history of the University of Tennessee at Chattanooga rowing program, drawn from the UTC ARC archive — primary documents, Lookout Rowing Club newsletters, regatta programs, news clippings, and interviews. Every claim here traces back to a source. The companion file
        - text: TIMELINE-SOURCES.md
        - emphasis [ref=e46]: carries the citations.
      - paragraph [ref=e47]: UTC Rowing has been a club sport — never NCAA varsity — for its entire history. That status is the single biggest reason institutional records are thin, and it's the reason this archive exists. What follows is the program's story as the documentary record currently supports it.
      - separator [ref=e48]
      - heading "The Founding Era (1974–1983)" [level=2] [ref=e49]
      - paragraph [ref=e50]:
        - text: In 1974,
        - strong [ref=e51]: William G. "Bill" Raoul
        - text: — a Lookout Mountain native, Dartmouth Class of 1933, decorated WWII artillery officer, and Cavalier Corporation executive — taught himself to row at age 57 and went looking for company on the Tennessee River. He found it in
        - strong [ref=e52]: Jack Fish
        - text: ", a TVA engineer, and"
        - strong [ref=e53]: Terry Carney
        - text: ", a UTC professor who had rowed at Kent School and at MIT. The three of them founded the modern"
        - strong [ref=e54]: Lookout Rowing Club
        - text: that year, taking the name from a Chattanooga rowing club they'd discovered in an 1876 newspaper account. Initial membership was about fifteen people drawn from the community and from UTC.
      - paragraph [ref=e55]: For roughly the first decade, UTC affiliates rowed under LRC's umbrella. There is no public record of a separate "UTC rowing team" before 1983 — the club, the equipment, and the coaching were one and the same.
      - paragraph [ref=e56]:
        - text: In
        - strong [ref=e57]: "1983"
        - text: ", with"
        - strong [ref=e58]: Terry Carney
        - text: coaching, UTC began competing as its own program at regattas. A primary-source photo from the 1983–1985 LRC scrapbook identifies
        - strong [ref=e59]: Randy Larramore
        - text: as a UTC sculler in that early Carney window — the first UTC-specific alumnus name documented in the archive. Carney's competitive record from 1983 to 1989 is otherwise a gap; LRC archives or Carney himself remain the most likely source.
      - heading "The Espeseth Era Begins (1989)" [level=2] [ref=e60]
      - heading "1989 — Chattanooga Rowing incorporates; Espeseth is hired" [level=3] [ref=e61]
      - paragraph [ref=e62]:
        - text: "On"
        - strong [ref=e63]: February 18, 1989
        - text: ", William G. Raoul, John H. Fish, and H. Grant Law, Jr. signed the"
        - strong [ref=e64]: Charter of Chattanooga Rowing
        - text: ", filing it in Hamilton County (Book 3090, Page 976). The charter's stated purpose, written into the corporate record, was to provide a Tennessee River site \"with the facilities and equipment for competitive and recreational rowing, to conduct rowing programs serving public and private schools as well as individuals of all ages and both sexes, and special programs for the physically handicapped and mentally retarded.\" The IRS recognized Chattanooga Rowing as a 501(c)(3) public charity on"
        - strong [ref=e65]: July 31, 1989
        - text: — formalizing the parent organization that would shelter UTC Rowing, LRC, and (later) Chattanooga Junior Rowing.
      - paragraph [ref=e66]:
        - text: That fall, on
        - strong [ref=e67]: Sunday, October 29, 1989
        - text: ", the"
        - emphasis [ref=e68]: Chattanooga News-Free Press
        - text: ran a feature titled "UTC's Rowing Team Seeks Fresh Start With Espeseth." UTC and LRC together had hired
        - strong [ref=e69]: Robert Espeseth
        - text: — 1976 Olympian, 1980 boycott alternate,
        - strong [ref=e70]: 1984 Los Angeles Olympic bronze medalist
        - text: in the men's coxed pair,
        - strong [ref=e71]: 1986 World Champion
        - text: in the coxless four, U.S. Rowing Hall of Fame member, and Congressional Gold Medal recipient. He took on UTC head coaching while also serving as Coordinator of Club Sports.
      - paragraph [ref=e72]:
        - text: By
        - strong [ref=e73]: November 30, 1990
        - text: ", UTC was already on the SIRA roll-call — the regional Southeast Intercollegiate Rowing Association — marking the program as a founding-era SIRA member within months of Espeseth's hire."
      - heading "The Building Years (1990–1996)" [level=2] [ref=e74]
      - heading "1990–1991 — Indoor regatta launches; first dated press" [level=3] [ref=e75]
      - paragraph [ref=e76]:
        - text: The
        - strong [ref=e77]: Greenleaf Tennessee Indoor Regatta
        - text: ran in January 1990 — the inaugural edition of what would become the
        - strong [ref=e78]: Tennessee Indoor Rowing Championships (TIRC)
        - text: . By 1991 the event had been renamed and held its 2nd annual edition. UTC's earliest dated press clipping is a
        - strong [ref=e79]: University Echo
        - text: piece from
        - strong [ref=e80]: February 27, 1991
        - text: "celebrating TIRC champions:"
        - strong [ref=e81]: Chris Calhoun
        - text: (CSAS),
        - strong [ref=e82]: Mike Striebel
        - text: (UTC, "transplant from Nova Scotia," Men's Open winner at 8:30.8), and
        - strong [ref=e83]: Renee Holeton
        - text: (UTC, women's open winner at 10:04). Around the same time, UTC won the men's open four and the women's open pair at the Knoxville Head of the Tennessee, finishing 3rd overall in a 20-team field — a strong showing in year two of Espeseth's tenure.
      - paragraph [ref=e84]:
        - text: In
        - strong [ref=e85]: July 1991
        - text: ", William G. Raoul authored a \"Requirements for the New Boathouse\" memo — the earliest pre-construction document in the archive for what would become the William G. Raoul Rowing Center, with explicit accommodations for UTC's chase boats and barges from the design phase forward."
      - heading "1992 — Chattanooga Head Race begins; spring regatta launches" [level=3] [ref=e86]
      - paragraph [ref=e87]:
        - text: LRC organized the inaugural
        - strong [ref=e88]: Chattanooga Head Race
        - text: in 1992, a roughly 300-boat fall head race that established Chattanooga as a regatta destination. That same year LRC also launched a spring head race — the
        - strong [ref=e89]: 1992 Aquarium Regatta
        - text: on May 2, marketed for the opening of the Tennessee Aquarium — which would run for four years under successor names ("Bridgefest Regatta," 1993–1995) before being retired in December 1995 to focus committee resources on the fall Head Race.
      - heading "1993 — Florida Crew Classic team title; women's national team adopts Chattanooga" [level=3] [ref=e90]
      - paragraph [ref=e91]:
        - text: "On"
        - strong [ref=e92]: March 21, 1993
        - text: ", UTC won six events at the"
        - strong [ref=e93]: Florida Crew Classic
        - text: in Jacksonville and finished
        - strong [ref=e94]: 1st of 10 teams
        - text: — by team-standings measure, the strongest UTC result documented in the early Espeseth era. The roster included
        - strong [ref=e95]: Robert Meeks
        - text: (later a 1995–96 USRowing Academic All-American), Phillip Daniels, Todd Stansbury, Ed McCormick, Howell Strain, Eric Gregory, Trae Calfee, Paul Brinkman, Andy Foxwell, Christi Pitner, Stephanie Martin, Tracey Davis, Renee Holeton, and Kim Tatum.
      - paragraph [ref=e96]:
        - text: That same year, through Espeseth's national-team contacts,
        - strong [ref=e97]: the U.S. Women's National Rowing Team adopted Chattanooga as a training site
        - text: in preparation for the 1996 Atlanta Olympics. Head coach
        - strong [ref=e98]: Hartmut Buschbacher
        - text: (USWNT 1991–2000) maintained at least a part-time Chattanooga residence during this window. Cox
        - strong [ref=e99]: Yasmin "Yaz" Farooq
        - text: moved to Chattanooga full-time after the 1992 Barcelona Olympics, working as a TV producer while continuing to cox the U.S. women's eight. By 1995, Farooq, Catriona Fallon, and Jennifer Dore were all paid LRC members.
      - heading "1994 — The William G. Raoul Rowing Center opens" [level=3] [ref=e100]
      - paragraph [ref=e101]:
        - text: After roughly three years from design memo to ribbon, the
        - strong [ref=e102]: William G. Raoul Rowing Center
        - text: opened in
        - strong [ref=e103]: June 1994
        - text: at 1001 Riverside Drive on the Tennessee River. A major-donor party was held
        - strong [ref=e104]: Wednesday, June 15, 1994
        - text: ; a community-member party followed the next day. The boathouse hosted its first regatta, the
        - strong [ref=e105]: Tennessee Sportsfest, on June 26, 1994
        - text: . The dedication highlight was a Vespoli eight named
        - strong [ref=e106]: The Chattanooga
        - text: ", presented to the U.S. Women's Rowing Team by Chattanooga Rowing. The center, built for roughly $500,000 in private donations, replaced the earlier LRC barges and remains the home boathouse for UTC Rowing, LRC, and Chattanooga Junior Rowing."
      - heading "1995 — A national-circuit breakthrough year" [level=3] [ref=e107]
      - paragraph [ref=e108]:
        - text: UTC produced its strongest documented Dad Vail showing in 1995. At the
        - strong [ref=e109]: Dad Vail Regatta in Philadelphia (May 12–13, 1995)
        - text: ", the"
        - strong [ref=e110]: Men's Varsity Lightweight 8
        - text: finished
        - strong [ref=e111]: 3rd in 6:06.82
        - text: (Loschiavo Trophy bronze), behind Toronto and Drexel. UTC also took
        - strong [ref=e112]: 3rd in the Men's Pair with Coxswain (Curran Cup)
        - text: in 7:53.24 and won an additional event in 7:57.6.
      - paragraph [ref=e113]:
        - text: That summer, Chattanooga's adopted U.S. women's eight — coxed by Farooq, with Jennifer Dore, Catriona Fallon, Amy Fuller, Anne Kakela, Laurel Korholz, Elizabeth McCagg, Mary McCagg, and Monica Tranel-Michini — won
        - strong [ref=e114]: gold at the 1995 World Rowing Championships in Tampere, Finland
        - text: (6:50.73). The U.S. women won three golds total at Tampere (W8+, W4-, LW4-) and added two silvers.
      - paragraph [ref=e115]:
        - text: UTC also launched its
        - strong [ref=e116]: adaptive rowing program
        - text: in 1995, with summer pool sessions at UTC and a boat-design team that included two quadriplegic community members and physical therapists from Siskin, Erlanger, and SPARCS — fulfilling a stated purpose written into the 1989 Charter.
      - paragraph [ref=e117]:
        - text: In November 1995,
        - strong [ref=e118]: Espeseth himself won the Men's Open Single (1X) at the Clouter Creek Challenge
        - text: in Charleston, SC, in 19:09. He raced masters singles at TIRC, Head of the Tennessee, and Clouter Creek across the mid-1990s — an Olympic-medal coach who was still pulling on the water alongside the program he was building.
      - heading "1996 — The trailer arson, then a national-circuit win days later" [level=3] [ref=e119]
      - paragraph [ref=e120]:
        - text: "On"
        - strong [ref=e121]: Friday, March 22, 1996, at roughly 3 a.m.
        - text: ", UTC's equipment trailer — parked at the corner of Battery Place and Douglas Street, ready for the next morning's drive to the Augusta Invitational — was set on fire. The blaze was discovered by UTC officer Paul Dodds and ruled arson by joint Chattanooga City and UTC Police; no perpetrator was ever publicly identified."
        - strong [ref=e122]: Nine boats were destroyed
        - text: ": a UTC Vespoli eight, one of Espeseth's personal eights, three UTC Vespoli fours, three McCallie School fours, one Chattanooga Youth Rowing four, plus 40 oars, nine cox boxes, six rainsuits, and the trailer itself. The trailer was a 1990 Espeseth-and-David-Crew rebuild of the original 1979 William G. Raoul / Tennessee Trailers donation."
      - paragraph [ref=e123]:
        - text: What happened next is the part of the story this program tells about itself.
        - strong [ref=e124]: Two days later, on Sunday March 24, 1996, UTC's women's novice 4+ won the Augusta Invitational in borrowed boats.
        - text: The
        - emphasis [ref=e125]: Chattanooga Free Press
        - text: ran the headline "UTC Novice Crew Wins."
      - paragraph [ref=e126]:
        - text: In the twelve days after the fire, the Chattanooga community raised
        - strong [ref=e127]: $8,419.77
        - text: "in cash and checks at the UTC Development Office: $911 in coins from a University Center donation jar, $2,367 from a Kilroy's Coffee House benefit, $958 from a Cameron Hills car wash, $2,196 from a University Center auction. SGA allocated $7,500 separately. WKXJ-FM \"Kicks 97\" did a remote benefit broadcast. National rowing-community checks arrived after"
        - emphasis [ref=e128]: American Rowing
        - text: magazine wrote up the story — including $50 from
        - strong [ref=e129]: Los Gatos Rowing Club
        - text: in San Jose, whose treasurer wrote that LGRC had lost its own boathouse to arson on Memorial Day two years before.
        - strong [ref=e130]: McKee Foods
        - text: underwrote an $11,000 Vespoli four — christened the
        - strong [ref=e131]: Little Debbie Special
        - text: on May 14, 1996 — and
        - strong [ref=e132]: Provident Life and Accident Insurance
        - text: donated a $17,000 Vespoli eight, christened by CEO Harold Chandler and Chancellor Fred Obear with team captains
        - strong [ref=e133]: Valerie Schlatter
        - text: and
        - strong [ref=e134]: David Buntin
        - text: . UTC's insurance claim totaled
        - strong [ref=e135]: $57,157.72
        - text: ", filed by safety officer Jim Pulliam on October 29, 1996. The replacement trailer was on the road by July or August 1996."
      - paragraph [ref=e136]:
        - text: That same fall, on
        - strong [ref=e137]: October 10, 1996
        - text: ", UTC issued a press release announcing that the program had produced"
        - strong [ref=e138]: three USRowing Collegiate Academic All-Americans for 1995–96 — Robert Meeks, Paul Turner, and Valerie Schlatter
        - text: — more than any other university in the country that year, including Harvard, Yale, MIT, and Princeton. The program's first-ever USRowing Academic All-American had been
        - strong [ref=e139]: Keith Bruce in 1993–94
        - text: . At peak Espeseth, UTC was producing nationally-recognized scholar-athletes at a rate exceeding flagship programs.
      - paragraph [ref=e140]:
        - text: The U.S. Women's Eight, training out of Chattanooga, finished 4th at the 1996 Atlanta Olympics.
        - strong [ref=e141]: Missy Schwen and Karen Kraft
        - text: (women's pair, Princeton-trained) and
        - strong [ref=e142]: Lindsay Burns and Teresa Bell
        - text: (lightweight double, Chattanooga-affiliated) won silver medals. Bell had rowed in the 1995 Tampere W8+.
      - heading "Late 1990s — A National Pipeline Forms (1997–1999)" [level=2] [ref=e143]
      - heading "1997 — Stephen Thomas at the World Championships; Raoul passes" [level=3] [ref=e144]
      - paragraph [ref=e145]:
        - text: "On"
        - strong [ref=e146]: August 31, 1997
        - text: ", the"
        - emphasis [ref=e147]: Chattanooga Free Press
        - text: ran a feature on
        - strong [ref=e148]: Stephen Thomas (UTC class of 1995)
        - text: ", a four-year letter winner with the Mocs crew team who had been painting"
        - strong [ref=e149]: Hartmut Buschbacher's
        - text: Chattanooga house when the U.S. women's coach challenged him to try out for the national team. Thomas trained for U.S. Nationals that June at Oak Ridge, made the
        - strong [ref=e150]: U.S. men's lightweight quadruple sculls
        - text: ", and raced at the 1997 World Rowing Championships in Aiguebelette, France. The U.S. crew did not medal, but Thomas became the"
        - strong [ref=e151]: first UTC alumnus documented to race at a senior World Championship
        - text: — five years before Dan Beery's first international medal.
      - paragraph [ref=e152]:
        - text: That same year, on
        - strong [ref=e153]: Saturday, November 1, 1997
        - text: ", the program lost its founder."
        - strong [ref=e154]: William Gaston Raoul
        - text: died at age 86 after a battle with Parkinson's disease. Born May 2, 1911, on Lookout Mountain, Dartmouth Class of 1933 (valedictorian, magna cum laude), retired Lieutenant Colonel awarded the Croix de Guerre, Silver Star, and Purple Heart with the 12th Armored Division in WWII — Raoul was, in the LRC newsletter's phrasing, "the patriarch of rowing in Chattanooga."
      - paragraph [ref=e155]: In 1997, Dan Beery transferred to UTC from Bryan College, intending to walk on for basketball. Espeseth had a different idea.
      - heading "1998–1999 — Dan Beery on the varsity eight; Bonnie Blair speaks" [level=3] [ref=e156]
      - paragraph [ref=e157]:
        - text: By the
        - strong [ref=e158]: 1998 Raoul Cup
        - text: ","
        - strong [ref=e159]: Dan Beery
        - text: was rowing
        - strong [ref=e160]: "#7 in the UTC Men's Varsity 8+"
        - text: as a sophomore — six years before his Olympic gold. UTC Rowing's annual banquet on
        - strong [ref=e161]: April 10, 1999
        - text: featured five-time Olympic gold-medal speed-skater
        - strong [ref=e162]: Bonnie Blair
        - text: as guest speaker — UTC's reach in attracting Olympic-caliber speakers reflecting Espeseth's network.
      - paragraph [ref=e163]:
        - text: LRC ran the
        - strong [ref=e164]: 9th annual TIRC
        - text: on January 31, 1998, the
        - strong [ref=e165]: 10th
        - text: on January 30, 1999, and the
        - strong [ref=e166]: 7th Chattanooga Head Race
        - text: on October 9, 1999.
      - heading "The 2000s — Steady State and a Title IX Conversation (2000–2009)" [level=2] [ref=e167]
      - heading "2000 — Storm cancellation; Beery's senior year" [level=3] [ref=e168]
      - paragraph [ref=e169]:
        - text: The
        - strong [ref=e170]: 11th annual TIRC
        - text: ", scheduled for January 29, 2000, was cancelled by a winter storm — the only known TIRC cancellation."
        - strong [ref=e171]: Dan Beery
        - text: raced TIRC 2000 Open Men Heat 1 at age 25, posting 10:50.4, four months before his graduation in Exercise Science. He was about to begin training that would lead, in three years, to a World Championship gold and, in four years, to Olympic gold.
      - heading "2002–2003 — Beery's first international medals" [level=3] [ref=e172]
      - paragraph [ref=e173]:
        - text: Beery won
        - strong [ref=e174]: silver in the coxed pair at the 2002 World Championships in Seville
        - text: ", then"
        - strong [ref=e175]: gold in the coxed pair at the 2003 World Championships in Milan
        - text: — UTC's first international rowing gold.
      - heading "2004 — Beery's Olympic gold" [level=3] [ref=e176]
      - paragraph [ref=e177]:
        - text: At the
        - strong [ref=e178]: 2004 Athens Olympic Games
        - text: ","
        - strong [ref=e179]: Dan Beery
        - text: stroked the
        - strong [ref=e180]: U.S. Men's Eight to gold
        - text: "— the first U.S. men's eight Olympic title in 40 years. The American crew set a world record of 5:19.85 in the heat. Espeseth, on Beery's recruitment:"
        - emphasis [ref=e181]: "\"I almost passed him by, thinking that he must already be in some sort of sport since he was playing basketball, but I went and asked him if he wanted to try rowing anyway.\""
      - paragraph [ref=e182]: "Beery's career international medal tally: 8 medals across Olympics, World Championships, World Cup, and Pan American Games — including additional Worlds golds in 2005 (eight), 2007 (coxed four), and a 2007 Pan American gold in the eight. He retired from rowing in 2008."
      - heading "2005–2006 — Title IX and the varsity-rowing question" [level=3] [ref=e183]
      - paragraph [ref=e184]:
        - text: In
        - strong [ref=e185]: 2005–2006
        - text: ", the UTC Athletic Department actively considered elevating women's rowing to"
        - strong [ref=e186]: NCAA Division I varsity status
        - text: . The Title IX dossier in the archive includes a UTC internal memo, "Proposed Cost Considerations for UTC Women's Varsity Rowing Program"; an NCAA Division I Women's Rowing schools list dated
        - strong [ref=e187]: July 7, 2005
        - text: ; and a
        - strong [ref=e188]: September 22, 2005 mass email from UTC's Chuck Cantrell
        - text: "(\"Attention: All UTC Female Students\") — signed by"
        - strong [ref=e189]: Laura Mincy, Associate AD / Senior Woman Administrator
        - text: — forwarding a UTC Athletic Department letter on Title IX compliance and an athletic-fee-funded selection of a new women's sport.
      - paragraph [ref=e190]: Rowing was not the sport ultimately selected. The 2005–06 deliberation is the most concrete moment UTC ever came to NCAA varsity rowing, and the reason it remained a club program through the rest of the Espeseth era.
      - paragraph [ref=e191]: UTC won TIRC 2005 with 713 points, ahead of the University of Georgia (447) and UT-Knoxville (263).
      - heading "2005-on — Head of the Hooch arrives in Chattanooga" [level=3] [ref=e192]
      - paragraph [ref=e193]:
        - text: The
        - strong [ref=e194]: Head of the Hooch
        - text: regatta, founded in 1982 in Roswell, GA, and run on Lake Lanier 1997–2004, relocated to Chattanooga in
        - strong [ref=e195]: "2005"
        - text: ". UTC supplied the venue: river access via the LRC/UTC barges and boathouse, gym facilities for indoor satellite events, and (documented from 2018 forward) UTC gym overnight housing for visiting teams. By 2012 the Hooch set a single-day record of 1,245 boats; by 2015 it had grown to 2,100+ entries; today it advertises 2,200+ entries and 6,200+ athletes."
      - heading "2009 — Beery in the program archive" [level=3] [ref=e196]
      - paragraph [ref=e197]:
        - text: A
        - strong [ref=e198]: December 4, 2009 email
        - text: "from Espeseth to UTC accounting documents UTC Rowing inventory: the current trailer, purchased July/August 1996; a Pocock training single and double estimated at ~25 years old (~1984 vintage, predating Espeseth and likely Carney-era equipment)."
      - heading "Beery in the UTC Hall of Fame; Late Espeseth (2010–2017)" [level=2] [ref=e199]
      - heading "2010–2011 — Beery formally honored" [level=3] [ref=e200]
      - paragraph [ref=e201]:
        - text: "On"
        - strong [ref=e202]: December 17, 2010
        - text: ", UTC Alumni Affairs notified"
        - strong [ref=e203]: Dan Beery
        - text: that he had been selected as the
        - strong [ref=e204]: 2010 Joe Morrison Award
        - text: recipient and would be inducted into the
        - strong [ref=e205]: UTC Athletic Hall of Fame
        - text: "on"
        - strong [ref=e206]: February 11–12, 2011
        - text: . UTC Athletics' Hall of Fame is varsity-only and has no rowing category, so Beery's induction is exceptional — he remains the only UTC rower in the institution's Athletic Hall of Fame, and the only UTC rower inducted into the
        - strong [ref=e207]: National Rowing Foundation Hall of Fame
        - text: as well (March 20, 2010, Mystic Seaport, CT). At UTC's NRF induction announcement,
        - strong [ref=e208]: Dr. Leroy Fanning
        - text: was credited as the UTC faculty member who identified Beery's nutritional needs early in his rowing career.
      - heading "2010–2013 — A documented racing footprint" [level=3] [ref=e209]
      - paragraph [ref=e210]:
        - text: The late Espeseth era is unusually well-documented in the UTC ARC. UTC's 2010–2013 racing circuit included
        - strong [ref=e211]: SIRA
        - text: (Oak Ridge), the
        - strong [ref=e212]: Chattanooga Head Race
        - text: ","
        - strong [ref=e213]: Hobbs Island Regatta
        - text: (Huntsville),
        - strong [ref=e214]: Head of the Hooch
        - text: ","
        - strong [ref=e215]: Secret City Head Race
        - text: (Oak Ridge),
        - strong [ref=e216]: Tampa Mayor's Cup
        - text: ", and the"
        - strong [ref=e217]: John Hunter Regatta
        - text: (Gainesville, GA). At the
        - strong [ref=e218]: 2011 Chattanooga Head Race
        - text: ", UTC Rowing A finished 3rd in Men's College 4+ stroked by"
        - strong [ref=e219]: A. Marshall
        - text: (Axel Marshall, the most-documented athlete of the 2010–2013 cohort).
      - paragraph [ref=e220]: "UTC won TIRC every documented year. The 2015 standings: UTC 403.5, Murray State 386.5, UT-Knoxville 255.5, Berry 181.5, NSU 157."
      - heading "2017 — Espeseth retires after 28 years" [level=3] [ref=e221]
      - paragraph [ref=e222]:
        - text: After 28 seasons as UTC's head coach — the longest tenure in the program's history —
        - strong [ref=e223]: Robert Espeseth
        - text: retired in 2017. He remained part of the Chattanooga rowing community and continued to assist UTC Rowing informally with merchandise and fundraising operations into the 2020s.
      - heading "The Worth Era (2018–~2024)" [level=2] [ref=e224]
      - paragraph [ref=e225]:
        - strong [ref=e226]: Ryan Worth
        - text: "became UTC's head coach for the 2018 season. Worth was a Chattanooga rowing product himself — first documented at the 2005 TIRC Never-Ever Men event under Chattanooga Junior Rowing affiliation at age 17 — and a past Concept2 World Record holder in the 20–29 age category for cumulative meters in 24 hours. He also held Guinness World Records as part of the first catamaran to row an ocean and the first crew of 16 to row an ocean. Before UTC he spent two years as an assistant coach at Stetson University (2015–17). His row2k team-page introduction set the outlook plainly: the program was working to \"establish the basis for the next 30 years.\""
      - paragraph [ref=e227]:
        - text: Worth formally registered the club's
        - strong [ref=e228]: Constitution of UTC Rowing
        - text: "on"
        - strong [ref=e229]: August 27, 2018
        - text: "and built a three-tier program: drop-in Group Fitness Classes (Maclellan Rowing Room, ARC membership only); Club Members ($100/semester, water practices Sun/Wed/Fri evenings); and a Travel Squad ($200/semester) racing in Knoxville, Nashville, Gainesville, Tampa, Orlando, Charleston, and Boston."
      - paragraph [ref=e230]:
        - text: In
        - strong [ref=e231]: June 2019
        - text: ","
        - strong [ref=e232]: Sarah McDarmont
        - text: ", then a sophomore, finished"
        - strong [ref=e233]: 7th in the women's single at the ACRA National Championship Regatta
        - text: on Lake Lanier — UTC's first entry in a varsity women's event at ACRA Nationals. McDarmont had finished 3rd at TIRC 2019 four months earlier.
      - paragraph [ref=e234]:
        - text: The 2020 spring season was lost to COVID. UTC Rowing's BOD ran detailed minutes through the pandemic months — in August 2020, the team voted unanimously to spend $5,500 of $9,016 cash on hand on six oarboards (land-based rowing simulators) so athletes could train individually. A new dock was installed in October 2020. Officers in that period included
        - strong [ref=e235]: Virginia Willis
        - text: (President),
        - strong [ref=e236]: Emily Murr
        - text: (VP),
        - strong [ref=e237]: Omar Morales
        - text: (Treasurer), with
        - strong [ref=e238]: Brian O'Leary
        - text: as faculty advisor; women's captain
        - strong [ref=e239]: Chynna Knight
        - text: and men's captain
        - strong [ref=e240]: Brandon Humphrys
        - text: led the boats.
        - strong [ref=e241]: Chynna Knight
        - text: was credited in 2023 UTC News coverage with winning 1st place at the Sarasota Coastal Regatta in Florida and serving as team captain and club president.
      - paragraph [ref=e242]:
        - text: UTC raced
        - strong [ref=e243]: SIRA at Oak Ridge on April 15–16, 2022
        - text: . The 2022 club-sports banquet recognized
        - strong [ref=e244]: Karoline Bonastia
        - text: (MVP) and
        - strong [ref=e245]: Steven Stanford
        - text: (HOT). Bonastia became UTC Rowing club president for the 2023 academic year, leading a 9-rower roster that included Steven Stanford (VP), Ethan Hitchcock (Treasurer), Rileigh Arrington (Safety Officer), and athletes with significant junior-rowing experience like
        - strong [ref=e246]: Henri Collins
        - text: (4.5 years) and
        - strong [ref=e247]: Rya Potts
        - text: (5 years).
      - paragraph [ref=e248]: Outside that core operational record, event-by-event UTC results from 2018–2024 are gated behind RegattaCentral's bot protections and have not been fully recovered for this timeline. We know UTC competed at ACRA, Dad Vail, Hooch, SIRA, and the regional regattas through this entire window. The exact placings remain on the open-question list.
      - paragraph [ref=e249]:
        - text: The program's barges and dock were lost in
        - strong [ref=e250]: "2022"
        - text: . After Worth's departure (sometime between 2022 and 2024 — exact date not yet pinned to documentation), and through the COVID and post-COVID disruptions, UTC Rowing went effectively dark.
      - heading "The Resurrection (2025–2026)" [level=2] [ref=e251]
      - paragraph [ref=e252]:
        - text: UTC Rowing was restarted in
        - strong [ref=e253]: Fall 2025
        - text: with four athletes, including
        - strong [ref=e254]: Abraham Mako
        - text: (junior, political science, who also founded a rowing team at Chattanooga State) and
        - strong [ref=e255]: Michael Kinsey
        - text: (senior, mechatronics, also a Chattanooga Rowing coach).
      - paragraph [ref=e256]:
        - text: "On"
        - strong [ref=e257]: November 16, 2025
        - text: ", UTC Rowing crewed the inaugural"
        - strong [ref=e258]: "\"Athletes vs. Engineers\" 500-meter race"
        - text: on the Tennessee River — a rowing shell beating a 1,200-pound student-built concrete canoe in choppy water after a multi-hour weather delay. The race was the program's first public outing in the resurrected era, and a Chattanooga reminder that UTC Rowing was back on the water.
      - paragraph [ref=e259]:
        - text: The 2025–26 squad is racing toward an
        - strong [ref=e260]: ACRA M4x
        - text: entry — Coach Kinsey running the squad, fundraising underway for a 20×80 pole barn to give the program a permanent home of its own.
      - separator [ref=e261]
      - heading "How you can help shape what's next" [level=2] [ref=e262]
      - paragraph [ref=e263]: This timeline was assembled in 2026 from Lookout Rowing Club newsletters, news clippings, regatta programs, insurance claims, board minutes, and primary-source interviews — a documentary record that's strong in some places and thin in others. What it can't do is replace the memories of the people who lived it.
      - paragraph [ref=e264]:
        - text: If you rowed at UTC, coached at UTC, hosted a regatta in Chattanooga, donated a boat, raced in a borrowed shell after the 1996 fire, lined up at TIRC, or knew Bill Raoul, Jack Fish, Terry Carney, or Robert Espeseth —
        - strong [ref=e265]: we want your story
        - text: .
      - paragraph [ref=e266]: We're collecting alumni stories, photos, and corrections. Names we missed, races we got wrong, years that need fixing, faces we can't put names to. The submission form (forthcoming) will let you contribute directly to the public record, and your submission helps complete the program's history for everyone who comes after.
      - paragraph [ref=e267]:
        - text: Forty rowers walked into the boathouse for the first time in 1974.
        - strong [ref=e268]: You
        - text: are why there will be a fifty-second class.
    - generic [ref=e271]:
      - paragraph [ref=e272]: What’s missing
      - heading "Most of UTC Rowing’s history lived in alumni memories, not institutional archives." [level=2] [ref=e273]:
        - text: Most of UTC Rowing’s history lived in alumni memories,
        - text: not institutional archives.
      - paragraph [ref=e274]: If you rowed at UTC — or know someone who did — your story makes the picture more complete. Even a one-line memory closes a gap.
      - generic [ref=e275]:
        - link "Submit a memory or correction" [ref=e276] [cursor=pointer]:
          - /url: /submit
        - link "Browse the alumni roster" [ref=e277] [cursor=pointer]:
          - /url: /alumni
  - contentinfo [ref=e278]:
    - generic [ref=e280]:
      - generic [ref=e281]:
        - generic [ref=e282]:
          - generic [ref=e283]: U
          - paragraph [ref=e284]: UTC Rowing
        - paragraph [ref=e285]: University of Tennessee at Chattanooga. Club sport since 1983. Olympic gold to ACRA, on the Tennessee River.
        - paragraph [ref=e286]:
          - link "Support the program →" [ref=e287] [cursor=pointer]:
            - /url: /donate
      - generic [ref=e288]:
        - paragraph [ref=e289]: Help us rebuild the record
        - paragraph [ref=e290]: We’re collecting alumni stories, photos, and corrections. Every contribution makes the picture more complete.
        - link "Submit your story →" [ref=e291] [cursor=pointer]:
          - /url: /submit
      - generic [ref=e292]:
        - paragraph [ref=e293]: Connect
        - list [ref=e294]:
          - listitem [ref=e295]:
            - link "Contact" [ref=e296] [cursor=pointer]:
              - /url: /contact
          - listitem [ref=e297]:
            - link "Program site" [ref=e298] [cursor=pointer]:
              - /url: https://utcrowing.org
          - listitem [ref=e299]:
            - link "gomocs.com/giving" [ref=e300] [cursor=pointer]:
              - /url: https://gomocs.com/giving
    - generic [ref=e302]:
      - paragraph [ref=e303]: © 2026 UTC Rowing alumni community.
      - img [ref=e305]
  - alert [ref=e308]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Static pages", () => {
  4  |   test("/history renders timeline content", async ({ page }) => {
  5  |     await page.goto("/history");
  6  | 
  7  |     await expect(
  8  |       page.getByRole("heading", { name: /UTC Rowing/i, level: 1 })
> 9  |     ).toBeVisible();
     |       ^ Error: expect(locator).toBeVisible() failed
  10 |     await expect(page.getByText(/a history/i).first()).toBeVisible();
  11 | 
  12 |     // Timeline should mention key historical anchors
  13 |     await expect(page.getByText(/Espeseth/i).first()).toBeVisible();
  14 |     await expect(page.getByText(/Beery/i).first()).toBeVisible();
  15 |     await expect(page.getByText(/1983/i).first()).toBeVisible();
  16 |   });
  17 | 
  18 |   test("/donate shows tiers + needs", async ({ page }) => {
  19 |     await page.goto("/donate");
  20 | 
  21 |     await expect(
  22 |       page.getByRole("heading", { name: /help bring UTC Rowing/i, level: 1 })
  23 |     ).toBeVisible();
  24 | 
  25 |     // Three tiers
  26 |     await expect(page.getByText(/single donation/i).first()).toBeVisible();
  27 |     await expect(page.getByText(/monthly sustaining donor/i).first()).toBeVisible();
  28 |     await expect(page.getByText(/named giving/i).first()).toBeVisible();
  29 | 
  30 |     // Needs section
  31 |     await expect(page.getByText(/pole barn/i).first()).toBeVisible();
  32 |     await expect(page.getByText(/replacement barges/i).first()).toBeVisible();
  33 |   });
  34 | 
  35 |   test("/contact has email + affiliations", async ({ page }) => {
  36 |     await page.goto("/contact");
  37 | 
  38 |     await expect(page.getByRole("heading", { name: /^contact$/i })).toBeVisible();
  39 |     await expect(
  40 |       page.getByRole("link", { name: /kinseymi@radl\.solutions/i })
  41 |     ).toBeVisible();
  42 |     await expect(page.getByText(/ACRA/i).first()).toBeVisible();
  43 |     await expect(page.getByText(/SIRA/i).first()).toBeVisible();
  44 |   });
  45 | 
  46 |   test("404 returns not-found page", async ({ page }) => {
  47 |     const response = await page.goto("/this-route-does-not-exist");
  48 |     expect(response?.status()).toBe(404);
  49 |   });
  50 | });
  51 | 
```