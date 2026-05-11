export const metadata = {
  title: "Privacy · UTC Rowing",
  description:
    "How UTC Rowing collects, stores, and protects information submitted by alumni and supporters.",
};

const LAST_UPDATED = "May 11, 2026";

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-3">
            Policy
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold">
            Privacy
          </h1>
          <p className="mt-4 text-white/70 text-sm">
            Last updated {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 prose-utc">
          <p>
            UTC Rowing is a small alumni-run rowing program at the University of
            Tennessee at Chattanooga. This page explains, in plain language,
            what information we collect on this site, why we collect it, and
            what we do with it.
          </p>

          <h2>What we collect</h2>
          <p>
            When you fill out a form on this site &mdash; the alumni{" "}
            <a href="/submit">submission form</a> or the{" "}
            <a href="/contact">contact page</a> &mdash; we collect the
            information you choose to give us. That typically includes:
          </p>
          <ul>
            <li>Your name (and any roster name you rowed under, if different)</li>
            <li>Your email address</li>
            <li>The years you rowed at UTC and any roles or events you note</li>
            <li>
              Stories, photos, or roster corrections you submit voluntarily
            </li>
          </ul>
          <p>
            We do not run analytics, ad trackers, or third-party scripts that
            profile visitors. We do not require an account to read the site.
          </p>

          <h2>Why we collect it</h2>
          <p>
            Everything we collect is used for one purpose: rebuilding and
            maintaining the historical record of UTC Rowing and reconnecting
            alumni with the program. Specifically:
          </p>
          <ul>
            <li>
              Adding alumni to the public roster on the{" "}
              <a href="/alumni">alumni page</a> with whatever level of detail
              they choose
            </li>
            <li>
              Reaching out about reunions, fundraisers, regattas, and program
              news
            </li>
            <li>Cross-checking and correcting historical records</li>
          </ul>

          <h2>How we store it</h2>
          <p>
            Submissions are stored in a Supabase database hosted on
            infrastructure operated by Supabase Inc. Access is restricted to the
            head coach and any volunteers actively maintaining the roster. We
            keep submissions for as long as the program continues to operate, so
            that the historical record stays intact.
          </p>
          <p>
            Information you mark as private &mdash; for example, your email
            address &mdash; will not be published on the public roster.
            Information you submit publicly (name, years, stories you want
            shared) may appear on the public roster.
          </p>

          <h2>What we never do</h2>
          <ul>
            <li>We do not sell your information.</li>
            <li>
              We do not share your information with sponsors, advertisers, or
              third-party marketers.
            </li>
            <li>
              We do not embed third-party tracking pixels or behavioral
              advertising tools on this site.
            </li>
          </ul>
          <p>
            If we ever need to share information with a partner organization
            (for example, USRowing for a regatta entry, or UTC for a club sports
            requirement), we will only share what is strictly necessary for that
            specific purpose.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us to update, correct, or delete any information
            connected to you at any time. If you submitted an entry and want it
            removed from the public roster &mdash; or removed from our database
            entirely &mdash; just email{" "}
            <a href="mailto:kinseymi@radl.solutions">kinseymi@radl.solutions</a>{" "}
            and we will take care of it.
          </p>

          <h2>Children</h2>
          <p>
            This site is intended for adults &mdash; alumni, supporters, and
            prospective collegiate rowers. We do not knowingly collect
            information from anyone under 13.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we make material changes to how we handle information, we will
            update this page and revise the &ldquo;last updated&rdquo; date at
            the top.
          </p>

          <h2>Contact</h2>
          <p>
            Questions, deletion requests, or concerns? Email Coach Michael
            Kinsey at{" "}
            <a href="mailto:kinseymi@radl.solutions">kinseymi@radl.solutions</a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
