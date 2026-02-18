import React, { useRef } from 'react';
import { Smartphone, Check, Wifi } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AppIntegration() {
    const containerRef = useRef(null);
    const phoneRef = useRef(null);
    const floatingCardRef = useRef(null);
    const scanRef = useRef(null);
    const textContentRef = useRef(null);
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(phoneRef.current, {
            y: 100,
            rotate: -10,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        })
            .from(textContentRef.current.children, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.8");

        // Floating Card Loop
        gsap.to(floatingCardRef.current, {
            y: -15,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Scan Animation
        const scanTl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        scanTl.fromTo(scanRef.current,
            { y: "100%", opacity: 0 },
            {
                y: "-100%", opacity: 0, duration: 2.5, ease: "power1.inOut",
                keyframes: [
                    { opacity: 0, duration: 0 },
                    { opacity: 1, duration: 0.2 },
                    { opacity: 1, duration: 2.1 },
                    { opacity: 0, duration: 0.2 }
                ]
            }
        );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 bg-[var(--orbit-primary)] flex flex-col md:flex-row items-center justify-center gap-24 overflow-hidden transition-colors duration-300">

            {/* Phone Mockup */}
            <div className="relative group perspective-1000 z-50">
                <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full" />

                <div
                    ref={phoneRef}
                    className="relative w-[300px] h-[600px] bg-slate-900 border-8 border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden z-40"
                >
                    {/* Dynamic Island / Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-70" />

                    {/* Screen Content */}
                    <div className="p-6 pt-14 h-full flex flex-col text-white z-40">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-xl font-bold">Orbit</span>
                            <Wifi size={18} />
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 p-6 rounded-2xl shadow-lg mb-8 relative overflow-hidden text-white">
                            <div className="text-sm opacity-80 mb-1">Total Balance</div>
                            <div className="text-3xl font-bold">₹ 4,250.00</div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                        </div>

                        <div className="space-y-4">
                            <div className="text-sm text-slate-400 font-medium">Recent Activity</div>
                            {[
                                { name: "Metro Travel", time: "2 min ago", amount: "- ₹ 32.00" },
                                { name: "Starbucks", time: "2 hours ago", amount: "- ₹ 350.00" },
                                { name: "Auto Top-up", time: "Yesterday", amount: "+ ₹ 1000.00", green: true },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.green ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10'}`}>
                                            {item.green ? <Check size={14} /> : <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">{item.name}</div>
                                            <div className="text-xs text-slate-500">{item.time}</div>
                                        </div>
                                    </div>
                                    <div className={`font-medium text-sm ${item.green ? 'text-emerald-400' : ''}`}>{item.amount}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scan Animation Overlay */}
                    <div
                        ref={scanRef}
                        className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent z-30 pointer-events-none"
                    />
                </div>

            </div>

            <div ref={textContentRef} className="max-w-md space-y-6 relative z-50 px-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-600 text-sm font-medium border border-cyan-200">
                    <Smartphone size={16} />
                    <span>NCMC Enabled</span>
                </div>

                <h2 className="text-4xl font-bold leading-tight text-slate-900 font-bricolage">
                    Your Phone is Now <br /> Your Wallet.
                </h2>
                <p className="text-lg text-slate-600">
                    The frontend to NCMC technology. Check balance, track journeys, and top-up instantly.
                </p>

                <div className="flex gap-4 pt-4">
                    <div className="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200">
                        <span className="font-bold tracking-wider text-slate-700">NPCI</span>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200">
                        <span className="font-bold tracking-wider text-slate-700 italic">RuPay</span>
                    </div>
                </div>
            </div>

        </section>
    );
}
