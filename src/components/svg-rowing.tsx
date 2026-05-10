/**
 * UTC Rowing brand graphics.
 *
 * UTCMark is the canonical emblem — a navy disc with a gold serif "U" and an
 * oar passing through it. Use it in nav, footer, page headers, favicons,
 * and any place the program needs a visual anchor. For faded accents, wrap
 * in a parent with `opacity-*`.
 */

export function UTCMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Navy disc */}
      <circle cx="32" cy="32" r="30" fill="#002D62" />
      {/* Subtle gold ring */}
      <circle
        cx="32"
        cy="32"
        r="29"
        fill="none"
        stroke="#FFD200"
        strokeWidth="0.6"
        strokeOpacity="0.45"
      />
      {/* Serif "U" — stroked outline, with feet */}
      <path
        d="M 22 17 V 36 Q 22 43 29 43 H 35 Q 42 43 42 36 V 17"
        fill="none"
        stroke="#FFD200"
        strokeWidth="3.4"
        strokeLinecap="butt"
      />
      <line x1="17.5" y1="17" x2="26.5" y2="17" stroke="#FFD200" strokeWidth="3" />
      <line x1="37.5" y1="17" x2="46.5" y2="17" stroke="#FFD200" strokeWidth="3" />
      {/* Horizontal oar through center of U */}
      <line
        x1="9"
        y1="29"
        x2="50"
        y2="29"
        stroke="#FFD200"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Right blade */}
      <ellipse cx="54" cy="29" rx="3.6" ry="2" fill="#FFD200" />
      {/* Left handle */}
      <rect x="7" y="27.4" width="3.4" height="3.2" rx="0.6" fill="#FFD200" />
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
