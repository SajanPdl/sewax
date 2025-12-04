
import React, { useState } from 'react';
import { Button } from '../Button';
import { Search, Upload, FileCode, CheckCircle, MoreVertical, Eye, Trash2, AlertTriangle } from 'lucide-react';
import { TEMPLATES } from '../../constants';

export const TemplateManager: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert("Theme uploaded! (Note: PHP files must be served by a separate engine or ported to React)");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold text-white">Theme Marketplace</h1>
            <p className="text-neutral-400">Manage public themes and templates.</p>
         </div>
         <Button onClick={handleUpload} isLoading={isUploading} className="bg-primary-600 hover:bg-primary-700 text-white border-0 flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload Theme
         </Button>
      </div>

      <div className="bg-blue-900/20 border border-blue-900/50 rounded-xl p-4 flex gap-4">
         <div className="p-2 bg-blue-900/30 rounded-lg h-fit">
            <FileCode className="w-5 h-5 text-blue-400" />
         </div>
         <div>
            <h4 className="text-sm font-bold text-blue-200">Technical Note</h4>
            <p className="text-xs text-blue-300 mt-1 leading-relaxed">
               This platform uses a <strong>Next.js</strong> frontend. If uploading <strong>PHP themes</strong>, ensure you have a separate PHP rendering engine configured to serve user sites, or port the templates to <strong>React (.tsx)</strong> components for native integration.
            </p>
         </div>
      </div>

      {/* Filters */}
      <div className="bg-neutral-800 p-4 rounded-xl border border-neutral-700 flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-1 focus:ring-primary-500 text-sm text-white placeholder-neutral-500 focus:outline-none"
            />
         </div>
         <div className="flex items-center gap-3">
             <select className="bg-neutral-900 border border-neutral-700 text-neutral-300 text-sm rounded-lg p-2 focus:outline-none">
                <option>All Categories</option>
                <option>E-commerce</option>
                <option>Restaurant</option>
                <option>Agency</option>
             </select>
         </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {TEMPLATES.map((template) => (
            <div key={template.id} className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden group hover:border-neutral-600 transition-all">
               <div className="h-48 relative bg-neutral-900 overflow-hidden">
                  <img src={template.image} alt={template.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2 bg-neutral-900/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white border border-neutral-700">
                     v1.2.0
                  </div>
               </div>
               <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="font-bold text-white text-lg">{template.name}</h3>
                     <button className="text-neutral-500 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                     </button>
                  </div>
                  <p className="text-sm text-neutral-400 line-clamp-2 mb-4">{template.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                     <span className="px-2 py-1 rounded bg-neutral-700 text-neutral-300 text-xs font-medium">{template.category}</span>
                     <span className="px-2 py-1 rounded bg-green-900/30 text-green-400 border border-green-900/50 text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Active
                     </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-700">
                     <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-neutral-700 text-white text-sm hover:bg-neutral-600 transition-colors">
                        <Eye className="w-4 h-4" /> Preview
                     </button>
                     <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-red-900/30 text-red-400 text-sm hover:bg-red-900/20 transition-colors">
                        <Trash2 className="w-4 h-4" /> Delete
                     </button>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};
