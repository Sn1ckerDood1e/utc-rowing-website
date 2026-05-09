import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

const FROM = process.env.EMAIL_FROM || "onboarding@resend.dev";
const ADMIN_TO = process.env.EMAIL_ADMIN_TO || "kinseymi@radl.solutions";

export async function sendSubmissionConfirmation(args: {
  to: string;
  name: string;
}) {
  const r = getResend();
  if (!r) {
    console.warn("RESEND_API_KEY not set — skipping confirmation email");
    return;
  }

  return r.emails.send({
    from: FROM,
    to: args.to,
    subject: "Thanks for submitting to UTC Rowing alumni",
    html: `<p>Hi ${escapeHtml(args.name)},</p>
<p>Thank you for adding to the UTC Rowing alumni record. We've received your submission and a coach or volunteer will review it shortly.</p>
<p>If you have a photo, document, or additional story to share, you can submit again at any time at <a href="https://utcrowing.org/submit">utcrowing.org/submit</a>.</p>
<p>Go Mocs.</p>
<p>— UTC Rowing</p>`,
  });
}

export async function notifyAdminOfSubmission(args: {
  submissionId: string;
  submitterName: string;
  submitterEmail: string;
  formLevel: number;
  topic?: string | null;
  body?: string | null;
}) {
  const r = getResend();
  if (!r) {
    console.warn("RESEND_API_KEY not set — skipping admin email");
    return;
  }

  const subject = `[UTC Rowing] New ${
    args.formLevel === 1 ? "alumni signup" : "submission"
  } from ${args.submitterName}`;

  return r.emails.send({
    from: FROM,
    to: ADMIN_TO,
    subject,
    html: `<h3>New submission</h3>
<p><strong>From:</strong> ${escapeHtml(args.submitterName)} &lt;${escapeHtml(
      args.submitterEmail
    )}&gt;</p>
<p><strong>Form level:</strong> ${args.formLevel}</p>
${args.topic ? `<p><strong>Topic:</strong> ${escapeHtml(args.topic)}</p>` : ""}
${
  args.body
    ? `<p><strong>Body:</strong></p><blockquote>${escapeHtml(args.body).replace(
        /\n/g,
        "<br>"
      )}</blockquote>`
    : ""
}
<p><a href="https://supabase.com/dashboard/project/_/editor">Review in Supabase Studio →</a></p>`,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
