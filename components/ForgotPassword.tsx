import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface ForgotPasswordProps {
  onSent?: (email: string) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSent }) => {
  const [step, setStep] = useState<'email' | 'reset' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('reset');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('success');
      onSent?.(email);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {step === 'email' && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
          <a href="#/login" className="text-center block text-primary-600 text-sm hover:underline">
            Back to Sign In
          </a>
        </form>
      )}

      {step === 'reset' && (
        <form onSubmit={handleResetSubmit} className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Enter a new password for your account.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Lock className="w-4 h-4 inline mr-2" />
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Lock className="w-4 h-4 inline mr-2" />
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}

      {step === 'success' && (
        <motion.div
          className="text-center space-y-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
          <h2 className="text-xl font-bold">Password Reset!</h2>
          <p className="text-gray-600">Your password has been successfully updated.</p>
          <a
            href="#/login"
            className="block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 rounded-lg text-center"
          >
            Sign In
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};
