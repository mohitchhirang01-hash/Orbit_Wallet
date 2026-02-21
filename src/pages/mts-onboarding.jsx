import React from "react";

export default function MtsOnboarding() {
    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen max-w-[1400px] mx-auto px-4 sm:px-5 md:px-[72px] pt-32 pb-[50px] md:pb-[60px] gap-[50px] md:gap-5">
            <div className="flex flex-1 flex-col gap-5 text-white">
                <h1 className="text-3xl md:text-4xl font-bold font-bricolage">Backed by the best</h1>
                <div className="flex">
                    {/* Fallback CTA since 100x.svg might not exist in this repo */}
                    <div
                        onClick={() => window.open("https://www.100x.vc/", "_blank")}
                        className="flex items-center justify-center px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded cursor-pointer transition-all duration-300"
                    >
                        <span className="font-bold tracking-wider">100X.VC</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col pb-5 gap-[30px] text-white">
                <h1 className="text-3xl md:text-4xl font-bold font-bricolage">Join us in our journey</h1>

                {/* InvestorConnectForm Placeholder */}
                <div className="w-full p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center min-h-[300px]">
                    <span className="text-white/50 mb-4">[Investor Connect Form]</span>
                    <p className="text-sm text-center text-white/40">
                        This component ("InvestorConnectForm") was not found in the current Vite project, so this is a placeholder. You can integrate it when ready.
                    </p>
                </div>
            </div>
        </div>
    );
}