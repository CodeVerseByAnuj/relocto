import { NextResponse } from "next/server";
import { listPublishedLocations } from "@/lib/queries/location";

// Query at request time: the DB isn't reachable during `next build` (e.g. in Docker).
export const dynamic = "force-dynamic";

export async function GET() {
  const locations = await listPublishedLocations();
  return NextResponse.json({ count: locations.length, locations });
}
