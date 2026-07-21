export type WeatherData = {
  tempF: number;
  tempC: number;
  localHour: number; // fractional hour (0–24) at the spot's timezone
};

export async function fetchWeather(lat: number, lng: number): Promise<WeatherData | null> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
      `&current=temperature_2m&temperature_unit=fahrenheit&timezone=auto`
    );
    if (!res.ok) return null;
    const data = await res.json();

    const tempF: number = data.current.temperature_2m;
    const tempC = Math.round(((tempF - 32) * 5) / 9 * 10) / 10;

    // Derive local hour at the spot from the UTC offset Open-Meteo returns
    const utcOffsetSec: number = data.utc_offset_seconds ?? 0;
    const localMs = Date.now() + utcOffsetSec * 1000;
    const d = new Date(localMs);
    const localHour = d.getUTCHours() + d.getUTCMinutes() / 60;

    return { tempF: Math.round(tempF * 10) / 10, tempC, localHour };
  } catch {
    return null;
  }
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

/** Gaussian peak centred at `peak`, std-dev `spread` hours. */
function gaussPeak(hour: number, peak: number, spread = 2.0): number {
  return Math.exp(-Math.pow(hour - peak, 2) / (2 * spread * spread));
}

/** Time-of-day factor (0–1). Dawn ~6:30am and dusk ~7:30pm are peaks. */
function timeScore(localHour: number): number {
  return Math.max(gaussPeak(localHour, 6.5), gaussPeak(localHour, 19.5));
}

/** Water/air temperature factor (0–1). Optimal 62–75 °F for most species. */
function tempScore(tempF: number): number {
  if (tempF <= 32) return 0.05;
  if (tempF <= 45) return 0.15 + ((tempF - 32) / 13) * 0.20;
  if (tempF <= 55) return 0.35 + ((tempF - 45) / 10) * 0.30;
  if (tempF <= 62) return 0.65 + ((tempF - 55) / 7)  * 0.35;
  if (tempF <= 75) return 1.00;
  if (tempF <= 85) return 1.00 - ((tempF - 75) / 10) * 0.55;
  return 0.20;
}

/** Combined biting score 1–10. Time weighted 60%, temperature 40%. */
export function computeBitingScore(tempF: number, localHour: number): number {
  const raw = timeScore(localHour) * 0.6 + tempScore(tempF) * 0.4;
  return Math.max(1, Math.min(10, Math.round(raw * 10)));
}

export type BitingRating = {
  label: string;
  colorClass: string;
  barColor: string;
  bgClass: string;
};

export function getBitingRating(score: number): BitingRating {
  if (score >= 9) return { label: 'Excellent', colorClass: 'text-emerald-400', barColor: 'bg-emerald-500', bgClass: 'bg-emerald-500/20' };
  if (score >= 7) return { label: 'Good',      colorClass: 'text-lime-400',    barColor: 'bg-lime-500',    bgClass: 'bg-lime-500/20' };
  if (score >= 5) return { label: 'Fair',      colorClass: 'text-yellow-400',  barColor: 'bg-yellow-500',  bgClass: 'bg-yellow-500/20' };
  if (score >= 3) return { label: 'Slow',      colorClass: 'text-orange-400',  barColor: 'bg-orange-500',  bgClass: 'bg-orange-500/20' };
  return           { label: 'Poor',      colorClass: 'text-red-400',     barColor: 'bg-red-500',     bgClass: 'bg-red-500/20' };
}
