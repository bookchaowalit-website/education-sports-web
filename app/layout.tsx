import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Sports Training Hub — Training Board", description: "A lightweight planner for organising training sessions by focus, duration, and intensity." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
