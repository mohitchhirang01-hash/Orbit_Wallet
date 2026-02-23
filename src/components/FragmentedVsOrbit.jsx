import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

import orbitCard from '../assets/card.webp';

const orbitNodes = [
    { label: 'Bus', icon: '🚌', angle: -90 },
    { label: 'Metro', icon: '🚆', angle: -45 },
    { label: 'Parking', icon: '🅿️', angle: 0 },
    { label: 'Retail + Ecom', icon: '🛍️', angle: 45 },
    { label: 'EV Charging', icon: '⚡', angle: 90 },
    { label: 'Tolls', icon: '🛣️', angle: 135 },
    { label: 'Ferry', icon: '⛴️', angle: 180 },
    { label: 'Cab', icon: '🚕', angle: 225 },
];

const toRad = (deg) => (deg * Math.PI) / 180;

const InteroperabilityOverview = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const card = containerRef.current.querySelector('.orbit-card-center');
            const nodes = containerRef.current.querySelectorAll('.orbit-node-container');

            // Pop out card
            gsap.fromTo(card,
                { scale: 0.2, opacity: 0, rotationY: -30, rotationX: 20 },
                {
                    scale: 1,
                    opacity: 1,
                    rotationY: 0,
                    rotationX: 0,
                    duration: 1.2,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%'
                    }
                }
            );

            // Continuous Floating effect for card
            gsap.to(card, {
                y: -15,
                rotationZ: 1.5,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1.2
            });

            // Pop out nodes
            gsap.fromTo(nodes,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 65%'
                    }
                }
            );

            // Continuous Orbital Animation around the card
            // We rotate the entire wrapper to orbit the items
            const orbitWrap = containerRef.current.querySelector('.orbit-nodes-wrapper');
            gsap.to(orbitWrap, {
                rotationZ: 360,
                duration: 40,
                repeat: -1,
                ease: "linear"
            });

            // We counter-rotate the individual nodes so they stay upright
            nodes.forEach((node) => {
                gsap.to(node, {
                    rotationZ: -360,
                    duration: 40,
                    repeat: -1,
                    ease: "linear"
                });
            });

        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full py-4 md:py-8 bg-white border-b border-slate-100 overflow-visible relative z-20">
            <div ref={containerRef} className="max-w-6xl mx-auto flex items-center justify-center relative h-[450px] md:h-[650px] z-20">

                {/* Subtle radial glowing backdrop for the card */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-radial from-[#22075e]/10 to-transparent blur-[60px] rounded-full"></div>
                </div>

                {/* Center Card */}
                <div className="orbit-card-center z-20 absolute w-[240px] sm:w-[320px] md:w-[480px]">
                    <img
                        src={orbitCard}
                        alt="Orbit Wallet Card"
                        className="w-full h-auto drop-shadow-2xl"
                    />
                </div>

                {/* Orbit Nodes Wrapper */}
                <div className="orbit-nodes-wrapper absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                    {orbitNodes.map((n, i) => {
                        // Use an elliptical spread to better frame the rectangular card
                        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
                        const isMobile = screenWidth < 640;
                        const isTablet = screenWidth >= 640 && screenWidth < 1024;

                        // Elliptical radii for X (width) and Y (height)
                        const rx = isMobile ? 180 : (isTablet ? 260 : 420);
                        const ry = isMobile ? 140 : (isTablet ? 200 : 250);

                        const rad = toRad(n.angle);
                        const nx = rx * Math.cos(rad);
                        const ny = ry * Math.sin(rad);

                        return (
                            <div
                                key={i}
                                className="orbit-node-container absolute flex flex-col items-center justify-center gap-2 md:gap-3 pointer-events-auto z-40"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    // Start at -50% to center the div itself on the origin, then add the orbital radius
                                    transform: `translate(calc(-50% + ${nx}px), calc(-50% + ${ny}px))`,
                                }}
                            >
                                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full flex items-center justify-center text-3xl md:text-4xl hover:scale-110 transition-transform duration-300">
                                    <span className="drop-shadow-sm">{n.icon}</span>
                                </div>
                                <span className="absolute top-[100%] mt-2 font-bricolage font-bold text-slate-800 text-xs sm:text-sm md:text-base bg-white/95 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm border border-slate-100 whitespace-nowrap">
                                    {n.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};


// ════════════════════════════════════════════════════════════════════════════
// SECTION 6 – STRATEGIC OUTCOME
// ════════════════════════════════════════════════════════════════════════════
const StrategicOutcome = () => {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            const items = ref.current.querySelectorAll('.outcome-item');
            gsap.fromTo(items,
                { opacity: 0, y: 18 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.55,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top 80%'
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <div ref={ref} className="w-full py-16 px-8 md:px-16 bg-[#fafbff]">
            <div className="max-w-3xl mx-auto text-center">

                <h2 className="outcome-item opacity-0 font-bricolage font-bold text-slate-900 text-[clamp(1.4rem,2.3vw,2.2rem)] leading-tight">
                    From Fragmentation to{' '}
                    <span className="text-[#22075e]">Unified Mobility Infrastructure.</span>
                </h2>
            </div>
        </div>
    );
};

// ════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ════════════════════════════════════════════════════════════════════════════
const FragmentedVsOrbit = () => (
    <div className="w-full bg-white">
        {/* New Header Section - "No hassle" */}
        <div className="w-full pt-20 pb-4 px-8 md:px-[8%] bg-white flex flex-col items-center justify-center text-center">
            <div className="max-w-4xl w-full mx-auto space-y-3">
                <h2 className="font-bricolage font-bold text-4xl md:text-6xl lg:text-7xl text-[#22075e] leading-[1.1] tracking-tight">
                    No hassle of carrying <span>multiple cards</span> at once.
                </h2>
                <p className="text-slate-500 text-lg md:text-xl font-medium font-inter">
                    Simplify your wallet. Simplify your life.
                </p>
            </div>
        </div>

        <InteroperabilityOverview />
        <StrategicOutcome />
    </div>
);

export default FragmentedVsOrbit;
