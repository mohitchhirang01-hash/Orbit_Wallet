import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Lock, Smartphone, ArrowRight, Star, Sparkles, Palette } from 'lucide-react';

import card2 from '../assets/card_2.webp';
import card3 from '../assets/card_3.webp';
import card4 from '../assets/card_4.webp';
import cardSectionBg from '../assets/card_section_background.webp';

gsap.registerPlugin(ScrollTrigger);

// --- Sub-components (Internal for this file) ---

const ImageCard3D = ({ img, title, orientation = "landscape", className = "" }) => {
    // Orientation: landscape (default) or portrait
    const isPortrait = orientation === "portrait";

    // Dimensions based on orientation
    // Landscape: w-[300px] h-[190px] -> w-[360px] h-[228px]
    // Portrait: w-[190px] h-[300px] -> w-[228px] h-[360px]

    const dimensions = isPortrait
        ? "w-[200px] h-[300px] md:w-[240px] md:h-[360px]"
        : "w-[300px] h-[190px] md:w-[360px] md:h-[228px]";

    return (
        <div className={`relative ${dimensions} transition-all duration-500 ease-out transform hover:-translate-y-3 hover:rotate-x-2 hover:rotate-y-2 group perspective-1000 ${className}`} style={{ transformStyle: 'preserve-3d' }}>
            <div className={`absolute inset-0 rounded-[24px] shadow-2xl shadow-slate-400/30 overflow-hidden relative z-10 group-hover:shadow-[var(--orbit-accent)]/20 bg-transparent`}>
                <img src={img} alt={title} className="w-full h-full object-cover rounded-[24px]" />

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay"></div>
            </div>
            {/* Simple Shadow */}
            <div className={`absolute top-[105%] left-[10%] w-[80%] h-[20px] bg-black/20 blur-xl rounded-[50%] transition-all duration-500 group-hover:scale-110 group-hover:bg-black/30`}></div>
        </div>
    );
};

