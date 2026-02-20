import React, { useEffect } from 'react';
import CardShowcase from '../components/CardShowcase';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function OrbitCardPage() {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <SEO
                title="Orbit Wallet Card | One Card for Everything"
                description="The Orbit Wallet NCMC card works across metro, bus, parking, and retail + e-commerce outlets nationwide. Secure, instant, and interoperable."
                url="https://orbitwallet.com/orbit-card"
            />
            <main className="pt-20"> {/* Add padding for fixed navbar */}
                <CardShowcase />
                <Footer />
            </main>
        </>
    );
}
