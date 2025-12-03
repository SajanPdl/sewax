import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, LayoutTemplate, Settings, CreditCard, User, LogOut } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
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