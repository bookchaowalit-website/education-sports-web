import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// The font variable sits on <html>: the Reader shell tokens live on :root and read it from there.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const description = "A lightweight planner for organising training sessions by focus, duration, and intensity.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sports.bookchaowalit.com"),
  title: "Sports Training Hub — Training board",
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Sports Training Hub", title: "Sports Training Hub — Training board", description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
