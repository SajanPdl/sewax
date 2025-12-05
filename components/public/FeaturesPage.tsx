
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Smartphone, Shield, Globe, Code, ShoppingCart, BarChart, Server, Layout } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const MotionDiv = motion.div as any;
  const features = [
    { icon: Zap, title: 'Lightning Fast CDN', desc: 'Sites load in under 1s from Kathmandu to New York.', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { icon: Smartphone, title: 'Mobile First', desc: 'Optimized for 4G networks and mobile displays by default.', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Shield, title: 'Enterprise Security', desc: 'Free SSL, DDoS protection, and automatic backups.', color: 'text-green-600', bg: 'bg-green-50' },
    { icon: Globe, title: 'Custom Domains', desc: 'Use .com.np or any domain you own.', color: 'text-purple-600', bg: 'bg-purple-50' },
    { icon: Code, title: 'No-Code Editor', desc: 'Drag, drop, and customize without writing a single line.', color: 'text-pink-600', bg: 'bg-pink-50' },
    { icon: ShoppingCart, title: 'Nepali Payments', desc: 'Native eSewa & Khalti integration.', color: 'text-primary-600', bg: 'bg-primary-50' },
    { icon: BarChart, title: 'Advanced Analytics', desc: 'Track visitors, sales, and conversion rates.', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { icon: Server, title: 'Managed Hosting', desc: 'We handle the infrastructure, you focus on business.', color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { icon: Layout, title: 'Responsive Themes', desc: 'Themes that look great on any device.', color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-neutral-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">Features</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Everything you need to succeed online.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <MotionDiv 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl ${f.bg} dark:bg-neutral-700 flex items-center justify-center ${f.color} mb-6`}>
                <f.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </div>
  );
};