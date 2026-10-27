import { NextResponse } from "next/server";
import { clean } from "@/lib/leads";
import { drivingDistanceKm } from "@/lib/googleMaps";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const from = clean(params.get("from"), 300);
  const to = clean(params.get("to"), 300);

  if (!from || !to) {
    return NextResponse.json(
      { error: "Both locations are required." },
      { status: 400 }
    );
  }

  try {
    const km = await drivingDistanceKm(from, to);
    if (km === null) {
      return NextResponse.json(
        { error: "No driving route found between these locations." },
        { status: 404 }
      );
    }
    return NextResponse.json({ km });
  } catch (error) {
    console.error("Distance lookup failed:", error);
    return NextResponse.json(
      { error: "Could not calculate the distance." },
      { status: 502 }
    );
  }
}
