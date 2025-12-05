
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Building2, CreditCard, Shield, 
  Palette, Globe, Database, Server, Headphones, FileText, 
  BarChart3, Settings, LogOut, Search, Bell, Terminal,
  Flag, Lock, HardDrive, RefreshCw, Layers, Activity
} from 'lucide-react';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const history = useHistory();

  const menuGroups = [
    {
      title: "Overview",
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: BarChart3, label: 'Analytics & Reports', path: '/admin/reports' },
        { icon: Activity, label: 'System Health', path: '/admin/health' },
      ]
    },
    {
      title: "Management",
      items: [
        { icon: Building2, label: 'Tenants', path: '/admin/tenants' },
        { icon: Users, label: 'Users', path: '/admin/users' },
        { icon: Shield, label: 'Roles & RBAC', path: '/admin/roles' },
      ]
    },
    {
      title: "Commerce",
      items: [
        { icon: CreditCard, label: 'Billing & Plans', path: '/admin/billing' },
        { icon: Palette, label: 'Templates', path: '/admin/templates' },
      ]
    },
    {
      title: "Platform",
      items: [
        { icon: Globe, label: 'Sites & Domains', path: '/admin/sites' },
        { icon: Server, label: 'Storage & CDN', path: '/admin/storage' },
        { icon: FileText, label: 'CMS Global', path: '/admin/cms' },
      ]
    },
    {
      title: "Operations",
      items: [
        { icon: Headphones, label: 'Support Tickets', path: '/admin/support' },
        { icon: Database, label: 'Audit Logs', path: '/admin/audit' },
        { icon: Layers, label: 'Jobs & Queues', path: '/admin/jobs' },
        { icon: Lock, label: 'Security', path: '/admin/security' },
        { icon: RefreshCw, label: 'Backups', path: '/admin/backups' },
      ]
    },
    {
      title: "Settings",
      items: [
        { icon: Settings, label: 'App Config', path: '/admin/settings' },
        { icon: Terminal, label: 'API Keys', path: '/admin/api' },
        { icon: Flag, label: 'Feature Flags', path: '/admin/flags' },
      ]
    }
  ];

  return (
    <div className="flex min-h-screen bg-neutral-900 text-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col fixed inset-y-0 z-50">
        <div className="h-16 flex items-center px-6 border-b border-neutral-800 bg-neutral-950">
           <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center text-white font-bold text-xs mr-3">A</div>
           <span className="font-bold text-lg tracking-tight text-white">Sewax Admin</span>
        </div>

        <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
           <div className="px-3 mb-4">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-500" />
                 <input 
                  type="text" 
                  placeholder="Jump to..." 
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md py-1.5 pl-8 text-xs text-gray-300 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none"
                 />
              </div>
           </div>

           <nav className="space-y-6 px-3">
              {menuGroups.map((group, idx) => (
                <div key={idx}>
                  <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2 px-3">{group.title}</h4>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <button
                          key={item.path}
                          onClick={() => history.push(item.path)}
                          className={`w-full flex items-center gap-3 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                            isActive 
                              ? 'bg-primary-900/20 text-primary-400 border border-primary-900/30' 
                              : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
                          }`}
                        >
                          <item.icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary-500' : 'text-neutral-500'}`} />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
           </nav>
        </div>

        <div className="p-4 border-t border-neutral-800 bg-neutral-950">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-900 flex items-center justify-center text-primary-200 text-xs font-bold">
                 SA
              </div>
              <div className="flex-1 overflow-hidden">
                 <p className="text-sm font-medium text-white truncate">Super Admin</p>
                 <p className="text-xs text-neutral-500 truncate">System Owner</p>
              </div>
              <button 
                onClick={() => history.push('/admin/login')}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                 <LogOut className="w-4 h-4" />
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-w-0 flex flex-col">
         {/* Admin Header */}
         <header className="h-16 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4">
               <span className="px-2 py-1 rounded bg-red-900/30 text-red-400 border border-red-900/50 text-[10px] font-bold uppercase tracking-wide">
                  Production Env
               </span>
               <div className="h-4 w-px bg-neutral-800"></div>
               <span className="text-xs text-neutral-400 font-mono">v2.4.0 (Build 8839)</span>
            </div>
            
            <div className="flex items-center gap-4">
               <button className="text-neutral-400 hover:text-white relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-neutral-900"></span>
               </button>
            </div>
         </header>

         {/* Page Content */}
         <div className="p-8">
            {children}
         </div>
      </main>
    </div>
  );
};
