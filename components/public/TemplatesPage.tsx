import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { supabase } from '../../lib/supabase/client';
import { Loader2, Search, Filter, Check, Rocket } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

export const TemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const { session, tenant } = useAuth();
  const navigate = useNavigate();

  const categories = ['All', 'E-commerce', 'Restaurant', 'Service', 'Agency', 'Travel', 'Education'];

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data } = await supabase
        .from('templates')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      
      if (data) {
          setTemplates(data);
          setFilteredTemplates(data);
      }
      setLoading(false);
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
      let filtered = templates;
      if (activeCategory !== 'All') {
          filtered = filtered.filter(t => t.category === activeCategory);
      }
      if (searchQuery) {
          filtered = filtered.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      setFilteredTemplates(filtered);
  }, [searchQuery, activeCategory, templates]);

  const handlePreview = (template: any) => {
      if (template.preview_url) {
          window.open(template.preview_url, '_blank');
      } else if (template.slug) {
          // Construct preview URL if explicit one is missing
          const url = `${window.location.origin}/#/preview/${template.slug}`;
          window.open(url, '_blank');
      } else {
          alert('Preview unavailable for this template.');
      }
  };

  const handleInstall = async (template: any) => {
      if (!session) {
          // Redirect to signup with template pre-selected
          navigate(`/login?templateId=${template.id}`);
          return;
      }

      if (!tenant) {
          alert("Please complete your account setup first.");
          navigate('/dashboard');
          return;
      }

      if(!confirm(`Install ${template.name} to your site? This will overwrite your current theme.`)) return;

      // Apply theme logic
      const currentSettings = tenant.settings as Record<string, any> || {};
      const newSettings = { 
          ...currentSettings, 
          active_theme_id: template.id, 
          theme_name: template.name,
          theme_slug: template.slug,
          theme_category: template.category 
      };
      
      const { error } = await supabase.from('tenants').update({
          settings: newSettings
      }).eq('id', tenant.id);
      
      if(error) {
          alert('Failed to install theme: ' + error.message);
      } else {
          alert('Theme installed successfully!');
          navigate('/dashboard/builder');
          window.location.reload();
      }
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-neutral-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">Find your perfect look</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose from our collection of professionally designed templates to get your business online in seconds.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Search templates..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 dark:text-white" 
                />
            </div>
            
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide pb-2 md:pb-0">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                            activeCategory === cat 
                                ? 'bg-primary-600 text-white' 
                                : 'bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
        
        {loading ? (
           <div className="flex justify-center p-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
           </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="group bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-neutral-700 flex flex-col">
                <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-neutral-900">
                  <img 
                    src={template.image_url || 'https://via.placeholder.com/600x400?text=No+Preview'} 
                    alt={template.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 dark:text-white shadow-sm uppercase tracking-wide">
                      {template.category}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{template.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-1">{template.description}</p>
                  
                  {/* Features List (Mocked for now based on category) */}
                  <div className="mb-6 flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded flex items-center gap-1"><Check className="w-3 h-3"/> Responsive</span>
                      {template.category === 'E-commerce' && <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded flex items-center gap-1"><Check className="w-3 h-3"/> Store</span>}
                      {template.category === 'Restaurant' && <span className="text-xs bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded flex items-center gap-1"><Check className="w-3 h-3"/> Menu</span>}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <Button variant="outline" className="flex-1 border-gray-300 dark:border-neutral-600" onClick={() => handlePreview(template)}>Preview</Button>
                    <Button className="flex-1 flex items-center justify-center gap-2" onClick={() => handleInstall(template)}>
                        <Rocket className="w-4 h-4" /> Install
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredTemplates.length === 0 && (
               <div className="col-span-full text-center text-gray-500 py-20 bg-white dark:bg-neutral-800 rounded-xl border border-dashed border-gray-200 dark:border-neutral-700">
                   <Filter className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                   <h3 className="text-lg font-medium">No templates match your filters</h3>
                   <p>Try adjusting your search or category selection.</p>
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};