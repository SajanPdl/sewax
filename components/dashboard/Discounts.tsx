import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Tag, Plus, Loader2, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';

export const Discounts: React.FC = () => {
  const { tenant } = useAuth();
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenant) return;
    const fetchDiscounts = async () => {
       const { data } = await supabase.from('discounts').select('*').eq('tenant_id', tenant.id);
       if (data) setDiscounts(data);
       setLoading(false);
    };
    fetchDiscounts();
  }, [tenant]);

  if (loading) return <div className="p-8"><Loader2 className="w-8 h-8 animate-spin text-primary-500"/></div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
       <div className="mb-8 flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-display font-bold text-gray-900">Discounts & Promotions</h1>
             <p className="text-gray-500">Create coupons and automatic discounts.</p>
          </div>
          <Button className="flex items-center gap-2">
             <Plus className="w-4 h-4" /> Create Discount
          </Button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discounts.map(d => (
             <div key={d.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-2">
                      <Tag className="w-5 h-5 text-primary-500" />
                      <span className="font-mono font-bold text-lg text-gray-900">{d.code}</span>
                   </div>
                   <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${d.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {d.is_active ? 'Active' : 'Expired'}
                   </span>
                </div>
                <div className="mb-4">
                   <p className="text-3xl font-bold text-gray-900">
                      {d.type === 'percentage' ? `${d.value}% OFF` : `NPR ${d.value} OFF`}
                   </p>
                </div>
                <div className="text-xs text-gray-500 flex flex-col gap-1">
                   <div className="flex items-center gap-1"><Calendar className="w-3 h-3"/> Ends: {d.ends_at ? new Date(d.ends_at).toLocaleDateString() : 'Never'}</div>
                   <div>Used: {d.usage_count} times</div>
                </div>
             </div>
          ))}
          
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 text-center hover:bg-gray-100 transition-colors cursor-pointer">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                <Plus className="w-6 h-6 text-gray-400" />
             </div>
             <h3 className="font-bold text-gray-900">Create New</h3>
             <p className="text-xs text-gray-500 mt-1">Percentage, Fixed Amount, or Free Shipping</p>
          </div>
       </div>
    </div>
  );
};