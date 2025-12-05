
import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Search, Filter, Clock, AlertCircle, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';

export const SupportTickets: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
     const { data } = await supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });
     if (data) setTickets(data);
     setLoading(false);
  };

  useEffect(() => {
     fetchTickets();
  }, []);

  const updateStatus = async (id: string, status: string) => {
     await supabase.from('support_tickets').update({ status }).eq('id', id);
     fetchTickets();
  };

  if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Tickets...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold text-white">Support Inbox</h1>
            <p className="text-neutral-400">Real-time support requests.</p>
         </div>
      </div>

      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden flex flex-col h-[600px]">
         <div className="flex-1 overflow-y-auto">
             <table className="w-full text-sm text-left">
                <thead className="bg-neutral-900 text-neutral-500 font-medium border-b border-neutral-700 sticky top-0 z-10">
                   <tr>
                      <th className="px-6 py-3 w-20">ID</th>
                      <th className="px-6 py-3">Subject</th>
                      <th className="px-6 py-3">Priority</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700 text-neutral-300">
                   {tickets.map(ticket => (
                      <tr key={ticket.id} className="hover:bg-neutral-700/30 transition-colors">
                         <td className="px-6 py-4 font-mono text-xs text-neutral-500">{ticket.id.slice(0,6)}</td>
                         <td className="px-6 py-4">
                            <p className="font-bold text-white mb-0.5">{ticket.subject}</p>
                            <p className="text-xs text-neutral-500 truncate max-w-xs">{ticket.description}</p>
                         </td>
                         <td className="px-6 py-4">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                               ticket.priority === 'High' ? 'bg-red-900/30 text-red-400' : 'bg-neutral-700 text-neutral-300'
                            }`}>{ticket.priority}</span>
                         </td>
                         <td className="px-6 py-4">
                            <span className={`text-xs ${
                               ticket.status === 'Resolved' ? 'text-green-400' : 'text-yellow-400'
                            }`}>{ticket.status}</span>
                         </td>
                         <td className="px-6 py-4 text-right flex justify-end gap-2">
                            {ticket.status !== 'Resolved' && (
                               <button 
                                  onClick={() => updateStatus(ticket.id, 'Resolved')}
                                  className="text-green-500 hover:bg-neutral-700 p-1 rounded" 
                                  title="Mark Resolved"
                               >
                                  <CheckCircle className="w-4 h-4"/>
                               </button>
                            )}
                             <button 
                                onClick={() => updateStatus(ticket.id, 'Closed')}
                                className="text-neutral-500 hover:text-red-400 hover:bg-neutral-700 p-1 rounded" 
                                title="Close"
                             >
                                <XCircle className="w-4 h-4"/>
                             </button>
                         </td>
                      </tr>
                   ))}
                   {tickets.length === 0 && (
                      <tr>
                         <td colSpan={5} className="p-8 text-center text-neutral-500">No tickets found.</td>
                      </tr>
                   )}
                </tbody>
             </table>
         </div>
      </div>
    </div>
  );
};
