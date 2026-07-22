import React from 'react';
import { Layers, MapPin, Droplet } from 'lucide-react';

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
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
              addMode
                ? 'bg-cyan-500 text-slate-950 shadow-md ring-2 ring-cyan-400 ring-offset-2 ring-offset-card'
                : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950'
            }`}
          >
            <Droplet className="w-4 h-4 fill-current" />
            {addMode ? 'Cancel Pin' : 'Pin Water Body'}
          </button>
        </div>
      </div>

      <div className="bg-slate-950/80 backdrop-blur-md text-cyan-300 px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-xl flex items-center gap-2 border border-cyan-500/30">
        <span>💧 Drag the cyan pin on the map onto any water body</span>
      </div>
    </div>
  );
};
