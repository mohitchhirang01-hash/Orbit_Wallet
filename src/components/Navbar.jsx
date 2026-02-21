import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, FileText, Newspaper, Info, Megaphone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import orbitLogo from '../assets/orbit_logo.png';

const companyItems = [
    {
        name: 'About Us',
        href: '/about',
        icon: Info,
        desc: 'Our mission, vision and values',
    },
    {
        name: 'Media',
        href: '/media',
        icon: Megaphone,
        desc: 'Latest news and press releases',
    },
    {
        name: 'NCMC Documentation',
        href: '/ncmc-documentation',
        icon: FileText,
        desc: 'Technical specs & integration guides',
    },
    {
        name: 'Blog',
        href: '/blog',
        icon: Newspaper,
        desc: 'Insights on mobility & payments',
    },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [companyOpen, setCompanyOpen] = useState(false);
    const [companyMobileOpen, setCompanyMobileOpen] = useState(false);
    const location = useLocation();

    const navRef = useRef(null);
    const containerRef = useRef(null);
    const dropdownRef = useRef(null);
    const hoverTimeout = useRef(null);

    useEffect(() => {
        const el = navRef.current;
        const container = containerRef.current;

        let ctx = gsap.context(() => {
            gsap.set(el, { y: 0, opacity: 1, autoAlpha: 1 });

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

    const handleCompanyEnter = () => {
        clearTimeout(hoverTimeout.current);
        setCompanyOpen(true);
    };

    const handleCompanyLeave = () => {
        hoverTimeout.current = setTimeout(() => setCompanyOpen(false), 150);
    };

    const MagneticLink = ({ children, href, internal, isActive }) => {
        const className = cn(
            "group relative px-4 py-2 text-sm font-medium transition-all duration-300 inline-flex items-center hover:scale-110",
            isActive ? "text-slate-900" : "text-slate-600 hover:text-black"
        );

        return internal ? (
            <Link to={href} className={className}>
                <span className="relative z-10 inline-block transition-transform duration-300">{children}</span>
                <span className={cn(
                    "absolute inset-x-0 bottom-0 h-0.5 bg-[#22075e] transform origin-left transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
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
                    <img src={orbitLogo} alt="Orbit Wallet" className="h-12 w-auto object-contain" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">

                    {/* Orbit Card – direct link */}
                    <MagneticLink href="/orbit-card" internal isActive={location.pathname === '/orbit-card'}>
                        Orbit Wallet Card
                    </MagneticLink>

                    {/* Company Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={handleCompanyEnter}
                        onMouseLeave={handleCompanyLeave}
                    >
                        <button
                            className={cn(
                                "flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105",
                                companyOpen ? "text-slate-900" : "text-slate-600 hover:text-black"
                            )}
                        >
                            Company
                            <ChevronDown
                                size={14}
                                className={cn(
                                    "transition-transform duration-200",
                                    companyOpen ? "rotate-180" : "rotate-0"
                                )}
                            />
                        </button>

                        <AnimatePresence>
                            {companyOpen && (
                                <motion.div
                                    ref={dropdownRef}
                                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                    transition={{ duration: 0.18, ease: 'easeOut' }}
                                    onMouseEnter={handleCompanyEnter}
                                    onMouseLeave={handleCompanyLeave}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl overflow-hidden"
                                >
                                    <div className="p-2 flex flex-col gap-0.5">
                                        {companyItems.map((item) => {
                                            const Icon = item.icon;
                                            const isActive = location.pathname === item.href;
                                            return (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    onClick={() => setCompanyOpen(false)}
                                                    className={cn(
                                                        "flex items-start gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                                                        isActive
                                                            ? "bg-[#22075e]/8 text-[#22075e]"
                                                            : "hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                                        isActive ? "bg-[#22075e]/10" : "bg-slate-100 group-hover:bg-[#22075e]/10"
                                                    )}>
                                                        <Icon size={15} className={cn(
                                                            "transition-colors",
                                                            isActive ? "text-[#22075e]" : "text-slate-500 group-hover:text-[#22075e]"
                                                        )} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold leading-tight">{item.name}</p>
                                                        <p className="text-xs text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

                {/* CTA & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => window.open('https://play.google.com/store/apps/details?id=com.orbitwallet&hl=en_IN', '_blank')}
                        className="btn-shimmer hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-sm hover:scale-105 active:scale-95 transition-transform shadow-lg hover:shadow-cyan-500/25"
                    >
                        Get Orbit Wallet
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
                        className="absolute top-24 left-6 right-6 p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200 flex flex-col gap-2 md:hidden shadow-2xl origin-top pointer-events-auto"
                    >
                        {/* Orbit Card – direct link */}
                        <Link
                            to="/orbit-card"
                            className="text-slate-700 hover:text-black font-medium py-3 px-4 rounded-xl hover:bg-slate-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Orbit Wallet Card
                        </Link>

                        {/* Company section – mobile collapsible */}
                        <div>
                            <button
                                onClick={() => setCompanyMobileOpen(!companyMobileOpen)}
                                className="w-full flex items-center justify-between text-slate-700 font-semibold py-3 px-4 rounded-xl hover:bg-slate-100 transition-colors"
                            >
                                <span>Company</span>
                                <ChevronDown
                                    size={15}
                                    className={cn("transition-transform duration-200", companyMobileOpen ? "rotate-180" : "")}
                                />
                            </button>
                            <AnimatePresence>
                                {companyMobileOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pl-4 flex flex-col gap-1 pb-2">
                                            {companyItems.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <Link
                                                        key={item.name}
                                                        to={item.href}
                                                        onClick={() => { setIsOpen(false); setCompanyMobileOpen(false); }}
                                                        className="flex items-center gap-3 text-slate-600 hover:text-black font-medium py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors text-sm"
                                                    >
                                                        <Icon size={14} className="text-slate-400" />
                                                        {item.name}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>


                        <button
                            onClick={() => window.open('https://play.google.com/store/apps/details?id=com.orbitwallet&hl=en_IN', '_blank')}
                            className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold shadow-lg mt-1"
                        >
                            Get Orbit Wallet
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
