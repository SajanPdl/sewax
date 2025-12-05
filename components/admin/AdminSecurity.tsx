import React from 'react';
import { Lock, ShieldAlert, Key, Globe } from 'lucide-react';

export const AdminSecurity: React.FC = () => {
   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-2xl font-bold text-white">Security Center</h1>
            <p className="text-neutral-400">Threat monitoring and access policies.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
               <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-500" /> Active Threats
               </h3>
               <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-700 text-center text-neutral-500 text-sm">
                  No active threats detected in the last 24 hours.
               </div>
            </div>
            
            <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
               <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-500" /> WAF Status
               </h3>
               <div className="flex justify-between items-center mb-2">
                  <span className="text-neutral-300">Firewall Rules</span>
                  <span className="text-green-400 font-bold">Active</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-neutral-300">Rate Limiting</span>
                  <span className="text-green-400 font-bold">Enabled</span>
               </div>
            </div>
         </div>
      </div>
   );
};