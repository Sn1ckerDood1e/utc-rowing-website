import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="30" fill="#002D62" />
          <path
            d="M 22 17 V 36 Q 22 43 29 43 H 35 Q 42 43 42 36 V 17"
            fill="none"
            stroke="#FFD200"
            strokeWidth="3.4"
          />
          <line x1="17.5" y1="17" x2="26.5" y2="17" stroke="#FFD200" strokeWidth="3" />
          <line x1="37.5" y1="17" x2="46.5" y2="17" stroke="#FFD200" strokeWidth="3" />
          <line
            x1="9"
            y1="29"
            x2="50"
            y2="29"
            stroke="#FFD200"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <ellipse cx="54" cy="29" rx="3.6" ry="2" fill="#FFD200" />
          <rect x="7" y="27.4" width="3.4" height="3.2" rx="0.6" fill="#FFD200" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
