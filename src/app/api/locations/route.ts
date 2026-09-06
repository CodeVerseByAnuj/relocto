import { NextResponse } from "next/server";
import { listPublishedLocations } from "@/lib/queries/location";

export const revalidate = 60;

export async function GET() {
  const locations = await listPublishedLocations();
  return NextResponse.json({ count: locations.length, locations });
}
