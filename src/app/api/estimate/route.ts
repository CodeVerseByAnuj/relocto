import { NextResponse } from "next/server";
import { drivingDistanceKm } from "@/lib/googleMaps";
import {
  EMAIL_PATTERN,
  clean,
  sendNotification,
} from "@/lib/leads";
import { calculatePrice, formatInr } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";
import { getPricing } from "@/lib/queries/pricing";

const MAX_QUANTITY = 50;

interface EstimateRequestBody {
  fromPlaceId?: string;
  toPlaceId?: string;
  fromLabel?: string;
  toLabel?: string;
  /** Item id -> quantity. */
  items?: Record<string, unknown>;
  name?: string;
  email?: string;
  phone?: string;
}

export async function POST(request: Request) {
  let body: EstimateRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fromPlaceId = clean(body?.fromPlaceId, 300);
  const toPlaceId = clean(body?.toPlaceId, 300);
  const fromLabel = clean(body?.fromLabel, 300);
  const toLabel = clean(body?.toLabel, 300);
  const name = clean(body?.name, 200);
  const email = clean(body?.email, 320);
  const phone = clean(body?.phone, 50);

  if (!fromPlaceId || !toPlaceId || !fromLabel || !toLabel || !name || !email || !phone) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // Prices and distance come from our own data, never from the browser.
  const { categories, settings } = await getPricing();
  const selected = categories
    .flatMap((category) =>
      category.items.map((item) => ({ item, category: category.name }))
    )
    .flatMap(({ item, category }) => {
      const quantity = Math.min(
        Math.floor(Number(body.items?.[item.id])),
        MAX_QUANTITY
      );
      return quantity > 0
        ? [{ category, name: item.name, quantity, unitPrice: item.price }]
        : [];
    });

  if (selected.length === 0) {
    return NextResponse.json(
      { error: "Please add at least one item." },
      { status: 400 }
    );
  }

  let km: number | null;
  try {
    km = await drivingDistanceKm(fromPlaceId, toPlaceId);
  } catch (error) {
    console.error("Distance lookup failed:", error);
    return NextResponse.json(
      { error: "Could not calculate the distance." },
      { status: 502 }
    );
  }
  if (km === null) {
    return NextResponse.json(
      { error: "No driving route found between these locations." },
      { status: 404 }
    );
  }

  const itemsTotal = selected.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const estimate = calculatePrice(itemsTotal, km, settings);
  const distanceCharge = estimate - itemsTotal;

  let saved = true;
  try {
    await prisma.priceRequest.create({
      data: {
        name,
        email,
        phone,
        fromLabel,
        toLabel,
        km,
        items: selected,
        itemsTotal,
        distanceCharge,
        estimate,
      },
    });
  } catch (error) {
    saved = false;
    console.error("Failed to save price request:", error);
  }

  const emailed = await sendNotification(
    `New price request from ${name}`,
    [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `From: ${fromLabel}`,
      `To: ${toLabel}`,
      `Distance: ${km} km`,
      `Items: ${selected.map((i) => `${i.name} x ${i.quantity}`).join(", ")}`,
      `Estimate: ${formatInr(estimate)}`,
      "",
      "Review and send it from the admin panel: /admin/price-requests",
    ].join("\n"),
    email
  );

  if (!saved && !emailed) {
    return NextResponse.json(
      { error: "We could not save your request. Please call us instead." },
      { status: 502 }
    );
  }

  // The price is only shared with the team, not the customer.
  return NextResponse.json({ success: true });
}
