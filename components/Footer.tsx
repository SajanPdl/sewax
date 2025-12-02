import React, { useState } from 'react';
import { Heart, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold font-display text-primary-500 mb-4">Sewax.</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering Nepali creators with world-class digital tools. Build local, scale global.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition">Templates</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Pricing</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Showcase</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition">Documentation</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Community</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition">Privacy</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2024 Sewax Inc. All rights reserved.</p>
          
          <button 
            onClick={() => setShowEasterEgg(!showEasterEgg)}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group text-sm"
          >
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary-500 group-hover:fill-primary-500 transition-colors" />
            <span>in Pokhara</span>
            <MapPin className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {showEasterEgg && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowEasterEgg(false)}>
          <div className="bg-white text-gray-900 p-8 rounded-2xl max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowEasterEgg(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
            <h3 className="text-2xl font-bold mb-4 font-display">Namaste from Pokhara! 🙏</h3>
            <p className="text-gray-600 mb-6">
              Our team is based right by the lakeside. Sewax is built with the spirit of Machhapuchhre – standing tall and proud.
            </p>
            <img src="https://picsum.photos/400/200?grayscale" alt="Pokhara" className="rounded-lg w-full h-40 object-cover mb-4" />
            <button 
              onClick={() => setShowEasterEgg(false)}
              className="w-full bg-primary-500 text-white py-2 rounded-lg font-medium hover:bg-primary-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
