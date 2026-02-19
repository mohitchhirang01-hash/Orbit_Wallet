import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

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
// SECTION 1 – PROBLEM STATEMENT
// ════════════════════════════════════════════════════════════════════════════
const ProblemStatement = () => {
    const ref = useRef(null);
    const subRef = useRef(null);
    const bodyRef = useRef(null);

    const highlight = ['closed-loop', 'fragmented', 'operators', 'integration'];

    const renderHighlighted = (text) =>
        text.split(' ').map((word, i) => {
            const clean = word.replace(/[^a-z-]/gi, '').toLowerCase();
            const isHighlight = highlight.includes(clean);
            return (
                <span
                    key={i}
                    className={`word-token inline-block opacity-0 ${isHighlight ? 'text-[#22075e] font-extrabold' : 'text-slate-900'}`}
                    style={{ marginRight: '0.28em' }}
                >
                    {word}
                </span>
            );
        });

    useInView(ref, () => {
        const tokens = ref.current.querySelectorAll('.word-token');
        gsap.set(tokens, { y: 14 });
        gsap.to(tokens, { opacity: 1, y: 0, stagger: 0.035, duration: 0.45, ease: 'power2.out' });
        gsap.to(subRef.current, { opacity: 1, y: 0, duration: 0.7, delay: 0.65, ease: 'power2.out' });
        gsap.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.7, delay: 0.95, ease: 'power2.out' });
    });

    return (
        <div ref={ref} className="w-full py-16 px-8 md:px-16 bg-white flex flex-col items-center justify-center border-b border-slate-100">
            <div className="max-w-4xl w-full mx-auto text-center space-y-5">
                <p className="text-[#22075e] text-xs font-bold uppercase tracking-widest">Problem Statement</p>
                <h2 className="font-bricolage font-bold text-[clamp(1.8rem,3vw,3rem)] leading-[1.1] tracking-tight">
                    {renderHighlighted("India's Transit Systems Don't Talk to Each Other.")}
                </h2>
                <p
                    ref={subRef}
                    className="opacity-0 translate-y-3 text-slate-500 text-lg font-medium tracking-wide"
                >
                    One commuter. Multiple operators. Zero integration.
                </p>
                <p
                    ref={bodyRef}
                    className="opacity-0 translate-y-3 text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto"
                >
                    Bus networks, metro systems, and local QR solutions operate as independent silos. Each maintains its own validation method, recharge flow, and backend ledger. There is no shared payment protocol, no cross-operator balance, and no unified infrastructure binding them together.
                    <br /><br />
                    <span className="text-[#22075e] font-semibold italic">Closed-loop systems create mobility friction.</span>
                </p>
            </div>
        </div>
    );
};

// ════════════════════════════════════════════════════════════════════════════
// SECTION 2 – FRAGMENTATION SILOS
// ════════════════════════════════════════════════════════════════════════════
const silos = [
    {
        title: 'Bus System',
        badge: 'Independent Ledger',
        color: '#ef4444',
        items: ['Closed-loop card', 'Separate recharge kiosk', 'Independent backend system', 'No cross-network validity'],
    },
    {
        title: 'Metro System',
        badge: 'Operator-Specific Validation',
        color: '#f97316',
        items: ['Dedicated metro card', 'Separate validation gates', 'Operator-specific ledger', 'No balance portability'],
    },
    {
        title: 'QR / App-Based',
        badge: 'No Shared Protocol',
        color: '#eab308',
        items: ['App-dependent flow', 'Network latency issues', 'No offline capability', 'Not interoperable with NFC cards'],
    },
];

