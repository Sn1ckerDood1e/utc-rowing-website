import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notifyAdminOfSubscription } from "@/lib/email";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email().max(200),
  name: z.string().max(120).optional().or(z.literal("")),
  source: z.string().max(60).optional(),
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

  // Honeypot — silently accept and drop
  if (data.honeypot && data.honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = data.email.trim().toLowerCase();
  const name = data.name?.trim() || null;
  const source = data.source?.trim() || null;

  const supabase = await createSupabaseServerClient();

  // Idempotent: if this email already exists, treat as success.
  // If they previously unsubscribed, clear unsubscribed_at to re-subscribe.
  const { data: existing } = await supabase
    .from("subscribers")
    .select("id, unsubscribed_at")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    if (existing.unsubscribed_at) {
      const { error: updateError } = await supabase
        .from("subscribers")
        .update({ unsubscribed_at: null })
        .eq("id", existing.id);
      if (updateError) {
        console.error("[/api/subscribe] resubscribe update failed:", updateError);
        return NextResponse.json(
          { error: "Could not subscribe" },
          { status: 500 }
        );
      }
    }
    return NextResponse.json({ ok: true, already: true });
  }

  const { data: inserted, error } = await supabase
    .from("subscribers")
    .insert({ email, name, source })
    .select("id")
    .single();

  if (error || !inserted) {
    console.error("[/api/subscribe] insert failed:", error);
    return NextResponse.json(
      { error: "Could not subscribe" },
      { status: 500 }
    );
  }

  // Fire-and-forget admin notification
  notifyAdminOfSubscription({ email, name, source }).catch((e) =>
    console.warn("[/api/subscribe] admin email failed:", e)
  );

  return NextResponse.json({ ok: true, id: inserted.id });
}
