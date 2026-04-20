"use client";

import { Suspense } from "react";
import Script from "next/script";
import OptimizeClient from "./OptimizeClient";
import { Partytown } from "@qwik.dev/partytown/react";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const isDebug = !!searchParams.get("gtm_debug");
    console.log("isDebug Gtm Debug", isDebug);
    return (
        <>
            <Partytown
                debug={true}
                forward={["dataLayer.push"]}
                lib="/~partytown/"
            />
            <Script
                id="gtm-script"
                type={isDebug ? "text/javascript" : "text/partytown"}
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
