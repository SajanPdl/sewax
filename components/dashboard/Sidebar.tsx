import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  ShoppingBag, 
  ShoppingCart, 
  Monitor,
  Package,
  User,
  Tag,
  Megaphone,
  MapPin,
  FileText,
  Bell
} from 'lucide-react';
import { UserRole, hasPermission } from './RBACWrapper';
import { useAuth } from '../auth/AuthProvider';

interface SidebarProps {
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, tenant, role } = useAuth();

  const menuGroups = [
    {
      label: "Commerce",
      items: [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard', allowed: ['Owner', 'Admin', 'Editor', 'Viewer'] as UserRole[] },
        { icon: Monitor, label: 'Point of Sale', path: '/dashboard/pos', allowed: ['Owner', 'Admin', 'Editor'] as UserRole[] },
        { icon: ShoppingCart, label: 'Orders', path: '/dashboard/orders', allowed: ['Owner', 'Admin', 'Editor', 'Viewer'] as UserRole[] },
        { icon: ShoppingBag, label: 'Products', path: '/dashboard/products', allowed: ['Owner', 'Admin', 'Editor'] as UserRole[] },
        { icon: Package, label: 'Inventory', path: '/dashboard/inventory', allowed: ['Owner', 'Admin', 'Editor'] as UserRole[] },
        { icon: User, label: 'Customers', path: '/dashboard/customers', allowed: ['Owner', 'Admin', 'Editor'] as UserRole[] },
      ]
    },
    {
      label: "Growth",
      items: [
        { icon: Tag, label: 'Discounts', path: '/dashboard/discounts', allowed: ['Owner', 'Admin', 'Editor'] as UserRole[] },
        { icon: Megaphone, label: 'Marketing', path: '/dashboard/marketing', allowed: ['Owner', 'Admin'] as UserRole[] },
        { icon: BarChart2, label: 'Analytics', path: '/dashboard/analytics', allowed: ['Owner', 'Admin', 'Editor', 'Viewer'] as UserRole[] },
      ]
    },
    {
      label: "Online Store",
      items: [
        { icon: Globe, label: 'Sites & Domains', path: '/dashboard/sites', allowed: ['Owner', 'Admin', 'Editor', 'Viewer'] as UserRole[] },
        { icon: PenTool, label: 'Website Builder', path: '/dashboard/builder', allowed: ['Owner', 'Admin', 'Editor'] as UserRole[] },
        { icon: LayoutDashboard, label: 'Templates', path: '/dashboard/templates', allowed: ['Owner', 'Admin', 'Editor'] as UserRole[] },
      ]
    },
    {
      label: "Organization",
      items: [
        { icon: MapPin, label: 'Locations', path: '/dashboard/locations', allowed: ['Owner', 'Admin'] as UserRole[] },
        { icon: Users, label: 'Team', path: '/dashboard/team', allowed: ['Owner', 'Admin'] as UserRole[] },
        { icon: FileText, label: 'Reports', path: '/dashboard/reports', allowed: ['Owner', 'Admin', 'Accountant'] as UserRole[] },
        { icon: CreditCard, label: 'Billing', path: '/dashboard/billing', allowed: ['Owner'] as UserRole[] },
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
                  const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname === item.path);
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
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
         <div className="flex justify-between items-center mb-4">
             <button 
                onClick={() => navigate('/dashboard/support')}
                className="flex items-center gap-2 text-xs font-medium text-gray-600 hover:text-primary-600 transition-colors"
             >
                <HelpCircle className="w-3.5 h-3.5" /> Support
             </button>
             <button 
                onClick={() => navigate('/dashboard/notifications')}
                className="flex items-center gap-2 text-xs font-medium text-gray-600 hover:text-primary-600 transition-colors"
             >
                <Bell className="w-3.5 h-3.5" /> Alerts
             </button>
         </div>

        <div className="flex items-center gap-3 px-3 py-2 border-t border-gray-200 pt-3">
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