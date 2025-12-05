import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';

export const AdminFeatureFlags: React.FC = () => {
   const [flags, setFlags] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchFlags = async () => {
         const { data } = await supabase.from('feature_flags').select('*');
         if(data) setFlags(data);
         setLoading(false);
      }
      fetchFlags();
   }, []);

   const toggleFlag = async (id: string, current: boolean) => {
      // Optimistic update
      setFlags(prev => prev.map(f => f.id === id ? {...f, is_enabled: !current} : f));
      await supabase.from('feature_flags').update({ is_enabled: !current }).eq('id', id);
   }

   if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Flags...</div>;

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-2xl font-bold text-white">Feature Flags</h1>
            <p className="text-neutral-400">Control system availability and rollouts.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flags.map(flag => (
               <div key={flag.id} className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 flex justify-between items-center">
                  <div>
                     <h3 className="font-bold text-white text-lg mb-1">{flag.key}</h3>
                     <p className="text-sm text-neutral-500">{flag.description}</p>
                  </div>
                  <button onClick={() => toggleFlag(flag.id, flag.is_enabled)}>
                     {flag.is_enabled ? (
                        <ToggleRight className="w-10 h-10 text-primary-500" />
                     ) : (
                        <ToggleLeft className="w-10 h-10 text-neutral-600" />
                     )}
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
};