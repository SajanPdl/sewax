
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { UserRole } from '../dashboard/RBACWrapper';

interface AuthContextType {
  user: any | null;
  session: any | null;
  tenant: any | null; // The active tenant
  role: UserRole;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  tenant: null,
  role: 'Viewer',
  loading: true,
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [tenant, setTenant] = useState<any | null>(null);
  const [role, setRole] = useState<UserRole>('Viewer');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for demo mode flag
    const isDemo = localStorage.getItem('sewax-demo-mode') === 'true';
    if (isDemo) {
        setUser({ id: 'demo-user-123', email: 'demo@sewax.com', user_metadata: { full_name: 'Demo User' } });
        setSession({ access_token: 'demo-token', user: { id: 'demo-user-123' } });
        setTenant({ 
            id: 'demo-tenant-123', 
            name: 'Himalayan Demo Store', 
            slug: 'himalayan-demo', 
            plan: 'Pro', 
            subscription_status: 'active' 
        });
        setRole('Owner');
        setLoading(false);
        return;
    }

    // 1. Get initial session
    (supabase.auth as any).getSession().then(({ data: { session } }: any) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchTenant(session.user.id);
      else setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = (supabase.auth as any).onAuthStateChange((_event: any, session: any) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        // On sign in/up, ensure we try to fetch the tenant
        setLoading(true); 
        fetchTenant(session.user.id);
      } else {
        setTenant(null);
        setRole('Viewer');
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchTenant = async (userId: string, retries = 3) => {
    try {
      // Fetch the first tenant user belongs to (One Store model)
      const { data: memberData, error } = await supabase
        .from('tenant_members')
        .select('role, tenants(*)')
        .eq('user_id', userId)
        .single();
      
      const data = memberData as any;

      if (data && data.tenants) {
        setTenant(data.tenants);
        setRole(data.role as UserRole);
        setLoading(false);
      } else if (retries > 0) {
        // If user just signed up, the trigger might still be running. Retry.
        setTimeout(() => fetchTenant(userId, retries - 1), 1000);
      } else {
        console.warn("User authenticated but no tenant found after retries.");
        setLoading(false);
      }
    } catch (e) {
      console.error("Error fetching tenant", e);
      if (retries > 0) {
         setTimeout(() => fetchTenant(userId, retries - 1), 1000);
      } else {
         setLoading(false);
      }
    }
  };

  const signOut = async () => {
    localStorage.removeItem('sewax-demo-mode');
    await (supabase.auth as any).signOut();
    setUser(null);
    setSession(null);
    setTenant(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, session, tenant, role, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
