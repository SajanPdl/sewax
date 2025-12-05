
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { Terminal, Copy, Plus, Loader2 } from 'lucide-react';
import { Button } from '../Button';

export const AdminAPIKeys: React.FC = () => {
   const [keys, setKeys] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   const fetchKeys = async () => {
      const { data } = await supabase.from('admin_api_keys').select('*');
      if(data) setKeys(data);
      setLoading(false);
   };

   useEffect(() => {
      fetchKeys();
   }, []);

   const generateKey = async () => {
      await supabase.from('admin_api_keys').insert({
         name: `API Key ${Math.floor(Math.random() * 1000)}`,
         key_prefix: 'sk_live_' + Math.random().toString(36).substring(7),
         scopes: ['read', 'write']
      });
      fetchKeys();
   };

   if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Keys...</div>;

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-2xl font-bold text-white">API Keys</h1>
               <p className="text-neutral-400">Manage programmatic access.</p>
            </div>
            <Button onClick={generateKey} className="bg-white text-neutral-900 border-0 hover:bg-neutral-200 flex items-center gap-2">
               <Plus className="w-4 h-4" /> Generate Key
            </Button>
         </div>

         <div className="space-y-4">
            {keys.length === 0 && <div className="text-neutral-500 text-center p-8 bg-neutral-800 rounded-xl border border-neutral-700">No active keys.</div>}
            {keys.map(key => (
               <div key={key.id} className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-neutral-900 rounded border border-neutral-700">
                        <Terminal className="w-5 h-5 text-neutral-400" />
                     </div>
                     <div>
                        <p className="font-bold text-white">{key.name}</p>
                        <p className="text-xs text-neutral-500 font-mono">Prefix: {key.key_prefix}...</p>
                     </div>
                  </div>
                  <button className="text-neutral-400 hover:text-white" title="Copy ID (Mock)"><Copy className="w-4 h-4"/></button>
               </div>
            ))}
         </div>
      </div>
   );
};
