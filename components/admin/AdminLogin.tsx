
import React, { useState } from 'react';
import { Button } from '../Button';
import { Shield, Lock, AlertTriangle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase/client';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // ADMIN DEMO BYPASS
    if (email === 'admin@sewax.com' && password === 'admin123') {
       setTimeout(() => {
          navigate('/admin/dashboard');
       }, 500);
       return;
    }

    try {
      // 1. Authenticate with Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // 2. Check if user is super admin
      if (data.user) {
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      console.error("Admin Login Error", err);
      setError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/2 w-full h-full bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-neutral-800 border border-neutral-700 rounded-2xl shadow-2xl relative z-10 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-primary-600 to-purple-600 w-full"></div>
        
        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-neutral-700 rounded-2xl flex items-center justify-center mb-4 border border-neutral-600 shadow-inner">
               <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">System Admin</h1>
            <p className="text-neutral-400 text-sm mt-1">Restricted Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {error && (
               <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-3 text-xs text-red-200">
                  {error}
               </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-neutral-600"
                  placeholder="admin@sewax.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-neutral-600"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <Button 
              className="w-full bg-white text-neutral-900 hover:bg-neutral-200 font-bold"
              size="lg"
              isLoading={isLoading}
            >
              <Lock className="w-4 h-4 mr-2" />
              Authenticate
            </Button>
          </form>
          
          <div className="mt-8 text-center">
             <a href="/" className="text-neutral-500 hover:text-white text-xs transition-colors">← Return to Public Site</a>
          </div>
        </div>
      </div>
    </div>
  );
};
