import React, { useState } from 'react';
import { User, Lock, Shield, LogOut, Mail, Phone } from 'lucide-react';

export const AccountTeamPage: React.FC = () => {
  const [tab, setTab] = useState<'profile' | 'team' | 'security'>('profile');
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'john@example.com', phone: '+977-1-234-5678' });
  const [teamMembers] = useState([
    { id: '1', name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
    { id: '2', name: 'Bob Wilson', email: 'bob@example.com', role: 'editor' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account & Team</h1>
        <p className="text-gray-600">Manage your profile, team, and security settings.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 flex gap-8">
        {['profile', 'team', 'security'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`py-3 font-semibold text-sm transition-colors border-b-2 ${
              tab === t ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {tab === 'profile' && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              value={profile.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              disabled
            />
            <p className="text-xs text-gray-600 mt-1">To change email, contact support.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone (Nepal)
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="+977-1-234-5678"
            />
          </div>

          <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold">
            Save Changes
          </button>
        </div>
      )}

      {/* Team Tab */}
      {tab === 'team' && (
        <div className="space-y-6">
          {/* Invite Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Invite Team Member</h3>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="colleague@example.com"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>Editor</option>
                <option>Viewer</option>
                <option>Admin</option>
              </select>
              <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold">
                Invite
              </button>
            </div>
          </div>

          {/* Team Members List */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Team Members</h3>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <select defaultValue={member.role} className="px-3 py-1 border border-gray-300 rounded text-sm">
                      <option value="viewer">Viewer</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button className="text-red-600 hover:text-red-700 font-semibold text-sm">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Role Permissions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Role Permissions</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-semibold text-gray-900 mb-1">Owner</p>
                <p className="text-gray-600">Full access. Cannot be removed.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-semibold text-gray-900 mb-1">Admin</p>
                <p className="text-gray-600">Can manage sites, team, and billing.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-semibold text-gray-900 mb-1">Editor</p>
                <p className="text-gray-600">Can create and edit sites.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-semibold text-gray-900 mb-1">Viewer</p>
                <p className="text-gray-600">Read-only access to sites and analytics.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {tab === 'security' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Change Password
            </h3>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="New password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold">
                Update Password
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Two-Factor Authentication
            </h3>
            <p className="text-gray-600 mb-4">Add an extra layer of security to your account.</p>
            <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold">
              Enable 2FA
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <LogOut className="w-5 h-5" />
              Session Activity
            </h3>
            <p className="text-gray-600 mb-4">View and log out from other sessions.</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Current Session - Chrome on Mac</span>
                <span className="text-green-600 font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountTeamPage;
