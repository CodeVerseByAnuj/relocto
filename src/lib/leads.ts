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

/** Email the lead to the team. Returns false when not configured or it fails. */
export async function sendNotification(
  subject: string,
  text: string,
  replyTo: string
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured; skipping lead email.");
    return false;
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ??
        "Relocato Website <onboarding@resend.dev>",
      to: process.env.QUOTE_NOTIFY_EMAIL ?? SITE_CONFIG.email,
      replyTo,
      subject,
      text,
    });
    if (error) {
      console.error("Failed to send lead email:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Failed to send lead email:", error);
    return false;
  }
}
