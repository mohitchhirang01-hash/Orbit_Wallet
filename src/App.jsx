import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FloatingCard from './components/FloatingCard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--orbit-primary)] text-slate-900 selection:bg-cyan-500/30 font-sans transition-colors duration-300">
        <FloatingCard />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
