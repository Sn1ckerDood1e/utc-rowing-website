import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#002D62",
          borderRadius: "50%",
          fontFamily: "Georgia, serif",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#FFD200",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          UTC
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 6,
            marginTop: 8,
            textTransform: "uppercase",
          }}
        >
          ROWING
        </div>
      </div>
    ),
    { ...size },
  );
}
