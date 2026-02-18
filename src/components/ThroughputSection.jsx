import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import BlurText from './BlurText'; // Assuming BlurText exists, as used in other files. If not, standard text.
import { ArrowRight } from 'lucide-react';
import throughputBg from '../assets/throughput_bg.png';

gsap.registerPlugin(ScrollTrigger);

export default function ThroughputSection({ containerAnimation }) {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const visualRef = useRef(null);

    // Removal of counters as per user request

    useGSAP(() => {
        // 1. Entrance Animation
        // Headline slides up with blur
        gsap.fromTo(".tp-headline",
            { y: 80, opacity: 0, filter: "blur(10px)" },
            {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    containerAnimation: containerAnimation,
                    start: "left center",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Subtext staggers in with blur
        gsap.fromTo(".tp-subtext-item",
            { x: -50, opacity: 0, filter: "blur(10px)" },
            {
                x: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                delay: 0.3,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    containerAnimation: containerAnimation,
                    start: "left center",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // CTA fades in last with blur
        gsap.fromTo(".tp-cta",
            { scale: 0.9, opacity: 0, filter: "blur(5px)" },
            {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "back.out(1.7)",
                delay: 0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    containerAnimation: containerAnimation,
                    start: "left center",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Counter logic removed as requested


        // 3. Visual Motion (Continuous, Subtle)
        // Light trails flowing left -> right
        const visualTimeline = gsap.timeline({ repeat: -1 });

        // Example: animating a gradient background or specific SVG lines
        // For now, animating a "light-trail" element
        gsap.to(".light-trail", {
            xPercent: 100,
            opacity: 0,
            duration: 2,
            stagger: 0.5,
            ease: "none",
            repeat: -1
        });

        // 4. Throughput Expansion Effect (Scrub)
        // As user scrolls through this section specifically?
        // OR as general horizontal scroll progresses? 
        // "As user continues scrolling horizontally through this section"

        // Brighter glow as we scroll past
        gsap.to(".visual-glow", {
            opacity: 0.8,
            boxShadow: "0 0 100px 50px rgba(124, 58, 237, 0.5)",
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                containerAnimation: containerAnimation,
                start: "left center",
                end: "right center",
                scrub: true
            }
        });

        ScrollTrigger.refresh(); // Force refresh to ensure positions are correct
    }, { scope: sectionRef, dependencies: [containerAnimation] });

    return (
        <div
            ref={sectionRef}
            className="w-full h-full flex flex-col md:flex-row bg-[#FAFBFF] overflow-hidden"
        >
            {/* LEFT SIDE (Text Block – 40%) */}
            <div className="w-full md:w-[40%] h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 z-20 relative bg-[#FAFBFF]">

                <div className="mb-8">
                    <h2 className="tp-headline text-4xl md:text-5xl lg:text-6xl font-bold font-bricolage text-[#0B0B0F] leading-tight mb-6 opacity-0">
                        When Movement Flows, <span className="text-[#22075e]">Cities Breathe.</span>
                    </h2>

                    {/* Metrics area removed as per user request */}

                    <p className="tp-subtext-item text-2xl font-bold text-[#0B0B0F] mb-10 leading-snug opacity-0">
                        Orbit isn’t a wallet.<br />
                        It’s a <span className="text-[#22075e]">throughput engine.</span>
                    </p>

                    <button className="tp-cta group relative inline-flex items-center gap-2 px-8 py-4 bg-[#22075e] text-white rounded-full font-bold text-lg shadow-lg hover:shadow-[0_0_25px_rgba(108,59,255,0.5)] active:scale-95 transition-all duration-300 opacity-0">
                        <span>Upgrade Your NCMC</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />

                        {/* Subtle Glow Overlay */}
                        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </button>
                </div>
            </div>

            {/* RIGHT SIDE (Visual – 60%) */}
            <div className="w-full md:w-[60%] h-full relative overflow-hidden bg-[#0F172A] flex items-center justify-center">

                {/* Visual Background - Asset */}
                <div
                    ref={visualRef}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={throughputBg}
                        alt="Metro Gate Environment"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Light Trails (GSAP Animated) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="light-trail absolute h-[2px] w-[200px] bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent"
                            style={{
                                top: `${30 + (i * 15)}%`,
                                left: '-20%',
                                opacity: 0.6,
                                filter: 'blur(2px)'
                            }}
                        />
                    ))}
                </div>

                {/* Visual Glow (Expansion Effect) */}
                <div className="visual-glow absolute inset-0 bg-transparent pointer-events-none z-20 mix-blend-overlay"></div>
            </div>
        </div>
    );
}
