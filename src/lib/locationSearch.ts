export interface LocationSearchEntry {
  slug: string;
  city: string;
  state: string;
  areas: string[];
}

export interface LocationSearchResult {
  slug: string;
  city: string;
  state: string;
  score: number;
  /** The area that produced the match, when the query didn't match the city itself. */
  matchedArea?: string;
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

/** Classic Levenshtein edit distance. */
function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  let curr = new Array<number>(b.length + 1);

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[b.length];
}

/** 0–1 similarity based on edit distance relative to the longer string. */
function similarity(a: string, b: string): number {
  const longest = Math.max(a.length, b.length);
  if (longest === 0) return 1;
  return 1 - editDistance(a, b) / longest;
}

function scoreEntry(
  query: string,
  entry: LocationSearchEntry
): { score: number; matchedArea?: string } {
  const city = normalize(entry.city);
  const state = normalize(entry.state);

  if (city === query) return { score: 1000 };
  if (city.startsWith(query)) return { score: 850 };
  if (city.includes(query)) return { score: 700 };
  // "noida uttar pradesh" -> matches "noida"
  if (query.includes(city) && city.length >= 3) return { score: 600 };

  // Areas: "greater noida" -> Noida
  let bestArea: { area: string; score: number } | null = null;
  for (const rawArea of entry.areas) {
    const area = normalize(rawArea);
    if (!area) continue;
    let areaScore = 0;
    if (area === query) areaScore = 550;
    else if (area.startsWith(query) || query.startsWith(area)) areaScore = 480;
    else if (area.includes(query) || query.includes(area)) areaScore = 400;
    else {
      const sim = similarity(area, query);
      if (sim >= 0.7) areaScore = Math.round(sim * 320);
    }
    if (areaScore > 0 && (!bestArea || areaScore > bestArea.score)) {
      bestArea = { area: rawArea, score: areaScore };
    }
  }
  if (bestArea) return { score: bestArea.score, matchedArea: bestArea.area };

  if (state.includes(query)) return { score: 220 };

  // Fuzzy fall-back on the city name for typos ("noda" -> "noida").
  const citySim = similarity(city, query);
  if (citySim >= 0.6) return { score: Math.round(citySim * 300) };

  return { score: 0 };
}

/**
 * Rank published locations against a free-text query. Matches on city, state and
 * the per-location "areas we cover" list, so e.g. searching "Greater Noida"
 * (which is an area, not its own page) surfaces the Noida location.
 */
export function searchLocations(
  rawQuery: string,
  entries: LocationSearchEntry[],
  limit = 5
): LocationSearchResult[] {
  const query = normalize(rawQuery);
  if (query.length < 2) return [];

  return entries
    .map((entry) => {
      const { score, matchedArea } = scoreEntry(query, entry);
      return {
        slug: entry.slug,
        city: entry.city,
        state: entry.state,
        score,
        matchedArea,
      };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.city.localeCompare(b.city))
    .slice(0, limit);
}
