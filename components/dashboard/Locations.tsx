
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { MapPin, Plus, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../auth/AuthProvider';

export const Locations: React.FC = () => {
  const { tenant } = useAuth();
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
     if (!tenant) return;
     const { data } = await supabase.from('locations').select('*').eq('tenant_id', tenant.id);
     if (data) setLocations(data);
     setLoading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, [tenant]);

  const handleAdd = async () => {
    if(!tenant) return;
    const name = prompt("Enter location name (e.g. Durbar Marg Outlet):");
    if(!name) return;

    const { error } = await supabase.from('locations').insert({
       tenant_id: tenant.id,
       name,
       address: 'Kathmandu, Nepal',
       is_active: true
    });

    if(error) alert('Error: ' + error.message);
    else fetchLocations();
  };

  if (loading) return <div className="p-8"><Loader2 className="w-8 h-8 animate-spin text-primary-500"/></div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
       <div className="mb-8 flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-display font-bold text-gray-900">Locations</h1>
             <p className="text-gray-500">Manage physical stores and POS terminals.</p>
          </div>
          <Button className="flex items-center gap-2" onClick={handleAdd}>
             <Plus className="w-4 h-4" /> Add Location
          </Button>
       </div>

       <div className="space-y-4">
          {locations.map(loc => (
             <div key={loc.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-gray-100 rounded-lg text-gray-500">
                      <MapPin className="w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="font-bold text-gray-900 text-lg">{loc.name}</h3>
                      <p className="text-gray-500 text-sm">{loc.address}</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${loc.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {loc.is_active ? 'Active' : 'Closed'}
                   </span>
                   <Button variant="outline" size="sm">Manage Terminals</Button>
                </div>
             </div>
          ))}
          {locations.length === 0 && (
             <div className="text-center p-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500">No physical locations added.</p>
             </div>
          )}
       </div>
    </div>
  );
};
