
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Monitor, Smartphone, Tablet, Save, Eye, Loader2, Type, Image as ImageIcon, Box, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';

export const WebsiteBuilder: React.FC = () => {
  const { tenant } = useAuth();
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [pages, setPages] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch Tenant Pages
  useEffect(() => {
    if (!tenant) return;
    const fetchPages = async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('created_at');
      
      if (data) {
        setPages(data);
        if (data.length > 0) setSelectedPage(data[0]);
      }
      setLoading(false);
    };
    fetchPages();
  }, [tenant]);

  const handleSave = async () => {
    if (!selectedPage) return;
    setSaving(true);
    const { error } = await supabase
      .from('pages')
      .update({ content: selectedPage.content, updated_at: new Date() })
      .eq('id', selectedPage.id);
    
    if (!error) {
      alert('Page saved successfully!');
    } else {
      alert('Error saving page');
    }
    setSaving(false);
  };

  const handlePreview = () => {
      if(tenant?.slug) {
          window.open(`https://${tenant.slug}.sewax.com`, '_blank');
      } else {
          alert('Preview unavailable.');
      }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-100 overflow-hidden">
       {/* Editor Toolbar */}
       <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm z-20">
          <div className="flex items-center gap-4">
             <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">{tenant?.name}</span>
                <div className="flex items-center gap-2">
                   <select 
                     className="text-[10px] text-gray-500 bg-gray-50 border border-gray-200 rounded p-1"
                     value={selectedPage?.id || ''}
                     onChange={(e) => setSelectedPage(pages.find(p => p.id === e.target.value))}
                   >
                      {pages.map(page => (
                        <option key={page.id} value={page.id}>{page.title}</option>
                      ))}
                   </select>
                   <span className="text-[10px] text-gray-400">• Draft</span>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
             <button 
                onClick={() => setDevice('desktop')}
                className={`p-1.5 rounded-md transition-all ${device === 'desktop' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
             >
                <Monitor className="w-4 h-4" />
             </button>
             <button 
                onClick={() => setDevice('tablet')}
                className={`p-1.5 rounded-md transition-all ${device === 'tablet' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
             >
                <Tablet className="w-4 h-4" />
             </button>
             <button 
                onClick={() => setDevice('mobile')}
                className={`p-1.5 rounded-md transition-all ${device === 'mobile' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
             >
                <Smartphone className="w-4 h-4" />
             </button>
          </div>

          <div className="flex items-center gap-3">
             <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1" onClick={handlePreview}>
                <Eye className="w-4 h-4" /> Preview
             </Button>
             <Button size="sm" className="flex items-center gap-1" onClick={handleSave} isLoading={saving}>
                <Save className="w-4 h-4" /> Publish
             </Button>
          </div>
       </div>

       {/* Editor Workspace */}
       <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Elements */}
          <div className="w-16 md:w-64 bg-white border-r border-gray-200 flex flex-col z-10">
             <div className="p-4 border-b border-gray-100 hidden md:block">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Elements</h3>
             </div>
             
             <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {[
                   { icon: Type, label: 'Text Block' },
                   { icon: ImageIcon, label: 'Image' },
                   { icon: Box, label: 'Container' },
                   { icon: Plus, label: 'Button' },
                ].map((item, i) => (
                   <div key={i} className="flex flex-col md:flex-row items-center md:gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-grab active:cursor-grabbing border border-transparent hover:border-gray-200 transition-all text-center md:text-left group">
                      <item.icon className="w-6 h-6 text-gray-400 group-hover:text-primary-500" />
                      <span className="text-[10px] md:text-sm font-medium text-gray-600 group-hover:text-gray-900">{item.label}</span>
                   </div>
                ))}
             </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-gray-100 overflow-auto flex items-center justify-center p-8 relative">
             <div 
               className={`bg-white shadow-2xl transition-all duration-300 overflow-y-auto ${
                  device === 'desktop' ? 'w-full max-w-[1200px] h-full' : 
                  device === 'tablet' ? 'w-[768px] h-[1024px]' : 
                  'w-[375px] h-[667px]'
               }`}
             >
                {/* Visual Representation (Mock) - In a real app, this renders JSON from `selectedPage.content` */}
                <div className="w-full h-full relative group p-8">
                   {selectedPage ? (
                     <>
                        <h1 className="text-4xl font-bold mb-4">{selectedPage.title}</h1>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-400">
                           <p>Drag elements here to build your <strong>{selectedPage.title}</strong> page.</p>
                           <p className="text-xs mt-2">Content loaded from Supabase: {JSON.stringify(selectedPage.content)}</p>
                        </div>
                     </>
                   ) : (
                     <div className="flex items-center justify-center h-full text-gray-400">Select a page to edit</div>
                   )}
                </div>
             </div>
          </div>

          {/* Right Sidebar - Properties */}
          <div className="w-64 bg-white border-l border-gray-200 hidden xl:flex flex-col z-10">
             <div className="p-4 border-b border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Properties</h3>
             </div>
             <div className="p-4 space-y-6">
                <p className="text-sm text-gray-500">Select an element on the canvas to edit properties.</p>
             </div>
          </div>
       </div>
    </div>
  );
};