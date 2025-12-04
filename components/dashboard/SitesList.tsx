
import React from 'react';
import { Button } from '../Button';
import { ExternalLink, Globe, Palette, Layout, Settings, Rocket, CheckCircle } from 'lucide-react';

export const SitesList: React.FC = () => {
  // Single Store Data (One store per user model)
  const store = {
    id: 1,
    name: 'Himalayan Coffee House',
    subdomain: 'himalayan',
    domain: 'himalayancoffee.sewax.com',
    status: 'Published',
    plan: 'Pro',
    theme: {
      name: 'Cafe Classic v2',
      image: 'https://picsum.photos/400/250?random=101',
      lastUpdated: 'Oct 20, 2024'
    }
  };

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
                 <span className="text-xs text-gray-500">Last published: 2 days ago</span>
              </div>
              <div className="relative h-64 bg-gray-100 group">
                 <img src={store.theme.image} alt={store.theme.name} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-3">
                    <Button className="shadow-xl">Customize</Button>
                    <Button variant="secondary" className="shadow-xl">Preview</Button>
                 </div>
              </div>
              <div className="p-6 flex items-center justify-between">
                 <div>
                    <h4 className="font-bold text-lg text-gray-900">{store.theme.name}</h4>
                    <p className="text-sm text-gray-500">Version 2.4.1 • Mobile Optimized</p>
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
                 {['Home', 'About Us', 'Menu / Shop', 'Contact'].map((page, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-primary-200 transition-colors">
                       <span className="text-sm font-medium text-gray-700">{page}</span>
                       <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-bold uppercase">Live</span>
                          <button className="text-gray-400 hover:text-primary-600 text-xs font-medium">Edit</button>
                       </div>
                    </div>
                 ))}
                 <button className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-400 hover:text-primary-600 hover:border-primary-300 transition-colors">
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
                 <p className="text-gray-900 font-mono text-sm">{store.domain}</p>
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
