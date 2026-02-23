import React from 'react';

// Import all logos from the assets/logos folder
import astc from '../assets/logos/ASTC.jpg';
import best from '../assets/logos/BEST.jpg';
import cmrl from '../assets/logos/CMRL.jpg';
import dmrcl from '../assets/logos/DMRCL.png';
import gmrc from '../assets/logos/GMRC.jpg';
import hr from '../assets/logos/HR.png';
import hrtc from '../assets/logos/HRTC.jpg';
import ktc from '../assets/logos/KTC.jpg';
import mbrcl from '../assets/logos/MBRCL.jpg';
import mmlc from '../assets/logos/MMLC.png';
import mmrc from '../assets/logos/MMRC.jpg';
import mmrda from '../assets/logos/MMRDA.png';
import ncrtc from '../assets/logos/NCRTC.png';
import upmrc from '../assets/logos/UPMRC.png';

const logos = [
    { name: 'ASTC', src: astc },
    { name: 'BEST', src: best },
    { name: 'CMRL', src: cmrl },
    { name: 'DMRCL', src: dmrcl },
    { name: 'GMRC', src: gmrc },
    { name: 'HR', src: hr },
    { name: 'HRTC', src: hrtc },
    { name: 'KTC', src: ktc },
    { name: 'MBRCL', src: mbrcl },
    { name: 'MMLC', src: mmlc },
    { name: 'MMRC', src: mmrc },
    { name: 'MMRDA', src: mmrda },
    { name: 'NCRTC', src: ncrtc },
    { name: 'UPMRC', src: upmrc },
];

// Split logos into three rows for the strips (14 logos total: 5, 5, 4)
const logosRow1 = logos.slice(0, 5);
const logosRow2 = logos.slice(5, 10);
const logosRow3 = logos.slice(10);

// Duplicate the arrays to ensure a seamless infinite scroll
const marqueeLogos1 = [...logosRow1, ...logosRow1, ...logosRow1];
const marqueeLogos2 = [...logosRow2, ...logosRow2, ...logosRow2];
const marqueeLogos3 = [...logosRow3, ...logosRow3, ...logosRow3];

export default function OneNationCard() {
    return (
        <section className="w-full bg-slate-50 text-slate-900 py-24 overflow-hidden relative border-t border-slate-200" style={{ minHeight: '400px' }}>
            <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 flex flex-col items-center text-center">
                <h2
                    className="font-bold tracking-tight leading-[1] mb-4 bg-clip-text text-transparent bg-gradient-to-b from-[#22075e] to-slate-900 font-bricolage"
                    style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
                >
                    A Nation, <br className="md:hidden" />
                    Already in Orbit.
                </h2>
                <div className="mt-4 text-sm md:text-base text-slate-500 tracking-widest uppercase font-medium">
                    Powering mobility and payments infrastructure nationwide
                </div>
            </div>

            {/* Infinite Marquee Wrapper */}
            <div className="w-full relative py-8 flex flex-col gap-6 items-center overflow-x-hidden group">
                {/* Gradient Masks for fading edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

                {/* First Scrolling Track (Left to Right) */}
                <div className="flex w-max animate-marquee gap-6 md:gap-8 pl-6">
                    {marqueeLogos1.map((logo, index) => (
                        <div
                            key={`row1-${index}`}
                            className="w-32 h-20 md:w-40 md:h-24 flex-shrink-0 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center p-4 hover:shadow-md transition-shadow duration-300"
                        >
                            <img
                                src={logo.src}
                                alt={logo.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* Second Scrolling Track (Right to Left) */}
                <div className="flex w-max animate-marquee-reverse gap-6 md:gap-8 pr-6 ml-[-150px]">
                    {marqueeLogos2.map((logo, index) => (
                        <div
                            key={`row2-${index}`}
                            className="w-32 h-20 md:w-40 md:h-24 flex-shrink-0 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center p-4 hover:shadow-md transition-shadow duration-300"
                        >
                            <img
                                src={logo.src}
                                alt={logo.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* Third Scrolling Track (Left to Right, different speed) */}
                <div className="flex w-max animate-marquee-fast gap-6 md:gap-8 pl-6 ml-[-50px]">
                    {marqueeLogos3.map((logo, index) => (
                        <div
                            key={`row3-${index}`}
                            className="w-32 h-20 md:w-40 md:h-24 flex-shrink-0 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center p-4 hover:shadow-md transition-shadow duration-300"
                        >
                            <img
                                src={logo.src}
                                alt={logo.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Required CSS for animation injected inline for simplicity, or ideally added to index.css */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-100% / 3)); }
                }
                @keyframes marquee-reverse {
                    0% { transform: translateX(calc(-100% / 3)); }
                    100% { transform: translateX(0); }
                }
                .animate-marquee {
                    animation: marquee 25s linear infinite;
                }
                .animate-marquee-reverse {
                    animation: marquee-reverse 30s linear infinite;
                }
                .animate-marquee-fast {
                    animation: marquee 20s linear infinite;
                }
            `}</style>
        </section>
    );
}
