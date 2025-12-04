import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';

type OnboardStep = 'company' | 'plan' | 'subdomain' | 'template' | 'payment' | 'confirm';

interface OnboardData {
  companyName: string;
  plan: 'starter' | 'professional' | 'enterprise';
  subdomain: string;
  template: string;
  paymentMethod: 'card' | 'esewa' | 'khalti';
}

export const Onboard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<OnboardStep>('company');
  const [data, setData] = useState<OnboardData>({
    companyName: '',
    plan: 'starter',
    subdomain: '',
    template: 'blank',
    paymentMethod: 'card',
  });

  const steps: OnboardStep[] = ['company', 'plan', 'subdomain', 'template', 'payment', 'confirm'];
  const currentStepIdx = steps.indexOf(currentStep);

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStep(steps[currentStepIdx + 1]);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStep(steps[currentStepIdx - 1]);
    }
  };

  const handleFinish = () => {
    console.log('Onboarding complete:', data);
    // Redirect to /app/sites
    window.location.hash = '#/app/sites';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, idx) => (
              <div key={step} className="flex items-center flex-1">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                    idx <= currentStepIdx
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  {idx < currentStepIdx ? <Check className="w-5 h-5" /> : idx + 1}
                </motion.div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      idx < currentStepIdx ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Company Name */}
            {currentStep === 'company' && (
              <motion.div
                key="company"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-2">What's your company name?</h2>
                <p className="text-gray-600 mb-6">We'll use this to set up your account.</p>
                <input
                  type="text"
                  value={data.companyName}
                  onChange={(e) => setData({ ...data, companyName: e.target.value })}
                  placeholder="Acme Inc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-6"
                />
              </motion.div>
            )}

            {/* Step 2: Plan Selection */}
            {currentStep === 'plan' && (
              <motion.div
                key="plan"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-2">Choose your plan</h2>
                <p className="text-gray-600 mb-6">You can upgrade anytime.</p>
                <div className="space-y-4">
                  {['starter', 'professional', 'enterprise'].map((plan) => (
                    <label key={plan} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                      <input
                        type="radio"
                        name="plan"
                        value={plan}
                        checked={data.plan === plan as any}
                        onChange={(e) => setData({ ...data, plan: e.target.value as any })}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 font-semibold text-gray-900 capitalize">{plan}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Subdomain */}
            {currentStep === 'subdomain' && (
              <motion.div
                key="subdomain"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-2">Choose your subdomain</h2>
                <p className="text-gray-600 mb-6">Your site will be available at subdomain.sewax.io</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={data.subdomain}
                    onChange={(e) => setData({ ...data, subdomain: e.target.value })}
                    placeholder="mysite"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="text-gray-600">.sewax.io</span>
                </div>
              </motion.div>
            )}

            {/* Step 4: Template */}
            {currentStep === 'template' && (
              <motion.div
                key="template"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-2">Pick a template</h2>
                <p className="text-gray-600 mb-6">You can customize it later.</p>
                <div className="grid grid-cols-2 gap-4">
                  {['blank', 'portfolio', 'shop', 'blog'].map((tmpl) => (
                    <label key={tmpl} className="flex flex-col items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                      <input
                        type="radio"
                        name="template"
                        value={tmpl}
                        checked={data.template === tmpl}
                        onChange={(e) => setData({ ...data, template: e.target.value })}
                        className="w-4 h-4"
                      />
                      <div className="w-20 h-20 bg-gray-200 rounded mt-2 mb-2"></div>
                      <span className="capitalize font-semibold text-gray-900">{tmpl}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 5: Payment Method */}
            {currentStep === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-2">Payment method</h2>
                <p className="text-gray-600 mb-6">Choose how you'd like to pay.</p>
                <div className="space-y-4">
                  {['card', 'esewa', 'khalti'].map((method) => (
                    <label key={method} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={data.paymentMethod === method as any}
                        onChange={(e) => setData({ ...data, paymentMethod: e.target.value as any })}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 font-semibold text-gray-900 capitalize">{method === 'card' ? 'Credit Card' : method.toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 6: Confirmation */}
            {currentStep === 'confirm' && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-2">Ready to go!</h2>
                <p className="text-gray-600 mb-6">Here's a summary of your setup:</p>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company:</span>
                    <span className="font-semibold">{data.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-semibold capitalize">{data.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subdomain:</span>
                    <span className="font-semibold">{data.subdomain}.sewax.io</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Template:</span>
                    <span className="font-semibold capitalize">{data.template}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={currentStepIdx === 0}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            {currentStepIdx < steps.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!data.companyName && currentStep === 'company'}
                className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Check className="w-5 h-5" />
                Complete Setup
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const OnboardWizard = Onboard;
export default Onboard;
