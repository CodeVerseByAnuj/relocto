import { NextResponse } from "next/server";
import { listLocationSearchEntries } from "@/lib/queries/location";
import { searchLocations } from "@/lib/locationSearch";

export const revalidate = 60;

/** GET /api/locations/search?q=greater+noida -> ranked location suggestions. */
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) {
    return NextResponse.json({ query: q, results: [] });
  }

  const entries = await listLocationSearchEntries();
  const results = searchLocations(q, entries, 6);
  return NextResponse.json({ query: q, results });
}
