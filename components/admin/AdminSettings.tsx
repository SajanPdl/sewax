import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { Save, Loader2 } from 'lucide-react';
import { Button } from '../Button';

export const AdminSettings: React.FC = () => {
   const [settings, setSettings] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchSettings = async () => {
         const { data } = await supabase.from('system_settings').select('*');
         if(data) setSettings(data);
         setLoading(false);
      }
      fetchSettings();
   }, []);

   if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Settings...</div>;

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-2xl font-bold text-white">System Configuration</h1>
            <p className="text-neutral-400">Global application variables.</p>
         </div>

         <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 space-y-6">
            {settings.map(setting => (
               <div key={setting.key}>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                     {setting.key.replace(/_/g, ' ')}
                  </label>
                  <div className="flex gap-4">
                     <input 
                        type="text" 
                        defaultValue={JSON.stringify(setting.value).replace(/^"|"$/g, '')}
                        className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-white text-sm focus:border-primary-500 focus:outline-none"
                     />
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">{setting.description}</p>
               </div>
            ))}
            <div className="pt-4 border-t border-neutral-700 flex justify-end">
               <Button className="flex items-center gap-2 bg-primary-600 border-0 text-white hover:bg-primary-700">
                  <Save className="w-4 h-4" /> Save Changes
               </Button>
            </div>
         </div>
      </div>
   );
};