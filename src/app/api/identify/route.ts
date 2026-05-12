import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const schema = z.object({
  photo_id: z.string().uuid(),
  proposed_name: z.string().min(2).max(120),
  proposed_role: z.string().max(40).optional(),
  proposed_position_in_photo: z.string().max(200).optional(),
  proposed_year: z.coerce.number().int().min(1960).max(2100).optional(),
  proposed_event: z.string().max(120).optional(),
  submitter_email: z.string().email().max(200),
  submitter_name: z.string().min(2).max(120),
  confidence: z
    .enum(["eyewitness", "secondhand", "family", "guess"])
    .optional(),
  notes: z.string().max(2000).optional(),
  honeypot: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  if (data.honeypot && data.honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("photo_identification_proposals")
    .insert({
      photo_id: data.photo_id,
      proposed_name: data.proposed_name.trim(),
      proposed_role: data.proposed_role?.trim() || null,
      proposed_position_in_photo: data.proposed_position_in_photo?.trim() || null,
      proposed_year: data.proposed_year ?? null,
      proposed_event: data.proposed_event?.trim() || null,
      submitter_email: data.submitter_email.trim().toLowerCase(),
      submitter_name: data.submitter_name.trim(),
      confidence: data.confidence ?? "guess",
      notes: data.notes?.trim() || null,
    });

  if (error) {
    console.error("identify proposal insert failed:", error);
    return NextResponse.json(
      { error: "Could not save proposal" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
