
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Search, Filter, Monitor, Globe, Eye, MoreHorizontal, Download, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';

export const Orders: React.FC = () => {
  const { tenant } = useAuth();
  const [filter, setFilter] = useState<'All' | 'Online' | 'POS'>('All');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!tenant) return;
    const fetchOrders = async () => {
      let query = supabase
        .from('orders')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('created_at', { ascending: false });
      
      const { data } = await query;
      if (data) setOrders(data);
      setLoading(false);
    };

    fetchOrders();
    
    // Subscribe to new orders
    const subscription = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders', filter: `tenant_id=eq.${tenant.id}` }, 
         (payload) => {
            setOrders(prev => [payload.new, ...prev]);
         }
      )
      .subscribe();

    return () => { supabase.removeChannel(subscription); }

  }, [tenant]);

  const filteredOrders = orders.filter(o => {
     const matchFilter = filter === 'All' || o.channel === filter;
     const matchSearch = 
        o.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        o.customer_name?.toLowerCase().includes(searchQuery.toLowerCase());
     return matchFilter && matchSearch;
  });

  if (loading) return <div className="p-8"><Loader2 className="w-8 h-8 animate-spin text-primary-500"/></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
       <div className="mb-8 flex justify-between items-end">
          <div>
             <h1 className="text-2xl font-display font-bold text-gray-900">Orders</h1>
             <p className="text-gray-500">Track and manage your customer orders.</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
             <Download className="w-4 h-4" /> Export
          </Button>
       </div>

       {/* Tabs */}
       <div className="flex gap-1 mb-6 border-b border-gray-200">
          {['All', 'Online', 'POS'].map(tab => (
             <button
               key={tab}
               onClick={() => setFilter(tab as any)}
               className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  filter === tab ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
               }`}
             >
               {tab}
             </button>
          ))}
       </div>

       {/* Filters */}
       <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex gap-4 shadow-sm items-center">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <input 
               type="text" 
               placeholder="Search orders by ID or customer..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100" 
             />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
             <Filter className="w-4 h-4" /> Filter
          </Button>
       </div>

       {/* Table */}
       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs">
                <tr>
                   <th className="px-6 py-4 font-medium">Order ID</th>
                   <th className="px-6 py-4 font-medium">Date & Time</th>
                   <th className="px-6 py-4 font-medium">Customer</th>
                   <th className="px-6 py-4 font-medium">Channel</th>
                   <th className="px-6 py-4 font-medium">Payment</th>
                   <th className="px-6 py-4 font-medium">Total</th>
                   <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {filteredOrders.map(order => (
                   <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900">
                        {order.order_number || order.id.slice(0,8)}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                         {new Date(order.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                         <div className="font-medium text-gray-900">{order.customer_name || 'Guest'}</div>
                         <div className="text-xs text-gray-400">{order.items_count} items</div>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md border w-fit ${
                            order.channel === 'Online' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-purple-50 text-purple-700 border-purple-100'
                         }`}>
                            {order.channel === 'Online' ? <Globe className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                            {order.channel}
                         </span>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                            order.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-100' : 
                            order.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : 
                            'bg-red-50 text-red-700 border-red-100'
                         }`}>
                            {order.status}
                         </span>
                         <span className="text-xs text-gray-400 ml-2">{order.payment_method}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">NPR {order.total?.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-2">
                           <button className="text-gray-400 hover:text-primary-600 transition-colors p-1 hover:bg-gray-100 rounded">
                              <Eye className="w-4 h-4" />
                           </button>
                           <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded">
                              <MoreHorizontal className="w-4 h-4" />
                           </button>
                         </div>
                      </td>
                   </tr>
                ))}
                {filteredOrders.length === 0 && (
                   <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">No orders found.</td>
                   </tr>
                )}
             </tbody>
          </table>
       </div>
    </div>
  );
};
