
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ExternalLink, Code, Layers, Zap } from 'lucide-react';
import { Button } from './Button';
import { Template } from '../types';

interface TemplateCarouselProps {
  templates: Template[];
}

export const TemplateCarousel: React.FC<TemplateCarouselProps> = ({ templates }) => {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [templates]);

  const slideLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="relative group">
        {/* Navigation Controls */}
        <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10 hidden md:block">
          <button 
            onClick={slideLeft}
            className="p-3 rounded-full bg-white shadow-lg border border-gray-100 text-gray-600 hover:text-primary-500 hover:scale-110 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        
        <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10 hidden md:block">
          <button 
            onClick={slideRight}
            className="p-3 rounded-full bg-white shadow-lg border border-gray-100 text-gray-600 hover:text-primary-500 hover:scale-110 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Carousel Container */}
        <motion.div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto py-8 px-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {templates.map((template) => (
            <motion.div 
              key={template.id}
              className="min-w-[280px] md:min-w-[340px] snap-center bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary-100 transition-all duration-300 flex flex-col group/card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                <img 
                  src={template.image} 
                  alt={template.name} 
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-medium text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    Popular in Nepal
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-block px-2 py-1 rounded-md bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider">
                    {template.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold font-display text-gray-900 mb-2">{template.name}</h3>
                <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-2">{template.description}</p>
                
                <Button 
                  onClick={() => setSelectedTemplate(template)}
                  variant="outline" 
                  className="w-full group-hover/card:bg-primary-500 group-hover/card:text-white group-hover/card:border-primary-500 transition-all"
                >
                  Use Template
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Template Details Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedTemplate(null)}
            />
            
            <motion.div 
              className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col md:flex-row"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <button 
                onClick={() => setSelectedTemplate(null)}
                className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur-md rounded-full text-gray-800 hover:bg-white z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-1/2 bg-gray-100 relative min-h-[300px] md:min-h-full">
                <img 
                  src={selectedTemplate.image} 
                  alt={selectedTemplate.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 overflow-y-auto">
                <div className="mb-6">
                  <span className="text-primary-600 font-bold text-sm tracking-wide uppercase mb-2 block">{selectedTemplate.category}</span>
                  <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">{selectedTemplate.name}</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedTemplate.description} A fully responsive template designed for modern Nepali businesses. 
                    Includes pre-configured sections for services, testimonials, and a contact form integrated with local maps.
                  </p>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-3">
                      <Layers className="w-4 h-4 text-primary-500" />
                      Included Pages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Home', 'About Us', 'Services', 'Contact', 'Blog'].map(page => (
                        <span key={page} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                          {page}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-3">
                      <Code className="w-4 h-4 text-primary-500" />
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Tailwind CSS', 'Framer Motion', 'Vite'].map(tech => (
                        <span key={tech} className="px-3 py-1 border border-gray-200 text-gray-600 rounded-lg text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1">Start Editing</Button>
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => selectedTemplate.preview_url ? window.open(selectedTemplate.preview_url, '_blank') : alert('Preview unavailable for this template.')}>
                    <ExternalLink className="w-4 h-4" />
                    Live Preview
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};