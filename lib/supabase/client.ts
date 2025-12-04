import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// Using the provided credentials for the new project
const supabaseUrl = 'https://hnwjmpiizibinvhchidh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhud2ptcGlpemliaW52aGNoaWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NDYxMzAsImV4cCI6MjA4MDQyMjEzMH0.RDLB7bpzli2HBcSZvVpvEEVQrd1Vg27PWzH5qNkidPs';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});