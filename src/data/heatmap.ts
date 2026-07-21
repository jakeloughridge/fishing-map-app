import { FishingSpot } from './spots';
import { CatchLog } from './catches';

export type HeatmapPoint = {
  lat: number;
  lng: number;
  pressure: number; // 0.0 (low) to 1.0 (high)
  radius?: number;  // override render radius in pixels (default 40)
};

// ─── Infrastructure Anchors ───────────────────────────────────────────────────
// Major US interstate corridors. Fishing spots near these have higher pressure
// because they're easier to reach — more angler traffic.

const HIGHWAY_ANCHORS: { lat: number; lng: number }[] = [
  // I-90 (Seattle → Boston, ~lat 47 west, drops to 42 east)
  { lat: 47.6, lng: -122.1 }, { lat: 47.0, lng: -113.0 },
  { lat: 44.0, lng: -103.2 }, { lat: 43.5, lng: -88.5 },
  { lat: 42.4, lng: -76.5 },  { lat: 42.1, lng: -71.5 },

  // I-80 (San Francisco → NYC)
  { lat: 37.8, lng: -122.3 }, { lat: 40.6, lng: -111.0 },
  { lat: 41.1, lng: -96.0 },  { lat: 41.8, lng: -87.8 },
  { lat: 40.7, lng: -74.0 },

  // I-70 (Denver → Baltimore)
  { lat: 39.7, lng: -104.9 }, { lat: 39.1, lng: -96.6 },
  { lat: 39.1, lng: -84.5 },  { lat: 39.3, lng: -76.6 },

  // I-40 (Barstow CA → Wilmington NC)
  { lat: 35.0, lng: -117.0 }, { lat: 35.1, lng: -106.6 },
  { lat: 35.5, lng: -97.5 },  { lat: 35.1, lng: -89.9 },
  { lat: 35.8, lng: -78.6 },

  // I-10 (Santa Monica → Jacksonville)
  { lat: 34.0, lng: -118.2 }, { lat: 31.8, lng: -106.4 },
  { lat: 30.4, lng: -88.9 },  { lat: 30.3, lng: -81.6 },

  // I-5 (West coast, north–south)
  { lat: 48.7, lng: -122.4 }, { lat: 45.5, lng: -122.6 },
  { lat: 37.8, lng: -122.4 }, { lat: 32.7, lng: -117.1 },

  // I-95 (East coast, north–south)
  { lat: 44.8, lng: -68.8 },  { lat: 42.4, lng: -71.1 },
  { lat: 40.7, lng: -74.0 },  { lat: 37.5, lng: -77.4 },
  { lat: 33.7, lng: -84.4 },  { lat: 30.3, lng: -81.6 },
  { lat: 25.8, lng: -80.2 },

  // I-35 (Duluth, MN → Laredo, TX)
  { lat: 46.8, lng: -92.1 },  { lat: 44.0, lng: -93.0 },
  { lat: 39.1, lng: -94.6 },  { lat: 35.5, lng: -97.5 },
  { lat: 29.4, lng: -98.5 },

  // I-75 (Sault Ste. Marie → Miami)
  { lat: 43.4, lng: -83.9 },  { lat: 42.3, lng: -83.0 },
  { lat: 39.1, lng: -84.5 },  { lat: 33.7, lng: -84.4 },
  { lat: 27.9, lng: -82.5 },  { lat: 25.8, lng: -80.2 },

  // I-25 (Albuquerque to Denver)
  { lat: 35.1, lng: -106.6 }, { lat: 37.2, lng: -104.6 },
  { lat: 39.7, lng: -104.9 },

  // US-2 (Northern Montana)
  { lat: 48.5, lng: -114.0 }, { lat: 48.3, lng: -106.0 },
];

// ─── Park / Rec Area Anchors ──────────────────────────────────────────────────
// National parks, wilderness areas, and major public fishing destinations.
// Spots near these have elevated pressure from recreational traffic.

