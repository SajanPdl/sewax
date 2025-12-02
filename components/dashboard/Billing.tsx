import React from 'react';
import { Button } from '../Button';
import { CreditCard, CheckCircle, Download, AlertCircle } from 'lucide-react';

export const Billing: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
       <h1 className="text-2xl font-display font-bold text-gray-900 mb-6">Billing & Plans</h1>
       
       <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Current Plan Card */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <CreditCard className="w-24 h-24 text-primary-500" />
             </div>
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                   <h3 className="font-bold text-lg">Current Plan</h3>
                   <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase">Pro</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">NPR 1,500 <span className="text-sm text-gray-500 font-normal">/ month</span></p>
                <p className="text-sm text-gray-500 mb-6">Renews automatically on Oct 24, 2024</p>
                
                <div className="flex gap-3">
                   <Button>Upgrade Plan</Button>
                   <Button variant="outline">Cancel Subscription</Button>
                </div>
             </div>
          </div>

          {/* Usage Card */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 flex flex-col justify-center">
             <h4 className="font-bold text-gray-700 mb-4">Plan Usage</h4>
             
             <div className="space-y-4">
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Storage</span>
                      <span className="font-bold">2.4GB / 5GB</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Products</span>
                      <span className="font-bold">12 / 50</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '24%' }}></div>
                   </div>
                </div>
             </div>
          </div>
       </div>
       
       {/* Payment Methods */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">Payment Methods</h3>
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
             <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-xs">eSewa</div>
                <div>
                   <p className="text-sm font-bold text-gray-900">eSewa Wallet</p>
                   <p className="text-xs text-gray-500">Connected via 984******0</p>
                </div>
             </div>
             <span className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded">Default</span>
          </div>
          <button className="mt-4 text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
             + Add Payment Method
          </button>
       </div>

       {/* Invoice History */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
             <h3 className="font-bold text-lg">Billing History</h3>
          </div>
          <table className="w-full text-sm text-left">
             <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                   <th className="px-6 py-3 font-medium">Invoice</th>
                   <th className="px-6 py-3 font-medium">Date</th>
                   <th className="px-6 py-3 font-medium">Amount</th>
                   <th className="px-6 py-3 font-medium">Status</th>
                   <th className="px-6 py-3 font-medium text-right">Download</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {[
                  { id: 'INV-003', date: 'Sep 24, 2024', amount: '1,500', status: 'Paid' },
                  { id: 'INV-002', date: 'Aug 24, 2024', amount: '1,500', status: 'Paid' },
                  { id: 'INV-001', date: 'Jul 24, 2024', amount: '1,500', status: 'Paid' },
                ].map((inv) => (
                   <tr key={inv.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{inv.id}</td>
                      <td className="px-6 py-4 text-gray-500">{inv.date}</td>
                      <td className="px-6 py-4 text-gray-900">NPR {inv.amount}</td>
                      <td className="px-6 py-4">
                         <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium">
                            <CheckCircle className="w-3 h-3" /> {inv.status}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <Download className="w-4 h-4 ml-auto" />
                         </button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};