import Image from "next/image";
import Link from "next/link";
import { InteractiveTimeline } from "@/components/interactive-timeline";
import { TIMELINE_TOTAL_MOMENTS, ERAS } from "@/lib/timeline-data";

export const metadata = {
  title: "History — UTC Rowing",
  description:
    "Fifty-five years of rowing at UTC. The interactive timeline from the 1971 Pocock donation through the 2026 ACRA crew.",
};

export default function HistoryPage() {
  return (
    <>
      {/* Cover */}
      <section className="relative overflow-hidden border-b-4 border-utc-gold bg-utc-navy text-white">
        <div className="relative w-full min-h-[70vh] sm:min-h-[80vh]">
          <Image
            src="/photos/utc-crew-1996-salvage.jpg"
            alt="UTC Rowing athletes carrying damaged shells through a field in 1996, after a trailer arson destroyed much of the program's fleet"
            fill
            preload
            sizes="100vw"
            className="object-cover object-[center_30%]"
          />
          {/* Navy gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-utc-navy/95 via-utc-navy/40 to-transparent" />
          <div className="relative mx-auto flex min-h-[70vh] sm:min-h-[80vh] max-w-4xl flex-col justify-end px-4 pb-16 pt-24 text-center">
            <p className="text-utc-gold uppercase text-xs tracking-[0.3em] font-semibold mb-6">
              The interactive timeline
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight">
              UTC Rowing
              <br />
              <span className="italic text-gradient-gold">a history</span>
            </h1>
            <p className="font-display text-lg italic text-white/80 mt-6 max-w-2xl mx-auto">
              From the 1971 Pocock donation through the 2026 ACRA crew —{" "}
              {TIMELINE_TOTAL_MOMENTS} moments across {ERAS.length} eras of UTC Rowing.
              Compiled from primary sources in the program archive, public records,
              and alumni recollections.
            </p>
            <p className="text-xs text-white/60 mt-6 uppercase tracking-widest">
              Tap any moment to read more · Last revised May 2026
            </p>
          </div>
        </div>
      </section>

      {/* Interactive timeline */}
      <section className="bg-paper-grain">
        <InteractiveTimeline />
      </section>

      {/* Footer CTA */}
      <section className="relative bg-utc-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(200,182,130,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
          <p className="text-utc-gold uppercase text-xs tracking-[0.25em] font-semibold mb-4">
            What&rsquo;s missing
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5 leading-tight">
            Most of UTC Rowing&rsquo;s history lived in alumni memories,
            <br className="hidden sm:block" />
            <span className="italic text-utc-gold-bright">not institutional archives.</span>
          </h2>
          <p className="text-lg text-white/75 max-w-2xl mx-auto mb-10">
            If you rowed at UTC — or know someone who did — your story makes the picture more
            complete. Even a one-line memory closes a gap.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/submit"
              className="bg-utc-gold text-utc-navy-deep font-semibold px-7 py-3.5 rounded-md hover:bg-utc-gold-bright transition-all hover:shadow-xl"
            >
              Submit a memory or correction
            </Link>
            <Link
              href="/alumni"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3.5 rounded-md hover:bg-white/20 transition-all"
            >
              Browse the alumni roster
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
