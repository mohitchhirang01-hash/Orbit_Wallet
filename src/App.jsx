import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import NCMCDocumentation from './pages/NCMCDocumentation';
import AboutUs from './pages/AboutUs';
import Features from './pages/Features';
import OrbitCardPage from './pages/OrbitCardPage';
import GetApp from './pages/get-app';
import ManageCard from './pages/manage-card';
import MtsOnboarding from './pages/mts-onboarding';
import Referral from './pages/referral';
import SubscriptionAuthStatus from './pages/subscription-auth-status';
import Subscription from './pages/subscription';
import VerifyEmail from './pages/verify-email';
import RefundPolicy from './pages/refund-policy';
import TermsAndConditions from './pages/terms-and-conditions';
import FloatingCard from './components/FloatingCard';
import { ReactLenis } from 'lenis/react';
// Assuming initMixpanel is defined in a utility file; please adjust the path if placed elsewhere.
import { initMixpanel } from './lib/mixpanel';

function Layout() {
  const location = useLocation();
  // show FloatingCard only on /
  const showFloatingCard = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[var(--orbit-primary)] text-slate-900 selection:bg-cyan-500/30 font-sans transition-colors duration-300">
      <Helmet>
        <meta name="apple-itunes-app" content="app-id=6480415069" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZS8JE786NT"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZS8JE786NT');
          `}
        </script>
      </Helmet>
      {showFloatingCard && <FloatingCard />}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/ncmc-documentation" element={<NCMCDocumentation />} />
        <Route path="/orbit-card" element={<OrbitCardPage />} />
        <Route path="/get-app" element={<GetApp />} />
        <Route path="/manage-card/*" element={<ManageCard />} />
        <Route path="/mts-onboarding" element={<MtsOnboarding />} />
        <Route path="/referral/*" element={<Referral />} />
        <Route path="/subscription-auth-status" element={<SubscriptionAuthStatus />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </div>
  );
}

function App() {
  React.useEffect(() => {
    try {
      if (typeof initMixpanel === 'function') {
        initMixpanel(); // Initialize Mixpanel
      }
    } catch (e) {
      console.error("Mixpanel initialization failed", e);
    }
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <HelmetProvider>
        <Router>
          <Layout />
        </Router>
      </HelmetProvider>
    </ReactLenis>
  );
}

export default App;
