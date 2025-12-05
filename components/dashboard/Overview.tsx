
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { 
  Search, Bell, Plus, ExternalLink, CreditCard, 
  TrendingUp, Package, ShoppingCart, Zap, Loader2,
  Monitor, UserPlus, FileText, Tag, AlertCircle, Globe
} from 'lucide-react';
import { RBACWrapper } from './RBACWrapper';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

export const Overview: React.FC = () => {
  const { tenant, role } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({ revenue: 0, orderCount: 0, productCount: 0, lowStock: 0, orders24h: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenant) return;

    const fetchData = async () => {
      setLoading(true);
      // Fetch Recent Orders
      const { data: orderData } = await supabase
        .from('orders')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (orderData) setOrders(orderData);

      // Fetch Metrics - In a real large app, use Supabase Count or RPC, but this works for smaller scale
      const { data: allOrders } = await supabase.from('orders').select('total, created_at').eq('tenant_id', tenant.id);
      const { data: products } = await supabase.from('products').select('inventory').eq('tenant_id', tenant.id);
      
      const totalRev = allOrders?.reduce((sum, o) => sum + (Number(o.total) || 0), 0) || 0;
      const lowStockCount = products?.filter(p => p.inventory < 10).length || 0;
      
      // Calculate 24h orders
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      const orders24h = allOrders?.filter(o => new Date(o.created_at) > oneDayAgo).length || 0;

      setMetrics({ 
        revenue: totalRev, 
        orderCount: allOrders?.length || 0,
        productCount: products?.length || 0,
        lowStock: lowStockCount,
        orders24h
      });
      setLoading(false);
    };

    fetchData();

    // Realtime subscription
    const channel = supabase
      .channel('dashboard-overview')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders', filter: `tenant_id=eq.${tenant.id}` }, 
        (payload: any) => {
          setOrders(prev => [payload.new, ...prev].slice(0, 5));
          setMetrics(prev => ({ 
             ...prev, 
             revenue: prev.revenue + Number(payload.new.total), 
             orderCount: prev.orderCount + 1,
             orders24h: prev.orders24h + 1 
          }));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [tenant]);

  // KPIs
  const kpiData = [
    { label: 'Total Revenue', value: `NPR ${metrics.revenue.toLocaleString()}`, sub: 'Lifetime sales', icon: CreditCard, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Orders (24h)', value: metrics.orders24h.toString(), sub: 'Since yesterday', icon: ShoppingCart, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Conversion', value: '3.2%', sub: 'Visitors to Checkout', icon: TrendingUp, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Low Stock', value: metrics.lowStock.toString(), sub: 'Items needing restock', icon: Package, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  ];

  if (loading && !tenant) {
      return <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>;
  }

  return (
    <div className="flex flex-col h-full bg-gray-50/50 dark:bg-neutral-900/50 transition-colors duration-300">
      {/* --- Top Bar --- */}
      <header className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 px-8 py-4 flex items-center justify-between sticky top-0 z-30 transition-colors duration-300">
         <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search orders, products, or customers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-neutral-800 border-transparent focus:bg-white dark:focus:bg-neutral-800 focus:border-primary-200 focus:ring-4 focus:ring-primary-50 dark:focus:ring-primary-900/20 rounded-lg text-sm transition-all outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
            />
         </div>
         <div className="flex items-center gap-4 ml-4">
            <RBACWrapper allowedRoles={['Owner', 'Admin', 'Editor']} userRole={role}>
               <Button size="sm" onClick={() => navigate('/dashboard/pos')} className="hidden md:flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                  <Monitor className="w-4 h-4" /> Open POS
               </Button>
            </RBACWrapper>
            <button 
              onClick={() => navigate('/dashboard/notifications')}
              className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
               <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold text-xs">
               {tenant?.name?.charAt(0) || 'S'}
            </div>
         </div>
      </header>

      {/* --- Main Content --- */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl mx-auto w-full">
         
         {/* KPI Cards */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpiData.map((kpi, idx) => (
               <div key={idx} className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm transition-colors duration-300">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{kpi.label}</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</h3>
                     </div>
                     <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                        <kpi.icon className="w-5 h-5" />
                     </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{kpi.sub}</div>
               </div>
            ))}
         </div>

         <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
               {/* Quick Actions */}
               <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 p-6 shadow-sm transition-colors duration-300">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                     <Zap className="w-4 h-4 text-yellow-500" /> Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[
                        { label: 'Add Product', icon: Plus, path: '/dashboard/products' },
                        { label: 'Create Discount', icon: Tag, path: '/dashboard/discounts' },
                        { label: 'Invite Staff', icon: UserPlus, path: '/dashboard/team' },
                        { label: 'Publish Site', icon: Globe, path: '/dashboard/sites' },
                     ].map((action, i) => (
                        <button 
                           key={i}
                           onClick={() => navigate(action.path)}
                           className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-100 dark:border-neutral-800 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all group"
                        >
                           <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 flex items-center justify-center mb-2 group-hover:bg-white dark:group-hover:bg-neutral-700 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:shadow-sm transition-all">
                              <action.icon className="w-5 h-5" />
                           </div>
                           <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
                        </button>
                     ))}
                  </div>
               </div>

               {/* Recent Orders */}
               <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm overflow-hidden transition-colors duration-300">
                  <div className="px-6 py-4 border-b border-gray-100 dark:border-neutral-800 flex justify-between items-center">
                     <h3 className="font-bold text-gray-900 dark:text-white">Recent Orders</h3>
                     <button onClick={() => navigate('/dashboard/orders')} className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400">View All</button>
                  </div>
                  {orders.length > 0 ? (
                     <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-neutral-800 text-gray-500 dark:text-gray-400 uppercase text-xs">
                           <tr>
                              <th className="px-6 py-3 font-medium">Order ID</th>
                              <th className="px-6 py-3 font-medium">Customer</th>
                              <th className="px-6 py-3 font-medium">Total</th>
                              <th className="px-6 py-3 font-medium">Status</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                           {orders.map((order) => (
                              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/50">
                                 <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{order.order_number || order.id.slice(0,8)}</td>
                                 <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{order.customer_name || 'Guest'}</td>
                                 <td className="px-6 py-4 text-gray-900 dark:text-gray-100">NPR {order.total}</td>
                                 <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                       order.status === 'Completed' 
                                       ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                       : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    }`}>
                                       {order.status}
                                    </span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  ) : (
                     <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                        <p className="mb-2">No orders found.</p>
                        <p className="text-xs">Once you make a sale, it will appear here.</p>
                     </div>
                  )}
               </div>
            </div>

            {/* Sidebar Widgets */}
            <div className="space-y-6">
               {/* Store Health */}
               <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 p-6 shadow-sm transition-colors duration-300">
                   <h3 className="font-bold text-gray-900 dark:text-white mb-4">Store Health</h3>
                   <div className="space-y-4">
                      <div>
                         <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Setup Completion</span>
                            <span className="font-bold text-green-600 dark:text-green-400">85%</span>
                         </div>
                         <div className="w-full bg-gray-100 dark:bg-neutral-800 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                         </div>
                      </div>
                      <div className="pt-4 border-t border-gray-100 dark:border-neutral-800 space-y-2">
                         <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <AlertCircle className="w-4 h-4 text-yellow-500" /> Connect Payment Gateway
                         </div>
                         <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <AlertCircle className="w-4 h-4 text-gray-400" /> Verify Domain
                         </div>
                      </div>
                   </div>
               </div>

               {/* Alerts Feed */}
               <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 p-6 shadow-sm transition-colors duration-300">
                   <h3 className="font-bold text-gray-900 dark:text-white mb-4">Alerts</h3>
                   <div className="space-y-4">
                      {metrics.lowStock > 0 && (
                         <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
                            <h4 className="text-sm font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                               <Package className="w-4 h-4" /> Low Stock Warning
                            </h4>
                            <p className="text-xs text-red-600 dark:text-red-300 mt-1">{metrics.lowStock} products are below threshold.</p>
                         </div>
                      )}
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30">
                         <h4 className="text-sm font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Monthly Report
                         </h4>
                         <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">October sales report is ready.</p>
                      </div>
                   </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
