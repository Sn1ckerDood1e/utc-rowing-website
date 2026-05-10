/**
 * UTC Rowing brand graphics.
 *
 * UTCMark is the canonical wordmark — a pure typographic lockup with "UTC"
 * set large in the Playfair display serif (gold) stacked over a smaller,
 * letter-spaced uppercase "Rowing" in the sans body face. No disc, no oars,
 * no icon — the type IS the mark. Use it in nav, footer, page headers, and
 * any place the program needs a visual anchor. For faded accents, wrap in a
 * parent with `opacity-*`. The component inherits color from its parent for
 * the "Rowing" tag (via `text-current`), so it adapts to navy or white
 * backgrounds; only the "UTC" stays gold.
 */

export function UTCMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex flex-col leading-none font-display select-none ${className}`}
      aria-hidden
    >
      <span className="text-utc-gold-bright font-bold text-[1.4em] tracking-tight">
        UTC
      </span>
      <span className="text-current uppercase tracking-[0.28em] text-[0.55em] font-semibold mt-0.5">
        Rowing
      </span>
    </span>
  );
}

export function RiverBendCurve({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 320"
      className={className}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0,224 C240,288 480,160 720,192 C960,224 1200,288 1440,256 L1440,320 L0,320 Z"
      />
    </svg>
  );
}

export function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export function MedalIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 4l5 8 5-8" />
      <circle cx="12" cy="16" r="6" />
      <path d="M9.5 14l1.5 1.5L15 12" strokeWidth="2" />
    </svg>
  );
}
