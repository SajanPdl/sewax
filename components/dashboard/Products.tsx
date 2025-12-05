
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Search, Plus, Filter, AlertCircle, Loader2, Trash2, X, Save, Image as ImageIcon, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';
import { GoogleGenAI } from "@google/genai";

export const Products: React.FC = () => {
  const { tenant } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    sku: '',
    price: '',
    inventory: '',
    category: 'General',
    image_url: '',
    description: ''
  });

  const fetchProducts = async () => {
    if (!tenant) return;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('tenant_id', tenant.id)
      .order('created_at', { ascending: false });
    
    if (data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [tenant]);

  const handleOpenModal = () => {
     setFormData({
        title: '',
        sku: `SKU-${Math.floor(Math.random() * 10000)}`,
        price: '',
        inventory: '10',
        category: 'General',
        image_url: '',
        description: ''
     });
     setIsModalOpen(true);
  };

  const handleGenerateDescription = async () => {
    if (!formData.title) {
        alert("Please enter a product title first.");
        return;
    }
    
    setIsGenerating(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Write a compelling, short (2-3 sentences) product description for a ${formData.category} product named "${formData.title}". The tone should be professional yet persuasive. Currency is NPR.`
        });
        
        const generatedText = response.text;
        if (generatedText) {
            setFormData(prev => ({ ...prev, description: generatedText.trim() }));
        }
    } catch (error: any) {
        console.error("AI Generation Error:", error);
        alert("Failed to generate description. Please try again.");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenant) return;
    setIsSaving(true);

    const { error } = await supabase.from('products').insert({
       tenant_id: tenant.id,
       title: formData.title,
       price: Number(formData.price),
       inventory: Number(formData.inventory),
       sku: formData.sku,
       category: formData.category,
       image_url: formData.image_url || null,
       description: formData.description,
       status: 'Active'
    });

    if (error) {
       alert('Failed to create product: ' + error.message);
    } else {
       await fetchProducts();
       setIsModalOpen(false);
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const filteredProducts = products.filter(p => 
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="p-8"><Loader2 className="w-8 h-8 animate-spin text-primary-500"/></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
             <h1 className="text-2xl font-display font-bold text-gray-900">Products</h1>
             <p className="text-gray-500">Manage your inventory, pricing, and collections.</p>
          </div>
          <Button onClick={handleOpenModal} className="flex items-center gap-2">
             <Plus className="w-4 h-4" /> Add Product
          </Button>
       </div>

       {/* Filters */}
       <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex gap-4 shadow-sm items-center">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <input 
               type="text" 
               placeholder="Search products..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100" 
             />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
             <Filter className="w-4 h-4" /> Filter
          </button>
       </div>

       {/* Table */}
       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs">
                <tr>
                   <th className="px-6 py-4 font-medium">Product</th>
                   <th className="px-6 py-4 font-medium">Status</th>
                   <th className="px-6 py-4 font-medium">Inventory</th>
                   <th className="px-6 py-4 font-medium">Category</th>
                   <th className="px-6 py-4 font-medium">Price</th>
                   <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {filteredProducts.map(product => (
                   <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 flex items-center justify-center text-gray-300">
                               {product.image_url ? (
                                 <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                               ) : (
                                 <ImageIcon className="w-4 h-4" />
                               )}
                            </div>
                            <div>
                               <p className="font-bold text-gray-900">{product.title}</p>
                               <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                            product.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 
                            product.status === 'Low Stock' ? 'bg-orange-50 text-orange-700 border-orange-100' : 
                            'bg-gray-50 text-gray-600 border-gray-100'
                         }`}>
                            {product.status}
                         </span>
                      </td>
                      <td className="px-6 py-4">
                         <div className={`flex items-center gap-2 ${product.inventory < 10 ? 'text-orange-600 font-bold' : 'text-gray-600'}`}>
                            {product.inventory} in stock
                            {product.inventory < 10 && product.inventory > 0 && <AlertCircle className="w-3 h-3" />}
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {product.category || 'Uncategorized'}
                         </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">NPR {product.price?.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">
                         <button 
                            onClick={() => handleDelete(product.id)}
                            className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-gray-100 transition-colors"
                         >
                            <Trash2 className="w-4 h-4" />
                         </button>
                      </td>
                   </tr>
                ))}
                {filteredProducts.length === 0 && (
                   <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                         No products found. Add some to get started!
                      </td>
                   </tr>
                )}
             </tbody>
          </table>
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
             <p className="text-xs text-gray-500">Showing {filteredProducts.length} products</p>
          </div>
       </div>

       {/* Add Product Modal */}
       {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
             <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                   <h3 className="font-bold text-gray-900">Add New Product</h3>
                   <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-5 h-5" />
                   </button>
                </div>
                <form onSubmit={handleSaveProduct} className="p-6 space-y-4 overflow-y-auto">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                      <input 
                         required
                         type="text" 
                         value={formData.title}
                         onChange={e => setFormData({...formData, title: e.target.value})}
                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                         placeholder="e.g. Organic Coffee Beans"
                      />
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Price (NPR)</label>
                         <input 
                            required
                            type="number" 
                            min="0"
                            value={formData.price}
                            onChange={e => setFormData({...formData, price: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                            placeholder="0.00"
                         />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Inventory</label>
                         <input 
                            required
                            type="number" 
                            min="0"
                            value={formData.inventory}
                            onChange={e => setFormData({...formData, inventory: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                            placeholder="10"
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                         <input 
                            type="text" 
                            value={formData.sku}
                            onChange={e => setFormData({...formData, sku: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                            placeholder="SKU-1001"
                         />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                         <select 
                            value={formData.category}
                            onChange={e => setFormData({...formData, category: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all bg-white"
                         >
                            <option>General</option>
                            <option>Clothing</option>
                            <option>Electronics</option>
                            <option>Food & Beverage</option>
                            <option>Service</option>
                         </select>
                      </div>
                   </div>
                   
                   <div>
                      <div className="flex justify-between items-center mb-1">
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <button 
                            type="button" 
                            onClick={handleGenerateDescription}
                            disabled={isGenerating || !formData.title}
                            className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          >
                             {isGenerating ? <Loader2 className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3" />}
                             {isGenerating ? 'Drafting...' : 'Generate with AI'}
                          </button>
                      </div>
                      <textarea 
                         rows={3}
                         value={formData.description}
                         onChange={e => setFormData({...formData, description: e.target.value})}
                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                         placeholder="Product details..."
                      />
                   </div>

                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input 
                         type="url" 
                         value={formData.image_url}
                         onChange={e => setFormData({...formData, image_url: e.target.value})}
                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                         placeholder="https://example.com/image.jpg"
                      />
                   </div>

                   <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                      <Button type="submit" className="flex-1" isLoading={isSaving}>
                         <Save className="w-4 h-4 mr-2" /> Save Product
                      </Button>
                   </div>
                </form>
             </div>
          </div>
       )}
    </div>
  );
};