const PARK_ANCHORS: { lat: number; lng: number }[] = [
  { lat: 44.4,  lng: -110.5 }, // Yellowstone NP
  { lat: 43.7,  lng: -110.7 }, // Grand Teton NP
  { lat: 40.4,  lng: -105.7 }, // Rocky Mountain NP / Estes Park
  { lat: 39.1,  lng: -120.0 }, // Lake Tahoe basin
  { lat: 47.8,  lng: -124.0 }, // Olympic NP
  { lat: 47.9,  lng: -121.7 }, // North Cascades
  { lat: 37.8,  lng: -119.5 }, // Yosemite NP
  { lat: 36.2,  lng: -112.0 }, // Grand Canyon NP
  { lat: 37.0,  lng: -111.5 }, // Lake Powell / Glen Canyon
  { lat: 36.1,  lng: -114.7 }, // Lake Mead NRA
  { lat: 47.9,  lng: -114.1 }, // Flathead Lake, MT
  { lat: 43.61, lng: -116.20 }, // Boise River Greenbelt, ID
  { lat: 43.52, lng: -115.61 }, // South Fork Boise River, ID
  { lat: 44.18, lng: -115.93 }, // Middle Fork Payette River, ID
  { lat: 44.72, lng: -115.92 }, // North Fork Payette River, ID
  { lat: 45.05, lng: -110.5 }, // Yellowstone River, MT
  { lat: 40.9,  lng: -109.4 }, // Flaming Gorge, UT
  { lat: 38.98, lng: -105.65 }, // The Dream Stream, CO
  { lat: 38.47, lng: -107.25 }, // Blue Mesa Reservoir, CO
  { lat: 39.36, lng: -107.03 }, // Roaring Fork River, CO
  { lat: 35.7,  lng: -83.5 },  // Great Smoky Mountains NP
  { lat: 36.35, lng: -92.6 },  // White River / Bull Shoals, AR
  { lat: 35.8,  lng: -93.0 },  // Ozark NF, AR
  { lat: 47.92, lng: -91.5 },  // Boundary Waters BWCA, MN
  { lat: 44.48, lng: -87.9 },  // Green Bay / Peninsula SP, WI
  { lat: 41.73, lng: -82.8 },  // Lake Erie marinas, OH
  { lat: 44.91, lng: -70.7 },  // Rangeley Lake, ME
  { lat: 44.2,  lng: -74.2 },  // Adirondacks, NY
  { lat: 41.0,  lng: -75.0 },  // Delaware Water Gap, NJ/PA
  { lat: 36.8,  lng: -84.3 },  // Cumberland Falls, KY
  { lat: 36.1,  lng: -84.0 },  // Norris Dam / Clinch River, TN
  { lat: 26.9,  lng: -80.8 },  // Lake Okeechobee, FL
  { lat: 25.4,  lng: -80.9 },  // Everglades NP
  { lat: 30.7,  lng: -82.2 },  // Okefenokee, GA
  { lat: 37.0,  lng: -76.0 },  // Chesapeake Bay, VA
  { lat: 29.1,  lng: -103.2 }, // Big Bend NP, TX
  { lat: 31.1,  lng: -94.1 },  // Sam Rayburn Reservoir, TX
];

// ─── Major City Anchors ───────────────────────────────────────────────────────
// Major US metropolitan areas. Cities have high fishing pressure (0.88+) on heatmap.

