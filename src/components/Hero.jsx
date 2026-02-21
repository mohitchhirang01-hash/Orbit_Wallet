
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import BlurText from './BlurText';


import bgLight from '../assets/bg_herosection_light_without_card.webp';


export default function Hero() {
    const containerRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);


    useGSAP(() => {
        // Premium upward reveal with blur fade
        gsap.from([line1Ref.current, line2Ref.current], {
            y: 40,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.2,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.2
        });
    }, { scope: containerRef });

    return (
        <section id="hero-section" ref={containerRef} className="hero-section relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-start bg-[var(--orbit-primary)] transition-colors duration-300">

            {/* Background Images */}
            <div className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none">
                <img src={bgLight} alt="Background" className="w-full h-full object-cover object-center" />
            </div>

            {/* Hero Content Container */}
            <div className="relative z-40 w-full flex flex-col items-center justify-center gap-8 px-4 mt-7 pt-24 md:pt-26">

                {/* Premium Fintech Heading */}
                <div className="relative max-w-[1100px] mx-auto text-center">
                    {/* Luxury Glow Effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none -z-10">
                        <div className="w-full h-full rounded-full bg-gradient-radial from-[rgba(124,92,255,0.18)] to-transparent blur-[90px]" />
                    </div>

                    <h1 id="hero-heading" className="overlap-heading font-bricolage font-bold tracking-[-0.02em] leading-[0.95]"
                        style={{ fontSize: 'clamp(2.4rem, 5.4vw, 4.8rem)' }}>

                        {/* Line 1 with reveal wrapper */}
                        <div className="overflow-hidden">
                            <span ref={line1Ref} className="inline-block">
                                <span className="overlap-item">Movement</span>{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22075e] to-[#7c3aed] overlap-item font-bold">Unlocked</span>.
                            </span>
                        </div>
                    </h1>

                    {/* Mobile Only CTA Button */}
                    <div className="mt-8 md:hidden px-4">
                        <button
                            onClick={() => window.open('https://play.google.com/store/apps/details?id=com.orbitwallet&hl=en_IN', '_blank')}
                            className="w-full max-w-[280px] py-4 rounded-2xl bg-[#0B0B0F] text-white font-bold shadow-xl active:scale-95 transition-transform"
                        >
                            Get Orbit Wallet
                        </button>
                    </div>
                </div>
            </div>

        </section >
    );
}