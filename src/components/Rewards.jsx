import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star } from 'lucide-react';
import rewardsBg from '../assets/reward_section_bg.png';


gsap.registerPlugin(ScrollTrigger);

export default function Rewards() {
    const sectionRef = useRef(null);
    const podsRef = useRef(null);
    const headlineRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom bottom",
                toggleActions: "play none none reverse"
            }
        });

        // Step 1: Enter Section (Brightness/Focus)
        tl.fromTo(headlineRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            }
        );

        // Step 2: Pods Activate (Attached to main timeline)
        const pods = podsRef.current.children;
        tl.fromTo(pods,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            },
            "-=0.5"
        );



    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[auto] flex flex-col items-center py-16 md:py-24 overflow-hidden bg-white"
        >
            {/* Background Image - Absolute Positioned */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
                <img
                    src={rewardsBg}
                    alt="Background"
                    className="w-full h-full object-contain pointer-events-none"
                />
            </div>


            {/* Noise Overlay (Kept for texture) - Reduced opacity */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Headline Section */}
            <div ref={headlineRef} className="z-20 text-center mb-16 relative">
                <div className="inline-block mb-6">
                    <span className="px-4 py-1.5 rounded-full bg-[#22075e]/10 text-[#22075e] text-xs font-bold tracking-widest uppercase border border-[#22075e]/20">
                        Orbit Wallet Rewards
                    </span>
                </div>
                <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] font-bold text-[#0f172a] tracking-tight font-bricolage mb-6">
                    Movement that <br className="hidden md:block" />
                    <span className="text-[#22075e]">
                        Pays You Back.
                    </span>
                </h2>
                <p className="text-[19px] text-slate-600 opacity-80 max-w-[540px] mx-auto leading-relaxed">
                    Earn rewards on every transaction. Discounts on transit, cashback on spends, and bonuses for referrals.
                </p>
            </div>

            {/* Reward Pods */}
            <div ref={podsRef} className="relative z-20 flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center w-full max-w-6xl px-4">

                {/* Pod 1 */}
                <div className="group relative w-full max-w-[320px] md:w-[300px] h-[320px] rounded-[24px] border border-white/70 bg-white/55 backdrop-blur-[18px] shadow-[0_25px_60px_rgba(20,40,120,0.08)] flex flex-col p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(20,40,120,0.12)]">
                    <div className="mb-auto">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50/50 flex items-center justify-center mb-6 text-blue-600">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 18V6" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2 font-bricolage">Cashback</h3>
                        <p className="text-slate-500 leading-relaxed">Unlimited cashback on every spend you make.</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                            <Star size={24} className="text-amber-500 fill-amber-500 shrink-0" />
                            1%
                        </div>
                        <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Flat Return</div>
                    </div>
                </div>

                {/* Pod 2 */}
                <div className="group relative w-full max-w-[320px] md:w-[300px] h-[320px] rounded-[24px] border border-white/70 bg-white/55 backdrop-blur-[18px] shadow-[0_25px_60px_rgba(20,40,120,0.08)] flex flex-col p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(20,40,120,0.12)]">
                    <div className="mb-auto">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50/50 flex items-center justify-center mb-6 text-indigo-600">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
                            {/* Transit Icon */}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2 font-bricolage">Transit</h3>
                        <p className="text-slate-500 leading-relaxed">Operator discounts on transit journeys nationwide.</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                            <Star size={24} className="text-amber-500 fill-amber-500 shrink-0" />
                            Upto{" "}<span>20</span>%
                        </div>
                        <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">Off on Rides</div>
                    </div>
                </div>

                {/* Pod 3 */}
                <div className="group relative w-full max-w-[320px] md:w-[300px] h-[320px] rounded-[24px] border border-white/70 bg-white/55 backdrop-blur-[18px] shadow-[0_25px_60px_rgba(20,40,120,0.08)] flex flex-col p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(20,40,120,0.12)]">
                    <div className="mb-auto">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50/50 flex items-center justify-center mb-6 text-amber-600">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2 font-bricolage">Referrals</h3>
                        <p className="text-slate-500 leading-relaxed">Invite friends to Orbit Wallet and get paid when they join.</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                            <Star size={24} className="text-amber-500 fill-amber-500 shrink-0" />
                            ₹100
                        </div>
                        <div className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Per Friend</div>
                    </div>
                </div>

            </div>

            {/* Terms and Conditions Text */}
            <div className="absolute bottom-6 right-8 md:right-12 z-20">
                <p className="text-[10px] md:text-xs text-slate-400 font-medium tracking-wide opacity-60">
                    *Terms and conditions applied
                </p>
            </div>
        </section >
    );
}
