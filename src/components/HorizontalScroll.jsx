import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import FragmentedVsOrbit from './FragmentedVsOrbit';
import FrictionSection from './FrictionSection';
import ease1 from '../assets/ease_1.png';
import ease2 from '../assets/ease_2.png';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
    const containerRef = useRef(null);
    const trackRef = useRef(null);

    useGSAP(() => {
        const slides = gsap.utils.toArray('.horizontal-slide');

        if (slides.length === 0) return;

        // SPLIT SCREEN ANIMATIONS REMOVED


        const totalWidth = 100 * (slides.length - 1); // e.g., 300% for 4 slides

        // Main Horizonta   l Scroll Tween
        const horizontalTween = gsap.to(slides, {
            xPercent: -100 * (slides.length - 1),
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                // Scroll duration proportional to number of slides
                end: () => `+=${containerRef.current.offsetWidth * (slides.length - 1)}`,
                snap: 1 / (slides.length - 1),
                markers: false
            }
        });

        // STRUGGLE SECTION ANIMATIONS (Slide 2)
        // Uses containerAnimation to sync with the horizontal scroll
        const struggleTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".struggle-stage",
                containerAnimation: horizontalTween,
                start: "left center",
                end: "right center",
                scrub: true,
                id: "struggle"
            }
        });

        // Scene 2 reveal (Slides up)
        struggleTimeline.fromTo(".scene-2",
            { y: "100%" },
            { y: "0%", ease: "none", duration: 1 }
        );

        // Scene 3 reveal (Slides up)
        struggleTimeline.fromTo(".scene-3",
            { y: "100%" },
            { y: "0%", ease: "none", duration: 1 }
        );

        // Parallax / Depth Effect for previous scenes
        // Scene 1 fades and darkens as Scene 2 enters
        struggleTimeline.to(".scene-1", {
            y: "20%",
            filter: "brightness(0.5)",
            ease: "none",
            duration: 1
        }, 0);

        // Scene 2 fades and darkens as Scene 3 enters
        struggleTimeline.to(".scene-2", {
            filter: "brightness(0.5)",
            ease: "none",
            duration: 1
        }, 1);

        // SOLUTION SECTION ANIMATIONS (Slide 3)
        // Looping animation for 3 images
        const loopTimeline = gsap.timeline({
            repeat: -1,
            repeatDelay: 0,
            defaults: { ease: "none", duration: 1.5 }
        });

        // Initial state: Show Image 1, Hide others
        gsap.set(".ease-img-2", { opacity: 0 });
        gsap.set(".ease-img-1", { opacity: 1 });

        // Animation Sequence: 1 -> 2 -> 1
        loopTimeline
            .to(".ease-img-1", { opacity: 0, duration: 1, delay: 2 })
            .to(".ease-img-2", { opacity: 1, duration: 1 }, "<")
            .to(".ease-img-2", { opacity: 0, duration: 1, delay: 2 })
            .to(".ease-img-1", { opacity: 1, duration: 1 }, "<");


    }, { scope: containerRef });

    return (
        <section
            id="horizontal-scroll-section"
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden bg-white text-slate-900"
        >
            {/* HORIZONTAL TRACK - 400vw Total Width (4 slides) */}
            <div
                ref={trackRef}
                className="flex w-[400vw] h-full"
            >
                {/* SLIDE 1: THE JOURNEY COMPARISON - FRAGMENTED VS ORBIT */}
                <div className="horizontal-slide w-screen h-full flex-shrink-0 relative">
                    <FragmentedVsOrbit />
                </div>


                {/* SLIDE 2: THE PROBLEM - FRICTION SECTION */}
                <div className="horizontal-slide w-screen h-full flex-shrink-0 relative bg-[#F7F9FC]">
                    <FrictionSection />
                </div>

                {/* SLIDE 3: THE SOLUTION - EASE SECTION */}
                <div className="horizontal-slide w-screen h-full flex flex-col md:flex-row flex-shrink-0 relative overflow-hidden bg-white">

                    {/* LEFT SIDE: TEXT CONTENT (50%) - LIGHT THEME */}
                    <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-8 md:px-20 z-20 relative bg-white/90 backdrop-blur-sm">

                        {/* Heading */}
                        <div className="mb-8 md:mb-12">
                            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20">
                                <span className="text-blue-600 font-mono text-xs tracking-wider">SEAMLESS FLOW</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold font-bricolage leading-tight text-slate-900">
                                Move <br className="hidden md:block" />
                                <span className="text-[#00D1FF]">Without Stopping.</span>
                            </h2>
                            <p className="mt-4 text-slate-500 text-lg max-w-md leading-relaxed">
                                Recharge, manage, and claim your balance inside the app.
                                Because movement should never pause.
                            </p>
                        </div>

                        {/* Solution Points */}
                        <ul className="space-y-3 max-w-sm mb-8">
                            {['Recharge before arrival', 'Skip the machines entirely', 'Walk straight through'].map((item, i) => (
                                <li key={i} className="flex items-center text-slate-600">
                                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 text-green-600 text-xs">✓</div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* Micro Accent */}
                        <p className="text-slate-400 text-sm font-medium italic">
                            "The smarter way to travel."
                        </p>
                    </div>

                    {/* RIGHT SIDE: ANIMATED IMAGE STACK (50%) */}
                    <div className="solution-stage w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-slate-50">


                        {/* Vertical Gradient for Mobile */}
                        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent z-40 md:hidden"></div>

                        {/* IMAGE CONTAINER - Constrained Size, No Frame */}
                        <div className="image-stack relative w-full h-full flex items-center justify-center">
                            <div className="relative w-full max-w-[450px] md:max-w-[600px] aspect-[9/16]">
                                <img
                                    src={ease1}
                                    alt="Ease Solution 1"
                                    className="ease-img-1 absolute inset-0 w-full h-full object-contain object-center z-10"
                                />
                                <img
                                    src={ease2}
                                    alt="Ease Solution 2"
                                    className="ease-img-2 absolute inset-0 w-full h-full object-contain object-center z-10"
                                />
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </section>
    );
}
