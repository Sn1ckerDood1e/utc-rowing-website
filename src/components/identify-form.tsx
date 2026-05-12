"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  proposed_name: z.string().min(2, "Name required").max(120),
  proposed_role: z.string().max(40).optional().or(z.literal("")),
  proposed_position_in_photo: z
    .string()
    .max(200)
    .optional()
    .or(z.literal("")),
  proposed_year: z.string().max(10).optional().or(z.literal("")),
  proposed_event: z.string().max(120).optional().or(z.literal("")),
  submitter_name: z.string().min(2, "Your name").max(120),
  submitter_email: z.string().email("Valid email").max(200),
  confidence: z.enum(["eyewitness", "secondhand", "family", "guess"]).optional(),
  notes: z.string().max(2000).optional().or(z.literal("")),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export function IdentifyForm({ photoId }: { photoId: string }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(null);
    const res = await fetch("/api/identify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...data,
        photo_id: photoId,
        proposed_year: data.proposed_year || undefined,
      }),
    });
    if (!res.ok) {
      setServerError("Something went wrong. Please try again.");
      return;
    }
    reset();
    setDone(true);
  }

  if (done) {
    return (
      <div className="bg-utc-gold/15 border border-utc-gold/40 rounded p-3 text-sm">
        Thank you — we&rsquo;ll review and credit you.{" "}
        <button
          className="underline text-utc-navy font-medium"
          onClick={() => setDone(false)}
        >
          Identify another person in this photo →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Who do you recognize?" error={errors.proposed_name?.message} required>
          <input
            type="text"
            {...register("proposed_name")}
            className="w-full px-2.5 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold"
            placeholder="Name or partial name"
          />
        </Field>
        <Field label="Position / seat (optional)">
          <input
            type="text"
            {...register("proposed_role")}
            className="w-full px-2.5 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold"
            placeholder="bow, 2, 3, 4, stroke, cox, coach…"
          />
        </Field>
      </div>

      <Field label="Where in the photo (optional)">
        <input
          type="text"
          {...register("proposed_position_in_photo")}
          className="w-full px-2.5 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold"
          placeholder='"front-left", "yellow jacket", etc.'
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Year (if you know)">
          <input
            type="text"
            {...register("proposed_year")}
            className="w-full px-2.5 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold"
            placeholder="1995"
          />
        </Field>
        <Field label="Regatta or event (optional)">
          <input
            type="text"
            {...register("proposed_event")}
            className="w-full px-2.5 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold"
            placeholder="Head of the Hooch, Dad Vail, etc."
          />
        </Field>
      </div>

      <Field label="How sure are you?">
        <select
          {...register("confidence")}
          className="w-full px-2.5 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold"
          defaultValue="guess"
        >
          <option value="eyewitness">I was there</option>
          <option value="secondhand">Heard from someone there</option>
          <option value="family">Family member</option>
          <option value="guess">Best guess</option>
        </select>
      </Field>

      <Field label="Anything else (optional)">
        <textarea
          rows={2}
          {...register("notes")}
          className="w-full px-2.5 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold resize-y"
          placeholder="Context, story, correction…"
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-border/60">
        <Field label="Your name" error={errors.submitter_name?.message} required>
          <input
            type="text"
            autoComplete="name"
            {...register("submitter_name")}
            className="w-full px-2.5 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold"
          />
        </Field>
        <Field label="Your email" error={errors.submitter_email?.message} required>
          <input
            type="email"
            autoComplete="email"
            {...register("submitter_email")}
            className="w-full px-2.5 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold"
          />
        </Field>
      </div>

      <div className="hidden" aria-hidden>
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
        </label>
      </div>

      {serverError && (
        <p className="text-red-600 text-xs border border-red-200 bg-red-50 rounded p-2">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-utc-navy text-white font-semibold px-4 py-2 rounded hover:bg-utc-navy-deep transition-colors disabled:opacity-60 text-sm"
      >
        {isSubmitting ? "Sending…" : "Submit identification"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block">
        <span className="block text-xs font-semibold text-utc-navy mb-1">
          {label}
          {required && <span className="text-red-600 ml-0.5">*</span>}
        </span>
        {children}
      </label>
      {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
    </div>
  );
}
