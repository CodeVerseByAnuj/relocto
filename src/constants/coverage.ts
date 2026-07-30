import { Globe2, MapPin, Truck, Users } from "lucide-react";
import type { MapLocation, StatWithIcon } from "@/types/sections";

export const COVERAGE_SECTION = {
  heading: {
    prefix: "Global",
    highlight: "Coverage",
  },
  tagline: [
    "Headquartered in Delhi",
    "Serving Across India",
    "Supporting International Mobility",
  ],
  legend: {
    own: "Our Locations",
    partner: "Partner Locations",
  },
} as const;

export const COVERAGE_STATS: StatWithIcon[] = [
  { icon: Globe2, value: "100+", label: "Countries covered" },
  { icon: MapPin, value: "300+", label: "Locations worldwide" },
  { icon: Users, value: "160+", label: "Global partners" },
  { icon: Truck, value: "Door-to-Door", label: "End-to-end support" },
];

export const COVERAGE_LOCATIONS: MapLocation[] = [
  { coordinates: [77.2, 28.6], type: "own" },
  { coordinates: [72.9, 19.1], type: "own" },
  { coordinates: [88.4, 22.6], type: "own" },
  { coordinates: [80.3, 13.1], type: "own" },
  { coordinates: [-0.1, 51.5], type: "own" },
  { coordinates: [-74.0, 40.7], type: "own" },
  { coordinates: [55.3, 25.3], type: "own" },
  { coordinates: [103.8, 1.3], type: "own" },

  { coordinates: [2.3, 48.9], type: "partner" },
  { coordinates: [13.4, 52.5], type: "partner" },
  { coordinates: [-3.7, 40.4], type: "partner" },
  { coordinates: [12.5, 41.9], type: "partner" },
  { coordinates: [37.6, 55.8], type: "partner" },
  { coordinates: [31.2, 30.0], type: "partner" },
  { coordinates: [28.0, -26.2], type: "partner" },
  { coordinates: [36.8, -1.3], type: "partner" },
  { coordinates: [-99.1, 19.4], type: "partner" },
  { coordinates: [-79.4, 43.7], type: "partner" },
  { coordinates: [-46.6, -23.6], type: "partner" },
  { coordinates: [-70.7, -33.4], type: "partner" },
  { coordinates: [151.2, -33.9], type: "partner" },
  { coordinates: [144.9, -37.8], type: "partner" },
  { coordinates: [151.8, -32.9], type: "partner" },
  { coordinates: [139.7, 35.7], type: "partner" },
  { coordinates: [126.9, 37.6], type: "partner" },
  { coordinates: [121.5, 31.2], type: "partner" },
  { coordinates: [114.1, 22.3], type: "partner" },
  { coordinates: [100.5, 13.8], type: "partner" },
  { coordinates: [106.8, -6.2], type: "partner" },
  { coordinates: [101.7, 3.1], type: "partner" },
  { coordinates: [58.4, 23.6], type: "partner" },
  { coordinates: [51.5, 25.3], type: "partner" },
  { coordinates: [35.2, 31.8], type: "partner" },
];
