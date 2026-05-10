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
        <svg width="32" height="32" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#002D62" />
          <circle cx="32" cy="32" r="27" fill="none" stroke="#FFD200" strokeWidth="1.2" />
          <line x1="14" y1="50" x2="50" y2="14" stroke="#FFD200" strokeWidth="2.6" strokeLinecap="round" />
          <ellipse cx="51" cy="13" rx="6.5" ry="2.6" fill="#FFD200" transform="rotate(-45 51 13)" />
          <circle cx="14" cy="50" r="2" fill="#FFD200" />
          <line x1="50" y1="50" x2="14" y2="14" stroke="#FFD200" strokeWidth="2.6" strokeLinecap="round" />
          <ellipse cx="13" cy="13" rx="6.5" ry="2.6" fill="#FFD200" transform="rotate(45 13 13)" />
          <circle cx="50" cy="50" r="2" fill="#FFD200" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
