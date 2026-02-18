import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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

        let ctx = gsap.context(() => {
            // Force visible on load
            gsap.set(el, { y: 0, opacity: 1, autoAlpha: 1 });

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
                })
            });




        }, navRef);

        return () => ctx.revert();
    }, []);



    const links = [
        { name: 'Orbit Card', href: '/orbit-card', internal: true },
        { name: 'NCMC Documentation', href: '/ncmc-documentation', internal: true },
        { name: 'Blogs', href: '/blog', internal: true },
        { name: 'About Us', href: '/about', internal: true },
    ];

    const MagneticLink = ({ children, href, internal, isActive }) => {
        const className = cn(
            "group relative px-4 py-2 text-sm font-medium transition-all duration-300 block hover:scale-110",
            isActive ? "text-slate-900" : "text-slate-600 hover:text-black"
        );

        return internal ? (
            <Link to={href} className={className}>
                <span className="relative z-10 inline-block transition-transform duration-300">{children}</span>
                <span className={cn(
                    "absolute inset-x-0 bottom-0 h-0.5 bg-[#22075e] transform origin-left transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0"
                )} />
            </Link>
        ) : (
            <a href={href} className={className}>
                <span className="relative z-10 inline-block transition-transform duration-300">{children}</span>
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
                    <img src={orbitLogo} alt="Orbit" className="h-12 w-auto object-contain" />
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
