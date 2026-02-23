import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { track } from "../lib/mixpanel";
import { encodeBase64Value } from "../lib/utils";
import { ArrowUpRight } from 'lucide-react';
import manageCardImage from "../assets/card.webp";

export default function MtsOnboarding() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const cardRef = searchParams.get("cardRef");

    useEffect(() => {
        if (cardRef) {
            const encodedCardRef = encodeBase64Value(cardRef);

            track("mts_wa_onboarding_initiated", { kitId: cardRef });

            // Tracking the intent before redirect
            track("mts_wa_onboarding_intent_opened", { kitId: cardRef });

            const waUrl = `https://wa.me/917676354969?text=MTS%20singara%20card%20activation.%20cardRef%3D${encodedCardRef}`;

            // Give a slight delay for tracking
            const timer = setTimeout(() => {
                // First go back to home page (simulating router.replace("/"))
                navigate("/", { replace: true });
                // Then open WhatsApp
                window.location.href = waUrl;
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            // Default tracking for view without cardRef
            track("MTS_Onboarding_Viewed");
        }
    }, [cardRef, navigate]);

    return (
        <div className="w-full min-h-screen bg-[#0B0B0F] flex flex-col items-center justify-center p-6 pt-32 pb-20">
            <div className="flex flex-col items-center gap-8 text-white text-center max-w-md w-full">

                <img
                    src={manageCardImage}
                    alt="manage_card"
                    className="max-h-[600px] object-contain mb-4"
                />

                <h1 className="text-3xl md:text-4xl font-bold font-bricolage">
                    {cardRef ? "Redirecting to WhatsApp..." : "Download Orbit Wallet"}
                </h1>

                <p className="text-white/60 leading-relaxed">
                    {cardRef
                        ? "If you are not redirected automatically, please continue with your MTS onboarding process by downloading the app."
                        : "Experience seamless transit with Orbit Wallet. Download the app to manage your cards and more."
                    }
                </p>

                <div className="w-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center gap-8 mt-4">
                    <h2 className="text-xl font-bold">Get the App</h2>

                    <div className="flex flex-col w-full gap-4">
                        <a
                            onClick={() => track("Android_Download_Clicked_MTS")}
                            href="https://play.google.com/store/apps/details?id=com.orbitwallet&hl=en_IN"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative px-6 py-4 bg-white hover:bg-white/90 text-black rounded-xl transition-all duration-300 flex items-center justify-center gap-2 w-full font-bold shadow-xl active:scale-95"
                        >
                            <span>Google Play</span>
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>

                        <a
                            onClick={() => track("iOS_Download_Clicked_MTS")}
                            href="https://apps.apple.com/in/app/orbit-wallet/id6480415069"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 w-full font-bold active:scale-95"
                        >
                            <span>App Store</span>
                            <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>
                </div>

                {cardRef && (
                    <a
                        href={`https://wa.me/917676354969?text=MTS%20singara%20card%20activation.%20cardRef%3D${encodeBase64Value(cardRef)}`}
                        className="mt-6 text-sm text-[#7c3aed] hover:text-white transition-colors underline underline-offset-4"
                    >
                        Click here to open WhatsApp manually
                    </a>
                )}
            </div>
        </div>
    );
}