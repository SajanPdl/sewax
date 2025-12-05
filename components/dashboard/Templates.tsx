
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Search, Layout, Loader2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';

export const Templates: React.FC = () => {
  const { tenant } = useAuth();
  const [filter, setFilter] = useState('All');
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const MotionDiv = motion.div as any;
  
  const categories = ['All', 'Travel', 'Restaurant', 'E-commerce', 'SaaS', 'Business', 'General'];

  useEffect(() => {
    const fetchTemplates = async () => {
      // Changed from gallery_templates to templates
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('status', 'published');
      
      if (data) setTemplates(data);
      setLoading(false);
    };
    fetchTemplates();
  }, []);

  const handleSelectTemplate = async (template: any) => {
    if(!tenant) return;
    if(!confirm(`Apply ${template.name} to your site? This will update your theme settings.`)) return;
    
    setApplyingId(template.id);
    
    // Update tenant settings with active theme AND Category
    const currentSettings = tenant.settings as Record<string, any> || {};
    const newSettings = { 
        ...currentSettings, 
        active_theme_id: template.id, 
        theme_name: template.name,
        theme_slug: template.slug,
        theme_category: template.category // IMPORTANT: This drives the sidebar
    };
    
    const { error } = await supabase.from('tenants').update({
        settings: newSettings
    }).eq('id', tenant.id);
    
    if(error) {
        alert('Failed to apply template: ' + error.message);
    } else {
        alert('Template applied successfully! Your dashboard will now update.');
        window.location.reload(); // Reload to refresh sidebar config
    }
    setApplyingId(null);
  }

  const handlePreview = (template: any) => {
      // Prioritize explicit URL, then fallback to local preview route
      if (template.preview_url) {
          window.open(template.preview_url, '_blank');
      } else if (template.slug) {
          const url = `${window.location.origin}/#/preview/${template.slug}`;
          window.open(url, '_blank');
      } else {
          alert('Preview unavailable for this template.');
      }
  };

  const filteredTemplates = filter === 'All' 
    ? templates 
    : templates.filter(t => t.category === filter);

  if (loading) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>;
  }

  // Helper to check if current template is active
  const activeThemeId = (tenant?.settings as any)?.active_theme_id;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-2xl font-display font-bold text-gray-900">Template Library</h1>
           <p className="text-gray-500">Choose a starting point for your next project.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-4 gap-2 mb-6 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === cat 
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const isActive = activeThemeId === template.id;
          return (
            <MotionDiv 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={template.id} 
                className={`group bg-white rounded-xl overflow-hidden shadow-sm border transition-all duration-300 ${isActive ? 'border-green-500 ring-2 ring-green-500/20' : 'border-gray-200 hover:shadow-xl hover:border-primary-100'}`}
            >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                    src={template.image_url || 'https://via.placeholder.com/400x300?text=No+Preview'} 
                    alt={template.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-gray-800 shadow-sm">
                    {template.category}
                    </span>
                </div>
                {isActive && (
                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center backdrop-blur-sm">
                        <span className="bg-white text-green-700 px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                            <Check className="w-4 h-4" /> Active Theme
                        </span>
                    </div>
                )}
                </div>
                <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{template.description}</p>
                
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handlePreview(template)}>Preview</Button>
                    {isActive ? (
                         <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 border-green-600" disabled>Active</Button>
                    ) : (
                        <Button 
                            size="sm" 
                            className="flex-1" 
                            onClick={() => handleSelectTemplate(template)}
                            isLoading={applyingId === template.id}
                        >
                            Select
                        </Button>
                    )}
                </div>
                </div>
            </MotionDiv>
          );
        })}
        
        {filteredTemplates.length === 0 && (
           <div className="col-span-full border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 text-center bg-gray-50/50">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Layout className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-900">No templates found</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-xs">We add new Nepali-focused templates every week.</p>
           </div>
        )}
      </div>
    </div>
  );
};