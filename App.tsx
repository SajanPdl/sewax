import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './components/Button';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { Sidebar } from './components/dashboard/Sidebar';
import { Overview } from './components/dashboard/Overview';
import { Templates } from './components/dashboard/Templates';
import { Settings } from './components/dashboard/Settings';
import { Billing } from './components/dashboard/Billing';
import { SignIn } from './components/SignIn';

// --- Types for App State ---
interface AppState {
  isAuthenticated: boolean;
  language: 'en' | 'np';
  user: { name: string; email: string; company?: string } | null;
}

// --- Layout Components ---

const Navbar: React.FC<{ 
  toggleLang: () => void; 
  lang: 'en' | 'np';
}> = ({ toggleLang, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold font-display shadow-lg shadow-primary-500/30">S</div>
            <span className="font-display font-bold text-xl tracking-tight text-gray-900">Sewax</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-primary-600 font-medium text-sm transition-colors">Features</a>
            <a href="#templates" className="text-gray-600 hover:text-primary-600 font-medium text-sm transition-colors">Templates</a>
            <a href="#pricing" className="text-gray-600 hover:text-primary-600 font-medium text-sm transition-colors">Pricing</a>
            
            <div className="h-4 w-px bg-gray-200"></div>
            
            <button onClick={toggleLang} className="flex items-center gap-1 text-gray-600 hover:text-primary-600 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium uppercase">{lang}</span>
            </button>
            
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Sign In</Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/login')}>Get Started</Button>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-600 font-medium" onClick={() => setIsOpen(false)}>Features</a>
              <a href="#templates" className="block text-gray-600 font-medium" onClick={() => setIsOpen(false)}>Templates</a>
              <a href="#pricing" className="block text-gray-600 font-medium" onClick={() => setIsOpen(false)}>Pricing</a>
              <div className="pt-4 flex flex-col gap-2">
                 <Button variant="outline" className="w-full justify-center" onClick={() => { setIsOpen(false); navigate('/login'); }}>Sign In</Button>
                 <Button variant="primary" className="w-full justify-center" onClick={() => { setIsOpen(false); navigate('/login'); }}>Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState<'en' | 'np'>('en');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-white font-sans">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar 
                toggleLang={() => setLanguage(prev => prev === 'en' ? 'np' : 'en')} 
                lang={language}
              />
              <LandingPage lang={language} />
              <Footer />
            </>
          } />

          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <SignIn onLogin={handleLogin} />
          } />

          {/* Protected Routes */}
          <Route path="/dashboard/*" element={
            isAuthenticated ? (
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar onLogout={handleLogout} />
                <main className="flex-1 lg:ml-64">
                   <Routes>
                      <Route path="/" element={<Overview />} />
                      <Route path="/templates" element={<Templates />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/billing" element={<Billing />} />
                   </Routes>
                </main>
              </div>
            ) : <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;