import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

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

        // Step 3: Numbers Burst
        // Select all stat-number classes inside pods (Scoped)
        const numbers = gsap.utils.toArray('.stat-number', sectionRef.current);
        numbers.forEach((num) => {
            const target = parseFloat(num.getAttribute('data-target'));
            const isPercent = num.innerText.includes('%');
            const prefix = num.innerText.includes('₹') ? '₹' : '';

            gsap.fromTo(num,
                { innerText: 0, scale: 0.65, opacity: 0 },
                {
                    innerText: target,
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    snap: { innerText: 1 },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: num,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    onUpdate: function () {
                        if (this.targets()[0]) {
                            this.targets()[0].innerText = prefix + Math.ceil(this.targets()[0].innerText) + (isPercent ? "%" : "");
                        }
                    }
                }
            );
        });

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex flex-col items-center pt-32 pb-24 overflow-hidden bg-gradient-to-b from-slate-50 to-white"
        >
            {/* Gradient Wave Background (Updated Colors & Blur) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                {/* Main animated gradient orb 1 - Soft Purple */}
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-200/30 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }}></div>

                {/* Main animated gradient orb 2 - Subtle Slate/Blue Mix */}
                <div className="absolute top-[20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-slate-200/40 blur-[180px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>

                {/* Main animated gradient orb 3 (The Wave) - White/Purple Flow */}
                <div className="absolute bottom-[-10%] left-[20%] w-[90%] h-[60%] rounded-[100%] bg-gradient-to-r from-slate-100 via-purple-50 to-white blur-[130px] opacity-80"></div>

                {/* Wave SVG Overlay for structure with blur */}
                <div className="absolute bottom-0 left-0 right-0 h-[60%] opacity-30 blur-2xl"
                    style={{
                        background: 'radial-gradient(circle at 50% 100%, rgba(200, 200, 255, 0.15) 0%, rgba(255,255,255,0) 70%)'
                    }}>
                </div>

                {/* Global Backdrop Blur for "frosted" atmosphere */}
                <div className="absolute inset-0 backdrop-blur-[2px]"></div>
            </div>

            {/* Noise Overlay (Kept for texture) - Reduced opacity */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Headline Section */}
            <div ref={headlineRef} className="z-20 text-center mb-16 relative">
                <p className="uppercase tracking-[0.18em] text-[13px] font-medium text-slate-500 mb-6 opacity-60">
                    Orbit Rewards
                </p>
                <h2 className="text-[clamp(48px,6vw,72px)] leading-[1.1] font-bold text-[#0f172a] tracking-tight font-bricolage mb-8">
                    Movement that <br className="hidden md:block" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5B8CFF] to-[#7B61FF]">
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
                <div className="group relative w-full md:w-[320px] h-[360px] rounded-[28px] border border-white/70 bg-white/55 backdrop-blur-[18px] shadow-[0_25px_60px_rgba(20,40,120,0.08)] flex flex-col p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(20,40,120,0.12)]">
                    <div className="mb-auto">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50/50 flex items-center justify-center mb-6 text-blue-600">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 18V6" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Cashback</h3>
                        <p className="text-slate-500 leading-relaxed">Instant cashback on every prepaid transaction you make.</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-slate-900 mb-1 flex items-baseline">
                            <span className="stat-number" data-target="1">0</span>%
                        </div>
                        <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Flat Return</div>
                    </div>
                </div>

                {/* Pod 2 (Center Raised) */}
                <div className="group relative min-w-[300px] w-[300px] snap-center md:w-[320px] h-[360px] md:-mt-6 rounded-[28px] border border-white/70 bg-white/55 backdrop-blur-[18px] shadow-[0_25px_60px_rgba(20,40,120,0.08)] flex flex-col p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(20,40,120,0.12)] z-10">
                    <div className="absolute inset-0 rounded-[28px] border border-blue-400/20 pointer-events-none"></div>
                    <div className="mb-auto">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50/50 flex items-center justify-center mb-6 text-indigo-600">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
                            {/* Transit Icon */}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Transit</h3>
                        <p className="text-slate-500 leading-relaxed">Massive discounts on metro and bus journeys nationwide.</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-slate-900 mb-1 flex items-baseline">
                            Up to <span className="stat-number ml-2" data-target="30">0</span>%
                        </div>
                        <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">Off Rides</div>
                    </div>
                </div>

                {/* Pod 3 */}
                <div className="group relative min-w-[300px] w-[300px] snap-center md:w-[320px] h-[360px] rounded-[28px] border border-white/70 bg-white/55 backdrop-blur-[18px] shadow-[0_25px_60px_rgba(20,40,120,0.08)] flex flex-col p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(20,40,120,0.12)]">
                    <div className="mb-auto">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50/50 flex items-center justify-center mb-6 text-amber-600">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Referrals</h3>
                        <p className="text-slate-500 leading-relaxed">Invite friends to Orbit and get paid when they join.</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-slate-900 mb-1 flex items-baseline">
                            <span className="stat-number" data-target="100">0</span>
                        </div>
                        <div className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Per Friend</div>
                    </div>
                </div>

            </div>
        </section >
    );
}
