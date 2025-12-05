import React, { useState } from 'react';
import { Button } from '../Button';
import { Mail, Send, Plus } from 'lucide-react';

export const Marketing: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
       <div className="mb-8 flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-display font-bold text-gray-900">Marketing</h1>
             <p className="text-gray-500">Email campaigns and automations.</p>
          </div>
          <Button className="flex items-center gap-2">
             <Plus className="w-4 h-4" /> Create Campaign
          </Button>
       </div>

       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-12 text-center">
             <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-500">
                <Mail className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">No campaigns yet</h3>
             <p className="text-gray-500 mb-6 max-w-md mx-auto">Start engaging your customers with email newsletters or SMS promotions.</p>
             <Button variant="outline">Browse Templates</Button>
          </div>
       </div>
    </div>
  );
};