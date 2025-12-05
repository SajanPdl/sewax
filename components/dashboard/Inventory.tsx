
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Search, AlertTriangle, RefreshCw, Loader2, ArrowUp, ArrowDown, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';

export const Inventory: React.FC = () => {
  const { tenant } = useAuth();
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!tenant) return;
    fetchInventory();
  }, [tenant]);

  const fetchInventory = async () => {
     setLoading(true);
     const { data } = await supabase.from('products').select('*').eq('tenant_id', tenant.id).order('title');
     if (data) setInventory(data);
     setLoading(false);
  };

  const handleAdjustStock = async (id: string, currentStock: number, change: number) => {
    setUpdatingId(id);
    const newStock = Math.max(0, currentStock + change);
    
    // Optimistic update
    setInventory(prev => prev.map(item => item.id === id ? { ...item, inventory: newStock } : item));

    const { error } = await supabase
      .from('products')
      .update({ inventory: newStock, status: newStock === 0 ? 'Out of Stock' : newStock < 10 ? 'Low Stock' : 'Active' })
      .eq('id', id);

    if (error) {
      // Revert if error
      fetchInventory();
      alert('Failed to update stock');
    }
    setUpdatingId(null);
  };

  if (loading && inventory.length === 0) return <div className="p-8"><Loader2 className="w-8 h-8 animate-spin text-primary-500"/></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
       <div className="mb-8 flex justify-between items-end">
          <div>
             <h1 className="text-2xl font-display font-bold text-gray-900">Inventory</h1>
             <p className="text-gray-500">Track stock levels and adjustments.</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2" onClick={fetchInventory}>
             <RefreshCw className="w-4 h-4" /> Sync
          </Button>
       </div>

       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs">
                <tr>
                   <th className="px-6 py-4 font-medium">Product</th>
                   <th className="px-6 py-4 font-medium">SKU</th>
                   <th className="px-6 py-4 font-medium">In Stock</th>
                   <th className="px-6 py-4 font-medium">Status</th>
                   <th className="px-6 py-4 font-medium text-right">Adjust</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {inventory.map(item => (
                   <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-3">
                         <div className="w-8 h-8 bg-gray-100 rounded border border-gray-200 overflow-hidden">
                            {item.image_url && <img src={item.image_url} className="w-full h-full object-cover"/>}
                         </div>
                         {item.title}
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-mono text-xs">{item.sku || '-'}</td>
                      <td className="px-6 py-4 font-bold">{item.inventory}</td>
                      <td className="px-6 py-4">
                         {item.inventory === 0 ? (
                            <span className="flex items-center gap-1 text-red-600 text-xs font-bold">
                               <AlertTriangle className="w-3 h-3" /> Out of Stock
                            </span>
                         ) : item.inventory < 10 ? (
                            <span className="flex items-center gap-1 text-orange-600 text-xs font-bold">
                               <AlertTriangle className="w-3 h-3" /> Low Stock
                            </span>
                         ) : (
                            <span className="text-green-600 text-xs font-bold">In Stock</span>
                         )}
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex justify-end gap-1">
                            <button 
                                disabled={updatingId === item.id}
                                onClick={() => handleAdjustStock(item.id, item.inventory, 1)}
                                className="p-1 hover:bg-green-100 text-gray-500 hover:text-green-600 rounded transition-colors" 
                                title="Add Stock"
                            >
                                <ArrowUp className="w-4 h-4"/>
                            </button>
                            <button 
                                disabled={updatingId === item.id || item.inventory === 0}
                                onClick={() => handleAdjustStock(item.id, item.inventory, -1)}
                                className="p-1 hover:bg-red-100 text-gray-500 hover:text-red-600 rounded transition-colors" 
                                title="Remove Stock"
                            >
                                <ArrowDown className="w-4 h-4"/>
                            </button>
                         </div>
                      </td>
                   </tr>
                ))}
                {inventory.length === 0 && (
                    <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-500">No inventory found.</td>
                    </tr>
                )}
             </tbody>
          </table>
       </div>
    </div>
  );
};
