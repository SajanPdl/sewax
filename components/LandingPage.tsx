import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, Smartphone, Zap, Code, Users, Play, HelpCircle, MapPin, Twitter, Facebook, Instagram, Linkedin, Globe, ShoppingCart, Lock } from 'lucide-react';
import { Button } from './Button';
import { Hero3D } from './Hero3D';
import { TemplateCarousel } from './TemplateCarousel';
import { StartWizard } from './StartWizard';
import { TEMPLATES, PRICING_PLANS, TESTIMONIALS, FAQS, BLOG_POSTS } from '../constants';

interface LandingPageProps {
  lang: 'en' | 'np';
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang }) => {
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>('monthly');

  const content = {
    headline: lang === 'en' ? "Build sajilo websites." : "सजिलो वेबसाइट बनाउनुहोस्।",
    subheadline: lang === 'en' 
      ? "Craft for Nepal. Create sites, sell courses, host marketplaces — built for Nepali creators."
      : "नेपाली सिर्जनाकर्ताहरूका लागि निर्मित — वेबसाइटहरू बनाउनुहोस्, अनलाइन बेच्नुहोस्।",
    cta: lang === 'en' ? "Get Started" : "सुरु गर्नुहोस्"
  };

  return (
    <div className="pt-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0 opacity-30">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-200/20 rounded-full blur-3xl" />
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-red-100 text-primary-700 text-sm font-semibold mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                🇳🇵 Proudly Made in Nepal
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 leading-[1.1] mb-6">
                {content.headline} <br />
                <span className="text-transparent bg-clip-text bg-accent-gradient">
                  Craft for Nepal.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
                {content.subheadline}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="shadow-xl shadow-primary-500/20">{content.cta}</Button>
                <Button size="lg" variant="outline" onClick={() => document.getElementById('templates')?.scrollIntoView({behavior: 'smooth'})}>
                  View Templates
                </Button>
              </div>
            </motion.div>
            
            <div className="relative">
              <Hero3D />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Stats Strip */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Sites Launched', value: '1,200+' },
                { label: 'Creators', value: '850+' },
                { label: 'Templates', value: '50+' },
                { label: 'Uptime', value: '99.9%' },
              ].map((stat, i) => (
                <div key={i} className="text-center md:text-left border-r last:border-0 border-gray-100">
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">{stat.label}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 3. Core Features Deep Dive */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
             <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">Features</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mt-2 mb-4">Everything local, yet global.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">We've integrated the tools Nepali businesses actually use, wrapped in world-class performance.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Lightning Fast CDN', desc: 'Sites load in under 1s from Kathmandu to New York.', color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { icon: Smartphone, title: 'Mobile First', desc: 'Optimized for 4G networks and mobile displays by default.', color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: Shield, title: 'Enterprise Security', desc: 'Free SSL, DDoS protection, and automatic backups.', color: 'text-green-600', bg: 'bg-green-50' },
              { icon: Globe, title: 'Custom Domains', desc: 'Use .com.np or any domain you own.', color: 'text-purple-600', bg: 'bg-purple-50' },
              { icon: Code, title: 'No-Code Editor', desc: 'Drag, drop, and customize without writing a single line.', color: 'text-pink-600', bg: 'bg-pink-50' },
              { icon: ShoppingCart, title: 'Nepali Payments', desc: 'Native eSewa & Khalti integration. (Coming Soon)', color: 'text-primary-600', bg: 'bg-primary-50', badge: 'Beta' },
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { duration: 0.5, delay: i * 0.1 }
                  },
                  hover: { 
                    y: -10, 
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    transition: { duration: 0.2 }
                  }
                }}
                className="p-8 rounded-2xl bg-white border border-gray-100 hover:border-primary-100 transition-colors group"
              >
                <motion.div 
                  variants={{
                    hover: { 
                      scale: 1.1, 
                      rotate: [0, 10, -10, 5, 0],
                      transition: { duration: 0.5, ease: "easeInOut" }
                    }
                  }}
                  className={`w-14 h-14 rounded-2xl ${f.bg} flex items-center justify-center ${f.color} mb-6`}
                >
                  <f.icon className="w-7 h-7" />
                </motion.div>
                
                <div className="flex justify-between items-start">
                   <h3 className="text-xl font-bold mb-3 text-gray-900">{f.title}</h3>
                   {f.badge && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-100 text-primary-700 uppercase">{f.badge}</span>}
                </div>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Templates Section */}
      <section id="templates" className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
           <div className="flex flex-col md:flex-row justify-between items-end gap-6">
             <div>
               <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Start with a Sajilo Template</h2>
               <p className="text-gray-600 max-w-xl text-lg">Professionally crafted themes for Trekking Agencies, Hotels, Blogs, and E-commerce.</p>
             </div>
             <a href="#" className="text-primary-600 font-semibold flex items-center hover:gap-2 transition-all group">
                Browse all templates <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
             </a>
           </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
           <TemplateCarousel templates={TEMPLATES} />
        </div>
      </section>

      {/* 5. Dashboard Gallery / Visual Demo */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Powerful Dashboard</h2>
            <p className="text-gray-600">Manage everything from one simple place.</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-900">
             {/* Mock Browser Header */}
             <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-500"/>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                   <div className="w-3 h-3 rounded-full bg-green-500"/>
                </div>
                <div className="flex-1 text-center">
                   <div className="bg-gray-900 text-gray-400 text-xs py-1 px-4 rounded-md inline-block">dashboard.sewax.com</div>
                </div>
             </div>
             {/* Visual representation of dashboard (Static Mock) */}
             <div className="bg-gray-50 p-4 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 h-[500px] overflow-hidden">
                {/* Sidebar Mock */}
                <div className="hidden md:block col-span-1 bg-white rounded-xl border border-gray-200 p-4 space-y-4">
                   <div className="h-8 w-8 bg-primary-500 rounded-lg mb-8"></div>
                   {[1,2,3,4,5].map(i => <div key={i} className="h-8 w-full bg-gray-100 rounded-lg"></div>)}
                </div>
                {/* Main Content Mock */}
                <div className="col-span-3 space-y-6">
                   <div className="flex justify-between">
                      <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
                      <div className="h-8 w-24 bg-primary-100 rounded-lg"></div>
                   </div>
                   <div className="grid grid-cols-3 gap-4">
                      <div className="h-32 bg-white rounded-xl border border-gray-200 p-4">
                         <div className="h-4 w-20 bg-gray-100 rounded mb-4"></div>
                         <div className="h-8 w-32 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-32 bg-white rounded-xl border border-gray-200 p-4">
                         <div className="h-4 w-20 bg-gray-100 rounded mb-4"></div>
                         <div className="h-8 w-32 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-32 bg-white rounded-xl border border-gray-200 p-4">
                         <div className="h-4 w-20 bg-gray-100 rounded mb-4"></div>
                         <div className="h-8 w-32 bg-gray-200 rounded"></div>
                      </div>
                   </div>
                   <div className="h-64 bg-white rounded-xl border border-gray-200 p-6 flex items-end gap-2">
                       {[40, 60, 45, 70, 50, 80, 65, 85, 90, 60].map((h, i) => (
                          <div key={i} className="flex-1 bg-primary-500 opacity-20 hover:opacity-100 transition-opacity rounded-t-sm" style={{ height: `${h}%` }}></div>
                       ))}
                   </div>
                </div>
             </div>
             
             {/* Overlay CTA */}
             <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Button size="lg" className="shadow-2xl scale-110">Try Live Demo</Button>
             </div>
          </div>
        </div>
      </section>

      {/* 6. How To Start (Wizard) -> Now Steps Showcase */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <StartWizard />
        </div>
      </section>

      {/* 7. Use Cases */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">Built for everyone</h2>
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { title: 'Instructors', icon: Users, items: ['Sell courses', 'Student dashboard', 'Video hosting'] },
               { title: 'Local Business', icon: MapPin, items: ['Google Maps SEO', 'Contact forms', 'Service menu'] },
               { title: 'Agencies', icon: Code, items: ['White label', 'Client portal', 'Team seats'] },
             ].map((uc, i) => (
               <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl shadow-sm flex items-center justify-center mb-6 text-primary-600">
                    <uc.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{uc.title}</h3>
                  <ul className="space-y-3">
                     {uc.items.map((item, idx) => (
                       <li key={idx} className="flex items-center gap-2 text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {item}
                       </li>
                     ))}
                  </ul>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 8. Case Studies */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                 <span className="text-primary-500 font-bold uppercase tracking-wider text-sm mb-2 block">Case Study</span>
                 <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">How Everest Tea grew sales by 200%</h2>
                 <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                    "Before Sewax, we struggled with international payments and slow WordPress sites. 
                    Switching to Sewax automated our logistics and let us accept payments from 
                    Kathmandu to Kathmandu seamlessly."
                 </p>
                 <div className="flex gap-8 mb-8">
                    <div>
                       <p className="text-3xl font-bold text-white">200%</p>
                       <p className="text-gray-500 text-sm">Revenue Growth</p>
                    </div>
                    <div>
                       <p className="text-3xl font-bold text-white">0.8s</p>
                       <p className="text-gray-500 text-sm">Page Load Time</p>
                    </div>
                 </div>
                 <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">Read Story</Button>
              </div>
              <div className="relative">
                 <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                    <img src="https://picsum.photos/800/600?grayscale" alt="Case Study" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <button className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-transform border border-white/20">
                          <Play className="w-6 h-6 text-white ml-1" />
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 9. Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-6">Simple, Transparent Pricing</h2>
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm ${billingCycle === 'monthly' ? 'font-bold' : 'text-gray-500'}`}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                className="w-14 h-7 bg-primary-600 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${billingCycle === 'monthly' ? 'left-1' : 'left-8'}`}></div>
              </button>
              <span className={`text-sm ${billingCycle === 'yearly' ? 'font-bold' : 'text-gray-500'}`}>Yearly <span className="text-primary-600 text-xs font-bold bg-primary-50 px-2 py-0.5 rounded-full ml-1">-20%</span></span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan) => (
              <div key={plan.id} className={`relative p-8 rounded-2xl bg-white border ${plan.recommended ? 'border-primary-500 shadow-2xl shadow-primary-500/10 scale-105 z-10' : 'border-gray-200'}`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-3xl font-bold text-gray-900">NPR {billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly}</span>
                  <span className="text-gray-500 text-sm">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.recommended ? 'primary' : 'outline'} className="w-full">
                  Choose {plan.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">Trusted by Nepali Creators</h2>
           <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                 <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-6">
                       <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                       <div>
                          <p className="font-bold text-gray-900">{t.name}</p>
                          <p className="text-sm text-gray-500">{t.role}, {t.company}</p>
                       </div>
                    </div>
                    <p className="text-gray-600 italic">"{t.content}"</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* 11. Blog Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl font-display font-bold">Latest Resources</h2>
              <a href="#" className="text-primary-600 font-semibold hover:underline">View Blog</a>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post) => (
                 <div key={post.id} className="group cursor-pointer">
                    <div className="overflow-hidden rounded-2xl mb-4">
                       <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{post.category}</span>
                    <h3 className="text-xl font-bold mt-2 mb-2 group-hover:text-primary-600 transition-colors">{post.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-display font-bold text-center mb-12">Frequently Asked Questions</h2>
           <div className="space-y-4">
              {FAQS.map((faq, i) => (
                 <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                       <HelpCircle className="w-5 h-5 text-primary-500" />
                       {faq.question}
                    </h4>
                    <p className="text-gray-600 pl-7">{faq.answer}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* 13. Roadmap (Short) */}
      <section className="py-24 bg-white border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-8">Up Next on Sewax</h2>
            <div className="flex flex-wrap justify-center gap-4">
               {['🤖 AI Page Builder', '📱 Mobile App', '🛍️ Multi-vendor Marketplace', '🎨 Advanced Animations'].map((item, i) => (
                  <span key={i} className="px-6 py-3 rounded-full bg-gray-100 text-gray-600 font-medium border border-gray-200">
                     {item}
                  </span>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};