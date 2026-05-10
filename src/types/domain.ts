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

  is_published: boolean;
  created_at: string;
  updated_at: string;
};

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
