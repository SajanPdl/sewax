
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  CreditCard, 
  LogOut, 
  Globe, 
  PenTool, 
  BarChart2, 
  Users, 
  Puzzle, 
  HelpCircle,
  ChevronRight, 
  Shield, 
  ShoppingBag, 
  ShoppingCart, 
  Monitor
} from 'lucide-react';
import { UserRole, hasPermission } from './RBACWrapper';
import { useAuth } from '../auth/AuthProvider';

interface SidebarProps {
  onLogout: () => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, role }) => {
  const history = useHistory();
  const location = useLocation();
  const { user, tenant } = useAuth();

  const menuGroups = [
    {
      label: "Commerce",
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', allowed: ['Owner', 'Admin', 'Editor', 'Viewer'] as UserRole[] },
        { icon: Monitor, label: 'POS Register', path: '/dashboard/pos', allowed: ['Owner', 'Admin', 'Editor'] as UserRole[] },
        { icon: ShoppingCart, label: 'Orders', path: '/dashboard/orders', allowed: ['Owner', 'Admin', 'Editor', 'Viewer'] as UserRole[] },
        { icon: ShoppingBag, label: 'Products', path: '/dashboard/products', allowed: ['Owner', 'Admin', 'Editor'] as UserRole[] },
      ]
    },
    {
      label: "Online Store",
      items: [
        { icon: Globe, label: 'All Sites', path: '/dashboard/sites', allowed: ['Owner', 'Admin', 'Editor', 'Viewer'] as UserRole[] },
        { icon: PenTool, label: 'Website Builder', path: '/dashboard/builder', allowed: ['Owner', 'Admin', 'Editor'] as UserRole[] },
        { icon: BarChart2, label: 'Analytics', path: '/dashboard/analytics', allowed: ['Owner', 'Admin', 'Editor', 'Viewer'] as UserRole[] },
      ]
    },
    {
      label: "Organization",
      items: [
        { icon: CreditCard, label: 'Billing', path: '/dashboard/billing', allowed: ['Owner'] as UserRole[] },
        { icon: Users, label: 'Team', path: '/dashboard/team', allowed: ['Owner', 'Admin'] as UserRole[] },
        { icon: Puzzle, label: 'Integrations', path: '/dashboard/integrations', allowed: ['Owner', 'Admin'] as UserRole[] },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings', allowed: ['Owner', 'Admin'] as UserRole[] },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed inset-y-0 left-0 hidden lg:flex flex-col z-40">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold font-display mr-2 shadow-md">S</div>
        <span className="font-display font-bold text-xl tracking-tight text-gray-900">Sewax</span>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
        {menuGroups.map((group, idx) => {
          // Filter items based on role
          const visibleItems = group.items.filter(item => hasPermission(role, item.allowed));
          
          if (visibleItems.length === 0) return null;

          return (
            <div key={idx}>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">{group.label}</h4>
              <div className="space-y-1">
                {visibleItems.map((item) => {
                  const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                  return (
                    <button
                      key={item.path}
                      onClick={() => history.push(item.path)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                        isActive 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-4 h-4 ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        {item.label}
                      </div>
                      {isActive && <ChevronRight className="w-3 h-3 text-primary-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Footer / User Profile */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
         <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg mb-2 transition-colors">
            <HelpCircle className="w-4 h-4 text-gray-400" />
            Help & Support
         </button>

        <div className="flex items-center gap-3 px-3 py-2 mt-2 border-t border-gray-200 pt-4">
          <div className="relative">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
             </div>
             <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 overflow-hidden text-left">
            <p className="text-sm font-medium text-gray-900 truncate">{tenant?.name || 'My Store'}</p>
            <p className="text-xs text-gray-500 truncate capitalize">{role}</p>
          </div>
          <button 
            onClick={onLogout}
            className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
