import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: { label: string; included: boolean }[];
  cta: string;
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    description: 'Perfect for beginners',
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      { label: '1 Site', included: true },
      { label: '50 GB Storage', included: true },
      { label: '1 Team Member', included: true },
      { label: '100 Templates', included: true },
      { label: 'Email Support', included: true },
      { label: 'Custom Domain', included: false },
      { label: 'Advanced Analytics', included: false },
      { label: 'API Access', included: false },
    ],
    cta: 'Start Free',
  },
  {
    name: 'Professional',
    description: 'For growing businesses',
    monthlyPrice: 79,
    yearlyPrice: 790,
    features: [
      { label: '10 Sites', included: true },
      { label: '500 GB Storage', included: true },
      { label: '5 Team Members', included: true },
      { label: 'All Templates', included: true },
      { label: 'Priority Support', included: true },
      { label: 'Custom Domain', included: true },
      { label: 'Advanced Analytics', included: true },
      { label: 'API Access', included: false },
    ],
    cta: 'Subscribe',
  },
  {
    name: 'Enterprise',
    description: 'For large teams',
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: [
      { label: 'Unlimited Sites', included: true },
      { label: 'Unlimited Storage', included: true },
      { label: 'Unlimited Team Members', included: true },
      { label: 'All Templates', included: true },
      { label: '24/7 Phone Support', included: true },
      { label: 'Custom Domain', included: true },
      { label: 'Advanced Analytics', included: true },
      { label: 'API Access', included: true },
    ],
    cta: 'Contact Sales',
  },
];

const FAQS = [
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Yes, you can change your plan at any time. Changes take effect immediately with prorated billing.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'We offer a 30-day money-back guarantee on annual plans. Monthly plans can be cancelled anytime.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, eSewa, Khalti, and bank transfers for organizations in Nepal.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes, the Starter plan is free for 14 days with full access to all features.',
  },
];

export const Pricing: React.FC = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const savings = Math.round((1 - (790 / (79 * 12))) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your business. Always flexible to scale.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium ${billing === 'monthly' ? 'text-gray-900' : 'text-gray-600'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-300"
            >
              <span
                className={`${
                  billing === 'yearly' ? 'translate-x-7' : 'translate-x-1'
                } inline-block h-6 w-6 transform rounded-full bg-white transition-transform`}
              />
            </button>
            <span className={`text-sm font-medium ${billing === 'yearly' ? 'text-gray-900' : 'text-gray-600'}`}>
              Yearly
            </span>
            {billing === 'yearly' && (
              <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                Save {savings}%
              </span>
            )}
          </div>

          {/* Promo Code Section */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-700">
              Use code <span className="font-bold text-primary-600">NEPAL2024</span> for 20% off annual plans
            </p>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={idx}
              className={`rounded-xl border-2 p-8 ${
                idx === 1
                  ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-white shadow-xl'
                  : 'border-gray-200 bg-white shadow-lg'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {idx === 1 && (
                <div className="mb-4 inline-block bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${billing === 'monthly' ? plan.monthlyPrice : Math.round(plan.yearlyPrice / 12)}
                </span>
                <span className="text-gray-600 text-sm ml-2">
                  per month{billing === 'yearly' ? ' (billed yearly)' : ''}
                </span>
              </div>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-lg font-semibold mb-8 transition-colors ${
                  idx === 1
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'border-2 border-gray-300 hover:border-gray-400 text-gray-900'
                }`}
              >
                {plan.cta}
              </button>

              {/* Features */}
              <div className="space-y-4">
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-900' : 'text-gray-400'}>
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trial Info */}
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Start Your Free Trial</h3>
          <p className="text-blue-800">
            Try any plan free for 14 days. No credit card required. Full access to all features.
          </p>
        </motion.div>

        {/* FAQs */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-4 font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  {faq.q}
                  <span className={`transform transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {expandedFaq === idx && (
                  <motion.div
                    className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-gray-700"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
