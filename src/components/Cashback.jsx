import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Counter({ value }) {
    const ref = useRef(null);

    useGSAP(() => {
        const obj = { val: 0 };
        gsap.to(obj, {
            val: value,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            onUpdate: () => {
                if (ref.current) ref.current.innerText = Math.floor(obj.val).toLocaleString();
            }
        });
    }, { scope: ref, dependencies: [value] });

    return <span ref={ref}>0</span>;
}

export default function Cashback() {
    const containerRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(headerRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
            .from(gridRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: "back.out(1.7)",
                clearProps: "all"
            }, "-=0.5");

    }, { scope: containerRef });
    return (
        <section ref={containerRef} className="py-32 bg-[var(--orbit-primary)] relative overflow-visible">
            <div className="max-w-7xl mx-auto px-6 text-center relative">
                <h2 ref={headerRef} className="text-3xl md:text-5xl font-bold mb-16 text-slate-900 font-bricolage">Rewards That Grow</h2>

                <div ref={gridRef} className="grid md:grid-cols-3 gap-12">
                    {[
                        { label: "Cashback on Commute", value: 5, suffix: "%", color: "from-blue-400 to-indigo-500" },
                        { label: "Partner Brands", value: 30, suffix: "+", color: "from-[#22075e] to-pink-500" },
                        { label: "Annual Savings", value: 12000, prefix: "₹", color: "from-emerald-400 to-teal-500" },
                    ].map((stat, i) => (
                        <div key={i} className="relative group p-8 rounded-2xl bg-white border border-slate-200 hover:border-transparent transition-all duration-300 hover:-translate-y-2">
                            {/* Glow Effect */}
                            <div className={`absolute -inset-[1px] bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-70 blur-sm transition-opacity duration-500`} />

                            {/* Inner Background Tint */}
                            <div className="absolute inset-0 bg-white rounded-2xl z-0" />
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl z-0`} />

                            <div className="relative z-10">
                                <div className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-400">
                                    {stat.prefix}<Counter value={stat.value} />{stat.suffix}
                                </div>
                                <div className="text-lg text-slate-600 group-hover:text-slate-900 transition-colors">{stat.label}</div>
                            </div>

                            {/* Particles (Simple CSS dots) */}
                            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-20">
                                {[...Array(5)].map((_, j) => (
                                    <div
                                        key={j}
                                        className="absolute w-1 h-1 bg-slate-400/30 rounded-full animate-ping"
                                        style={{
                                            top: `${Math.random() * 100}%`,
                                            left: `${Math.random() * 100}%`,
                                            animationDelay: `${j * 0.5}s`,
                                            animationDuration: '3s'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
