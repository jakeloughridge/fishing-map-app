import React from 'react';
import { Fish, Car, MountainSnow, Building2 } from 'lucide-react';

export const HeatmapLegend: React.FC = () => {
  return (
    <div className="absolute bottom-6 right-6 z-[1000] bg-card/92 backdrop-blur-md shadow-xl border border-border p-4 rounded-lg w-64">
      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center justify-between">
        <span>Fishing Pressure</span>
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      </h4>

      {/* Gradient bar */}
      <div className="w-full h-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-red-500 mb-1.5" />
      <div className="flex justify-between text-xs font-medium text-foreground mb-4">
        <span>Low</span>
        <span>Moderate</span>
        <span>High</span>
      </div>

      {/* Pressure drivers */}
      <div className="border-t border-border/50 pt-3 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
          What drives pressure
        </p>
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Fish className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
          <span>More logged catches <span className="text-red-400">increases</span> pressure</span>
        </div>
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Car className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span>Near major highways or parks <span className="text-red-400">increases</span> pressure</span>
        </div>
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <MountainSnow className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
          <span>Hike-in access <span className="text-emerald-400">lowers</span> pressure significantly</span>
        </div>
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <span>Highway corridor blobs show angler traffic zones</span>
        </div>
      </div>
    </div>
  );
};
