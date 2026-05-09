"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Alumni } from "@/types/domain";

export async function searchAlumni(query: string): Promise<Alumni[]> {
  const supabase = await createSupabaseServerClient();
  const trimmed = query.trim();

  let q = supabase
    .from("alumni")
    .select("*")
    .eq("is_published", true)
    .order("canonical_name", { ascending: true })
    .limit(500);

  if (trimmed) {
    // Search canonical_name + variants. ILIKE on both.
    const wildcard = `%${trimmed}%`;
    q = q.or(`canonical_name.ilike.${wildcard},variants.ilike.${wildcard}`);
  }

  const { data, error } = await q;
  if (error) {
    console.error("searchAlumni error:", error);
    return [];
  }
  return (data ?? []) as Alumni[];
}
