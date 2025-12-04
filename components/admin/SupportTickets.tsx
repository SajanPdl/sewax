
import React from 'react';
import { Button } from '../Button';
import { Search, Filter, MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const SupportTickets: React.FC = () => {
  const tickets = [
    { id: '#4092', subject: 'Domain verification failed', user: 'Ramesh G.', priority: 'High', status: 'Open', agent: 'Unassigned', time: '10m ago' },
    { id: '#4091', subject: 'How to change theme colors?', user: 'Sita M.', priority: 'Low', status: 'Open', agent: 'Priya (Admin)', time: '45m ago' },
    { id: '#4090', subject: 'Billing invoice incorrect', user: 'Hari B.', priority: 'Medium', status: 'Escalated', agent: 'Finance Team', time: '2h ago' },
    { id: '#4089', subject: 'Feature request: Dark mode', user: 'John D.', priority: 'Low', status: 'Closed', agent: 'Sudeep (Owner)', time: '1d ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold text-white">Support Inbox</h1>
            <p className="text-neutral-400">Manage customer tickets and help requests.</p>
         </div>
         <div className="flex gap-2">
            <span className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-400 border border-neutral-700">Open: <span className="text-white font-bold">12</span></span>
            <span className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-400 border border-neutral-700">Avg Response: <span className="text-green-400 font-bold">1h 20m</span></span>
         </div>
      </div>

      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden flex flex-col h-[600px]">
         {/* Toolbar */}
         <div className="p-4 border-b border-neutral-700 flex gap-4">
             <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
                 <input 
                   type="text" 
                   placeholder="Search tickets..." 
                   className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary-500"
                 />
             </div>
             <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-700">
                <Filter className="w-4 h-4 mr-2" /> Filter
             </Button>
         </div>

         {/* Ticket List */}
         <div className="flex-1 overflow-y-auto">
             <table className="w-full text-sm text-left">
                <thead className="bg-neutral-900 text-neutral-500 font-medium border-b border-neutral-700 sticky top-0 z-10">
                   <tr>
                      <th className="px-6 py-3 w-20">ID</th>
                      <th className="px-6 py-3">Subject & User</th>
                      <th className="px-6 py-3">Priority</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Assignee</th>
                      <th className="px-6 py-3 text-right">Created</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700 text-neutral-300">
                   {tickets.map(ticket => (
                      <tr key={ticket.id} className="hover:bg-neutral-700/30 cursor-pointer transition-colors">
                         <td className="px-6 py-4 font-mono text-xs text-neutral-500">{ticket.id}</td>
                         <td className="px-6 py-4">
                            <p className="font-bold text-white mb-0.5">{ticket.subject}</p>
                            <p className="text-xs text-neutral-500">{ticket.user}</p>
                         </td>
                         <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold ${
                               ticket.priority === 'High' ? 'text-red-400 bg-red-900/20' : 
                               ticket.priority === 'Medium' ? 'text-yellow-400 bg-yellow-900/20' : 
                               'text-blue-400 bg-blue-900/20'
                            }`}>
                               {ticket.priority === 'High' && <AlertCircle className="w-3 h-3" />}
                               {ticket.priority}
                            </span>
                         </td>
                         <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${
                               ticket.status === 'Open' ? 'text-green-400 border-green-900/30 bg-green-900/10' :
                               ticket.status === 'Closed' ? 'text-neutral-500 border-neutral-700 bg-neutral-800' :
                               'text-orange-400 border-orange-900/30 bg-orange-900/10'
                            }`}>
                               {ticket.status === 'Open' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                               {ticket.status}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-xs text-neutral-400">{ticket.agent}</td>
                         <td className="px-6 py-4 text-right text-neutral-500 text-xs">{ticket.time}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
         </div>
      </div>
    </div>
  );
};
