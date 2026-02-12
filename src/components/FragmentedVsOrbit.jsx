import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FragmentedVsOrbit = () => {
    const containerRef = useRef(null);
    const leftTrunkLineRef = useRef(null);
    const leftBranchLinesRef = useRef([]);
    const leftDotsRef = useRef([]);
    const leftLabelsRef = useRef([]);
    const rightLineRef = useRef(null);
    const rightDotsRef = useRef([]);
    const rightLabelsRef = useRef([]);

    useGSAP(() => {
        const tl = gsap.timeline({
            paused: true
        });

        const leftDuration = 4;
        const rightDuration = 1.5;

        // --- LEFT SIDE ANIMATION ---

        // 1. Trunk Line (Stop -> Queue)
        tl.to(leftTrunkLineRef.current, {
            scaleY: 1,
            duration: 0.5,
            ease: "none"
        }, 0);

        // 2. Trunk Dots (Stop, Queue)
        // Assuming first 2 dots are trunk
        const trunkDots = leftDotsRef.current.slice(0, 2);
        trunkDots.forEach((dot, index) => {
            tl.to(dot, {
                scale: 1,
                autoAlpha: 1,
                duration: 0.2,
                ease: "back.out(1.7)",
                boxShadow: "0 0 0 6px rgba(239,68,68,0.3)"
            }, index * 0.2);

            tl.to(leftLabelsRef.current[index], {
                y: 0,
                autoAlpha: 1,
                duration: 0.4
            }, index * 0.2);
        });

        // 3. Branch Lines (Connectors + Vertical)
        // Animate connectors and vertical lines together
        tl.to(leftBranchLinesRef.current, {
            strokeDashoffset: 0, // For SVG paths
            scaleY: 1, // For vertical divs if mixed
            duration: 0.8,
            ease: "power1.inOut"
        }, 0.6);

        // 4. Branch Dots (Parallel)
        // Remaining dots are branches. 3 branches x 5 steps = 15 dots.
        // Or if we map them by branch index.
        // Let's assume standard order: Trunk(2) -> BranchA(5) -> BranchB(5) -> BranchC(5)
        const branchDots = leftDotsRef.current.slice(2);
        const branchLabels = leftLabelsRef.current.slice(2);

        // We have 3 branches, so we animate them simultaneously
        const stepsPerBranch = 5;
        for (let i = 0; i < stepsPerBranch; i++) {
            // For each step login, trigger the dot in all 3 branches
            const time = 1.2 + (i * 0.3); // Start after branches draw

            [0, 1, 2].forEach(branchIdx => {
                const globalIndex = (branchIdx * stepsPerBranch) + i;
                const dot = branchDots[globalIndex];
                const label = branchLabels[globalIndex];

                if (dot) {
                    tl.to(dot, {
                        scale: 1,
                        autoAlpha: 1,
                        duration: 0.2,
                        ease: "back.out(1.7)",
                        boxShadow: "0 0 0 4px rgba(239,68,68,0.3)" // Smaller glow for branches
                    }, time);
                }
                if (label) {
                    tl.to(label, {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.4
                    }, time);
                }
            });
        }


        // --- RIGHT SIDE ANIMATION (Unchanged) ---
        tl.to(rightLineRef.current, {
            scaleY: 1,
            duration: rightDuration,
            ease: "power1.inOut"
        }, 0);

        const rightStepDuration = rightDuration / 2;
        if (rightDotsRef.current.length > 0) {
            gsap.set(rightDotsRef.current[0], { autoAlpha: 1, scale: 1 });
            gsap.set(rightLabelsRef.current[0], { autoAlpha: 1, y: 0 });

            rightDotsRef.current.slice(1).forEach((dot, index) => {
                const startTime = (index + 1) * rightStepDuration;
                tl.to(dot, {
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.2,
                    ease: "back.out(1.7)",
                    boxShadow: "0 0 20px 5px rgba(147,51,234,0.6)"
                }, startTime);

                tl.to(rightLabelsRef.current[index + 1], {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.4
                }, startTime);
            });
        }

        // Observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    tl.play();
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();

    }, { scope: containerRef });

    const addToRefs = (el, refArray) => {
        if (el && !refArray.current.includes(el)) {
            refArray.current.push(el);
        }
    };

    // Data points
    const trunkSteps = ['Stop', 'Queue'];
    const branchSteps = ['Recharge', 'Wait', 'Find AVM', 'Tap', 'Stop'];

    return (
        <div
            ref={containerRef}
            className="w-full h-screen grid grid-cols-2 bg-white text-slate-900 overflow-hidden relative"
        >
            {/* Divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-slate-200 z-10"></div>

            {/* --- LEFT SIDE: THE OLD WAY --- */}
            <div className="left-side-container flex flex-col items-center justify-center p-4 relative z-20 h-full w-full">
                <div className="w-full max-w-2xl mx-auto h-full flex flex-col justify-center">
                    <h3 className="text-[clamp(24px,2.5vw,42px)] font-bold font-bricolage tracking-tight mb-8 text-center text-slate-900">
                        The <span className="text-red-500">Old Way</span>
                    </h3>

                    {/* Diagram Container */}
                    <div className="relative flex flex-col items-center h-[70vh] w-full">

                        {/* TRUNK SECTION */}
                        <div className="relative flex flex-col items-center w-full h-[15%]">
                            {/* Trunk Line */}
                            <div
                                ref={leftTrunkLineRef}
                                className="absolute top-0 bottom-0 w-[3px] bg-red-500 origin-top scale-y-0 rounded-t-full"
                            ></div>

                            {/* Trunk Steps */}
                            {trunkSteps.map((step, i) => (
                                <div key={`trunk-${i}`} className="relative w-full flex items-center justify-center flex-1">
                                    <div
                                        ref={el => addToRefs(el, leftDotsRef)}
                                        className="w-[12px] h-[12px] rounded-full bg-red-500 z-20 opacity-0 scale-0 shadow-md"
                                    ></div>
                                    <div
                                        ref={el => addToRefs(el, leftLabelsRef)}
                                        className="absolute left-[calc(50%+16px)] text-sm font-medium text-slate-500 whitespace-nowrap opacity-0 translate-y-1"
                                    >
                                        {step}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CONNECTOR LINES (Using SVG) */}
                        <div className="w-full h-[60px] relative -mt-[2px] z-0">
                            <svg className="w-full h-full" preserveAspectRatio="none">
                                {/* Left Branch Path (Orthogonal) */}
                                <path
                                    ref={el => addToRefs(el, leftBranchLinesRef)}
                                    d="M 50% 0 L 50% 50% L 16.66% 50% L 16.66% 100%"
                                    fill="none" stroke="#ef4444" strokeWidth="3"
                                    strokeDasharray="400" strokeDashoffset="400"
                                    vectorEffect="non-scaling-stroke"
                                    strokeLinecap="round" strokeLinejoin="round"
                                />
                                {/* Center Branch Path (Direct) */}
                                <path
                                    ref={el => addToRefs(el, leftBranchLinesRef)}
                                    d="M 50% 0 L 50% 100%"
                                    fill="none" stroke="#ef4444" strokeWidth="3"
                                    strokeDasharray="200" strokeDashoffset="200"
                                    strokeLinecap="butt"
                                    className="overflow-visible"
                                />
                                {/* Right Branch Path (Orthogonal) */}
                                <path
                                    ref={el => addToRefs(el, leftBranchLinesRef)}
                                    d="M 50% 0 L 50% 50% L 83.33% 50% L 83.33% 100%"
                                    fill="none" stroke="#ef4444" strokeWidth="3"
                                    strokeDasharray="400" strokeDashoffset="400"
                                    vectorEffect="non-scaling-stroke"
                                    strokeLinecap="round" strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        {/* BRANCH SECTION (3 Columns) */}
                        <div className="relative grid grid-cols-3 w-full h-[65%] gap-2">
                            {[0, 1, 2].map((branchIdx) => (
                                <div key={`branch-${branchIdx}`} className="relative flex flex-col items-center h-full">
                                    {/* Vertical Line for Branch */}
                                    <div
                                        ref={el => addToRefs(el, leftBranchLinesRef)}
                                        className="absolute top-0 bottom-0 w-[2px] bg-red-500 origin-top scale-y-0 opacity-50"
                                    ></div>

                                    {/* Branch Steps */}
                                    {branchSteps.map((step, i) => (
                                        <div key={`b${branchIdx}-${i}`} className="relative w-full flex items-center justify-center flex-1">
                                            <div
                                                ref={el => addToRefs(el, leftDotsRef)}
                                                className="w-[8px] h-[8px] rounded-full bg-red-500 z-20 opacity-0 scale-0"
                                            ></div>
                                            {/* Only show labels for middle branch to avoid clutter, or alternate? 
                                                User asked for "same points", so let's show all but small */}
                                            <div
                                                ref={el => addToRefs(el, leftLabelsRef)}
                                                className={`absolute ${branchIdx === 0 ? 'right-[calc(50%+10px)] text-right' : 'left-[calc(50%+10px)] text-left'} text-[10px] md:text-xs font-medium text-slate-400 whitespace-nowrap opacity-0 translate-y-1`}
                                            >
                                                {/* Show labels only for outer branches to avoid overlap? Or just middle? 
                                                    Let's try showing all. */}
                                                {step}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDE: THE ORBIT WAY (Same as before) --- */}
            <div className="right-side-container flex flex-col items-center justify-center p-[6vw] relative h-full bg-slate-50">
                <div className="w-full max-w-md mx-auto h-full flex flex-col justify-center">
                    <h3 className="text-[clamp(32px,3vw,52px)] font-bold font-bricolage tracking-tight mb-12 text-center text-slate-900">
                        The <span className="text-purple-600">Orbit Way</span>
                    </h3>

                    {/* Diagram Container */}
                    <div className="relative flex flex-col items-center h-[60vh]">
                        <div
                            ref={rightLineRef}
                            className="absolute top-0 bottom-0 w-[3px] bg-purple-600 origin-top scale-y-0 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                        ></div>

                        {['Enter', 'Tap', 'Exit'].map((step, i) => (
                            <div key={i} className="relative w-full flex items-center justify-center flex-1">
                                <div
                                    ref={el => addToRefs(el, rightDotsRef)}
                                    className="w-[14px] h-[14px] rounded-full bg-purple-600 z-10 opacity-0 scale-0 shadow-[0_0_0_4px_rgba(255,255,255,1)]"
                                ></div>
                                <div
                                    ref={el => addToRefs(el, rightLabelsRef)}
                                    className="absolute left-[calc(50%+24px)] text-lg md:text-xl font-bold text-slate-900 whitespace-nowrap opacity-0 translate-y-2"
                                >
                                    {step}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .right-side-container:hover .bg-purple-600 {
                    box-shadow: 0 0 25px rgba(147,51,234,0.6);
                    transition: box-shadow 0.25s ease;
                }
            `}</style>
        </div>
    );
};

export default FragmentedVsOrbit;
