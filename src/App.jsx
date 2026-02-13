import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import NCMCDocumentation from './pages/NCMCDocumentation';
import Features from './pages/Features';
import FloatingCard from './components/FloatingCard';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-[var(--orbit-primary)] text-slate-900 selection:bg-cyan-500/30 font-sans transition-colors duration-300">
          <FloatingCard />
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/ncmc-documentation" element={<NCMCDocumentation />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;

