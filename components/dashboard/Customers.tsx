import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Search, Filter, User, Download, Mail, MoreHorizontal, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';

export const Customers: React.FC = () => {
  const { tenant } = useAuth();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenant) return;
    const fetchCustomers = async () => {
       const { data } = await supabase.from('customers').select('*').eq('tenant_id', tenant.id);
       if (data) setCustomers(data);
       setLoading(false);
    };
    fetchCustomers();
  }, [tenant]);

  if (loading) return <div className="p-8"><Loader2 className="w-8 h-8 animate-spin text-primary-500"/></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
       <div className="mb-8 flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-display font-bold text-gray-900">Customers</h1>
             <p className="text-gray-500">Manage customer relationships and loyalty.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" /> Export
             </Button>
             <Button className="flex items-center gap-2">
                <User className="w-4 h-4" /> Add Customer
             </Button>
          </div>
       </div>

       <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex gap-4 shadow-sm items-center">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <input type="text" placeholder="Search by name, email or phone..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
             <Filter className="w-4 h-4" /> Filter
          </Button>
       </div>

       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs">
                <tr>
                   <th className="px-6 py-4 font-medium">Name</th>
                   <th className="px-6 py-4 font-medium">Contact</th>
                   <th className="px-6 py-4 font-medium">Orders</th>
                   <th className="px-6 py-4 font-medium">Total Spent</th>
                   <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {customers.map((c, i) => (
                   <tr key={c.id || i} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs">
                               {(c.first_name || 'U').charAt(0)}
                            </div>
                            <span className="font-bold text-gray-900">{c.first_name} {c.last_name}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                         <div className="flex flex-col">
                            <span>{c.email}</span>
                            <span className="text-xs">{c.phone}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4">{c.orders_count}</td>
                      <td className="px-6 py-4 font-medium">NPR {c.total_spent}</td>
                      <td className="px-6 py-4 text-right">
                         <button className="p-2 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                         </button>
                      </td>
                   </tr>
                ))}
                {customers.length === 0 && (
                   <tr><td colSpan={5} className="p-8 text-center text-gray-500">No customers found.</td></tr>
                )}
             </tbody>
          </table>
       </div>
    </div>
  );
};