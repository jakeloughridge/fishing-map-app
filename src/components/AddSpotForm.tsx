import React, { useState } from 'react';
import { SPECIES_DATA } from '@/data/species';
import { FishingSpot, AccessDifficulty } from '@/data/spots';
import { Car, Footprints, MountainSnow } from 'lucide-react';

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
    description: 'Roadside, parking lot, or boat ramp nearby',
    icon: <Car className="w-4 h-4" />,
    color: 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
  },
  {
    value: 'moderate',
    label: 'Moderate',
    description: 'Short trail walk or some terrain involved',
    icon: <Footprints className="w-4 h-4" />,
    color: 'border-amber-400 bg-amber-400/10 text-amber-400',
  },
  {
    value: 'hike',
    label: 'Hike Required',
    description: 'Significant hike or off-trail, no easy road access',
    icon: <MountainSnow className="w-4 h-4" />,
    color: 'border-rose-500 bg-rose-500/10 text-rose-400',
  },
];

export const AddSpotForm: React.FC<AddSpotFormProps> = ({ latLng, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [accessDifficulty, setAccessDifficulty] = useState<AccessDifficulty>('easy');

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
    <div className="p-6 pt-14 flex flex-col h-full animate-in fade-in duration-300">
      <div className="mb-5 border-b border-border/50 pb-4">
        <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          <span className="text-amber-400">📍</span> Log New Spot
        </h2>
        <div className="flex items-center gap-2 text-xs font-mono bg-amber-500/10 border border-amber-500/30 text-amber-400 py-1.5 px-3 rounded-md">
          <span className="font-sans font-bold uppercase tracking-wider text-[10px]">Pinned Coordinates:</span>
          <span>{latLng.lat.toFixed(4)}°, {latLng.lng.toFixed(4)}°</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5 overflow-y-auto pr-1">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Location Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-input/50 border border-border rounded-md px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="e.g. Secret Bass Cove"
            required
            autoFocus
          />
        </div>

        {/* Access Difficulty */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Access Difficulty
            <span className="ml-1.5 text-[10px] normal-case tracking-normal text-muted-foreground/60">
              (affects heatmap pressure)
            </span>
          </label>
          <div className="space-y-2">
            {ACCESS_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
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
                  <div className="font-semibold text-sm leading-tight">{opt.label}</div>
                  <div className="text-xs opacity-70">{opt.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Notes & Conditions
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-24 bg-input/50 border border-border rounded-md px-4 py-3 text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Water clarity, best time of day, bottom structure..."
          />
        </div>

        {/* Species */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Target Species
          </label>
          <div className="space-y-2">
            {SPECIES_DATA.map((species) => (
              <label
                key={species.name}
                className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-all ${
                  selectedSpecies.includes(species.name)
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:bg-secondary/50'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selectedSpecies.includes(species.name)}
                  onChange={() => handleToggleSpecies(species.name)}
                />
                <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: species.color }} />
                <span className="font-medium text-sm text-foreground">{species.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 mt-auto border-t border-border flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-3 rounded-md border border-border text-foreground font-semibold hover:bg-secondary transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!name.trim()}
            className="flex-1 px-4 py-3 rounded-md bg-accent text-accent-foreground font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Save Spot
          </button>
        </div>
      </form>
    </div>
  );
};
