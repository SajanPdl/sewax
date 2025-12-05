import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { supabase } from '../../lib/supabase/client';
import { Loader2 } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const fetchData = async () => {
        // 1. Fetch Revenue Stats (Last 7 days) via RPC
        const { data: revData } = await supabase.rpc('get_revenue_stats', { days_limit: 7 });
        
        // 2. Fetch User Growth via RPC
        const { data: userData } = await supabase.rpc('get_user_stats', { days_limit: 7 });

        // Merge data using a Map to ensure dates align correctly
        const reportMap = new Map();

        // Populate revenue
        if (revData) {
            revData.forEach((item: any) => {
                reportMap.set(item.date_label, { name: item.date_label, revenue: item.total_revenue, users: 0 });
            });
        }

        // Populate users
        if (userData) {
            userData.forEach((item: any) => {
                if (reportMap.has(item.date_label)) {
                    reportMap.get(item.date_label).users = item.user_count;
                } else {
                    reportMap.set(item.date_label, { name: item.date_label, revenue: 0, users: item.user_count });
                }
            });
        }

        // Convert Map to Array and sort (approximate sort by date string "Mon DD")
        // Ideally, RPC should return ISO date for sorting, but for this demo, we assume the order returned by DB
        const mergedData = Array.from(reportMap.values());
        
        // If empty, provide some placeholders so the chart isn't invisible
        if (mergedData.length === 0) {
            setData([
                { name: 'Mon', revenue: 0, users: 0 },
                { name: 'Tue', revenue: 0, users: 0 },
            ]);
        } else {
            setData(mergedData);
        }

        // 3. Fetch Top Tenants
        const { data: tenantData } = await supabase
           .from('tenants')
           .select('*')
           .order('created_at', { ascending: false })
           .limit(5);
        
        if (tenantData) setTenants(tenantData);

        setLoading(false);
     };
     fetchData();
  }, []);

  if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Analytics...</div>;

  return (
    <div className="space-y-6">
       <div>
          <h1 className="text-2xl font-bold text-white">Analytics & Reports</h1>
          <p className="text-neutral-400">Deep dive into platform performance.</p>
       </div>

       <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700">
          <h3 className="text-lg font-bold text-white mb-6">User Acquisition vs Revenue (Last 7 Days)</h3>
          <div className="h-96 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#404040" vertical={false} />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a3a3a3'}} />
                   <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#a3a3a3'}} />
                   <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#a3a3a3'}} />
                   <Tooltip 
                      contentStyle={{ backgroundColor: '#171717', border: '1px solid #404040', color: '#fff' }}
                      cursor={{ fill: '#333' }}
                   />
                   <Legend />
                   <Bar yAxisId="left" dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Revenue (NPR)" />
                   <Bar yAxisId="right" dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} name="New Users" />
                </BarChart>
             </ResponsiveContainer>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700">
             <h3 className="text-lg font-bold text-white mb-4">Recent Tenants</h3>
             <ul className="space-y-4">
                {tenants.map((t) => (
                   <li key={t.id} className="flex justify-between items-center border-b border-neutral-700 pb-2 last:border-0">
                      <div>
                         <p className="font-bold text-white">{t.name}</p>
                         <p className="text-xs text-neutral-500">{t.slug}.sewax.com</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs ${t.subscription_status === 'active' ? 'text-green-400 bg-green-900/20' : 'text-neutral-400 bg-neutral-700'}`}>
                         {t.subscription_status}
                      </span>
                   </li>
                ))}
                {tenants.length === 0 && <li className="text-neutral-500 text-sm">No tenants recorded.</li>}
             </ul>
          </div>
          <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700">
             <h3 className="text-lg font-bold text-white mb-4">Subscription Distribution</h3>
             <div className="space-y-4">
                {[{l: 'Free', v: 80, c: 'bg-gray-500'}, {l: 'Pro', v: 15, c: 'bg-primary-500'}, {l: 'Agency', v: 5, c: 'bg-purple-500'}].map((item, i) => (
                   <div key={i}>
                      <div className="flex justify-between text-sm mb-1 text-neutral-300">
                         <span>{item.l}</span>
                         <span>{item.v}%</span>
                      </div>
                      <div className="w-full bg-neutral-700 rounded-full h-2">
                         <div className={`h-2 rounded-full ${item.c}`} style={{width: `${item.v}%`}}></div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};