import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_CONFIG } from "@/constants/site";
import { prisma } from "@/lib/prisma";

interface QuoteRequestBody {
  name?: string;
  email?: string;
  country?: string;
  phone?: string;
  movingFrom?: string;
  movingTo?: string;
  message?: string;
}

const REQUIRED_FIELDS: (keyof QuoteRequestBody)[] = [
  "name",
  "email",
  "country",
  "phone",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trimmed text capped to a sane length, or null when blank / not a string. */
function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  return value.trim().slice(0, max) || null;
}

/** Path of the page the form was submitted from, taken from the Referer. */
function sourcePath(request: Request): string | null {
  const referer = request.headers.get("referer");
  if (!referer) return null;
  try {
    return new URL(referer).pathname.slice(0, 300);
  } catch {
    return null;
  }
}

/** Email the lead to the team. Returns false when not configured or it fails. */
async function sendNotification(text: string, name: string, replyTo: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured; skipping quote email.");
    return false;
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ??
        "Relocato Website <onboarding@resend.dev>",
      to: process.env.QUOTE_NOTIFY_EMAIL ?? SITE_CONFIG.email,
      replyTo,
      subject: `New quote request from ${name}`,
      text,
    });
    if (error) {
      console.error("Failed to send quote email:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Failed to send quote email:", error);
    return false;
  }
}

export async function POST(request: Request) {
  let body: QuoteRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const inquiry = {
    name: clean(body?.name, 200),
    email: clean(body?.email, 320),
    country: clean(body?.country, 100),
    phone: clean(body?.phone, 50),
    movingFrom: clean(body?.movingFrom, 200),
    movingTo: clean(body?.movingTo, 200),
    message: clean(body?.message, 5000),
  };

  const missingField = REQUIRED_FIELDS.find((field) => !inquiry[field]);
  if (missingField) {
    return NextResponse.json(
      { error: `Missing required field: ${missingField}` },
      { status: 400 }
    );
  }

  const { name, email, country, phone, movingFrom, movingTo, message } = inquiry;
  if (!EMAIL_PATTERN.test(email!)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // Store the lead for /admin/inquiries first, so it is kept even when the
  // notification email cannot be sent.
  let saved = true;
  try {
    await prisma.inquiry.create({
      data: {
        name: name!,
        email: email!,
        country: country!,
        phone: phone!,
        movingFrom,
        movingTo,
        message,
        sourcePath: sourcePath(request),
      },
    });
  } catch (error) {
    saved = false;
    console.error("Failed to save inquiry:", error);
  }

  const emailed = await sendNotification(
    [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Country: ${country}`,
      movingFrom ? `Moving From: ${movingFrom}` : null,
      movingTo ? `Moving To: ${movingTo}` : null,
      message ? `Message: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
    name!,
    email!
  );

  // The lead reached us if it was either stored or emailed.
  if (!saved && !emailed) {
    return NextResponse.json(
      { error: "We could not send your request. Please call us instead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
