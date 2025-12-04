import React, { useState } from 'react';
import { Shield, Users, CreditCard, BarChart3, Ticket, Settings, Lock } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [tab, setTab] = useState<'tenants' | 'plans' | 'payments' | 'support'>('tenants');
  const [tenants] = useState([
    { id: '1', name: 'Acme Inc', email: 'contact@acme.com', status: 'active', joined: '2024-10-01' },
    { id: '2', name: 'TechStart', email: 'hello@techstart.com', status: 'active', joined: '2024-11-15' },
    { id: '3', name: 'Old Co', email: 'admin@oldco.com', status: 'suspended', joined: '2024-08-01' },
  ]);

  const [plans] = useState([
    { id: '1', name: 'Starter', price: 29, sites: 1, users: 1 },
    { id: '2', name: 'Professional', price: 79, sites: 10, users: 5 },
    { id: '3', name: 'Enterprise', price: 199, sites: -1, users: -1 },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-6 h-6 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900">Super Admin Panel</h1>
        </div>
        <p className="text-sm text-gray-600">⚠️ Restricted to super-admin only. Full system management.</p>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <div className="border-b border-gray-200 flex gap-8 mb-6">
          {[
            { id: 'tenants', label: 'Tenants', icon: Users },
            { id: 'plans', label: 'Plans & Coupons', icon: CreditCard },
            { id: 'payments', label: 'Payments & Payouts', icon: BarChart3 },
            { id: 'support', label: 'Support & Tickets', icon: Ticket },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id as any)}
              className={`pb-3 font-semibold text-sm flex items-center gap-2 border-b-2 transition-colors ${
                tab === id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tenants Tab */}
        {tab === 'tenants' && (
          <div className="space-y-6">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search tenants..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold">
                Search
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-3 font-semibold text-gray-900">Tenant Name</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-900">Email</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-900">Status</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-900">Joined</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tenants.map((t) => (
                    <tr key={t.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3 font-semibold text-gray-900">{t.name}</td>
                      <td className="px-6 py-3 text-gray-600">{t.email}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            t.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-600">{t.joined}</td>
                      <td className="px-6 py-3">
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold mr-3">
                          View
                        </button>
                        {t.status === 'active' ? (
                          <button className="text-red-600 hover:text-red-700 text-sm font-semibold">
                            Suspend
                          </button>
                        ) : (
                          <button className="text-green-600 hover:text-green-700 text-sm font-semibold">
                            Restore
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Plans Tab */}
        {tab === 'plans' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div key={plan.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-2xl font-bold text-primary-600 mb-4">${plan.price}/mo</p>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>• Sites: {plan.sites === -1 ? 'Unlimited' : plan.sites}</p>
                    <p>• Users: {plan.users === -1 ? 'Unlimited' : plan.users}</p>
                  </div>
                  <button className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-semibold hover:bg-gray-50">
                    Edit Plan
                  </button>
                </div>
              ))}
            </div>

            {/* Coupons */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Active Coupons</h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">NEPAL2024</p>
                    <p className="text-xs text-gray-600">20% off annual plans</p>
                  </div>
                  <button className="text-red-600 hover:text-red-700 text-sm font-semibold">
                    Disable
                  </button>
                </div>
              </div>
              <button className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-sm">
                Create Coupon
              </button>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {tab === 'payments' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <p className="text-gray-600 text-sm mb-1">Total Revenue (Month)</p>
                <p className="text-3xl font-bold text-gray-900">$12,450</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <p className="text-gray-600 text-sm mb-1">Pending Payouts</p>
                <p className="text-3xl font-bold text-primary-600">$3,200</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <p className="text-gray-600 text-sm mb-1">Active Subscriptions</p>
                <p className="text-3xl font-bold text-gray-900">42</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Payment Methods</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p>• Stripe: Primary payment processor</p>
                <p>• eSewa: Nepali payment gateway (integrated)</p>
                <p>• Khalti: Digital wallet (integrated)</p>
                <button className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-sm">
                  Payout Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Support Tab */}
        {tab === 'support' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-600 text-sm">Open</p>
                <p className="text-2xl font-bold text-orange-600">8</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-600 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">5</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-600 text-sm">Resolved</p>
                <p className="text-2xl font-bold text-green-600">42</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-600 text-sm">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">2.3h</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Recent Support Tickets</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">Unable to add custom domain</p>
                    <p className="text-xs text-gray-600">Ticket #T-001 • Acme Inc</p>
                  </div>
                  <span className="text-orange-600 font-semibold text-xs">Open</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
