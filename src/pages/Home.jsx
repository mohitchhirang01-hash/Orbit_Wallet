import React from 'react';
import Hero from '../components/Hero';
import Interoperability from '../components/Interoperability';
import MeetOrbit from '../components/MeetOrbit';
import Unification from '../components/Unification';
import HorizontalScroll from '../components/HorizontalScroll';
import NCMCInterface from '../components/NCMCInterface';
import Rewards from '../components/Rewards';
import Partnerships from '../components/Partnerships';
import Footer from '../components/Footer';

export default function Home() {
    return (
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
            <Footer />
        </main>
    );
}
