import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Monitor, Smartphone, Tablet, Save, Eye, Loader2, Type, Image as ImageIcon, Box, Plus, Settings, Palette, FileText, ChevronRight, GripVertical, Trash2, Layout } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';

export const WebsiteBuilder: React.FC = () => {
  const { tenant } = useAuth();
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'pages' | 'elements' | 'theme' | 'settings'>('pages');
  const [pages, setPages] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Theme State Mock
  const [themeSettings, setThemeSettings] = useState({
      primaryColor: '#C8102E',
      fontFamily: 'Inter',
      borderRadius: '8px'
  });

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
    // In a real editor, we'd serialize the canvas content here
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

  const handleAddPage = async () => {
      const title = prompt("New Page Title:");
      if(!title) return;
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const { data, error } = await supabase.from('pages').insert({
          tenant_id: tenant.id,
          title,
          slug,
          is_published: false,
          content: { type: 'empty' }
      }).select().single();
      
      if(data) {
          setPages([...pages, data]);
          setSelectedPage(data);
      }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-100 overflow-hidden">
       {/* Top Bar */}
       <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm z-20">
          <div className="flex items-center gap-4">
             <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">{tenant?.name}</span>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                   <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Editor</span>
                   <span>•</span>
                   <span>{selectedPage?.title || 'No Page Selected'}</span>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
             <button 
                onClick={() => setDevice('desktop')}
                className={`p-1.5 rounded-md transition-all ${device === 'desktop' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                title="Desktop View"
             >
                <Monitor className="w-4 h-4" />
             </button>
             <button 
                onClick={() => setDevice('tablet')}
                className={`p-1.5 rounded-md transition-all ${device === 'tablet' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                title="Tablet View"
             >
                <Tablet className="w-4 h-4" />
             </button>
             <button 
                onClick={() => setDevice('mobile')}
                className={`p-1.5 rounded-md transition-all ${device === 'mobile' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                title="Mobile View"
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

       {/* Workspace */}
       <div className="flex-1 flex overflow-hidden">
          
          {/* Left Sidebar (Tabs + Content) */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col z-10 shadow-xl">
             {/* Tabs */}
             <div className="flex border-b border-gray-200">
                <button 
                    onClick={() => setActiveTab('pages')} 
                    className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors ${activeTab === 'pages' ? 'border-primary-500 text-primary-600 bg-primary-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
                >
                    Pages
                </button>
                <button 
                    onClick={() => setActiveTab('elements')} 
                    className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors ${activeTab === 'elements' ? 'border-primary-500 text-primary-600 bg-primary-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
                >
                    Add
                </button>
                <button 
                    onClick={() => setActiveTab('theme')} 
                    className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors ${activeTab === 'theme' ? 'border-primary-500 text-primary-600 bg-primary-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
                >
                    Theme
                </button>
             </div>

             {/* Sidebar Content */}
             <div className="flex-1 overflow-y-auto p-4">
                
                {/* 1. Pages Tab */}
                {activeTab === 'pages' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xs font-bold text-gray-500 uppercase">Site Structure</h3>
                            <button onClick={handleAddPage} className="text-primary-600 hover:text-primary-700 text-xs font-bold flex items-center gap-1"><Plus className="w-3 h-3"/> New</button>
                        </div>
                        <div className="space-y-2">
                            {pages.map(page => (
                                <div 
                                    key={page.id} 
                                    onClick={() => setSelectedPage(page)}
                                    className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between group transition-all ${selectedPage?.id === page.id ? 'bg-primary-50 border-primary-200 ring-1 ring-primary-200' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className={`w-4 h-4 ${selectedPage?.id === page.id ? 'text-primary-600' : 'text-gray-400'}`} />
                                        <div>
                                            <p className={`text-sm font-medium ${selectedPage?.id === page.id ? 'text-primary-900' : 'text-gray-700'}`}>{page.title}</p>
                                            <p className="text-[10px] text-gray-400">/{page.slug}</p>
                                        </div>
                                    </div>
                                    {selectedPage?.id === page.id && <ChevronRight className="w-4 h-4 text-primary-400" />}
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Page Settings</h3>
                            {selectedPage ? (
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">SEO Title</label>
                                        <input className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs" defaultValue={selectedPage.title} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Slug</label>
                                        <input className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs bg-gray-50" defaultValue={selectedPage.slug} disabled />
                                    </div>
                                    <button className="text-red-500 text-xs hover:underline flex items-center gap-1 mt-2">
                                        <Trash2 className="w-3 h-3" /> Delete Page
                                    </button>
                                </div>
                            ) : (
                                <p className="text-xs text-gray-400 italic">Select a page to edit settings.</p>
                            )}
                        </div>
                    </div>
                )}

                {/* 2. Elements Tab (Drag & Drop Mock) */}
                {activeTab === 'elements' && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Basic</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { icon: Type, label: 'Text' },
                                    { icon: ImageIcon, label: 'Image' },
                                    { icon: Box, label: 'Container' },
                                    { icon: Plus, label: 'Button' },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md cursor-grab active:cursor-grabbing transition-all">
                                        <item.icon className="w-5 h-5 text-gray-500 mb-1" />
                                        <span className="text-xs text-gray-600">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Sections</h3>
                            <div className="space-y-2">
                                {['Hero Banner', 'Feature Grid', 'Testimonials', 'Contact Form', 'Footer'].map((section, i) => (
                                    <div key={i} className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-white hover:border-primary-300 cursor-grab flex items-center gap-2">
                                        <GripVertical className="w-4 h-4 text-gray-400" />
                                        {section}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. Theme Tab */}
                {activeTab === 'theme' && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Colors</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Primary Color</label>
                                    <div className="flex gap-2 items-center">
                                        <input type="color" value={themeSettings.primaryColor} onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})} className="h-8 w-8 rounded cursor-pointer border border-gray-200 p-0" />
                                        <span className="text-xs text-gray-500 font-mono">{themeSettings.primaryColor}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Typography</h3>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Font Family</label>
                                <select 
                                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs bg-white"
                                    value={themeSettings.fontFamily}
                                    onChange={(e) => setThemeSettings({...themeSettings, fontFamily: e.target.value})}
                                >
                                    <option value="Inter">Inter (Sans-Serif)</option>
                                    <option value="Poppins">Poppins (Display)</option>
                                    <option value="Merriweather">Merriweather (Serif)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
             </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-gray-100 overflow-auto flex items-center justify-center p-8 relative">
             <div 
               className={`bg-white shadow-2xl transition-all duration-300 overflow-y-auto border border-gray-300 ${
                  device === 'desktop' ? 'w-full max-w-[1200px] h-full rounded-md' : 
                  device === 'tablet' ? 'w-[768px] h-[1024px] rounded-lg border-4 border-gray-800' : 
                  'w-[375px] h-[667px] rounded-2xl border-4 border-gray-800'
               }`}
             >
                {/* Visual Representation (Mock) */}
                <div className="w-full h-full relative group">
                   {selectedPage ? (
                     <div className="p-8">
                        {/* Mock Content based on template context */}
                        <div className="text-center py-20 border-b border-gray-100 hover:ring-2 ring-primary-500 ring-inset cursor-pointer relative group/section">
                            <h1 className="text-5xl font-extrabold text-gray-900 mb-6" style={{ color: themeSettings.primaryColor, fontFamily: themeSettings.fontFamily }}>
                                {tenant?.name || 'Your Brand'}
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                                Welcome to our new website. We are currently building something amazing for you.
                            </p>
                            <button className="text-white px-8 py-3 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: themeSettings.primaryColor }}>
                                Get Started
                            </button>
                            
                            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/section:opacity-100 pointer-events-none">
                                Hero Section
                            </div>
                        </div>

                        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1,2,3].map(i => (
                                <div key={i} className="bg-gray-50 rounded-xl p-6 hover:ring-2 ring-primary-500 ring-inset cursor-pointer">
                                    <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                                    <h3 className="font-bold text-lg mb-2">Feature {i}</h3>
                                    <p className="text-gray-500 text-sm">Description of this amazing feature goes here.</p>
                                </div>
                            ))}
                        </div>
                     </div>
                   ) : (
                     <div className="flex flex-col items-center justify-center h-full text-gray-400">
                         <Layout className="w-12 h-12 mb-4 opacity-50" />
                         <p>Select a page from the sidebar to start editing.</p>
                     </div>
                   )}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};