import { NextResponse } from "next/server";
import { EMAIL_PATTERN, clean, sourcePath } from "@/lib/leads";
import { prisma } from "@/lib/prisma";

interface LeadRequestBody {
  /** Set when the visitor comes back and edits details already saved. */
  leadId?: string;
  name?: string;
  email?: string;
  phone?: string;
  fromLabel?: string;
  toLabel?: string;
}

/**
 * Saves the visitor's contact details as a lead for /admin/inquiries as soon as
 * they are entered, so the lead is kept even if they never pick any items.
 */
export async function POST(request: Request) {
  let body: LeadRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = clean(body?.name, 200);
  const email = clean(body?.email, 320);
  const phone = clean(body?.phone, 50);
  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const data = {
    name,
    email,
    phone,
    movingFrom: clean(body?.fromLabel, 200),
    movingTo: clean(body?.toLabel, 200),
  };

  try {
    const leadId = clean(body?.leadId, 100);
    // Only a still-new lead is edited, so the admin's follow-up is never overwritten.
    const existing = leadId
      ? await prisma.inquiry.findFirst({ where: { id: leadId, status: "NEW" } })
      : null;

    const lead = existing
      ? await prisma.inquiry.update({ where: { id: existing.id }, data })
      : await prisma.inquiry.create({
          data: {
            ...data,
            country: "India",
            message: "Price calculator lead (items not chosen yet).",
            sourcePath: sourcePath(request),
          },
        });

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("Failed to save lead:", error);
    return NextResponse.json({ error: "Could not save your details." }, { status: 502 });
  }
}
