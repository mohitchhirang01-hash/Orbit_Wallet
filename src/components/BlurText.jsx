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

    // Split text into words or characters
    const elements = useMemo(() => {
        if (animateBy === 'words') {
            return text.split(' ');
        } else {
            return text.split('');
        }
    }, [text, animateBy]);

    useGSAP(() => {
        const items = containerRef.current.querySelectorAll('.blur-item');

        if (triggerOnMount) {
            // Animate immediately on mount
            gsap.fromTo(items,
                {
                    opacity: 0,
                    filter: 'blur(10px)',
                },
                {
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: duration,
                    delay: delay,
                    stagger: 0.02,
                    ease: 'power2.out',
                }
            );
        } else {
            // Animate on scroll
            gsap.fromTo(items,
                {
                    opacity: 0,
                    filter: 'blur(10px)',
                },
                {
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: duration,
                    stagger: 0.02,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    }
                }
            );
        }
    }, { scope: containerRef, dependencies: [delay, duration, triggerOnMount] });

    return (
        <span ref={containerRef} className={className}>
            {elements.map((element, index) => (
                <span
                    key={index}
                    className="blur-item inline-block"
                    style={{ whiteSpace: animateBy === 'words' ? 'pre' : 'normal' }}
                >
                    {element}{animateBy === 'words' && index < elements.length - 1 ? '\u00A0' : ''}
                </span>
            ))}
        </span>
    );
}
