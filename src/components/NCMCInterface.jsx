import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function NCMCInterface() {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const textRef = useRef(null);
    const phoneRef = useRef(null);
    const tagsRef = useRef([]);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%", // Start animation when section is 60% in view
                toggleActions: "play none none reverse"
            }
        });

        // 1. Text Entrance
        tl.fromTo(textRef.current.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
        );

        // 2. Phone Entrance (Scale & Fade)
        tl.fromTo(phoneRef.current,
            { scale: 0.92, opacity: 0, y: 50 },
            { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power2.out" },
            "-=0.4"
        );

        // 3. Floating Tags Entrance
        tl.fromTo(tagsRef.current,
            { y: 20, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
            "-=0.6"
        );

        // Video Autoplay/Pause logic
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => videoRef.current?.play(),
            onLeave: () => videoRef.current?.pause(),
            onEnterBack: () => videoRef.current?.play(),
            onLeaveBack: () => videoRef.current?.pause()
        });

        // Floating Animation for Tags (Continuous)
        tagsRef.current.forEach((tag, i) => {
            gsap.to(tag, {
                y: -10,
                duration: 1.5 + (i * 0.2),
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                delay: i * 0.2
            });
        });

    }, { scope: sectionRef });

    const addToTagsRef = (el) => {
        if (el && !tagsRef.current.includes(el)) {
            tagsRef.current.push(el);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="w-full h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 to-white text-slate-900 flex flex-col md:flex-row"
        >
            {/* LEFT SIDE: VIDEO SHOWCASE (50%) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex items-center justify-center p-8 md:p-16 bg-slate-100/50">

                {/* Video Container (No Phone Frame) */}
                {/* To change size: Adjust w-[300px] and h-[550px] below */}
                <div ref={phoneRef} className="relative w-[250px] h-[550px] md:w-[302px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl shadow-[#22075e]/20 z-20 group">
                    <video
                        ref={videoRef}
                        src="/assets/ncmc_vid.mp4"
                        className="w-full h-full object-fill transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        muted
                        loop
                        playsInline
                        poster="/assets/images/solution/scene_1.png"
                    />

                    {/* Inner Glow / Vignette */}
                    <div className="absolute inset-0 ring-1 ring-black/5 pointer-events-none"></div>
                </div>

                {/* Floating Capability Tags - Positioned around video */}
                {/* Tag 1: Left Top */}
                <div
                    ref={addToTagsRef}
                    className="absolute left-4 md:left-12 top-1/4 bg-white px-4 py-2.5 rounded-full shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-2 z-30"
                >
                    <div className="w-6 h-6 rounded-full bg-[#22075e]/10 flex items-center justify-center text-[#22075e] text-xs">💳</div>
                    <span className="text-xs font-semibold text-slate-700">Manage Balance</span>
                </div>

                {/* Tag 2: Right Middle */}
                <div
                    ref={addToTagsRef}
                    className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 bg-white px-4 py-2.5 rounded-full shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-2 z-30"
                >
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">📊</div>
                    <span className="text-xs font-semibold text-slate-700">Track Spends</span>
                </div>

                {/* Tag 3: Left Bottom */}
                <div
                    ref={addToTagsRef}
                    className="absolute left-8 md:left-20 bottom-1/4 bg-white px-4 py-2.5 rounded-full shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-2 z-30"
                >
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">⚡</div>
                    <span className="text-xs font-semibold text-slate-700">Claim Recharges</span>
                </div>

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#22075e]/10 blur-[120px] rounded-full z-0"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-100/20 blur-[100px] rounded-full z-0 pointer-events-none"></div>
            </div>

            {/* RIGHT SIDE: CONTENT (50%) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-8 md:px-20 relative z-30">
                <div ref={textRef} className="max-w-lg">
                    {/* Eyebrow */}
                    <div className="inline-block mb-6">
                        <span className="px-4 py-1.5 rounded-full bg-[#22075e]/10 text-[#22075e] text-xs font-bold tracking-widest uppercase border border-[#22075e]/20">
                            NCMC Interface
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-bricolage leading-[1.1] mb-6 text-slate-900">
                        Already Have a RuPay NCMC Card? <br className="hidden md:block" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22075e] to-[#1a0548]">
                            Give It a Superpower.
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-slate-500 leading-relaxed mb-8">
                        Orbit acts as the premium frontend for any NCMC card — manage balance,
                        track spends, and claim recharges effortlessly from one intelligent app.
                    </p>

                    {/* CTA Button (Optional enhancement) */}
                    <button className="group relative inline-flex items-center justify-center px-8 py-3 bg-slate-900 text-white rounded-full overflow-hidden transition-transform active:scale-95">
                        <span className="relative z-10 font-semibold tracking-wide">Explore Features</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#22075e] to-[#1a0548] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>
            </div>
        </section>
    );
}
