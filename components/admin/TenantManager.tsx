
import React from 'react';
import { Button } from '../Button';
import { Search, Filter, MoreVertical, LogIn, Lock, Trash2, CheckCircle, AlertTriangle, ExternalLink, Clock } from 'lucide-react';

export const TenantManager: React.FC = () => {
  const tenants = [
    { id: 'T001', name: 'Himalayan Coffee', subdomain: 'himalayancoffee', plan: 'Pro', status: 'Active', owner: 'Ramesh G.', sites: 1, revenue: '1,500' },
    { id: 'T002', name: 'Thamel Arts', subdomain: 'thamelarts', plan: 'Agency', status: 'Active', owner: 'Sita M.', sites: 5, revenue: '5,000' },
    { id: 'T003', name: 'Spam Company', subdomain: 'cheap-nike-shoes', plan: 'Free', status: 'Suspended', owner: 'Bot U.', sites: 1, revenue: '0' },
    { id: 'T004', name: 'Everest Momo', subdomain: 'everestmomo', plan: 'Pro', status: 'Trial', owner: 'Pema S.', sites: 1, revenue: '0' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold text-white">Tenant Management</h1>
            <p className="text-neutral-400">Manage {tenants.length} active workspaces.</p>
         </div>
         <Button className="bg-primary-600 hover:bg-primary-700 text-white border-0">
            Create Tenant
         </Button>
      </div>

      {/* Filters */}
      <div className="bg-neutral-800 p-4 rounded-xl border border-neutral-700 flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by company, domain, or email..." 
              className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-1 focus:ring-primary-500 text-sm text-white placeholder-neutral-500 focus:outline-none"
            />
         </div>
         <div className="flex items-center gap-3">
             <select className="bg-neutral-900 border border-neutral-700 text-neutral-300 text-sm rounded-lg p-2 focus:outline-none">
                <option>All Plans</option>
                <option>Pro</option>
                <option>Agency</option>
                <option>Free</option>
             </select>
             <select className="bg-neutral-900 border border-neutral-700 text-neutral-300 text-sm rounded-lg p-2 focus:outline-none">
                <option>All Status</option>
                <option>Active</option>
                <option>Suspended</option>
             </select>
             <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-white">
                Export CSV
             </Button>
         </div>
      </div>

      {/* Table */}
      <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden">
         <table className="w-full text-sm text-left">
            <thead className="bg-neutral-900 text-neutral-400 font-medium border-b border-neutral-700">
               <tr>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">MRR</th>
                  <th className="px-6 py-4 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700 text-neutral-300">
               {tenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-neutral-700/30 transition-colors group">
                     <td className="px-6 py-4">
                        <div className="flex flex-col">
                           <span className="font-bold text-white text-base">{tenant.name}</span>
                           <span className="text-neutral-500 text-xs font-mono flex items-center gap-1">
                              {tenant.subdomain}.sewax.com
                              <a href="#" className="hover:text-primary-400"><ExternalLink className="w-3 h-3"/></a>
                           </span>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-bold text-neutral-300">
                              {tenant.owner.charAt(0)}
                           </div>
                           {tenant.owner}
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold border ${
                           tenant.plan === 'Agency' ? 'bg-purple-900/30 text-purple-400 border-purple-900/50' : 
                           tenant.plan === 'Pro' ? 'bg-blue-900/30 text-blue-400 border-blue-900/50' :
                           'bg-neutral-700/50 text-neutral-400 border-neutral-600'
                        }`}>
                           {tenant.plan}
                        </span>
                     </td>
                     <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 text-xs font-medium ${
                           tenant.status === 'Active' ? 'text-green-400' :
                           tenant.status === 'Suspended' ? 'text-red-400' :
                           'text-yellow-400'
                        }`}>
                           {tenant.status === 'Active' && <CheckCircle className="w-3 h-3" />}
                           {tenant.status === 'Suspended' && <AlertTriangle className="w-3 h-3" />}
                           {tenant.status === 'Trial' && <Clock className="w-3 h-3" />}
                           {tenant.status}
                        </span>
                     </td>
                     <td className="px-6 py-4 font-mono text-neutral-300">
                        NPR {tenant.revenue}
                     </td>
                     <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded tooltip" title="Impersonate">
                              <LogIn className="w-4 h-4" />
                           </button>
                           <button className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded" title="Suspend">
                              <Lock className="w-4 h-4" />
                           </button>
                           <button className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-neutral-700 rounded" title="Delete">
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <div className="px-6 py-4 border-t border-neutral-700 bg-neutral-900 flex justify-between items-center text-xs text-neutral-500">
            <span>Showing 4 of 1,240 tenants</span>
            <div className="flex gap-2">
               <button className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded hover:text-white">Previous</button>
               <button className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded hover:text-white">Next</button>
            </div>
         </div>
      </div>
    </div>
  );
};
