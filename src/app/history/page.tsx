import Link from "next/link";
import { InteractiveTimeline } from "@/components/interactive-timeline";
import { OarMark } from "@/components/svg-rowing";
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
      <section className="bg-utc-navy text-white relative overflow-hidden border-b-4 border-utc-gold">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(200,182,130,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="text-utc-gold w-12">
              <OarMark className="w-12" />
            </span>
            <p className="text-utc-gold uppercase text-xs tracking-[0.3em] font-semibold">
              The interactive timeline
            </p>
            <span className="text-utc-gold w-12 -scale-x-100">
              <OarMark className="w-12" />
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight">
            UTC Rowing
            <br />
            <span className="italic text-gradient-gold">a history</span>
          </h1>
          <p className="font-display text-lg italic text-white/70 mt-6 max-w-2xl mx-auto">
            From the 1971 Pocock donation through the 2026 ACRA crew —{" "}
            {TIMELINE_TOTAL_MOMENTS} moments across {ERAS.length} eras of UTC Rowing.
            Compiled from primary sources in the program archive, public records,
            and alumni recollections.
          </p>
          <p className="text-xs text-white/50 mt-6 uppercase tracking-widest">
            Tap any moment to read more · Last revised May 2026
          </p>
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
