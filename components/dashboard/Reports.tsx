
import React from 'react';
import { Button } from '../Button';
import { FileText, Download, TrendingUp, DollarSign } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';

export const Reports: React.FC = () => {
  const { tenant } = useAuth();

  const generateReport = async (type: string) => {
     if(!tenant) return;
     let data = [];
     let filename = 'report.csv';

     if (type === 'sales') {
        const { data: orders } = await supabase.from('orders').select('*').eq('tenant_id', tenant.id);
        if(!orders) return;
        data = orders.map(o => ({
            ID: o.order_number,
            Date: o.created_at,
            Total: o.total,
            Status: o.status,
            Customer: o.customer_name
        }));
        filename = 'sales_report.csv';
     } else if (type === 'products') {
        const { data: products } = await supabase.from('products').select('*').eq('tenant_id', tenant.id);
        if(!products) return;
        data = products.map(p => ({
            Title: p.title,
            SKU: p.sku,
            Price: p.price,
            Inventory: p.inventory,
            Status: p.status
        }));
        filename = 'inventory_report.csv';
     }

     if(data.length === 0) {
         alert('No data to export.');
         return;
     }

     const headers = Object.keys(data[0]);
     const csvContent = "data:text/csv;charset=utf-8," 
          + headers.join(",") + "\n" 
          + data.map(row => Object.values(row).join(",")).join("\n");
      
     const encodedUri = encodeURI(csvContent);
     const link = document.createElement("a");
     link.setAttribute("href", encodedUri);
     link.setAttribute("download", filename);
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
  };

  const reports = [
     { id: 'sales', title: 'Sales Summary', desc: 'Daily revenue, tax, and shipping.', icon: DollarSign },
     { id: 'products', title: 'Product Performance', desc: 'Top selling items and margins.', icon: TrendingUp },
     { id: 'tax', title: 'Tax Report', desc: 'Collected VAT for accounting.', icon: FileText },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
       <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-gray-900">Reports & Exports</h1>
          <p className="text-gray-500">Financial statements for your business.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((r, i) => (
             <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-primary-200 transition-colors">
                <div className="flex items-center justify-between mb-4">
                   <div className="p-3 bg-gray-50 rounded-lg text-gray-600">
                      <r.icon className="w-6 h-6" />
                   </div>
                   <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0 flex items-center justify-center rounded-full"
                        onClick={() => generateReport(r.id)}
                    >
                      <Download className="w-4 h-4" />
                   </Button>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{r.title}</h3>
                <p className="text-sm text-gray-500">{r.desc}</p>
             </div>
          ))}
       </div>
    </div>
  );
};
