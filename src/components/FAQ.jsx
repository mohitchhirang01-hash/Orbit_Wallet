import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
    const [openIndex, setOpenIndex] = React.useState(null);
    const faqRef = useRef(null);

    const faqs = [
        {
            question: "What is Orbit Wallet?",
            answer: "Orbit Wallet is a comprehensive NCMC (National Common Mobility Card) solution that enables seamless travel and payments across India. With one card, you can pay for metro, bus, toll, parking, and retail purchases nationwide."
        },
        {
            question: "What is NCMC (National Common Mobility Card)?",
            answer: "NCMC is an interoperable, EMV-based contactless payment system launched by the Government of India. It allows users to make transit and retail payments using a single card across multiple cities and transport systems. It's also known as 'One Nation One Card'."
        },
        {
            question: "How does Orbit Wallet work?",
            answer: "Orbit Wallet works on NCMC technology. Simply tap your Orbit Card on compatible readers at metro gates, bus entry points, toll plazas, parking facilities, or retail POS terminals. The payment is processed instantly, and you can track all your transactions in real-time."
        },
        {
            question: "Where can I use my NCMC card?",
            answer: "You can use your NCMC-enabled Orbit Card across 15+ cities in India for metro, bus, and suburban rail. It also works at toll plazas, parking facilities, and retail stores that accept contactless payments. The network is continuously expanding."
        },
        {
            question: "Is NCMC different from a regular metro card?",
            answer: "Yes! Unlike traditional closed-loop metro cards that work only in one city, NCMC is an open-loop system that works nationwide. You can use the same card for multiple purposes including transit, shopping, and bill payments across different cities and systems."
        },
        {
            question: "How is Orbit Wallet better than UPI?",
            answer: "While UPI requires internet connectivity, Orbit Wallet's NCMC card works offline with instant tap-and-go payments (<300ms). This makes it ideal for high-traffic transit scenarios where speed is critical. You also don't need to open an app or enter a PIN for small transactions."
        },
        {
            question: "Is my Orbit Card secure?",
            answer: "Absolutely. Orbit Cards use EMV cryptography, dynamic data authentication, and PCI-DSS compliant security standards. All transactions are encrypted, and the card follows RBI guidelines with built-in fraud detection mechanisms."
        },
        {
            question: "How do I recharge my Orbit Card?",
            answer: "You can recharge your Orbit Card through the Orbit Wallet app, at metro stations, authorized retail outlets, or online through net banking. The card balance updates instantly and can be checked anytime through the app."
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(faqRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: faqRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }, faqRef);

        return () => ctx.revert();
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Structured data for FAQ
    const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <section ref={faqRef} className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
            {/* FAQ Schema */}
            <script type="application/ld+json">
                {JSON.stringify(faqStructuredData)}
            </script>

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold font-bricolage text-[#22075e] mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-slate-600">
                        Everything you need to know about Orbit Wallet and NCMC
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                                aria-expanded={openIndex === index}
                            >
                                <h3 className="text-lg font-semibold text-slate-900 pr-4 font-bricolage">
                                    {faq.question}
                                </h3>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-[#22075e] flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-5 pt-2">
                                    <p className="text-slate-700 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-600 mb-4">Still have questions?</p>
                    <a
                        href="mailto:help@orbitwallet.in"
                        className="inline-block px-8 py-3 bg-[#22075e] hover:bg-[#1a0548] text-white font-semibold rounded-full transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
