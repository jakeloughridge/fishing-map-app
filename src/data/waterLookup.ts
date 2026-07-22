import { getSpots } from '@/data/spots';

const WATER_KEYWORDS = [
  'lake', 'river', 'creek', 'bay', 'sound', 'reservoir', 'harbor',
  'pond', 'slough', 'inlet', 'channel', 'swamp', 'ocean', 'gulf',
  'sea', 'fjord', 'marsh', 'cove', 'basin', 'stream', 'fork', 'oxbow'
];

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
 * Automatically detects the name of a body of water based on pinned coordinates
 */
export async function detectWaterBodyName(lat: number, lng: number): Promise<string> {
  // 1. Check proximity to known spots in our database first (< 25 miles)
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

  if (minDistance <= 25 && closestSpotName) {
    return closestSpotName;
  }

  // 2. Query Nominatim Reverse Geocoding API
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'FishMapperApp/1.0',
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};

      // Direct water feature properties
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

      // Check display_name tokens for water keywords
      const displayName = data.display_name || '';
      const parts = displayName.split(',').map((p: string) => p.trim());

      for (const part of parts) {
        const lower = part.toLowerCase();
        if (WATER_KEYWORDS.some((kw) => lower.includes(kw))) {
          return part;
        }
      }

      // Check if place name has a water keyword
      if (data.name) {
        const lowerName = data.name.toLowerCase();
        if (WATER_KEYWORDS.some((kw) => lowerName.includes(kw))) {
          return data.name;
        }
      }

      // If location returns a nearby town/county, suggest a clean water body name
      const locationArea = addr.town || addr.city || addr.county || addr.state;
      if (locationArea) {
        return `${locationArea} Waters`;
      }
    }
  } catch (err) {
    console.warn('Reverse geocode water lookup skipped:', err);
  }

  // Fallback to nearest known spot if distance <= 60 miles
  if (minDistance <= 60 && closestSpotName) {
    return closestSpotName;
  }

  return '';
}
