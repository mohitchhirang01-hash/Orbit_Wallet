import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Interoperability from '../components/Interoperability';
import MeetOrbit from '../components/MeetOrbit';
import Unification from '../components/Unification';
import FragmentedVsOrbit from '../components/FragmentedVsOrbit';
import HorizontalScroll from '../components/HorizontalScroll';
import NCMCInterface from '../components/NCMCInterface';
import FeatureSection from '../components/FeatureSection';
import Rewards from '../components/Rewards';
import Partnerships from '../components/Partnerships';
import FAQ from '../components/FAQ';
import OneNationCard from '../components/OneNationCard';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
            <SEO
                title="Orbit Wallet | NCMC Card for Transit, Payments & Mobility Across India"
                description="Experience seamless travel with Orbit Wallet's NCMC card. One card for metro, bus, rope ways, parking & retail + e-commerce payments across India. Payment interoperability made simple with National Common Mobility Card."
                keywords="orbit wallet, ncmc, national common mobility card, transit card india, metro card, bus pass, mobility card, interoperable payment card, rupay card, unified transit payment, ncmc documentation"
                url="https://orbitwallet.com/"
            />
            <main className="main-site-wrapper">
                <section id="hero-section">
                    <Hero />
                </section>
                <section id="interoperability-section">
                    <Interoperability />
                </section>
                <section id="meet-orbit-section">
                    <MeetOrbit />
                </section>
                <section id="unification-section">
                    <Unification />
                </section>
                <section id="fragmented-vs-orbit-section">
                    <FragmentedVsOrbit />
                </section>
                <section id="horizontal-scroll-section-wrapper">
                    <HorizontalScroll />
                </section>
                <section id="features-section">
                    <FeatureSection />
                </section>
                <section id="ncmc-interface-section">
                    <NCMCInterface />
                </section>
                <section id="rewards-section">
                    <Rewards />
                </section>
                <section id="partnerships-section">
                    <Partnerships />
                </section>
                <section id="faq-section">
                    <FAQ />
                </section>
                <OneNationCard />
                <Footer />
            </main>
        </>
    );
}
