"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const baseSchema = z.object({
  submitter_name: z.string().min(2, "Please enter your name").max(120),
  submitter_email: z
    .string()
    .email("Please enter a valid email address")
    .max(200),
  years_rowed: z.string().max(60).optional().or(z.literal("")),
  coach_during_rowing: z.string().max(60).optional().or(z.literal("")),
  topic: z.string().max(40).optional().or(z.literal("")),
  body: z.string().max(5000).optional().or(z.literal("")),
  publish_permission: z
    .enum(["attributed", "anonymous", "internal"])
    .optional(),
  honeypot: z.string().max(0).optional(), // anti-spam
});

type FormData = z.infer<typeof baseSchema>;

const TOPICS = [
  { value: "memory", label: "A memory" },
  { value: "correction", label: "Correct my entry / a teammate's entry" },
  { value: "photo", label: "Photo identification" },
  { value: "boat_name", label: "Boat name / christening" },
  { value: "coaching", label: "Coaching anecdote" },
  { value: "other", label: "Other" },
];

export function SubmitForm() {
  const router = useRouter();
  const [showLevel2, setShowLevel2] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(baseSchema),
  });

  async function onSubmit(data: FormData) {
    setServerError(null);
    const formLevel = showLevel2 && (data.topic || data.body) ? 2 : 1;
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...data, form_level: formLevel }),
    });
    if (!res.ok) {
      // Capture the raw response for debugging, but never surface it to the
      // user — a 500 stack trace or internal error string can leak details.
      const text = await res.text().catch(() => "");
      console.error("[/api/submit] failed", { status: res.status, body: text });
      setServerError(
        "Something went wrong submitting — please try again or email kinseymi@radl.solutions."
      );
      return;
    }
    router.push("/submit/thank-you");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 max-w-xl"
      noValidate
    >
      <Field
        label="Your name"
        error={errors.submitter_name?.message}
        required
      >
        <input
          type="text"
          autoComplete="name"
          {...register("submitter_name")}
          className="w-full px-3 py-2.5 border border-border rounded text-base bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold"
        />
      </Field>

      <Field
        label="Email"
        hint="We won't publish or share this. Used only to follow up if needed."
        error={errors.submitter_email?.message}
        required
      >
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          {...register("submitter_email")}
          className="w-full px-3 py-2.5 border border-border rounded text-base bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold"
        />
      </Field>

      <Field
        label="Years you rowed at UTC"
        hint='e.g. "2003–2006" or "spring 1995 only" — rough is fine.'
      >
        <input
          type="text"
          {...register("years_rowed")}
          className="w-full px-3 py-2.5 border border-border rounded text-base bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold"
          placeholder="e.g. 2003–2006"
        />
      </Field>

      <Field label="Coach during your years" hint="Carney / Espeseth / Worth / Kinsey — whoever you remember.">
        <input
          type="text"
          {...register("coach_during_rowing")}
          className="w-full px-3 py-2.5 border border-border rounded text-base bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold"
          placeholder="e.g. Espeseth"
        />
      </Field>

      {!showLevel2 && (
        <button
          type="button"
          onClick={() => setShowLevel2(true)}
          className="text-utc-navy underline decoration-utc-gold underline-offset-4 text-sm font-medium"
        >
          + Add a memory, correction, or note
        </button>
      )}

      {showLevel2 && (
        <div className="space-y-5 border-t border-border pt-5">
          <Field label="What are you sharing?" hint="Optional — pick whichever fits best.">
            <select {...register("topic")} className="w-full px-3 py-2.5 border border-border rounded text-base bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold">
              <option value="">Select a type…</option>
              {TOPICS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Your story / correction / note"
            error={errors.body?.message}
          >
            <textarea
              rows={6}
              {...register("body")}
              className="w-full px-3 py-2.5 border border-border rounded text-base bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold resize-y min-h-[8rem]"
              placeholder="Anything you'd like a future UTC rower to know — a memory, a teammate, a boat name, a correction to your roster entry."
            />
          </Field>

          <Field label="Can we publish this with attribution?">
            <select {...register("publish_permission")} className="w-full px-3 py-2.5 border border-border rounded text-base bg-white focus:outline-none focus:ring-2 focus:ring-utc-gold">
              <option value="attributed">Yes — publish with my name</option>
              <option value="anonymous">Publish anonymously</option>
              <option value="internal">Internal record only — don&rsquo;t publish</option>
            </select>
          </Field>
        </div>
      )}

      {/* Honeypot — bots fill this; humans don't see it */}
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("honeypot")}
          />
        </label>
      </div>

      {serverError && (
        <p className="text-red-600 text-sm border border-red-200 bg-red-50 rounded p-3">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-utc-navy text-white font-semibold px-6 py-3 rounded hover:bg-utc-navy-deep transition-colors disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  // Wrap the input inside the <label> for automatic association.
  // Browsers + screen readers + Playwright's getByLabel all recognize this pattern.
  return (
    <div>
      <label className="block">
        <span className="block text-sm font-semibold text-utc-navy mb-1">
          {label}
          {required && <span className="text-red-600 ml-0.5">*</span>}
        </span>
        {hint && (
          <span className="block text-xs text-muted-foreground mb-1.5">
            {hint}
          </span>
        )}
        {children}
      </label>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
