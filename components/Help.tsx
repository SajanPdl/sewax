import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare, BookOpen, Play } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
}

const ARTICLES: Article[] = [
  { id: '1', title: 'Getting Started with Sewax', category: 'Getting Started', excerpt: 'Learn the basics and create your first site.' },
  { id: '2', title: 'Using the Site Editor', category: 'Editor', excerpt: 'Master the drag-and-drop editor.' },
  { id: '3', title: 'Adding a Custom Domain', category: 'Domains', excerpt: 'Guide to setting up your own domain.' },
  { id: '4', title: 'Managing Team Members', category: 'Team', excerpt: 'Invite and manage team roles.' },
  { id: '5', title: 'Publishing Your Site', category: 'Publishing', excerpt: 'How to go live with your site.' },
  { id: '6', title: 'Stripe Integration', category: 'Billing', excerpt: 'Set up payments with Stripe.' },
];

export const Help: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const filteredArticles = ARTICLES.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Help & Documentation
          </h1>
          <p className="text-xl text-gray-600">
            Find answers, tutorials, and guides to help you build amazing sites.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="mb-12 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </motion.div>

        {/* Articles */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-primary-300 transition-all cursor-pointer"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <span className="text-xs font-semibold text-primary-600 uppercase">{article.category}</span>
                  <h3 className="text-lg font-bold text-gray-900">{article.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
              <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                Read Article →
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <Play className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Video Tutorials</h3>
            <p className="text-sm text-gray-600 mb-4">Learn by watching step-by-step guides.</p>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
              Watch Now →
            </a>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Knowledge Base</h3>
            <p className="text-sm text-gray-600 mb-4">Browse our comprehensive docs.</p>
            <a href="#" className="text-green-600 hover:text-green-700 font-semibold text-sm">
              Browse →
            </a>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
            <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-sm text-gray-600 mb-4">Chat with our support team.</p>
            <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
              Chat Now →
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Didn't find what you're looking for?</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32"
                placeholder="Tell us how we can help..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;
