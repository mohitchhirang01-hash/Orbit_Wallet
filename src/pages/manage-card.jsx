import React from "react";
import cardImage from "../assets/card.webp";
import { useAppRedirect } from "../hooks/useAppRedirect";

export default function ManageCard() {
    useAppRedirect();

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[var(--orbit-primary)] px-6">
            <img
                src={cardImage}
                alt="Manage Card"
                className="flex-1 max-h-[600px] object-contain mb-8 animate-floating"
            />

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                {/* Play Store Button */}
                <a
                    href="https://play.google.com/store/apps/details?id=com.orbitwallet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 font-medium text-lg">Google Play</span>
                    <div className="absolute inset-0 rounded-full ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-500"></div>
                </a>

                {/* App Store Button */}
                <a
                    href="https://apps.apple.com/in/app/orbit-wallet/id6480415069"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 font-medium text-lg">App Store</span>
                    <div className="absolute inset-0 rounded-full ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-500"></div>
                </a>
            </div>
        </div>
    );
}