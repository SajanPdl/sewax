import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { DollarSign, CreditCard, TrendingUp, Download, Loader2, Edit, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';

export const BillingOverview: React.FC = () => {
   const [revenue, setRevenue] = useState(0);
   const [orders, setOrders] = useState<any[]>([]);
   const [plans, setPlans] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         const { data: ords } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(20);
         const { data: allOrders } = await supabase.from('orders').select('total');
         const { data: planData } = await supabase.from('plans').select('*').order('price_monthly');
         
         const totalRev = allOrders?.reduce((acc, o) => acc + (o.total || 0), 0) || 0;
         setRevenue(totalRev);
         if (ords) setOrders(ords);
         if (planData) setPlans(planData);
         setLoading(false);
      };
      fetchData();
   }, []);

   if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Billing...</div>;

  return (
    <div className="space-y-8">
       <div>
          <h1 className="text-2xl font-bold text-white">Billing & Plans</h1>
          <p className="text-neutral-400">Manage pricing tiers and revenue.</p>
       </div>

       {/* Billing Stats */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-900/50 to-neutral-800 border border-green-900/30 p-6 rounded-xl relative overflow-hidden">
             <div className="absolute top-4 right-4 p-2 bg-green-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
             </div>
             <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-2">Total GMV</p>
             <h3 className="text-3xl font-bold text-white">NPR {(revenue/1000).toFixed(1)}k</h3>
          </div>
       </div>

       {/* Plans Management */}
       <div>
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Subscription Plans</h2>
            <Button size="sm" className="bg-primary-600 border-0 text-white flex items-center gap-2">
               <Plus className="w-3 h-3" /> New Plan
            </Button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map(plan => (
               <div key={plan.id} className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 relative group hover:border-neutral-500 transition-colors">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button className="text-neutral-400 hover:text-white p-1"><Edit className="w-4 h-4"/></button>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-2xl font-bold text-white mb-1">NPR {plan.price_monthly}<span className="text-sm font-normal text-neutral-500">/mo</span></div>
                  <div className="text-sm text-neutral-500 mb-4">NPR {plan.price_yearly}/yr</div>
                  <ul className="space-y-2 mb-6">
                     {plan.features && plan.features.map((f: string, i: number) => (
                        <li key={i} className="text-xs text-neutral-400 flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div> {f}
                        </li>
                     ))}
                  </ul>
                  <div className="w-full bg-neutral-700 h-px"></div>
               </div>
            ))}
         </div>
       </div>

       <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 space-y-6">
             <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden mt-8">
                <div className="px-6 py-4 border-b border-neutral-700 flex justify-between items-center">
                   <h3 className="font-bold text-white">Recent Transactions</h3>
                </div>
                <table className="w-full text-sm text-left">
                   <tbody className="divide-y divide-neutral-700 text-neutral-300">
                      {orders.map((txn, i) => (
                         <tr key={i} className="hover:bg-neutral-700/30">
                            <td className="px-6 py-3 font-mono text-xs text-neutral-500">{txn.id.slice(0,8)}</td>
                            <td className="px-6 py-3 font-medium text-white">{txn.customer_name || 'Guest'}</td>
                            <td className="px-6 py-3">NPR {txn.total}</td>
                            <td className="px-6 py-3 text-right">
                               <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-900/20 text-green-400 border border-green-900/30">
                                  {txn.status}
                               </span>
                            </td>
                         </tr>
                      ))}
                      {orders.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-neutral-500">No transactions.</td></tr>}
                   </tbody>
                </table>
             </div>
          </div>
       </div>
    </div>
  );
};