import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import { Button } from './Button';
import { ArrowLeft, Mail, Lock, Loader2, PlayCircle, Store, Briefcase, Coffee, User, Globe } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SignIn: React.FC<{ onLogin?: () => void }> = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true); // Default to signup for onboarding flow
  const [error, setError] = useState<string | null>(null);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [businessType, setBusinessType] = useState('');
  const [templateId, setTemplateId] = useState<string | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if redirecting from template selection
    const tid = searchParams.get('templateId');
    if (tid) {
        setTemplateId(tid);
        setIsSignUp(true);
    }
    
    // If user explicitly clicks "Login" link elsewhere, set isSignUp false
    if (window.location.hash.includes('login') && !tid) {
        // Simple heuristic, though router handles path
    }
  }, [searchParams]);

  const handleDemoLogin = () => {
     setIsLoading(true);
     setTimeout(() => {
        localStorage.setItem('sewax-demo-mode', 'true');
        window.location.href = '/#/dashboard';
        window.location.reload();
     }, 800);
  };

  const businessTypes = [
    { id: 'E-commerce', label: 'Online Store', icon: Store, desc: 'Sell products & manage inventory' },
    { id: 'Agency', label: 'Agency / Business', icon: Briefcase, desc: 'Portfolio & Lead generation' },
    { id: 'Restaurant', label: 'Restaurant / Cafe', icon: Coffee, desc: 'Menu & Table management' },
    { id: 'Service', label: 'Consultancy / Service', icon: User, desc: 'Appointments & Booking' },
    { id: 'General', label: 'Other / Personal', icon: Globe, desc: 'Blog or Personal site' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // DEMO SHORTCUTS
    if (email === 'admin@sewax.com' && password === 'admin123') {
       navigate('/admin/dashboard');
       setIsLoading(false);
       return;
    }
    if (email === 'demo@sewax.com' && password === 'demo123') {
       handleDemoLogin();
       return;
    }

    try {
      if (isSignUp) {
        // Sign Up Flow
        const { data, error } = await (supabase.auth as any).signUp({
          email,
          password,
          options: {
            data: {
              full_name: email.split('@')[0], 
              company_name: `${email.split('@')[0]}'s Site`,
              business_type: businessType || 'General', // Store this meta for triggers
              selected_template_id: templateId
            }
          }
        });
        
        if (error) throw error;
        
        // In a real app, triggers create the tenant. 
        // Here we alert or auto-login if email confirm is disabled in Supabase config
        if (data.session) {
            // Auto logged in (email confirm disabled)
            navigate('/dashboard');
        } else {
            alert('Account created! Please check your email to verify.');
            setIsSignUp(false); // Switch to sign in
        }

      } else {
        // Sign In Flow
        const { data, error } = await (supabase.auth as any).signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        if (data.session) {
           navigate('/dashboard');
        }
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Step 1: Business Type Selection (Onboarding) ---
  if (isSignUp && onboardingStep === 1) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">S</div>
                        <span className="font-bold text-xl text-gray-900">Sewax</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">What are you building today?</h2>
                    <p className="text-gray-500">We'll customize your dashboard based on your choice.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {businessTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => {
                                setBusinessType(type.id);
                                setOnboardingStep(2);
                            }}
                            className="flex flex-col items-center p-6 border-2 border-gray-100 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all text-center group"
                        >
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-500 group-hover:bg-white group-hover:text-primary-600 transition-colors">
                                <type.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{type.label}</h3>
                            <p className="text-xs text-gray-500">{type.desc}</p>
                        </button>
                    ))}
                </div>

                <div className="text-center">
                    <button 
                        onClick={() => { setIsSignUp(false); setOnboardingStep(1); }}
                        className="text-sm text-gray-600 hover:text-primary-600 underline"
                    >
                        Already have an account? Sign In
                    </button>
                </div>
            </div>
        </div>
      );
  }

  // --- Step 2: Account Creation OR Sign In ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          {isSignUp && (
              <button 
                onClick={() => setOnboardingStep(1)} 
                className="mb-4 text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm"
              >
                  <ArrowLeft className="w-4 h-4" /> Back to Type
              </button>
          )}
          
          <div className="text-center mb-6">
             <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold mx-auto mb-3">S</div>
             <h2 className="text-2xl font-bold text-gray-900">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
             </h2>
             {isSignUp && businessType && (
                 <span className="inline-block bg-primary-50 text-primary-700 text-xs font-bold px-2 py-1 rounded-full mb-2">
                     Building for {businessType}
                 </span>
             )}
             <p className="text-gray-500 text-sm">
                {isSignUp ? 'Start your 14-day free trial' : 'Manage your business'}
             </p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="name@company.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <Button className="w-full" isLoading={isLoading} type="submit">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-gray-100">
             <button 
                onClick={handleDemoLogin}
                className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg text-sm flex items-center justify-center gap-2 transition-colors border border-gray-200"
             >
                <PlayCircle className="w-4 h-4 text-primary-600" />
                Enter Demo Mode
             </button>
          </div>
          
          <button 
            onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
            className="w-full mt-4 text-sm text-gray-600 hover:text-primary-600 text-center"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
       </div>
    </div>
  );
};