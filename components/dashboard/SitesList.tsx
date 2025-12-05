
import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { ExternalLink, Globe, Palette, Layout, Settings, Rocket, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase/client';

export const SitesList: React.FC = () => {
  const { tenant } = useAuth();
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!tenant) return;
    fetchPages();
  }, [tenant]);

  const fetchPages = async () => {
     const { data } = await supabase.from('pages').select('*').eq('tenant_id', tenant.id);
     if(data) setPages(data);
     setLoading(false);
  };

  const handleAddPage = async () => {
      if(!tenant) return;
      const title = prompt("Enter page title (e.g. About Us):");
      if(!title) return;
      
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      const { error } = await supabase.from('pages').insert({
          tenant_id: tenant.id,
          title,
          slug,
          is_published: false,
          content: { type: 'empty' }
      });

      if(error) alert('Error creating page: ' + error.message);
      else fetchPages();
  };

  if (loading || !tenant) return <div className="p-8"><Loader2 className="w-8 h-8 animate-spin text-primary-500"/></div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-2xl font-display font-bold text-gray-900">Online Store</h1>
           <p className="text-gray-500">Manage your website, domain, and theme settings.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="flex items-center gap-2">
              <Globe className="w-4 h-4" /> View Live Site
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Store Card */}
        <div className="lg:col-span-2 space-y-8">
           {/* Current Theme Preview */}
           <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                 <h3 className="font-bold text-gray-900">Active Theme</h3>
                 <span className="text-xs text-gray-500">Status: {tenant.subscription_status}</span>
              </div>
              <div className="relative h-64 bg-gray-100 group flex items-center justify-center">
                 {tenant.logo_url ? (
                    <img src={tenant.logo_url} alt="Logo" className="max-h-32 object-contain" />
                 ) : (
                    <div className="text-gray-400 font-bold text-2xl">{tenant.name} Preview</div>
                 )}
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-3">
                    <Button className="shadow-xl">Customize</Button>
                    <Button variant="secondary" className="shadow-xl">Preview</Button>
                 </div>
              </div>
              <div className="p-6 flex items-center justify-between">
                 <div>
                    <h4 className="font-bold text-lg text-gray-900">Default Theme</h4>
                    <p className="text-sm text-gray-500">Optimized for Mobile</p>
                 </div>
                 <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Layout className="w-4 h-4" /> Change Theme
                 </Button>
              </div>
           </div>

           {/* Pages & Navigation */}
           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Pages & Navigation</h3>
              <div className="space-y-3">
                 {pages.length === 0 && <p className="text-sm text-gray-500 italic">No pages created yet.</p>}
                 {pages.map((page, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-primary-200 transition-colors">
                       <span className="text-sm font-medium text-gray-700">{page.title} <span className="text-xs text-gray-400 font-normal">/{page.slug}</span></span>
                       <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-xs rounded-full font-bold uppercase ${page.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                             {page.is_published ? 'Live' : 'Draft'}
                          </span>
                          <button className="text-gray-400 hover:text-primary-600 text-xs font-medium">Edit</button>
                       </div>
                    </div>
                 ))}
                 <button 
                    onClick={handleAddPage}
                    className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-400 hover:text-primary-600 hover:border-primary-300 transition-colors"
                 >
                    + Add New Page
                 </button>
              </div>
           </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
           {/* Domain Card */}
           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Domain Connection</h3>
              <div className="mb-4">
                 <div className="flex items-center gap-2 text-green-600 text-sm font-bold mb-1">
                    <CheckCircle className="w-4 h-4" /> Connected
                 </div>
                 <p className="text-gray-900 font-mono text-sm">{tenant.slug}.sewax.com</p>
                 {tenant.custom_domain && (
                    <p className="text-gray-900 font-mono text-sm mt-1">{tenant.custom_domain}</p>
                 )}
              </div>
              <div className="pt-4 border-t border-gray-100">
                 <p className="text-xs text-gray-500 mb-3">Your site is secured with an SSL certificate.</p>
                 <Button variant="outline" size="sm" className="w-full">Manage Domain</Button>
              </div>
           </div>

           {/* Preferences */}
           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Store Preferences</h3>
              <div className="space-y-2">
                 <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gray-900 flex items-center justify-between group transition-colors">
                    <span>General Info</span>
                    <Settings className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
                 </button>
                 <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gray-900 flex items-center justify-between group transition-colors">
                    <span>Brand & Logo</span>
                    <Palette className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
                 </button>
                 <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gray-900 flex items-center justify-between group transition-colors">
                    <span>SEO & Metadata</span>
                    <Rocket className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
