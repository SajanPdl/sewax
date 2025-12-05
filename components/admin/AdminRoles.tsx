import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { Shield, User, Loader2 } from 'lucide-react';

export const AdminRoles: React.FC = () => {
   const [admins, setAdmins] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchAdmins = async () => {
         const { data } = await supabase.from('profiles').select('*').eq('is_super_admin', true);
         if(data) setAdmins(data);
         setLoading(false);
      }
      fetchAdmins();
   }, []);

   if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Roles...</div>;

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-2xl font-bold text-white">Roles & Permissions</h1>
            <p className="text-neutral-400">Manage system level access.</p>
         </div>

         <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-700 bg-neutral-900/50">
               <h3 className="font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary-500" /> Super Admins
               </h3>
            </div>
            <table className="w-full text-sm text-left">
               <tbody className="divide-y divide-neutral-700 text-neutral-300">
                  {admins.map(admin => (
                     <tr key={admin.id} className="hover:bg-neutral-700/30">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary-900/50 flex items-center justify-center text-primary-400 font-bold">
                                 <User className="w-4 h-4" />
                              </div>
                              <div>
                                 <p className="font-bold text-white">{admin.full_name || 'Admin'}</p>
                                 <p className="text-xs text-neutral-500">{admin.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <span className="bg-primary-900/20 text-primary-400 px-2 py-1 rounded text-xs font-bold border border-primary-900/30">
                              Full Access
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};