const MAJOR_CITY_ANCHORS: { lat: number; lng: number }[] = [
  { lat: 40.71, lng: -74.01 }, // New York City, NY
  { lat: 34.05, lng: -118.24 }, // Los Angeles, CA
  { lat: 41.88, lng: -87.63 },  // Chicago, IL
  { lat: 29.76, lng: -95.37 },  // Houston, TX
  { lat: 33.45, lng: -112.07 }, // Phoenix, AZ
  { lat: 39.95, lng: -75.17 },  // Philadelphia, PA
  { lat: 29.42, lng: -98.49 },  // San Antonio, TX
  { lat: 32.72, lng: -117.16 }, // San Diego, CA
  { lat: 32.78, lng: -96.80 },  // Dallas, TX
  { lat: 37.77, lng: -122.42 }, // San Francisco, CA
  { lat: 30.27, lng: -97.74 },  // Austin, TX
  { lat: 47.61, lng: -122.33 }, // Seattle, WA
  { lat: 39.74, lng: -104.99 }, // Denver, CO
  { lat: 38.90, lng: -77.04 },  // Washington, DC
  { lat: 39.29, lng: -76.61 },  // Baltimore, MD
  { lat: 42.36, lng: -71.06 },  // Boston, MA
  { lat: 33.75, lng: -84.39 },  // Atlanta, GA
  { lat: 25.76, lng: -80.19 },  // Miami, FL
  { lat: 27.95, lng: -82.46 },  // Tampa, FL
  { lat: 42.33, lng: -83.05 },  // Detroit, MI
  { lat: 44.98, lng: -93.27 },  // Minneapolis, MN
  { lat: 38.63, lng: -90.20 },  // St. Louis, MO
  { lat: 29.95, lng: -90.07 },  // New Orleans, LA
  { lat: 36.16, lng: -86.78 },  // Nashville, TN
  { lat: 40.76, lng: -111.89 }, // Salt Lake City, UT
  { lat: 45.52, lng: -122.68 }, // Portland, OR
  { lat: 43.62, lng: -116.20 }, // Boise, ID
  { lat: 36.85, lng: -75.98 },  // Virginia Beach / Norfolk, VA
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function proximityBonus(
  lat: number,
  lng: number,
  anchors: { lat: number; lng: number }[],
  radiusKm: number,
  maxBonus: number
): number {
  let best = 0;
  for (const anchor of anchors) {
    const dist = distanceKm(lat, lng, anchor.lat, anchor.lng);
    if (dist < radiusKm) {
      const effect = maxBonus * (1 - dist / radiusKm);
      if (effect > best) best = effect;
    }
  }
  return best;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Pressure drivers (additive):
 *   Base                  +0.25
 *   City proximity        up to +0.32 (within 50 km)
 *   Highway proximity     up to +0.28 (within 60 km)
 *   Park proximity        up to +0.18 (within 40 km)
 *
 * Reducers:
 *   moderate access       −0.15
 *   hike required         −0.38
 */
export function computeSpotPressure(spot: FishingSpot): number {
  if (spot.pressureOverride !== undefined) {
    return spot.pressureOverride;
  }

  const cityBonus = proximityBonus(spot.lat, spot.lng, MAJOR_CITY_ANCHORS, 50, 0.32);
  const hwBonus = proximityBonus(spot.lat, spot.lng, HIGHWAY_ANCHORS, 60, 0.28);
  const parkBonus = proximityBonus(spot.lat, spot.lng, PARK_ANCHORS, 40, 0.18);

  const diffPenalty =
    spot.accessDifficulty === 'hike'
      ? 0.38
      : spot.accessDifficulty === 'moderate'
      ? 0.15
      : 0;

  return Math.max(0, Math.min(1, 0.25 + cityBonus + hwBonus + parkBonus - diffPenalty));
}

/**
 * Build the full heatmap point set:
 *  1. Per-spot pressure circles derived from access + infrastructure
 *  2. Background major city high-pressure blobs (0.88)
 *  3. Background highway corridor blobs
 *  4. Background park / recreation area blobs
 */
export function computePressurePoints(
  spots: FishingSpot[]
): HeatmapPoint[] {
  const points: HeatmapPoint[] = [];

  for (const spot of spots) {
    points.push({
      lat: spot.lat,
      lng: spot.lng,
      pressure: computeSpotPressure(spot),
      radius: 42,
    });
  }

  for (const city of MAJOR_CITY_ANCHORS) {
    points.push({ lat: city.lat, lng: city.lng, pressure: 0.88, radius: 75 });
  }

  for (const anchor of HIGHWAY_ANCHORS) {
    points.push({ lat: anchor.lat, lng: anchor.lng, pressure: 0.62, radius: 65 });
  }

  for (const anchor of PARK_ANCHORS) {
    points.push({ lat: anchor.lat, lng: anchor.lng, pressure: 0.48, radius: 55 });
  }

  return points;
}
