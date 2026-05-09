import { SubmitForm } from "@/components/submit-form";

export const metadata = {
  title: "Submit — UTC Rowing",
  description:
    "Add yourself to the UTC Rowing alumni roster, share a memory, or correct an entry.",
};

export default function SubmitPage() {
  return (
    <>
      <section className="bg-utc-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <p className="text-utc-gold uppercase text-sm tracking-widest mb-2">
            Add to the record
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Tell us you rowed at UTC
          </h1>
          <p className="mt-3 text-white/80">
            The shortest path: just your name and the years you rowed. Want to
            share a memory, correct an entry, or send us a photo? Expand the
            form. We read every submission.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <SubmitForm />
        </div>
      </section>
    </>
  );
}
