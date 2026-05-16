"use client";

import { useState } from "react";

type Variant = "footer" | "inline" | "card";

export function MailingListSignup({
  variant = "inline",
  source,
  heading,
  subhead,
}: {
  variant?: Variant;
  /** Free-text label of where this signup lives (e.g. "footer", "journal-index"). Stored as `source` in DB for analytics. */
  source: string;
  /** Optional H-level label shown above the field. */
  heading?: string;
  /** Optional supporting copy under the heading. */
  subhead?: string;
}) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "submitting") return;
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source, honeypot }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("[mailing-list] subscribe failed", { status: res.status, body: text });
        setErrorMsg("Something went wrong. Try again or email Coach Kinsey.");
        setStatus("error");
        return;
      }
      setStatus("ok");
      setEmail("");
    } catch (err) {
      console.error("[mailing-list] network error", err);
      setErrorMsg("Couldn't reach the server. Check your connection and retry.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div
        className={
          variant === "footer"
            ? "text-sm text-utc-gold-bright"
            : variant === "card"
              ? "rounded-md border border-utc-gold/40 bg-utc-gold/10 p-4 text-sm text-utc-navy"
              : "rounded-md border border-utc-gold/40 bg-utc-gold/10 p-3 text-sm text-utc-navy"
        }
      >
        You&rsquo;re on the list. We&rsquo;ll write when there&rsquo;s news worth your time.
      </div>
    );
  }

  // Layout shared between variants — slim form (email + button).
  // Visual treatment differs:
  //   - footer: dark navy bg, small text
  //   - inline: paper bg, normal text
  //   - card: wrapped block with heading + subhead
  const isFooter = variant === "footer";

  const form = (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`flex flex-col sm:flex-row gap-2 ${isFooter ? "" : "max-w-md"}`}
    >
      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address for UTC Rowing updates"
        className={
          isFooter
            ? "flex-1 min-w-0 px-3 py-2 rounded text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-utc-gold"
            : "flex-1 min-w-0 px-3 py-2.5 rounded text-base bg-white border border-border focus:outline-none focus:ring-2 focus:ring-utc-gold"
        }
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className={
          isFooter
            ? "bg-utc-gold text-utc-navy-deep font-semibold px-4 py-3 sm:py-2 rounded text-sm hover:bg-utc-gold-bright transition-colors disabled:opacity-60 whitespace-nowrap w-full sm:w-auto"
            : "bg-utc-navy text-white font-semibold px-5 py-3 sm:py-2.5 rounded hover:bg-utc-navy-deep transition-colors disabled:opacity-60 whitespace-nowrap w-full sm:w-auto"
        }
      >
        {status === "submitting" ? "Adding…" : isFooter ? "Subscribe" : "Stay in the loop"}
      </button>

      {/* Honeypot — hidden from humans, bots fill it in */}
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>
    </form>
  );

  if (variant === "card") {
    return (
      <div className="rounded-xl border border-border bg-white p-6 sm:p-8">
        {heading && (
          <h3 className="font-display text-xl sm:text-2xl font-bold text-utc-navy mb-2">
            {heading}
          </h3>
        )}
        {subhead && (
          <p className="text-foreground/75 text-sm sm:text-base mb-4">{subhead}</p>
        )}
        {form}
        {errorMsg && (
          <p className="mt-3 text-xs text-red-600">{errorMsg}</p>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          One email per post. Unsubscribe in one click.
        </p>
      </div>
    );
  }

  return (
    <div>
      {heading && (
        <p
          className={
            isFooter
              ? "font-semibold text-utc-gold uppercase text-xs tracking-[0.2em] mb-2"
              : "font-semibold text-utc-navy mb-1"
          }
        >
          {heading}
        </p>
      )}
      {subhead && (
        <p
          className={
            isFooter
              ? "text-white/65 text-xs mb-3 leading-snug"
              : "text-foreground/75 text-sm mb-3"
          }
        >
          {subhead}
        </p>
      )}
      {form}
      {errorMsg && (
        <p
          className={`mt-2 text-xs ${
            isFooter ? "text-red-300" : "text-red-600"
          }`}
        >
          {errorMsg}
        </p>
      )}
      {!isFooter && (
        <p className="mt-2 text-xs text-muted-foreground">
          One email per post. Unsubscribe in one click.
        </p>
      )}
    </div>
  );
}
