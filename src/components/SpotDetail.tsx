import React, { useState, useEffect } from 'react';
import { FishingSpot } from '@/data/spots';
import { CatchLog } from '@/data/catches';
import { SPECIES_DATA } from '@/data/species';
import { computeSpotPressure } from '@/data/heatmap';
import { fetchWeather, computeBitingScore, getBitingRating, WeatherData } from '@/data/weather';
import {
  MapPin, Calendar, ChevronDown, ChevronUp,
  CheckCircle2, Fish, Footprints, Car, MountainSnow,
  Thermometer, Waves,
} from 'lucide-react';

interface SpotDetailProps {
  spot: FishingSpot;
  catches: CatchLog[];
  onLogCatch: () => void;
}

const ACCESS_LABELS: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  easy: {
    label: 'Easy Access',
    icon: <Car className="w-3.5 h-3.5" />,
    color: 'text-emerald-400',
  },
  moderate: {
    label: 'Moderate',
    icon: <Footprints className="w-3.5 h-3.5" />,
    color: 'text-amber-400',
  },
  hike: {
    label: 'Hike Required',
    icon: <MountainSnow className="w-3.5 h-3.5" />,
    color: 'text-rose-400',
  },
};

function formatHour(h: number): string {
  const hour = Math.floor(h) % 24;
  const ampm = hour < 12 ? 'am' : 'pm';
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}${ampm}`;
}

export const SpotDetail: React.FC<SpotDetailProps> = ({ spot, catches, onLogCatch }) => {
  const [expandedSpecies, setExpandedSpecies] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    setWeather(null);
    setWeatherLoading(true);
    fetchWeather(spot.lat, spot.lng).then((data) => {
      setWeather(data);
      setWeatherLoading(false);
    });
  }, [spot.id]);

  const spotCatches = catches.filter((c) => c.spotId === spot.id);
  const pressure = computeSpotPressure(spot, catches);
  const pressurePercent = Math.round(pressure * 100);

  const pressureColor =
    pressure >= 0.7 ? 'bg-red-500' : pressure >= 0.4 ? 'bg-amber-400' : 'bg-emerald-500';
  const pressureLabel =
    pressure >= 0.7 ? 'High' : pressure >= 0.4 ? 'Moderate' : 'Low';

  const access = ACCESS_LABELS[spot.accessDifficulty] ?? ACCESS_LABELS.easy;

  const spotSpeciesDetails = spot.species
    .map((name) => SPECIES_DATA.find((s) => s.name === name))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  // Biting score
  const bitingScore = weather ? computeBitingScore(weather.tempF, weather.localHour) : null;
  const bitingRating = bitingScore !== null ? getBitingRating(bitingScore) : null;

  return (
    <div className="p-6 pt-14 flex flex-col h-full animate-in fade-in duration-300">
      {/* Name + coordinates */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-foreground leading-tight mb-3">
          {spot.name}
        </h2>

        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 bg-secondary/40 px-2.5 py-1.5 rounded-md font-mono text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {spot.lat.toFixed(4)}, {spot.lng.toFixed(4)}
          </div>
          <div className="flex items-center gap-1.5 bg-secondary/40 px-2.5 py-1.5 rounded-md text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(spot.dateAdded).toLocaleDateString()}
          </div>
          <div className={`flex items-center gap-1.5 bg-secondary/40 px-2.5 py-1.5 rounded-md ${access.color}`}>
            {access.icon}
            {access.label}
          </div>
        </div>
      </div>

      {/* Weather + Biting Score */}
      <div className="mb-5 bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Conditions &amp; Bite
          </span>
          {weatherLoading && (
            <span className="text-xs text-muted-foreground animate-pulse">Fetching…</span>
          )}
        </div>

        {weather && bitingScore !== null && bitingRating ? (
          <div className="space-y-3">
            {/* Temp + Score row */}
            <div className="flex items-center gap-3">
              {/* Temperature */}
              <div className="flex items-center gap-2 bg-secondary/40 rounded-lg px-3 py-2 flex-1">
                <Thermometer className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <div className="text-lg font-bold text-foreground leading-none">
                    {weather.tempF}°F
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {weather.tempC}°C · air temp
                  </div>
                </div>
              </div>

              {/* Biting Score */}
              <div className={`flex items-center gap-2 rounded-lg px-3 py-2 flex-1 ${bitingRating.bgClass}`}>
                <Waves className={`w-4 h-4 shrink-0 ${bitingRating.colorClass}`} />
                <div>
                  <div className={`text-lg font-bold leading-none ${bitingRating.colorClass}`}>
                    {bitingScore}/10
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {bitingRating.label} bite
                  </div>
                </div>
              </div>
            </div>

            {/* Biting score bar */}
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${bitingRating.barColor}`}
                style={{ width: `${bitingScore * 10}%` }}
              />
            </div>

            {/* Local time + best times hint */}
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Local time at spot: <span className="text-foreground font-medium">{formatHour(weather.localHour)}</span>
              {' · '}Best fishing: <span className="text-foreground font-medium">Dawn 5–8am · Dusk 6–9pm</span>
            </p>
          </div>
        ) : !weatherLoading ? (
          <p className="text-xs text-muted-foreground italic">Weather unavailable</p>
        ) : null}
      </div>

      {/* Pressure meter */}
      <div className="mb-5 bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Fishing Pressure
          </span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            pressure >= 0.7
              ? 'bg-red-500/20 text-red-400'
              : pressure >= 0.4
              ? 'bg-amber-400/20 text-amber-400'
              : 'bg-emerald-500/20 text-emerald-400'
          }`}>
            {pressureLabel} — {pressurePercent}%
          </span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${pressureColor}`}
            style={{ width: `${pressurePercent}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          Driven by {spotCatches.length} logged catch{spotCatches.length !== 1 ? 'es' : ''},
          {' '}{spot.accessDifficulty === 'hike' ? 'remote hike-in location' : spot.accessDifficulty === 'moderate' ? 'moderate trail access' : 'easy road access'},
          {' '}and nearby infrastructure.
        </p>
      </div>

      {/* Log a catch CTA */}
      <button
        onClick={onLogCatch}
        className="w-full flex items-center justify-center gap-2 py-3 mb-5 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:brightness-110 active:scale-[0.99] transition-all"
      >
        <Fish className="w-4 h-4" />
        Log a Catch Here
      </button>

      {/* Catch history */}
      {spotCatches.length > 0 && (
        <div className="mb-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Catch History ({spotCatches.length})
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {[...spotCatches].reverse().map((c) => {
              const sp = SPECIES_DATA.find((s) => s.name === c.species);
              return (
                <div
                  key={c.id}
                  className="flex items-start gap-3 bg-secondary/30 border border-border/50 rounded-lg p-3"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: sp?.color ?? '#0f766e' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-semibold text-sm text-foreground truncate">{c.species}</span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {new Date(c.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                      {c.weight && <span>{c.weight} lbs</span>}
                      {c.length && <span>{c.length}"</span>}
                      {c.conditions && (
                        <span className="truncate italic">{c.conditions}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Field notes */}
      {spot.notes && (
        <div className="mb-5 bg-card border border-border p-4 rounded-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Field Notes
          </h3>
          <p className="text-foreground leading-relaxed text-sm">{spot.notes}</p>
        </div>
      )}

      {/* Species + rigs */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Local Species & Tactics
        </h3>

        {spotSpeciesDetails.length === 0 ? (
          <div className="text-sm text-muted-foreground italic bg-secondary/30 p-4 rounded-lg">
            No species logged yet. Add one when logging a catch.
          </div>
        ) : (
          <div className="space-y-3">
            {spotSpeciesDetails.map((species) => {
              const isExpanded = expandedSpecies === species.name;
              return (
                <div
                  key={species.name}
                  className="border border-border rounded-lg overflow-hidden bg-card transition-all"
                >
                  <button
                    onClick={() =>
                      setExpandedSpecies((prev) =>
                        prev === species.name ? null : species.name
                      )
                    }
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3.5 h-3.5 rounded-full shadow-sm"
                        style={{ backgroundColor: species.color }}
                      />
                      <span className="font-bold text-sm text-foreground">{species.name}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-4 pt-0 border-t border-border/50 bg-secondary/10 animate-in slide-in-from-top-2">
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed mt-4">
                        {species.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
                        <div className="bg-card border border-border/50 p-2.5 rounded">
                          <span className="block text-muted-foreground uppercase tracking-wider mb-1 opacity-70 text-[10px]">
                            Season
                          </span>
                          <span className="font-medium text-foreground">{species.season}</span>
                        </div>
                        <div className="bg-card border border-border/50 p-2.5 rounded">
                          <span className="block text-muted-foreground uppercase tracking-wider mb-1 opacity-70 text-[10px]">
                            Habitat
                          </span>
                          <span className="font-medium text-foreground">{species.habitat}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-primary">
                          Recommended Rigs
                        </h4>
                        {species.bestRigs.map((rig, idx) => (
                          <div
                            key={idx}
                            className="bg-card border border-border/50 p-3 rounded shadow-sm"
                          >
                            <div className="font-bold text-sm text-foreground mb-1">
                              {rig.name}
                            </div>
                            <div className="text-xs text-muted-foreground mb-2 font-mono bg-secondary/30 p-1.5 rounded">
                              {rig.setup}
                            </div>
                            <div className="flex items-start gap-2 text-xs text-foreground/90">
                              <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                              <span className="italic">{rig.tip}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
