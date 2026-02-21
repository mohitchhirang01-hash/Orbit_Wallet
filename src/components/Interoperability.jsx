import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import bgImage from '../assets/interopreabilty_section_page_1_bg.png';
import mobileIllustration from '../assets/interopreabilty_section_page_1_bg2 - mobile.png';
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
            <div className="absolute inset-0 z-0 pointer-events-none mobile-hide-bg">
                <img
                    src={bgImage}
                    alt="Payment fragmentation illustration"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAFBFF] via-[#FAFBFF]/90 to-transparent" />
            </div>

            <div className="relative z-40 w-full max-w-[1240px] mx-auto pl-4 md:pl-8 pr-6 py-32">

                {/* Header */}
                <div ref={headerRef} className="text-center md:text-left mb-12 flex-shrink-0 max-w-4xl mx-auto md:mx-0">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#22075e]/10 text-[#22075e] text-sm font-semibold tracking-wide uppercase mb-6">
                        Let's Think
                    </span>
                    <h2 id="interop-heading" className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-bold text-[#0B0B0F] tracking-tight font-bricolage mb-6">
                        <BlurText text="Why " animateBy="chars" />
                        <BlurText text="Interoperability " className="text-[#22075e]" animateBy="chars" delay={0.1} />
                        <br className="hidden md:block" />
                        <BlurText text="Matters" animateBy="chars" delay={0.2} />
                        <BlurText text="?" className="text-[#22075e]" animateBy="chars" delay={0.3} />
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 font-medium leading-[1.3]">
                        <BlurText text=" A " animateBy="words" delay={0.4} />
                        <BlurText text="different pass" animateBy="words" delay={0.4} className="text-[#22075e]" />
                        <BlurText text=" for the bus. A " animateBy="words" delay={0.45} />
                        <BlurText text="different token" animateBy="words" delay={0.5} className="text-[#22075e]" />
                        <BlurText text="for the metro. A " animateBy="words" delay={0.55} />
                        <BlurText text="different ID" animateBy="words" delay={0.6} className="text-[#22075e]" />
                        <BlurText text=" for the gate. QR codes " animateBy="words" delay={0.65} />
                        <BlurText text="fail in the dark" animateBy="words" delay={0.7} className="text-[#22075e]" />
                        <BlurText text=". Cash " animateBy="words" delay={0.75} />
                        <BlurText text="fails in the rush." animateBy="words" delay={0.8} className="text-[#22075e]" />{' '}
                        <BlurText text=" Millions of people, paused at every turnstile." animateBy="words" delay={0.85} />
                    </p>

                    {/* Mobile Only Illustration */}
                    <div className="mt-10 md:hidden flex justify-center w-full">
                        <img
                            src={mobileIllustration}
                            alt="Fragmentation illustration"
                            className="w-full max-w-[420px] h-auto rounded-3xl shadow-xl border border-[#22075e]/5"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
