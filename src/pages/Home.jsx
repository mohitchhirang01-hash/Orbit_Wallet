import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Interoperability from '../components/Interoperability';
import MeetOrbit from '../components/MeetOrbit';
import Unification from '../components/Unification';
import HorizontalScroll from '../components/HorizontalScroll';
import NCMCInterface from '../components/NCMCInterface';
import Rewards from '../components/Rewards';
import Partnerships from '../components/Partnerships';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
            <SEO
                title="Orbit Wallet | NCMC Card for Transit, Payments & Mobility Across India"
                description="Experience seamless travel with Orbit Wallet's NCMC card. One card for metro, bus, toll, parking & retail payments across India. Payment interoperability made simple with National Common Mobility Card."
                keywords="orbit wallet, ncmc, national common mobility card, transit card india, metro card, bus pass, mobility card, interoperable payment card, rupay card, unified transit payment, ncmc documentation"
                url="https://orbitwallet.com/"
            />
            <main className="main-site-wrapper">
                <div id="hero-section">
                    <Hero />
                </div>
                <div id="interoperability-section">
                    <Interoperability />
                </div>
                <div id="meet-orbit-section">
                    <MeetOrbit />
                </div>
                <div id="unification-section">
                    <Unification />
                </div>
                <div id="horizontal-scroll-section-wrapper">
                    <HorizontalScroll />
                </div>
                <div id="ncmc-interface-section">
                    <NCMCInterface />
                </div>
                <div id="rewards-section">
                    <Rewards />
                </div>
                <div id="partnerships-section">
                    <Partnerships />
                </div>
                <div id="faq-section">
                    <FAQ />
                </div>
                <Footer />
            </main>
        </>
    );
}
