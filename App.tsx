import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Layout, Globe, User, LogOut, LayoutTemplate, Settings, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './components/Button';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { TEMPLATES, MOCK_CHART_DATA } from './constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  onLogin: () => void;
}> = ({ toggleLang, lang, onLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
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
            
            <Button variant="ghost" size="sm" onClick={onLogin}>Sign In</Button>
            <Button variant="primary" size="sm" onClick={onLogin}>Get Started</Button>
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
                 <Button variant="outline" className="w-full justify-center" onClick={onLogin}>Sign In</Button>
                 <Button variant="primary" className="w-full justify-center" onClick={onLogin}>Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const DashboardSidebar: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Layout, label: 'Overview', path: '/dashboard' },
    { icon: LayoutTemplate, label: 'Templates', path: '/dashboard/templates' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    { icon: CreditCard, label: 'Billing', path: '/dashboard/billing' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed h-full hidden lg:flex flex-col z-40">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold font-display mr-2 shadow-md">S</div>
        <span className="font-display font-bold text-xl">Sewax</span>
      </div>
      
      <div className="p-4 flex-1">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-500' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-gray-900 truncate">Sudeep K.</p>
            <p className="text-xs text-gray-500 truncate">My First Store</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-2 text-gray-500 hover:text-red-600 px-3 py-2 text-sm transition-colors rounded-lg hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </aside>
  );
};

// --- Page Components ---

const DashboardOverview: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Sudeep 👋</p>
        </div>
        <Button>Create New Site</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Visitors', value: '12,345', change: '+12%', positive: true },
          { label: 'Sales (NPR)', value: '45,000', change: '+8%', positive: true },
          { label: 'Bounce Rate', value: '42%', change: '-2%', positive: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
        <h3 className="font-bold mb-6">Traffic Overview</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_CHART_DATA}>
              <defs>
                <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C8102E" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#C8102E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="visitors" stroke="#C8102E" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-4">Recent Sales</h3>
          <div className="space-y-4">
             {[1,2,3].map(i => (
               <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">ES</div>
                   <div>
                     <p className="text-sm font-medium">Order #20{i}</p>
                     <p className="text-xs text-gray-500">via eSewa</p>
                   </div>
                 </div>
                 <span className="font-bold text-sm">NPR 1,500</span>
               </div>
             ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-4">Active Plan</h3>
          <div className="p-4 bg-primary-50 rounded-lg border border-primary-100 mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-primary-900">Byawasaya (Pro)</h4>
                <p className="text-sm text-primary-700">Next billing: Oct 24, 2024</p>
              </div>
              <span className="bg-white text-primary-700 text-xs font-bold px-2 py-1 rounded">Active</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full">Manage Subscription</Button>
        </div>
      </div>
    </div>
  );
};

// --- Mock Sub-Pages ---
const TemplatesPage = () => (
  <div className="p-8">
     <h1 className="text-2xl font-bold mb-6">My Templates</h1>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {TEMPLATES.slice(0, 3).map(t => (
         <div key={t.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src={t.image} alt={t.name} className="h-40 w-full object-cover"/>
            <div className="p-4">
               <h3 className="font-bold">{t.name}</h3>
               <p className="text-sm text-gray-500 mb-4">{t.category}</p>
               <Button variant="outline" size="sm" className="w-full">Preview</Button>
            </div>
         </div>
       ))}
     </div>
  </div>
);

const SettingsPage = () => (
   <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" defaultValue="My First Store"/>
         </div>
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2" defaultValue="support@mystore.com"/>
         </div>
         <div className="flex items-center gap-2 pt-4">
             <Button>Save Changes</Button>
         </div>
      </div>
   </div>
);

const BillingPage = () => (
  <div className="p-8 max-w-2xl">
     <h1 className="text-2xl font-bold mb-6">Billing & Plans</h1>
     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="font-bold mb-2">Current Plan</h3>
        <p className="text-gray-600 mb-4">You are on the <span className="font-bold text-gray-900">Pro Plan</span> (NPR 1500/mo)</p>
        <div className="h-2 bg-gray-100 rounded-full mb-2">
           <div className="h-full w-2/3 bg-primary-500 rounded-full"></div>
        </div>
        <p className="text-xs text-gray-500 mb-4">20 days remaining in this cycle</p>
        <Button variant="outline">Upgrade Plan</Button>
     </div>
     
     <h3 className="font-bold mb-4">Payment Methods</h3>
     <div className="space-y-3">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
           <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-green-600 rounded"></div>
              <span className="font-medium">eSewa (984*****)</span>
           </div>
           <span className="text-xs bg-gray-100 px-2 py-1 rounded">Default</span>
        </div>
     </div>
  </div>
);

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
                onLogin={() => setIsAuthenticated(true)}
              />
              <LandingPage lang={language} />
              <Footer />
            </>
          } />

          {/* Protected Routes */}
          <Route path="/dashboard/*" element={
            isAuthenticated ? (
              <div className="flex min-h-screen bg-gray-50">
                <DashboardSidebar onLogout={handleLogout} />
                <main className="flex-1 lg:ml-64">
                   <Routes>
                      <Route path="/" element={<DashboardOverview />} />
                      <Route path="/templates" element={<TemplatesPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/billing" element={<BillingPage />} />
                   </Routes>
                </main>
              </div>
            ) : <Navigate to="/" />
          } />
          
          {/* Mock Login Redirect */}
          <Route path="/login" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;