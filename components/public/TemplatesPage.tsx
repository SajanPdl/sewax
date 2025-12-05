
import React from 'react';
import { TEMPLATES } from '../../constants';
import { Button } from '../Button';

export const TemplatesPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-neutral-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">Templates Gallery</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Professionally designed templates for every industry.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEMPLATES.map((template) => (
            <div key={template.id} className="group bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-neutral-700">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 block">
                  {template.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{template.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{template.description}</p>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">Preview</Button>
                  <Button className="flex-1">Start with this</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