export default function CardShowcase() {
    const containerRef = useRef(null);
    const scrollContainerRef = useRef(null);

    useGSAP(() => {
        const triggers = [];

        // 1. Hero Entrance
        gsap.fromTo(".hero-element",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top 80%"
                }
            }
        );

        // 2. Sticky Cards Animation
        const cards = gsap.utils.toArray('.sticky-card-section');
        cards.forEach((card, i) => {
            const imageContainer = card.querySelector('.card-image-content');

            // Determine direction based on index (even: right, odd: left - because row-reverse)
            // Layout: 
            // Index 0 (Even): Text Left, Image Right -> Image comes from Right (x: 100)
            // Index 1 (Odd): Text Right, Image Left -> Image comes from Left (x: -100)
            const xOffset = i % 2 === 0 ? 100 : -100;

            gsap.fromTo(imageContainer,
                { x: xOffset, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 75%",
                        // Optional: toggleActions: "play none none reverse"
                    }
                }
            );
        });



        // 4. Benefits Grid
        gsap.fromTo(".benefit-card",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".benefits-grid",
                    start: "top 85%"
                }
            }
        );

        return () => {
            triggers.forEach(t => t.kill());
        };

    }, { scope: containerRef });


    const cardCollection = [
        {
            id: 4,
            img: card2, // Dark purple/black
            title: "Orbit × OG ",
            subtitle: "Premium Experience",
            desc: "Orbit card is your all in one transit and payment card that works across for transit, online/offline payments across India. Easily add money, check balance and claim balance from your NFC phone without the need to visit any counter or add value machine for your seamless tap in and out journey!",
            tags: ["1% Cashback on all spends", "upto 20% on transit spends", "KYC onboarding"],
            bgColors: "bg-slate-100 text-slate-900",
            orientation: "landscape"
        },
        {
            id: 2,
            img: card4, // Assuming blue is similar to standard/prepaid
            title: " Singara Chennai × Orbit Wallet ",
            subtitle: "Minimalist Blue",
            desc: "Singara card is designed in collaboration with Metropolitan transport corporation Chennai to promote and digitise transit transactions in the city. It works across all NCMC enabled transit systems across nation.",
            tags: ["No - KYC onboarding", "Works across all NCMC enabled public transit", "Reloadable upto Rs 2000"],
            bgColors: "bg-blue-50 text-blue-900",
            orientation: "landscape"
        },
        {
            id: 3,
            img: card3, // The ID card
            title: "Orbit × Campus",
            subtitle: "Enterprise & Campus Identity",
            desc: "Your university / Institution ID card can now act as one single card to access campus facilities, make payments and use public transit without the need to manage multiple Ids, passes and cards.",
            tags: ["Identity", "Access Control", "NCMC"],
            bgColors: "bg-pink-50 text-pink-900",
            orientation: "portrait"
        }
    ];

    return (
        <section ref={containerRef} className="bg-[#F4F5F7] overflow-hidden">

            {/* 1. HERO SECTION */}
            <div className="hero-section relative min-h-screen bg-cover bg-top bg-no-repeat flex flex-col items-center justify-center text-center px-6 md:px-12 pt-20 pb-20" style={{ backgroundImage: `url(${cardSectionBg})` }}>

                <h1 className="hero-element text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] font-bold text-[#0B0B0F] tracking-tight font-bricolage mb-6 max-w-4xl">
                    One Card. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22075e] to-[#7c3aed]">Limitless Possibilities.</span>
                </h1>
                <p className="hero-element text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
                    Replace your wallet with the single most powerful NCMC card. Metro, bus, parking, and payments—unified.
                </p>
                <div className="hero-element flex flex-col sm:flex-row items-center gap-4 mb-16">
                    <button className="px-8 py-4 bg-[#0F172A] text-white rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-1 flex items-center gap-2">
                        Get Your Card <ArrowRight size={18} />
                    </button>

                </div>
            </div>

            {/* 2. CARD VARIANTS SECTION - New Sticky Layout */}
            <div className="py-24 border-t border-slate-200/60 relative bg-gradient-to-b from-transparent via-[#F4F5F7]/80 to-[#F4F5F7]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24 text-center">
                    <span className="text-[#22075e] font-bold tracking-widest text-sm uppercase block mb-2">Card for all your daily movements across the city.</span>
                    <h2 className="text-5xl md:text-7xl font-bold font-bricolage text-[#0B0B0F] tracking-tighter leading-none">Cards for every need</h2>

                </div>

                <div className="relative">
                    {cardCollection.map((card, index) => (
                        <div key={card.id} className={`sticky-card-section flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between min-h-[80vh] py-20 border-t border-slate-200/60 sticky top-0 z-${10 + index} transition-all duration-500`}>

                            {/* Text Content */}
                            <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:pl-16' : 'md:pr-16'} mb-12 md:mb-0 px-6 md:px-12`}>
                                <span className={`${card.bgColors.split(' ')[1]} font-bold tracking-widest text-sm uppercase mb-4 block font-bricolage`}>0{index + 1}. {card.title.replace('Orbit Wallet', '').replace('Orbit', '').trim() || card.title}</span>
                                <h3 className="text-6xl md:text-8xl font-bold text-[#0B0B0F] mb-6 tracking-tighter font-bricolage">{card.title}</h3>
                                <p className="text-lg text-slate-600 font-light mb-8 max-w-md leading-relaxed">
                                    {card.desc}
                                </p>

                                <div className="space-y-4 mb-10">
                                    {card.tags.map((tag, i) => (
                                        <div key={i} className="bg-white/60 p-4 rounded-2xl flex items-center gap-4 max-w-sm border border-white/50 shadow-sm">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${card.bgColors.split(' ')[1].replace('text-', 'bg-').replace('900', '100')} ${card.bgColors.split(' ')[1]}`}>
                                                <Star size={20} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">{tag}</p>
                                                <p className="text-xs text-slate-500">Included in plan</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-6">
                                    <button className="bg-[#0B0B0F] text-white px-8 py-4 rounded-full text-sm font-bold hover:opacity-80 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                        Get {card.title}
                                    </button>
                                </div>
                            </div>

                            {/* Card Image */}
                            <div className="w-full md:w-1/2 flex justify-center perspective-1000 px-6 card-image-content">
                                <div className="relative transform transition-transform hover:scale-105 duration-700">
                                    <div className="flex items-center justify-center p-6 bg-transparent h-[400px] md:h-[500px]">
                                        <ImageCard3D
                                            img={card.img}
                                            title={card.title}
                                            orientation={card.orientation}
                                            className={card.orientation === 'portrait' ? 'scale-125' : 'scale-110'}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>


            {/* 4. BENEFITS GRID */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-3 rounded-xl bg-purple-100/50 text-purple-600 mb-6">
                            <Palette size={24} />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-[#0B0B0F] mb-4 font-bricolage tracking-tight">Same Power. Your Choice.</h2>
                        <p className="text-slate-500 text-lg">Every card comes with full NCMC capabilities.</p>
                    </div>

                    <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Lock, title: "Vault Security", desc: "Bank-grade encryption for every tap." },
                            { icon: Smartphone, title: "App Control", desc: "Freeze card instantly from the app." },
                            { icon: Star, title: "Rewards", desc: "Earn points on every metro ride." },
                            { icon: Sparkles, title: "Premium Support", desc: "24/7 priority assistance." }
                        ].map((item, i) => (
                            <div key={i} className="benefit-card p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#22075e] mb-4">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 font-bricolage">{item.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section >
    );
}
