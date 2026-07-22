"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import land from "world-atlas/land-110m.json";
import type { MapLocation } from "@/types/sections";

const MARKER_FILL: Record<MapLocation["type"], string> = {
  own: "var(--brand-navy)",
  partner: "var(--brand-accent)",
};

interface WorldMapProps {
  locations: MapLocation[];
}

export function WorldMap({ locations }: WorldMapProps) {
  return (
    <ComposableMap
      projectionConfig={{ scale: 148, center: [12, 8] }}
      width={800}
      height={420}
      role="img"
      aria-label="Map of countries and cities Relocato serves"
      className="h-full w-full"
    >
      <Geographies geography={land}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="var(--secondary)"
              stroke="var(--border)"
              strokeWidth={0.6}
              style={{
                default: { outline: "none" },
                hover: { outline: "none" },
                pressed: { outline: "none" },
              }}
            />
          ))
        }
      </Geographies>
      {locations.map((location, index) => (
        <Marker key={index} coordinates={location.coordinates}>
          <circle r={5} fill={MARKER_FILL[location.type]} opacity={0.2} />
          <circle r={2.5} fill={MARKER_FILL[location.type]} />
        </Marker>
      ))}
    </ComposableMap>
  );
}
