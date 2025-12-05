
import React, { useState } from 'react';
import { Button } from '../Button';
import { Shield, Lock, AlertTriangle, Info } from 'lucide-react';
import { useHistory } from 'react-router-dom';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@sewax.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth check
    setTimeout(() => {
      setIsLoading(false);
      history.push('/admin/dashboard');
    }, 1500);
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
            <p className="text-neutral-400 text-sm mt-1">Restricted Access Level 5</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Demo Credentials Box */}
            <div className="bg-blue-900/20 border border-blue-900/50 rounded-lg p-3 flex gap-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-blue-200">
                <p className="font-bold mb-1">Test Credentials:</p>
                <p>Email: <span className="font-mono text-blue-100">admin@sewax.com</span></p>
                <p>Password: <span className="font-mono text-blue-100">admin123</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">System ID / Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-neutral-600"
                  placeholder="admin@sewax.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Access Key</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-neutral-600"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
               <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
               <p className="text-xs text-yellow-200">
                  This area is monitored. IP address logged: 192.168.1.1
               </p>
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
