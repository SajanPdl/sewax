import React from 'react';
import { motion } from 'framer-motion';
import { Check, User, ShoppingBag, Palette, Truck, Globe, Rocket, Search, Menu as MenuIcon, BarChart3 } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: 'Register',
    description: "Click 'Get Started' in the navbar, fill out the form, pick a plan, and enjoy a 15-day free trial!",
    icon: User,
  },
  {
    id: 2,
    title: 'Add Products',
    description: "Upload your products easily by adding images, descriptions, and prices to showcase your offerings on your website!",
    icon: ShoppingBag,
  },
  {
    id: 3,
    title: 'Customize Your Website',
    description: "Customize your website by adding your logo and selecting brand theme colors to match your unique style and identity!",
    icon: Palette,
  },
  {
    id: 4,
    title: 'Setup Delivery Charges',
    description: "Set up delivery locations and customize pricing based on each area to ensure accurate shipping costs.",
    icon: Truck,
  },
  {
    id: 5,
    title: 'Connect Your Domain',
    description: "Connect your own custom domain to your website for a professional, branded online presence.",
    icon: Globe,
  },
  {
    id: 6,
    title: 'Publish & Grow',
    description: "Launch your site to the world, track analytics, and watch your business grow with built-in SEO tools.",
    icon: Rocket,
  },
];

// --- Mock UI Components ---

const MockWindow = ({ children, title = "Sewax Dashboard" }: { children?: React.ReactNode, title?: string }) => (
  <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden w-full max-w-md mx-auto transform transition-transform hover:scale-[1.02] duration-500">
    <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
      </div>
      <div className="flex-1 text-center text-[10px] text-gray-400 font-mono">{title}</div>
    </div>
    <div className="p-6 relative overflow-hidden h-64 bg-white">
      {children}
    </div>
  </div>
);

const RegisterMock = () => (
  <MockWindow title="Sign Up">
    <div className="space-y-4 max-w-xs mx-auto mt-2">
      <div className="text-center mb-6">
        <div className="w-8 h-8 bg-primary-500 rounded-lg mx-auto mb-2"></div>
        <div className="h-2 w-24 bg-gray-200 rounded mx-auto"></div>
      </div>
      <div className="space-y-2">
        <div className="h-8 w-full bg-gray-50 border border-gray-100 rounded px-2 flex items-center text-xs text-gray-400">Full Name</div>
        <div className="h-8 w-full bg-gray-50 border border-gray-100 rounded px-2 flex items-center text-xs text-gray-400">Email Address</div>
        <div className="h-8 w-full bg-primary-500 rounded text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-primary-500/20">Create Account</div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
      </div>
    </div>
    {/* Decorative blur */}
    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
  </MockWindow>
);

const ProductsMock = () => (
  <MockWindow title="Products">
    <div className="flex items-center justify-between mb-4">
       <div className="h-4 w-20 bg-gray-200 rounded"></div>
       <div className="h-6 w-16 bg-primary-500 rounded text-[10px] text-white flex items-center justify-center">+ Add</div>
    </div>
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 p-2 border border-gray-50 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 bg-gray-100 rounded-md"></div>
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-24 bg-gray-200 rounded"></div>
            <div className="h-2 w-12 bg-gray-100 rounded"></div>
          </div>
          <div className="h-4 w-12 bg-green-50 rounded text-[9px] flex items-center justify-center text-green-600 font-medium">NPR 1500</div>
        </div>
      ))}
    </div>
  </MockWindow>
);

const CustomizeMock = () => (
  <MockWindow title="Theme Editor">
    <div className="flex h-full -m-6">
      <div className="w-16 bg-gray-50 border-r border-gray-100 p-3 space-y-4 flex flex-col items-center">
        <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center"><MenuIcon size={12} className="text-gray-400"/></div>
        <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-center"><Palette size={12} className="text-primary-500"/></div>
        <div className="w-8 h-8 rounded-lg bg-white border border-gray-200"></div>
      </div>
      <div className="flex-1 p-4 bg-gray-50/50">
         <div className="mb-4">
           <div className="text-[10px] font-bold text-gray-500 uppercase mb-2">Brand Color</div>
           <div className="flex gap-2">
             <div className="w-6 h-6 rounded-full bg-primary-500 ring-2 ring-offset-1 ring-primary-500"></div>
             <div className="w-6 h-6 rounded-full bg-blue-500 opacity-30"></div>
             <div className="w-6 h-6 rounded-full bg-purple-500 opacity-30"></div>
           </div>
         </div>
         <div className="p-3 bg-white rounded border border-gray-200 shadow-sm">
            <div className="h-2 w-16 bg-primary-500 rounded mb-2"></div>
            <div className="h-16 bg-gray-100 rounded mb-2"></div>
            <div className="h-2 w-full bg-gray-100 rounded"></div>
         </div>
      </div>
    </div>
  </MockWindow>
);

