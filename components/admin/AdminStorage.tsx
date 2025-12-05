import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { HardDrive, Folder, File, Loader2 } from 'lucide-react';

export const AdminStorage: React.FC = () => {
   const [stats, setStats] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchStats = async () => {
         const { data } = await supabase.from('storage_stats').select('*');
         if(data) setStats(data);
         setLoading(false);
      }
      fetchStats();
   }, []);

   if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Storage...</div>;

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-2xl font-bold text-white">Storage & CDN</h1>
            <p className="text-neutral-400">Manage S3 buckets and assets.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map(stat => (
               <div key={stat.id} className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-3 bg-neutral-900 rounded-lg">
                        <Folder className="w-6 h-6 text-yellow-500" />
                     </div>
                     <div>
                        <h3 className="font-bold text-white">{stat.bucket_name}</h3>
                        <p className="text-xs text-neutral-500">Bucket</p>
                     </div>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Total Objects</span>
                        <span className="text-white font-mono">{stat.object_count}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Size Used</span>
                        <span className="text-white font-mono">{(stat.total_size_bytes / 1024 / 1024).toFixed(2)} MB</span>
                     </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-700">
                     <div className="w-full bg-neutral-900 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                     </div>
                     <p className="text-xs text-neutral-500 mt-2 text-right">45% Capacity</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};