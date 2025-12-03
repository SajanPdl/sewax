import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft, Mail, Lock, Github } from 'lucide-react';

interface SignInProps {
  onLogin: () => void;
}

export const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left Panel - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-primary-600 p-12 text-white flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-accent-gradient opacity-90"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-600 font-bold font-display shadow-lg">S</div>
             <span className="font-display font-bold text-2xl tracking-tight">Sewax</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
            Build your digital empire, <br/>made in Nepal.
          </h1>
          <p className="text-primary-100 text-lg max-w-md">
            Join 1,200+ creators selling courses, services, and products with Sewax.
          </p>
        </div>

        <div className="relative z-10 flex gap-4 text-sm text-primary-100">
          <span>© 2024 Sewax Inc.</span>
          <span>Privacy Policy</span>
          <span>Terms</span>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 relative">
         <a href="/" className="absolute top-6 left-6 md:top-8 md:left-8 text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
         </a>

         <div className="w-full max-w-md space-y-8">
            <div className="text-center md:text-left">
               <div className="md:hidden flex justify-center mb-6">
                 <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold font-display shadow-lg">S</div>
               </div>
               <h2 className="text-3xl font-bold font-display text-gray-900">Welcome Back</h2>
               <p className="text-gray-500 mt-2">Enter your details to access your dashboard.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                     <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                     <input 
                       type="email" 
                       required
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                       placeholder="you@example.com"
                     />
                  </div>
               </div>

               <div>
                  <div className="flex justify-between items-center mb-1">
                     <label className="block text-sm font-medium text-gray-700">Password</label>
                     <a href="#" className="text-xs font-semibold text-primary-600 hover:text-primary-700">Forgot Password?</a>
                  </div>
                  <div className="relative">
                     <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                     <input 
                       type="password" 
                       required
                       className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                       placeholder="••••••••"
                       defaultValue="password"
                     />
                  </div>
               </div>

               <Button className="w-full py-3" size="lg" isLoading={isLoading}>Sign In</Button>
            </form>

            <div className="relative">
               <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
               </div>
               <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
               </button>
               <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
               </button>
            </div>

            <p className="text-center text-sm text-gray-600">
               Don't have an account? <a href="#" className="font-semibold text-primary-600 hover:text-primary-500">Sign up for free</a>
            </p>
         </div>
      </div>
    </div>
  );
};