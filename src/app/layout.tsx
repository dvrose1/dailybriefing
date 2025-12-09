// ABOUTME: Root layout with Microsoft Teams visual wrapper.
// ABOUTME: Sets up the app shell to look like a Teams personal app.

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TeamsWrapper from "@/components/teams/TeamsWrapper";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
      <body className={`${inter.variable} antialiased`}>
        <TeamsWrapper>
          {children}
        </TeamsWrapper>
      </body>
    </html>
  );
}
