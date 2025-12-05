import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { Globe, ExternalLink, Loader2 } from 'lucide-react';

export const AdminSites: React.FC = () => {
   const [sites, setSites] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchSites = async () => {
         const { data } = await supabase.from('tenants').select('*');
         if(data) setSites(data);
         setLoading(false);
      }
      fetchSites();
   }, []);

   if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Sites...</div>;

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-2xl font-bold text-white">Sites & Domains</h1>
            <p className="text-neutral-400">DNS configuration and domain mapping.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map(site => (
               <div key={site.id} className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 hover:border-neutral-500 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                     <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        {site.name.charAt(0)}
                     </div>
                     <span className={`px-2 py-1 rounded text-xs font-bold ${site.domain_verified ? 'bg-green-900/20 text-green-400' : 'bg-yellow-900/20 text-yellow-400'}`}>
                        {site.domain_verified ? 'Verified' : 'Pending'}
                     </span>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-1">{site.name}</h3>
                  <a href={`https://${site.slug}.sewax.com`} target="_blank" className="text-primary-400 text-sm flex items-center gap-1 hover:underline mb-4">
                     {site.slug}.sewax.com <ExternalLink className="w-3 h-3" />
                  </a>
                  
                  <div className="pt-4 border-t border-neutral-700">
                     <p className="text-xs text-neutral-500 mb-1">Custom Domain</p>
                     <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-neutral-400" />
                        <span className="text-sm text-neutral-300">{site.custom_domain || 'Not configured'}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};