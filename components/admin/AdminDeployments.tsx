import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { Rocket, GitCommit, CheckCircle, XCircle, Clock, Loader2, RotateCw } from 'lucide-react';
import { Button } from '../Button';

export const AdminDeployments: React.FC = () => {
   const [deploys, setDeploys] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   const fetchDeploys = async () => {
      const { data } = await supabase.from('deployments').select('*, tenants(name)').order('created_at', { ascending: false });
      if(data) setDeploys(data);
      setLoading(false);
   };

   useEffect(() => {
      fetchDeploys();
   }, []);

   const triggerDeploy = async () => {
       // Mock trigger
       await supabase.from('deployments').insert({
           status: 'queued',
           version: 'v' + Math.floor(Math.random() * 100),
           commit_hash: Math.random().toString(36).substring(7),
           logs: 'Initializing build...'
       });
       fetchDeploys();
   }

   if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Deploys...</div>;

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-2xl font-bold text-white">Deployments</h1>
               <p className="text-neutral-400">Release history and build status.</p>
            </div>
            <Button onClick={triggerDeploy} className="bg-primary-600 hover:bg-primary-700 text-white border-0 flex items-center gap-2">
               <Rocket className="w-4 h-4" /> Trigger Build
            </Button>
         </div>

         <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left">
               <thead className="bg-neutral-900 text-neutral-500 border-b border-neutral-700">
                  <tr>
                     <th className="px-6 py-3">Status</th>
                     <th className="px-6 py-3">Version</th>
                     <th className="px-6 py-3">Commit</th>
                     <th className="px-6 py-3">Tenant</th>
                     <th className="px-6 py-3">Time</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-neutral-700 text-neutral-300">
                  {deploys.map(dep => (
                     <tr key={dep.id} className="hover:bg-neutral-700/30">
                        <td className="px-6 py-4">
                           <span className={`flex items-center gap-2 px-2 py-1 rounded w-fit text-xs font-bold uppercase ${
                              dep.status === 'live' ? 'bg-green-900/20 text-green-400' :
                              dep.status === 'failed' ? 'bg-red-900/20 text-red-400' :
                              'bg-blue-900/20 text-blue-400 animate-pulse'
                           }`}>
                              {dep.status === 'live' ? <CheckCircle className="w-3 h-3"/> : dep.status === 'failed' ? <XCircle className="w-3 h-3"/> : <RotateCw className="w-3 h-3 animate-spin"/>}
                              {dep.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs">{dep.version}</td>
                        <td className="px-6 py-4 font-mono text-xs flex items-center gap-1 text-neutral-500">
                            <GitCommit className="w-3 h-3" /> {dep.commit_hash}
                        </td>
                        <td className="px-6 py-4 text-neutral-400">{dep.tenants?.name || 'System'}</td>
                        <td className="px-6 py-4 text-neutral-500 text-xs">
                           {new Date(dep.created_at).toLocaleString()}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};