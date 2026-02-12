import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import orbitLogo from '../assets/orbit_logo.png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const el = navRef.current;
        const container = containerRef.current;

        // Initial entrance animation
        gsap.fromTo(el,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
        );

        // Scroll-based width and shape animation
        ScrollTrigger.create({
            start: 'top top',
            end: 100,
            scrub: true,
            animation: gsap.to(container, {
                width: '70%',
                borderRadius: '50px',
                marginTop: '20px',
                ease: 'none',
                paused: true
            })
        });

        // Hide/Show on scroll direction
        ScrollTrigger.create({
            start: 'top top',
            end: 99999,
            onUpdate: (self) => {
                if (self.direction === -1) {
                    gsap.to(el, { y: 0, duration: 0.3, autoAlpha: 1 });
                } else if (self.direction === 1 && self.progress > 0.05) {
                    gsap.to(el, { y: -100, duration: 0.3, autoAlpha: 0 });
                }
            }
        });

        // Hide navbar before HorizontalScroll section, show when scrolling back up
        const horizontalSection = document.querySelector('#horizontal-scroll-section');

        if (horizontalSection) {
            ScrollTrigger.create({
                trigger: horizontalSection,
                start: 'top 90%', // Start fading out earlier
                end: 'top 20%',   // Finish fading out when section is near top
                scrub: 1,         // Smooth scrubbing (1s lag for softness)
                animation: gsap.fromTo(el,
                    { y: 0, autoAlpha: 1 },
                    { y: -100, autoAlpha: 0, ease: 'none' }
                ),
                // We need a separate trigger to show it again after the section
            });

            // Show navbar again after leaving the section
            ScrollTrigger.create({
                trigger: horizontalSection,
                start: 'bottom 80%', // Start fading in before section fully leaves
                end: 'bottom 20%',   // Fully visible
                scrub: 1,
                animation: gsap.fromTo(el,
                    { y: -100, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, ease: 'none' }
                )
            });
        }
    }, []);



    const links = [
        { name: 'About Us', href: '/about', internal: true },
        { name: 'Investors', href: 'https://www.orbitwallet.in/investors/', internal: false },
        { name: 'Blogs', href: 'https://www.orbitwallet.in/blogs/', internal: false },
        { name: 'Contact Us', href: 'mailto:contact@orbitwallet.in', internal: false },
    ];

    const MagneticLink = ({ children, href, internal, isActive }) => {
        const ref = useRef(null);

        useEffect(() => {
            const xTo = gsap.quickTo(ref.current, "x", { duration: 0.5, ease: "power3" });
            const yTo = gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "power3" });

            const mouseMove = (e) => {
                const { clientX, clientY } = e;
                const { height, width, left, top } = ref.current.getBoundingClientRect();
                const x = clientX - (left + width / 2);
                const y = clientY - (top + height / 2);
                xTo(x * 0.3);
                yTo(y * 0.3);
            };

            const mouseLeave = () => {
                xTo(0);
                yTo(0);
            };

            ref.current.addEventListener("mousemove", mouseMove);
            ref.current.addEventListener("mouseleave", mouseLeave);

            return () => {
                if (ref.current) {
                    ref.current.removeEventListener("mousemove", mouseMove);
                    ref.current.removeEventListener("mouseleave", mouseLeave);
                }
            };
        }, []);

        const className = cn(
            "group relative px-4 py-2 text-sm font-medium transition-colors block",
            isActive ? "text-slate-900" : "text-slate-600 hover:text-black"
        );

        return internal ? (
            <Link ref={ref} to={href} className={className}>
                <span className="relative z-10 inline-block transition-transform duration-300 group-hover:scale-[1.02]">{children}</span>
                <span className={cn(
                    "absolute inset-x-0 bottom-0 h-0.5 bg-cyan-400 transform origin-left transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
            </Link>
        ) : (
            <a ref={ref} href={href} className={className}>
                <span className="relative z-10 inline-block transition-transform duration-300 group-hover:scale-[1.02]">{children}</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-400 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
        );
    };

    return (
        <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <div
                ref={containerRef}
                className={cn(
                    "w-full rounded-none transition-all duration-300 font-sans pointer-events-auto",
                    "bg-white/5 backdrop-blur-md border border-white/10 shadow-lg",
                    "flex items-center justify-between px-6 py-3",
                    "bg-white/70 border-slate-200"
                )}>
                {/* Logo */}
                <Link
                    to="/"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-2"
                >
                    <img src={orbitLogo} alt="Orbit" className="h-10 w-auto object-contain" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-4">
                    {links.map((link) => (
                        <MagneticLink
                            key={link.name}
                            href={link.href}
                            internal={link.internal}
                            isActive={link.internal && location.pathname === link.href}
                        >
                            {link.name}
                        </MagneticLink>
                    ))}
                </div>

                {/* CTA & Theme Toggle & Mobile Toggle */}
                <div className="flex items-center gap-4">


                    <button
                        onClick={() => window.open('https://pages.razorpay.com/orbitcard', '_blank')}
                        className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-transform shadow-lg hover:shadow-cyan-500/25"
                    >
                        Get Orbit
                    </button>

                    <button
                        className="md:hidden text-slate-900"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-24 left-6 right-6 p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200 flex flex-col gap-4 md:hidden shadow-2xl origin-top"
                    >
                        {links.map((link) => (
                            link.internal ? (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-slate-700 hover:text-black font-medium py-3 px-4 rounded-xl hover:bg-slate-100 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-slate-700 hover:text-black font-medium py-3 px-4 rounded-xl hover:bg-slate-100 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            )
                        ))}
                        <button
                            onClick={() => window.open('https://pages.razorpay.com/orbitcard', '_blank')}
                            className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold shadow-lg"
                        >
                            Get Orbit
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
