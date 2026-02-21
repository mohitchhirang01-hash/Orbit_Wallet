import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import BlurText from './BlurText';

gsap.registerPlugin(ScrollTrigger);

export default function MeetOrbit() {
    const containerRef = useRef(null);
    const headlineRef = useRef(null);

    useGSAP(() => {
        // Header Animation
        const tlHeader = gsap.timeline({
            scrollTrigger: {
                trigger: headlineRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        tlHeader.fromTo(".meet-orbit-eyebrow",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(".meet-orbit-headline",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" },
                "-=0.4"
            )
            .fromTo(".meet-orbit-description",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.3"
            )
            .fromTo(".meet-orbit-closing",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.2"
            );

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full md:min-h-screen bg-[#fff6ff] flex items-center justify-center px-4 md:px-16 py-12 md:py-32"
        >
            {/* Top Gradient Overlay - Blends from Interoperability's #FAFBFF */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#FAFBFF] via-[#FAFBFF]/80 to-transparent z-10" />

            <div ref={headlineRef} className="relative z-40 w-full max-w-5xl text-center">
                {/* Main Headline - "Meet Orbit wallet" in purple */}
                <h1 className="meet-orbit-eyebrow font-bricolage font-bold text-5xl md:text-7xl mb-8 leading-tight">
                    <BlurText text="Meet Orbit Wallet" className="text-[#22075e]" animateBy="chars" />
                </h1>

                <h2 className="meet-orbit-headline font-bricolage font-bold text-4xl md:text-6xl mb-12 leading-[1.15]">
                    <span className="hidden md:inline">
                        <BlurText text="truly interoperable interface for the" className="text-[#0B0B0F] whitespace-nowrap" animateBy="chars" />
                    </span>
                    <span className="md:hidden inline-block">
                        <BlurText text="truly interoperable" className="text-[#0B0B0F]" animateBy="chars" />
                        <br />
                        <BlurText text="interface for the" className="text-[#0B0B0F]" animateBy="chars" delay={0.05} />
                    </span>
                    <BlurText text="New Bharat" className="text-slate-400" animateBy="chars" delay={0.1} />
                    <BlurText text="." className="text-[#22075e]" animateBy="chars" delay={0.2} />
                </h2>

                {/* Subheading - Gray text */}
                <div className="meet-orbit-description mb-8 max-w-4xl mx-auto">
                    <p className="text-slate-500 text-lg md:text-xl font-medium font-inter leading-relaxed">
                        <BlurText
                            text="Tap for a public transit across the country, pay for online or offline needs, unlock turnstiles for access systems in events and institutes — all within a single, unified flow."
                            animateBy="words"
                            delay={0.3}
                        />
                    </p>
                </div>

                {/* Closing Statement - Blue text with purple period */}
                <div className="meet-orbit-closing">
                    <p className="text-[#22075e] text-xl md:text-2xl font-semibold font-inter">
                        <BlurText text="Orbit Wallet brings the entire Indian infrastructure under one single tap" animateBy="words" delay={0.4} />
                        <span className="text-[#22075e]">.</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
