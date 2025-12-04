
import React, { useState } from 'react';
import { Button } from '../Button';
import { Search, Filter, Shield, Ban, Lock, Mail, MoreHorizontal, UserCheck } from 'lucide-react';

export const UserManager: React.FC = () => {
  const [filter, setFilter] = useState('All');
  
  const users = [
    { id: 'U-001', name: 'Ramesh Gupta', email: 'ramesh@himalayan.com', role: 'Owner', tenant: 'Himalayan Coffee', status: 'Active', joined: 'Oct 12, 2023' },
    { id: 'U-002', name: 'Sita Magar', email: 'sita@thamelarts.com', role: 'Owner', tenant: 'Thamel Arts', status: 'Active', joined: 'Sep 20, 2023' },
    { id: 'U-003', name: 'Spam Bot', email: 'bot@spam.com', role: 'Viewer', tenant: 'Spam Co.', status: 'Banned', joined: 'Today' },
    { id: 'U-004', name: 'Hari Bansha', email: 'hari@tech.com', role: 'Editor', tenant: 'TechStart', status: 'Active', joined: 'Aug 15, 2023' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold text-white">Global User Directory</h1>
            <p className="text-neutral-400">Manage 3,850 registered users across all tenants.</p>
         </div>
         <div className="flex gap-3">
             <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800">Export CSV</Button>
         </div>
      </div>

      {/* Filters */}
      <div className="bg-neutral-800 p-4 rounded-xl border border-neutral-700 flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by name, email, or tenant..." 
              className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-1 focus:ring-primary-500 text-sm text-white placeholder-neutral-500 focus:outline-none"
            />
         </div>
         <div className="flex items-center gap-3">
             <select className="bg-neutral-900 border border-neutral-700 text-neutral-300 text-sm rounded-lg p-2 focus:outline-none">
                <option>All Roles</option>
                <option>Owner</option>
                <option>Admin</option>
                <option>Editor</option>
             </select>
             <select className="bg-neutral-900 border border-neutral-700 text-neutral-300 text-sm rounded-lg p-2 focus:outline-none">
                <option>All Status</option>
                <option>Active</option>
                <option>Banned</option>
                <option>Pending</option>
             </select>
         </div>
      </div>

      {/* Table */}
      <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden">
         <table className="w-full text-sm text-left">
            <thead className="bg-neutral-900 text-neutral-400 font-medium border-b border-neutral-700">
               <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role & Tenant</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700 text-neutral-300">
               {users.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-700/30 transition-colors group">
                     <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center font-bold text-xs text-neutral-300">
                              {user.name.charAt(0)}
                           </div>
                           <div>
                              <p className="font-bold text-white text-sm">{user.name}</p>
                              <p className="text-neutral-500 text-xs flex items-center gap-1">
                                 <Mail className="w-3 h-3" /> {user.email}
                              </p>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex flex-col">
                           <span className="text-sm font-medium text-white">{user.tenant}</span>
                           <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
                              <Shield className="w-3 h-3" /> {user.role}
                           </span>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border ${
                           user.status === 'Active' ? 'bg-green-900/20 text-green-400 border-green-900/30' : 
                           'bg-red-900/20 text-red-400 border-red-900/30'
                        }`}>
                           {user.status === 'Active' ? <UserCheck className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                           {user.status}
                        </span>
                     </td>
                     <td className="px-6 py-4 text-neutral-400">
                        {user.joined}
                     </td>
                     <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded tooltip" title="Reset Password">
                              <Lock className="w-4 h-4" />
                           </button>
                           <button className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-neutral-700 rounded tooltip" title="Ban User">
                              <Ban className="w-4 h-4" />
                           </button>
                           <button className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded">
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
