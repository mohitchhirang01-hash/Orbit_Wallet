import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import founderImg from '../assets/co-founders_image.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function FounderSection() {
    const sectionRef = useRef(null);
    const headlineRef = useRef(null);
    const paragraphsRef = useRef(null);
    const imageColRef = useRef(null);
    const glowRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;
        const headline = headlineRef.current;
        const paragraphs = paragraphsRef.current;
        const imageCol = imageColRef.current;
        const glow = glowRef.current;

        // Premium entrance animation
        const tl = gsap.timeline({

            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
        });

        tl.fromTo(section,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'sine.out' }
        );

        if (headline) {
            const words = headline.querySelectorAll('.word');
            tl.fromTo(words,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: 'power2.out' },
                '-=0.6'
            );
        }

        if (paragraphs) {
            tl.fromTo(paragraphs.children,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
                '-=0.4'
            );
        }

        if (imageCol) {
            tl.fromTo(imageCol,
                { opacity: 0, scale: 0.98, y: 15 },
                { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' },
                '-=0.8'
            );
        }

        // Subtle continuous float
        gsap.to(imageCol, {
            y: -8,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

        // Glow intensification
        ScrollTrigger.create({
            trigger: section,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
            onEnter: () => gsap.to(glow, { opacity: 0.15, duration: 0.6 }),
            onLeave: () => gsap.to(glow, { opacity: 0.05, duration: 0.6 }),
        });

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-white overflow-hidden py-20 md:py-32 px-[5%] lg:px-0"
        >
            {/* Visual Balance: Soft radial purple fade on the right */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 50% 60% at 85% 50%, rgba(124, 58, 237, 0.04) 0%, transparent 80%)',
                }}
            />

            {/* Background subtle gradient anchor */}
            <div
                ref={glowRef}
                className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[40%] h-[60%] blur-[100px] bg-purple-100/30 rounded-full pointer-events-none opacity-0 transition-opacity duration-1000"
            />

            {/* Layout Wrapper: Max width 1200px, centered */}
            <div className="relative max-w-[1200px] mx-auto lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-[60px] items-center">

                    {/* LEFT COLUMN: Typography Hierarchy */}
                    <div className="flex flex-col max-w-[600px] lg:pr-4">
                        {/* Badge */}
                        <div className="mb-6">
                            <span className="inline-block py-1.5 px-4 rounded-full bg-purple-50 text-purple-700 text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase border border-purple-100/50">
                                From the Founders
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h2
                            ref={headlineRef}
                            className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold text-slate-900 leading-[1.15] mb-8 font-bricolage tracking-tight"
                        >
                            <span className="word inline-block">Building</span>{' '}
                            <span className="word inline-block">the</span>{' '}
                            <span className="word inline-block">rails</span>{' '}
                            <span className="word inline-block">for</span>{' '}
                            <span className="word inline-block">a</span>{' '}
                            <br className="hidden md:block" />
                            <span className="word inline-block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">unified</span>{' '}
                            <span className="word inline-block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">New Bharat.</span>
                        </h2>

                        {/* Paragraph Text */}
                        <div
                            ref={paragraphsRef}
                            className="space-y-6 text-gray-500 max-w-[540px]"
                        >
                            <p className="text-[16px] md:text-[17px] leading-[1.7]">
                                We call ourselves a digital nation but sadly, even in the most urban cities 90% of public transportation and daily movement across life relies on physical cash, paper tickets, tokens, multiple IDs and cards. The journey inside a metro or taking a bus is so broken and retard - It’s a massive failure to our systems.
                            </p>
                            <p className="text-[16px] md:text-[17px] leading-[1.7]">
                                <span className="font-semibold text-slate-800">We are here to build the{' '}
                                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">infrastructure of flow.</span>
                                </span>{' '}
                                <a href="/ncmc-documentation" className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold hover:opacity-70 transition-opacity">NCMC</a> is a national breakthrough. We are uncovering it’s true potential and giving it a life. We’ve vertically integrated the journey to{' '}
                                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold">delete the "Pause"</span> entirely. It’s a{' '}
                                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold">universal key</span>—a single, sovereign tap that unlocks a metro gate, a city bus, your college campus, or an event arena.
                            </p>
                            <p className="text-[16px] md:text-[17px] leading-[1.7]">
                                <span className="font-semibold text-slate-800">The goal is to improve{' '}
                                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">efficiency of human movement.</span>
                                </span>{' '}
                                Come on, we are a population of fifty nations packed into a single borders, our movement is a blockage to our nation efficiency. We are reclaiming the millions of hours India loses to the queue and giving them back to the people building the future. The technology should be{' '}
                                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold">invisible</span>; the movement should be{' '}
                                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold">absolute.</span> No more counters, no more silos, and no more waiting.
                            </p>
                            <p className="text-slate-900 font-bold text-[17px] tracking-tight">
                                Join the Orbit Wallet. Move the Nation.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Founder Image Section */}
                    <div
                        ref={imageColRef}
                        className="flex flex-col items-center lg:items-center space-y-8"
                    >
                        {/* Circular Image Wrap */}
                        <div className="relative group">
                            {/* Deep Background Depth */}
                            <div className="absolute inset-0 bg-purple-100/40 rounded-full blur-2xl scale-110 group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                            {/* Circular Image with primary border */}
                            <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full border-[3px] border-[#22075e] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 hover:scale-[1.02] z-10">
                                <img
                                    src={founderImg}
                                    alt="Orbit Wallet Co-Founders"
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                                />
                                {/* Soft inner glow on hover */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>

                        {/* Founder Names and Subtitle */}
                        <div className="flex flex-col items-center w-full max-w-[320px]">
                            {/* Subtle divider line */}
                            <div className="w-12 h-[2px] bg-purple-100 mb-6 rounded-full" />

                            <div className="space-y-2 text-center">
                                <p className="text-slate-900 font-semibold text-lg md:text-xl tracking-tight leading-none font-bricolage">Harshvardhan Zaveri</p>
                                <p className="text-slate-900 font-semibold text-lg md:text-xl tracking-tight leading-none font-bricolage">Aman Bisht</p>
                                <p className="text-slate-900 font-semibold text-lg md:text-xl tracking-tight leading-none font-bricolage">Shikha Chouksey</p>
                            </div>

                            <p className="text-gray-400 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase mt-4">
                                Co-Founders, Orbit Wallet
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
