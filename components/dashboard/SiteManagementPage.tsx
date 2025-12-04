import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Globe, Lock } from 'lucide-react';

interface Site {
  id: string;
  name: string;
  domain: string;
  status: 'published' | 'draft';
  created: string;
  visitors: number;
}

export const SiteManagementPage: React.FC = () => {
  const [sites] = useState<Site[]>([
    { id: '1', name: 'My Portfolio', domain: 'portfolio.sewax.io', status: 'published', created: '2024-10-15', visitors: 1250 },
    { id: '2', name: 'Blog Site', domain: 'blog.sewax.io', status: 'draft', created: '2024-11-20', visitors: 0 },
    { id: '3', name: 'Shop', domain: 'shop.sewax.io', status: 'published', created: '2024-09-01', visitors: 5320 },
  ]);

  const [selectedSite, setSelectedSite] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sites</h1>
          <p className="text-gray-600">Manage your published and draft sites.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold">
          <Plus className="w-5 h-5" />
          New Site
        </button>
      </div>

      {/* Sites List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Site Name</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Domain</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Visitors</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Created</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site) => (
                <tr key={site.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">{site.name}</td>
                  <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {site.domain}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        site.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {site.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">{site.visitors.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{site.created}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-700" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="Open">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Site Details Panel (if selected) */}
      {selectedSite && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Site Details</h2>

          {/* Domain Management */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Domain Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Globe className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Current Domain</p>
                  <p className="text-sm text-gray-600">portfolio.sewax.io</p>
                </div>
              </div>
              <div className="border-t pt-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Add Custom Domain
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="example.com"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold">
                    Add Domain
                  </button>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  ⓘ You'll need to update your DNS records. We'll guide you through it.
                </p>
              </div>
            </div>
          </div>

          {/* SSL Status */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">SSL Certificate</h3>
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <Lock className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">SSL Enabled</p>
                <p className="text-sm text-green-800">Certificate valid until Dec 2025</p>
              </div>
            </div>
          </div>

          {/* Publish/Unpublish */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Site Visibility</h3>
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold">
                <Eye className="w-4 h-4 inline mr-2" />
                Publish Site
              </button>
              <button className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-900 rounded-lg font-semibold">
                <EyeOff className="w-4 h-4 inline mr-2" />
                Unpublish
              </button>
            </div>
          </div>

          {/* Backup */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900 font-semibold mb-2">Site Backup</p>
            <p className="text-sm text-blue-800 mb-3">Last backup: 2 hours ago</p>
            <button className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold">
              Create Backup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteManagementPage;
