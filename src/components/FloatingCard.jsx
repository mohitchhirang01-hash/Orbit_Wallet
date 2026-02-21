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
            if (!isHome && window.innerWidth < 1024) return;
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
                "(min-width: 1024px)": function () {
                    const card = scrollRef.current;

                    // INITIAL POSITION (Hero Section)
                    gsap.set(card, {
                        position: "fixed",
                        top: "60%",
                        left: "50%",
                        xPercent: -50,
                        yPercent: -50,
                        x: "0vw",
                        y: "0vh",
                        scale: 0.85,
                        rotation: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        zIndex: 30 // Increased to be above Interoperability content (z-20)
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
                            duration: .7
                        })

                        // =========================================================
                        // 2. TO MEET ORBIT
                        // =========================================================
                        .to(card, {
                            rotation: 0,
                            x: "35vw",
                            y: "-40vh",
                            scale: 0.8,
                            ease: "power1.inOut",
                            duration: .8
                        })

                        // =========================================================
                        // 3. TO UNIFICATION
                        // =========================================================
                        .to(card, {
                            rotation: 10,
                            x: "-62vw",
                            y: "20vh",
                            scale: 0,
                            ease: "power1.inOut",
                            duration: .8,
                            opacity: 0.2 // User requested opacity change here? Checking history.. yes user added opacity: "0.2"
                        })

                        // =========================================================
                        // 4. TO HORIZONTAL SCROLL (SLIDE 1: FRAGMENTED)
                        // =========================================================
                        .to(card, {
                            x: "40vw",
                            y: "-34vh",
                            rotation: 15,
                            scale: 1, // Shrink to 0
                            ease: "power1.inOut",
                            duration: .5,
                            opacity: 1 // Fade out
                        })

                        // =========================================================
                        // 5. HORIZONTAL SLIDE 2 (FRICTION)
                        // =========================================================
                        .to(card, {
                            opacity: .3,
                            filter: "blur(4px)",
                            x: "40vw",
                            y: "10vh",
                            rotation: 360,
                            scale: .5, // Keep hidden
                            ease: "power1.inOut",
                            duration: 1.4,
                            color: "black"
                        })

                        // =========================================================
                        // 6. HORIZONTAL SLIDE 3 (EASE / SOLUTION)
                        // =========================================================
                        .to(card, {
                            opacity: 1,
                            filter: "blur(0px)",
                            scale: .7,
                            x: "200vw",
                            rotation: 360,
                            ease: "power1.inOut",
                            duration: 1
                        })


                        .to(card, {
                            opacity: 1,
                            filter: "blur(0px)",
                            scale: 1.3,
                            x: "-130vw",
                            rotation: 0,
                            ease: "power1.back.out(1.7)",
                            duration: 1
                        })

                        .to(card, {
                            opacity: .8,
                            filter: "blur(0px)",
                            scale: 1,
                            x: "-40vw",
                            y: "-30vh",
                            rotation: -30,
                            ease: "power1.inOut",
                            duration: .3
                        })

                        .to(card, {
                            opacity: 1,
                            filter: "blur(0px)",
                            scale: 1,
                            x: "30vw",
                            rotation: 0,
                            ease: "power1.inOut",
                            duration: .8
                        })

                        .to(card, {
                            opacity: .9,
                            filter: "blur(0px)",
                            scale: 1,
                            x: "-40vw",
                            y: "3vh",
                            rotation: -15,
                            ease: "power1.inOut",
                            duration: .7
                        })

                        .to(card, {
                            opacity: 1,
                            filter: "blur(0px)",
                            scale: 1.3,
                            x: "-40vw",
                            y: "90vh",
                            rotation: 360,
                            duration: 1.1,
                            scale: 1
                        });

                    // =========================================================
                    // OVERLAP DETECTION (Hero Heading)
                    // =========================================================
                    let overlapActive = false;

                    const isOverlapping = (cardEl, itemEl) => {
                        const cardRect = cardEl.getBoundingClientRect();
                        const itemRect = itemEl.getBoundingClientRect();

                        // Reduce inset for the card to expand the detection area
                        // 3% instead of 10% to capture words near the edges
                        const insetW = cardRect.width * 0.03;
                        const insetH = cardRect.height * 0.03;

                        const r1 = {
                            left: cardRect.left + insetW,
                            right: cardRect.right - insetW,
                            top: cardRect.top + insetH,
                            bottom: cardRect.bottom - insetH
                        };

                        const r2 = itemRect;

                        return !(
                            r1.right < r2.left ||
                            r1.left > r2.right ||
                            r1.bottom < r2.top ||
                            r1.top > r2.bottom
                        );
                    };

                    const checkOverlap = () => {
                        const cardElement = document.getElementById('floating-card-main');
                        const overlapItems = document.querySelectorAll('.overlap-item');

                        if (!cardElement || overlapItems.length === 0) return;

                        overlapItems.forEach(item => {
                            const isItemOverlapping = isOverlapping(cardElement, item);
                            const currentlyHasClass = item.classList.contains('is-overlapping');

                            if (isItemOverlapping !== currentlyHasClass) {
                                item.classList.toggle('is-overlapping', isItemOverlapping);
                            }
                        });
                    };

                    // Use GSAP ticker for high-performance continuous checking
                    gsap.ticker.add(checkOverlap);
                    window._checkOverlap = checkOverlap;
                },

                "(max-width: 1023px)": function () {
                    // Card is hidden via CSS on mobile/tablet, no animation needed
                }
            });
        } else {
            gsap.set(scrollRef.current, { opacity: 0 });
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (window._checkOverlap) {
                gsap.ticker.remove(window._checkOverlap);
                delete window._checkOverlap;
            }
        };
    }, { scope: containerRef, dependencies: [isHome] });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-30 overflow-hidden hidden lg:block"
            aria-hidden="true"
        >
            {/* 3D Perspective Container */}
            <div className="relative w-full h-full flex items-center justify-center perspective-[1400px]">

                {/* Layer 1: SCROLL (Moves x/y/rotation based on scroll) */}
                <div ref={scrollRef} className="will-change-transform preserve-3d">

                    {/* Layer 2: FLOAT (Idle bobbing) */}
                    <div ref={floatRef} className="will-change-transform preserve-3d">

                        {/* Layer 3: TILT (Mouse interaction) */}
                        <div ref={tiltRef} id="floating-card-main" className="floating-card relative w-[340px] h-[215px] rounded-2xl shadow-2xl preserve-3d will-change-transform"
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
                                <div className="absolute -top-4 -right-0 text-[6.8rem] font-bold text-white/[0.09] select-none leading-none tracking-tighter pointer-events-none">
                                    Orbit
                                </div>

                                {/* Top Row: Contactless & Chip (Actually standard layouts have these separate or top/bottom) */}
                                {/* Based on image: Contactless waves top left. Chip middle right. */}

                                <div className="absolute top-1/2 right-6 -translate-y-1/2 z-30">
                                    {/* EMV Chip */}
                                    <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500 flex items-center justify-center overflow-hidden relative shadow-sm border border-yellow-600/50">
                                        <div className="absolute inset-0 border-[0.5px] border-black/20 rounded-[2px] m-[2px]" />
                                        <div className="w-full h-[1px] bg-black/20 absolute top-1/2 -translate-y-1/2" />
                                        <div className="h-full w-[1px] bg-black/20 absolute left-1/2 -translate-x-1/2" />
                                        <div className="absolute top-1/2 left-1/2 w-4 h-4 border border-black/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                </div>


                                {/* Bottom Row: Logo only */}
                                <div className="relative z-10 flex justify-end items-end mt-auto">
                                    {/* RuPay Logo section */}
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 justify-end translate-y-5">
                                            <img src={rupayLogo} alt="RuPay" className="h-16 w-auto object-contain" />
                                        </div>
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