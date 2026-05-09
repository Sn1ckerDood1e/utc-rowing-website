import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { readMarkdown } from "@/lib/content";

export const metadata = {
  title: "History — UTC Rowing",
  description:
    "Fifty years of rowing in Chattanooga. The UTC Rowing program from 1974 founding through the 2025 resurrection.",
};

export default function HistoryPage() {
  const source = readMarkdown("timeline.md");

  return (
    <>
      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <p className="text-utc-gold uppercase text-sm tracking-widest mb-2">
            Our story
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            UTC Rowing — A History
          </h1>
          <p className="mt-3 text-white/80 max-w-2xl">
            From the founding of the Lookout Rowing Club in 1974 through the
            resurrection of UTC Rowing in 2025. Compiled from primary sources
            in the program archive, public records, and alumni recollections.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <article className="mx-auto max-w-4xl px-4 py-12 prose-utc">
          <MDXRemote source={source} />
        </article>
      </section>

      <section className="bg-utc-gold-bright/30 border-t border-utc-gold/40">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-utc-navy mb-3">
            Help us fill the gaps
          </h2>
          <p className="text-utc-navy/85 mb-5 max-w-2xl mx-auto">
            Most of UTC Rowing&rsquo;s history lived in alumni memories, not
            institutional archives. If you rowed at UTC — or know someone
            who did — your story makes the picture more complete.
          </p>
          <Link
            href="/submit"
            className="inline-block bg-utc-navy text-white font-semibold px-6 py-3 rounded hover:bg-utc-navy-deep transition-colors"
          >
            Submit a memory or correction →
          </Link>
        </div>
      </section>
    </>
  );
}
