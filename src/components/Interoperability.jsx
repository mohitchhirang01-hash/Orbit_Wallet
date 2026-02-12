import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import bgImage from '../assets/interopreabilty_section_page_1_bg.png';
import BlurText from './BlurText';

gsap.registerPlugin(ScrollTrigger);

export default function Interoperability() {
    const containerRef = useRef(null);
    const headerRef = useRef(null);

    useGSAP(() => {
        // Header Animation
        const tlHeader = gsap.timeline({
            scrollTrigger: {
                trigger: headerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        tlHeader.fromTo(".header-eyebrow",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(".header-title-line",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" },
                "-=0.4"
            );

    }, { scope: containerRef });

    return (
        <section
            id="interoperability-section"
            ref={containerRef}
            className="relative bg-[#FAFBFF] overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src={bgImage}
                    alt="Payment fragmentation illustration"
                    className="w-full h-full object-cover object-center"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent md:from-white/90 md:via-white/60" />
            </div>

            <div className="relative z-20 w-full max-w-[1200px] mx-auto px-6 py-32">

                {/* Header */}
                <div ref={headerRef} className="text-left mb-12 flex-shrink-0 max-w-4xl">
                    <span className="header-eyebrow inline-block py-1 px-3 rounded-full bg-[#6C5CE7]/10 text-[#6C5CE7] text-sm font-semibold tracking-wide uppercase mb-6">
                        Let's Think
                    </span>
                    <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-bold text-[#0B0B0F] tracking-tight font-bricolage mb-10">
                        <BlurText text="Why" animateBy="chars" />
                        <BlurText text="Interoperability" className="text-[#6C5CE7]" animateBy="chars" delay={0.1} /><br />
                        <BlurText text="Matters" animateBy="chars" delay={0.2} />
                        <BlurText text="?" className="text-[#6C5CE7]" animateBy="chars" delay={0.3} />
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
                        <BlurText text="A " animateBy="words" delay={0.4} />
                        <BlurText text="different pass" animateBy="words" delay={0.4} className="text-[#6C5CE7]" />
                        <BlurText text=" for the bus. A " animateBy="words" delay={0.45} />
                        <BlurText text="different token" animateBy="words" delay={0.5} className="text-[#6C5CE7]" />
                        <BlurText text=" for the metro. A " animateBy="words" delay={0.55} />
                        <BlurText text="different ID" animateBy="words" delay={0.6} className="text-[#6C5CE7]" />
                        <BlurText text=" for the gate. QR codes " animateBy="words" delay={0.65} />
                        <BlurText text="fail in the dark" animateBy="words" delay={0.7} className="text-[#6C5CE7]" />
                        <BlurText text=". Cash " animateBy="words" delay={0.75} />
                        <BlurText text="fails in the rush" animateBy="words" delay={0.8} className="text-[#6C5CE7]" />
                        <BlurText text=". Millions people, paused at every turnstile." animateBy="words" delay={0.85} />
                    </p>
                </div>
            </div>
        </section>
    );
}
