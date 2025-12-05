import React, { useEffect, useState } from 'react';
import { Search, Download, Clock, User, Loader2 } from 'lucide-react';
import { Button } from '../Button';
import { supabase } from '../../lib/supabase/client';

export const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const fetchLogs = async () => {
        const { data } = await supabase
           .from('audit_logs')
           .select('*')
           .order('created_at', { ascending: false })
           .limit(100);
        if (data) setLogs(data);
        setLoading(false);
     };
     fetchLogs();
  }, []);

  if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Logs...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold text-white">System Audit Logs</h1>
            <p className="text-neutral-400">Record of actions.</p>
         </div>
      </div>

      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
         <table className="w-full text-sm text-left">
            <thead className="bg-neutral-900 text-neutral-500 font-medium border-b border-neutral-700">
               <tr>
                  <th className="px-6 py-3">Action</th>
                  <th className="px-6 py-3">Target</th>
                  <th className="px-6 py-3">Timestamp</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700 text-neutral-300 font-mono text-xs">
               {logs.map(log => (
                  <tr key={log.id} className="hover:bg-neutral-700/30 transition-colors">
                     <td className="px-6 py-3">
                        <span className="px-1.5 py-0.5 rounded bg-neutral-700 text-neutral-300 border-neutral-600">
                           {log.action}
                        </span>
                     </td>
                     <td className="px-6 py-3 text-neutral-400">{log.target}</td>
                     <td className="px-6 py-3 text-neutral-500">{new Date(log.created_at).toLocaleString()}</td>
                  </tr>
               ))}
                {logs.length === 0 && (
                      <tr>
                         <td colSpan={3} className="p-8 text-center text-neutral-500">No logs found.</td>
                      </tr>
                   )}
            </tbody>
         </table>
      </div>
    </div>
  );
};