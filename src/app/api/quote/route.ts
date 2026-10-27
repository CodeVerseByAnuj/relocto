import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  EMAIL_PATTERN,
  clean,
  sendNotification,
  sourcePath,
} from "@/lib/leads";

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
    `New quote request from ${name}`,
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
