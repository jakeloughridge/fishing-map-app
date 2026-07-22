import React, { useState, useEffect } from 'react';
import { SPECIES_DATA } from '@/data/species';
import { FishingSpot, AccessDifficulty } from '@/data/spots';
import { detectWaterBodyName } from '@/data/waterLookup';
import { Car, Footprints, MountainSnow, Droplet, Fish, Check, Sparkles, Loader2 } from 'lucide-react';

interface AddSpotFormProps {
  latLng: { lat: number; lng: number };
  onSave: (spot: FishingSpot) => void;
  onCancel: () => void;
}

const ACCESS_OPTIONS: {
  value: AccessDifficulty;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    value: 'easy',
    label: 'Easy Access',
    description: 'Public boat ramp, pier, or roadside shore access',
    icon: <Car className="w-4 h-4" />,
    color: 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
  },
  {
    value: 'moderate',
    label: 'Moderate Access',
    description: 'Short trail walk or rocky shoreline access',
    icon: <Footprints className="w-4 h-4" />,
    color: 'border-amber-400 bg-amber-400/10 text-amber-400',
  },
  {
    value: 'hike',
    label: 'Hike / Remote',
    description: 'Requires kayak, boat, or trail hike to reach',
    icon: <MountainSnow className="w-4 h-4" />,
    color: 'border-rose-500 bg-rose-500/10 text-rose-400',
  },
];

export const AddSpotForm: React.FC<AddSpotFormProps> = ({ latLng, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [isDetecting, setIsDetecting] = useState(true);
  const [autoDetected, setAutoDetected] = useState(false);
  const [notes, setNotes] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [accessDifficulty, setAccessDifficulty] = useState<AccessDifficulty>('easy');

  // Auto-detect water body name whenever pinned coordinates change
  useEffect(() => {
    let active = true;
    setIsDetecting(true);
    setAutoDetected(false);

    detectWaterBodyName(latLng.lat, latLng.lng).then((detectedName) => {
      if (active) {
        setIsDetecting(false);
        if (detectedName) {
          setName(detectedName);
          setAutoDetected(true);
        }
      }
    });

    return () => {
      active = false;
    };
  }, [latLng]);

  const handleToggleSpecies = (speciesName: string) => {
    setSelectedSpecies((prev) =>
      prev.includes(speciesName) ? prev.filter((s) => s !== speciesName) : [...prev, speciesName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newSpot: FishingSpot = {
      id: `spot-${Date.now()}`,
      name: name.trim(),
      lat: latLng.lat,
      lng: latLng.lng,
      species: selectedSpecies,
      notes: notes.trim(),
      dateAdded: new Date().toISOString(),
      isUserAdded: true,
      accessDifficulty,
    };

    onSave(newSpot);
  };

  return (
    <div className="p-6 pt-12 flex flex-col h-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="mb-5 border-b border-border/60 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Droplet className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
          <h2 className="text-2xl font-bold text-foreground">Pin Body of Water</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Identify this body of water and log the fish species that inhabit it.
        </p>
        <div className="flex items-center gap-2 text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 py-1.5 px-3 rounded-md">
          <span className="font-sans font-bold uppercase tracking-wider text-[10px]">Water Pin Coordinates:</span>
          <span>{latLng.lat.toFixed(4)}°, {latLng.lng.toFixed(4)}°</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6 overflow-y-auto pr-1">
        {/* 1. Name of Body of Water */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>1. Name of Body of Water</span>
              {isDetecting && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono normal-case text-cyan-400 animate-pulse">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  detecting...
                </span>
              )}
              {autoDetected && !isDetecting && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono normal-case text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                  Auto-detected from map
                </span>
              )}
            </span>
            <span className="text-cyan-400 text-[11px] font-normal normal-case">*Required</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setAutoDetected(false);
            }}
            className="w-full bg-input/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder:font-normal"
            placeholder={isDetecting ? "Detecting water body name..." : "e.g. Lake Erie, Kenai River, Chesapeake Bay..."}
            required
            autoFocus
          />
        </div>

        {/* 2. Fish Species Present */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Fish className="w-3.5 h-3.5 text-primary" />
              <span>2. Fish Species Present</span>
            </label>
            <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
              {selectedSpecies.length} Selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1 p-1 bg-secondary/20 rounded-lg border border-border/50">
            {SPECIES_DATA.map((species) => {
              const isSelected = selectedSpecies.includes(species.name);
              return (
                <label
                  key={species.name}
                  className={`flex items-center justify-between p-2.5 rounded-md border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-cyan-500/60 bg-cyan-500/15 text-foreground font-semibold shadow-xs'
                      : 'border-border/60 bg-card/60 hover:bg-secondary/60 text-muted-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: species.color }}
                    />
                    <span className="text-xs truncate">{species.name}</span>
                  </div>

                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isSelected}
                    onChange={() => handleToggleSpecies(species.name)}
                  />

                  {isSelected ? (
                    <div className="w-4 h-4 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-border shrink-0" />
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* 3. Access & Notes */}
        <div className="space-y-4 pt-2 border-t border-border/40">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Access & Launch Conditions
            </label>
            <div className="grid grid-cols-1 gap-2">
              {ACCESS_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                    accessDifficulty === opt.value
                      ? opt.color
                      : 'border-border bg-card hover:bg-secondary/40 text-muted-foreground'
                  }`}
                >
                  <input
                    type="radio"
                    name="access"
                    className="sr-only"
                    value={opt.value}
                    checked={accessDifficulty === opt.value}
                    onChange={() => setAccessDifficulty(opt.value)}
                  />
                  <span className="shrink-0">{opt.icon}</span>
                  <div>
                    <div className="font-semibold text-xs leading-tight">{opt.label}</div>
                    <div className="text-[11px] opacity-70">{opt.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Water Notes & Fishing Advice
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-20 bg-input/50 border border-border rounded-lg px-3.5 py-2.5 text-foreground text-xs resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="Water clarity, seasonal hotspots, bait preferences..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 mt-auto border-t border-border flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-colors text-xs uppercase tracking-wider"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!name.trim()}
            className="flex-1 px-4 py-3 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
          >
            <Droplet className="w-4 h-4 fill-slate-950" />
            Save Water Pin
          </button>
        </div>
      </form>
    </div>
  );
};
