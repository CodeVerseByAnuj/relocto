import { NextResponse } from "next/server";
import { getPublishedLocation } from "@/lib/queries/location";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const location = await getPublishedLocation(slug);

  if (!location) {
    return NextResponse.json({ error: "Location not found." }, { status: 404 });
  }

  return NextResponse.json({ location });
}
