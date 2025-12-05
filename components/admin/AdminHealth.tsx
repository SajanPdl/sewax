import React from 'react';
import { Activity, Server, Cpu, Database, HardDrive, Wifi } from 'lucide-react';

export const AdminHealth: React.FC = () => {
  return (
    <div className="space-y-6">
       <div>
          <h1 className="text-2xl font-bold text-white">System Health</h1>
          <p className="text-neutral-400">Real-time infrastructure monitoring.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
             { label: 'API Gateway', status: 'Operational', latency: '45ms', icon: Wifi, color: 'text-green-500' },
             { label: 'Database (Primary)', status: 'Operational', latency: '12ms', icon: Database, color: 'text-green-500' },
             { label: 'Storage Service', status: 'Operational', latency: '120ms', icon: HardDrive, color: 'text-green-500' },
             { label: 'Auth Service', status: 'Operational', latency: '55ms', icon: Activity, color: 'text-green-500' },
             { label: 'Background Workers', status: 'High Load', latency: '2s', icon: Cpu, color: 'text-yellow-500' },
             { label: 'CDN Edge', status: 'Operational', latency: '10ms', icon: Server, color: 'text-green-500' },
          ].map((service, i) => (
             <div key={i} className="bg-neutral-800 p-6 rounded-xl border border-neutral-700">
                <div className="flex items-start justify-between mb-4">
                   <service.icon className={`w-6 h-6 ${service.color}`} />
                   <span className={`px-2 py-1 rounded text-xs font-bold bg-neutral-900 border border-neutral-700 ${service.color}`}>
                      {service.status}
                   </span>
                </div>
                <h3 className="text-lg font-bold text-white">{service.label}</h3>
                <p className="text-sm text-neutral-500 mt-1">Latency: {service.latency}</p>
                <div className="mt-4 flex gap-1">
                   {[...Array(20)].map((_, j) => (
                      <div key={j} className={`flex-1 h-6 rounded-sm ${Math.random() > 0.9 ? 'bg-yellow-500/50' : 'bg-green-500/20'}`}></div>
                   ))}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};