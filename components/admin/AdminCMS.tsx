
import React, { useEffect, useState } from 'react';
import { FileText, Edit, Save, Loader2, X } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { Button } from '../Button';

export const AdminCMS: React.FC = () => {
   const [pages, setPages] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [editingPage, setEditingPage] = useState<any | null>(null);
   const [editContent, setEditContent] = useState('');

   const fetchPages = async () => {
      const { data } = await supabase.from('cms_pages').select('*').order('title');
      if (data) setPages(data);
      setLoading(false);
   };

   useEffect(() => {
      fetchPages();
   }, []);

   const handleEdit = (page: any) => {
      setEditingPage(page);
      setEditContent(page.content);
   };

   const handleSave = async () => {
      if (!editingPage) return;
      await supabase.from('cms_pages').update({ 
         content: editContent,
         updated_at: new Date()
      }).eq('id', editingPage.id);
      
      setEditingPage(null);
      fetchPages();
   };

   if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading CMS...</div>;

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-2xl font-bold text-white">Global CMS</h1>
            <p className="text-neutral-400">Manage shared content blocks and legal pages.</p>
         </div>

         {editingPage ? (
            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white">Editing: {editingPage.title}</h3>
                  <button onClick={() => setEditingPage(null)} className="text-neutral-400 hover:text-white"><X className="w-5 h-5"/></button>
               </div>
               <div className="space-y-4">
                  <div>
                     <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Slug</label>
                     <input disabled value={editingPage.slug} className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-neutral-500 w-full" />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Content (Markdown)</label>
                     <textarea 
                        rows={15}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-4 text-white font-mono text-sm focus:border-primary-500 focus:outline-none"
                     />
                  </div>
                  <div className="flex justify-end gap-3">
                     <Button variant="outline" onClick={() => setEditingPage(null)} className="text-white border-neutral-600">Cancel</Button>
                     <Button onClick={handleSave} className="bg-primary-600 hover:bg-primary-700 text-white border-0 flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save Content
                     </Button>
                  </div>
               </div>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {pages.map((page, i) => (
                  <div 
                     key={i} 
                     onClick={() => handleEdit(page)}
                     className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 flex justify-between items-center group cursor-pointer hover:border-neutral-500 transition-colors"
                  >
                     <div className="flex items-center gap-3">
                        <div className="p-3 bg-neutral-900 rounded-lg">
                           <FileText className="w-5 h-5 text-neutral-400 group-hover:text-primary-400" />
                        </div>
                        <div>
                           <span className="text-white font-medium block">{page.title}</span>
                           <span className="text-xs text-neutral-500">/{page.slug}</span>
                        </div>
                     </div>
                     <Edit className="w-4 h-4 text-neutral-600 group-hover:text-white" />
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};
