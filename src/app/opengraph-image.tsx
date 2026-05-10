import { ImageResponse } from "next/og";

export const alt =
  "UTC Rowing — Alumni 1971–2026 · ACRA Championships May 2026";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const NAVY = "#002649";
const NAVY_DEEP = "#001633";
const GOLD = "#c8b682";
const GOLD_BRIGHT = "#e6cf95";
const WHITE = "#ffffff";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY} 60%, #1a3f5f 100%)`,
          color: WHITE,
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top eyebrow tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 56,
              height: 3,
              background: GOLD,
            }}
          />
          <div
            style={{
              color: GOLD_BRIGHT,
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, sans-serif",
              fontWeight: 600,
            }}
          >
            University of Tennessee at Chattanooga
          </div>
        </div>

        {/* Wordmark — stacked: UTC big serif gold over spaced ROWING */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 200,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: GOLD_BRIGHT,
            }}
          >
            UTC
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 600,
              letterSpacing: 18,
              marginTop: 18,
              textTransform: "uppercase",
              color: WHITE,
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, sans-serif",
            }}
          >
            Rowing
          </div>
        </div>

        {/* Gold accent line under wordmark */}
        <div
          style={{
            width: 220,
            height: 4,
            background: GOLD,
            marginTop: 28,
            marginBottom: 28,
          }}
        />

        {/* Subhead */}
        <div
          style={{
            display: "flex",
            fontSize: 44,
            color: "rgba(255,255,255,0.85)",
            fontStyle: "italic",
            letterSpacing: "-0.005em",
          }}
        >
          Alumni · 1971–2026
        </div>

        {/* Bottom ACRA tag */}
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            paddingTop: 64,
            alignItems: "center",
            gap: 14,
            color: GOLD_BRIGHT,
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, sans-serif",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              background: GOLD,
              borderRadius: 9999,
            }}
          />
          ACRA Championships · May 2026
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
