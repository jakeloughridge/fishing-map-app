import React, { useState } from 'react';
import { FishingSpot } from '@/data/spots';
import { CatchLog } from '@/data/catches';
import { SPECIES_DATA } from '@/data/species';
import { Fish, Scale, Ruler, Wind, ChevronLeft, Anchor, Image as ImageIcon, Upload, X } from 'lucide-react';

interface LogCatchFormProps {
  spot: FishingSpot;
  onSave: (entry: CatchLog) => void;
  onBack: () => void;
}

const CATCH_PHOTO_PRESETS = [
  { name: 'Trophy Catch', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Water Release', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Lure in Mouth', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },
];

export const LogCatchForm: React.FC<LogCatchFormProps> = ({ spot, onSave, onBack }) => {
  // Default to the first species at this spot, fall back to first overall
  const defaultSpecies = spot.species[0] ?? SPECIES_DATA[0].name;

  const [species, setSpecies] = useState(defaultSpecies);
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [conditions, setConditions] = useState('');
  const [rigBaitUsed, setRigBaitUsed] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  // Find species data object for rig suggestions
  const selectedSpeciesObj = SPECIES_DATA.find((s) => s.name === species || (s.subTypes && s.subTypes.includes(species)));

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageUrl(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const entry: CatchLog = {
      id: `catch-${Date.now()}`,
      spotId: spot.id,
      species,
      weight: weight ? parseFloat(weight) : null,
      length: length ? parseFloat(length) : null,
      conditions: conditions.trim(),
      // @ts-ignore - Adding custom fields
      rigBaitUsed: rigBaitUsed.trim() || undefined,
      imageUrl: imageUrl || undefined,
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
            {SPECIES_DATA.map((s) => {
              const isSelected = species === s.name || (s.subTypes && s.subTypes.includes(species));
              const hasSubTypes = Array.isArray(s.subTypes) && s.subTypes.length > 0;

              return (
                <div
                  key={s.name}
                  className={`rounded-lg border transition-all overflow-hidden ${
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card hover:bg-secondary/40'
                  }`}
                >
                  <label className="flex items-center gap-3 p-3 cursor-pointer">
                    <input
                      type="radio"
                      name="species"
                      className="sr-only"
                      value={s.name}
                      checked={isSelected}
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

                  {/* Sub-type choices if selected */}
                  {isSelected && hasSubTypes && (
                    <div className="px-3 pb-3 pt-1 border-t border-primary/20 bg-primary/5 animate-in fade-in duration-200">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2">
                        Select Specific Type of {s.name}:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {s.subTypes?.map((sub) => {
                          const isSubSelected = species === sub;
                          return (
                            <button
                              type="button"
                              key={sub}
                              onClick={() => setSpecies(sub)}
                              className={`text-[11px] px-2.5 py-1 rounded-full border transition-all font-medium ${
                                isSubSelected
                                  ? 'bg-primary text-primary-foreground border-primary font-bold shadow-xs'
                                  : 'bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground'
                              }`}
                            >
                              {sub}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Rig / Lure / Bait Used */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Anchor className="w-3.5 h-3.5 text-cyan-400" />
            Rig / Lure / Bait Used
          </label>
          <input
            type="text"
            value={rigBaitUsed}
            onChange={(e) => setRigBaitUsed(e.target.value)}
            placeholder="e.g. Texas-rigged 7&quot; Senko worm"
            className="w-full bg-input/50 border border-border rounded-lg px-3 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all font-medium"
          />

          {/* Quick Rig Suggestions */}
          {selectedSpeciesObj && (selectedSpeciesObj as any).bestRigs && (selectedSpeciesObj as any).bestRigs.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground font-semibold">Recommended Rigs for {species}:</span>
              <div className="flex flex-wrap gap-1.5">
                {(selectedSpeciesObj as any).bestRigs.map((rig: any) => (
                  <button
                    type="button"
                    key={rig.name}
                    onClick={() => setRigBaitUsed(`${rig.name} (${rig.setup})`)}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-secondary/60 hover:bg-primary/20 text-muted-foreground hover:text-primary border border-border/50 transition-all font-mono"
                  >
                    + {rig.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Catch Photo Attachment */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            Catch Photo (Upload Image)
          </label>

          <div className="flex items-center gap-2">
            <label className="flex-1 border-2 border-dashed border-border/80 hover:border-cyan-500/60 bg-input/20 rounded-xl p-3 text-center cursor-pointer transition-colors">
              <Upload className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <span className="text-xs font-bold text-foreground block">Upload Photo</span>
              <span className="text-[10px] text-muted-foreground">Select image from your device</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Sample Photo Presets */}
          <div className="flex items-center gap-2">
            {CATCH_PHOTO_PRESETS.map((p) => {
              const isSelected = imageUrl === p.url;
              return (
                <button
                  type="button"
                  key={p.name}
                  onClick={() => {
                    setImageUrl(p.url);
                    setImagePreview(p.url);
                  }}
                  className={`flex-1 h-12 rounded-lg overflow-hidden border relative transition-all ${
                    isSelected ? 'border-cyan-500 ring-2 ring-cyan-500/50' : 'border-border/60 hover:border-cyan-500/40'
                  }`}
                >
                  <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center p-1">
                    <span className="text-[9px] font-bold text-white leading-none">{p.name}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Image Preview */}
          {imagePreview && (
            <div className="relative rounded-xl overflow-hidden border border-cyan-500/50 max-h-36">
              <img src={imagePreview} alt="Catch Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => {
                  setImageUrl('');
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-slate-950/80 text-white p-1 rounded-full hover:bg-rose-500 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
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
