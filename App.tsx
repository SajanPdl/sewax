
import React from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/auth/AuthProvider';
import { Sidebar } from './components/dashboard/Sidebar';
import { Overview } from './components/dashboard/Overview';
import { Templates } from './components/dashboard/Templates';
import { Settings } from './components/dashboard/Settings';
import { Billing } from './components/dashboard/Billing';
import { SignIn } from './components/SignIn';
import { SitesList } from './components/dashboard/SitesList';
import { Analytics } from './components/dashboard/Analytics';
import { Team } from './components/dashboard/Team';
import { Integrations } from './components/dashboard/Integrations';
import { WebsiteBuilder } from './components/dashboard/WebsiteBuilder';
import { LandingPage } from './components/LandingPage';
import { Footer } from './components/Footer';

// Commerce Imports
import { POS } from './components/dashboard/POS';
import { Products } from './components/dashboard/Products';
import { Orders } from './components/dashboard/Orders';

// Admin Imports
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { TenantManager } from './components/admin/TenantManager';
import { TemplateManager } from './components/admin/TemplateManager';
import { UserManager } from './components/admin/UserManager';
import { BillingOverview } from './components/admin/BillingOverview';
import { SupportTickets } from './components/admin/SupportTickets';
import { AuditLogs } from './components/admin/AuditLogs';
import { Button } from './components/Button';

const Navbar: React.FC<{ 
  toggleLang: () => void; 
  lang: 'en' | 'np';
}> = ({ toggleLang, lang }) => {
  const navigate = useNavigate();
  
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold font-display shadow-lg">S</div>
            <span className="font-bold text-xl text-gray-900">Sewax</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Sign In</Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/login')}>Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  if (loading) return <div className="h-screen flex items-center justify-center text-primary-600">Loading...</div>;
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Public Only Route (Redirects to Dashboard if logged in)
const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  if (loading) return <div className="h-screen flex items-center justify-center text-primary-600">Loading...</div>;
  if (session) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

// Main Layout Wrapper
const DashboardLayout = () => {
  const { signOut, role } = useAuth();
  
  return (
    <div className="flex min-h-screen bg-gray-50">
       <Sidebar onLogout={signOut} />
       <main className="flex-1 lg:ml-64 transition-all duration-300">
          <Routes>
              <Route index element={<Overview role={role} />} />
              <Route path="sites" element={<SitesList />} />
              <Route path="builder" element={<WebsiteBuilder />} />
              <Route path="editor" element={<WebsiteBuilder />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="templates" element={<Templates />} />
              <Route path="team" element={<Team role={role} />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="settings" element={<Settings />} />
              <Route path="billing" element={<Billing />} />
              <Route path="pos" element={<POS />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
          </Routes>
       </main>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = React.useState<'en'|'np'>('en');

  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar toggleLang={() => setLang(l => l==='en'?'np':'en')} lang={lang} />
              <LandingPage lang={lang} />
              <Footer />
            </>
          } />
          
          <Route path="/login" element={
            <PublicOnlyRoute>
              <SignIn />
            </PublicOnlyRoute>
          } />
          
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
             <AdminLayout>
                <Routes>
                   <Route index element={<Navigate to="dashboard" replace />} />
                   <Route path="dashboard" element={<AdminDashboard />} />
                   <Route path="tenants" element={<TenantManager />} />
                   <Route path="users" element={<UserManager />} />
                   <Route path="templates" element={<TemplateManager />} />
                   <Route path="billing" element={<BillingOverview />} />
                   <Route path="support" element={<SupportTickets />} />
                   <Route path="audit" element={<AuditLogs />} />
                </Routes>
             </AdminLayout>
          } />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
