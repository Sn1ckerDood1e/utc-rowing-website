import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://utcrowing.org";
const SITE_TITLE = "UTC Rowing — Fifty-Five Years on the Tennessee River";
const SITE_DESCRIPTION =
  "Rowing at the University of Tennessee at Chattanooga since 1971. Olympic gold, USRowing All-Americans, the Tennessee Indoor Rowing Championships, and a program rebuilding for ACRA. Alumni roster, history, and how to support the team.";
const SHORT_DESCRIPTION =
  "Olympic gold, three USRowing AAs in one year, and 524 alumni. The UTC Rowing program — past, present, and how alumni are bringing it back.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SHORT_DESCRIPTION,
    siteName: "UTC Rowing",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SHORT_DESCRIPTION,
  },
};

const sportsTeamJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsTeam",
  name: "UTC Rowing",
  sport: "Rowing",
  url: SITE_URL,
  foundingDate: "1971",
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "University of Tennessee at Chattanooga",
  },
  description:
    "Alumni community of UTC Rowing — 1971 to today, fifty-five years on the Tennessee River.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-utc-gold focus:px-4 focus:py-2 focus:text-utc-navy"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsTeamJsonLd) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
