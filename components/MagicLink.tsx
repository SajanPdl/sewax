import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';

interface MagicLinkProps {
  onSent?: (email: string) => void;
}

export const MagicLink: React.FC<MagicLinkProps> = ({ onSent }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSent(true);
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
      {sent ? (
        <motion.div
          className="text-center space-y-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
          <h2 className="text-xl font-bold">Check Your Email</h2>
          <p className="text-gray-600">
            We've sent a magic link to <strong>{email}</strong>. Click it to sign in instantly.
          </p>
          <button
            onClick={() => setSent(false)}
            className="text-primary-600 hover:underline text-sm"
          >
            Didn't receive it? Try another email
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <p className="text-xs text-gray-600">
            We'll send you a secure link to sign in without a password.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition-colors"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>

          <div className="text-center">
            <a href="#/login" className="text-primary-600 hover:underline text-sm font-medium">
              Back to Sign In
            </a>
          </div>
        </form>
      )}
    </motion.div>
  );
};
