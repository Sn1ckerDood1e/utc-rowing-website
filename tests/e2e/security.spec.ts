import { test, expect, request } from "@playwright/test";

test.describe("Security / RLS", () => {
  test("anonymous Supabase REST cannot read submissions", async ({ baseURL }) => {
    // The submissions table should be invisible to anon clients via RLS.
    // We hit Supabase REST directly using the public anon key (which the site exposes).
    // This proves RLS denies anonymous SELECT on submissions.
    const supabaseUrl = "https://ewjqcsdxlvvvwfcjzrsq.supabase.co";
    const anonKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3anFjc2R4bHZ2dndmY2p6cnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTYyMTgsImV4cCI6MjA5MzkzMjIxOH0.Jq1ZsDaxkKNdk0u8lp9zwAi3yqiqSmTnY0a6gGyfzBc";

    const ctx = await request.newContext();
    const res = await ctx.get(`${supabaseUrl}/rest/v1/submissions?select=*`, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    });
    expect(res.status()).toBeLessThan(500);
    const body = await res.json();
    // Either denied (401/403) or returned an empty array — never leaks rows.
    if (Array.isArray(body)) {
      expect(body.length).toBe(0);
    } else {
      // Error response
      expect(res.status()).toBeGreaterThanOrEqual(400);
    }
    await ctx.dispose();
    // Ensure baseURL was passed (Playwright config sanity)
    expect(baseURL).toBeTruthy();
  });

  test("alumni table publicly readable (intentional)", async () => {
    const supabaseUrl = "https://ewjqcsdxlvvvwfcjzrsq.supabase.co";
    const anonKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3anFjc2R4bHZ2dndmY2p6cnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTYyMTgsImV4cCI6MjA5MzkzMjIxOH0.Jq1ZsDaxkKNdk0u8lp9zwAi3yqiqSmTnY0a6gGyfzBc";

    const ctx = await request.newContext();
    const res = await ctx.get(`${supabaseUrl}/rest/v1/alumni?select=canonical_name&limit=5`, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    });
    expect(res.ok()).toBeTruthy();
    const rows = await res.json();
    expect(Array.isArray(rows)).toBe(true);
    expect(rows.length).toBeGreaterThan(0);
    await ctx.dispose();
  });

  test("admin_emails table NOT readable by anon", async () => {
    const supabaseUrl = "https://ewjqcsdxlvvvwfcjzrsq.supabase.co";
    const anonKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3anFjc2R4bHZ2dndmY2p6cnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTYyMTgsImV4cCI6MjA5MzkzMjIxOH0.Jq1ZsDaxkKNdk0u8lp9zwAi3yqiqSmTnY0a6gGyfzBc";

    const ctx = await request.newContext();
    const res = await ctx.get(`${supabaseUrl}/rest/v1/admin_emails?select=*`, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    });
    const body = await res.json();
    if (Array.isArray(body)) {
      expect(body.length).toBe(0);
    } else {
      expect(res.status()).toBeGreaterThanOrEqual(400);
    }
    await ctx.dispose();
  });
});
