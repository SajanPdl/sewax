
import React, { useState } from 'react';
import { Button } from '../Button';
import { 
  Search, 
  Bell, 
  Plus, 
  ExternalLink, 
  Globe, 
  CreditCard, 
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  Clock,
  ArrowRight,
  Package,
  ShoppingCart,
  Zap
} from 'lucide-react';
import { UserRole, RBACWrapper } from './RBACWrapper';

interface OverviewProps {
   role: UserRole;
}

export const Overview: React.FC<OverviewProps> = ({ role }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Commerce KPI Data
  const kpiData = [
    { label: 'Total Revenue', value: 'NPR 128,500', sub: '+12% from last month', icon: CreditCard, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Orders', value: '142', sub: '24 pending processing', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Avg. Order Value', value: 'NPR 905', sub: '+5% increase', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Active Products', value: '45', sub: '3 Low Stock', icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  // Recent Orders Data
  const recentOrders = [
    { id: '#ORD-1024', customer: 'Sudeep K.', items: '3 items', total: '4,500', status: 'Processing', time: '10 mins ago' },
    { id: '#ORD-1023', customer: 'Walk-in', items: '1 item', total: '150', status: 'Completed', time: '1 hour ago' },
    { id: '#ORD-1022', customer: 'Priya S.', items: '2 items', total: '2,800', status: 'Completed', time: '3 hours ago' },
    { id: '#ORD-1021', customer: 'Ramesh T.', items: '1 item', total: '1,200', status: 'Cancelled', time: '5 hours ago' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      {/* --- Top Bar --- */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
         <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search orders, products, or customers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-primary-200 focus:ring-4 focus:ring-primary-50 rounded-lg text-sm transition-all outline-none"
            />
         </div>
         <div className="flex items-center gap-4 ml-4">
            <RBACWrapper allowedRoles={['Owner', 'Admin', 'Editor']} userRole={role}>
               <Button size="sm" className="hidden md:flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800">
                  <Plus className="w-4 h-4" /> New Order (POS)
               </Button>
            </RBACWrapper>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200 md:hidden">
               <img src="https://ui-avatars.com/api/?name=Sudeep+K&background=C8102E&color=fff" alt="Profile" />
            </div>
         </div>
      </header>

      {/* --- Main Content --- */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl mx-auto w-full">
         
         {/* Store Status Banner */}
         <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <img src="https://picsum.photos/100/100?random=1" alt="Store Logo" className="w-full h-full object-cover" />
               </div>
               <div>
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                     Himalayan Coffee House
                     <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase">Online</span>
                  </h2>
                  <a href="https://himalayan.sewax.com" target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-primary-600 flex items-center gap-1">
                     himalayan.sewax.com <ExternalLink className="w-3 h-3" />
                  </a>
               </div>
            </div>
            <div className="flex gap-2">
               <Button variant="outline" size="sm">View Store</Button>
               <Button size="sm">Share</Button>
            </div>
         </div>

         {/* KPI Strip */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpiData.map((kpi, idx) => (
               <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between group hover:border-primary-100 transition-all">
                  <div>
                     <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">{kpi.label}</p>
                     <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
                     <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                     <kpi.icon className="w-5 h-5" />
                  </div>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Orders & Quick Actions */}
            <div className="lg:col-span-2 space-y-8">
               
               {/* Quick Actions */}
               <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                     <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     <RBACWrapper allowedRoles={['Owner', 'Admin', 'Editor']} userRole={role}>
                        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-primary-200 transition-all group">
                           <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                              <Plus className="w-5 h-5" />
                           </div>
                           <span className="text-xs font-semibold text-gray-700">Add Product</span>
                        </button>
                     </RBACWrapper>

                     <RBACWrapper allowedRoles={['Owner', 'Admin']} userRole={role}>
                        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-primary-200 transition-all group">
                           <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                              <Globe className="w-5 h-5" />
                           </div>
                           <span className="text-xs font-semibold text-gray-700">Online Store</span>
                        </button>
                     </RBACWrapper>

                     <RBACWrapper allowedRoles={['Owner', 'Admin', 'Editor']} userRole={role}>
                        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-primary-200 transition-all group">
                           <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                              <ShoppingBag className="w-5 h-5" />
                           </div>
                           <span className="text-xs font-semibold text-gray-700">Process Order</span>
                        </button>
                     </RBACWrapper>

                     <RBACWrapper allowedRoles={['Owner', 'Admin']} userRole={role}>
                        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-primary-200 transition-all group">
                           <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                              <CreditCard className="w-5 h-5" />
                           </div>
                           <span className="text-xs font-semibold text-gray-700">Payments</span>
                        </button>
                     </RBACWrapper>
                  </div>
               </div>

               {/* Recent Orders List */}
               <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                     <h3 className="font-bold text-gray-900">Recent Orders</h3>
                     <Button variant="ghost" size="sm" className="text-primary-600">View All</Button>
                  </div>
                  <div className="divide-y divide-gray-100">
                     {recentOrders.map((order) => (
                        <div key={order.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-xs">
                                 {order.customer.charAt(0)}
                              </div>
                              <div>
                                 <p className="font-bold text-sm text-gray-900">{order.customer}</p>
                                 <p className="text-xs text-gray-500">{order.items} • NPR {order.total}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mb-1 ${
                                 order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                 order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                 'bg-gray-100 text-gray-600'
                              }`}>
                                 {order.status}
                              </span>
                              <p className="text-xs text-gray-400">{order.time}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Right Column: Analytics & Insight */}
            <div className="space-y-8">
               
               {/* Sales Trend (Mini) */}
               <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="font-bold text-gray-900">Weekly Sales</h3>
                     <span className="text-xs font-bold text-green-600 flex items-center">
                        <ArrowUpRight className="w-3 h-3 mr-1" /> +15%
                     </span>
                  </div>
                  <div className="h-40 flex items-end gap-2">
                     {[40, 60, 45, 75, 55, 85, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-primary-50 rounded-t-sm hover:bg-primary-500 transition-colors group relative">
                           <div 
                              className="w-full bg-primary-500 rounded-t-sm opacity-80" 
                              style={{ height: `${h}%` }}
                           ></div>
                        </div>
                     ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                     <span>Mon</span>
                     <span>Tue</span>
                     <span>Wed</span>
                     <span>Thu</span>
                     <span>Fri</span>
                     <span>Sat</span>
                     <span>Sun</span>
                  </div>
               </div>

               {/* Top Products */}
               <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">Top Selling Items</h3>
                  <div className="space-y-4">
                     {[
                        { name: 'Himalayan Arabica', sales: '84 sold', revenue: 'NPR 42k' },
                        { name: 'Ilam Tea Pack', sales: '62 sold', revenue: 'NPR 18k' },
                        { name: 'Ceramic Mug', sales: '35 sold', revenue: 'NPR 12k' },
                     ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                           <div>
                              <p className="text-sm font-medium text-gray-900">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.sales}</p>
                           </div>
                           <p className="text-sm font-bold text-gray-700">{item.revenue}</p>
                        </div>
                     ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-4 text-gray-500">View All Products</Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
