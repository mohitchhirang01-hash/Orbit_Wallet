import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router-dom";
import rupayLogo from "../assets/rupay_logo.png";

// Register ScrollTrigger - we don't need MotionPathPlugin anymore
gsap.registerPlugin(ScrollTrigger);

export default function FloatingCard() {
    const containerRef = useRef(null);

    // Refs for animation layers
    const scrollRef = useRef(null); // Layer 1: Moves the card across the screen (Scroll)
    const floatRef = useRef(null);  // Layer 2: Constant bobbing up/down (Idle)
    const tiltRef = useRef(null);   // Layer 3: Tilts based on mouse position (Interactive)
    const lightRef = useRef(null);  // Layer 4: Shiny light reflection effect

    const location = useLocation();
    const [isHome, setIsHome] = useState(location.pathname === "/");

    // Check if we are on the Home page
    useEffect(() => {
        setIsHome(location.pathname === "/");
    }, [location]);

    useGSAP(() => {
        // ===========================================================================
        // 1. MOUSE TILT EFFECT (Interactive)
        // ===========================================================================
        const handleMouseMove = (e) => {
            if (!isHome && window.innerWidth < 768) return;
            const { clientX, clientY, innerWidth, innerHeight } = window;
            const xPos = (clientX / innerWidth - 0.5) * 2;
            const yPos = (clientY / innerHeight - 0.5) * 2;

            gsap.to(tiltRef.current, {
                rotationY: xPos * 8,
                rotationX: -yPos * 8,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto"
            });
        };
        window.addEventListener("mousemove", handleMouseMove);

        // ===========================================================================
        // 2. MASTER SCROLL ANIMATION (The Journey)
        // ===========================================================================
        if (isHome) {
            ScrollTrigger.matchMedia({
                "(min-width: 768px)": function () {
                    const card = scrollRef.current;

                    // INITIAL POSITION (Hero Section)
                    gsap.set(card, {
                        position: "fixed",
                        top: "60%",
                        left: "52%",
                        xPercent: -50,
                        yPercent: -50,
                        x: "0vw",
                        y: "0vh",
                        scale: 0.85,
                        rotation: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        zIndex: 10 // Above backgrounds, below text
                    });

                    // MASTER TIMELINE - Single ScrollTrigger attached to BODY
                    const cardTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: "body", // Robust trigger
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 1
                        }
                    });

                    cardTl
                        // =========================================================
                        // 1. HERO -> INTEROPERABILITY
                        // =========================================================
                        .to(card, {
                            x: "-35vw",
                            y: "25vh",
                            rotation: 15,
                            scale: 1.2,
                            ease: "power1.inOut",
                            duration: 1
                        })

                        // =========================================================
                        // 2. TO MEET ORBIT
                        // =========================================================
                        .to(card, {
                            rotation: 0,
                            x: "30vw",
                            y: "-32vh",
                            scale: 0.8,
                            ease: "power1.inOut",
                            duration: 1
                        })

                        // =========================================================
                        // 3. TO UNIFICATION
                        // =========================================================
                        .to(card, {
                            rotation: 10,
                            x: "-12vw",
                            y: "20vh",
                            scale: 1.1,
                            ease: "power1.inOut",
                            duration: 1,
                            opacity: 0.2 // User requested opacity change here? Checking history.. yes user added opacity: "0.2"
                        })

                        // =========================================================
                        // 4. TO HORIZONTAL SCROLL (SLIDE 1: FRAGMENTED)
                        // =========================================================
                        .to(card, {
                            x: "40vw",
                            y: "-40vh",
                            rotation: 15,
                            scale: 1,
                            ease: "power1.inOut",
                            duration: 1,
                            opacity: 0.8
                        })

                        // =========================================================
                        // 5. HORIZONTAL SLIDE 2 (FRICTION)
                        // =========================================================
                        .to(card, {
                            opacity: 0, // Hidden during friction
                            filter: "blur(4px)",
                            x: "80vw",
                            y: "-110vh",
                            rotation: 360,
                            scale: 0.1,
                            ease: "power1.inOut",
                            duration: 1
                        })

                        // =========================================================
                        // 6. HORIZONTAL SLIDE 3 (EASE / SOLUTION)
                        // =========================================================
                        .to(card, {
                            opacity: 1,
                            filter: "blur(0px)",
                            scale: 1.3, // User requested 1.3
                            x: "20vw", // User requested -20vw
                            rotation: 1,
                            ease: "power1.inOut",
                            duration: 1
                        })


                        .to(card, {
                            opacity: 1,
                            filter: "blur(0px)",
                            scale: 1.3, // User requested 1.3
                            x: "-20vw", // User requested -20vw
                            rotation: 0,
                            ease: "power1.inOut",
                            duration: 3
                        });

                },

                "(max-width: 767px)": function () {
                    // Simple Mobile Logic
                    const card = scrollRef.current;
                    gsap.set(card, {
                        position: "fixed",
                        top: "60%",
                        left: "52%",
                        xPercent: -50,
                        yPercent: -50,
                        scale: 0.6,
                        opacity: 1,
                        zIndex: 10
                    });

                    gsap.to(card, {
                        scrollTrigger: {
                            trigger: "body",
                            start: "top top",
                            end: "15% top",
                            scrub: 1
                        },
                        opacity: 0,
                        y: -50
                    });
                }
            });
        } else {
            gsap.set(scrollRef.current, { opacity: 0 });
        }

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, { scope: containerRef, dependencies: [isHome] });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
            aria-hidden="true"
        >
            {/* 3D Perspective Container */}
            <div className="relative w-full h-full flex items-center justify-center perspective-[1400px]">

                {/* Layer 1: SCROLL (Moves x/y/rotation based on scroll) */}
                <div ref={scrollRef} className="will-change-transform preserve-3d">

                    {/* Layer 2: FLOAT (Idle bobbing) */}
                    <div ref={floatRef} className="will-change-transform preserve-3d">

                        {/* Layer 3: TILT (Mouse interaction) */}
                        <div ref={tiltRef} className="floating-card relative w-[340px] h-[215px] rounded-2xl shadow-2xl preserve-3d will-change-transform"
                            style={{
                                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                            }}
                        >
                            {/* Visual Content of the Card */}
                            <div className="absolute inset-0 rounded-2xl overflow-hidden p-6 flex flex-col justify-between"
                                style={{
                                    background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", // Deep Indigo/Blue
                                }}
                            >
                                {/* Background "Orbit" Text */}
                                <div className="absolute -top-4 -right-4 text-[9rem] font-bold text-white/[0.03] select-none leading-none tracking-tighter pointer-events-none">
                                    Orbit
                                </div>

                                {/* Top Row: Contactless & Chip (Actually standard layouts have these separate or top/bottom) */}
                                {/* Based on image: Contactless waves top left. Chip middle right. */}

                                <div className="max-w-full flex justify-between items-start relative z-10 w-full">
                                    {/* Contactless Icon (Waves) */}
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white/20">
                                        <path d="M8.5 10C9.37 9.13 10.57 8.64 11.8 8.64C13.03 8.64 14.23 9.13 15.1 10M5.5 13C7.24 11.26 9.64 10.29 12.1 10.29C14.56 10.29 16.96 11.26 18.7 13M2.5 16C5.11 13.39 8.71 11.93 12.4 11.93C16.09 11.93 19.69 13.39 22.3 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                        <path d="M12 12L12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="opacity-0" /> {/* Hack to keep size */}
                                    </svg>
                                </div>




                                <div className="absolute top-1/2 right-6 -translate-y-1/2 z-30">
                                    {/* EMV Chip */}
                                    <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500 flex items-center justify-center overflow-hidden relative shadow-sm border border-yellow-600/50">
                                        <div className="absolute inset-0 border-[0.5px] border-black/20 rounded-[2px] m-[2px]" />
                                        <div className="w-full h-[1px] bg-black/20 absolute top-1/2 -translate-y-1/2" />
                                        <div className="h-full w-[1px] bg-black/20 absolute left-1/2 -translate-x-1/2" />
                                        <div className="absolute top-1/2 left-1/2 w-4 h-4 border border-black/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                </div>


                                {/* Bottom Row: View Details & Logo */}
                                <div className="relative z-10 flex justify-between items-end mt-auto">
                                    {/* View Details */}
                                    <div className="flex items-center gap-2 group cursor-pointer">
                                        <div className="p-1.5 rounded-full bg-white text-[#1e1b4b]">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        </div>
                                        <span className="text-white font-medium text-sm group-hover:text-cyan-300 transition-colors">View Details</span>
                                    </div>

                                    {/* RuPay Logo section */}
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 justify-end translate-y-2">
                                            <img src={rupayLogo} alt="RuPay" className="h-16 w-auto object-contain" />
                                        </div>
                                        <div className="text-white/80 text-xs font-bold tracking-wide">Prepaid</div>
                                    </div>
                                </div>

                                {/* Noise Texture Overlay */}
                                <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                                />

                                {/* Layer 4: Light Reflection */}
                                <div ref={lightRef} className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.0) 50%)", mixBlendMode: "overlay" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
