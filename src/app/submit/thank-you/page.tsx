import Link from "next/link";
import { ChevronRight, UTCMark } from "@/components/svg-rowing";

export const metadata = {
  title: "Thanks — UTC Rowing",
};

export default function ThankYouPage() {
  return (
    <>
      <section className="relative bg-river-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(200,182,130,0.18),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center">
          <UTCMark className="w-16 h-16 mb-6 animate-fade-in" />
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-4">
            Got it
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold mb-5">Thank you.</h1>
          <p className="text-lg text-white/85 max-w-xl mx-auto">
            Your submission is in. A coach or volunteer will review it shortly. If you provided an
            email, you should receive a confirmation in a few minutes.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="font-display text-2xl font-bold text-utc-navy mb-3">
            What&rsquo;s next
          </h2>
          <p className="text-foreground/80 mb-8 max-w-xl mx-auto">
            The more submissions we get, the more complete the record gets. If a teammate comes to
            mind right now, would you nudge them?
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/submit"
              className="bg-utc-navy text-white font-semibold px-6 py-3 rounded-md hover:bg-utc-navy-deep transition-colors inline-flex items-center gap-1.5"
            >
              Submit another
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/alumni"
              className="bg-white border border-utc-navy text-utc-navy font-semibold px-6 py-3 rounded-md hover:bg-utc-navy hover:text-white transition-colors"
            >
              Browse alumni
            </Link>
            <Link
              href="/history"
              className="bg-white border border-utc-navy text-utc-navy font-semibold px-6 py-3 rounded-md hover:bg-utc-navy hover:text-white transition-colors"
            >
              Read the history
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