const FragmentationSilos = () => {
    const ref = useRef(null);

    useInView(ref, () => {
        const cols = ref.current.querySelectorAll('.silo-col');
        gsap.fromTo(cols,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, stagger: 0.18, duration: 0.65, ease: 'power3.out' }
        );
        const micro = ref.current.querySelector('.micro-text');
        gsap.fromTo(micro, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.85 });
    });

    return (
        <div ref={ref} className="w-full py-14 px-8 md:px-16 bg-[#fafbff] border-b border-slate-100">
            <div className="max-w-5xl mx-auto">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 text-center">
                    Closed-Loop Transit Ecosystems
                </p>
                <div className="grid grid-cols-3 gap-0 relative rounded-xl overflow-hidden border border-slate-200">
                    {/* Vertical separators */}
                    <div className="absolute top-0 bottom-0 left-1/3 w-px bg-red-100" />
                    <div className="absolute top-0 bottom-0 left-2/3 w-px bg-red-100" />

                    {silos.map((silo, idx) => (
                        <div
                            key={idx}
                            className="silo-col opacity-0 flex flex-col p-5 bg-white"
                            style={{ boxShadow: `inset 0 0 30px ${silo.color}08` }}
                        >
                            <div className="mb-3">
                                <span
                                    className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full"
                                    style={{ color: silo.color, background: `${silo.color}12` }}
                                >
                                    {silo.badge}
                                </span>
                            </div>
                            <h3 className="font-bricolage font-bold text-slate-800 text-sm mb-4">{silo.title}</h3>
                            <ul className="space-y-2">
                                {silo.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-500 text-xs">
                                        <span className="text-red-400 mt-px shrink-0">✕</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <p className="micro-text opacity-0 text-slate-400 text-xs text-center mt-5 italic">
                    "These systems cannot communicate at the protocol level."
                </p>
            </div>
        </div>
    );
};

// ════════════════════════════════════════════════════════════════════════════
// SECTION 3 – INTEROPERABILITY DEFINED
// ════════════════════════════════════════════════════════════════════════════
const interopPoints = [
    'Cross-network card acceptance',
    'Unified payment protocol',
    'Shared settlement rails',
    'Multi-operator validation',
    'Standardized NFC compliance (NCMC)',
    'One balance across all systems',
];

const InteroperabilityDefined = () => {
    const ref = useRef(null);
    const svgRef = useRef(null);

    useInView(ref, () => {
        const lines = svgRef.current?.querySelectorAll('.conn-line');
        const nodes = svgRef.current?.querySelectorAll('.conn-node');
        const center = svgRef.current?.querySelector('.center-node');
        const bullets = ref.current.querySelectorAll('.interop-bullet');

        if (center) {
            gsap.fromTo(center, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });
            gsap.to(center, { filter: 'drop-shadow(0 0 8px #22075e)', repeat: -1, yoyo: true, duration: 1.4, delay: 0.4 });
        }
        if (lines) {
            lines.forEach(l => {
                const len = l.getTotalLength?.() ?? 120;
                gsap.set(l, { strokeDasharray: len, strokeDashoffset: len });
            });
            gsap.to(lines, { strokeDashoffset: 0, stagger: 0.14, duration: 0.6, delay: 0.4, ease: 'power2.inOut' });
        }
        if (nodes) {
            gsap.fromTo(nodes, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.14, duration: 0.4, delay: 0.55, ease: 'back.out(1.7)' });
        }
        gsap.fromTo(bullets,
            { opacity: 0, x: -14 },
            { opacity: 1, x: 0, stagger: 0.09, duration: 0.45, delay: 0.3, ease: 'power2.out' }
        );
    });

    return (
        <div ref={ref} className="w-full py-14 px-8 md:px-16 bg-white border-b border-slate-100">
            <div className="max-w-5xl mx-auto grid grid-cols-2 gap-12 items-center">
                <div>
                    <p className="text-[#22075e] text-xs font-bold uppercase tracking-widest mb-3">Concept</p>
                    <h2 className="font-bricolage font-bold text-slate-900 text-[clamp(1.3rem,2vw,1.9rem)] leading-tight mb-7">
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

                <div className="flex items-center justify-center">
                    <svg ref={svgRef} viewBox="0 0 240 200" className="w-full max-w-[280px]">
                        {[
                            { x1: 120, y1: 100, x2: 40, y2: 40 },
                            { x1: 120, y1: 100, x2: 200, y2: 40 },
                            { x1: 120, y1: 100, x2: 40, y2: 165 },
                            { x1: 120, y1: 100, x2: 200, y2: 165 },
                        ].map((l, i) => (
                            <line key={i} className="conn-line"
                                x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                                stroke="#22075e" strokeWidth="1.8" strokeLinecap="round"
                            />
                        ))}

                        {[
                            { cx: 40, cy: 40, label: 'Bus' },
                            { cx: 200, cy: 40, label: 'Metro' },
                            { cx: 40, cy: 165, label: 'QR' },
                            { cx: 200, cy: 165, label: 'NFC' },
                        ].map((n, i) => (
                            <g key={i} className="conn-node" style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}>
                                <circle cx={n.cx} cy={n.cy} r="20" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />
                                <text x={n.cx} y={n.cy} textAnchor="middle" dominantBaseline="middle"
                                    fill="#475569" fontSize="8.5" fontFamily="sans-serif" fontWeight="600">
                                    {n.label}
                                </text>
                            </g>
                        ))}

                        <g className="center-node" style={{ transformOrigin: '120px 100px' }}>
                            <circle cx="120" cy="100" r="28" fill="#22075e" />
                            <text x="120" y="97" textAnchor="middle" dominantBaseline="middle"
                                fill="white" fontSize="8.5" fontFamily="sans-serif" fontWeight="800">ORBIT</text>
                            <text x="120" y="110" textAnchor="middle" dominantBaseline="middle"
                                fill="#c4b5fd" fontSize="5.5" fontFamily="sans-serif">Protocol</text>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
};

// ════════════════════════════════════════════════════════════════════════════
// SECTION 4 – ORBIT AS INFRASTRUCTURE LAYER
// ════════════════════════════════════════════════════════════════════════════
const orbitNodes = [
    { label: 'Bus', angle: -90 },
    { label: 'Metro', angle: -18 },
    { label: 'Parking', angle: 54 },
    { label: 'Retail', angle: 126 },
    { label: 'EV Charging', angle: 198 },
];
const toRad = (deg) => (deg * Math.PI) / 180;

const OrbitLayer = () => {
    const ref = useRef(null);
    const svgRef = useRef(null);
    const CX = 160, CY = 160, R = 108;

    useInView(ref, () => {
        const center = svgRef.current?.querySelector('.orbit-center');
        const spokes = svgRef.current?.querySelectorAll('.orbit-spoke');
        const nodeGs = svgRef.current?.querySelectorAll('.orbit-node-g');
        const labels = ref.current.querySelectorAll('.orbit-label');

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
        gsap.fromTo(labels,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, delay: 0.35, ease: 'power2.out' }
        );
    });

    return (
        <div ref={ref} className="w-full py-14 px-8 md:px-16 bg-[#fafbff] border-b border-slate-100">
            <div className="max-w-5xl mx-auto grid grid-cols-2 gap-12 items-center">
                {/* Left: copy */}
                <div>
                    <p className="text-[#22075e] text-xs font-bold uppercase tracking-widest mb-3">Architecture</p>
                    <h2 className="font-bricolage font-bold text-slate-900 text-[clamp(1.3rem,2vw,1.9rem)] leading-tight mb-4">
                        Orbit: A Unified Mobility Protocol Layer
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                        Orbit acts as middleware infrastructure — a single interoperability layer that sits between all transit operators, delivering unified validation, settlement, and access control.
                    </p>
                    <ul className="space-y-2">
                        {['Unified validation across operators', 'Cross-system NFC acceptance', 'Single balance, all networks', 'Scalable to any city or operator'].map((pt, i) => (
                            <li key={i} className="orbit-label opacity-0 flex items-center gap-2 text-slate-600 text-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] shrink-0" />
                                {pt}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 inline-flex items-center gap-2 border border-[#22075e]/30 bg-[#22075e]/[0.06] text-[#22075e] text-xs font-semibold px-3 py-1.5 rounded-full">
                        NCMC-Compliant Open-Loop Architecture
                    </div>
                </div>

                {/* Right: hub-and-spoke */}
                <div className="flex items-center justify-center">
                    <svg ref={svgRef} viewBox={`0 0 ${CX * 2} ${CY * 2}`} className="w-full max-w-[300px]">
                        {orbitNodes.map((n, i) => {
                            const rad = toRad(n.angle);
                            const nx = CX + R * Math.cos(rad);
                            const ny = CY + R * Math.sin(rad);
                            return (
                                <line key={i} className="orbit-spoke"
                                    x1={CX} y1={CY} x2={nx} y2={ny}
                                    stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round"
                                />
                            );
                        })}
                        {orbitNodes.map((n, i) => {
                            const rad = toRad(n.angle);
                            const nx = CX + R * Math.cos(rad);
                            const ny = CY + R * Math.sin(rad);
                            return (
                                <g key={i} className="orbit-node-g" style={{ transformOrigin: `${nx}px ${ny}px` }}>
                                    <circle cx={nx} cy={ny} r="21" fill="#f1f5f9" stroke="#7c3aed" strokeWidth="1.2" />
                                    <text x={nx} y={ny} textAnchor="middle" dominantBaseline="middle"
                                        fill="#6d28d9" fontSize="6" fontFamily="sans-serif" fontWeight="700">
                                        {n.label}
                                    </text>
                                </g>
                            );
                        })}
                        <g className="orbit-center" style={{ transformOrigin: `${CX}px ${CY}px` }}>
                            <circle cx={CX} cy={CY} r="38" fill="#22075e" />
                            <text x={CX} y={CY - 7} textAnchor="middle" dominantBaseline="middle"
                                fill="white" fontSize="9" fontFamily="sans-serif" fontWeight="800">ORBIT</text>
                            <text x={CX} y={CY + 7} textAnchor="middle" dominantBaseline="middle"
                                fill="#c4b5fd" fontSize="5" fontFamily="sans-serif">Mobility Protocol</text>
                        </g>
                    </svg>
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
                <p className="outcome-item opacity-0 text-[#22075e] text-xs font-bold uppercase tracking-widest mb-4">
                    Strategic Outcome
                </p>
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
        <ProblemStatement />
        <FragmentationSilos />
        <InteroperabilityDefined />
        <OrbitLayer />
        <StrategicOutcome />
    </div>
);

export default FragmentedVsOrbit;
