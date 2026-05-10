/**
 * Rowing-themed SVG illustrations.
 * All scale via viewBox; color via currentColor where appropriate.
 */

export function RowingShellSilhouette({
  className = "",
  withWake = true,
}: {
  className?: string;
  withWake?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 600 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Wake / ripples behind shell */}
      {withWake && (
        <>
          <path
            d="M5 50 Q 30 46, 60 50 T 130 50 T 200 50"
            stroke="currentColor"
            strokeOpacity="0.18"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M5 56 Q 40 53, 80 56 T 160 56"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </>
      )}
      {/* Shell hull */}
      <path
        d="M 80 40 L 510 40 Q 540 40 555 38 Q 565 37 565 35 Q 565 33 555 32 Q 540 30 510 30 L 80 30 Q 50 30 35 32 Q 25 33 25 35 Q 25 37 35 38 Q 50 40 80 40 Z"
        fill="currentColor"
      />
      {/* Riggers */}
      <line x1="180" y1="35" x2="180" y2="22" stroke="currentColor" strokeWidth="1.5" />
      <line x1="240" y1="35" x2="240" y2="22" stroke="currentColor" strokeWidth="1.5" />
      <line x1="300" y1="35" x2="300" y2="22" stroke="currentColor" strokeWidth="1.5" />
      <line x1="360" y1="35" x2="360" y2="22" stroke="currentColor" strokeWidth="1.5" />
      <line x1="420" y1="35" x2="420" y2="22" stroke="currentColor" strokeWidth="1.5" />
      {/* Oar blades extending up-right (catch position) */}
      <line x1="180" y1="22" x2="160" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="240" y1="22" x2="220" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="300" y1="22" x2="280" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="360" y1="22" x2="340" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="420" y1="22" x2="400" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Oar blade tips */}
      <ellipse cx="155" cy="5" rx="8" ry="3" fill="currentColor" />
      <ellipse cx="215" cy="5" rx="8" ry="3" fill="currentColor" />
      <ellipse cx="275" cy="5" rx="8" ry="3" fill="currentColor" />
      <ellipse cx="335" cy="5" rx="8" ry="3" fill="currentColor" />
      <ellipse cx="395" cy="5" rx="8" ry="3" fill="currentColor" />
    </svg>
  );
}

export function OarMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* shaft */}
      <line x1="20" y1="20" x2="160" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* blade */}
      <path d="M 0 20 Q 5 6, 20 12 L 20 28 Q 5 34, 0 20 Z" fill="currentColor" />
      {/* handle */}
      <rect x="158" y="14" width="20" height="12" rx="3" fill="currentColor" />
    </svg>
  );
}

export function WaterRipplePattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <pattern id="ripples" x="0" y="0" width="200" height="80" patternUnits="userSpaceOnUse">
          <path d="M 0 40 Q 50 30, 100 40 T 200 40" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.2" fill="none" />
          <path d="M 0 60 Q 50 50, 100 60 T 200 60" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" fill="none" />
          <path d="M 0 20 Q 50 12, 100 20 T 200 20" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ripples)" />
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
