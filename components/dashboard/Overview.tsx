import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { 
  Search, Bell, Plus, ExternalLink, CreditCard, 
  ShoppingBag, TrendingUp, ArrowUpRight, Package, 
  ShoppingCart, Zap
} from 'lucide-react';
import { UserRole, RBACWrapper } from './RBACWrapper';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';

interface OverviewProps {
   role: UserRole;
}

export const Overview: React.FC<OverviewProps> = ({ role }) => {
  const { tenant } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({ revenue: 0, count: 0 });

  useEffect(() => {
    if (!tenant) return;

    const fetchData = async () => {
      // Fetch Orders
      const { data: orderData } = await supabase
        .from('orders')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (orderData) setOrders(orderData);

      // Fetch Metrics (Simplified)
      const { data: allOrders } = await supabase
        .from('orders')
        .select('total')
        .eq('tenant_id', tenant.id);
      
      if (allOrders) {
        const totalRev = allOrders.reduce((sum, o) => sum + o.total, 0);
        setMetrics({ revenue: totalRev, count: allOrders.length });
      }
    };

    fetchData();

    // Realtime subscription
    const channel = supabase
      .channel('dashboard-orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders', filter: `tenant_id=eq.${tenant.id}` }, 
        (payload: any) => {
          setOrders(prev => [payload.new, ...prev].slice(0, 5));
          setMetrics(prev => ({ revenue: prev.revenue + payload.new.total, count: prev.count + 1 }));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [tenant]);

  // Commerce KPI Data based on real metrics
  const kpiData = [
    { label: 'Total Revenue', value: `NPR ${metrics.revenue.toLocaleString()}`, sub: 'Real-time updates', icon: CreditCard, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Orders', value: metrics.count.toString(), sub: 'Lifetime', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Avg. Order Value', value: `NPR ${metrics.count > 0 ? Math.round(metrics.revenue / metrics.count) : 0}`, sub: 'Average', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Active Products', value: 'Syncing...', sub: 'Inventory', icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
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
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-100 border border-primary-200 flex items-center justify-center text-primary-700 font-bold text-xs">
               {tenant?.name?.charAt(0) || 'S'}
            </div>
         </div>
      </header>

      {/* --- Main Content --- */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl mx-auto w-full">
         
         {/* Store Status Banner */}
         <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center font-bold text-gray-400">
                  {tenant?.name?.charAt(0)}
               </div>
               <div>
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                     {tenant?.name || 'Loading...'}
                     <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-medium flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        Online
                     </span>
                  </h2>
                  <a href={`https://${tenant?.slug}.sewax.com`} target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-primary-600 flex items-center gap-1">
                     {tenant?.slug}.sewax.com <ExternalLink className="w-3 h-3" />
                  </a>
               </div>
            </div>
            <div className="flex gap-3">
               <Button variant="outline" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Quick Actions
               </Button>
            </div>
         </div>

         {/* KPI Cards */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpiData.map((kpi, idx) => (
               <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{kpi.label}</p>
                        <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
                     </div>
                     <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                        <kpi.icon className="w-5 h-5" />
                     </div>
                  </div>
                  <div className="text-xs text-gray-500">{kpi.sub}</div>
               </div>
            ))}
         </div>

         {/* Recent Orders */}
         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Recent Orders</h3>
                <button className="text-sm text-primary-600 font-medium hover:text-primary-700">View All</button>
             </div>
             {orders.length > 0 ? (
                <table className="w-full text-sm text-left">
                   <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                      <tr>
                         <th className="px-6 py-3 font-medium">Order ID</th>
                         <th className="px-6 py-3 font-medium">Customer</th>
                         <th className="px-6 py-3 font-medium">Total</th>
                         <th className="px-6 py-3 font-medium">Status</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {orders.map((order) => (
                         <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">#{order.id.slice(0,8)}</td>
                            <td className="px-6 py-4 text-gray-500">{order.customer_name || 'Guest'}</td>
                            <td className="px-6 py-4 text-gray-900">NPR {order.total}</td>
                            <td className="px-6 py-4">
                               <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                  order.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                               }`}>
                                  {order.status}
                               </span>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             ) : (
                <div className="p-8 text-center text-gray-500">No orders found.</div>
             )}
         </div>

      </div>
    </div>
  );
};