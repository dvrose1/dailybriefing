// ABOUTME: Root layout with Microsoft Teams visual wrapper.
// ABOUTME: Sets up the app shell to look like a Teams personal app.

import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import TeamsWrapper from "@/components/teams/TeamsWrapper";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Daily Briefing Agent",
  description: "AI-powered daily briefing for CPG marketers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
        <TeamsWrapper>
          {children}
        </TeamsWrapper>
      </body>
    </html>
  );
}
