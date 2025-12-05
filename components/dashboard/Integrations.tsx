
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Check, Plus, Loader2 } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase/client';

export const Integrations: React.FC = () => {
  const { tenant } = useAuth();
  const [loading, setLoading] = useState(true);
  const [integrations, setIntegrations] = useState([
    {
      id: 'esewa',
      name: 'eSewa Payment',
      category: 'Payments',
      description: 'Accept payments directly to your eSewa wallet. Supports QR codes and verified merchants.',
      icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/0d/15/8e/0d158e8e-d910-6320-c75c-19601340156d/AppIcon-0-0-1x_U007emarketing-0-0-0-6-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
      connected: false
    },
    {
      id: 'khalti',
      name: 'Khalti Digital Wallet',
      category: 'Payments',
      description: 'Enable Khalti payments for your customers. Simple API key integration.',
      icon: 'https://yt3.googleusercontent.com/ytc/AIdro_k6_3r_sI-6A0j7k0_666_777_888=s900-c-k-c0x00ffffff-no-rj',
      connected: false
    },
    {
      id: 'ga4',
      name: 'Google Analytics 4',
      category: 'Analytics',
      description: 'Track visitors and conversion events with the latest GA4 tag.',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Analytics_logo.svg/1200px-Google_Analytics_logo.svg.png',
      connected: false
    },
    {
      id: 'pixel',
      name: 'Facebook Pixel',
      category: 'Marketing',
      description: 'Retarget visitors on Facebook and Instagram with automated pixel events.',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png',
      connected: false
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Chat',
      category: 'Support',
      description: 'Add a floating WhatsApp button for direct customer support.',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png',
      connected: false
    }
  ]);

  useEffect(() => {
    if(!tenant) return;
    // Load connected integrations from settings
    const settings = tenant.settings as any || {};
    const connectedIds = settings.connected_integrations || [];
    
    setIntegrations(prev => prev.map(i => ({
        ...i,
        connected: connectedIds.includes(i.id)
    })));
    setLoading(false);
  }, [tenant]);

  const toggleIntegration = async (id: string, currentState: boolean) => {
    if(!tenant) return;
    
    // Optimistic update
    setIntegrations(prev => prev.map(app => 
      app.id === id ? { ...app, connected: !currentState } : app
    ));

    const settings = tenant.settings as any || {};
    let currentList = settings.connected_integrations || [];
    
    if (currentState) {
        // Disconnect
        currentList = currentList.filter((i: string) => i !== id);
    } else {
        // Connect
        currentList.push(id);
    }

    const { error } = await supabase.from('tenants').update({
        settings: { ...settings, connected_integrations: currentList }
    }).eq('id', tenant.id);

    if (error) {
        alert('Failed to update integration settings');
        // Revert
        setIntegrations(prev => prev.map(app => 
            app.id === id ? { ...app, connected: currentState } : app
        ));
    }
  };

  if (loading) return <div className="p-8"><Loader2 className="w-8 h-8 animate-spin text-primary-500"/></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
       <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-500">Supercharge your site with local and global tools.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((app) => (
             <div key={app.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                   <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center">
                      <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
                   </div>
                   {app.connected ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full">
                         <Check className="w-3 h-3" /> Installed
                      </span>
                   ) : (
                      <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                         {app.category}
                      </span>
                   )}
                </div>
                
                <h3 className="font-bold text-gray-900 mb-2">{app.name}</h3>
                <p className="text-sm text-gray-500 mb-6 flex-1">{app.description}</p>
                
                <Button 
                   variant={app.connected ? 'outline' : 'primary'} 
                   className="w-full"
                   onClick={() => toggleIntegration(app.id, app.connected)}
                >
                   {app.connected ? 'Configure' : 'Connect'}
                </Button>
             </div>
          ))}
          
          <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                <Plus className="w-6 h-6 text-gray-400" />
             </div>
             <h3 className="font-bold text-gray-900 text-sm">Missing a tool?</h3>
             <p className="text-xs text-gray-500 mt-1 mb-4">Let us know what you need.</p>
             <Button variant="outline" size="sm" className="text-xs">Request Integration</Button>
          </div>
       </div>
    </div>
  );
};
