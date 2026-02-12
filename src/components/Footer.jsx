import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { indiaMapPath } from './IndiaMapPath';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);
    const headingRef = useRef(null);
    const subtextRef = useRef(null);
    const mapRef = useRef(null);
    const linksRef = useRef(null);

    useEffect(() => {
        const footer = footerRef.current;
        const heading = headingRef.current;
        const subtext = subtextRef.current;
        const map = mapRef.current;
        const links = linksRef.current;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footer,
                start: "top 60%",
                end: "bottom bottom",
                toggleActions: "play none none reverse"
            }
        });

        // 1. Heading Reveal (Opacity + Y-up)
        tl.fromTo(heading,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
        )
            // 2. Subtext Fade In
            .fromTo(subtext,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, delay: -1 },
                "<+0.2"
            )
            // 3. Map Reveal (Fade In + Scale Up slightly)
            .fromTo(map,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 2, ease: "power2.out" },
                "-=1"
            )
            // 4. Map Nodes Activation (Stagger)
            .fromTo(".map-node",
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, duration: 0.5, stagger: 0.3, ease: "back.out(1.7)" },
                "-=1.5"
            )
            // 5. Links Stagger
            .fromTo(links.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
                "-=1"
            );

    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative w-full bg-[#0b1426] text-white overflow-hidden pt-24 pb-12"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Radial Gradient for 'Planet Horizon' effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1000px] bg-[radial-gradient(circle_at_center,_rgba(40,50,80,0.4)_0%,_rgba(11,20,38,0)_70%)] blur-3xl"></div>

                {/* Stars / Particles (Static for now, could be animated canvas) */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col gap-16">

                {/* Top Section: Split Layout (Text Left, Map Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

                    {/* 1. Cinematic Statement (Left) */}
                    <div className="text-left w-full relative z-20">
                        <h2
                            ref={headingRef}
                            className="font-bold tracking-tight leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
                        >
                            A Nation,<br />Already in Orbit.
                        </h2>

                        <p
                            ref={subtextRef}
                            className="text-lg md:text-xl text-white/70 max-w-[500px] leading-relaxed font-light"
                        >
                            Everywhere You Are: From the buses of Chennai to the tech hubs of ELCIA. We are live, active, and expanding across the Indian map.
                        </p>

                        {/* Trust Metric (Moved near text) */}
                        <div className="mt-8 text-sm text-white/40 tracking-widest uppercase">
                            Powering mobility and payments infrastructure nationwide
                        </div>
                    </div>

                    {/* 2. The Map Visualization (Right) */}
                    <div ref={mapRef} className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center lg:justify-end">

                        {/* Orbital Rings / Radar Effect */}
                        <div className="absolute w-[100%] h-[100%] border-[1px] border-white/5 rounded-full animate-spin-slow opacity-10 pointer-events-none" style={{ animationDuration: '40s' }}></div>
                        <div className="absolute w-[70%] h-[70%] border-[1px] border-white/5 rounded-full animate-spin-reverse-slow opacity-5 pointer-events-none" style={{ animationDuration: '30s' }}></div>

                        {/* India Map SVG (Detailed) */}
                        <svg viewBox="0 0 1024 1024" className="w-full h-full drop-shadow-[0_0_30px_rgba(60,100,255,0.2)]">
                            <defs>
                                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                                    <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                                </linearGradient>
                            </defs>

                            <g transform="translate(0,1024) scale(0.1,-0.1)" fill="url(#mapGradient)" stroke="rgba(255,255,255,0.5)" strokeWidth="20">
                                <path d={indiaMapPath} className="opacity-60 hover:opacity-100 transition-opacity duration-700" />
                            </g>

                            {/* Network Lines */}
                            <g stroke="rgba(255, 255, 255, 0.4)" strokeWidth="3" strokeDasharray="6 6" className="animate-pulse">
                                {/* Delhi -> Mumbai */}
                                <line x1="320" y1="220" x2="280" y2="600" />
                                {/* Delhi -> Kolkata */}
                                <line x1="420" y1="320" x2="740" y2="530" />
                                {/* Mumbai -> Bengaluru */}
                                <line x1="280" y1="600" x2="420" y2="820" />
                                {/* Bengaluru -> Chennai */}
                                <line x1="420" y1="820" x2="550" y2="840" />
                                {/* Chennai -> Kolkata */}
                                <line x1="550" y1="840" x2="740" y2="530" />
                                {/* Delhi -> Bengaluru (Spine) */}
                                <line x1="420" y1="320" x2="420" y2="820" strokeOpacity="0.2" />
                            </g>

                            {/* Metro City Nodes */}

                            {/* Delhi (North) */}
                            <g className="map-node" transform="translate(420, 320)">
                                <circle r="8" fill="#60A5FA" className="animate-ping absolute opacity-75" />
                                <circle r="5" fill="white" />
                                <text x="12" y="5" fontSize="14" fill="rgba(255,255,255,0.9)" fontFamily="monospace" className="tracking-widest font-bold">DELHI</text>
                            </g>

                            {/* Mumbai (West) */}
                            <g className="map-node" transform="translate(280, 600)">
                                <circle r="8" fill="#60A5FA" className="animate-ping absolute opacity-75" style={{ animationDelay: '0.5s' }} />
                                <circle r="5" fill="white" />
                                <text x="-75" y="5" fontSize="14" fill="rgba(255,255,255,0.9)" fontFamily="monospace" className="tracking-widest font-bold">MUMBAI</text>
                            </g>

                            {/* Kolkata (East) */}
                            <g className="map-node" transform="translate(740, 530)">
                                <circle r="8" fill="#60A5FA" className="animate-ping absolute opacity-75" style={{ animationDelay: '1s' }} />
                                <circle r="5" fill="white" />
                                <text x="12" y="5" fontSize="14" fill="rgba(255,255,255,0.9)" fontFamily="monospace" className="tracking-widest font-bold">KOLKATA</text>
                            </g>

                            {/* Bengaluru (South) */}
                            <g className="map-node" transform="translate(420, 820)">
                                <circle r="8" fill="#60A5FA" className="animate-ping absolute opacity-75" style={{ animationDelay: '1.5s' }} />
                                <circle r="5" fill="white" />
                                <text x="-105" y="5" fontSize="14" fill="rgba(255,255,255,0.9)" fontFamily="monospace" className="tracking-widest font-bold">BENGALURU</text>
                            </g>

                            {/* Chennai (South East) */}
                            <g className="map-node" transform="translate(550, 840)">
                                <circle r="8" fill="#60A5FA" className="animate-ping absolute opacity-75" style={{ animationDelay: '2s' }} />
                                <circle r="5" fill="white" />
                                <text x="12" y="5" fontSize="14" fill="rgba(255,255,255,0.9)" fontFamily="monospace" className="tracking-widest font-bold">CHENNAI</text>
                            </g>

                        </svg>
                    </div>
                </div>

                {/* 3. Divider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16"></div>

                {/* 4. Lower Footer (Utility) */}
                <div ref={linksRef} className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

                    {/* Brand Column */}
                    <div className="md:col-span-4 flex flex-col items-start">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                                O
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Orbit</span>
                        </div>
                        <p className="text-white/50 mb-8 max-w-xs leading-relaxed text-left">
                            The operating system for national mobility and unified payments.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons (Placeholders) */}
                            <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer border border-white/5">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer border border-white/5">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-2 text-left">
                        <h4 className="text-white font-semibold mb-6">Product</h4>
                        <ul className="space-y-4 text-white/60">
                            <li className="hover:text-white transition-colors cursor-pointer">Interoperability</li>
                            <li className="hover:text-white transition-colors cursor-pointer">NCMC Card</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Unified Ledger</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Rewards</li>
                        </ul>
                    </div>
                    <div className="md:col-span-2 text-left">
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-4 text-white/60">
                            <li className="hover:text-white transition-colors cursor-pointer">About Orbit</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Press</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
                        </ul>
                    </div>
                    <div className="md:col-span-2 text-left">
                        <h4 className="text-white font-semibold mb-6">Legal</h4>
                        <ul className="space-y-4 text-white/60">
                            <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Security</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Compliance</li>
                        </ul>
                    </div>

                    {/* CTA Column */}
                    <div className="md:col-span-2 flex flex-col items-start md:items-end">
                        <h4 className="text-white font-semibold mb-6 opacity-0 md:opacity-100">Action</h4>
                        <button className="group relative px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 flex items-center gap-2">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 font-medium">Get Orbit</span>
                            <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            <div className="absolute inset-0 rounded-full ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-500"></div>
                        </button>
                    </div>

                </div>

                <div className="mt-20 text-center text-white/20 text-xs tracking-wider">
                    © 2024 ORBIT TECHNOLOGIES. RUNNING ON INDIAN INFRASTRUCTURE.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
