import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Download } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  preview: string;
  rating: number;
  downloads: number;
  premium: boolean;
}

const TEMPLATES: Template[] = [
  { id: '1', name: 'Portfolio', category: 'Portfolio', preview: '📷', rating: 4.8, downloads: 2340, premium: false },
  { id: '2', name: 'E-Commerce Shop', category: 'Shop', preview: '🛍️', rating: 4.9, downloads: 5120, premium: true },
  { id: '3', name: 'Blog Starter', category: 'Blog', preview: '📝', rating: 4.7, downloads: 1890, premium: false },
  { id: '4', name: 'Agency', category: 'Business', preview: '🏢', rating: 4.6, downloads: 3450, premium: true },
  { id: '5', name: 'Restaurant Menu', category: 'Business', preview: '🍕', rating: 4.9, downloads: 892, premium: false },
  { id: '6', name: 'SaaS Landing', category: 'Software', preview: '💻', rating: 5.0, downloads: 4200, premium: true },
];

const CATEGORIES = ['All', 'Portfolio', 'Shop', 'Blog', 'Business', 'Software'];

export const TemplatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = TEMPLATES.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Browse Templates
          </h1>
          <p className="text-xl text-gray-600">
            Choose from hundreds of professionally designed templates
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredTemplates.map((template, idx) => (
            <motion.div
              key={template.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              whileHover={{ y: -5 }}
              onClick={() => setSelectedTemplate(template)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {/* Preview */}
              <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-6xl">
                {template.preview}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.category}</p>
                  </div>
                  {template.premium && (
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
                      PRO
                    </span>
                  )}
                </div>

                {/* Rating & Downloads */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-gray-900">{template.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Download className="w-4 h-4" />
                    {template.downloads.toLocaleString()}
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors">
                  Use Template
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Template Detail Modal */}
        {selectedTemplate && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-8xl">
                {selectedTemplate.preview}
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTemplate.name}</h2>
                  <p className="text-gray-600">{selectedTemplate.category}</p>
                </div>

                <p className="text-gray-700">
                  A beautiful and modern template perfect for {selectedTemplate.category.toLowerCase()} sites.
                  Fully customizable with Sewax editor.
                </p>

                <div className="flex items-center gap-6 py-4 border-y border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedTemplate.rating} ⭐</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Downloads</p>
                    <p className="text-2xl font-bold text-gray-900">{(selectedTemplate.downloads / 1000).toFixed(1)}K</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold">
                    Use This Template
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TemplatesPage;
