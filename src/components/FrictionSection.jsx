import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import queue1 from '../assets/queue_1.png';
import queue2 from '../assets/queue_2.png';


const FrictionSection = () => {
    const containerRef = useRef(null);
    const image1Ref = useRef(null);
    const image2Ref = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

        // Initial state
        gsap.set(image2Ref.current, { opacity: 0 });

        // Loop animation
        tl.to(image1Ref.current, { duration: 1, opacity: 0, delay: 2 })
            .to(image2Ref.current, { duration: 1, opacity: 1 }, "<")
            .to(image2Ref.current, { duration: 1, opacity: 0, delay: 2 })
            .to(image1Ref.current, { duration: 1, opacity: 1 }, "<");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="friction-section w-full h-full bg-[#fff] text-[#0F172A] flex items-center justify-center">

            <div className="friction-container relative z-20 w-full h-full grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-[clamp(40px,6vw,120px)] p-[clamp(60px,8vw,140px)] min-h-screen">

                {/* LEFT: Content Wrapper */}
                <div className="friction-content flex flex-col justify-center max-w-[540px]">
                    <div className="mb-6">
                        <span className="inline-block py-1 px-3 rounded-full bg-slate-200/50 text-slate-500 text-xs font-semibold tracking-wider uppercase mb-4">
                            The Reality
                        </span>
                        <h2 className="text-[clamp(32px,4vw,56px)] font-bold tracking-tight leading-[1.1] text-[#0F172A] mb-8 font-bricolage">
                            We Are Losing <br />
                            <span className="text-[#22075e]">Time at the Gate.</span>
                        </h2>
                        <div className="space-y-6">
                            <p className="text-lg md:text-xl text-[#475569] leading-relaxed">
                                In a country with such traffic in transit infra, every second lost is a national bottleneck.
                                QR codes are a <span className="font-semibold text-slate-900 text-base md:text-lg">"Stop-and-Scan"</span> bottleneck.
                                NCMC is a <span className="font-semibold text-[#22075e] text-base md:text-lg">"Tap-and-Fly"</span> reality.
                            </p>
                            <p className="text-lg md:text-xl text-[#475569] leading-relaxed">
                                By removing 5 seconds of friction per person, we unlock 100x more capacity in the same infrastructure.
                                We aren't just building a wallet; we're <span className="text-[#22075e] font-medium">upgrading the nation's bandwidth.</span>
                            </p>
                        </div>
                    </div>

                    {/* Optional: List points or stats could go here */}
                </div>

                {/* RIGHT: Visual Wrapper (Image Loop) */}
                <div className="friction-visual w-full h-full flex items-center justify-center relative overflow-hidden">

                    {/* Visual Frame - 4/3 Aspect Ratio */}
                    <div className="visual-frame w-full max-w-[620px] aspect-[4/3] relative transform translate-z-0">

                        {/* Image 1 - Queue 1 */}
                        <img
                            ref={image1Ref}
                            src={queue1}
                            alt="Queue at turnstiles"
                            className="absolute inset-0 w-full h-full object-contain object-center z-10"
                        />

                        {/* Image 2 - Queue 2 */}
                        <img
                            ref={image2Ref}
                            src={queue2}
                            alt="Queue at machine"
                            className="absolute inset-0 w-full h-full object-contain object-center z-10"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
};

export default FrictionSection;
