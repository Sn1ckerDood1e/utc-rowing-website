/**
 * UTC Rowing brand graphics.
 *
 * UTCMark is the canonical emblem — a navy disc with a gold ring and crossed
 * gold oars (X). Use it in nav, footer, page headers, favicons, and any
 * place the program needs a visual anchor. For faded accents, wrap in a
 * parent with `opacity-*`.
 */

export function UTCMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="32" cy="32" r="30" fill="#002D62" />
      <circle cx="32" cy="32" r="27" fill="none" stroke="#FFD200" strokeWidth="1.2" />
      {/* Oar 1: handle BL → blade TR */}
      <line x1="14" y1="50" x2="50" y2="14" stroke="#FFD200" strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="51" cy="13" rx="6.5" ry="2.6" fill="#FFD200" transform="rotate(-45 51 13)" />
      <circle cx="14" cy="50" r="2" fill="#FFD200" />
      {/* Oar 2: handle BR → blade TL */}
      <line x1="50" y1="50" x2="14" y2="14" stroke="#FFD200" strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="13" cy="13" rx="6.5" ry="2.6" fill="#FFD200" transform="rotate(45 13 13)" />
      <circle cx="50" cy="50" r="2" fill="#FFD200" />
    </svg>
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
