
import React, { useState } from 'react';
import { supabase } from '../lib/supabase/client';
import { Button } from './Button';
import { ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SignIn: React.FC<{ onLogin?: () => void }> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // Sign Up Flow
        const { error } = await (supabase.auth as any).signUp({
          email,
          password,
          options: {
            data: {
              full_name: email.split('@')[0], 
              company_name: `${email.split('@')[0]}'s Store`
            }
          }
        });
        if (error) throw error;
        alert('Account created! Please check your email to verify.');
        setIsSignUp(false); // Switch to sign in view
      } else {
        // Sign In Flow
        const { data, error } = await (supabase.auth as any).signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        if (data.session) {
           // Explicitly navigate to dashboard on success
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="flex items-center gap-2 mb-6 justify-center cursor-pointer" onClick={() => navigate('/')}>
             <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">S</div>
             <span className="font-bold text-xl text-gray-900">Sewax</span>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">
            {isSignUp ? 'Create your Store' : 'Welcome Back'}
          </h2>
          <p className="text-gray-500 text-center text-sm mb-6">
            {isSignUp ? 'Start your 14-day free trial' : 'Manage your business'}
          </p>
          
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
            <Button className="w-full" isLoading={isLoading}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>
          
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full mt-4 text-sm text-gray-600 hover:text-primary-600 text-center"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
       </div>
    </div>
  );
};
