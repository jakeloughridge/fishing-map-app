import React, { useState, useEffect } from 'react';
import { FishingSpot, AccessDifficulty } from '@/data/spots';
import { CatchLog } from '@/data/catches';
import { SPECIES_DATA } from '@/data/species';
import { computeSpotPressure } from '@/data/heatmap';
import { fetchWeather, computeBitingScore, getBitingRating, WeatherData } from '@/data/weather';
import {
  MapPin, Calendar, ChevronDown, ChevronUp,
  CheckCircle2, Fish, Footprints, Car, MountainSnow,
  Thermometer, Waves, Anchor, Edit3, Save, Plus, X, ShieldAlert,
  Trash2, AlertTriangle, Check
} from 'lucide-react';

interface SpotDetailProps {
  spot: FishingSpot;
  catches: CatchLog[];
  onLogCatch: () => void;
  onUpdateSpecies?: (spotId: string, updatedSpecies: string[]) => void;
  onUpdateSpotDetails?: (spotId: string, updates: Partial<FishingSpot>) => void;
  onDeleteSpot?: (spotId: string) => void;
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

const isLocalhost = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname === '[::1]'
);

function formatHour(h: number): string {
  const hour = Math.floor(h) % 24;
  const ampm = hour < 12 ? 'am' : 'pm';
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}${ampm}`;
}

export const SpotDetail: React.FC<SpotDetailProps> = ({
  spot,
  catches,
  onLogCatch,
  onUpdateSpecies,
  onUpdateSpotDetails,
  onDeleteSpot,
}) => {
  const [expandedSpecies, setExpandedSpecies] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(true);

  // Edit Spot Details state
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [editName, setEditName] = useState(spot.name);
  const [editNotes, setEditNotes] = useState(spot.notes || '');
  const [editAccess, setEditAccess] = useState<AccessDifficulty>(spot.accessDifficulty || 'easy');
  const [editSpeciesList, setEditSpeciesList] = useState<string[]>(spot.species);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Localhost Admin Species Editing state
  const [isEditingSpecies, setIsEditingSpecies] = useState(false);
  const [editedSpeciesList, setEditedSpeciesList] = useState<string[]>(spot.species);
  const [customSpeciesInput, setCustomSpeciesInput] = useState('');

  // Keep edited state updated if spot changes
  useEffect(() => {
    setEditName(spot.name);
    setEditNotes(spot.notes || '');
    setEditAccess(spot.accessDifficulty || 'easy');
    setEditSpeciesList(spot.species);
    setEditedSpeciesList(spot.species);
    setIsEditingDetails(false);
    setShowDeleteModal(false);
  }, [spot]);

  const handleToggleEditSpecies = (speciesName: string) => {
    setEditSpeciesList((prev) =>
      prev.includes(speciesName) ? prev.filter((s) => s !== speciesName) : [...prev, speciesName]
    );
  };

  const handleSaveSpotDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;

    if (onUpdateSpotDetails) {
      onUpdateSpotDetails(spot.id, {
        name: editName.trim(),
        notes: editNotes.trim(),
        accessDifficulty: editAccess,
        species: editSpeciesList,
      });
    }
    setIsEditingDetails(false);
  };

  const handleToggleSpeciesItem = (name: string) => {
    setEditedSpeciesList((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const handleAddCustomSpecies = (e: React.FormEvent) => {
    e.preventDefault();
    const name = customSpeciesInput.trim();
    if (name && !editedSpeciesList.includes(name)) {
      setEditedSpeciesList((prev) => [...prev, name]);
      setCustomSpeciesInput('');
    }
  };

  const handleSaveSpeciesEdit = () => {
    if (onUpdateSpecies) {
      onUpdateSpecies(spot.id, editedSpeciesList);
    }
    setIsEditingSpecies(false);
  };

  useEffect(() => {
    setWeather(null);
    setWeatherLoading(true);
    fetchWeather(spot.lat, spot.lng).then((data) => {
      setWeather(data);
      setWeatherLoading(false);
    });
  }, [spot.id]);

  const spotCatches = catches.filter((c) => c.spotId === spot.id);
  const pressure = computeSpotPressure(spot);
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
      {/* Header action bar */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditingDetails(!isEditingDetails)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all cursor-pointer shadow-sm active:scale-95"
            title="Edit spot name, notes, access, or species"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditingDetails ? 'Cancel Edit' : 'Edit Spot'}</span>
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-all cursor-pointer shadow-sm active:scale-95"
            title="Delete this fishing spot"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Spot</span>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Card */}
      {showDeleteModal && (
        <div className="mb-5 bg-rose-950/60 border border-rose-500/60 rounded-xl p-4 animate-in fade-in duration-200 shadow-xl">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            Delete Fishing Spot?
          </div>
          <p className="text-xs text-rose-200/90 mb-4 leading-relaxed">
            Are you sure you want to delete <strong className="text-white">{spot.name}</strong>? This will permanently remove it from the map and cloud database.
          </p>
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-secondary hover:bg-secondary/80 text-foreground transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (onDeleteSpot) onDeleteSpot(spot.id);
                setShowDeleteModal(false);
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-extrabold bg-rose-600 hover:bg-rose-500 text-white shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Confirm Delete
            </button>
          </div>
        </div>
      )}

      {/* Inline Edit Spot Details Form */}
      {isEditingDetails ? (
        <form onSubmit={handleSaveSpotDetails} className="mb-6 bg-card border border-cyan-500/40 rounded-xl p-4 shadow-xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Edit3 className="w-4 h-4" />
              Edit Spot Details
            </h3>
            <button
              type="button"
              onClick={() => setIsEditingDetails(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Spot / Water Body Name
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-400 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Access Difficulty
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['easy', 'moderate', 'hike'] as AccessDifficulty[]).map((accKey) => (
                <button
                  key={accKey}
                  type="button"
                  onClick={() => setEditAccess(accKey)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold border transition-all ${
                    editAccess === accKey
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-md'
                      : 'border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60'
                  }`}
                >
                  {ACCESS_LABELS[accKey]?.icon}
                  <span className="capitalize">{accKey}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Field Notes / Access Tips
            </label>
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              rows={3}
              placeholder="Add notes about structure, boat ramps, parking, baits..."
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Fish Species Present ({editSpeciesList.length})
            </label>
            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 border border-border rounded-lg p-2 bg-background/50">
              {SPECIES_DATA.map((sp) => {
                const isSelected = editSpeciesList.includes(sp.name);
                return (
                  <button
                    key={sp.name}
                    type="button"
                    onClick={() => handleToggleEditSpecies(sp.name)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                        : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/40'
                    }`}
                  >
                    <span>{sp.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
            <button
              type="button"
              onClick={() => setIsEditingDetails(false)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-secondary hover:bg-secondary/80 text-foreground transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-xs font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Save className="w-3.5 h-3.5 fill-slate-950" />
              Save Spot Changes
            </button>
          </div>
        </form>
      ) : null}

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
          Driven by regional location, {spot.accessDifficulty === 'hike' ? 'remote hike-in terrain' : spot.accessDifficulty === 'moderate' ? 'moderate trail access' : 'easy road access'},
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
          <div className="space-y-2">
            {[...spotCatches].reverse().map((c) => {
              const sp = SPECIES_DATA.find((s) => s.name === c.species);
              return (
                <div
                  key={c.id}
                  className="flex flex-col gap-2 bg-secondary/30 border border-border/50 rounded-xl p-3"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                      style={{ backgroundColor: sp?.color ?? '#0f766e' }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-bold text-sm text-foreground truncate">{c.species}</span>
                        <span className="text-[11px] text-muted-foreground shrink-0 font-mono">
                          {new Date(c.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground mt-0.5">
                        {c.weight && <span className="font-semibold text-foreground">{c.weight} lbs</span>}
                        {c.length && <span className="font-semibold text-foreground">{c.length}"</span>}
                        {c.conditions && (
                          <span className="truncate italic">{c.conditions}</span>
                        )}
                      </div>
                      {c.rigBaitUsed && (
                        <div className="mt-1.5 text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-1 rounded-md flex items-center gap-1.5">
                          <Anchor className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="truncate">Lure/Bait: {c.rigBaitUsed}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {c.imageUrl && (
                    <div className="rounded-lg overflow-hidden border border-border/60 max-h-40 bg-black/40">
                      <img src={c.imageUrl} alt={c.species} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Field notes */}
      {spot.notes && (
        <div className="mb-5 bg-card border border-border p-4 rounded-lg relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-accent rounded-l-lg" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Field Notes
          </h3>
          <div className="min-h-[140px] max-h-56 overflow-y-auto pr-2">
            <p className="text-foreground leading-relaxed text-sm whitespace-pre-wrap">{spot.notes}</p>
          </div>
        </div>
      )}

      {/* Species + rigs */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Local Species & Tactics
          </h3>

          {/* Localhost ONLY Admin Edit Button */}
          {isLocalhost && (
            <button
              onClick={() => setIsEditingSpecies(!isEditingSpecies)}
              className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all flex items-center gap-1.5 shadow-xs"
              title="Admin Localhost Only: Edit species found at this spot"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Species (Admin)</span>
            </button>
          )}
        </div>

        {/* Localhost Species Editing Drawer */}
        {isLocalhost && isEditingSpecies && (
          <div className="mb-4 bg-slate-900/90 border-2 border-amber-500/50 rounded-xl p-3.5 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
              <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Admin Spot Species Manager (Localhost Only)
              </span>
              <button
                onClick={() => setIsEditingSpecies(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-muted-foreground">
              Select or deselect species inhabiting <strong className="text-foreground">{spot.name}</strong>. Add custom species as needed.
            </p>

            {/* Checklist of all species */}
            <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5 border border-border/50 rounded-lg p-2 bg-slate-950/60">
              {SPECIES_DATA.map((s) => {
                const isSelected = editedSpeciesList.includes(s.name);
                return (
                  <label
                    key={s.name}
                    className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-foreground font-bold'
                        : 'bg-secondary/20 border-border/40 text-muted-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: s.color }}
                      />
                      <span>{s.name}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleSpeciesItem(s.name)}
                      className="rounded border-border text-cyan-500 focus:ring-cyan-500"
                    />
                  </label>
                );
              })}
            </div>

            {/* Add Custom Species */}
            <form onSubmit={handleAddCustomSpecies} className="flex gap-2">
              <input
                type="text"
                value={customSpeciesInput}
                onChange={(e) => setCustomSpeciesInput(e.target.value)}
                placeholder="Custom species name..."
                className="flex-1 bg-input/60 border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs rounded-lg border border-border flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Add
              </button>
            </form>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-500/30">
              <button
                onClick={() => setIsEditingSpecies(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSpeciesEdit}
                className="px-4 py-1.5 rounded-lg text-xs font-black bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Save Species Changes</span>
              </button>
            </div>
          </div>
        )}

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
