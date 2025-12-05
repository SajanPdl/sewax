import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Search, ExternalLink, CheckCircle, AlertTriangle, Trash2, Power, Play, UserCog, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';

export const TenantManager: React.FC = () => {
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTenants = async () => {
     // Fetch tenants and their owners
     const { data, error } = await supabase
        .from('tenants')
        .select(`
           *,
           tenant_members!inner(role, user_id, profiles(email, full_name))
        `)
        .eq('tenant_members.role', 'Owner')
        .order('created_at', { ascending: false });
     
     if (data) setTenants(data);
     setLoading(false);
  };

  useEffect(() => {
     fetchTenants();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
      const newStatus = currentStatus === 'active' || currentStatus === 'trial' ? 'suspended' : 'active';
      await supabase.from('tenants').update({ subscription_status: newStatus }).eq('id', id);
      
      // Log audit
      await supabase.from('audit_logs').insert({
         action: 'UPDATE_TENANT_STATUS',
         target: id,
         details: { new_status: newStatus }
      });
      
      fetchTenants();
  };

  const handleImpersonate = (tenantId: string) => {
      alert(`Impersonation started for tenant ${tenantId}. In a real app, this would swap your session tokens.`);
      // Logic: Exchange super admin token for tenant owner token via edge function
  }

  const handleDelete = async (id: string) => {
     if (!confirm("Are you sure? This will delete all tenant data.")) return;
     await supabase.from('tenants').delete().eq('id', id);
     fetchTenants();
  };

  if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Tenants...</div>;

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
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700 text-neutral-300">
               {tenants.map((tenant) => {
                  const owner = tenant.tenant_members?.[0]?.profiles;
                  const isActive = tenant.subscription_status === 'active' || tenant.subscription_status === 'trial';
                  return (
                  <tr key={tenant.id} className="hover:bg-neutral-700/30 transition-colors group">
                     <td className="px-6 py-4">
                        <div className="flex flex-col">
                           <span className="font-bold text-white text-base">{tenant.name}</span>
                           <span className="text-neutral-500 text-xs font-mono flex items-center gap-1">
                              {tenant.slug}.sewax.com
                              <a href="#" className="hover:text-primary-400"><ExternalLink className="w-3 h-3"/></a>
                           </span>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-bold text-neutral-300">
                              {owner?.full_name?.charAt(0) || '?'}
                           </div>
                           <div className="flex flex-col">
                              <span>{owner?.full_name || 'Unknown'}</span>
                              <span className="text-[10px] text-neutral-500">{owner?.email}</span>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded text-xs font-bold border bg-neutral-700/50 text-neutral-400 border-neutral-600 capitalize">
                           {tenant.plan}
                        </span>
                     </td>
                     <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 text-xs font-medium capitalize ${
                           isActive ? 'text-green-400' : 'text-red-400'
                        }`}>
                           {isActive ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                           {tenant.subscription_status}
                        </span>
                     </td>
                     <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                           <button 
                              onClick={() => handleImpersonate(tenant.id)}
                              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded"
                              title="Impersonate"
                           >
                              <UserCog className="w-4 h-4" />
                           </button>
                           <button 
                              onClick={() => handleToggleStatus(tenant.id, tenant.subscription_status)}
                              className={`p-2 rounded hover:bg-neutral-700 ${isActive ? 'text-neutral-400 hover:text-red-400' : 'text-green-500 hover:text-green-400'}`}
                              title={isActive ? 'Suspend' : 'Activate'}
                           >
                              {isActive ? <Power className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                           </button>
                           <button 
                              onClick={() => handleDelete(tenant.id)}
                              className="p-2 text-neutral-400 hover:text-red-400 hover:bg-neutral-700 rounded"
                           >
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     </td>
                  </tr>
                  );
               })}
            </tbody>
         </table>
         {tenants.length === 0 && <div className="p-8 text-center text-neutral-500">No tenants found.</div>}
      </div>
    </div>
  );
};