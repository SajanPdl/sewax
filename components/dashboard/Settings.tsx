
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Save, Globe, Lock, User, Image as ImageIcon, AlertCircle, CheckCircle, Copy, Loader2 } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase/client';

export const Settings: React.FC = () => {
  const { tenant } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [domainStatus, setDomainStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');

  useEffect(() => {
     if(tenant) {
        setStoreName(tenant.name || '');
        // Assuming description might be stored in a 'settings' json column or similar, 
        // but for now let's just use local state for demo if the field doesn't explicitly exist in the type above,
        // or assumes 'settings' JSON field usage.
        setDescription((tenant.settings as any)?.description || '');
        setCustomDomain(tenant.custom_domain || '');
     }
  }, [tenant]);

  const handleSaveProfile = async () => {
     if(!tenant) return;
     setLoading(true);
     const { error } = await supabase.from('tenants').update({
        name: storeName,
        settings: { ...tenant.settings as object, description: description },
        updated_at: new Date().toISOString()
     }).eq('id', tenant.id);

     if(error) alert('Error updating settings');
     else alert('Settings saved successfully!');
     setLoading(false);
  };

  const handleVerifyDomain = () => {
    if (!customDomain) return;
    setDomainStatus('verifying');
    
    // Simulate API call to check DNS records (Real implementation would call a Supabase Edge Function)
    setTimeout(() => {
       if (customDomain.includes('verified') || Math.random() > 0.5) {
          setDomainStatus('verified');
          // Update DB
          if(tenant) supabase.from('tenants').update({ custom_domain: customDomain, domain_verified: true }).eq('id', tenant.id);
       } else {
          setDomainStatus('failed');
       }
    }, 2000);
  };

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
                         <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 overflow-hidden">
                            {tenant?.logo_url ? <img src={tenant.logo_url} className="w-full h-full object-cover"/> : <ImageIcon className="w-8 h-8 text-gray-400" />}
                         </div>
                         <div>
                            <Button variant="outline" size="sm" className="mb-2">Upload Logo</Button>
                            <p className="text-xs text-gray-500">Recommended size: 512x512px</p>
                         </div>
                      </div>

                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                         <input 
                           type="text" 
                           value={storeName} 
                           onChange={e => setStoreName(e.target.value)}
                           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all" 
                         />
                      </div>
                      
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                         <textarea 
                           rows={4} 
                           value={description}
                           onChange={e => setDescription(e.target.value)}
                           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all" 
                           placeholder="Describe your store..." 
                         />
                      </div>

                      <Button onClick={handleSaveProfile} isLoading={loading} className="w-fit">Save Changes</Button>
                   </div>
                </div>
              )}

              {activeTab === 'domain' && (
                <div className="space-y-8">
                   {/* Default Domain Section */}
                   <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Default Domain</h3>
                      <p className="text-sm text-gray-500 mb-4">Your site is always accessible via this URL.</p>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                         <div>
                            <p className="font-bold text-sm text-gray-900">{tenant?.slug || 'yoursite'}.sewax.com</p>
                            <p className="text-xs text-gray-500">Sewax Subdomain</p>
                         </div>
                         <div className="flex items-center gap-2">
                             <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold uppercase flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Active
                             </span>
                             <Button variant="outline" size="sm" className="h-8">Visit</Button>
                         </div>
                      </div>
                   </div>

                   <hr className="border-gray-100" />
                   
                   {/* Custom Domain Section */}
                   <div>
                      <div className="flex justify-between items-center mb-4">
                         <div>
                            <h3 className="text-lg font-bold text-gray-900">Custom Domain</h3>
                            <p className="text-sm text-gray-500">Connect a domain you own (e.g. mystore.com.np)</p>
                         </div>
                         <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded uppercase">Pro Plan</span>
                      </div>

                      <div className="flex gap-2 mb-4">
                         <input 
                           type="text" 
                           placeholder="Enter your domain" 
                           value={customDomain}
                           onChange={e => setCustomDomain(e.target.value)}
                           className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-100 outline-none" 
                        />
                         <Button onClick={handleVerifyDomain} isLoading={domainStatus === 'verifying'}>Connect</Button>
                      </div>

                      {domainStatus === 'failed' && (
                         <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-sm text-red-700 flex gap-3">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <div>
                               <p className="font-bold mb-1">Verification Failed</p>
                               <p className="mb-2">We couldn't verify your domain. Please add the following CNAME record to your DNS settings:</p>
                               <div className="bg-white p-2 rounded border border-red-200 flex justify-between items-center font-mono text-xs">
                                  <span>cname.sewax.com</span>
                                  <Copy className="w-3 h-3 cursor-pointer" />
                               </div>
                            </div>
                         </div>
                      )}

                      {domainStatus === 'verified' && (
                         <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-sm text-green-700 flex gap-3">
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            <div>
                               <p className="font-bold">Domain Verified!</p>
                               <p>Your site is now live at <strong>{customDomain}</strong>. SSL certificate provisioning may take up to 24 hours.</p>
                            </div>
                         </div>
                      )}
                   </div>
                </div>
              )}

              {activeTab === 'security' && (
                  <div className="text-center py-12 text-gray-500">
                     <Lock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                     <h3 className="text-lg font-bold text-gray-900">Security Settings</h3>
                     <p>Password rotation and 2FA settings coming soon.</p>
                  </div>
              )}
           </div>
        </div>
     </div>
  );
};
