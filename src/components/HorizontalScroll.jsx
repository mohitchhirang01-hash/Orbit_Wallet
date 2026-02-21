import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import FrictionSection from './FrictionSection';
import ThroughputSection from './ThroughputSection';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const [horizontalTween, setHorizontalTween] = useState(null);

    useGSAP(() => {
        const slides = gsap.utils.toArray('.horizontal-slide');

        if (slides.length === 0) return;

        const totalWidth = 100 * (slides.length - 1); // e.g., 300% for 4 slides

        // Main Horizontal Scroll Tween
        const tween = gsap.to(slides, {
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

        setHorizontalTween(tween);

        // STRUGGLE SECTION ANIMATIONS (Slide 2)
        // Uses containerAnimation to sync with the horizontal scroll
        const struggleTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".struggle-stage",
                containerAnimation: tween,
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

    }, { scope: containerRef });

    return (
        <section
            id="horizontal-scroll-section"
            ref={containerRef}
            className="relative w-full md:h-screen overflow-hidden bg-white text-slate-900 py-12 md:py-0"
        >
            {/* HORIZONTAL TRACK - 200vw Total Width (2 slides) */}
            <div
                ref={trackRef}
                className="flex w-[200vw] h-full"
            >
                {/* SLIDE 1: THE PROBLEM - FRICTION SECTION */}
                <div className="horizontal-slide w-screen h-full flex-shrink-0 relative bg-[#F7F9FC]">
                    <FrictionSection />
                </div>

                {/* SLIDE 2: THROUGHPUT IMPACT - RESOLUTION */}
                <div className="horizontal-slide w-screen h-full flex-shrink-0 relative overflow-hidden bg-[#FAFBFF]">
                    <ThroughputSection containerAnimation={horizontalTween} />
                </div>

            </div>
        </section>
    );
}
