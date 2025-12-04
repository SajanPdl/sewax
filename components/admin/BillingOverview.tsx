
import React from 'react';
import { Button } from '../Button';
import { DollarSign, CreditCard, TrendingUp, Download, CheckCircle, Clock } from 'lucide-react';

export const BillingOverview: React.FC = () => {
  return (
    <div className="space-y-8">
       <div>
          <h1 className="text-2xl font-bold text-white">Billing & Plans</h1>
          <p className="text-neutral-400">Manage pricing tiers, subscriptions, and payouts.</p>
       </div>

       {/* Billing Stats */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-900/50 to-neutral-800 border border-green-900/30 p-6 rounded-xl relative overflow-hidden">
             <div className="absolute top-4 right-4 p-2 bg-green-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
             </div>
             <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-2">Total Revenue (All Time)</p>
             <h3 className="text-3xl font-bold text-white">NPR 1.2M</h3>
             <p className="text-green-300/60 text-sm mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> +18% this month
             </p>
          </div>
          <div className="bg-neutral-800 border border-neutral-700 p-6 rounded-xl relative">
             <div className="absolute top-4 right-4 p-2 bg-neutral-700 rounded-lg">
                <CreditCard className="w-6 h-6 text-neutral-400" />
             </div>
             <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-2">Active Subscriptions</p>
             <h3 className="text-3xl font-bold text-white">840</h3>
             <p className="text-neutral-400 text-sm mt-2">65% on Pro Plan</p>
          </div>
          <div className="bg-neutral-800 border border-neutral-700 p-6 rounded-xl relative">
             <div className="absolute top-4 right-4 p-2 bg-neutral-700 rounded-lg">
                <Clock className="w-6 h-6 text-neutral-400" />
             </div>
             <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-2">Failed Payments (24h)</p>
             <h3 className="text-3xl font-bold text-white">12</h3>
             <p className="text-red-400 text-sm mt-2">Requires attention</p>
          </div>
       </div>

       <div className="grid lg:grid-cols-3 gap-8">
          {/* Plans Manager */}
          <div className="lg:col-span-2 space-y-6">
             <div className="flex justify-between items-center">
                <h3 className="font-bold text-white text-lg">Active Pricing Plans</h3>
                <Button size="sm" variant="outline" className="border-neutral-700 text-neutral-300">Add Plan</Button>
             </div>
             <div className="grid md:grid-cols-3 gap-4">
                {[
                   { name: 'Suruwat (Free)', price: '0', users: '450', active: true },
                   { name: 'Byawasaya (Pro)', price: '1,500', users: '620', active: true },
                   { name: 'Agency', price: '5,000', users: '50', active: true },
                ].map((plan, i) => (
                   <div key={i} className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 hover:border-primary-500/50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                         <h4 className="font-bold text-white">{plan.name}</h4>
                         <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      </div>
                      <p className="text-2xl font-bold text-white mb-1">NPR {plan.price}<span className="text-xs text-neutral-500 font-normal">/mo</span></p>
                      <div className="flex justify-between items-end mt-4">
                         <span className="text-xs text-neutral-400">{plan.users} active users</span>
                         <button className="text-xs text-primary-400 hover:text-primary-300 font-medium">Edit</button>
                      </div>
                   </div>
                ))}
             </div>

             <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden mt-8">
                <div className="px-6 py-4 border-b border-neutral-700 flex justify-between items-center">
                   <h3 className="font-bold text-white">Recent Transactions</h3>
                   <button className="text-xs text-neutral-400 flex items-center gap-1 hover:text-white">
                      <Download className="w-3 h-3" /> Export
                   </button>
                </div>
                <table className="w-full text-sm text-left">
                   <tbody className="divide-y divide-neutral-700 text-neutral-300">
                      {[
                         { id: 'TXN-9923', user: 'Himalayan Coffee', amount: '1,500', method: 'eSewa', status: 'Success' },
                         { id: 'TXN-9922', user: 'Thamel Arts', amount: '5,000', method: 'Khalti', status: 'Success' },
                         { id: 'TXN-9921', user: 'New User', amount: '1,500', method: 'Card', status: 'Failed' },
                      ].map((txn, i) => (
                         <tr key={i} className="hover:bg-neutral-700/30">
                            <td className="px-6 py-3 font-mono text-xs text-neutral-500">{txn.id}</td>
                            <td className="px-6 py-3 font-medium text-white">{txn.user}</td>
                            <td className="px-6 py-3">NPR {txn.amount}</td>
                            <td className="px-6 py-3 text-xs">{txn.method}</td>
                            <td className="px-6 py-3 text-right">
                               <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  txn.status === 'Success' ? 'bg-green-900/20 text-green-400 border border-green-900/30' : 
                                  'bg-red-900/20 text-red-400 border border-red-900/30'
                               }`}>
                                  {txn.status}
                               </span>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>

          {/* Integration Health */}
          <div className="space-y-6">
             <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
                <h3 className="font-bold text-white mb-4">Gateway Status</h3>
                <div className="space-y-4">
                   {[
                      { name: 'Stripe', status: 'Operational', latency: '45ms' },
                      { name: 'eSewa API', status: 'Operational', latency: '120ms' },
                      { name: 'Khalti API', status: 'Degraded', latency: '850ms' },
                   ].map((gw, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                         <div>
                            <p className="text-sm font-bold text-gray-200">{gw.name}</p>
                            <p className="text-xs text-neutral-500">{gw.latency}</p>
                         </div>
                         <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${gw.status === 'Operational' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                            <span className={`text-xs font-bold ${gw.status === 'Operational' ? 'text-green-500' : 'text-yellow-500'}`}>
                               {gw.status}
                            </span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};
