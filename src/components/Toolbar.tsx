import React from 'react';
import { Layers, MapPin, Plus } from 'lucide-react';

interface ToolbarProps {
  showMarkers: boolean;
  setShowMarkers: (v: boolean) => void;
  showHeatmap: boolean;
  setShowHeatmap: (v: boolean) => void;
  addMode: boolean;
  setAddMode: (v: boolean) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  showMarkers,
  setShowMarkers,
  showHeatmap,
  setShowHeatmap,
  addMode,
  setAddMode,
}) => {
  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] flex flex-col items-center gap-2">
      <div className="bg-card/90 backdrop-blur-sm shadow-xl rounded-full px-6 py-2 border border-border flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 pr-6 border-r border-border/50">
          <MapPin className="w-5 h-5 text-primary" />
          <h1 className="font-bold text-lg tracking-tight uppercase text-foreground">
            FishMapper
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMarkers(!showMarkers)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              showMarkers
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-transparent text-muted-foreground hover:bg-secondary/50'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Markers
          </button>
          
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              showHeatmap
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-transparent text-muted-foreground hover:bg-secondary/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            Heatmap
          </button>

          <button
            onClick={() => setAddMode(!addMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              addMode
                ? 'bg-accent text-accent-foreground shadow-md ring-2 ring-accent ring-offset-2 ring-offset-card'
                : 'bg-transparent text-muted-foreground hover:bg-secondary/50'
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Spot
          </button>
        </div>
      </div>
      
      {addMode && (
        <div className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-2 shadow-lg">
          Click anywhere on the map to add a location
        </div>
      )}
    </div>
  );
};
