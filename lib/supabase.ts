import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/types/supabase';

// Get environment variables
const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseAnonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

// Only create client if we have valid environment variables
let supabase: ReturnType<typeof createClient<Database>> | null = null;
let supabaseAdmin: ReturnType<typeof createClient<Database>> | null = null;

if (
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'your_supabase_url' &&
  supabaseAnonKey !== 'your_supabase_anon_key'
) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });

  // Server-side client with service role key
  const serviceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];
  if (serviceRoleKey && serviceRoleKey !== 'your_supabase_service_role_key') {
    supabaseAdmin = createClient<Database>(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
} else {
  console.warn(
    '⚠️ Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.',
  );
}

export { supabase, supabaseAdmin };
