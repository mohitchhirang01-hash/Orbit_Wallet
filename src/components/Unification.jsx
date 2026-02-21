import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import BlurText from './BlurText';
import unificationBg from '../assets/oneNation_bg.png';

gsap.registerPlugin(ScrollTrigger);

export default function Unification() {
    const containerRef = useRef(null);
    const raysContainerRef = useRef(null);
    const headlineRef = useRef(null);
    const supportingCopyRef = useRef(null);
    const closingLineRef = useRef(null);

    useGSAP(() => {
        // Animate connection rays
        const rays = gsap.utils.toArray('.connection-ray');

        // Initial draw animation
        gsap.fromTo(rays,
            {
                strokeDashoffset: 2000,
                opacity: 0
            },
            {
                strokeDashoffset: 0,
                opacity: 0.7,
                duration: 2,
                stagger: {
                    each: 0.15,
                    from: "random"
                },
                ease: 'power2.inOut',
                delay: 0.5
            }
        );

        // Continuous breathing pulse animation
        rays.forEach((ray, index) => {
            // Phase offset for each ray
            const delay = index * 0.3;

            // Opacity breathing
            gsap.to(ray, {
                opacity: 0.9,
                duration: 2 + (index * 0.2),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: delay
            });

            // Subtle stroke width pulse
            gsap.to(ray, {
                attr: { 'stroke-width': 3.5 },
                duration: 3 + (index * 0.3),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: delay
            });

            // Energy flow animation via dash offset
            gsap.to(ray, {
                strokeDashoffset: -2000,
                duration: 15 + (index * 2),
                repeat: -1,
                ease: 'none',
                delay: delay
            });
        });

        // Scroll-based effects
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom top',
            onEnter: () => {
                gsap.to(rays, {
                    opacity: 0.8,
                    duration: 1,
                    ease: 'power2.out'
                });
            },
            onLeave: () => {
                gsap.to(rays, {
                    opacity: 0.3,
                    duration: 1,
                    ease: 'power2.in'
                });
            },
            onEnterBack: () => {
                gsap.to(rays, {
                    opacity: 0.8,
                    duration: 1,
                    ease: 'power2.out'
                });
            }
        });

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full md:h-screen bg-gradient-to-br from-[#FAFBFF] via-white to-[#F5F3FF] overflow-hidden py-12 md:py-0"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none mobile-hide-bg">
                <img
                    src={unificationBg}
                    alt="Orbit Wallet connecting India"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Animated Connection Rays SVG Overlay */}
            <svg
                ref={raysContainerRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-[1] hidden md:block"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    {/* Gradient definitions for rays */}
                    <linearGradient id="ray-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.7" />
                    </linearGradient>

                    <linearGradient id="ray-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.7" />
                        <stop offset="50%" stopColor="#22075e" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#EC4899" stopOpacity="0.6" />
                    </linearGradient>

                    <linearGradient id="ray-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.7" />
                        <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#F97316" stopOpacity="0.6" />
                    </linearGradient>

                    {/* Glow filter for soft outer glow */}
                    <filter id="ray-glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* 
                    CONNECTION RAYS
                    Card anchor point (left): approximately x=400, y=540 (center-left of viewport)
                    India map points (right): various coordinates representing major cities
                    
                    Coordinates are tuned for 1920x1080 viewport, scale responsively via viewBox
                    Adjust control points (C commands) to modify curve shape
                */}

                {/* Ray 1: Card → North-ish */}
                <path
                    className="connection-ray"
                    d="M 400 540 C 500 500, 700 450, 900 480"
                    fill="none"
                    stroke="url(#ray-gradient-1)"
                    strokeWidth="2.5"
                    strokeDasharray="2000"
                    strokeDashoffset="2000"
                    strokeLinecap="round"
                    filter="url(#ray-glow)"
                    opacity="0"
                />

                {/* Ray 2: Card → West-ish */}
                <path
                    className="connection-ray"
                    d="M 400 540 C 500 520, 700 540, 850 560"
                    fill="none"
                    stroke="url(#ray-gradient-2)"
                    strokeWidth="2.5"
                    strokeDasharray="2000"
                    strokeDashoffset="2000"
                    strokeLinecap="round"
                    filter="url(#ray-glow)"
                    opacity="0"
                />

                {/* Ray 3: Card → South-ish */}
                <path
                    className="connection-ray"
                    d="M 400 540 C 500 580, 650 640, 800 660"
                    fill="none"
                    stroke="url(#ray-gradient-3)"
                    strokeWidth="2.5"
                    strokeDasharray="2000"
                    strokeDashoffset="2000"
                    strokeLinecap="round"
                    filter="url(#ray-glow)"
                    opacity="0"
                />

                {/* Ray 4: Card → Southeast-ish */}
                <path
                    className="connection-ray"
                    d="M 400 540 C 550 580, 750 630, 900 650"
                    fill="none"
                    stroke="url(#ray-gradient-1)"
                    strokeWidth="2.5"
                    strokeDasharray="2000"
                    strokeDashoffset="2000"
                    strokeLinecap="round"
                    filter="url(#ray-glow)"
                    opacity="0"
                />

                {/* Ray 5: Card → East-ish (Shortened) */}
                <path
                    className="connection-ray"
                    d="M 400 540 C 550 530, 750 500, 950 520"
                    fill="none"
                    stroke="url(#ray-gradient-2)"
                    strokeWidth="2.5"
                    strokeDasharray="2000"
                    strokeDashoffset="2000"
                    strokeLinecap="round"
                    filter="url(#ray-glow)"
                    opacity="0"
                />

                {/* Ray 6: Card → Central-ish */}
                <path
                    className="connection-ray"
                    d="M 400 540 C 550 540, 700 560, 850 580"
                    fill="none"
                    stroke="url(#ray-gradient-3)"
                    strokeWidth="2.5"
                    strokeDasharray="2000"
                    strokeDashoffset="2000"
                    strokeLinecap="round"
                    filter="url(#ray-glow)"
                    opacity="0"
                />

                {/* Ray 7: Card → Southwest-ish */}
                <path
                    className="connection-ray"
                    d="M 400 540 C 500 560, 600 640, 750 680"
                    fill="none"
                    stroke="url(#ray-gradient-1)"
                    strokeWidth="2.5"
                    strokeDasharray="2000"
                    strokeDashoffset="2000"
                    strokeLinecap="round"
                    filter="url(#ray-glow)"
                    opacity="0"
                />

                {/* Ray 8: Card → Near West */}
                <path
                    className="connection-ray"
                    d="M 400 540 C 500 540, 600 550, 700 560"
                    fill="none"
                    stroke="url(#ray-gradient-2)"
                    strokeWidth="2.5"
                    strokeDasharray="2000"
                    strokeDashoffset="2000"
                    strokeLinecap="round"
                    filter="url(#ray-glow)"
                    opacity="0"
                />


            </svg>

            {/* Subtle Purple Glow Background */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-[2]">
                <div className="w-full h-full rounded-full bg-gradient-radial from-[#22075e]/10 to-transparent blur-3xl" />
            </div>

            {/* Main Layout Container */}
            <div className="relative w-full md:h-full flex items-center justify-end px-4 md:px-16 z-40">

                {/* Centered Text Content */}
                <div className="relative w-full max-w-4xl h-full flex flex-col items-end justify-center text-right">
                    {/* Headline */}
                    <h2
                        ref={headlineRef}
                        className="font-bricolage font-bold text-4xl md:text-6xl lg:text-7xl mb-16 md:mb-20 leading-tight"
                    >
                        <BlurText text="One" className="text-[#0B0B0F]" animateBy="chars" />{' '}
                        <BlurText text="Nation" className="text-[#22075e]" animateBy="chars" delay={0.1} />.<br />
                        <BlurText text="One" className="text-[#0B0B0F]" animateBy="chars" delay={0.2} />{' '}
                        <BlurText text="Card" className="text-[#22075e]" animateBy="chars" delay={0.3} />.<br />
                        <BlurText text="Zero" className="text-[#0B0B0F]" animateBy="chars" delay={0.4} />{' '}
                        <BlurText text="Friction" className="text-[#22075e]" animateBy="chars" delay={0.5} />.
                    </h2>

                    {/* Supporting Copy */}
                    <div ref={supportingCopyRef} className="mb-6">
                        <p className="text-slate-600 text-lg md:text-xl font-medium font-inter leading-relaxed mb-3">
                            <BlurText
                                text="We have unified the fragmented layers of"
                                animateBy="words"
                                delay={0.6}
                            /><br />
                            <BlurText
                                text="Indian transit into a single, sovereign tap."
                                animateBy="words"
                                delay={0.7}
                            />
                        </p>
                        <p className="text-slate-600 text-lg md:text-xl font-medium font-inter leading-relaxed">
                            <BlurText
                                text="One card to move the country."
                                animateBy="words"
                                delay={0.8}
                            /><br />
                            <BlurText
                                text="One app to manage the journey."
                                animateBy="words"
                                delay={0.9}
                            />
                        </p>
                    </div>

                    {/* Closing Line */}
                    <p
                        ref={closingLineRef}
                        className="text-[#22075e] text-xl md:text-2xl font-inter font-semibold mt-8"
                    >
                        <BlurText
                            text="“Interoperability isn't a feature,"
                            animateBy="words"
                            delay={1.0}
                        />{" "}
                        <BlurText
                            text="It's the end of friction.”"
                            animateBy="words"
                            delay={1.2}
                        />
                    </p>
                </div>
            </div>
        </section>
    );
}
