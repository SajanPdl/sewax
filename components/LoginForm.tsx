import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onSuccess?: (email: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Placeholder: Send login request
      await new Promise(resolve => setTimeout(resolve, 1200));
      onSuccess?.(email);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Email */}
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

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Lock className="w-4 h-4 inline mr-2" />
          Password
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

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition-colors"
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>

      {/* Links */}
      <div className="flex items-center justify-between text-sm">
        <a href="#/forgot-password" className="text-primary-600 hover:underline">
          Forgot Password?
        </a>
        <a href="#/signup" className="text-primary-600 hover:underline font-medium">
          Create Account
        </a>
      </div>

      {/* Magic Link Option */}
      <div className="border-t pt-4">
        <p className="text-xs text-gray-600 text-center mb-2">Or</p>
        <a
          href="#/magic-link"
          className="block text-center text-primary-600 hover:underline text-sm font-medium"
        >
          Sign In with Magic Link
        </a>
      </div>
    </motion.form>
  );
};
