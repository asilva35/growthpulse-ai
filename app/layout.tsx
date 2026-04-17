import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GrowthPulse AI | Your marketing stack, diagnosed in minutes",
  description: "GrowthPulse AI analyzes your marketing stack across 7 dimensions to find wasted ad spend and generate a prioritized 90-day action plan.",
  openGraph: {
    title: "GrowthPulse AI | Honest Marketing Diagnostic",
    description: "Your marketing stack, diagnosed in minutes. Find wasted spend and optimize ROI.",
    url: "https://growthpulse.ai",
    siteName: "GrowthPulse AI",
    locale: "en_US",
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-background to-background">{children}</body>
    </html>
  );
}
