import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Search, Upload, FileCode, CheckCircle, MoreVertical, Eye, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';

export const TemplateManager: React.FC = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTemplates = async () => {
     const { data } = await supabase.from('gallery_templates').select('*').order('created_at', { ascending: false });
     if (data) setTemplates(data);
     setLoading(false);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleUpload = async () => {
    setIsUploading(true);
    // Insert a dummy template for demo purposes
    await supabase.from('gallery_templates').insert({
       name: `New Theme ${Math.floor(Math.random() * 1000)}`,
       category: 'General',
       image_url: 'https://picsum.photos/600/400',
       description: 'A newly uploaded theme.',
       config: {}
    });
    await fetchTemplates();
    setIsUploading(false);
  };

  const handleDelete = async (id: string) => {
     if(confirm('Are you sure?')) {
        await supabase.from('gallery_templates').delete().eq('id', id);
        fetchTemplates();
     }
  }

  if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Templates...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold text-white">Theme Marketplace</h1>
            <p className="text-neutral-400">Manage public themes and templates.</p>
         </div>
         <Button onClick={handleUpload} isLoading={isUploading} className="bg-primary-600 hover:bg-primary-700 text-white border-0 flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload New Theme
         </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {templates.map((template) => (
            <div key={template.id} className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden group hover:border-neutral-600 transition-all">
               <div className="h-48 relative bg-neutral-900 overflow-hidden">
                  <img src={template.image_url} alt={template.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
               </div>
               <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="font-bold text-white text-lg">{template.name}</h3>
                  </div>
                  <p className="text-sm text-neutral-400 line-clamp-2 mb-4">{template.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                     <span className="px-2 py-1 rounded bg-neutral-700 text-neutral-300 text-xs font-medium">{template.category}</span>
                     {template.is_active && <span className="px-2 py-1 rounded bg-green-900/30 text-green-400 border border-green-900/50 text-xs font-medium flex items-center gap-1">Active</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-700">
                     <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-neutral-700 text-white text-sm hover:bg-neutral-600 transition-colors">
                        <Eye className="w-4 h-4" /> Preview
                     </button>
                     <button onClick={() => handleDelete(template.id)} className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-red-900/30 text-red-400 text-sm hover:bg-red-900/20 transition-colors">
                        <Trash2 className="w-4 h-4" /> Delete
                     </button>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};