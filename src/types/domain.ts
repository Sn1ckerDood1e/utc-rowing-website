export type Era = "founding" | "carney" | "espeseth" | "worth" | "resurrection";

export const ERA_LABELS: Record<Era, string> = {
  founding: "Founding (pre-1983)",
  carney: "Carney era (1983–1989)",
  espeseth: "Espeseth era (1989–2017)",
  worth: "Worth era (2018–2022/23)",
  resurrection: "Resurrection (2025–)",
};

export const ERA_ORDER: Era[] = [
  "founding",
  "carney",
  "espeseth",
  "worth",
  "resurrection",
];

export type Alumni = {
  id: string;
  slug: string;
  canonical_name: string;
  variants: string | null;
  first_year: number | null;
  last_year: number | null;
  era: Era;
  regattas: string | null;
  sources: string | null;
  n_appearances: number;

  bio: string | null;
  hometown: string | null;
  major: string | null;
  graduation_year: number | null;
  achievements: string | null;
  hero_image_url: string | null;

  is_featured: boolean;
  featured_rank: number | null;
  featured_photo_id: string | null;
  featured_medal_label: string | null;
  featured_medal_kind: string | null;
  featured_class_label: string | null;

  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type Photo = {
  id: string;
  storage_path: string;
  mime_type: string;
  width: number | null;
  height: number | null;
  rotation: number;
  caption: string | null;
  date_taken_text: string | null;
  date_taken_year: number | null;
  era: Era | null;
  regatta: string | null;
  location: string | null;
  boat_type: string | null;
  submitter_alumni_id: string | null;
  submitter_name: string;
  submitter_email: string | null;
  attribution: "attributed" | "anonymous" | "internal" | "pending";
  credit_note: string | null;
  source_submission_id: string | null;
  source_email_thread_id: string | null;
  status: "draft" | "review" | "published" | "hidden";
  needs_identification: boolean;
  identification_notes: string | null;
  admin_notes: string | null;
  featured_rank: number | null;
  is_hero_eligible: boolean;
  created_at: string;
  updated_at: string;
};

export type PhotoPerson = {
  id: string;
  photo_id: string;
  alumni_id: string | null;
  role: string | null;
  position_in_photo: string | null;
  identified_by_alumni_id: string | null;
  identified_by_submission_id: string | null;
  identified_by_name: string | null;
  confidence: "confirmed" | "submitter" | "crowd" | "guess";
  notes: string | null;
  identified_at: string;
};

/**
 * Build a public Supabase Storage URL for a photo's storage_path.
 * Bucket `photos` is public-read, so this URL works in <img>/<Image> directly.
 */
export function photoUrl(storage_path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return "";
  return `${base}/storage/v1/object/public/photos/${storage_path}`;
}

export type Submission = {
  id: string;
  form_level: 1 | 2 | 3;
  status: "pending" | "approved" | "rejected" | "needs_followup";
  submitter_name: string;
  submitter_email: string;
  years_rowed: string | null;
  coach_during_rowing: string | null;
  topic: string | null;
  body: string | null;
  publish_permission: "attributed" | "anonymous" | "internal" | null;
  related_alumni_id: string | null;
  created_at: string;
};
