import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import NCMCDocumentation from './pages/NCMCDocumentation';
import Features from './pages/Features';
import OrbitCardPage from './pages/OrbitCardPage';
import AboutUs from './pages/AboutUs';
import FloatingCard from './components/FloatingCard';
import { ReactLenis } from 'lenis/react';

function Layout() {
  const location = useLocation();
  // show FloatingCard only on /
  const showFloatingCard = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[var(--orbit-primary)] text-slate-900 selection:bg-cyan-500/30 font-sans transition-colors duration-300">
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
      </Routes>
    </div>
  );
}

function App() {
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
