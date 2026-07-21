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
  { lat: 44.28, lng: -115.68 }, // Deadwood Reservoir, Boise NF, ID
  { lat: 44.72, lng: -115.92 }, // North Fork Payette River, ID
  { lat: 45.05, lng: -110.5 }, // Yellowstone River, MT
  { lat: 40.9,  lng: -109.4 }, // Flaming Gorge, UT
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
 *   Base                  +0.20
 *   Catch log             +0.12 per catch, capped at +0.55
 *   Highway proximity     up to +0.28 (within 60 km)
 *   Park proximity        up to +0.18 (within 40 km)
 *
 * Reducers:
 *   moderate access       −0.15
 *   hike required         −0.38
 */
export function computeSpotPressure(spot: FishingSpot, catches: CatchLog[]): number {
  const catchCount = catches.filter((c) => c.spotId === spot.id).length;
  const catchPressure = Math.min(catchCount * 0.12, 0.55);

  const hwBonus = proximityBonus(spot.lat, spot.lng, HIGHWAY_ANCHORS, 60, 0.28);
  const parkBonus = proximityBonus(spot.lat, spot.lng, PARK_ANCHORS, 40, 0.18);

  const diffPenalty =
    spot.accessDifficulty === 'hike'
      ? 0.38
      : spot.accessDifficulty === 'moderate'
      ? 0.15
      : 0;

  return Math.max(0, Math.min(1, 0.2 + catchPressure + hwBonus + parkBonus - diffPenalty));
}

/**
 * Build the full heatmap point set:
 *  1. Per-spot pressure circles derived from catches + access + infrastructure
 *  2. Background highway corridor blobs
 *  3. Background park / recreation area blobs
 */
export function computePressurePoints(
  spots: FishingSpot[],
  catches: CatchLog[]
): HeatmapPoint[] {
  const points: HeatmapPoint[] = [];

  for (const spot of spots) {
    points.push({
      lat: spot.lat,
      lng: spot.lng,
      pressure: computeSpotPressure(spot, catches),
      radius: 42,
    });
  }

  for (const anchor of HIGHWAY_ANCHORS) {
    points.push({ lat: anchor.lat, lng: anchor.lng, pressure: 0.62, radius: 65 });
  }

  for (const anchor of PARK_ANCHORS) {
    points.push({ lat: anchor.lat, lng: anchor.lng, pressure: 0.48, radius: 55 });
  }

  return points;
}
