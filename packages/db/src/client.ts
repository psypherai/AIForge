/**
 * Supabase client factories — use these instead of creating clients directly.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * Create a Supabase client with the anon key (public, RLS-enforced).
 */
export function createSupabaseClient(
  url?: string,
  anonKey?: string,
): SupabaseClient<Database> {
  return createClient<Database>(
    url ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
    anonKey ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  );
}

/**
 * Create a Supabase admin client with the service role key (server-side only).
 * WARNING: This bypasses RLS. Only use in trusted server environments.
 */
export function createSupabaseAdmin(
  url?: string,
  serviceRoleKey?: string,
): SupabaseClient<Database> {
  return createClient<Database>(
    url ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    serviceRoleKey ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
