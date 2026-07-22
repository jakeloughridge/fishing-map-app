import { getSpots } from '@/data/spots';

const MAJOR_WATER_KEYWORDS = [
  'bay', 'lake', 'sound', 'gulf', 'sea', 'ocean', 'reservoir', 'river', 'harbor', 'estuary', 'strait'
];

const MINOR_WATER_KEYWORDS = [
  'creek', 'branch', 'stream', 'cove', 'channel', 'slough', 'pond', 'swamp', 'oxbow', 'ditch', 'inlet'
];

const ALL_WATER_KEYWORDS = [...MAJOR_WATER_KEYWORDS, ...MINOR_WATER_KEYWORDS];

/**
 * Calculates distance in miles between two lat/lng coordinates (Haversine formula)
 */
function getDistanceMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Automatically detects the name of a body of water based on pinned coordinates,
 * prioritizing major water bodies (Bays, Lakes, Rivers, Sounds) over minor local creeks.
 */
export async function detectWaterBodyName(lat: number, lng: number): Promise<string> {
  // 1. Try OpenStreetMap Overpass API for water feature geometry around coordinates
  try {
    const query = `[out:json][timeout:6];(
      relation["natural"="water"](around:6000, ${lat}, ${lng});
      way["natural"="water"](around:6000, ${lat}, ${lng});
      relation["waterway"](around:6000, ${lat}, ${lng});
      way["waterway"](around:6000, ${lat}, ${lng});
    );out tags;`;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'FishMapperApp/1.0 (https://github.com/jakeloughridge/fishing-map-app)',
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.elements) && data.elements.length > 0) {
        const names = data.elements
          .map((e: { tags?: { name?: string } }) => e.tags && e.tags.name)
          .filter((name: string | undefined): name is string => Boolean(name && name.trim()));

        // TIER 1: Prioritize MAJOR water bodies (Bay, Lake, River, Sound, Reservoir, Ocean, Gulf, Sea)
        const majorMatch = names.find((name: string) =>
          MAJOR_WATER_KEYWORDS.some((kw) => name.toLowerCase().includes(kw))
        );

        if (majorMatch) {
          return majorMatch;
        }

        // TIER 2: Secondary water bodies (Creek, Stream, Channel, Cove)
        const minorMatch = names.find((name: string) =>
          MINOR_WATER_KEYWORDS.some((kw) => name.toLowerCase().includes(kw))
        );

        if (minorMatch) {
          return minorMatch;
        }

        if (names.length > 0) {
          return names[0];
        }
      }
    }
  } catch (err) {
    console.warn('Overpass water query skipped:', err);
  }

  // 2. Check proximity to known spots in our database (< 20 miles)
  const knownSpots = getSpots();
  let closestSpotName = '';
  let minDistance = Infinity;

  for (const spot of knownSpots) {
    const dist = getDistanceMiles(lat, lng, spot.lat, spot.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closestSpotName = spot.name;
    }
  }

  if (minDistance <= 20 && closestSpotName) {
    return closestSpotName;
  }

  // 3. Fallback: Deep Nominatim Reverse Geocoding at Zoom 18
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&namedetails=1`,
      {
        headers: {
          'User-Agent': 'FishMapperApp/1.0',
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};

      // Check namedetails or leisure property (e.g. "Pleasants Landing at Lake Anna")
      const candidateName = data.namedetails?.name || addr.leisure || data.name || '';
      if (candidateName) {
        const parts = candidateName.split(' at ');
        if (parts.length > 1 && ALL_WATER_KEYWORDS.some((kw) => parts[1].toLowerCase().includes(kw))) {
          return parts[1];
        }
        if (MAJOR_WATER_KEYWORDS.some((kw) => candidateName.toLowerCase().includes(kw))) {
          return candidateName;
        }
      }

      // Check address properties
      const waterFeature =
        addr.water ||
        addr.river ||
        addr.lake ||
        addr.reservoir ||
        addr.bay ||
        addr.stream ||
        addr.canal ||
        addr.natural;

      if (waterFeature) {
        return waterFeature;
      }
    }
  } catch (err) {
    console.warn('Nominatim fallback lookup skipped:', err);
  }

  // Fallback to nearest known spot if within 40 miles
  if (minDistance <= 40 && closestSpotName) {
    return closestSpotName;
  }

  return '';
}
