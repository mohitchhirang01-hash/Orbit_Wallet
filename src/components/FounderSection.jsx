import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import founderImg from '../assets/aman.png'; // Using existing image as placeholder

gsap.registerPlugin(ScrollTrigger);

export default function FounderSection() {
    const sectionRef = useRef(null);
    const headlineRef = useRef(null);
    const paragraphsRef = useRef(null);
    const imageRef = useRef(null);
    const glowRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;
        const headline = headlineRef.current;
        const paragraphs = paragraphsRef.current;
        const image = imageRef.current;
        const glow = glowRef.current;

        // Initial page load animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Fade in container
        tl.fromTo(section,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
        );

        // Stagger headline words
        if (headline) {
            const words = headline.querySelectorAll('.word');
            tl.fromTo(words,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" },
                "-=0.8"
            );
        }

        // Paragraphs fade up
        if (paragraphs) {
            tl.fromTo(paragraphs.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
                "-=0.4"
            );
        }

        // Image reveal
        if (image) {
            tl.fromTo(image,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" },
                "-=1"
            );
        }

        // Continuous floating animation for image
        if (image) {
            gsap.to(image, {
                y: -12,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        // Scroll trigger for glow intensification
        ScrollTrigger.create({
            trigger: section,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
            onEnter: () => {
                gsap.to(glow, { opacity: 0.25, duration: 0.6 });
            },
            onLeave: () => {
                gsap.to(glow, { opacity: 0.15, duration: 0.6 });
            },
            onEnterBack: () => {
                gsap.to(glow, { opacity: 0.25, duration: 0.6 });
            },
            onLeaveBack: () => {
                gsap.to(glow, { opacity: 0.15, duration: 0.6 });
            }
        });

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-white py-24 md:py-32 px-6 overflow-hidden"
        >
            {/* Background subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/20 to-white pointer-events-none"></div>

            <div className="relative max-w-[1200px] mx-auto">
                {/* Two Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* LEFT COLUMN - Text Content */}
                    <div className="order-2 lg:order-1">
                        {/* Section Tag */}
                        <div className="inline-block mb-8">
                            <span className="uppercase tracking-[0.2em] text-xs font-semibold bg-purple-100/50 text-purple-700 px-4 py-2 rounded-full">
                                From the Founders
                            </span>
                        </div>

                        {/* Headline */}
                        <h2
                            ref={headlineRef}
                            className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.1] mb-8 text-slate-900 font-bricolage"
                        >
                            <span className="word inline-block">Building</span>{' '}
                            <span className="word inline-block">the</span>{' '}
                            <span className="word inline-block">rails</span>{' '}
                            <span className="word inline-block">for</span>{' '}
                            <span className="word inline-block">a</span>{' '}
                            <span className="word inline-block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">unified</span>{' '}
                            <span className="word inline-block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">New Bharat.</span>
                        </h2>

                        {/* Founder Message Paragraphs */}
                        <div ref={paragraphsRef} className="space-y-6 max-w-[600px] mb-10">
                            <p className="text-[#5f6b7a] leading-[1.7] text-base md:text-lg font-normal">
                                We call ourselves a "digital nation," yet 90% of our daily transit relies on physical cash and paper tickets. In a world where everything is on-demand, standing in a line at an AVM to "claim" a digital recharge isn't just a hassle—it's a massive failure of imagination.
                            </p>
                            <p className="text-[#5f6b7a] leading-[1.7] text-base md:text-lg font-normal">
                                <span className="font-semibold text-slate-900">We are here to build the{' '}
                                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">infrastructure of Flow.</span>
                                </span>{' '}
                                <a href="/ncmc-documentation" className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all">NCMC</a> is a national breakthrough, but it has been waiting for an interface that actually works. We've vertically integrated the journey to{' '}
                                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold">delete the "Pause"</span> entirely. It's a{' '}
                                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold">universal key</span>—a single, sovereign tap that unlocks a metro gate, a city bus, your college campus, or an IPL stadium.
                            </p>
                            <p className="text-[#5f6b7a] leading-[1.7] text-base md:text-lg font-normal">
                                <span className="font-semibold text-slate-900">The goal is{' '}
                                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">100x efficiency.</span>
                                </span>{' '}
                                We are reclaiming the millions of hours India loses to the queue and giving them back to the people building the future. The technology should be invisible; the movement should be absolute. No more counters, no more silos, and no more waiting.
                            </p>
                            <p className="text-slate-900 leading-[1.7] text-base md:text-lg font-bold">
                                Join the Orbit. Move the Nation.
                            </p>
                        </div>

                        {/* Signature */}
                        <div className="mt-10">
                            <p className="text-slate-900 font-bold text-lg mb-1">— Mohit Sharma</p>
                            <p className="text-slate-500 text-sm font-medium">Co-Founder, Orbit Wallet</p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Founder Image */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                        <div className="relative">
                            {/* Radial glow background */}
                            <div
                                ref={glowRef}
                                className="absolute inset-0 opacity-15"
                                style={{
                                    background: 'radial-gradient(circle at center, rgba(120, 90, 255, 0.4), transparent 70%)',
                                    filter: 'blur(60px)',
                                    transform: 'scale(1.5)'
                                }}
                            ></div>

                            {/* Subtle orbit ring SVG (background) */}
                            <svg
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-5 pointer-events-none"
                                viewBox="0 0 400 400"
                            >
                                <circle
                                    cx="200"
                                    cy="200"
                                    r="180"
                                    fill="none"
                                    stroke="url(#orbitGradient)"
                                    strokeWidth="2"
                                    strokeDasharray="8 8"
                                />
                                <defs>
                                    <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#7C5CFF" />
                                        <stop offset="100%" stopColor="#5E3BFF" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Image container with glass effect */}
                            <div
                                ref={imageRef}
                                className="relative rounded-3xl overflow-hidden group transition-all duration-400 hover:scale-[1.02]"
                                style={{
                                    boxShadow: '0 30px 80px rgba(100, 80, 255, 0.15)'
                                }}
                            >
                                {/* Glass blur card behind */}
                                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-30"></div>

                                {/* Founder Image */}
                                <img
                                    src={founderImg}
                                    alt="Mohit Sharma - Co-Founder"
                                    className="relative z-10 w-full h-auto object-cover rounded-3xl max-w-[400px] md:max-w-[450px]"
                                />

                                {/* Hover glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:via-purple-500/10 group-hover:to-purple-500/5 transition-all duration-400 pointer-events-none rounded-3xl"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
