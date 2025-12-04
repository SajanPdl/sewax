import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// Using the provided credentials
const supabaseUrl = 'https://ntlxrwdoesnltllvyhwk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50bHhyd2RvZXNubHRsbHZ5aHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MzUwNzMsImV4cCI6MjA4MDQxMTA3M30.YUMDOTylzRRJdefEu7QMwJb5bmqgRdC8iOKZdz9P2Ik';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
