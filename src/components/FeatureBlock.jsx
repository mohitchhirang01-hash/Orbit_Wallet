import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Zap, ArrowRight } from 'lucide-react';

const FeatureBlock = forwardRef(({ feature, index }, ref) => {
    const { title, description, variant, images } = feature;
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const visualRef = useRef(null);
    const phoneRef = useRef(null);
    const popupRef = useRef(null);
    const cardRef = useRef(null);
    const rippleRef = useRef(null);

    // Expose refs for orchestration
    useImperativeHandle(ref, () => ({
        container: containerRef.current,
        content: contentRef.current,
        visual: visualRef.current,
        phone: phoneRef.current,
        popup: popupRef.current,
        card: cardRef.current,
        ripple: rippleRef.current,
        variant
    }));

    const renderVisual = () => {
        if (variant === 'recharge') {
            return (
                <div ref={phoneRef} className="relative w-full max-w-[160px] md:max-w-[180px] aspect-[9/19] bg-slate-900 rounded-[2rem] border-[6px] border-slate-800 shadow-2xl overflow-hidden will-change-transform">
                    <img src={images[0]} alt="Recharge Screen" className="w-full h-full object-cover" />
                </div>
            );
        }

        if (variant === 'tap') {
            return (
                <div className="relative w-full max-w-[400px] md:max-w-[600px] flex items-center justify-center">
                    <div ref={phoneRef} className="relative w-full h-auto overflow-hidden will-change-transform drop-shadow-2xl">
                        <img src={images[0]} alt="Tap Feature" className="w-full h-auto object-contain rounded-2xl" />
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div
            ref={containerRef}
            className="flex flex-col items-center text-center gap-8 py-8 w-full"
        >
            {/* Visual Block - Top on both mobile/desktop grid */}
            <div ref={visualRef} className="w-full flex justify-center items-center relative opacity-0 transform scale-[0.98] h-[300px] md:h-[400px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-[#22075e]/5 to-transparent blur-3xl rounded-full -z-10" />
                {renderVisual()}
            </div>

            {/* Text Content - Bottom */}
            <div ref={contentRef} className="w-full max-w-sm space-y-4 opacity-0 transform translate-y-6 px-4">
                <div className="flex flex-col items-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0B0B0F] leading-tight tracking-tight font-bricolage">
                        {title.split(' ').map((word, i) => (
                            <span key={i} className={word === 'Seamless' || word === 'Instantly' ? 'text-gradient' : ''}>
                                {word}{' '}
                            </span>
                        ))}
                    </h3>
                </div>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
});

export default FeatureBlock;
