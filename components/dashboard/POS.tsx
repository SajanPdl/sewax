
import React, { useState } from 'react';
import { Search, Grid, List, Trash2, Plus, Minus, CreditCard, Banknote, RefreshCcw, Wifi } from 'lucide-react';
import { Button } from '../Button';
import { Product, CartItem } from '../../types';

export const POS: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock Products
  const products: Product[] = [
    { id: '1', title: 'Himalayan Arabica', price: 1500, inventory: 45, sku: 'COF-001', category: 'Coffee', image: 'https://picsum.photos/200/200?random=201', status: 'Active' },
    { id: '2', title: 'Green Tea Pack', price: 850, inventory: 120, sku: 'TEA-002', category: 'Tea', image: 'https://picsum.photos/200/200?random=202', status: 'Active' },
    { id: '3', title: 'Ceramic Mug', price: 450, inventory: 30, sku: 'MUG-003', category: 'Accessories', image: 'https://picsum.photos/200/200?random=203', status: 'Active' },
    { id: '4', title: 'Coffee Filter', price: 1200, inventory: 15, sku: 'FIL-004', category: 'Equipment', image: 'https://picsum.photos/200/200?random=204', status: 'Low Stock' },
    { id: '5', title: 'Espresso Blend', price: 1800, inventory: 50, sku: 'COF-005', category: 'Coffee', image: 'https://picsum.photos/200/200?random=205', status: 'Active' },
    { id: '6', title: 'Organic Honey', price: 950, inventory: 25, sku: 'HON-006', category: 'Food', image: 'https://picsum.photos/200/200?random=206', status: 'Active' },
  ];

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.13; // 13% VAT
  const total = subtotal + tax;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCart([]);
      alert('Order Processed Successfully!');
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
      {/* Left Side: Product Grid */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search products by name or SKU..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
             <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-green-500" />
                <span className="hidden md:inline">Online</span>
             </div>
             <div className="hidden md:flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg"><Grid className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-gray-100 rounded-lg"><List className="w-4 h-4" /></button>
             </div>
          </div>
        </div>

        {/* Categories (Mock) */}
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
           {['All', 'Coffee', 'Tea', 'Equipment', 'Food', 'Accessories'].map(cat => (
             <button key={cat} className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium hover:bg-gray-200 whitespace-nowrap">
               {cat}
             </button>
           ))}
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4">
           <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  onClick={() => addToCart(product)}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-primary-300 cursor-pointer transition-all group flex flex-col h-full"
                >
                   <div className="h-32 bg-gray-100 relative overflow-hidden">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      {product.inventory < 20 && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Low Stock</span>
                      )}
                   </div>
                   <div className="p-3 flex-1 flex flex-col">
                      <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{product.title}</h4>
                      <p className="text-xs text-gray-500 mb-2">{product.sku}</p>
                      <div className="mt-auto flex justify-between items-center">
                         <span className="font-bold text-primary-600">NPR {product.price}</span>
                         <span className="text-[10px] text-gray-400">{product.inventory} in stock</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Right Side: Cart */}
      <div className="w-full lg:w-96 bg-white border-l border-gray-200 flex flex-col h-full shadow-xl z-20">
         {/* Cart Header */}
         <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-gray-900">Current Order</h3>
            <button 
              onClick={() => setCart([])}
              className="text-red-500 text-xs hover:underline flex items-center gap-1"
            >
               <Trash2 className="w-3 h-3" /> Clear
            </button>
         </div>

         {/* Cart Items */}
         <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                     <CreditCard className="w-8 h-8 opacity-50" />
                  </div>
                  <p className="text-sm">Cart is empty</p>
                  <p className="text-xs mt-1">Select items to start an order</p>
               </div>
            ) : (
               cart.map(item => (
                  <div key={item.id} className="flex gap-3 items-start">
                     <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.title}</h4>
                        <p className="text-xs text-primary-600 font-medium">NPR {item.price * item.quantity}</p>
                     </div>
                     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                        <button 
                           onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, -1); }}
                           className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:text-primary-600 text-xs"
                        >
                           <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                           onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, 1); }}
                           className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:text-primary-600 text-xs"
                        >
                           <Plus className="w-3 h-3" />
                        </button>
                     </div>
                  </div>
               ))
            )}
         </div>

         {/* Summary & Checkout */}
         <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="space-y-2 mb-4">
               <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>NPR {subtotal.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-sm text-gray-600">
                  <span>VAT (13%)</span>
                  <span>NPR {tax.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>NPR {total.toLocaleString()}</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
               <button className="flex flex-col items-center justify-center p-2 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
                  <Banknote className="w-5 h-5 text-green-600 mb-1" />
                  <span className="text-xs font-medium">Cash</span>
               </button>
               <button className="flex flex-col items-center justify-center p-2 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
                  <CreditCard className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-xs font-medium">Card</span>
               </button>
               <button className="flex flex-col items-center justify-center p-2 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
                  <RefreshCcw className="w-5 h-5 text-green-500 mb-1" />
                  <span className="text-xs font-medium">eSewa</span>
               </button>
               <button className="flex flex-col items-center justify-center p-2 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
                   <span className="text-purple-600 font-bold text-lg leading-none mb-1">K</span>
                  <span className="text-xs font-medium">Khalti</span>
               </button>
            </div>

            <Button 
               size="lg" 
               className="w-full" 
               disabled={cart.length === 0}
               isLoading={isProcessing}
               onClick={handleCheckout}
            >
               Charge NPR {total.toLocaleString()}
            </Button>
         </div>
      </div>
    </div>
  );
};
