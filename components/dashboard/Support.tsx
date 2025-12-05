import React, { useState } from 'react';
import { Button } from '../Button';
import { HelpCircle, Send } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';

export const Support: React.FC = () => {
  const { tenant, user } = useAuth();
  const [subject, setSubject] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Low');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if(!tenant) return;
     setSubmitting(true);
     await supabase.from('support_tickets').insert({
        tenant_id: tenant.id,
        user_id: user?.id,
        subject,
        description: desc,
        priority,
        status: 'Open'
     });
     setSubmitting(false);
     setSubject('');
     setDesc('');
     alert('Ticket created successfully!');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
       <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-500">How can we help you today?</p>
       </div>

       <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Issue Subject</label>
                <input required value={subject} onChange={e=>setSubject(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-100 outline-none" placeholder="e.g. Billing issue" />
             </div>
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Priority</label>
                <select value={priority} onChange={e=>setPriority(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-100 outline-none">
                   <option>Low</option>
                   <option>Medium</option>
                   <option>High</option>
                   <option>Critical</option>
                </select>
             </div>
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea required rows={5} value={desc} onChange={e=>setDesc(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-100 outline-none" placeholder="Describe your issue..." />
             </div>
             <Button className="w-full flex items-center justify-center gap-2" isLoading={submitting}>
                <Send className="w-4 h-4" /> Submit Ticket
             </Button>
          </form>
       </div>
    </div>
  );
};