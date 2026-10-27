import { NextResponse } from "next/server";
import { clean } from "@/lib/leads";
import { autocompletePlaces } from "@/lib/googleMaps";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const input = clean(params.get("q"), 200);
  const session = clean(params.get("session"), 100) ?? undefined;

  if (!input || input.length < 3) return NextResponse.json({ suggestions: [] });

  try {
    return NextResponse.json({
      suggestions: await autocompletePlaces(input, session),
    });
  } catch (error) {
    console.error("Place suggestions failed:", error);
    return NextResponse.json(
      { error: "Could not load location suggestions." },
      { status: 502 }
    );
  }
}
