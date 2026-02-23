import React from "react";
import { useAppRedirect } from "../hooks/useAppRedirect";

export default function GetApp() {
    useAppRedirect(); // Automatically redirects on mobile devices

    return (
        <div className="flex w-full min-h-screen items-center justify-center bg-[var(--orbit-primary)] text-white/50 px-6 text-center">
            <h3>Please open this page on a mobile device to download the Orbit Wallet app.</h3>
        </div>
    );
}