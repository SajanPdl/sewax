
import React, { useState } from 'react';
import { Button } from '../Button';
import { Mail, Send, Plus, Calendar, BarChart } from 'lucide-react';

export const Marketing: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
     const name = prompt("Enter campaign name:");
     if (!name) return;
     
     const newCampaign = {
        id: Date.now(),
        name,
        status: 'Draft',
        sent: 0,
        opened: 0,
        date: new Date().toLocaleDateString()
     };
     setCampaigns([newCampaign, ...campaigns]);
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
       <div className="mb-8 flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-display font-bold text-gray-900">Marketing</h1>
             <p className="text-gray-500">Email campaigns and automations.</p>
          </div>
          <Button className="flex items-center gap-2" onClick={handleCreate}>
             <Plus className="w-4 h-4" /> Create Campaign
          </Button>
       </div>

       {campaigns.length > 0 ? (
          <div className="grid gap-4">
             {campaigns.map(camp => (
                <div key={camp.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                         <Mail className="w-6 h-6" />
                      </div>
                      <div>
                         <h3 className="font-bold text-gray-900">{camp.name}</h3>
                         <div className="flex gap-4 text-xs text-gray-500 mt-1">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {camp.date}</span>
                            <span className="flex items-center gap-1"><BarChart className="w-3 h-3"/> 0% Open Rate</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded">
                         {camp.status}
                      </span>
                      <Button variant="outline" size="sm">Edit</Button>
                   </div>
                </div>
             ))}
          </div>
       ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
             <div className="p-12 text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-500">
                   <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No campaigns yet</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">Start engaging your customers with email newsletters or SMS promotions.</p>
                <Button variant="outline" onClick={handleCreate}>Browse Templates</Button>
             </div>
          </div>
       )}
    </div>
  );
};
