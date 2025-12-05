import React, { useState, useEffect } from 'react';
import { Bell, Loader2, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';

export const Notifications: React.FC = () => {
  const { tenant } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenant) return;
    const fetchNotes = async () => {
       const { data } = await supabase.from('notifications').select('*').eq('tenant_id', tenant.id).order('created_at', {ascending: false});
       if (data) setNotifications(data);
       setLoading(false);
    };
    fetchNotes();
  }, [tenant]);

  if (loading) return <div className="p-8"><Loader2 className="w-8 h-8 animate-spin text-primary-500"/></div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
       <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-gray-900">Notifications</h1>
       </div>

       <div className="space-y-4">
          {notifications.map(n => (
             <div key={n.id} className={`p-4 rounded-xl border ${n.is_read ? 'bg-gray-50 border-gray-100' : 'bg-white border-primary-100 shadow-sm'} flex gap-4`}>
                <div className={`mt-1 p-2 rounded-full ${n.is_read ? 'bg-gray-200 text-gray-500' : 'bg-primary-100 text-primary-600'}`}>
                   <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1">
                   <h4 className={`text-sm ${n.is_read ? 'font-medium text-gray-700' : 'font-bold text-gray-900'}`}>{n.title}</h4>
                   <p className="text-xs text-gray-500 mt-1">{n.message}</p>
                   <p className="text-[10px] text-gray-400 mt-2">{new Date(n.created_at).toLocaleString()}</p>
                </div>
                {!n.is_read && (
                   <button className="text-primary-600 hover:text-primary-700 h-fit">
                      <Check className="w-4 h-4" />
                   </button>
                )}
             </div>
          ))}
          {notifications.length === 0 && (
             <div className="text-center p-12 text-gray-400">No notifications.</div>
          )}
       </div>
    </div>
  );
};