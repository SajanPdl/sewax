import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { UserRole } from '../dashboard/RBACWrapper';

interface AuthContextType {
  user: User | null;
  session: Session | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [tenant, setTenant] = useState<any | null>(null);
  const [role, setRole] = useState<UserRole>('Viewer');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchTenant(session.user.id);
      else setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchTenant(session.user.id);
      else {
        setTenant(null);
        setRole('Viewer');
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchTenant = async (userId: string) => {
    try {
      // Fetch the first tenant user belongs to (One Store model)
      const { data: memberData, error } = await supabase
        .from('tenant_members')
        .select('role, tenants(*)')
        .eq('user_id', userId)
        .single();
      
      // Explicitly cast to any to handle joined data types which TS may not infer correctly from Supabase types
      const data = memberData as any;

      if (data && data.tenants) {
        setTenant(data.tenants);
        setRole(data.role as UserRole);
      }
    } catch (e) {
      console.error("Error fetching tenant", e);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, tenant, role, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);