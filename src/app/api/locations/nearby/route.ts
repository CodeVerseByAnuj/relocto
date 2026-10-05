import { NextResponse } from "next/server";
import { listLocationSearchEntries } from "@/lib/queries/location";
import { searchLocations } from "@/lib/locationSearch";

export const dynamic = "force-dynamic";

// A city or "areas we cover" match in searchLocations; below this it is only a
// state-level or fuzzy guess, which is not good enough to call "your city".
const MIN_MATCH_SCORE = 400;
const LOOKUP_TIMEOUT_MS = 2000;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const CACHE_MAX_ENTRIES = 5000;

/** Visitor IP -> city name reported by the geolocation provider ("" = unknown). */
const cityByIp = new Map<string, { city: string; expires: number }>();

function clientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0];
  const ip = (forwarded ?? request.headers.get("x-real-ip") ?? "").trim();
  if (!ip) return null;
  // Local and private addresses can't be geolocated.
  if (
    /^(127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(ip) ||
    /^(::1$|::ffff:127\.|f[cd]|fe80:)/i.test(ip)
  ) {
    return null;
  }
  return ip;
}

async function lookupCity(ip: string): Promise<string> {
  const cached = cityByIp.get(ip);
  if (cached && cached.expires > Date.now()) return cached.city;

  let city = "";
  try {
    const res = await fetch(
      process.env.IP_GEO_URL!.replace("{ip}", encodeURIComponent(ip)),
      { signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS), cache: "no-store" }
    );
    if (res.ok) {
      const data: unknown = await res.json();
      const value = (data as { city?: unknown } | null)?.city;
      if (typeof value === "string") city = value.trim();
    }
  } catch {
    // Provider down or slow: treat as unknown, and cache it so we don't retry
    // on every page view.
  }

  if (cityByIp.size >= CACHE_MAX_ENTRIES) cityByIp.clear();
  cityByIp.set(ip, { city, expires: Date.now() + CACHE_TTL_MS });
  return city;
}

/**
 * GET /api/locations/nearby -> the published location matching the visitor's
 * city, guessed from their IP via the provider configured in IP_GEO_URL.
 * Returns { location: null } when unconfigured, unknown, or not a city we serve.
 */
export async function GET(request: Request) {
  const headers = { "Cache-Control": "private, no-store" };
  const ip = process.env.IP_GEO_URL ? clientIp(request) : null;
  if (!ip) return NextResponse.json({ location: null }, { headers });

  const city = await lookupCity(ip);
  if (!city) return NextResponse.json({ location: null }, { headers });

  const [match] = searchLocations(city, await listLocationSearchEntries(), 1);
  const location =
    match && match.score >= MIN_MATCH_SCORE
      ? { slug: match.slug, city: match.city, state: match.state }
      : null;
  return NextResponse.json({ location }, { headers });
}
