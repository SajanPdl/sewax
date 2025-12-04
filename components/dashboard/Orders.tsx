
import React, { useState } from 'react';
import { Button } from '../Button';
import { Search, Filter, Monitor, ShoppingBag, Eye, Smartphone, Download, MoreHorizontal } from 'lucide-react';
import { Order } from '../../types';

export const Orders: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Online' | 'POS'>('All');

  const orders: Order[] = [
    { id: '#ORD-1026', customer: 'Priya S.', total: 2800, status: 'Pending', channel: 'Online', date: 'Oct 23, 2024, 09:30 AM', itemsCount: 2 },
    { id: '#ORD-1025', customer: 'Walk-in Customer', total: 1200, status: 'Completed', channel: 'POS', date: 'Oct 24, 2024, 02:15 PM', itemsCount: 1 },
    { id: '#ORD-1024', customer: 'Sudeep K.', total: 4500, status: 'Completed', channel: 'Online', date: 'Oct 24, 2024, 11:45 AM', itemsCount: 3 },
    { id: '#ORD-1023', customer: 'Ramesh T.', total: 950, status: 'Refunded', channel: 'POS', date: 'Oct 22, 2024, 04:00 PM', itemsCount: 1 },
  ];

  const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.channel === filter);

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
             <input type="text" placeholder="Search orders by ID or customer..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100" />
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
                      <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 text-gray-500">{order.date}</td>
                      <td className="px-6 py-4">
                         <div className="font-medium text-gray-900">{order.customer}</div>
                         <div className="text-xs text-gray-400">{order.itemsCount} items</div>
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
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">NPR {order.total.toLocaleString()}</td>
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
             </tbody>
          </table>
       </div>
    </div>
  );
};

// Simple icon for inline usage
const Globe = ({ className }: { className?: string }) => (
   <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);
