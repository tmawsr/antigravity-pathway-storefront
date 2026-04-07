import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Server-side only client using service_role key
// This bypasses RLS — use only in API routes, never expose to the browser
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
