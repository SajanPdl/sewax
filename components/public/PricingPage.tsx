
import React, { useState } from 'react';
import { Button } from '../Button';
import { PRICING_PLANS } from '../../constants';
import { CheckCircle } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="pt-24 pb-16 bg-white dark:bg-neutral-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">Simple Pricing</h1>
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              className="w-14 h-7 bg-primary-600 rounded-full relative transition-colors focus:outline-none"
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${billingCycle === 'monthly' ? 'left-1' : 'left-8'}`}></div>
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-500'}`}>Yearly <span className="text-primary-600 text-xs font-bold bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded-full ml-1">-20%</span></span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => (
            <div key={plan.id} className={`relative p-8 rounded-2xl bg-white dark:bg-neutral-800 border ${plan.recommended ? 'border-primary-500 shadow-xl' : 'border-gray-200 dark:border-neutral-700'}`}>
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">NPR {billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly}</span>
                <span className="text-gray-500 text-sm">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button variant={plan.recommended ? 'primary' : 'outline'} className="w-full">
                Choose {plan.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
