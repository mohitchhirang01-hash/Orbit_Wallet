import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import partnerMumbaiMetro from '../assets/mumbai_metro_icon.webp';
import partnerMumbaiBest from '../assets/mumbai_best_icon.webp';
import partnerLucknowMetro from '../assets/lucknow_metro_icon.webp';
import partnerDelhiMetro from '../assets/delhi_metro_icon.webp';
import partnerBangaloreMetro from '../assets/bangalore_metro_icon.webp';


const Footer = () => {

    return (
        <footer
            className="relative w-full bg-[#0b1426] text-white overflow-hidden pt-24 pb-12"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Radial Gradient for 'Planet Horizon' effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1000px] bg-[radial-gradient(circle_at_center,_rgba(40,50,80,0.4)_0%,_rgba(11,20,38,0)_70%)] blur-3xl"></div>

                {/* Stars / Particles (Static for now, could be animated canvas) */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col gap-16">

                {/* Top Section: Split Layout (Text Left, Icons Right) */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text Content */}
                    <div className="w-full relative z-20 flex flex-col items-start text-left">
                        <h2
                            className="font-bold tracking-tight leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 font-bricolage"
                            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
                        >
                            A Nation,<br />Already in Orbit.
                        </h2>



                        {/* Trust Metric (Moved near text) */}
                        <div className="mt-8 text-sm text-white/40 tracking-widest uppercase">
                            Powering mobility and payments infrastructure nationwide
                        </div>
                    </div>

                    {/* Right Column: Active Card Icons */}
                    <div className="w-full flex justify-center lg:justify-end gap-6 flex-wrap">
                        {/* Wrapper for grid layout of icons */}
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { name: 'Mumbai Metro', icon: partnerMumbaiMetro },
                                { name: 'Mumbai BEST', icon: partnerMumbaiBest },
                                { name: 'Lucknow Metro', icon: partnerLucknowMetro },
                                { name: 'Delhi Metro', icon: partnerDelhiMetro },
                                { name: 'Bangalore Metro', icon: partnerBangaloreMetro },
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-3 group">
                                    <div className="w-40 h-40 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-6 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                        <img
                                            src={item.icon}
                                            alt={item.name}
                                            className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-500 hover:scale-110"
                                        />
                                    </div>
                                    <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors text-center max-w-[100px] leading-tight opacity-100 duration-300">
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Divider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16"></div>

                {/* 4. Lower Footer (Utility) */}
                <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

                    {/* Brand Column & Address */}
                    <div className="md:col-span-5 flex flex-col items-start pr-4">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Orbit Wallet</span>
                        </div>

                        {/* Address */}
                        <div className="text-white/50 text-sm leading-relaxed mb-6 font-light">
                            <p className="font-medium text-white/70 mb-2">Registered Office:</p>
                            <p>1241, 1st Floor, 18th cross road,<br />5th main road, Sector-7,<br />HSR Layout, Bengaluru 560102</p>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col gap-2 mb-8 text-sm text-white/60">
                            <a href="tel:+917676354969" className="hover:text-white transition-colors">+91 7676354969</a>
                            <a href="mailto:help@orbitwallet.in" className="hover:text-white transition-colors">help@orbitwallet.in</a>
                        </div>

                        <div className="flex gap-4">
                            {/* Instagram */}
                            <a href="https://www.instagram.com/orbit.wallet/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer border border-white/5">
                                <span className="sr-only">Instagram</span>
                                <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                            {/* Facebook */}
                            <a href="https://www.facebook.com/orbitwallet/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer border border-white/5">
                                <span className="sr-only">Facebook</span>
                                <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978 1.602 0 3.284.312 3.284.312v4.266h-2.172c-2.433 0-2.859 1.267-2.859 3.102v1.878h4.513l-.819 3.667h-3.694v7.98h-4.307z" /></svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="https://www.linkedin.com/company/orbit-wallet/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer border border-white/5">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="md:col-span-2 text-left">
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-4 text-white/60">
                            <li className="hover:text-white transition-colors">
                                <Link to="/about">About Us</Link>
                            </li>
                            <li className="hover:text-white transition-colors">
                                <Link to="/media">Media</Link>
                            </li>
                            <li className="hover:text-white transition-colors">
                                <Link to="/blog">Blogs</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Important Links */}
                    <div className="md:col-span-3 text-left">
                        <h4 className="text-white font-semibold mb-6">Important Links</h4>
                        <ul className="space-y-4 text-white/60">
                            <li className="hover:text-white transition-colors">
                                <a href="https://orbitwallet.notion.site/Privacy-Policy-03a80c22b72f4b53b057bd4965015142" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                            </li>
                            <li className="hover:text-white transition-colors">
                                <a href="https://orbitwallet.notion.site/Terms-Conditions-71db29ea149e443e92516e2e8499969c" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
                            </li>
                            <li className="hover:text-white transition-colors">
                                <a href="https://orbitwallet.notion.site/Pricing-Fees-Terms-b7b16445650c416dacd1a0d780501162" target="_blank" rel="noopener noreferrer">Pricing and Fees</a>
                            </li>
                            <li className="hover:text-white transition-colors">
                                <a href="https://orbitwallet.notion.site/Refund-Policy-53bd02d3ae7f4ee8a9de8860d7dfe9d5" target="_blank" rel="noopener noreferrer">Refund Policy</a>
                            </li>
                        </ul>
                    </div>

                    {/* App Store CTA */}
                    <div className="md:col-span-2 flex flex-col items-start md:items-end gap-4">
                        <h4 className="text-white font-semibold opacity-0 md:opacity-100">Download</h4>
                        <a href="https://play.google.com/store/apps/details?id=com.orbitwallet&hl=en_IN" target="_blank" rel="noopener noreferrer" className="group relative px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 flex items-center gap-2 w-full md:w-auto">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 font-medium">Google Play</span>
                            <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            <div className="absolute inset-0 rounded-full ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-500"></div>
                        </a>
                        <a href="https://apps.apple.com/in/app/orbit-wallet/id6480415069" target="_blank" rel="noopener noreferrer" className="group relative px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 flex items-center gap-2 w-full md:w-auto">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 font-medium">App Store</span>
                            <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            <div className="absolute inset-0 rounded-full ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-500"></div>
                        </a>
                    </div>

                </div>

                <div className="mt-20 flex flex-col md:flex-row items-center justify-between text-white/20 text-xs tracking-wider gap-4">
                    <p>Copyright © 2026 Sakaera Technologies Pvt. Ltd.</p>
                    <p>Made with ❤️ in India</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
