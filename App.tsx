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
import { Customers } from './components/dashboard/Customers';
import { Inventory } from './components/dashboard/Inventory';
import { Discounts } from './components/dashboard/Discounts';

// Operations Imports
import { Locations } from './components/dashboard/Locations';
import { Marketing } from './components/dashboard/Marketing';
import { Reports } from './components/dashboard/Reports';
import { Notifications } from './components/dashboard/Notifications';
import { Support } from './components/dashboard/Support';

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
import { AdminReports } from './components/admin/AdminReports';
import { AdminHealth } from './components/admin/AdminHealth';
import { AdminRoles } from './components/admin/AdminRoles';
import { AdminSites } from './components/admin/AdminSites';
import { AdminStorage } from './components/admin/AdminStorage';
import { AdminCMS } from './components/admin/AdminCMS';
import { AdminJobs } from './components/admin/AdminJobs';
import { AdminSecurity } from './components/admin/AdminSecurity';
import { AdminBackups } from './components/admin/AdminBackups';
import { AdminSettings } from './components/admin/AdminSettings';
import { AdminAPIKeys } from './components/admin/AdminAPIKeys';
import { AdminFeatureFlags } from './components/admin/AdminFeatureFlags';
import { AdminAnnouncements } from './components/admin/AdminAnnouncements';
import { AdminDeployments } from './components/admin/AdminDeployments';
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
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { session, loading } = useAuth();
  if (loading) return <div className="h-screen flex items-center justify-center text-primary-600">Loading...</div>;
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Public Only Route (Redirects to Dashboard if logged in)
const PublicOnlyRoute = ({ children }: { children?: React.ReactNode }) => {
  const { session, loading } = useAuth();
  if (loading) return <div className="h-screen flex items-center justify-center text-primary-600">Loading...</div>;
  if (session) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

// Main Layout Wrapper
const DashboardLayout = () => {
  const { signOut } = useAuth();
  
  return (
    <div className="flex min-h-screen bg-gray-50">
       <Sidebar onLogout={signOut} />
       <main className="flex-1 lg:ml-64 transition-all duration-300">
          <Routes>
              <Route index element={<Overview />} />
              
              {/* Commerce */}
              <Route path="pos" element={<POS />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="customers" element={<Customers />} />
              
              {/* Online Store */}
              <Route path="sites" element={<SitesList />} />
              <Route path="builder" element={<WebsiteBuilder />} />
              <Route path="editor" element={<WebsiteBuilder />} />
              <Route path="templates" element={<Templates />} />
              <Route path="analytics" element={<Analytics />} />

              {/* Growth */}
              <Route path="discounts" element={<Discounts />} />
              <Route path="marketing" element={<Marketing />} />
              
              {/* Organization & Ops */}
              <Route path="locations" element={<Locations />} />
              <Route path="reports" element={<Reports />} />
              <Route path="team" element={<Team />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
              <Route path="billing" element={<Billing />} />
              <Route path="support" element={<Support />} />
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
                   <Route path="reports" element={<AdminReports />} />
                   <Route path="health" element={<AdminHealth />} />
                   <Route path="tenants" element={<TenantManager />} />
                   <Route path="users" element={<UserManager />} />
                   <Route path="roles" element={<AdminRoles />} />
                   <Route path="billing" element={<BillingOverview />} />
                   <Route path="templates" element={<TemplateManager />} />
                   <Route path="sites" element={<AdminSites />} />
                   <Route path="storage" element={<AdminStorage />} />
                   <Route path="cms" element={<AdminCMS />} />
                   <Route path="support" element={<SupportTickets />} />
                   <Route path="audit" element={<AuditLogs />} />
                   <Route path="jobs" element={<AdminJobs />} />
                   <Route path="security" element={<AdminSecurity />} />
                   <Route path="backups" element={<AdminBackups />} />
                   <Route path="settings" element={<AdminSettings />} />
                   <Route path="api" element={<AdminAPIKeys />} />
                   <Route path="flags" element={<AdminFeatureFlags />} />
                   <Route path="announcements" element={<AdminAnnouncements />} />
                   <Route path="deploys" element={<AdminDeployments />} />
                </Routes>
             </AdminLayout>
          } />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;