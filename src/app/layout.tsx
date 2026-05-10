import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "UTC Rowing — Fifty-Five Years on the Tennessee River",
  description:
    "Rowing at the University of Tennessee at Chattanooga since 1971. Olympic gold, USRowing All-Americans, the Tennessee Indoor Rowing Championships, and a program rebuilding for ACRA. Alumni roster, history, and how to support the team.",
  openGraph: {
    title: "UTC Rowing — Fifty-Five Years on the Tennessee River",
    description:
      "Olympic gold, three USRowing AAs in one year, and 500+ alumni. The UTC Rowing program — past, present, and how alumni are bringing it back.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
