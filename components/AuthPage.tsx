import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Chrome, Github } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { MagicLink } from './MagicLink';
import { ForgotPassword } from './ForgotPassword';

interface SignInProps {
  onLogin: () => void;
}

type AuthMode = 'login' | 'signup' | 'magic-link' | 'forgot-password';

export const SignInNew: React.FC<SignInProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);

  const handleSuccess = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin();
      navigate('/app');
    }, 800);
  };

  const handleOAuthClick = (provider: 'google' | 'github') => {
    setLoading(true);
    // Placeholder: redirect to OAuth provider
    console.log(`OAuth with ${provider}`);
    setTimeout(() => {
      handleSuccess();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
            S
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Sewax</h1>
          <p className="text-gray-600 text-sm mt-1">Website Builder for Nepal</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          {mode === 'login' && (
            <LoginForm onSuccess={handleSuccess} />
          )}
          {mode === 'signup' && (
            <SignUpForm onSuccess={handleSuccess} />
          )}
          {mode === 'magic-link' && (
            <MagicLink onSent={handleSuccess} />
          )}
          {mode === 'forgot-password' && (
            <ForgotPassword onSent={handleSuccess} />
          )}
        </div>

        {/* OAuth Options */}
        {(mode === 'login' || mode === 'signup') && (
          <div className="space-y-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleOAuthClick('google')}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100"
              >
                <Chrome className="w-4 h-4" />
                <span className="text-sm font-medium">Google</span>
              </button>
              <button
                onClick={() => handleOAuthClick('github')}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm font-medium">GitHub</span>
              </button>
            </div>
          </div>
        )}

        {/* Mode Switcher */}
        <div className="text-center text-sm text-gray-600 space-y-2">
          {mode === 'login' && (
            <>
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-primary-600 hover:underline font-medium"
                >
                  Sign Up
                </button>
              </p>
            </>
          )}
          {mode === 'signup' && (
            <>
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-primary-600 hover:underline font-medium"
                >
                  Sign In
                </button>
              </p>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-gray-600 hover:text-gray-900 text-xs flex items-center justify-center gap-1 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Home
          </a>
        </div>
      </motion.div>
    </div>
  );
};
