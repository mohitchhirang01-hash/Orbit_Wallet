import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Smartphone, RefreshCw, ArrowRight } from 'lucide-react';
import phoneMockup from '../assets/image.webp';

gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
    const cardRef = useRef(null);

    return (
        <div
            ref={cardRef}
            className="feature-card group relative bg-[rgba(34,7,94,0.02)] border border-slate-200/60 rounded-[18px] p-4 md:p-5 transition-all duration-500 hover:bg-white hover:border-[#22075e]/20 hover:shadow-xl hover:shadow-[#22075e]/10 hover:-translate-y-1 hover:translate-x-1"
            style={{ willChange: 'transform, box-shadow' }}
        >
            <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#22075e]/5 flex items-center justify-center text-[#22075e] group-hover:bg-[#22075e] group-hover:text-white transition-colors duration-500">
                    <Icon size={20} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-[#0B0B0F] tracking-tight">{title}</h3>
                        <ArrowRight size={18} className="text-[#22075e] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[15px] opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function NCMCCapabilities() {
    const sectionRef = useRef(null);
    const phoneRef = useRef(null);
    const contentRef = useRef(null);
    const glowRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        // Elite Staggered Reveal
        tl.fromTo(".eyebrow",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        )
            .fromTo(".main-heading",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            )
            .fromTo(".subtext",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                "-=0.6"
            )
            .fromTo(phoneRef.current,
                { opacity: 0, x: -40, rotateY: -10, scale: 0.95 },
                { opacity: 1, x: 0, rotateY: 0, scale: 1, duration: 1.2, ease: "power4.out" },
                "-=0.8"
            )
            .fromTo(".feature-card",
                { opacity: 0, y: 30, x: 10 },
                { opacity: 1, y: 0, x: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
                "-=1"
            );

        // Continuous Floating Animation for Phone
        gsap.to(phoneRef.current, {
            y: -15,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Breathing Glow
        gsap.to(glowRef.current, {
            scale: 1.1,
            opacity: 0.6,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="w-full min-h-[70vh] md:min-h-[85vh] flex items-center bg-[#FDFDFF] py-20 md:py-32 relative overflow-hidden"
        >
            {/* Background Accent Element */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-[#22075e]/5 to-blue-400/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-40">

                {/* 1. LEFT COLUMN: Product Dominance (45%) */}
                <div className="relative flex justify-center order-2 lg:order-1 lg:-ml-2">
                    {/* Elite Glow behind phone */}
                    <div
                        ref={glowRef}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-radial from-[#22075e]/15 to-transparent blur-[80px] rounded-full opacity-40 z-10 pointer-events-none"
                    ></div>

                    {/* Phone Mockup Wrapper */}
                    <div
                        ref={phoneRef}
                        className="relative z-20 perspective-1000"
                        style={{ willChange: 'transform' }}
                    >
                        <div className="relative transform-gpu transition-all duration-700 hover:scale-[1.02]">
                            <img
                                src={phoneMockup}
                                alt="NCMC Interface Mockup"
                                className="w-full max-w-[280px] md:max-w-[320px] h-auto rounded-[24px] shadow-[0_20px_48px_rgba(0,0,0,0.12)] border-[6px] border-white/90"
                                loading="lazy"
                            />
                            {/* Inner protective shadow */}
                            <div className="absolute inset-0 rounded-[18px] shadow-inner pointer-events-none"></div>
                        </div>
                    </div>
                </div>

                {/* 2. RIGHT COLUMN: Elite Content Hierarchy (55%) */}
                <div ref={contentRef} className="flex flex-col order-1 lg:order-2">
                    {/* Eyebrow */}
                    <div className="eyebrow mb-3 overflow-hidden">
                        <span className="text-[#22075e] font-bold tracking-[0.2em] text-[11px] uppercase block opacity-0">
                            NCMC CAPABILITIES
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h2 className="main-heading text-[clamp(2.5rem,5vw,3.5rem)] font-bold font-bricolage text-[#22075e] leading-[1.05] tracking-[-0.02em] mb-6 opacity-0">
                        We save your <br />
                        <span>time & effort.</span>
                    </h2>

                    {/* Supporting Subtext */}
                    <p className="subtext text-base text-slate-600 leading-relaxed mb-6 opacity-80 max-w-[400px] opacity-0">
                        Manage your NCMC transit card directly from your phone — instantly.
                    </p>

                    {/* Feature Cards Stack */}
                    <div className="flex flex-col gap-5 w-full lg:max-w-[520px]">
                        <FeatureCard
                            icon={Smartphone}
                            title="Check Balance"
                            description="Tap your RuPay card at the back of your phone to instantly view your transit balance."
                        />
                        <FeatureCard
                            icon={RefreshCw}
                            title="Update Balance"
                            description="Tap your card at the back of phone and update balance with your nfc phone"
                        />
                    </div>
                </div>
            </div>

            {/* Soft Divider line for Rhythm */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200/50 to-transparent"></div>
        </section>
    );
}
