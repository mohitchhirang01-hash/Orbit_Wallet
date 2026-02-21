import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Bus, TrainFront, ParkingCircle, ShoppingBag, Zap } from 'lucide-react';

// ── helpers ──────────────────────────────────────────────────────────────────
const useInView = (ref, cb, threshold = 0.2) => {
    useEffect(() => {
        if (!ref.current) return;
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { cb(); io.disconnect(); }
        }, { threshold });
        io.observe(ref.current);
        return () => io.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};


// ════════════════════════════════════════════════════════════════════════════
// SECTION 3 – INTEROPERABILITY DEFINED
// ════════════════════════════════════════════════════════════════════════════
const interopPoints = [
    'Cross-network card acceptance',
    'Unified payments',
    'Multi-operator validation',
    'Standardized NFC compliance (NCMC)',
];

const orbitNodes = [
    { label: 'Bus', icon: Bus, angle: -90 },
    { label: 'Metro', icon: TrainFront, angle: -18 },
    { label: 'Parking', icon: ParkingCircle, angle: 54 },
    { label: 'Retail + Ecom', icon: ShoppingBag, angle: 126 },
    { label: 'EV Charging', icon: Zap, angle: 198 },
];

const toRad = (deg) => (deg * Math.PI) / 180;

const InteroperabilityOverview = () => {
    const ref = useRef(null);
    const svgRef = useRef(null);

    useInView(ref, () => {
        // Section 3 (Left) Animations
        const bullets = ref.current.querySelectorAll('.interop-bullet');
        gsap.fromTo(bullets,
            { opacity: 0, x: -14 },
            { opacity: 1, x: 0, stagger: 0.09, duration: 0.45, delay: 0.3, ease: 'power2.out' }
        );

        // Section 4 (Center/Right) Animations
        const center = svgRef.current?.querySelector('.orbit-center');
        const spokes = svgRef.current?.querySelectorAll('.orbit-spoke');
        const nodeGs = svgRef.current?.querySelectorAll('.orbit-node-g');
        const architectureLabels = ref.current.querySelectorAll('.orbit-label');

        gsap.fromTo(center, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.7)' });
        gsap.to(center, { filter: 'drop-shadow(0 0 14px #7c3aed)', repeat: -1, yoyo: true, duration: 1.8, delay: 0.5 });

        if (spokes) {
            spokes.forEach((spoke, i) => {
                const len = spoke.getTotalLength?.() ?? 100;
                gsap.set(spoke, { strokeDasharray: len, strokeDashoffset: len });
                gsap.to(spoke, { strokeDashoffset: 0, duration: 0.5, delay: 0.45 + i * 0.13, ease: 'power2.inOut' });
            });
        }
        if (nodeGs) {
            gsap.fromTo(nodeGs, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.13, duration: 0.4, delay: 0.65, ease: 'back.out(1.7)' });
        }
        gsap.fromTo(architectureLabels,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, delay: 0.35, ease: 'power2.out' }
        );
    });

    return (
        <div ref={ref} className="w-full py-14 px-8 md:px-16 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-20 items-start">
                {/* Left: Interoperability Points */}
                <div className="order-1 lg:order-1">
                    <h2 className="font-bricolage font-bold text-slate-900 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.1] mb-7">
                        What True Interoperability Means
                    </h2>
                    <ul className="space-y-3">
                        {interopPoints.map((pt, i) => (
                            <li key={i} className="interop-bullet opacity-0 flex items-center gap-3 text-slate-600 text-sm">
                                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                                {pt}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Center: Hub-and-Spoke Figure */}
                <div className="flex items-center justify-center order-2 lg:order-2">
                    <svg ref={svgRef} viewBox="0 0 400 400" className="w-full max-w-[440px]">
                        {/* CX=200, CY=200, R=140 */}
                        {orbitNodes.map((n, i) => {
                            const rad = toRad(n.angle);
                            const nx = 200 + 140 * Math.cos(rad);
                            const ny = 200 + 140 * Math.sin(rad);
                            return (
                                <line key={i} className="orbit-spoke"
                                    x1={200} y1={200} x2={nx} y2={ny}
                                    stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"
                                />
                            );
                        })}
                        {orbitNodes.map((n, i) => {
                            const rad = toRad(n.angle);
                            const nx = 200 + 140 * Math.cos(rad);
                            const ny = 200 + 140 * Math.sin(rad);
                            const Icon = n.icon;
                            return (
                                <g key={i} className="orbit-node-g" style={{ transformOrigin: `${nx}px ${ny}px` }}>
                                    <circle cx={nx} cy={ny} r="28" fill="#f1f5f9" stroke="#7c3aed" strokeWidth="1.5" />
                                    <foreignObject x={nx - 14} y={ny - 14} width="28" height="28">
                                        <div className="w-full h-full flex items-center justify-center text-[#6d28d9]">
                                            <Icon size={18} strokeWidth={2.5} />
                                        </div>
                                    </foreignObject>
                                </g>
                            );
                        })}
                        <g className="orbit-center" style={{ transformOrigin: `200px 200px` }}>
                            <circle cx={200} cy={200} r="50" fill="#22075e" />
                            <text x={200} y={200 - 10} textAnchor="middle" dominantBaseline="middle"
                                fill="white" fontSize="16" fontFamily="sans-serif" fontWeight="800">ORBIT</text>
                            <text x={200} y={200 + 12} textAnchor="middle" dominantBaseline="middle"
                                fill="#c4b5fd" fontSize="10" fontFamily="sans-serif">Mobility Protocol</text>
                        </g>
                    </svg>
                </div>

                {/* Right: Architecture Text */}
                <div className="order-3 lg:order-3">
                    <h2 className="font-bricolage font-bold text-slate-900 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.1] mb-4">
                        Orbit Wallet: A Unified Mobility Layers
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                        Orbit Wallet acts as middleware infrastructure — a single interoperability layer that sits between all transit operators, delivering unified validation, settlement, and access control.
                    </p>
                    <ul className="space-y-2">
                        {['Unified validation across operators', 'Cross-system acceptance', 'Single balance, all networks', 'Scalable to any city or operator'].map((pt, i) => (
                            <li key={i} className="orbit-label opacity-0 flex items-center gap-2 text-slate-600 text-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] shrink-0" />
                                {pt}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};


// ════════════════════════════════════════════════════════════════════════════
// SECTION 6 – STRATEGIC OUTCOME
// ════════════════════════════════════════════════════════════════════════════
const StrategicOutcome = () => {
    const ref = useRef(null);

    useInView(ref, () => {
        const items = ref.current.querySelectorAll('.outcome-item');
        gsap.fromTo(items,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.55, ease: 'power2.out' }
        );
    });

    return (
        <div ref={ref} className="w-full py-16 px-8 md:px-16 bg-[#fafbff]">
            <div className="max-w-3xl mx-auto text-center">

                <h2 className="outcome-item opacity-0 font-bricolage font-bold text-slate-900 text-[clamp(1.4rem,2.3vw,2.2rem)] leading-tight">
                    From Fragmentation to{' '}
                    <span className="text-[#22075e]">Unified Mobility Infrastructure.</span>
                </h2>
            </div>
        </div>
    );
};

// ════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ════════════════════════════════════════════════════════════════════════════
const FragmentedVsOrbit = () => (
    <div className="w-full bg-white">
        {/* New Header Section - "No hassle" */}
        <div className="w-full pt-28 pb-8 px-8 md:px-[8%] bg-white flex flex-col items-center justify-center text-center">
            <div className="max-w-4xl w-full mx-auto space-y-3">
                <h2 className="font-bricolage font-bold text-4xl md:text-6xl lg:text-7xl text-[#22075e] leading-[1.1] tracking-tight">
                    No hassle of carrying <span>multiple cards</span> at once.
                </h2>
                <p className="text-slate-500 text-lg md:text-xl font-medium font-inter">
                    Simplify your wallet. Simplify your life.
                </p>
            </div>
        </div>

        <InteroperabilityOverview />
        <StrategicOutcome />
    </div>
);

export default FragmentedVsOrbit;
