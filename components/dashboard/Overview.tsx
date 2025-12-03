import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../Button';
import { MOCK_CHART_DATA } from '../../constants';
import { ArrowUpRight, ArrowDownRight, Users, CreditCard, MousePointerClick } from 'lucide-react';

export const Overview: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Sudeep 👋 Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">View Site</Button>
          <Button>Create New Page</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Visitors', value: '12,345', change: '+12%', positive: true, icon: Users },
          { label: 'Sales (NPR)', value: '45,000', change: '+8%', positive: true, icon: CreditCard },
          { label: 'Bounce Rate', value: '42%', change: '-2%', positive: true, icon: MousePointerClick },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-primary-50 transition-colors">
                <stat.icon className="w-5 h-5 text-gray-500 group-hover:text-primary-600" />
              </div>
              <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stat.positive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {stat.positive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.change}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold font-display text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-900">Traffic Overview</h3>
            <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-100">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8102E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#C8102E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#111827', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#C8102E" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" activeDot={{ r: 6, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-gray-900">Recent Orders</h3>
            <div className="space-y-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xs font-bold border border-green-100 group-hover:bg-green-100 transition-colors">ES</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Order #20{i}</p>
                      <p className="text-xs text-gray-500">via eSewa</p>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-gray-900">NPR 1,500</span>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4 text-primary-600 hover:text-primary-700">View All Orders</Button>
          </div>

          <div className="bg-gradient-to-br from-primary-900 to-gray-900 p-6 rounded-xl text-white shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
             <h3 className="font-bold text-lg mb-1 relative z-10">Pro Plan</h3>
             <p className="text-gray-400 text-sm mb-6 relative z-10">Your next bill is on Oct 24, 2024</p>
             <div className="flex items-end gap-1 mb-4 relative z-10">
               <span className="text-3xl font-bold">NPR 1,500</span>
               <span className="text-gray-400 text-sm mb-1">/mo</span>
             </div>
             <Button size="sm" className="w-full bg-white text-gray-900 hover:bg-gray-100 border-0 relative z-10">Manage Subscription</Button>
          </div>
        </div>
      </div>
    </div>
  );
};