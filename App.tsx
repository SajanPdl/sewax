
import React from 'react';
import { HashRouter, Switch, Route, Redirect, useHistory, useRouteMatch } from 'react-router-dom';
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

// Navbar Component (Internal)
import { Button } from './components/Button';

const Navbar: React.FC<{ 
  toggleLang: () => void; 
  lang: 'en' | 'np';
}> = ({ toggleLang, lang }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const history = useHistory();
  
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => history.push('/')}>
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold font-display shadow-lg">S</div>
            <span className="font-bold text-xl text-gray-900">Sewax</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Button variant="ghost" size="sm" onClick={() => history.push('/login')}>Sign In</Button>
            <Button variant="primary" size="sm" onClick={() => history.push('/login')}>Get Started</Button>
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
  if (!session) return <Redirect to="/login" />;
  return <>{children}</>;
};

// Public Only Route (Redirects to Dashboard if logged in)
const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  if (loading) return <div className="h-screen flex items-center justify-center text-primary-600">Loading...</div>;
  if (session) return <Redirect to="/dashboard" />;
  return <>{children}</>;
};

// Main Layout Wrapper
const DashboardLayout = () => {
  const { role, signOut } = useAuth();
  const { path } = useRouteMatch();
  
  return (
    <div className="flex min-h-screen bg-gray-50">
       <Sidebar onLogout={signOut} role={role} setRole={() => {}} />
       <main className="flex-1 lg:ml-64 transition-all duration-300">
          <Switch>
              <Route exact path={path} render={() => <Overview role={role} />} />
              <Route path={`${path}/sites`} component={SitesList} />
              <Route path={`${path}/builder`} component={WebsiteBuilder} />
              <Route path={`${path}/editor`} component={WebsiteBuilder} /> {/* Alias for old link */}
              <Route path={`${path}/analytics`} component={Analytics} />
              <Route path={`${path}/templates`} component={Templates} />
              <Route path={`${path}/team`} render={() => <Team role={role} />} />
              <Route path={`${path}/integrations`} component={Integrations} />
              <Route path={`${path}/settings`} component={Settings} />
              <Route path={`${path}/billing`} component={Billing} />
              <Route path={`${path}/pos`} component={POS} />
              <Route path={`${path}/products`} component={Products} />
              <Route path={`${path}/orders`} component={Orders} />
          </Switch>
       </main>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = React.useState<'en'|'np'>('en');

  return (
    <AuthProvider>
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => (
            <>
              <Navbar toggleLang={() => setLang(l => l==='en'?'np':'en')} lang={lang} />
              <LandingPage lang={lang} />
              <Footer />
            </>
          )} />
          
          <Route path="/login" render={() => (
            <PublicOnlyRoute>
              <SignIn />
            </PublicOnlyRoute>
          )} />
          
          <Route path="/dashboard" render={() => (
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          )} />

          {/* Admin Routes */}
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin" render={({ match }) => (
             <AdminLayout>
                <Switch>
                   <Route exact path={match.path} render={() => <Redirect to={`${match.path}/dashboard`} />} />
                   <Route path={`${match.path}/dashboard`} component={AdminDashboard} />
                   <Route path={`${match.path}/tenants`} component={TenantManager} />
                   <Route path={`${match.path}/users`} component={UserManager} />
                   <Route path={`${match.path}/templates`} component={TemplateManager} />
                   <Route path={`${match.path}/billing`} component={BillingOverview} />
                   <Route path={`${match.path}/support`} component={SupportTickets} />
                   <Route path={`${match.path}/audit`} component={AuditLogs} />
                </Switch>
             </AdminLayout>
          )} />
        </Switch>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;