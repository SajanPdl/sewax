
import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Mail, Shield, Trash2, UserPlus, Lock, Loader2 } from 'lucide-react';
import { RBACWrapper } from './RBACWrapper';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';

export const Team: React.FC = () => {
  const { tenant, role } = useAuth();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenant) return;

    const fetchMembers = async () => {
      // Fetch members and join with profiles to get details
      const { data, error } = await supabase
        .from('tenant_members')
        .select(`
          role,
          joined_at,
          profiles:user_id (full_name, email, avatar_url)
        `)
        .eq('tenant_id', tenant.id);
      
      if (data) {
        setMembers(data);
      }
      setLoading(false);
    };

    fetchMembers();
  }, [tenant]);

  const handleInvite = () => {
      const email = prompt("Enter email address to invite:");
      if(email) {
          alert(`Invite sent to ${email} (Mock)`);
      }
  };

  if (loading) return <div className="p-8"><Loader2 className="w-6 h-6 animate-spin text-primary-500" /></div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
       <div className="flex justify-between items-center mb-8">
          <div>
             <h1 className="text-2xl font-display font-bold text-gray-900">Team Management</h1>
             <p className="text-gray-500">Manage access to your Sewax dashboard.</p>
          </div>
          <RBACWrapper allowedRoles={['Owner', 'Admin']} userRole={role} fallback={
             <Button disabled className="opacity-50 cursor-not-allowed flex items-center gap-2">
                <Lock className="w-4 h-4" /> Invite Member
             </Button>
          }>
             <Button className="flex items-center gap-2" onClick={handleInvite}>
                <UserPlus className="w-4 h-4" /> Invite Member
             </Button>
          </RBACWrapper>
       </div>

       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
             <Shield className="w-4 h-4 text-gray-500" />
             <span className="text-sm font-medium text-gray-600">You are on the <span className="text-gray-900 font-bold">{tenant?.plan || 'Free'} Plan</span>.</span>
          </div>

          <table className="w-full text-sm text-left">
             <thead className="bg-white text-gray-500 uppercase text-xs border-b border-gray-100">
                <tr>
                   <th className="px-6 py-4 font-medium">User</th>
                   <th className="px-6 py-4 font-medium">Role</th>
                   <th className="px-6 py-4 font-medium">Joined</th>
                   <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {members.map((member, i) => {
                   const profile = member.profiles; // Joined data
                   return (
                     <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                                 {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'U'}
                              </div>
                              <div>
                                 <p className="font-bold text-gray-900">{profile?.full_name || 'Unknown'}</p>
                                 <p className="text-gray-500 flex items-center gap-1">
                                    <Mail className="w-3 h-3" /> {profile?.email}
                                 </p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {member.role}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                           {new Date(member.joined_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                           {member.role !== 'Owner' && (
                              <RBACWrapper allowedRoles={['Owner']} userRole={role}>
                                 <button className="text-gray-400 hover:text-red-600 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                              </RBACWrapper>
                           )}
                        </td>
                     </tr>
                   );
                })}
             </tbody>
          </table>
          {members.length === 0 && <div className="p-8 text-center text-gray-500">No members found.</div>}
       </div>
    </div>
  );
};
