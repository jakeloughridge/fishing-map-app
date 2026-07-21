import React, { useState } from 'react';
import { FishingSpot } from '@/data/spots';
import { CatchLog } from '@/data/catches';
import { SPECIES_DATA } from '@/data/species';
import { Fish, Scale, Ruler, Wind, ChevronLeft } from 'lucide-react';

interface LogCatchFormProps {
  spot: FishingSpot;
  onSave: (entry: CatchLog) => void;
  onBack: () => void;
}

export const LogCatchForm: React.FC<LogCatchFormProps> = ({ spot, onSave, onBack }) => {
  // Default to the first species at this spot, fall back to first overall
  const defaultSpecies = spot.species[0] ?? SPECIES_DATA[0].name;

  const [species, setSpecies] = useState(defaultSpecies);
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [conditions, setConditions] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const entry: CatchLog = {
      id: `catch-${Date.now()}`,
      spotId: spot.id,
      species,
      weight: weight ? parseFloat(weight) : null,
      length: length ? parseFloat(length) : null,
      conditions: conditions.trim(),
      date: new Date(date).toISOString(),
    };

    onSave(entry);
  };

  return (
    <div className="p-6 pt-16 flex flex-col h-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to {spot.name}
        </button>

        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-lg bg-primary/20">
            <Fish className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Log a Catch</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Each catch you record increases this spot's pressure on the heatmap.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5 overflow-y-auto pr-1">
        {/* Species */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Species Caught
          </label>
          <div className="grid grid-cols-1 gap-2">
            {SPECIES_DATA.map((s) => (
              <label
                key={s.name}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  species === s.name
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:bg-secondary/40'
                }`}
              >
                <input
                  type="radio"
                  name="species"
                  className="sr-only"
                  value={s.name}
                  checked={species === s.name}
                  onChange={() => setSpecies(s.name)}
                />
                <div
                  className="w-3.5 h-3.5 rounded-full shrink-0"
                  style={{ backgroundColor: s.color }}
                />
                <span className="font-medium text-sm text-foreground">{s.name}</span>
                {!spot.species.includes(s.name) && (
                  <span className="ml-auto text-xs text-muted-foreground italic">new to spot</span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Weight + Length */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5" />
              Weight (lbs)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 3.5"
              className="w-full bg-input/50 border border-border rounded-md px-3 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5" />
              Length (in)
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="e.g. 14"
              className="w-full bg-input/50 border border-border rounded-md px-3 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-input/50 border border-border rounded-md px-3 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Conditions */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5" />
            Conditions
          </label>
          <input
            type="text"
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            placeholder="e.g. Overcast, light wind, water 68°F"
            className="w-full bg-input/50 border border-border rounded-md px-3 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Submit */}
        <div className="mt-auto pt-5 border-t border-border flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-4 py-3 rounded-md border border-border text-foreground font-semibold hover:bg-secondary transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-3 rounded-md bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all text-sm"
          >
            Record Catch
          </button>
        </div>
      </form>
    </div>
  );
};
