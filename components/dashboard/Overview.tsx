
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
    { label: 'Total Revenue', value: `NPR ${metrics.revenue.toLocaleString()}`, sub: 'Lifetime sales', icon: CreditCard, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Orders (24h)', value: metrics.orders24h.toString(), sub: 'Since yesterday', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Conversion', value: '3.2%', sub: 'Visitors to Checkout', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Low Stock', value: metrics.lowStock.toString(), sub: 'Items needing restock', icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  if (loading && !tenant) {
      return <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>;
  }

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
               <Button size="sm" onClick={() => navigate('/dashboard/pos')} className="hidden md:flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800">
                  <Monitor className="w-4 h-4" /> Open POS
               </Button>
            </RBACWrapper>
            <button 
              onClick={() => navigate('/dashboard/notifications')}
              className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
               <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-100 border border-primary-200 flex items-center justify-center text-primary-700 font-bold text-xs">
               {tenant?.name?.charAt(0) || 'S'}
            </div>
         </div>
      </header>

      {/* --- Main Content --- */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl mx-auto w-full">
         
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

         <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
               {/* Quick Actions */}
               <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
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
                           className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-all group"
                        >
                           <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center mb-2 group-hover:bg-white group-hover:text-primary-600 group-hover:shadow-sm transition-all">
                              <action.icon className="w-5 h-5" />
                           </div>
                           <span className="text-xs font-medium text-gray-700">{action.label}</span>
                        </button>
                     ))}
                  </div>
               </div>

               {/* Recent Orders */}
               <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                     <h3 className="font-bold text-gray-900">Recent Orders</h3>
                     <button onClick={() => navigate('/dashboard/orders')} className="text-sm text-primary-600 font-medium hover:text-primary-700">View All</button>
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
                                 <td className="px-6 py-4 font-medium text-gray-900">{order.order_number || order.id.slice(0,8)}</td>
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
                     <div className="p-12 text-center text-gray-500">
                        <p className="mb-2">No orders found.</p>
                        <p className="text-xs">Once you make a sale, it will appear here.</p>
                     </div>
                  )}
               </div>
            </div>

            {/* Sidebar Widgets */}
            <div className="space-y-6">
               {/* Store Health */}
               <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                   <h3 className="font-bold text-gray-900 mb-4">Store Health</h3>
                   <div className="space-y-4">
                      <div>
                         <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Setup Completion</span>
                            <span className="font-bold text-green-600">85%</span>
                         </div>
                         <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                         </div>
                      </div>
                      <div className="pt-4 border-t border-gray-100 space-y-2">
                         <div className="flex items-center gap-2 text-sm text-gray-600">
                            <AlertCircle className="w-4 h-4 text-yellow-500" /> Connect Payment Gateway
                         </div>
                         <div className="flex items-center gap-2 text-sm text-gray-600">
                            <AlertCircle className="w-4 h-4 text-gray-400" /> Verify Domain
                         </div>
                      </div>
                   </div>
               </div>

               {/* Alerts Feed */}
               <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                   <h3 className="font-bold text-gray-900 mb-4">Alerts</h3>
                   <div className="space-y-4">
                      {metrics.lowStock > 0 && (
                         <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                            <h4 className="text-sm font-bold text-red-700 flex items-center gap-2">
                               <Package className="w-4 h-4" /> Low Stock Warning
                            </h4>
                            <p className="text-xs text-red-600 mt-1">{metrics.lowStock} products are below threshold.</p>
                         </div>
                      )}
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                         <h4 className="text-sm font-bold text-blue-700 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Monthly Report
                         </h4>
                         <p className="text-xs text-blue-600 mt-1">October sales report is ready.</p>
                      </div>
                   </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
