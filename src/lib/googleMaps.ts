/**
 * Server-side Google Maps calls (Places API (New) + Routes API). The key stays
 * on the server; the browser only talks to our own /api/places and /api/distance.
 */

const AUTOCOMPLETE_URL = "https://places.googleapis.com/v1/places:autocomplete";
const ROUTES_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";

export interface PlaceSuggestion {
  placeId: string;
  description: string;
}

function apiKey() {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) throw new Error("GOOGLE_MAPS_API_KEY is not configured.");
  return key;
}

/** Address suggestions in India for what the user has typed so far. */
export async function autocompletePlaces(
  input: string,
  sessionToken?: string
): Promise<PlaceSuggestion[]> {
  const response = await fetch(AUTOCOMPLETE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey(),
    },
    body: JSON.stringify({
      input,
      sessionToken,
      includedRegionCodes: ["in"],
    }),
  });
  if (!response.ok) {
    throw new Error(`Places autocomplete failed: ${response.status}`);
  }

  const data = (await response.json()) as {
    suggestions?: {
      placePrediction?: { placeId: string; text?: { text?: string } };
    }[];
  };

  return (data.suggestions ?? []).flatMap((suggestion) => {
    const prediction = suggestion.placePrediction;
    if (!prediction?.placeId) return [];
    return [
      {
        placeId: prediction.placeId,
        description: prediction.text?.text ?? "",
      },
    ];
  });
}

/** Driving distance in kilometres between two places, or null if no route. */
export async function drivingDistanceKm(
  fromPlaceId: string,
  toPlaceId: string
): Promise<number | null> {
  const response = await fetch(ROUTES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey(),
      "X-Goog-FieldMask": "routes.distanceMeters",
    },
    body: JSON.stringify({
      origin: { placeId: fromPlaceId },
      destination: { placeId: toPlaceId },
      travelMode: "DRIVE",
    }),
  });
  if (!response.ok) {
    throw new Error(`Route lookup failed: ${response.status}`);
  }

  const data = (await response.json()) as {
    routes?: { distanceMeters?: number }[];
  };
  const meters = data.routes?.[0]?.distanceMeters;
  if (typeof meters !== "number") return null;
  return Math.round(meters / 100) / 10;
}
