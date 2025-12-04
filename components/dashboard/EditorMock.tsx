import React, { useState } from 'react';
import { Button } from '../Button';
import { ArrowLeft, Monitor, Smartphone, Tablet, Undo, Redo, Plus, Image as ImageIcon, Type, Box, Save, Eye } from 'lucide-react';

export const EditorMock: React.FC = () => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-100 overflow-hidden">
       {/* Editor Toolbar */}
       <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm z-20">
          <div className="flex items-center gap-4">
             <a href="#/dashboard/sites" className="text-gray-500 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
             </a>
             <div className="h-6 w-px bg-gray-200"></div>
             <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">Himalayan Coffee</span>
                <span className="text-[10px] text-gray-500">Home Page • Draft</span>
             </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
             <button 
                onClick={() => setDevice('desktop')}
                className={`p-1.5 rounded-md transition-all ${device === 'desktop' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
             >
                <Monitor className="w-4 h-4" />
             </button>
             <button 
                onClick={() => setDevice('tablet')}
                className={`p-1.5 rounded-md transition-all ${device === 'tablet' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
             >
                <Tablet className="w-4 h-4" />
             </button>
             <button 
                onClick={() => setDevice('mobile')}
                className={`p-1.5 rounded-md transition-all ${device === 'mobile' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
             >
                <Smartphone className="w-4 h-4" />
             </button>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1 mr-2 text-gray-400">
                <button className="p-1.5 hover:text-gray-900 hover:bg-gray-100 rounded"><Undo className="w-4 h-4" /></button>
                <button className="p-1.5 hover:text-gray-900 hover:bg-gray-100 rounded"><Redo className="w-4 h-4" /></button>
             </div>
             <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
                <Eye className="w-4 h-4" /> Preview
             </Button>
             <Button size="sm" className="flex items-center gap-1">
                <Save className="w-4 h-4" /> Publish
             </Button>
          </div>
       </div>

       {/* Editor Workspace */}
       <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Elements */}
          <div className="w-16 md:w-64 bg-white border-r border-gray-200 flex flex-col z-10">
             <div className="p-4 border-b border-gray-100 hidden md:block">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Elements</h3>
             </div>
             
             <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {[
                   { icon: Type, label: 'Text Block' },
                   { icon: ImageIcon, label: 'Image' },
                   { icon: Box, label: 'Container' },
                   { icon: Plus, label: 'Button' },
                ].map((item, i) => (
                   <div key={i} className="flex flex-col md:flex-row items-center md:gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-grab active:cursor-grabbing border border-transparent hover:border-gray-200 transition-all text-center md:text-left group">
                      <item.icon className="w-6 h-6 text-gray-400 group-hover:text-primary-500" />
                      <span className="text-[10px] md:text-sm font-medium text-gray-600 group-hover:text-gray-900">{item.label}</span>
                   </div>
                ))}
                
                <div className="my-4 border-t border-gray-100 pt-4 hidden md:block">
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide px-2 mb-2">Sections</h3>
                   {['Hero', 'Features', 'Testimonials', 'Contact Form'].map((section, i) => (
                      <div key={i} className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer mb-1">
                         {section}
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-gray-100 overflow-auto flex items-center justify-center p-8 relative">
             <div 
               className={`bg-white shadow-2xl transition-all duration-300 overflow-y-auto ${
                  device === 'desktop' ? 'w-full max-w-[1200px] h-full' : 
                  device === 'tablet' ? 'w-[768px] h-[1024px]' : 
                  'w-[375px] h-[667px]'
               }`}
             >
                {/* Mock Website Content */}
                <div className="w-full h-full relative group">
                   
                   {/* Navbar Mock */}
                   <div className="border-b border-gray-100 p-6 flex justify-between items-center hover:ring-2 ring-primary-500 ring-inset cursor-pointer relative">
                      <div className="font-display font-bold text-xl text-gray-900">Himalayan.</div>
                      <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                         <span>Home</span>
                         <span>Menu</span>
                         <span>About</span>
                         <span>Contact</span>
                      </div>
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm">Order Now</button>
                      
                      {/* Hover Action */}
                      <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none">
                         Header Section
                      </div>
                   </div>

                   {/* Hero Mock */}
                   <div className="py-20 px-8 text-center bg-gray-50 hover:ring-2 ring-primary-500 ring-inset cursor-pointer relative">
                      <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">Taste the Altitude.</h1>
                      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                         Premium organic coffee sourced directly from the foothills of the Himalayas. 
                         Roasted in Kathmandu, served globally.
                      </p>
                      <div className="flex justify-center gap-4">
                         <button className="bg-gray-900 text-white px-6 py-3 rounded-xl">View Menu</button>
                         <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl">Our Story</button>
                      </div>
                   </div>

                   {/* Grid Mock */}
                   <div className="py-16 px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[1,2,3].map(i => (
                         <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:ring-2 ring-primary-500 ring-inset cursor-pointer">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-6">
                               <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
                               <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
                               <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
                            </div>
                         </div>
                      ))}
                   </div>

                </div>
             </div>
          </div>

          {/* Right Sidebar - Properties (Hidden on mobile) */}
          <div className="w-64 bg-white border-l border-gray-200 hidden xl:flex flex-col z-10">
             <div className="p-4 border-b border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Properties</h3>
             </div>
             <div className="p-4 space-y-6">
                <div>
                   <label className="text-xs font-semibold text-gray-700 block mb-2">Background Color</label>
                   <div className="flex gap-2">
                      <div className="w-8 h-8 rounded border border-gray-200 bg-white"></div>
                      <div className="w-8 h-8 rounded border border-gray-200 bg-gray-50"></div>
                      <div className="w-8 h-8 rounded border border-gray-200 bg-gray-900"></div>
                   </div>
                </div>
                <div>
                   <label className="text-xs font-semibold text-gray-700 block mb-2">Padding</label>
                   <div className="flex gap-2">
                      <input type="number" className="w-full border border-gray-200 rounded p-1 text-sm" placeholder="Top" />
                      <input type="number" className="w-full border border-gray-200 rounded p-1 text-sm" placeholder="Bottom" />
                   </div>
                </div>
                <div>
                   <label className="text-xs font-semibold text-gray-700 block mb-2">Alignment</label>
                   <div className="flex bg-gray-100 p-1 rounded">
                      <button className="flex-1 p-1 bg-white shadow-sm rounded text-center text-xs">Left</button>
                      <button className="flex-1 p-1 text-center text-xs text-gray-500">Center</button>
                      <button className="flex-1 p-1 text-center text-xs text-gray-500">Right</button>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};