import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  notifyAdminOfSubmission,
  sendSubmissionConfirmation,
} from "@/lib/email";

export const runtime = "nodejs";

const schema = z.object({
  submitter_name: z.string().min(2).max(120),
  submitter_email: z.string().email().max(200),
  years_rowed: z.string().max(60).optional(),
  coach_during_rowing: z.string().max(60).optional(),
  topic: z.string().max(40).optional(),
  body: z.string().max(5000).optional(),
  publish_permission: z
    .enum(["attributed", "anonymous", "internal"])
    .optional(),
  form_level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
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

  // Honeypot — if filled, silently accept and drop
  if (data.honeypot && data.honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const supabase = await createSupabaseServerClient();
  const { data: inserted, error } = await supabase
    .from("submissions")
    .insert({
      submitter_name: data.submitter_name.trim(),
      submitter_email: data.submitter_email.trim().toLowerCase(),
      years_rowed: data.years_rowed?.trim() || null,
      coach_during_rowing: data.coach_during_rowing?.trim() || null,
      topic: data.topic?.trim() || null,
      body: data.body?.trim() || null,
      publish_permission: data.publish_permission || null,
      form_level: data.form_level,
    })
    .select("id")
    .single();

  if (error) {
    console.error("submission insert failed:", error);
    return NextResponse.json(
      { error: "Could not save submission" },
      { status: 500 }
    );
  }

  if (!inserted) {
    console.error("[/api/submit] insert returned no row");
    return NextResponse.json(
      { error: "Could not save submission" },
      { status: 500 }
    );
  }
  const id = inserted.id;

  // Fire-and-forget emails — don't fail the request if email fails
  Promise.allSettled([
    sendSubmissionConfirmation({
      to: data.submitter_email,
      name: data.submitter_name,
    }),
    notifyAdminOfSubmission({
      submissionId: id,
      submitterName: data.submitter_name,
      submitterEmail: data.submitter_email,
      formLevel: data.form_level,
      topic: data.topic,
      body: data.body,
    }),
  ]).then((results) => {
    for (const r of results) {
      if (r.status === "rejected") console.warn("email send failed:", r.reason);
    }
  });

  return NextResponse.json({ ok: true, id });
}
