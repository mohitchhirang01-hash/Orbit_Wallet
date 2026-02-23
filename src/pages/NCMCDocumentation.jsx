import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Home, ChevronDown, ChevronUp, Copy, Check, TrainFront, Bus, CableCar, ShoppingBag, CircleParking, Ticket } from 'lucide-react';
import SEO from '../components/SEO';
import OneNationCard from '../components/OneNationCard';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const NCMCDocumentation = () => {
    const progressBarRef = useRef(null);
    const [activeSection, setActiveSection] = useState('what-is-ncmc');
    const [expandedAccordion, setExpandedAccordion] = useState(null);
    const [copiedText, setCopiedText] = useState('');

    // Table of Contents
    const sections = [
        { id: 'what-is-ncmc', title: 'What is NCMC?' },
        { id: 'core-objective', title: 'Core Objective' },
        { id: 'technical-architecture', title: 'Technical Architecture' },
        { id: 'card-types', title: 'Card Types' },
        { id: 'security', title: 'Security & Compliance' },
        { id: 'use-cases', title: 'Use Cases' },
        { id: 'benefits', title: 'Benefits' },
        { id: 'comparison', title: 'NCMC vs Others' },
        { id: 'future', title: 'Future Roadmap' },
    ];

    // Scrollspy and Progress Bar
    useEffect(() => {
        const updateProgress = () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            if (progressBarRef.current) {
                progressBarRef.current.style.width = scrolled + '%';
            }
        };

        const updateActiveSection = () => {
            const sectionElements = sections.map(s => document.getElementById(s.id));
            const scrollPosition = window.scrollY + 150;

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const section = sectionElements[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', updateProgress);
        window.addEventListener('scroll', updateActiveSection);
        updateProgress();
        updateActiveSection();

        return () => {
            window.removeEventListener('scroll', updateProgress);
            window.removeEventListener('scroll', updateActiveSection);
        };
    }, []);

    // GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Fade in sections
            gsap.utils.toArray('.doc-section').forEach(section => {
                gsap.fromTo(section,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                        }
                    }
                );
            });

            // Stagger grid items
            gsap.utils.toArray('.stagger-item').forEach(item => {
                gsap.fromTo(item,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                        }
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => setCopiedText(''), 2000);
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    return (
        <>
            <SEO
                title="NCMC Documentation | Complete Guide to National Common Mobility Card"
                description="Comprehensive NCMC (National Common Mobility Card) documentation. Learn about architecture, implementation, security, benefits, and the future of interoperable transit payments in India."
                keywords="ncmc, national common mobility card, ncmc documentation, ncmc architecture, ncmc implementation, one nation one card, transit interoperability, metro card india"
                url="https://orbitwallet.com/ncmc-documentation"
                breadcrumbs={[
                    { name: "Home", url: "https://orbitwallet.com/" },
                    { name: "Documentation", url: "https://orbitwallet.com/ncmc-documentation" },
                    { name: "NCMC", url: "https://orbitwallet.com/ncmc-documentation" }
                ]}
            />
            <div className="min-h-screen bg-[#F8F9FC]">
                {/* Reading Progress Bar */}
                <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
                    <div
                        ref={progressBarRef}
                        className="h-full bg-gradient-to-r from-[#22075e] to-[#1a0548] transition-all duration-150"
                    ></div>
                </div>

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-white">
                    {/* Background Effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#22075e]/5 to-transparent blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[#22075e]/5 to-transparent blur-3xl"></div>
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-8">
                            <Link to="/" className="hover:text-[#22075e] transition-colors flex items-center gap-1">
                                <Home className="w-4 h-4" />
                                Home
                            </Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-slate-400">Documentation</span>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-[#22075e] font-medium">NCMC</span>
                        </div>

                        {/* Hero Content */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-bricolage text-[#22075e] mb-6 tracking-tight">
                            NCMC Documentation
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl leading-relaxed">
                            Understanding the National Common Mobility Card ecosystem — architecture, standards, infrastructure, and implementation.
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sticky Sidebar */}
                        <aside className="lg:col-span-3">
                            <div className="lg:sticky lg:top-24">
                                <nav className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 font-bricolage">
                                        Table of Contents
                                    </h3>
                                    <ul className="space-y-2">
                                        {sections.map(section => (
                                            <li key={section.id}>
                                                <button
                                                    onClick={() => scrollToSection(section.id)}
                                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeSection === section.id
                                                        ? 'bg-[#22075e]/10 text-[#22075e] font-semibold'
                                                        : 'text-slate-600 hover:bg-slate-100'
                                                        }`}
                                                >
                                                    {section.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </aside>

                        {/* Content Area */}
                        <main className="lg:col-span-9">
                            <div className="max-w-4xl space-y-16">

                                {/* Section 1: What is NCMC? */}
                                <section id="what-is-ncmc" className="doc-section">
                                    <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#22075e] mb-6">
                                        National Common Mobility Card (NCMC)
                                    </h2>
                                    <div className="prose prose-lg max-w-none">
                                        <p className="text-slate-700 leading-relaxed mb-6">
                                            The <strong>National Common Mobility Card (NCMC)</strong> is an interoperable, EMV-based contactless payment system launched by the Government of India to enable seamless travel across public transport systems nationwide.
                                        </p>

                                        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                                            <h3 className="text-xl font-semibold text-slate-900 mb-4 font-bricolage">NCMC allows users to:</h3>
                                            <ul className="space-y-3 text-slate-700">
                                                <li className="flex items-start gap-3">
                                                    <TrainFront className="w-5 h-5 text-[#22075e] shrink-0 mt-0.5" />
                                                    <span>Pay for metro, bus, suburban rail</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <CableCar className="w-5 h-5 text-[#22075e] shrink-0 mt-0.5" />
                                                    <span>Pay for Rope Ways</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="w-5 h-5 rounded-full border-2 border-[#22075e] flex items-center justify-center shrink-0 mt-0.5">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#22075e]"></div>
                                                    </div>
                                                    <span>Pay toll charges</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <ShoppingBag className="w-5 h-5 text-[#22075e] shrink-0 mt-0.5" />
                                                    <span>Retail + Ecom</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <CircleParking className="w-5 h-5 text-[#22075e] shrink-0 mt-0.5" />
                                                    <span>Parking</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="w-5 h-5 rounded-full border-2 border-[#22075e] flex items-center justify-center shrink-0 mt-0.5">
                                                        <div className="w-2.5 h-1.5 border-b-2 border-r-2 border-[#22075e] rotate-45 mb-1"></div>
                                                    </div>
                                                    <span>ATM withdrawals</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-gradient-to-br from-[#22075e]/10 to-[#22075e]/5 rounded-xl p-6">
                                                <h4 className="font-semibold text-slate-900 mb-2">Commonly Known As</h4>
                                                <p className="text-[#22075e] font-bold text-lg pb-2">"One Nation, One Card"</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl p-6">
                                                <h4 className="font-semibold text-slate-900 mb-2">Launched Under</h4>
                                                <p className="text-slate-700">Ministry of Housing & Urban Affairs (MoHUA)</p>
                                                <p className="text-sm text-slate-600">With NPCI and banking partners</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Section 2: Core Objective */}
                                <section id="core-objective" className="doc-section">
                                    <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#22075e] mb-6">
                                        Why NCMC Exists
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
                                            <h3 className="text-xl font-semibold text-slate-900 mb-3 font-bricolage">The Problem</h3>
                                            <p className="text-slate-700 mb-4">India's transit systems historically operated in silos:</p>
                                            <ul className="space-y-2 text-slate-700">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-500 mt-1">✗</span>
                                                    Different metro cards for each city
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-500 mt-1">✗</span>
                                                    Different bus passes
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-500 mt-1">✗</span>
                                                    Closed-loop systems
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-500 mt-1">✗</span>
                                                    Limited interoperability
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
                                            <h3 className="text-xl font-semibold text-slate-900 mb-3 font-bricolage">The Solution</h3>
                                            <p className="text-slate-700 mb-4">NCMC solves:</p>
                                            <ul className="space-y-2 text-slate-700">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-500 mt-1">✓</span>
                                                    Fragmented transit payments
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-500 mt-1">✓</span>
                                                    Lack of unified payment infrastructure
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-500 mt-1">✓</span>
                                                    Poor offline transaction support
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-500 mt-1">✓</span>
                                                    Vendor lock-in issues
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="bg-[#22075e] text-white rounded-xl p-6">
                                            <h3 className="text-xl font-semibold mb-2 font-bricolage">Goal</h3>
                                            <p className="text-purple-100 text-lg">
                                                Create an open-loop, bank-issued, interoperable card usable across cities and systems.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* Section 3: Technical Architecture */}
                                <section id="technical-architecture" className="doc-section">
                                    <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#22075e] mb-6">
                                        NCMC System Architecture
                                    </h2>

                                    {/* Architecture Flow */}
                                    <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm mb-6">
                                        <div className="flex flex-wrap items-center justify-center gap-4 text-center">
                                            {['User', 'Bank', 'NPCI', 'Acquirer', 'Transit Operator', 'Clearing & Settlement'].map((item, i, arr) => (
                                                <React.Fragment key={item}>
                                                    <div className="stagger-item bg-gradient-to-br from-[#22075e]/10 to-[#22075e]/5 rounded-lg px-6 py-4 min-w-[120px]">
                                                        <div className="font-semibold text-slate-900">{item}</div>
                                                    </div>
                                                    {i < arr.length - 1 && (
                                                        <ChevronRight className="w-5 h-5 text-slate-400" />
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Architecture Components */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="stagger-item bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                                            <h3 className="text-lg font-bold text-slate-900 mb-3 font-bricolage">EMV Contactless Standard</h3>
                                            <ul className="space-y-2 text-slate-700 text-sm">
                                                <li>• Based on RuPay</li>
                                                <li>• ISO/IEC 14443</li>
                                                <li>• Offline data authentication</li>
                                            </ul>
                                        </div>

                                        <div className="stagger-item bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                                            <h3 className="text-lg font-bold text-slate-900 mb-3 font-bricolage">Open-Loop System</h3>
                                            <ul className="space-y-2 text-slate-700 text-sm">
                                                <li>• Bank-issued</li>
                                                <li>• Works across merchants</li>
                                                <li>• Not limited to single transit authority</li>
                                            </ul>
                                        </div>

                                    </div>
                                </section>

                                {/* Section 4: Card Types */}
                                <section id="card-types" className="doc-section">
                                    {/* Comparison Table */}
                                    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm mb-6">
                                        <table className="w-full">
                                            <thead className="bg-slate-50">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Feature</th>
                                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Closed-Loop</th>
                                                    <th className="px-6 py-4 text-left text-sm font-bold text-[#22075e]">Open-Loop (NCMC)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-200">
                                                <tr>
                                                    <td className="px-6 py-4 text-sm text-slate-700">Interoperability</td>
                                                    <td className="px-6 py-4 text-sm text-slate-600">Single system</td>
                                                    <td className="px-6 py-4 text-sm text-[#22075e] font-semibold">Nationwide</td>
                                                </tr>
                                                <tr className="bg-slate-50">
                                                    <td className="px-6 py-4 text-sm text-slate-700">Bank Linked</td>
                                                    <td className="px-6 py-4 text-sm text-slate-600">No</td>
                                                    <td className="px-6 py-4 text-sm text-[#22075e] font-semibold">Yes</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-6 py-4 text-sm text-slate-700">Use Cases</td>
                                                    <td className="px-6 py-4 text-sm text-slate-600">Transit only</td>
                                                    <td className="px-6 py-4 text-sm text-[#22075e] font-semibold">Multi-purpose</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#22075e] mb-6">
                                        Types of NCMC Cards
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {[
                                            { name: 'Debit Card with NCMC', desc: 'Full banking functionality with transit payments' },
                                            { name: 'Prepaid Card', desc: 'Load and use for transit, retail and e-commerce' },
                                        ].map((card, i) => (
                                            <div key={i} className="stagger-item bg-white rounded-xl p-6 border border-slate-200 hover:border-[#22075e]/30 transition-all">
                                                <h3 className="font-bold text-slate-900 mb-2 font-bricolage">{card.name}</h3>
                                                <p className="text-slate-600 text-sm">{card.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Section 5: Security & Compliance */}
                                <section id="security" className="doc-section">
                                    <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#22075e] mb-6">
                                        Security Framework
                                    </h2>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        {[
                                            { title: 'EMV Cryptography', desc: 'Industry-standard encryption for card data' },
                                            { title: 'Dynamic Data Authentication', desc: 'Prevents card cloning and fraud' },
                                            { title: 'Tokenization', desc: 'Secure token-based transactions (if enabled)' },
                                            { title: 'PCI-DSS Compliance', desc: 'Payment card industry security standards' },
                                            { title: 'RBI Guidelines', desc: 'Adherence to Reserve Bank regulations' },
                                            { title: 'Fraud Detection', desc: 'Real-time monitoring and alerts' }
                                        ].map((item, i) => (
                                            <div key={i} className="stagger-item bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                                                <h3 className="font-bold text-slate-900 mb-2 font-bricolage">{item.title}</h3>
                                                <p className="text-slate-600 text-sm">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6">
                                        <h3 className="font-bold text-slate-900 mb-2 font-bricolage">Offline Risk Management</h3>
                                        <p className="text-slate-700">
                                            NCMC implements sophisticated offline risk management rules to balance transaction speed with security, including transaction limits and cumulative offline spend tracking.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 6: Use Cases */}
                                <section id="use-cases" className="doc-section">
                                    <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#22075e] mb-6">
                                        Use Cases
                                    </h2>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[
                                            { icon: TrainFront, title: 'Metro Systems', desc: 'Seamless entry/exit across metro networks', color: 'text-blue-600', bg: 'bg-blue-50' },
                                            { icon: Bus, title: 'State Transport Buses', desc: 'Pay for intercity and local bus rides', color: 'text-green-600', bg: 'bg-green-50' },
                                            { icon: CableCar, title: 'Rope Ways', desc: 'Pay for scenic and urban ropeway journeys', color: 'text-purple-600', bg: 'bg-purple-50' },
                                            { icon: ShoppingBag, title: 'Retail + Ecom', desc: 'Shopping at enabled merchant outlets and online', color: 'text-amber-600', bg: 'bg-amber-50' },
                                            { icon: CircleParking, title: 'Smart City Parking', desc: 'Automated parking fee collection', color: 'text-slate-600', bg: 'bg-slate-50' },
                                            { icon: Ticket, title: 'Event Access Control', desc: 'Entry to venues and controlled areas', color: 'text-pink-600', bg: 'bg-pink-50' }
                                        ].map((useCase, i) => (
                                            <div key={i} className="stagger-item bg-white rounded-xl p-6 border border-slate-200 hover:border-[#22075e]/30 hover:shadow-lg transition-all group">
                                                <div className={`w-12 h-12 rounded-xl ${useCase.bg} ${useCase.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                                                    <useCase.icon size={24} />
                                                </div>
                                                <h3 className="font-bold text-slate-900 mb-2 font-bricolage">{useCase.title}</h3>
                                                <p className="text-slate-600 text-sm">{useCase.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Section 7: Benefits */}
                                <section id="benefits" className="doc-section">
                                    <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#22075e] mb-6">
                                        Benefits
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        {/* For Citizens */}
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-bold text-slate-900 mb-4 font-bricolage">For Citizens</h3>
                                            {[
                                                'One card nationwide',
                                                'No multiple recharges',
                                                'Faster commute',
                                                'Bank-backed security'
                                            ].map((benefit, i) => (
                                                <div key={i} className="stagger-item flex items-start gap-3 bg-blue-50 rounded-lg p-4">
                                                    <span className="text-blue-600 font-bold text-lg">✓</span>
                                                    <span className="text-slate-700">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* For Operators */}
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-bold text-slate-900 mb-4 font-bricolage">For Operators</h3>
                                            {[
                                                'Reduced operational overhead',
                                                'Interoperable infrastructure',
                                                'Open ecosystem',
                                                'Reduced card issuance cost'
                                            ].map((benefit, i) => (
                                                <div key={i} className="stagger-item flex items-start gap-3 bg-green-50 rounded-lg p-4">
                                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                                    <span className="text-slate-700">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* For Government */}
                                        <div className="space-y-4 md:col-span-2">
                                            <h3 className="text-xl font-bold text-slate-900 mb-4 font-bricolage">For Government</h3>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                {[
                                                    'Unified infrastructure',
                                                    'Scalable public systems',
                                                    'Digital India alignment'
                                                ].map((benefit, i) => (
                                                    <div key={i} className="stagger-item flex items-start gap-3 bg-purple-50 rounded-lg p-4">
                                                        <span className="text-[#22075e] font-bold text-lg">✓</span>
                                                        <span className="text-slate-700">{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Section 8: Comparison */}
                                <section id="comparison" className="doc-section">
                                    <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#22075e] mb-6">
                                        NCMC CARD vs QR CODE vs Closed Loop
                                    </h2>

                                    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-slate-50">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Feature</th>
                                                    <th className="px-6 py-4 text-center text-sm font-bold text-[#22075e]">NCMC</th>
                                                    <th className="px-6 py-4 text-center text-sm font-bold text-slate-900">UPI</th>
                                                    <th className="px-6 py-4 text-center text-sm font-bold text-slate-900">Closed Loop Transit Card</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-200">
                                                {[
                                                    { feature: 'Interoperable', ncmc: 'Yes', upi: 'Yes', closed: 'No' },
                                                    { feature: 'Tap Speed', ncmc: 'High', upi: 'Medium', closed: 'High' },
                                                    { feature: 'Internet Required', ncmc: 'No', upi: 'Yes', closed: 'No' },
                                                    { feature: 'Multi-Utility', ncmc: 'Yes', upi: 'No', closed: 'No' }
                                                ].map((row, i) => (
                                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                                        <td className="px-6 py-4 text-sm text-slate-700 font-medium">{row.feature}</td>
                                                        <td className="px-6 py-4 text-sm text-center">
                                                            <span className="inline-block px-3 py-1 rounded-full bg-[#22075e]/10 text-[#22075e] font-semibold">
                                                                {row.ncmc}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-center text-slate-600">{row.upi}</td>
                                                        <td className="px-6 py-4 text-sm text-center text-slate-600">{row.closed}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>

                                {/* Section 9: Future Roadmap */}
                                <section id="future" className="doc-section">
                                    <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#22075e] mb-6">
                                        The Future of Mobility
                                    </h2>

                                    <div className="space-y-6">
                                        <p className="text-slate-700 text-lg leading-relaxed">
                                            NCMC is just the beginning. The future of mobility payments will see deeper integration, broader coverage, and seamless user experiences.
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            {[
                                                { title: 'Account-based Ticketing', desc: 'Move from card-based to account-based systems for greater flexibility' },
                                                { title: 'Tokenized Wearable Integration', desc: 'Pay using smartwatches, bands, and other wearables' },
                                                { title: 'Mobile NFC NCMC', desc: 'Virtual NCMC cards on smartphones for tap-and-go payments' },
                                                { title: 'Digital Identity Integration', desc: 'Link with Aadhaar and other digital IDs for seamless verification' },
                                                { title: 'Unified Mobility Wallet', desc: 'Single wallet for all transit, parking, and micro-mobility needs' },
                                                { title: 'AI-Powered Routing', desc: 'Smart journey planning with integrated payment' }
                                            ].map((item, i) => (
                                                <div key={i} className="stagger-item bg-gradient-to-br from-[#22075e]/5 to-transparent rounded-xl p-6 border border-[#22075e]/20">
                                                    <h3 className="font-bold text-slate-900 mb-2 font-bricolage">{item.title}</h3>
                                                    <p className="text-slate-600 text-sm">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>


                                    </div>
                                </section>

                            </div>
                        </main>
                    </div>
                </div>

                <OneNationCard />
                <Footer />
            </div>
        </>
    );
};

export default NCMCDocumentation;
