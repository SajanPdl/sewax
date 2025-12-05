
import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { supabase } from '../../lib/supabase/client';
import { Loader2 } from 'lucide-react';

export const TemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data } = await supabase
        .from('templates')
        .select('*')
        .eq('status', 'published');
      
      if (data) setTemplates(data);
      setLoading(false);
    };
    fetchTemplates();
  }, []);

  const handlePreview = (template: any) => {
      if (template.preview_url) {
          window.open(template.preview_url, '_blank');
      } else {
          alert('Preview unavailable for this template.');
      }
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-neutral-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">Templates Gallery</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Professionally designed templates for every industry.</p>
        </div>
        
        {loading ? (
           <div className="flex justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
           </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div key={template.id} className="group bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-neutral-700">
                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-neutral-900">
                  <img 
                    src={template.image_url || 'https://via.placeholder.com/400x300?text=No+Preview'} 
                    alt={template.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 block">
                    {template.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{template.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{template.description}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => handlePreview(template)}>Preview</Button>
                    <Button className="flex-1">Start with this</Button>
                  </div>
                </div>
              </div>
            ))}
            {templates.length === 0 && (
               <div className="col-span-full text-center text-gray-500 py-12">No templates available at the moment.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};