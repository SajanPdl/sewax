import React, { useState } from 'react';
import { CreditCard, Download, Plus, Trash2 } from 'lucide-react';

export const BillingDashboard: React.FC = () => {
  const [invoices] = useState([
    { id: 'INV-001', date: '2024-12-01', amount: '$79.00', status: 'paid' },
    { id: 'INV-002', date: '2024-11-01', amount: '$79.00', status: 'paid' },
    { id: 'INV-003', date: '2024-10-01', amount: '$79.00', status: 'paid' },
  ]);

  const [paymentMethods] = useState([
    { id: '1', brand: 'Visa', last4: '4242', expiry: '12/25' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-600">Manage your subscription and payments.</p>
      </div>

      {/* Current Plan */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Current Plan</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Plan</p>
            <p className="text-2xl font-bold text-gray-900">Professional</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Billing Cycle</p>
            <p className="text-2xl font-bold text-gray-900">$79 / month</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Next Billing Date</p>
            <p className="text-2xl font-bold text-gray-900">Jan 1, 2025</p>
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold">
            Upgrade Plan
          </button>
          <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-900 rounded-lg font-semibold">
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Payment Methods</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-semibold">
            <Plus className="w-4 h-4" />
            Add Card
          </button>
        </div>
        <div className="space-y-3">
          {paymentMethods.map((pm) => (
            <div key={pm.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-semibold text-gray-900">{pm.brand} •••• {pm.last4}</p>
                  <p className="text-sm text-gray-600">Expires {pm.expiry}</p>
                </div>
              </div>
              <button className="text-red-600 hover:text-red-700">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Payment Methods Info for Nepal */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900 mb-3 font-semibold">Alternative Payment Methods (Nepal):</p>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• <strong>eSewa:</strong> Available for Nepali users. Redirected payment flow.</p>
            <p>• <strong>Khalti:</strong> Digital wallet supported. Integration for direct checkout.</p>
            <p>• <strong>Bank Transfer:</strong> For enterprise customers. Contact support.</p>
          </div>
        </div>
      </div>

      {/* Coupons / Credits */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Coupons & Credits</h2>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold">
            Apply
          </button>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-600">
          <p className="text-sm">No active coupons or credits.</p>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Invoices</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-gray-600 font-semibold">Invoice</th>
                <th className="text-left py-3 text-gray-600 font-semibold">Date</th>
                <th className="text-left py-3 text-gray-600 font-semibold">Amount</th>
                <th className="text-left py-3 text-gray-600 font-semibold">Status</th>
                <th className="text-left py-3 text-gray-600 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 font-semibold text-gray-900">{inv.id}</td>
                  <td className="py-3 text-gray-600">{inv.date}</td>
                  <td className="py-3 text-gray-900 font-semibold">{inv.amount}</td>
                  <td className="py-3">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-primary-600 hover:text-primary-700 flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refund Policy */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-bold text-yellow-900 mb-2">Refund Request</h3>
        <p className="text-sm text-yellow-800 mb-4">
          Have an issue? We offer a 30-day money-back guarantee on annual plans.
        </p>
        <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold text-sm">
          Request Refund
        </button>
      </div>
    </div>
  );
};

export default BillingDashboard;
