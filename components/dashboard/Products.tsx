
import React from 'react';
import { Button } from '../Button';
import { Search, Plus, Filter, MoreHorizontal, AlertCircle, Package } from 'lucide-react';
import { Product } from '../../types';

export const Products: React.FC = () => {
  const products: Product[] = [
    { id: '1', title: 'Himalayan Arabica Coffee Beans (500g)', price: 1500, inventory: 45, sku: 'COF-001', category: 'Coffee', image: 'https://picsum.photos/200/200?random=201', status: 'Active' },
    { id: '4', title: 'Reusable Coffee Filter', price: 1200, inventory: 5, sku: 'FIL-004', category: 'Equipment', image: 'https://picsum.photos/200/200?random=204', status: 'Low Stock' },
    { id: '2', title: 'Ilam Green Tea Pack', price: 850, inventory: 120, sku: 'TEA-002', category: 'Tea', image: 'https://picsum.photos/200/200?random=202', status: 'Active' },
    { id: '5', title: 'Espresso Blend', price: 1800, inventory: 50, sku: 'COF-005', category: 'Coffee', image: 'https://picsum.photos/200/200?random=205', status: 'Active' },
    { id: '6', title: 'Organic Honey', price: 950, inventory: 0, sku: 'HON-006', category: 'Food', image: 'https://picsum.photos/200/200?random=206', status: 'Draft' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
             <h1 className="text-2xl font-display font-bold text-gray-900">Products</h1>
             <p className="text-gray-500">Manage your inventory, pricing, and collections.</p>
          </div>
          <Button className="flex items-center gap-2">
             <Plus className="w-4 h-4" /> Add Product
          </Button>
       </div>

       {/* Filters */}
       <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex gap-4 shadow-sm items-center">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100" />
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
                {products.map(product => (
                   <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                               <img src={product.image} alt="" className="w-full h-full object-cover" />
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
                            {product.category}
                         </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">NPR {product.price.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">
                         <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                         </button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
             <p className="text-xs text-gray-500">Showing 5 of 45 products</p>
             <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 text-xs bg-white">Previous</Button>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-white">Next</Button>
             </div>
          </div>
       </div>
    </div>
  );
};
