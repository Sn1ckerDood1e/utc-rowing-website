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
  if (day < 14) return `${Math.round(day)} d ago`;
  const wk = day / 7;
  if (wk < 8) return `${Math.round(wk)} wk ago`;
  const mo = day / 30;
  return `${Math.round(mo)} mo ago`;
}

export async function RecentActivity() {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("v_recent_activity")
    .select("kind, title, created_at")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error || !data || data.length === 0) return null;

  const rows = data as ActivityRow[];

  return (
    <aside className="bg-white border border-utc-gold/30 rounded-lg px-4 py-3 mb-6">
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <p className="text-[10px] uppercase tracking-[0.18em] text-utc-gold-deep font-semibold">
          Recently on the roster
        </p>
        <Link
          href="/identify"
          className="text-xs text-utc-navy font-medium underline decoration-utc-gold underline-offset-4 hover:text-utc-gold-deep transition-colors shrink-0"
        >
          Help name photos →
        </Link>
      </div>
      <ul className="grid gap-x-4 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3 text-sm">
        {rows.map((r, i) => (
          <li
            key={i}
            className="flex items-baseline gap-2 text-foreground/85 leading-snug"
          >
            <span aria-hidden className="text-utc-gold shrink-0 text-xs">
              {r.kind === "photo_published" ? "▣" : "+"}
            </span>
            <span className="truncate">
              <span className="font-medium text-utc-navy">{r.title}</span>
              <span className="text-muted-foreground text-xs ml-1.5">
                · {timeAgo(r.created_at)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
