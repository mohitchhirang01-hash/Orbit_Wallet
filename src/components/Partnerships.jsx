import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Building2, Lock, Landmark } from 'lucide-react';
import partnerNsdl from '../assets/partner_nsdl.png';
import partnerLivquik from '../assets/partner_livquik.png';
import partnerIob from '../assets/partner_iob.png';
import partnerRbl from '../assets/partner_rbl.png';
import npciLogo from '../assets/npci_logo.png';
import mtcLogo from '../assets/mtc_logo.png';
import elciaLogo from '../assets/elcia_logo.png';

gsap.registerPlugin(ScrollTrigger);

const Partnerships = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const subtextRef = useRef(null);
    const tier1Ref = useRef(null);
    const tier2Ref = useRef(null);
    const tier3Ref = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const header = headerRef.current;
        const subtext = subtextRef.current;
        const tier1Cards = tier1Ref.current.children;
        const tier2Card = tier2Ref.current;
        const tier3Items = tier3Ref.current.children;

        // Entry Animation: Section fades in
        gsap.fromTo(section,
            { opacity: 0.2 },
            {
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: true,
                }
            }
        );

        // Header Animation: Staggered characters (manually split in JSX)
        const chars = header.querySelectorAll('.char');
        gsap.fromTo(chars,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                }
            }
        );

        // Subtext Animation
        gsap.fromTo(subtext,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                }
            }
        );

        // Tier 1: Banking Partners Stagger
        gsap.fromTo(tier1Cards,
            { y: 30, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: tier1Ref.current,
                    start: "top 85%",
                }
            }
        );

        // Tier 2: Regulatory Strength (NPCI)
        gsap.fromTo(tier2Card,
            { scale: 0.9, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "elastic.out(1, 0.75)",
                scrollTrigger: {
                    trigger: tier2Ref.current,
                    start: "top 85%",
                }
            }
        );

        // Tier 3: Clients Fade
        gsap.fromTo(tier3Items,
            { opacity: 0, filter: "blur(10px)" },
            {
                opacity: 1,
                filter: "blur(0px)",
                stagger: 0.2,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: tier3Ref.current,
                    start: "top 90%",
                }
            }
        );

    }, []);

    // Helper to split text for animation
    const splitText = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className="char inline-block whitespace-pre">{char}</span>
        ));
    };

    return (
        <section
            ref={sectionRef}
            className="py-20 relative overflow-hidden bg-[#fcfdfe] text-slate-900"
        >


            <div className="max-w-7xl mx-auto px-6 relative z-20 text-center">

                {/* Header Section */}
                <div className="mb-10">
                    <h2 ref={headerRef} className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-[#22075e] font-bricolage">
                        {splitText("Built on Giants")}
                    </h2>
                    <p ref={subtextRef} className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Orbit isn't just an app; it’s a financial fortress backed by India’s leading banking institutions.
                    </p>
                </div>

                {/* Tier 1: Banking Partners */}
                <div className="mb-12">
                    <p className="text-xs font-semibold tracking-[0.2em] text-[#22075e]/80 mb-6 uppercase">Banking Partners</p>
                    <div ref={tier1Ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { name: 'NSDL', image: partnerNsdl, height: 'h-16' },
                            { name: 'IOB', image: partnerIob, height: 'h-16' },
                            { name: 'Livquick', image: partnerLivquik, height: 'h-12' },
                            { name: 'RBL', image: partnerRbl, height: 'h-12' }
                        ].map((partner, index) => (
                            <div
                                key={index}
                                className="group relative bg-white/60 backdrop-blur-md border border-slate-200 rounded-2xl p-6 hover:bg-white/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="absolute inset-0 rounded-2xl border border-[#22075e]/0 group-hover:border-[#22075e]/10 transition-all duration-500"></div>
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <img
                                        src={partner.image}
                                        alt={partner.name}
                                        className={`${partner.height} w-auto object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 grayscale-0`}
                                    />
                                    {/* <span className="text-lg font-medium tracking-wide text-slate-700 group-hover:text-slate-900 transition-colors">{partner.name}</span> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tier 2: Regulatory Strength */}
                <div className="mb-12">
                    <p className="text-xs font-semibold tracking-[0.2em] text-[#22075e]/80 mb-6 uppercase">In Collaboration With</p>
                    <div ref={tier2Ref} className="flex justify-center">
                        <div className="relative bg-white backdrop-blur-xl border border-slate-200 rounded-3xl p-8 max-w-lg w-full shadow-lg overflow-hidden hover:shadow-[0_0_40px_-5px_rgba(108,99,255,0.3)] transition-shadow duration-500">
                            {/* Subtle breathing glow - Purple for Light Theme (Adjusted for white background?) - removing if needed, but keeping for now */}
                            <div className="absolute -inset-[100%] bg-white from-transparent via-[#22075e]/5 to-transparent rotate-45 animate-pulse"></div>

                            <div className="relative z-10 flex flex-col items-center justify-center">
                                <img
                                    src={npciLogo}
                                    alt="NPCI - National Payments Corporation of India"
                                    className="h-20 md:h-24 w-auto object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tier 3: Clients / Adoption Proof */}
                <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-[#22075e]/80 mb-6 uppercase">Trusted By</p>
                    <div ref={tier3Ref} className="flex flex-wrap justify-center gap-12 md:gap-16 items-center">
                        {[
                            { name: 'MTC', image: mtcLogo, height: 'h-32' },
                            { name: 'ELCIA', image: elciaLogo, height: 'h-28' }
                        ].map((client, index) => (
                            <div
                                key={index}
                                className="transition-transform duration-300 hover:scale-110 cursor-pointer"
                            >
                                <img
                                    src={client.image}
                                    alt={client.name}
                                    className={`${client.height} w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Partnerships;
