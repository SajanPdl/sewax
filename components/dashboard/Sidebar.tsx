
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Settings, CreditCard, LogOut, Globe, PenTool, BarChart2, 
  Users, Puzzle, HelpCircle, ChevronRight, ShoppingBag, ShoppingCart, Monitor, 
  Package, User, Tag, Megaphone, MapPin, FileText, Bell, Utensils, 
  ChefHat, Calendar, BookOpen, Layers, ClipboardList, Coffee
} from 'lucide-react';
import { UserRole, hasPermission } from './RBACWrapper';
import { useAuth } from '../auth/AuthProvider';
import { getTemplateConfig, ModuleType } from '../../lib/template-registry';

interface SidebarProps {
  onLogout: () => void;
}

// Icon mapping for all possible modules
const MODULE_ICONS: Record<ModuleType, any> = {
  // Core
  overview: LayoutDashboard,
  settings: Settings,
  billing: CreditCard,
  team: Users,
  support: HelpCircle,
  reports: FileText,
  integrations: Puzzle,
  notifications: Bell,
  locations: MapPin,
  
  // Commerce
  products: ShoppingBag,
  orders: ShoppingCart,
  inventory: Package,
  customers: User,
  pos: Monitor,
  discounts: Tag,
  
  // Site
  sites: Globe,
  builder: PenTool,
  templates: Layers,
  analytics: BarChart2,
  marketing: Megaphone,
  
  // Restaurant
  menu: BookOpen,
  tables: Utensils,
  kitchen: ChefHat,
  
  // Service
  services: ClipboardList,
  appointments: Calendar,
  
  // Education
  courses: BookOpen,
  students: Users,
  
  // Agency
  projects: Layers,
  cms: FileText,
};

// Label mapping for display
const MODULE_LABELS: Record<ModuleType, string> = {
  overview: 'Overview',
  pos: 'Point of Sale',
  orders: 'Orders',
  products: 'Products',
  menu: 'Menu Management',
  inventory: 'Inventory',
  customers: 'Customers',
  tables: 'Table Management',
  kitchen: 'Kitchen Display',
  services: 'Services',
  appointments: 'Appointments',
  courses: 'Courses',
  students: 'Students',
  projects: 'Projects',
  cms: 'CMS & Content',
  discounts: 'Discounts',
  marketing: 'Marketing',
  analytics: 'Analytics',
  sites: 'Sites & Domains',
  builder: 'Website Builder',
  templates: 'Templates',
  locations: 'Locations',
  reports: 'Reports',
  team: 'Team',
  integrations: 'Integrations',
  notifications: 'Notifications',
  settings: 'Settings',
  billing: 'Billing',
  support: 'Support'
};

export const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, tenant, role } = useAuth();

  // 1. Determine Active Template Config
  const activeConfig = useMemo(() => {
    // Fallback to 'General' (or 'E-commerce' as default) if no category set
    const category = (tenant?.settings as any)?.theme_category || 'E-commerce';
    return getTemplateConfig(category);
  }, [tenant]);

  // 2. Generate Menu Groups based on Enabled Modules
  const menuGroups = useMemo(() => {
    const modules = activeConfig.modules;
    
    const groups = [
      {
        label: "Operations",
        items: [] as any[]
      },
      {
        label: "Growth & Online",
        items: [] as any[]
      },
      {
        label: "Organization",
        items: [] as any[]
      }
    ];

    // Helper to add item if enabled
    const addItem = (key: ModuleType, groupIndex: number, allowedRoles: UserRole[] = ['Owner', 'Admin', 'Editor']) => {
      if (modules[key]) {
        groups[groupIndex].items.push({
          key,
          icon: MODULE_ICONS[key],
          label: MODULE_LABELS[key],
          path: key === 'overview' ? '/dashboard' : `/dashboard/${key}`,
          allowed: allowedRoles
        });
      }
    };

    // --- Group 1: Operations (The "Work" stuff) ---
    addItem('overview', 0, ['Owner', 'Admin', 'Editor', 'Viewer']);
    addItem('pos', 0);
    addItem('orders', 0);
    addItem('tables', 0);
    addItem('kitchen', 0);
    addItem('appointments', 0);
    addItem('products', 0);
    addItem('menu', 0);
    addItem('services', 0);
    addItem('courses', 0);
    addItem('students', 0);
    addItem('inventory', 0);
    addItem('customers', 0);
    addItem('projects', 0);
    addItem('cms', 0);

    // --- Group 2: Growth & Online ---
    addItem('sites', 1);
    addItem('builder', 1);
    addItem('templates', 1);
    addItem('discounts', 1);
    addItem('marketing', 1);
    addItem('analytics', 1, ['Owner', 'Admin', 'Editor', 'Viewer']);

    // --- Group 3: Organization ---
    addItem('locations', 2);
    addItem('team', 2);
    addItem('reports', 2);
    addItem('billing', 2, ['Owner']);
    addItem('integrations', 2);
    addItem('settings', 2);

    return groups.filter(g => g.items.length > 0);
  }, [activeConfig]);

  return (
    <aside className="w-64 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 fixed inset-y-0 left-0 hidden lg:flex flex-col z-40 transition-colors duration-300">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-neutral-800">
        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold font-display mr-2 shadow-md">S</div>
        <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">Sewax</span>
        <span className="ml-2 text-[10px] bg-gray-100 dark:bg-neutral-800 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200 dark:border-neutral-700 uppercase">
            {activeConfig.slug.slice(0, 4)}
        </span>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
        {menuGroups.map((group, idx) => {
          // Filter items based on role
          const visibleItems = group.items.filter(item => hasPermission(role, item.allowed));
          
          if (visibleItems.length === 0) return null;

          return (
            <div key={idx}>
              <h4 className="text-xs font-semibold text-gray-400 dark:text-neutral-500 uppercase tracking-wider mb-3 px-3">{group.label}</h4>
              <div className="space-y-1">
                {visibleItems.map((item) => {
                  const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname === item.path);
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                        isActive 
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-4 h-4 ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />
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
      <div className="p-4 border-t border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/30">
         <div className="flex justify-between items-center mb-4">
             <button 
                onClick={() => navigate('/dashboard/support')}
                className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
             >
                <HelpCircle className="w-3.5 h-3.5" /> Support
             </button>
             <button 
                onClick={() => navigate('/dashboard/notifications')}
                className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
             >
                <Bell className="w-3.5 h-3.5" /> Alerts
             </button>
         </div>

        <div className="flex items-center gap-3 px-3 py-2 border-t border-gray-200 dark:border-neutral-700 pt-3">
          <div className="relative">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-neutral-700">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
             </div>
             <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-neutral-800 rounded-full"></div>
          </div>
          <div className="flex-1 overflow-hidden text-left">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">{tenant?.name || 'My Store'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate capitalize">{role}</p>
          </div>
          <button 
            onClick={onLogout}
            className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
