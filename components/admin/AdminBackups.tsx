import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { Database, Download, Loader2 } from 'lucide-react';
import { Button } from '../Button';

export const AdminBackups: React.FC = () => {
   const [backups, setBackups] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchBackups = async () => {
         const { data } = await supabase.from('system_backups').select('*').order('completed_at', { ascending: false });
         if(data) setBackups(data);
         setLoading(false);
      }
      fetchBackups();
   }, []);

   if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Backups...</div>;

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-2xl font-bold text-white">Database Backups</h1>
               <p className="text-neutral-400">Disaster recovery points.</p>
            </div>
            <Button className="bg-primary-600 hover:bg-primary-700 border-0 text-white">Trigger Backup</Button>
         </div>

         <div className="space-y-4">
            {backups.map(backup => (
               <div key={backup.id} className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-neutral-900 rounded-lg">
                        <Database className="w-6 h-6 text-green-500" />
                     </div>
                     <div>
                        <p className="font-bold text-white">{backup.filename}</p>
                        <p className="text-xs text-neutral-500">
                           {(backup.size_bytes / 1024 / 1024).toFixed(2)} MB • {new Date(backup.completed_at).toLocaleString()}
                        </p>
                     </div>
                  </div>
                  <button className="p-2 text-neutral-400 hover:text-white">
                     <Download className="w-5 h-5" />
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
};