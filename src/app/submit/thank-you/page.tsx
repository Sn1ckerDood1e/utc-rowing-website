import Link from "next/link";

export const metadata = {
  title: "Thanks — UTC Rowing",
};

export default function ThankYouPage() {
  return (
    <>
      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-utc-gold uppercase text-sm tracking-widest mb-2">
            Got it
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Thank you.</h1>
          <p className="text-white/85 max-w-xl mx-auto">
            Your submission is in. A coach or volunteer will review it
            shortly. If you provided an email, you should receive a
            confirmation in a few minutes.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center">
          <h2 className="text-xl font-bold text-utc-navy mb-3">
            What&rsquo;s next
          </h2>
          <p className="text-foreground/80 mb-6">
            The more submissions we get, the more complete the record gets.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/submit"
              className="bg-utc-navy text-white font-semibold px-5 py-2.5 rounded hover:bg-utc-navy-deep"
            >
              Submit another
            </Link>
            <Link
              href="/alumni"
              className="bg-white border border-utc-navy text-utc-navy font-semibold px-5 py-2.5 rounded hover:bg-utc-navy hover:text-white transition-colors"
            >
              Browse alumni
            </Link>
            <Link
              href="/history"
              className="bg-white border border-utc-navy text-utc-navy font-semibold px-5 py-2.5 rounded hover:bg-utc-navy hover:text-white transition-colors"
            >
              Read the history
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
