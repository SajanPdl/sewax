import React from 'react';
import { Button } from '../Button';
import { Mail, Shield, Trash2, UserPlus, Lock } from 'lucide-react';
import { UserRole, RBACWrapper } from './RBACWrapper';

interface TeamProps {
   role: UserRole;
}

export const Team: React.FC<TeamProps> = ({ role }) => {
  const members = [
    { name: 'Sudeep K.', email: 'sudeep@example.com', role: 'Owner', avatar: 'https://ui-avatars.com/api/?name=Sudeep+K&background=C8102E&color=fff', status: 'Active' },
    { name: 'Priya Sharma', email: 'priya@example.com', role: 'Editor', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', status: 'Active' },
    { name: 'Ramesh Thapa', email: 'ramesh@example.com', role: 'Viewer', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', status: 'Pending' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
       <div className="flex justify-between items-center mb-8">
          <div>
             <h1 className="text-2xl font-display font-bold text-gray-900">Team Management</h1>
             <p className="text-gray-500">Manage access to your Sewax dashboard.</p>
          </div>
          <RBACWrapper allowedRoles={['Owner', 'Admin']} userRole={role} fallback={
             <Button disabled className="opacity-50 cursor-not-allowed flex items-center gap-2">
                <Lock className="w-4 h-4" /> Invite Member
             </Button>
          }>
             <Button className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" /> Invite Member
             </Button>
          </RBACWrapper>
       </div>

       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
             <Shield className="w-4 h-4 text-gray-500" />
             <span className="text-sm font-medium text-gray-600">You are on the <span className="text-gray-900 font-bold">Pro Plan</span>. You have 3/5 seats used.</span>
          </div>

          <table className="w-full text-sm text-left">
             <thead className="bg-white text-gray-500 uppercase text-xs border-b border-gray-100">
                <tr>
                   <th className="px-6 py-4 font-medium">User</th>
                   <th className="px-6 py-4 font-medium">Role</th>
                   <th className="px-6 py-4 font-medium">Status</th>
                   <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {members.map((member, i) => (
                   <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-4">
                            <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                               <p className="font-bold text-gray-900">{member.name}</p>
                               <p className="text-gray-500 flex items-center gap-1">
                                  <Mail className="w-3 h-3" /> {member.email}
                               </p>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {member.role}
                         </span>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                         }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                            {member.status}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         {member.role !== 'Owner' && (
                            <RBACWrapper allowedRoles={['Owner']} userRole={role}>
                               <button className="text-gray-400 hover:text-red-600 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                               </button>
                            </RBACWrapper>
                         )}
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};
