import React, { useState } from 'react';
import { Button } from '../Button';
import { Save, Globe, Lock, User, Image as ImageIcon } from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
     <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-6">Site Settings</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
           {/* Sidebar Tabs */}
           <div className="w-full lg:w-64 flex-shrink-0">
              <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
                 {[
                   { id: 'general', label: 'General', icon: User },
                   { id: 'domain', label: 'Domain & SEO', icon: Globe },
                   { id: 'security', label: 'Security', icon: Lock },
                 ].map(tab => (
                   <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                       activeTab === tab.id 
                         ? 'bg-primary-50 text-primary-700' 
                         : 'text-gray-600 hover:bg-gray-50'
                     }`}
                   >
                     <tab.icon className="w-4 h-4" />
                     {tab.label}
                   </button>
                 ))}
              </nav>
           </div>

           {/* Main Content */}
           <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:p-8">
              {activeTab === 'general' && (
                <div className="space-y-6">
                   <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Store Profile</h3>
                      <p className="text-sm text-gray-500">This information will be displayed on your site.</p>
                   </div>
                   
                   <div className="grid gap-6 max-w-2xl">
                      <div className="flex items-center gap-6">
                         <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                         </div>
                         <div>
                            <Button variant="outline" size="sm" className="mb-2">Upload Logo</Button>
                            <p className="text-xs text-gray-500">Recommended size: 512x512px</p>
                         </div>
                      </div>

                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                         <input type="text" defaultValue="My First Store" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all" />
                      </div>
                      
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                         <input type="email" defaultValue="support@mystore.com" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all" />
                      </div>

                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                         <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all" defaultValue="Best authentic products from Nepal." />
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'domain' && (
                <div className="space-y-6">
                   <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Domain Settings</h3>
                      <p className="text-sm text-gray-500">Manage your custom domains and SEO preferences.</p>
                   </div>
                   
                   <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                      <div>
                         <p className="font-bold text-sm text-gray-900">mystore.sewax.com</p>
                         <p className="text-xs text-gray-500">Default Subdomain</p>
                      </div>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold uppercase">Active</span>
                   </div>
                   
                   <div className="pt-4 border-t border-gray-100">
                      <Button variant="outline">Connect Custom Domain</Button>
                   </div>
                </div>
              )}

               {activeTab === 'security' && (
                <div className="space-y-6">
                   <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Security</h3>
                      <p className="text-sm text-gray-500">Password and authentication settings.</p>
                   </div>
                   <Button variant="outline">Change Password</Button>
                </div>
              )}

              <div className="pt-8 mt-8 border-t border-gray-100 flex justify-end">
                 <Button className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                 </Button>
              </div>
           </div>
        </div>
     </div>
  );
};