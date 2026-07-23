import React, { useState } from 'react';
import { Layers, MapPin, Droplet, MessageSquareText, RefreshCw, Check } from 'lucide-react';

interface ToolbarProps {
  showMarkers: boolean;
  setShowMarkers: (v: boolean) => void;
  showHeatmap: boolean;
  setShowHeatmap: (v: boolean) => void;
  onPinAtCenter?: () => void;
  onOpenForum?: () => void;
  onSyncSpots?: () => void;
  searchBarNode?: React.ReactNode;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  showMarkers,
  setShowMarkers,
  showHeatmap,
  setShowHeatmap,
  onPinAtCenter,
  onOpenForum,
  onSyncSpots,
  searchBarNode,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const handleSyncClick = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncSuccess(false);

    if (onSyncSpots) {
      await onSyncSpots();
    }

    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 2500);
    }, 600);
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex flex-col items-center gap-2 max-w-[96vw]">
      <div className="bg-card/95 backdrop-blur-md shadow-2xl rounded-full px-4 sm:px-6 py-2 border border-border flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto max-w-full no-scrollbar">
        <div className="flex items-center gap-2 pr-3 sm:pr-4 border-r border-border/50 shrink-0">
          <MapPin className="w-5 h-5 text-primary" />
          <h1 className="font-extrabold text-base sm:text-lg tracking-tight uppercase text-foreground">
            FishMapper
          </h1>
        </div>

        {searchBarNode && (
          <div className="shrink-0 min-w-[200px] sm:min-w-[320px]">
            {searchBarNode}
          </div>
        )}

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowMarkers(!showMarkers)}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              showMarkers
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-transparent text-muted-foreground hover:bg-secondary/50'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Markers</span>
          </button>
          
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              showHeatmap
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-transparent text-muted-foreground hover:bg-secondary/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Heatmap</span>
          </button>

          {onSyncSpots && (
            <button
              onClick={handleSyncClick}
              disabled={isSyncing}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-extrabold shadow-md transition-all duration-200 cursor-pointer active:scale-95 ${
                syncSuccess
                  ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950'
              }`}
              title="Pull and sync latest spots from community cloud"
            >
              {syncSuccess ? (
                <Check className="w-4 h-4 stroke-[3]" />
              ) : (
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              )}
              <span>
                {isSyncing ? 'Syncing...' : syncSuccess ? 'Synced!' : 'Sync Spots'}
              </span>
            </button>
          )}

          {onOpenForum && (
            <button
              onClick={onOpenForum}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md transition-all duration-200 cursor-pointer active:scale-95"
              title="Open Reddit-Style Angler Q&A Forum"
            >
              <MessageSquareText className="w-4 h-4 fill-slate-950" />
              <span>Angler Forum</span>
            </button>
          )}

          {onPinAtCenter && (
            <button
              onClick={onPinAtCenter}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md transition-all duration-200 cursor-pointer active:scale-95"
              title="Place Water Pin at current map center"
            >
              <Droplet className="w-4 h-4 fill-slate-950" />
              <span className="hidden sm:inline">Pin Map Center</span>
              <span className="sm:hidden">Pin Center</span>
            </button>
          )}
        </div>
      </div>

      <div className="bg-slate-950/85 backdrop-blur-md text-cyan-300 px-4 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-xl flex items-center gap-2 border border-cyan-500/30">
        <span>💧 Drag the cyan pin anywhere on the map to log a body of water</span>
      </div>
    </div>
  );
};
