
import React, { useState } from 'react';
import { Button } from '../Button';
import { Mail, Send, Plus, Calendar, BarChart, Sparkles, Loader2, X } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const Marketing: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [form, setForm] = useState({
      name: '',
      subject: '',
      topic: '',
      content: ''
  });

  const handleGenerate = async () => {
      if(!form.topic) return alert('Please enter a topic first');
      setIsGenerating(true);
      try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: `Write an email marketing campaign for a store.
              Topic: ${form.topic}.
              Return JSON with "subject" and "body" keys. Keep it professional and engaging.`
          });
          
          let text = response.text || "{}";
          // Basic cleanup if md block returned
          text = text.replace(/```json|```/g, '');
          const data = JSON.parse(text);
          
          setForm(prev => ({ ...prev, subject: data.subject, content: data.body }));
      } catch (e) {
          console.error(e);
          alert('Failed to generate content');
      } finally {
          setIsGenerating(false);
      }
  };

  const handleCreate = (e: React.FormEvent) => {
     e.preventDefault();
     const newCampaign = {
        id: Date.now(),
        name: form.name,
        status: 'Draft',
        sent: 0,
        opened: 0,
        date: new Date().toLocaleDateString()
     };
     setCampaigns([newCampaign, ...campaigns]);
     setIsModalOpen(false);
     setForm({ name: '', subject: '', topic: '', content: '' });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
       <div className="mb-8 flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-display font-bold text-gray-900">Marketing</h1>
             <p className="text-gray-500">Email campaigns and automations.</p>
          </div>
          <Button className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
             <Plus className="w-4 h-4" /> Create Campaign
          </Button>
       </div>

       {campaigns.length > 0 ? (
          <div className="grid gap-4">
             {campaigns.map(camp => (
                <div key={camp.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                         <Mail className="w-6 h-6" />
                      </div>
                      <div>
                         <h3 className="font-bold text-gray-900">{camp.name}</h3>
                         <div className="flex gap-4 text-xs text-gray-500 mt-1">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {camp.date}</span>
                            <span className="flex items-center gap-1"><BarChart className="w-3 h-3"/> 0% Open Rate</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded">
                         {camp.status}
                      </span>
                      <Button variant="outline" size="sm">Edit</Button>
                   </div>
                </div>
             ))}
          </div>
       ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
             <div className="p-12 text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-500">
                   <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No campaigns yet</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">Start engaging your customers with email newsletters or SMS promotions.</p>
                <Button variant="outline" onClick={() => setIsModalOpen(true)}>Browse Templates</Button>
             </div>
          </div>
       )}

       {isModalOpen && (
           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
               <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
                   <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                       <h3 className="font-bold text-gray-900 flex items-center gap-2"><Sparkles className="w-4 h-4 text-purple-500" /> AI Campaign Wizard</h3>
                       <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                           <X className="w-5 h-5" />
                       </button>
                   </div>
                   <form onSubmit={handleCreate} className="p-6 space-y-4">
                       <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1">Campaign Name</label>
                           <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-100 outline-none" placeholder="Summer Sale Blast" />
                       </div>
                       
                       <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 space-y-3">
                           <div>
                               <label className="block text-xs font-bold text-purple-700 uppercase mb-1">What is this email about?</label>
                               <div className="flex gap-2">
                                   <input value={form.topic} onChange={e => setForm({...form, topic: e.target.value})} className="flex-1 border border-purple-200 rounded-lg px-3 py-2 text-sm focus:outline-none" placeholder="e.g. 50% off dashain sale on hiking gear" />
                                   <button type="button" onClick={handleGenerate} disabled={isGenerating} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2">
                                       {isGenerating ? <Loader2 className="w-4 h-4 animate-spin"/> : <Sparkles className="w-4 h-4"/>}
                                       Generate
                                   </button>
                               </div>
                           </div>
                       </div>

                       <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1">Subject Line</label>
                           <input required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-100 outline-none" placeholder="Subject..." />
                       </div>
                       
                       <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1">Email Body</label>
                           <textarea required rows={6} value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-100 outline-none" placeholder="Hi there..." />
                       </div>

                       <div className="flex gap-3 pt-4">
                           <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                           <Button type="submit" className="flex-1">Save Draft</Button>
                       </div>
                   </form>
               </div>
           </div>
       )}
    </div>
  );
};