const DeliveryMock = () => (
  <MockWindow title="Delivery Settings">
    <div className="space-y-4">
       <div className="flex items-center gap-2 mb-2 border-b border-gray-100 pb-2">
          <Truck size={14} className="text-gray-400" />
          <span className="text-xs font-bold text-gray-700">Shipping Zones</span>
       </div>
       <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
         <div className="flex bg-gray-50 p-2 text-[10px] text-gray-500 font-medium">
           <div className="flex-1">Region</div>
           <div className="w-16 text-right">Cost</div>
         </div>
         <div className="p-2 flex items-center text-xs border-b border-gray-50">
           <div className="flex-1 font-medium">Kathmandu Valley</div>
           <div className="w-16 text-right text-gray-600">Free</div>
         </div>
         <div className="p-2 flex items-center text-xs border-b border-gray-50">
           <div className="flex-1 font-medium">Pokhara</div>
           <div className="w-16 text-right text-gray-600">Rs. 150</div>
         </div>
         <div className="p-2 flex items-center text-xs">
           <div className="flex-1 font-medium">All Nepal</div>
           <div className="w-16 text-right text-gray-600">Rs. 300</div>
         </div>
       </div>
    </div>
  </MockWindow>
);

const DomainMock = () => (
  <MockWindow title="Domains">
     <div className="flex flex-col h-full justify-center items-center text-center space-y-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
           <Globe size={20} className="text-green-600" />
        </div>
        <div>
           <div className="text-sm font-bold text-gray-900">mystore.com</div>
           <div className="text-xs text-green-600 flex items-center justify-center gap-1">
             <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
             Connected & Secured
           </div>
        </div>
        <div className="w-full bg-gray-50 p-3 rounded-lg border border-dashed border-gray-200 mt-4">
           <div className="h-2 w-1/2 bg-gray-200 rounded mx-auto mb-2"></div>
           <div className="h-2 w-1/3 bg-gray-200 rounded mx-auto"></div>
        </div>
     </div>
  </MockWindow>
);

const PublishMock = () => (
  <MockWindow title="Analytics">
     <div className="space-y-4">
        <div className="flex justify-between items-center">
           <div className="text-xs font-bold text-gray-700">Live Visitors</div>
           <div className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">Active</div>
        </div>
        <div className="h-32 flex items-end gap-1 pb-2 border-b border-gray-100">
           {[30, 45, 35, 60, 50, 75, 60, 80, 70, 90, 85, 100].map((h, i) => (
             <div key={i} className="flex-1 bg-primary-500 rounded-t-sm opacity-80" style={{ height: `${h}%` }}></div>
           ))}
        </div>
        <div className="flex justify-between text-[10px] text-gray-400">
           <span>00:00</span>
           <span>12:00</span>
           <span>23:59</span>
        </div>
     </div>
  </MockWindow>
);

const StepImage = ({ stepId }: { stepId: number }) => {
  switch (stepId) {
    case 1: return <RegisterMock />;
    case 2: return <ProductsMock />;
    case 3: return <CustomizeMock />;
    case 4: return <DeliveryMock />;
    case 5: return <DomainMock />;
    case 6: return <PublishMock />;
    default: return <RegisterMock />;
  }
};

export const StartWizard: React.FC = () => {
  return (
    <div className="w-full">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6">
          <span className="text-primary-600">6 Easy Steps</span> to Start with Sewax
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Get your online business up and running in minutes with our simple, step-by-step process designed for Nepal.
        </p>
      </div>

      <div className="space-y-24">
        {STEPS.map((step, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isEven ? '' : 'md:flex-row-reverse'}`}
            >
              {/* Text Side */}
              <div className="flex-1 text-center md:text-left">
                <div className={`w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 mx-auto ${isEven ? 'md:mx-0' : 'md:ml-auto md:mr-0'}`}>
                   <span className="font-display font-bold text-xl">{step.id}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Image/Mock Side */}
              <div className="flex-1 w-full relative">
                 {/* Connecting Line (Decor) */}
                 {index !== STEPS.length - 1 && (
                   <div className={`hidden md:block absolute -bottom-32 ${isEven ? 'left-1/2' : 'right-1/2'} w-0.5 h-24 bg-gradient-to-b from-primary-200 to-transparent z-0`}></div>
                 )}
                 <div className="relative z-10">
                    <StepImage stepId={step.id} />
                 </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};