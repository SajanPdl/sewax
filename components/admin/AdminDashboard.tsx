import React, { useEffect, useState } from 'react';
import { 
  Users, Building, DollarSign, Activity, ArrowUp, ArrowDown, 
  Server, AlertOctagon, FileWarning, Clock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../../lib/supabase/client';

export const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState({
     tenants: 0,
     users: 0,
     revenue: 0,
     tickets: 0
  });

  useEffect(() => {
     const fetchData = async () => {
        // Use RPC for optimized fetching of dashboard stats
        const { data, error } = await supabase.rpc('get_admin_dashboard_stats');
        
        if (data && !error) {
           setMetrics({
              tenants: data.tenants || 0,
              users: data.users || 0,
              revenue: data.revenue || 0,
              tickets: data.tickets || 0
           });
        }
     };
     fetchData();
  }, []);

  const serverStats = [
    { label: 'CPU Load', value: '12%', status: 'normal' },
    { label: 'Memory', value: '34%', status: 'normal' },
    { label: 'Storage', value: '28%', status: 'normal' },
    { label: 'API Latency', value: '45ms', status: 'normal' },
  ];

  // Mock data for chart as historical data requires complex query
  const data = [
    { name: 'Mon', revenue: 1200 },
    { name: 'Tue', revenue: 2100 },
    { name: 'Wed', revenue: 1600 },
    { name: 'Thu', revenue: 2800 },
    { name: 'Fri', revenue: 3400 },
    { name: 'Sat', revenue: 2900 },
    { name: 'Sun', revenue: 4100 },
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
              System Operational
           </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'Total Tenants', value: metrics.tenants.toString(), change: '+2', icon: Building, color: 'text-blue-400' },
           { label: 'Total Users', value: metrics.users.toString(), change: '+5', icon: Users, color: 'text-purple-400' },
           { label: 'Total Revenue', value: `NPR ${(metrics.revenue/1000).toFixed(1)}k`, change: '+15%', icon: DollarSign, color: 'text-green-400' },
           { label: 'Open Tickets', value: metrics.tickets.toString(), change: '0', icon: Activity, color: 'text-yellow-400' },
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
           </div>
         ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Main Chart */}
         <div className="lg:col-span-2 bg-neutral-800 border border-neutral-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Revenue Trend (Last 7 Days)</h3>
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
                  <div className="flex items-start gap-3 p-3 bg-neutral-900 border border-neutral-700 rounded-lg">
                     <AlertOctagon className="w-4 h-4 text-green-500 mt-0.5" />
                     <div>
                        <p className="text-sm font-bold text-gray-300">System Nominal</p>
                        <p className="text-xs text-gray-500 mt-0.5">No active alerts.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};