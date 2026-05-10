import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Temporary debug endpoint — reports env-var presence without leaking values.
// Remove after env vars are confirmed working.
export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_SUPABASE_URL: {
      present: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      length: process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0,
      prefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30) || null,
    },
    NEXT_PUBLIC_SUPABASE_ANON_KEY: {
      present: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      length: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
      prefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20) || null,
    },
    SUPABASE_SERVICE_ROLE_KEY: {
      present: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      length: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
      prefix: process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 12) || null,
    },
    RESEND_API_KEY: {
      present: !!process.env.RESEND_API_KEY,
      length: process.env.RESEND_API_KEY?.length || 0,
      prefix: process.env.RESEND_API_KEY?.slice(0, 5) || null,
    },
    EMAIL_FROM: {
      present: !!process.env.EMAIL_FROM,
      value: process.env.EMAIL_FROM || null,
    },
    EMAIL_ADMIN_TO: {
      present: !!process.env.EMAIL_ADMIN_TO,
      value: process.env.EMAIL_ADMIN_TO || null,
    },
    NEXT_PUBLIC_SITE_URL: {
      present: !!process.env.NEXT_PUBLIC_SITE_URL,
      value: process.env.NEXT_PUBLIC_SITE_URL || null,
    },
    NODE_ENV: process.env.NODE_ENV,
  });
}
