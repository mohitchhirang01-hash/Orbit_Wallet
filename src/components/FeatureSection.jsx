import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import FeatureBlock from './FeatureBlock';

// Assets
import featureImage1 from '../assets/update_and_check_balance.png';
import featureImage2 from '../assets/double_tap_feature.png';

gsap.registerPlugin(ScrollTrigger);

export default function FeatureSection() {
    const sectionRef = useRef(null);
    const blockRefs = useRef([]);

    const features = useMemo(() => [
        {
            title: "Seamless Recharge",
            description: "Top up your prepaid/NCMC wallet instantly. No queues. No waiting.",
            variant: "recharge",
            reversed: false,
            images: [featureImage1]
        },
        {
            title: "Update & Claim Balance Instantly",
            description: "Tap your card to your phone to update your balance. Skip the AVM machines entirely and stay on the move.",
            variant: "tap",
            reversed: false, // Not needed in vertical grid
            images: [featureImage2]
        }
    ], []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                // Synchronized sequence for both side-by-side blocks
                const masterTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                });

                blockRefs.current.forEach((block, i) => {
                    // Stagger intro for the two blocks
                    masterTl.fromTo([block.content, block.visual],
                        { y: 30, opacity: 0, scale: 0.98 },
                        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power4.out" },
                        i * 0.2 // Stagger
                    );


                });
            });

            mm.add("(max-width: 767px)", () => {
                blockRefs.current.forEach((block) => {
                    gsap.fromTo([block.content, block.visual],
                        { y: 20, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            scrollTrigger: {
                                trigger: block.container,
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="features-section"
            ref={sectionRef}
            className="bg-white py-12 md:py-20 overflow-hidden"
            aria-labelledby="features-heading"
        >
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="flex flex-col items-center text-center space-y-3">
                    <span className="text-[#22075e] font-bold tracking-[0.3em] text-[9px] uppercase bg-[#22075e]/5 px-3 py-1 rounded-full">
                        Premium Experience
                    </span>
                    <h2 id="features-heading" className="text-3xl md:text-5xl font-bold font-bricolage text-[#0B0B0F] tracking-tight">
                        Built for the <span className="text-gradient">Next Generation</span>
                    </h2>
                </div>
            </div>

            {/* Grid Container for Side-by-Side View */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-4">
                {features.map((feature, i) => (
                    <FeatureBlock
                        key={i}
                        index={i}
                        feature={feature}
                        ref={el => blockRefs.current[i] = el}
                    />
                ))}
            </div>
        </section>
    );
}
