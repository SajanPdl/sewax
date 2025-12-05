import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { Megaphone, Plus, Trash2, Loader2, Send } from 'lucide-react';
import { Button } from '../Button';

export const AdminAnnouncements: React.FC = () => {
   const [announcements, setAnnouncements] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [isCreating, setIsCreating] = useState(false);
   const [form, setForm] = useState({ title: '', message: '', type: 'info', target: 'all' });

   const fetchAnnouncements = async () => {
      const { data } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
      if(data) setAnnouncements(data);
      setLoading(false);
   };

   useEffect(() => {
      fetchAnnouncements();
   }, []);

   const handleCreate = async (e: React.FormEvent) => {
      e.preventDefault();
      await supabase.from('announcements').insert({
         title: form.title,
         message: form.message,
         type: form.type,
         target_audience: form.target
      });
      setIsCreating(false);
      setForm({ title: '', message: '', type: 'info', target: 'all' });
      fetchAnnouncements();
   };

   const handleDelete = async (id: string) => {
      if(confirm('Delete announcement?')) {
         await supabase.from('announcements').delete().eq('id', id);
         fetchAnnouncements();
      }
   }

   if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Announcements...</div>;

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-2xl font-bold text-white">Announcements</h1>
               <p className="text-neutral-400">Broadcast messages to users.</p>
            </div>
            <Button onClick={() => setIsCreating(!isCreating)} className="bg-primary-600 hover:bg-primary-700 text-white border-0 flex items-center gap-2">
               <Plus className="w-4 h-4" /> New Announcement
            </Button>
         </div>

         {isCreating && (
            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 mb-6">
               <form onSubmit={handleCreate} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Title</label>
                        <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white text-sm" />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Type</label>
                        <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white text-sm">
                           <option value="info">Info</option>
                           <option value="warning">Warning</option>
                           <option value="success">Success</option>
                        </select>
                     </div>
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Message</label>
                     <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white text-sm" rows={3}></textarea>
                  </div>
                  <div className="flex justify-end gap-3">
                     <Button type="button" variant="outline" onClick={() => setIsCreating(false)} className="text-neutral-400 border-neutral-600">Cancel</Button>
                     <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white border-0 flex items-center gap-2">
                        <Send className="w-4 h-4" /> Broadcast
                     </Button>
                  </div>
               </form>
            </div>
         )}

         <div className="space-y-4">
            {announcements.map(ann => (
               <div key={ann.id} className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 flex justify-between items-start">
                  <div className="flex items-start gap-4">
                     <div className={`p-2 rounded-lg ${ann.type === 'warning' ? 'bg-yellow-900/20 text-yellow-400' : ann.type === 'success' ? 'bg-green-900/20 text-green-400' : 'bg-blue-900/20 text-blue-400'}`}>
                        <Megaphone className="w-5 h-5" />
                     </div>
                     <div>
                        <h3 className="font-bold text-white">{ann.title}</h3>
                        <p className="text-sm text-neutral-400">{ann.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                           <span className="text-xs text-neutral-600">{new Date(ann.created_at).toLocaleDateString()}</span>
                           <span className="text-xs bg-neutral-700 px-1.5 py-0.5 rounded text-neutral-300 capitalize">{ann.target_audience}</span>
                        </div>
                     </div>
                  </div>
                  <button onClick={() => handleDelete(ann.id)} className="text-neutral-500 hover:text-red-400">
                     <Trash2 className="w-4 h-4" />
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
};