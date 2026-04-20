import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import OptimizeClient from "./OptimizeClient";
import { Partytown } from "@qwik.dev/partytown/react";

export const metadata: Metadata = {
    title: "GrowthPulse AI Optimize | Your marketing stack, diagnosed in minutes",
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

export default function Page() {
    return (
        <>
            <Partytown
                debug={true}
                forward={["dataLayer.push"]}
                lib="/~partytown/"
                resolveUrl={(url) => {
                    if (url.hostname === 'www.googletagmanager.com' || url.hostname === 'tagassistant.google.com') {
                        const proxyUrl = new URL('https://cdn.builder.io/api/v1/proxy-api');
                        proxyUrl.searchParams.append('url', url.href);
                        return proxyUrl;
                    }
                    return url;
                }}
            />
            <Script
                id="gtm-script"
                type="text/partytown" // Partytown lo detectará por este tipo
                dangerouslySetInnerHTML={{
                    __html: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-TR9VGQ5G');
                    `,
                }}
            />
            <Suspense fallback={
                <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                </div>
            }>
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-TR9VGQ5G"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    />
                </noscript>
                <OptimizeClient />
            </Suspense>
        </>
    );
}
