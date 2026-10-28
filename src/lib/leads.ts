import { Resend } from "resend";
import { SITE_CONFIG } from "@/constants/site";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trimmed text capped to a sane length, or null when blank / not a string. */
export function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  return value.trim().slice(0, max) || null;
}

/** Path of the page the form was submitted from, taken from the Referer. */
export function sourcePath(request: Request): string | null {
  const referer = request.headers.get("referer");
  if (!referer) return null;
  try {
    return new URL(referer).pathname.slice(0, 300);
  } catch {
    return null;
  }
}

interface Email {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}

/** Send an email through Resend. Returns false when not configured or it fails. */
export async function sendEmail({ attachments, ...email }: Email) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured; skipping email.");
    return false;
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ??
        "Relocato Website <onboarding@resend.dev>",
      attachments,
      ...email,
    });
    if (error) {
      console.error("Failed to send email:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

/** Email the lead to the team. */
export function sendNotification(subject: string, text: string, replyTo: string) {
  return sendEmail({
    to: process.env.QUOTE_NOTIFY_EMAIL ?? SITE_CONFIG.email,
    subject,
    text,
    replyTo,
  });
}
