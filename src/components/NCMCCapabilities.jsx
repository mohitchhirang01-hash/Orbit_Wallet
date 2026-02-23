import React, { useState, useEffect } from 'react';
import { Smartphone, ShieldCheck, Zap } from 'lucide-react';
import featureImage1 from '../assets/update_and_check_balance.png';
import featureImage1_1 from '../assets/update_and_check_balance1.png';
import featureImage1_2 from '../assets/update_and_check_balance2.png';
import featureImage2 from '../assets/double_tap_feature.png';
import featureImage3 from '../assets/add_any_ncmc_card_feature.png';

const Card = ({ image, icon: Icon, title, description, extraInfo, color, className = "h-[450px]", imageClassName = "h-full w-full" }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = Array.isArray(image) ? image : [image];

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Cycle every 3 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className={`group [perspective:1000px] w-full ${className}`}>
            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl rounded-[2rem]">
                {/* Front Side */}
                <div className="absolute inset-0 bg-white border border-slate-100 rounded-[2rem] [backface-visibility:hidden] flex flex-col overflow-hidden">
                    {/* Image Section */}
                    <div className="flex-grow w-full bg-slate-50 relative flex items-center justify-center p-6 pb-2">
                        {/* Soft Glow */}
                        <div className={`absolute inset-0 opacity-10 blur-3xl rounded-full ${color}`}></div>
                        <img
                            src={images[currentImageIndex]}
                            alt={title}
                            className={`${imageClassName} object-contain relative z-10 drop-shadow-lg group-hover:scale-110 transition-all duration-700`}
                        />
                    </div>

                    {/* Text Section */}
                    <div className="p-6 shrink-0 flex flex-col">
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-bricolage tracking-tight">{title}</h3>

                        <div className="mt-4 flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] group-hover:opacity-0 transition-opacity">
                            Hover to reveal info
                        </div>
                    </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 h-full w-full rounded-[2rem] bg-[#0B0B0F] p-10 text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center text-center">
                    <div className={`w-12 h-12 rounded-2xl ${color}/20 flex items-center justify-center mb-6`}>
                        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                    </div>
                    <h4 className="text-lg font-bold font-bricolage text-white mb-4 uppercase tracking-wider">Inside the Tech</h4>
                    <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line text-left flex-grow flex items-center justify-center">
                        <span className="w-full">{extraInfo}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function NCMCCapabilities() {
    const features = [
        {
            image: [featureImage1, featureImage1_1, featureImage1_2],
            icon: Smartphone,
            title: "1. Seamless Recharge",
            description: "",
            extraInfo: "Top up your prepaid/NCMC wallet instantly. No queues, no waiting.\n\n- Pop up on Prepaid and NCMC reflecting 2 diff balances",
            color: "bg-blue-500"
        },
        {
            image: featureImage2,
            icon: ShieldCheck,
            title: "2. Update/claim balance",
            description: "",
            extraInfo: "Tap your card to your phone to update your balance. Skip the AVM machines entirely.",
            color: "bg-[#06b6d4]"
        },
        {
            image: featureImage3,
            icon: Zap,
            title: "3. Add any NCMC card",
            description: "",
            extraInfo: "Add multiple cards and manage them all from a single dashboard.",
            color: "bg-purple-500"
        }
    ];

    return (
        <section id="ncmc-capabilities" className="py-24 bg-white overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-50 rounded-full blur-[120px] -z-10 opacity-60"></div>

            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold tracking-wider mb-8 uppercase">
                        Orbit Ecosystem
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-bricolage text-[#0B0B0F] tracking-tight">
                        Powering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 uppercase">Mobility Revolution</span>
                    </h2>
                </div>

                <div className="transform scale-[0.9] lg:scale-[0.8] origin-top">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* First Large Card */}
                        <div className="h-full">
                            <Card
                                {...features[0]}
                                className="h-full min-h-[450px] lg:min-h-[932px]"
                                imageClassName="h-4/5 w-4/5 lg:h-[95%] lg:w-[85%]"
                            />
                        </div>
                        {/* Right side stacked cards */}
                        <div className="flex flex-col gap-8">
                            {features.slice(1).map((feature, index) => (
                                <Card key={index + 1} {...feature} className="h-[450px]" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
