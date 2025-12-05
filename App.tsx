
import React from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/auth/AuthProvider';
import { ThemeProvider, useTheme } from './components/ThemeContext';
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
import { Navbar } from './components/Navbar';

// Public Pages
import { FeaturesPage } from './components/public/FeaturesPage';
import { PricingPage } from './components/public/PricingPage';
import { TemplatesPage } from './components/public/TemplatesPage';
import { ContactPage } from './components/public/ContactPage';

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

// Protected Route Component
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { session, loading } = useAuth();
  if (loading) return <div className="h-screen flex items-center justify-center text-primary-600 dark:bg-neutral-900">Loading...</div>;
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Public Only Route (Redirects to Dashboard if logged in)
const PublicOnlyRoute = ({ children }: { children?: React.ReactNode }) => {
  const { session, loading } = useAuth();
  if (loading) return <div className="h-screen flex items-center justify-center text-primary-600 dark:bg-neutral-900">Loading...</div>;
  if (session) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

// Main Layout Wrapper
const DashboardLayout = () => {
  const { signOut } = useAuth();
  
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300">
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

// Public Layout
const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const App: React.FC = () => {
  // Using default lang for landing page for now, can be expanded to context if needed
  const lang = 'en';

  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            {/* Public Pages */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage lang={lang} />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
            
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
    </ThemeProvider>
  );
};

export default App;
