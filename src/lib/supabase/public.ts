import { createClient } from "@supabase/supabase-js";
import { cache } from "react";

/**
 * Anon-only public Supabase client for static / ISR pages.
 *
 * Does NOT read cookies, so it does NOT opt the route into dynamic
 * rendering. Use this for queries that only touch `is_published = true`
 * (or other anon-readable, RLS-protected) rows on routes that declare
 * `export const revalidate = N`.
 *
 * For anything that needs auth state (the visitor's own session, RLS
 * decisions based on the logged-in user, etc.) keep using
 * `createSupabaseServerClient()` from `./server`.
 *
 * Wrapped in `React.cache` so multiple Server Components in the same
 * request reuse one client instance.
 */
export const createSupabasePublicClient = cache(() =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  )
);
