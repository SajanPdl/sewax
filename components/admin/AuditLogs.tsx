
import React from 'react';
import { Search, Download, Clock, User, Terminal, Database } from 'lucide-react';
import { Button } from '../Button';

export const AuditLogs: React.FC = () => {
  const logs = [
    { id: 'LOG-99321', actor: 'Sudeep K. (Owner)', action: 'DELETE_TENANT', resource: 'tenant:spam-co', ip: '192.168.1.55', time: '2023-10-25 14:30:22' },
    { id: 'LOG-99320', actor: 'System Worker', action: 'BILLING_RETRY', resource: 'sub:sub_883', ip: '10.0.0.4', time: '2023-10-25 14:28:10' },
    { id: 'LOG-99319', actor: 'Priya S. (Admin)', action: 'UPDATE_ROLE', resource: 'user:u_992', ip: '202.45.1.2', time: '2023-10-25 12:15:00' },
    { id: 'LOG-99318', actor: 'Ramesh G.', action: 'LOGIN_FAILED', resource: 'auth:login', ip: '45.22.11.9', time: '2023-10-25 10:05:45' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold text-white">System Audit Logs</h1>
            <p className="text-neutral-400">Immutable record of all administrative actions.</p>
         </div>
         <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800">
            <Download className="w-4 h-4 mr-2" /> Export Logs
         </Button>
      </div>

      <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4 flex gap-4">
         <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
             <input 
               type="text" 
               placeholder="Search by Actor, Action, or IP..." 
               className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary-500 font-mono"
             />
         </div>
         <select className="bg-neutral-900 border border-neutral-700 text-neutral-300 text-sm rounded-lg p-2 focus:outline-none w-48">
             <option>All Actions</option>
             <option>CREATE</option>
             <option>UPDATE</option>
             <option>DELETE</option>
             <option>AUTH</option>
         </select>
      </div>

      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
         <table className="w-full text-sm text-left">
            <thead className="bg-neutral-900 text-neutral-500 font-medium border-b border-neutral-700">
               <tr>
                  <th className="px-6 py-3">Log ID</th>
                  <th className="px-6 py-3">Actor</th>
                  <th className="px-6 py-3">Action</th>
                  <th className="px-6 py-3">Resource</th>
                  <th className="px-6 py-3">IP Address</th>
                  <th className="px-6 py-3 text-right">Timestamp</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700 text-neutral-300 font-mono text-xs">
               {logs.map(log => (
                  <tr key={log.id} className="hover:bg-neutral-700/30 transition-colors">
                     <td className="px-6 py-3 text-neutral-500">{log.id}</td>
                     <td className="px-6 py-3 font-sans font-medium text-white flex items-center gap-2">
                        <User className="w-3 h-3 text-neutral-400" /> {log.actor}
                     </td>
                     <td className="px-6 py-3">
                        <span className={`px-1.5 py-0.5 rounded border ${
                           log.action.includes('DELETE') ? 'bg-red-900/20 text-red-400 border-red-900/30' :
                           log.action.includes('UPDATE') ? 'bg-blue-900/20 text-blue-400 border-blue-900/30' :
                           log.action.includes('FAILED') ? 'bg-orange-900/20 text-orange-400 border-orange-900/30' :
                           'bg-neutral-700 text-neutral-300 border-neutral-600'
                        }`}>
                           {log.action}
                        </span>
                     </td>
                     <td className="px-6 py-3 text-neutral-400">{log.resource}</td>
                     <td className="px-6 py-3 text-neutral-500">{log.ip}</td>
                     <td className="px-6 py-3 text-right text-neutral-400">{log.time}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};
