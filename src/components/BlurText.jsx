import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function BlurText({
    text,
    className = '',
    delay = 0,
    duration = 1,
    animateBy = 'words', // 'words' or 'chars'
    triggerOnMount = false // if true, animate on mount instead of scroll
}) {
    const containerRef = useRef(null);

    // Split text into words
    const words = useMemo(() => text.split(' '), [text]);

    useGSAP(() => {
        const items = containerRef.current.querySelectorAll('.blur-item');

        const animationConfig = {
            opacity: 1,
            filter: 'blur(0px)',
            duration: duration,
            stagger: 0.02,
            ease: 'power2.out',
        };

        if (triggerOnMount) {
            gsap.fromTo(items,
                { opacity: 0, filter: 'blur(10px)' },
                { ...animationConfig, delay: delay }
            );
        } else {
            gsap.fromTo(items,
                { opacity: 0, filter: 'blur(10px)' },
                {
                    ...animationConfig,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    }
                }
            );
        }
    }, { scope: containerRef, dependencies: [delay, duration, triggerOnMount, animateBy, words] });

    return (
        <span ref={containerRef} className={`${className} inline-block`}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {animateBy === 'chars' ? (
                        word.split('').map((char, charIndex) => (
                            <span key={charIndex} className="blur-item inline-block">
                                {char}
                            </span>
                        ))
                    ) : (
                        <span className="blur-item inline-block">{word}</span>
                    )}
                    {/* Add space after word if it's not the last one */}
                    {wordIndex < words.length - 1 && (
                        <span className="inline-block">&nbsp;</span>
                    )}
                </span>
            ))}
        </span>
    );
}
