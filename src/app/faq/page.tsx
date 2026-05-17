import Link from "next/link";

export const metadata = {
  title: "FAQ — UTC Rowing",
  description:
    "Common questions about UTC Rowing — club status, joining, practice schedule, spectating, donations, alumni contributions.",
};

type QA = {
  question: string;
  answer: React.ReactNode;
};

const FAQS: QA[] = [
  {
    question: "Is UTC Rowing varsity?",
    answer: (
      <>
        No. UTC Rowing is a <strong>club sport</strong> &mdash; recognized by
        UTC Club Sports and a member of USRowing, ACRA, and SIRA. The program
        has been club-status for its entire 55-year history.
      </>
    ),
  },
  {
    question: "I&rsquo;ve never rowed. Can I join?",
    answer: (
      <>
        Yes. Most of the current crew started in spring 2026. Three of the four
        athletes who raced ACRA this year sat in a boat for the first time on
        April 6, six weeks before nationals. No experience is required.{" "}
        <Link href="/join" className="link-draw text-utc-navy font-semibold">
          See /join for how to start &rarr;
        </Link>
      </>
    ),
  },
  {
    question: "What does it cost?",
    answer: (
      <>
        A small annual club fee (covers USRowing membership, equipment shared
        with Lookout Rowing Club, and event entries). Travel to away regattas
        is on the athletes &mdash; UTC Club Sports covers insurance for
        practice and travel; the rest is fundraising.
      </>
    ),
  },
  {
    question: "When do you practice?",
    answer: (
      <>
        In season (fall and spring), 4&ndash;5 mornings a week on the
        Tennessee River, typically before class. Off-season is erg work and
        land training. Times shift with daylight; new rowers get a personalized
        schedule on day one.
      </>
    ),
  },
  {
    question: "Where do you row?",
    answer: (
      <>
        Out of the <strong>William G. Raoul Rowing Center</strong> at 1001
        Riverside Drive, Chattanooga &mdash; the home of Chattanooga Rowing
        and Lookout Rowing Club. We share equipment and water with Lookout
        Rowing Club while we rebuild UTC&rsquo;s own fleet.
      </>
    ),
  },
  {
    question: "Can I come watch?",
    answer: (
      <>
        Absolutely. The Head of the Hooch (Chattanooga, every November) is the
        easiest race to spectate &mdash; UTC enters boats every year and the
        course runs through downtown. For practice, the boathouse is at the
        end of Riverside Drive and visible from the public Tennessee
        Riverwalk. Email Coach Kinsey if you want a behind-the-scenes
        boathouse visit.
      </>
    ),
  },
  {
    question: "Where do donations go?",
    answer: (
      <>
        Tax-deductible through the UTC Foundation (campaign 42934). The current
        priorities are{" "}
        <Link href="/donate" className="link-draw text-utc-navy font-semibold">
          on the donate page
        </Link>
        : covered racks at the boathouse, a fleet replacement, an on-campus
        training room at Maclellan Gymnasium, and ongoing race travel. Named
        gifts (boats, racks, seats) are welcomed &mdash; email Coach for those.
      </>
    ),
  },
  {
    question: "I rowed at UTC. How do I get involved?",
    answer: (
      <>
        Easiest paths, lowest friction to highest:
        <ol className="mt-3 list-decimal list-inside space-y-1.5">
          <li>
            Add yourself to the roster at{" "}
            <Link href="/submit" className="link-draw text-utc-navy font-semibold">
              /submit
            </Link>
            . Even just a name + year helps.
          </li>
          <li>Send photos, race results, or memories &mdash; same form.</li>
          <li>
            Sign up for the mailing list (footer) for race recaps and program
            updates.
          </li>
          <li>
            Donate, named-give, or come row at the alumni boat at the Hooch
            in November.
          </li>
        </ol>
      </>
    ),
  },
  {
    question: "What about women&rsquo;s rowing?",
    answer: (
      <>
        Historically a huge part of the program &mdash; the 1988 Dad Vail bronze
        was UTC&rsquo;s first national medal (women&rsquo;s varsity 4+), and
        the 1995&ndash;96 Augusta Invitational sweep was driven by the
        women&rsquo;s crews. The current restart is men only by accident, not
        design. Women rowers are wanted; email Coach Kinsey or sign up at{" "}
        <Link href="/join" className="link-draw text-utc-navy font-semibold">
          /join
        </Link>
        .
      </>
    ),
  },
  {
    question: "How does a photo get on the site?",
    answer: (
      <>
        Submit it via{" "}
        <Link href="/submit" className="link-draw text-utc-navy font-semibold">
          /submit
        </Link>
        . If you can name people, regatta, and year, even better. Some land on
        alumni cards directly; others go to{" "}
        <Link href="/identify" className="link-draw text-utc-navy font-semibold">
          /identify
        </Link>{" "}
        where alumni help fill in names. Credit defaults to the submitter
        (attributed); say so if you&rsquo;d prefer anonymous.
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-3">
            Common questions
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-[1.05]">
            FAQ.
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            The questions that come up most often. If yours isn&rsquo;t here,{" "}
            <Link href="/contact" className="text-utc-gold-bright link-draw">
              email the coach
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Q&A list */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <dl className="space-y-10">
            {FAQS.map((item) => (
              <div key={item.question}>
                <dt className="font-display text-xl sm:text-2xl font-bold text-utc-navy leading-snug mb-3">
                  {item.question}
                </dt>
                <dd className="text-foreground/85 leading-relaxed text-[0.97rem]">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-paper-grain border-t border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <p className="text-utc-navy/60 uppercase text-xs tracking-[0.2em] font-semibold mb-3">
            Still missing your answer?
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-utc-navy mb-4">
            Ask the coach.
          </h2>
          <p className="text-foreground/80 mb-6">
            One inbox. One coach. He reads every email.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-utc-navy font-semibold link-draw"
          >
            Email Coach Kinsey &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
