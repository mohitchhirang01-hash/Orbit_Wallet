import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, Zap, Shield, GitBranch, Cpu, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const heroRef = useRef(null);
    const ctaRef = useRef(null);

    const features = [
        {
            id: 1,
            label: 'FEATURE 01',
            icon: <Zap className="w-8 h-8" />,
            title: 'Unified NCMC Integration',
            description: 'Link and manage your National Common Mobility Card within a single digital interface.',
            highlights: [
                'View balance in real time',
                'Offline-ready transit tap support',
                'Recharge across cities',
                'Transaction history analytics'
            ],
            imageAlt: 'NCMC card interface showing balance and recent transactions',
            imagePosition: 'right'
        },
        {
            id: 2,
            label: 'FEATURE 02',
            icon: <GitBranch className="w-8 h-8" />,
            title: 'Public Transit Tap & Go',
            description: 'Seamless metro, bus, and suburban rail access with bank-backed open-loop payments.',
            highlights: [
                'Sub-second tap speed',
                'Multi-city compatibility',
                'Gate-ready offline authentication',
                'Travel summary dashboard'
            ],
            imageAlt: 'Transit card screen with tap animation and ride history',
            imagePosition: 'left'
        },
        {
            id: 3,
            label: 'FEATURE 03',
            icon: <Cpu className="w-8 h-8" />,
            title: 'Unified Payment Dashboard',
            description: 'One financial control layer for transit, retail + e-commerce, rope ways, and smart city payments.',
            highlights: [
                'Spending categorization',
                'Smart insights',
                'Unified transaction ledger',
                'Secure tokenization'
            ],
            imageAlt: 'Analytics dashboard with spending charts and categories',
            imagePosition: 'right'
        },
        {
            id: 4,
            label: 'FEATURE 04',
            icon: <Lock className="w-8 h-8" />,
            title: 'Smart Access & Identity Layer',
            description: 'Use Orbit Wallet as a digital access key for institutions, campuses, events, and gated systems.',
            highlights: [
                'QR + NFC access',
                'Temporary credentials',
                'Access logs',
                'Institutional integrations'
            ],
            imageAlt: 'Access control screen with QR code and entry log',
            imagePosition: 'left'
        },
        {
            id: 5,
            label: 'FEATURE 05',
            icon: <GitBranch className="w-8 h-8" />,
            title: 'Interoperable Infrastructure Layer',
            description: 'Designed for operators and institutions to plug into a unified ecosystem.',
            highlights: [
                'API-ready integrations',
                'NCMC compatible',
                'Account-based architecture',
                'Bank-grade compliance'
            ],
            imageAlt: 'System diagram showing connected nodes and API status',
            imagePosition: 'right'
        },
        {
            id: 6,
            label: 'FEATURE 06',
            icon: <Shield className="w-8 h-8" />,
            title: 'National Scale Security',
            description: 'Built on EMV standards and RBI-compliant frameworks.',
            highlights: [
                'PCI-DSS compliant',
                'Dynamic authentication',
                'Offline risk management',
                'Fraud monitoring'
            ],
            imageAlt: 'Security dashboard with encryption and risk status',
            imagePosition: 'left'
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animation
            gsap.fromTo(heroRef.current.children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out'
                }
            );

            // Feature sections animation
            gsap.utils.toArray('.feature-section').forEach((section) => {
                gsap.fromTo(section,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 75%',
                        }
                    }
                );
            });

            // Bullet points stagger
            gsap.utils.toArray('.feature-highlights').forEach((list) => {
                gsap.fromTo(list.children,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: list,
                            start: 'top 80%',
                        }
                    }
                );
            });

            // Image mockups floating animation
            gsap.utils.toArray('.feature-mockup').forEach((mockup) => {
                gsap.to(mockup, {
                    y: -10,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    scrollTrigger: {
                        trigger: mockup,
                        start: 'top 80%',
                    }
                });
            });

            // CTA section animation
            gsap.fromTo(ctaRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: 'top 80%',
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <SEO
                title="Features | Orbit Wallet - Unified Interoperable Payment Infrastructure"
                description="Discover Orbit Wallet's features: NCMC integration, public transit payments, unified dashboard, smart access control, and bank-grade security for seamless mobility."
                keywords="orbit wallet features, ncmc app, transit payment app, mobility wallet, interoperable payments, smart access control"
                url="https://orbitwallet.com/features"
                breadcrumbs={[
                    { name: "Home", url: "https://orbitwallet.com/" },
                    { name: "Features", url: "https://orbitwallet.com/features" }
                ]}
            />

            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative pt-32 pb-24 px-6 overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#22075e]/10 to-transparent blur-3xl"></div>
                    </div>

                    <div ref={heroRef} className="max-w-6xl mx-auto text-center relative z-10">
                        <h1 className="text-5xl md:text-7xl font-bold font-bricolage text-[#22075e] mb-6 leading-tight">
                            One Interface.<br />Entire Infrastructure.
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-10 leading-relaxed">
                            Orbit Wallet unifies transit, payments, access control, and public systems into a seamless interoperable experience.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <a
                                href="#"
                                className="px-8 py-4 bg-[#22075e] hover:bg-[#1a0548] text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-[#22075e]/30 flex items-center gap-2"
                            >
                                Get Orbit Wallet
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <Link
                                to="/ncmc-documentation"
                                className="px-8 py-4 bg-white hover:bg-slate-50 text-[#22075e] font-semibold rounded-full border-2 border-[#22075e]/20 transition-all transform hover:scale-105 flex items-center gap-2"
                            >
                                View Documentation
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Sections */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto space-y-32">
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                className={`feature-section grid lg:grid-cols-2 gap-12 items-center ${feature.imagePosition === 'left' ? 'lg:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Content */}
                                <div className={`${feature.imagePosition === 'left' ? 'lg:col-start-2' : ''}`}>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#22075e]/10 text-[#22075e] rounded-full mb-4 text-sm font-semibold">
                                        {feature.icon}
                                        <span>{feature.label}</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold font-bricolage text-slate-900 mb-6">
                                        {feature.title}
                                    </h2>
                                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <ul className="feature-highlights space-y-4 mb-8">
                                        {feature.highlights.map((highlight, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-6 h-6 text-[#22075e] flex-shrink-0 mt-0.5" />
                                                <span className="text-slate-700 text-lg">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="text-[#22075e] font-semibold flex items-center gap-2 hover:gap-3 transition-all group">
                                        Explore more
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                                {/* Image Mockup */}
                                <div className={`${feature.imagePosition === 'left' ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                                    <div className="feature-mockup relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-[28px] shadow-2xl p-8 aspect-[9/16] max-w-md mx-auto flex items-center justify-center hover:scale-102 transition-transform">
                                        {/* Placeholder for app screenshot */}
                                        <div className="text-center p-8">
                                            <div className="w-24 h-24 mx-auto mb-6 bg-[#22075e]/10 rounded-3xl flex items-center justify-center">
                                                {feature.icon}
                                            </div>
                                            <p className="text-slate-500 text-sm">
                                                App Screenshot Placeholder
                                            </p>
                                            <p className="text-slate-400 text-xs mt-2">
                                                {feature.imageAlt}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA Section */}
                <section
                    ref={ctaRef}
                    className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-[#22075e]/5 to-white"
                >
                    {/* Decorative orbit line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22075e]/20 to-transparent"></div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h2 className="text-4xl md:text-6xl font-bold font-bricolage text-[#22075e] mb-6">
                            Ready to Experience<br />Interoperable Finance?
                        </h2>
                        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                            Join the unified layer powering the New Bharat.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <a
                                href="#"
                                className="px-8 py-4 bg-[#22075e] hover:bg-[#1a0548] text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-[#22075e]/30"
                            >
                                Get Orbit Wallet
                            </a>
                            <Link
                                to="/ncmc-documentation"
                                className="px-8 py-4 bg-white hover:bg-slate-50 text-[#22075e] font-semibold rounded-full border-2 border-[#22075e]/20 transition-all transform hover:scale-105"
                            >
                                Developer Docs
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default Features;
