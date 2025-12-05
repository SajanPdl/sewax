import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { Layers, Loader2, PlayCircle, RotateCw } from 'lucide-react';

export const AdminJobs: React.FC = () => {
   const [jobs, setJobs] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchJobs = async () => {
         const { data } = await supabase.from('system_jobs').select('*').order('created_at', { ascending: false });
         if(data) setJobs(data);
         setLoading(false);
      }
      fetchJobs();
   }, []);

   if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Jobs...</div>;

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-2xl font-bold text-white">Background Jobs</h1>
            <p className="text-neutral-400">Queue status and worker health.</p>
         </div>

         <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left">
               <thead className="bg-neutral-900 text-neutral-500 border-b border-neutral-700">
                  <tr>
                     <th className="px-6 py-3">Job Type</th>
                     <th className="px-6 py-3">Status</th>
                     <th className="px-6 py-3">Started</th>
                     <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-neutral-700 text-neutral-300">
                  {jobs.map(job => (
                     <tr key={job.id} className="hover:bg-neutral-700/30">
                        <td className="px-6 py-4 font-mono text-xs">{job.job_type}</td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                              job.status === 'completed' ? 'bg-green-900/20 text-green-400' :
                              job.status === 'processing' ? 'bg-blue-900/20 text-blue-400 animate-pulse' :
                              'bg-red-900/20 text-red-400'
                           }`}>
                              {job.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-neutral-500">
                           {job.started_at ? new Date(job.started_at).toLocaleString() : '-'}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-neutral-400 hover:text-white"><RotateCw className="w-4 h-4"/></button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};