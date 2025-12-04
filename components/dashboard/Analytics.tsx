import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, Clock, MousePointer } from 'lucide-react';
import { MOCK_CHART_DATA } from '../../constants';

export const Analytics: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
       <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Overview of your site performance for the last 7 days.</p>
       </div>

       {/* Top Stats */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
             { label: 'Total Visitors', value: '2,543', change: '+12.5%', isUp: true, icon: Users },
             { label: 'Avg. Session Duration', value: '2m 14s', change: '-4.2%', isUp: false, icon: Clock },
             { label: 'Bounce Rate', value: '42.3%', change: '+2.1%', isUp: true, icon: MousePointer },
          ].map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                   <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                      <stat.icon className="w-5 h-5" />
                   </div>
                   <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stat.isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {stat.isUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                      {stat.change}
                   </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.label}</p>
             </div>
          ))}
       </div>

       {/* Main Chart */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900">Traffic Overview</h3>
                <select className="text-sm border-gray-200 rounded-lg bg-gray-50 p-1">
                   <option>Last 7 Days</option>
                   <option>Last 30 Days</option>
                </select>
             </div>
             <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={MOCK_CHART_DATA}>
                      <defs>
                         <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C8102E" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#C8102E" stopOpacity={0}/>
                         </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={{ stroke: '#C8102E', strokeWidth: 1, strokeDasharray: '4 4' }}
                      />
                      <Area type="monotone" dataKey="visitors" stroke="#C8102E" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="font-bold text-gray-900 mb-6">Device Breakdown</h3>
             <div className="flex flex-col gap-6">
                {[
                  { label: 'Mobile', value: '65%', color: 'bg-primary-500' },
                  { label: 'Desktop', value: '30%', color: 'bg-blue-500' },
                  { label: 'Tablet', value: '5%', color: 'bg-green-500' },
                ].map((device, i) => (
                   <div key={i}>
                      <div className="flex justify-between text-sm mb-2">
                         <span className="font-medium text-gray-700">{device.label}</span>
                         <span className="text-gray-500">{device.value}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                         <div className={`h-full ${device.color} rounded-full`} style={{ width: device.value }}></div>
                      </div>
                   </div>
                ))}
             </div>
             <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-500 leading-relaxed">
                Most of your traffic comes from Mobile devices. Ensure your site is optimized for smaller screens using the Editor.
             </div>
          </div>
       </div>

       {/* Top Pages */}
       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
             <h3 className="font-bold text-gray-900">Top Pages</h3>
          </div>
          <table className="w-full text-sm text-left">
             <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                   <th className="px-6 py-3 font-medium">Page Path</th>
                   <th className="px-6 py-3 font-medium">Views</th>
                   <th className="px-6 py-3 font-medium">Unique</th>
                   <th className="px-6 py-3 font-medium">Avg. Time</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {[
                   { path: '/', views: '1,240', unique: '980', time: '1m 20s' },
                   { path: '/products', views: '850', unique: '600', time: '2m 10s' },
                   { path: '/about', views: '420', unique: '380', time: '1m 05s' },
                   { path: '/contact', views: '210', unique: '180', time: '0m 45s' },
                ].map((row, i) => (
                   <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-primary-600">{row.path}</td>
                      <td className="px-6 py-4 text-gray-900">{row.views}</td>
                      <td className="px-6 py-4 text-gray-500">{row.unique}</td>
                      <td className="px-6 py-4 text-gray-500">{row.time}</td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};