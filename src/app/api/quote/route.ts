import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_CONFIG } from "@/constants/site";

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

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let body: QuoteRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const missingField = REQUIRED_FIELDS.find((field) => !body[field]?.trim());
  if (missingField) {
    return NextResponse.json(
      { error: `Missing required field: ${missingField}` },
      { status: 400 }
    );
  }

  if (!EMAIL_PATTERN.test(body.email!.trim())) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const { name, email, country, phone, movingFrom, movingTo, message } = body;

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Relocato Website <onboarding@resend.dev>",
    to: process.env.QUOTE_NOTIFY_EMAIL ?? SITE_CONFIG.email,
    replyTo: email,
    subject: `New quote request from ${name}`,
    text: [
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
  });

  if (error) {
    console.error("Failed to send quote email:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
