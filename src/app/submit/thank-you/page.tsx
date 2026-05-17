import Link from "next/link";
import { ChevronRight, UTCMark } from "@/components/svg-rowing";
import { MailingListSignup } from "@/components/mailing-list-signup";

export const metadata = {
  title: "Thanks — UTC Rowing",
};

export default function ThankYouPage() {
  return (
    <>
      <section className="relative bg-river-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(200,182,130,0.18),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center">
          <UTCMark className="text-3xl mb-6 animate-fade-in text-utc-gold-bright" />
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-4">
            Got it
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold mb-5">Thank you.</h1>
          <p className="text-lg text-white/85 max-w-xl mx-auto">
            Your submission is in. Coach Kinsey or a volunteer will review it shortly. If you
            provided an email, you should receive a confirmation in a few minutes.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-utc-gold-deep uppercase text-xs tracking-[0.25em] font-bold mb-3">
            ACRA Nationals · May 17
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-utc-navy mb-4 leading-tight">
            One more thing.
          </h2>
          <p className="text-foreground/80 mb-8 max-w-xl mx-auto">
            UTC&rsquo;s first ACRA crew since the program restarted races this Saturday at Oak
            Ridge. You just helped the record. Help the boat get to the line.
          </p>
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <Link
              href="/donate"
              className="bg-utc-gold text-utc-navy-deep font-semibold px-7 py-3.5 rounded-md hover:bg-utc-gold-bright transition-all hover:shadow-xl inline-flex items-center gap-2"
            >
              Back the rebuild
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/alumni"
              className="bg-white border border-utc-navy text-utc-navy font-semibold px-6 py-3 rounded-md hover:bg-utc-navy hover:text-white transition-colors"
            >
              Browse alumni
            </Link>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Got another name?{" "}
            <Link
              href="/submit"
              className="text-utc-navy font-semibold underline decoration-utc-gold underline-offset-4 hover:text-utc-gold-deep"
            >
              Submit another →
            </Link>
          </p>

          <div className="mt-12 max-w-xl mx-auto text-left">
            <MailingListSignup
              variant="card"
              source="submit-thank-you"
              heading="Stay in the loop."
              subhead="Race recaps and journal posts from Coach Kinsey when there&rsquo;s something to write."
            />
          </div>
        </div>
      </section>
    </>
  );
}
