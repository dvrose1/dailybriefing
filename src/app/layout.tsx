// ABOUTME: Root layout with the Assemble visual shell.
// ABOUTME: Sets up the app to look like a surface inside Unilever's Assemble workspace.

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AssembleShell from "@/components/assemble/AssembleShell";
import { StoreProvider } from "@/lib/store";

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
        <StoreProvider>
          <AssembleShell>
            {children}
          </AssembleShell>
        </StoreProvider>
      </body>
    </html>
  );
}
