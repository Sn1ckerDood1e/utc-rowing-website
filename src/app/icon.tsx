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
          background: "#002D62",
          borderRadius: "50%",
          color: "#e6cf95",
          fontSize: 14,
          fontWeight: 800,
          fontFamily: "Georgia, serif",
          letterSpacing: "-0.02em",
        }}
      >
        UTC
      </div>
    ),
    { ...size },
  );
}
