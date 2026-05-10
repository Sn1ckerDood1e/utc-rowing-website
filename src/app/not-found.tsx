import Link from "next/link";

export const metadata = {
  title: "Not Found — UTC Rowing",
  description: "The page you were looking for is not on the UTC Rowing site.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-utc-navy text-white px-4">
      <div className="max-w-xl text-center">
        <p className="text-utc-gold uppercase text-xs tracking-[0.25em] font-semibold mb-4">
          404
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-5 text-white/75">
          It may have moved, or never existed at all. Try one of these instead.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="bg-utc-gold text-utc-navy-deep font-semibold px-7 py-3.5 rounded-md hover:bg-utc-gold-bright transition-all hover:shadow-xl hover:shadow-utc-gold/30"
          >
            Back to home
          </Link>
          <Link
            href="/alumni"
            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3.5 rounded-md hover:bg-white/20 hover:border-utc-gold/60 transition-all"
          >
            Browse alumni
          </Link>
        </div>
      </div>
    </div>
  );
}
