import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
    images: [
      {
        url: "/assets/images/mockup-06.png",
        width: 1400,
        height: 636,
        alt: "GrowthPulse AI",
      },
    ],
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
      {/* <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TR9VGQ5G');
        `}
      </Script> */}
      <body className="min-h-full flex flex-col bg-background text-foreground bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-background to-background">
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TR9VGQ5G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript> */}
        {children}
      </body>
    </html>
  );
}
