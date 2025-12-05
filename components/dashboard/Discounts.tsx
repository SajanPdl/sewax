
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Tag, Plus, Loader2, Calendar, X } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';

export const Discounts: React.FC = () => {
  const { tenant } = useAuth();
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
      code: '',
      type: 'percentage',
      value: '',
      expires_in_days: ''
  });

  const fetchDiscounts = async () => {
     if (!tenant) return;
     const { data } = await supabase.from('discounts').select('*').eq('tenant_id', tenant.id).order('created_at', {ascending: false});
     if (data) setDiscounts(data);
     setLoading(false);
  };

  useEffect(() => {
    fetchDiscounts();
  }, [tenant]);

  const handleCreate = async (e: React.FormEvent) => {
     e.preventDefault();
     if(!tenant) return;

     let endsAt = null;
     if(formData.expires_in_days) {
         const d = new Date();
         d.setDate(d.getDate() + parseInt(formData.expires_in_days));
         endsAt = d.toISOString();
     }

     const newDiscount = {
        tenant_id: tenant.id,
        code: formData.code.toUpperCase(),
        type: formData.type,
        value: Number(formData.value),
        is_active: true,
        usage_count: 0,
        starts_at: new Date().toISOString(),
        ends_at: endsAt
     };

     const { error } = await supabase.from('discounts').insert(newDiscount);
     
     if(error) {
        alert('Error creating discount: ' + error.message);
     } else {
        fetchDiscounts();
        setIsModalOpen(false);
        setFormData({ code: '', type: 'percentage', value: '', expires_in_days: '' });
     }
  };

  if (loading) return <div className="p-8"><Loader2 className="w-8 h-8 animate-spin text-primary-500"/></div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
       <div className="mb-8 flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-display font-bold text-gray-900">Discounts & Promotions</h1>
             <p className="text-gray-500">Create coupons and automatic discounts.</p>
          </div>
          <Button className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
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
          
          <div 
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 text-center hover:bg-gray-100 transition-colors cursor-pointer"
          >
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                <Plus className="w-6 h-6 text-gray-400" />
             </div>
             <h3 className="font-bold text-gray-900">Create New</h3>
             <p className="text-xs text-gray-500 mt-1">Percentage, Fixed Amount, or Free Shipping</p>
          </div>
       </div>

       {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
             <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                   <h3 className="font-bold text-gray-900">New Discount</h3>
                   <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-5 h-5" />
                   </button>
                </div>
                <form onSubmit={handleCreate} className="p-6 space-y-4">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                      <input 
                        required 
                        value={formData.code} 
                        onChange={e => setFormData({...formData, code: e.target.value})} 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm uppercase font-mono"
                        placeholder="SUMMER25" 
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select 
                                value={formData.type} 
                                onChange={e => setFormData({...formData, type: e.target.value})} 
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed_amount">Fixed Amount (NPR)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                            <input 
                                required 
                                type="number" 
                                value={formData.value} 
                                onChange={e => setFormData({...formData, value: e.target.value})} 
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                placeholder="10" 
                            />
                        </div>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                      <input 
                        type="number" 
                        value={formData.expires_in_days} 
                        onChange={e => setFormData({...formData, expires_in_days: e.target.value})} 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        placeholder="Leave empty for no expiry" 
                      />
                   </div>
                   <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                      <Button type="submit" className="flex-1">Create Discount</Button>
                   </div>
                </form>
             </div>
          </div>
       )}
    </div>
  );
};
