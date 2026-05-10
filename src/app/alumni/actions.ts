"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Alumni } from "@/types/domain";

// Strip PostgREST filter metacharacters and cap length so user input can't
// break or be smuggled into the .or() filter below.
const searchSchema = z
  .string()
  .max(100)
  .transform((s) => s.replace(/[,()*:]/g, "").trim());

export async function searchAlumni(query: string): Promise<Alumni[]> {
  const cleaned = searchSchema.safeParse(query);
  if (!cleaned.success) return [];
  const sanitized = cleaned.data;

  const supabase = await createSupabaseServerClient();

  let q = supabase
    .from("alumni")
    .select("*")
    .eq("is_published", true)
    .order("canonical_name", { ascending: true })
    .limit(500);

  if (sanitized) {
    // Search canonical_name + variants. ILIKE on both.
    const wildcard = `%${sanitized}%`;
    q = q.or(`canonical_name.ilike.${wildcard},variants.ilike.${wildcard}`);
  }

  const { data, error } = await q;
  if (error) {
    console.error("searchAlumni error:", error);
    return [];
  }
  return (data ?? []) as Alumni[];
}
