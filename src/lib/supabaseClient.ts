import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Trim env vars to prevent hidden whitespace from Netlify
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// Create client only if env vars are present, otherwise null
export const supabase: SupabaseClient | null =
    supabaseUrl && supabaseAnonKey
        ? createClient(supabaseUrl, supabaseAnonKey)
        : null
