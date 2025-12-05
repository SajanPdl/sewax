import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Search, Shield, Mail, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';

export const UserManager: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const fetchUsers = async () => {
        // Fetch profiles
        const { data, error } = await supabase
           .from('profiles')
           .select('*')
           .order('created_at', { ascending: false })
           .limit(50);
        
        if (data) setUsers(data);
        setLoading(false);
     };
     fetchUsers();
  }, []);

  if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Users...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold text-white">Global User Directory</h1>
            <p className="text-neutral-400">Recent registered users.</p>
         </div>
      </div>

      <div className="bg-neutral-800 p-4 rounded-xl border border-neutral-700 flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-1 focus:ring-primary-500 text-sm text-white placeholder-neutral-500 focus:outline-none"
            />
         </div>
      </div>

      <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden">
         <table className="w-full text-sm text-left">
            <thead className="bg-neutral-900 text-neutral-400 font-medium border-b border-neutral-700">
               <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">System Role</th>
                  <th className="px-6 py-4">Joined</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700 text-neutral-300">
               {users.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-700/30 transition-colors">
                     <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center font-bold text-xs text-neutral-300">
                              {(user.full_name || user.email).charAt(0).toUpperCase()}
                           </div>
                           <div>
                              <p className="font-bold text-white text-sm">{user.full_name || 'No Name'}</p>
                              <p className="text-neutral-500 text-xs flex items-center gap-1">
                                 <Mail className="w-3 h-3" /> {user.email}
                              </p>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
                           <Shield className="w-3 h-3" /> {user.is_super_admin ? 'Super Admin' : 'User'}
                        </span>
                     </td>
                     <td className="px-6 py-4 text-neutral-400">
                        {new Date(user.created_at).toLocaleDateString()}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         {users.length === 0 && <div className="p-8 text-center text-neutral-500">No users found.</div>}
      </div>
    </div>
  );
};