
import React from 'react';
import { 
  Users, Building, DollarSign, Activity, ArrowUp, ArrowDown, 
  Server, AlertOctagon, FileWarning, Clock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const serverStats = [
    { label: 'CPU Load', value: '42%', status: 'normal' },
    { label: 'Memory', value: '64%', status: 'warning' },
    { label: 'Storage', value: '28%', status: 'normal' },
    { label: 'API Latency', value: '45ms', status: 'normal' },
  ];

  const data = [
    { name: 'Mon', signups: 12, revenue: 1200 },
    { name: 'Tue', signups: 19, revenue: 2100 },
    { name: 'Wed', signups: 15, revenue: 1600 },
    { name: 'Thu', signups: 22, revenue: 2800 },
    { name: 'Fri', signups: 30, revenue: 3400 },
    { name: 'Sat', signups: 25, revenue: 2900 },
    { name: 'Sun', signups: 35, revenue: 4100 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-white mb-2">Mission Control</h1>
           <p className="text-neutral-400">System overview and critical metrics.</p>
        </div>
        <div className="flex gap-2">
           <span className="flex items-center gap-2 px-3 py-1 bg-green-900/20 text-green-400 border border-green-900/30 rounded-full text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              All Systems Operational
           </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'Total Tenants', value: '1,240', change: '+12%', icon: Building, color: 'text-blue-400' },
           { label: 'Total Users', value: '3,850', change: '+8%', icon: Users, color: 'text-purple-400' },
           { label: 'MRR', value: 'NPR 850k', change: '+15%', icon: DollarSign, color: 'text-green-400' },
           { label: 'Active Tickets', value: '42', change: '-5', icon: Activity, color: 'text-yellow-400' },
         ].map((stat, i) => (
           <div key={i} className="bg-neutral-800 border border-neutral-700 p-6 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                 </div>
                 <div className={`p-2 bg-neutral-700/50 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                 </div>
              </div>
              <div className="flex items-center text-xs">
                 <span className={`font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                    {stat.change.startsWith('+') ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                    {stat.change}
                 </span>
                 <span className="text-neutral-500 ml-2">vs last month</span>
              </div>
           </div>
         ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Main Chart */}
         <div className="lg:col-span-2 bg-neutral-800 border border-neutral-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Revenue & Growth</h3>
            <div className="h-80 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                     <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#737373', fontSize: 12}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#737373', fontSize: 12}} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#171717', border: '1px solid #404040', borderRadius: '8px', color: '#fff' }}
                        cursor={{ stroke: '#404040' }}
                     />
                     <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* System Health */}
         <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
               <Server className="w-5 h-5 text-neutral-400" /> System Health
            </h3>
            <div className="space-y-6">
               {serverStats.map((stat, i) => (
                  <div key={i}>
                     <div className="flex justify-between text-sm mb-2">
                        <span className="text-neutral-300">{stat.label}</span>
                        <span className={`font-mono font-bold ${stat.status === 'warning' ? 'text-yellow-500' : 'text-green-500'}`}>{stat.value}</span>
                     </div>
                     <div className="w-full bg-neutral-700 rounded-full h-2">
                        <div 
                           className={`h-2 rounded-full ${stat.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}`} 
                           style={{ width: stat.value }}
                        ></div>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-neutral-700">
               <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">Live Alerts</h4>
               <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-900/50 rounded-lg">
                     <AlertOctagon className="w-4 h-4 text-red-500 mt-0.5" />
                     <div>
                        <p className="text-sm font-bold text-red-200">Payment Gateway Error</p>
                        <p className="text-xs text-red-400 mt-0.5">High failure rate on Khalti endpoint.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-yellow-900/20 border border-yellow-900/50 rounded-lg">
                     <FileWarning className="w-4 h-4 text-yellow-500 mt-0.5" />
                     <div>
                        <p className="text-sm font-bold text-yellow-200">Storage Warning</p>
                        <p className="text-xs text-yellow-400 mt-0.5">S3 Bucket 'sewax-assets' reaching capacity.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
      {/* Recent Audit Logs */}
      <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden">
         <div className="px-6 py-4 border-b border-neutral-700 flex justify-between items-center">
            <h3 className="font-bold text-white">Recent Admin Activity</h3>
            <button className="text-xs text-primary-400 hover:text-primary-300">View Audit Log</button>
         </div>
         <table className="w-full text-sm text-left">
            <thead className="bg-neutral-900 text-neutral-500 font-medium border-b border-neutral-700">
               <tr>
                  <th className="px-6 py-3">Admin</th>
                  <th className="px-6 py-3">Action</th>
                  <th className="px-6 py-3">Target</th>
                  <th className="px-6 py-3 text-right">Time</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700 text-neutral-300">
               {[
                  { admin: 'Sudeep K.', action: 'Suspended Tenant', target: 'Spam Co.', time: '10m ago' },
                  { admin: 'System', action: 'Auto-Renew', target: 'Himalayan Coffee', time: '1h ago' },
                  { admin: 'Priya S.', action: 'Refunded Payment', target: 'INV-2049', time: '2h ago' },
                  { admin: 'Sudeep K.', action: 'Updated Plan', target: 'Agency Tier', time: '5h ago' },
               ].map((log, i) => (
                  <tr key={i} className="hover:bg-neutral-700/50 transition-colors">
                     <td className="px-6 py-3 font-medium text-white">{log.admin}</td>
                     <td className="px-6 py-3">{log.action}</td>
                     <td className="px-6 py-3 font-mono text-xs text-neutral-400">{log.target}</td>
                     <td className="px-6 py-3 text-right text-neutral-500 flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3" /> {log.time}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};
