import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Instagram } from 'lucide-react';

import harshImg from '../assets/harsh.webp';
import amanImg from '../assets/aman.webp';
import shikhaImg from '../assets/shikha.webp';

const teamMembers = [
    {
        name: "Harshvardhan Zaveri",
        role: "Co-founder & CEO",
        linkedIn: "https://www.linkedin.com/in/harshvardhan-zaveri/",
        image: harshImg
    },
    {
        name: "Aman Bisht",
        role: "Co-founder & CTO",
        linkedIn: "https://www.linkedin.com/in/aman-bisht-00a96411b/",
        image: amanImg
    },
    {
        name: "Shikha Chouksey",
        role: "Co-founder & COO",
        linkedIn: "https://www.linkedin.com/in/shikhachouksey/",
        image: shikhaImg
    }
];

export default function AboutUs() {
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(headerRef.current.children,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                clearProps: "all"
            }
        );

        gsap.fromTo(gridRef.current.children,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)",
                delay: 0.5,
                clearProps: "all"
            }
        );
    });

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <div ref={headerRef} className="text-center mb-20">
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 mb-6">
                    Our Mission
                </h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    We're building the future of payments. One card, one tap, endless possibilities.
                    Orbit is transforming how you travel, shop, and pay across India.
                </p>
            </div>

            <div className="mb-32">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-slate-800">
                    Meet Our Team
                </h2>

                <div ref={gridRef} className="grid md:grid-cols-3 gap-10">
                    {teamMembers.map((member, i) => (
                        <div key={i} className="group relative bg-white rounded-3xl p-6 border border-slate-200 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-inner">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{member.name}</h3>
                            <div className="text-cyan-600 font-medium mb-4">{member.role}</div>

                            <div className="flex gap-4">
                                {member.linkedIn && (
                                    <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-[#0077b5] hover:text-white transition-colors">
                                        <Linkedin size={20} />
                                    </a>
                                )}
                                {member.instagram && (
                                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-[#E1306C] hover:text-white transition-colors">
                                        <Instagram size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Values Section */}
            <div className="grid md:grid-cols-2 gap-10 items-center bg-slate-50 rounded-3xl p-10 md:p-20">
                <div>
                    <h3 className="text-3xl font-bold mb-6 text-slate-900">Why We Exist</h3>
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        Fragmentation in payments and transit creates friction. We believe in a unified,
                        seamless experience where a single tap connects you to your destination.
                    </p>
                    <ul className="space-y-4">
                        {['Innovation First', 'User Centric', 'Seamless Experience'].map(item => (
                            <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative h-[300px] bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-2xl overflow-hidden flex items-center justify-center">
                    <div className="text-9xl font-bold text-white/20 select-none">ORBIT</div>
                </div>
            </div>
        </div>
    );
}
