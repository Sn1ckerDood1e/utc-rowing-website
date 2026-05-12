import Link from "next/link";
import { createSupabasePublicClient } from "@/lib/supabase/public";

type ActivityRow = {
  kind: "alum_added" | "photo_published";
  title: string;
  created_at: string;
};

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const sec = Math.max(0, (now - then) / 1000);
  if (sec < 60) return "just now";
  const min = sec / 60;
  if (min < 60) return `${Math.round(min)} min ago`;
  const hr = min / 60;
  if (hr < 48) return `${Math.round(hr)} hr ago`;
  const day = hr / 24;
  if (day < 14) return `${Math.round(day)} days ago`;
  const wk = day / 7;
  if (wk < 8) return `${Math.round(wk)} weeks ago`;
  const mo = day / 30;
  return `${Math.round(mo)} mo ago`;
}

export async function RecentActivity() {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("v_recent_activity")
    .select("kind, title, created_at")
    .order("created_at", { ascending: false })
    .limit(8);

  if (error || !data || data.length === 0) return null;

  const rows = data as ActivityRow[];

  return (
    <aside className="bg-white border border-utc-gold/30 rounded-lg p-4 mb-8">
      <p className="text-xs uppercase tracking-[0.2em] text-utc-gold-deep font-semibold mb-3">
        Recently on the roster
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {rows.map((r, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-foreground/85"
          >
            <span aria-hidden className="text-utc-gold mt-1 shrink-0">
              {r.kind === "photo_published" ? "📷" : "·"}
            </span>
            <span className="leading-snug">
              <span className="font-medium text-utc-navy">
                {r.kind === "photo_published" ? "Photo" : "Joined"}:
              </span>{" "}
              {r.title}
              <span className="block text-xs text-muted-foreground">
                {timeAgo(r.created_at)}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">
        Photos awaiting identification?{" "}
        <Link
          href="/identify"
          className="text-utc-navy font-semibold underline decoration-utc-gold underline-offset-4"
        >
          Help name them →
        </Link>
      </p>
    </aside>
  );
}
