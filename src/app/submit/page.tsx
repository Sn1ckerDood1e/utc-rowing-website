import { SubmitForm } from "@/components/submit-form";
import { UTCMark } from "@/components/svg-rowing";

export const metadata = {
  title: "Submit — UTC Rowing",
  description:
    "Add yourself to the UTC Rowing alumni roster, share a memory, or correct an entry.",
};

export default function SubmitPage() {
  return (
    <>
      <section className="relative bg-utc-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(200,182,130,0.12),transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-16">
          <UTCMark className="w-12 h-12 mb-4" />
          <p className="text-utc-gold uppercase text-sm tracking-[0.25em] font-semibold mb-3">
            Add to the record
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-[1.05] mb-5">
            Tell us you rowed at UTC.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            The shortest path: just your name and the years you rowed. Want to share a memory,
            correct an entry, or send us a photo? Expand the form below.
          </p>
          <p className="text-base text-white/60 max-w-2xl mt-3">
            We read every submission. Your contribution makes the picture more complete.
          </p>
        </div>
      </section>

      <section className="bg-paper-grain">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="bg-white border border-border rounded-2xl shadow-sm p-6 sm:p-10">
            <SubmitForm />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            We&rsquo;ll never publish your email. Stories can be shared anonymously by request.
          </p>
        </div>
      </section>
    </>
  );
}
