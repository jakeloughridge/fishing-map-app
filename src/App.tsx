import React, { useState, useEffect, useMemo } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MapView } from '@/components/MapView';
import { Toolbar } from '@/components/Toolbar';
import { Sidebar } from '@/components/Sidebar';
import { SpotDetail } from '@/components/SpotDetail';
import { AddSpotForm } from '@/components/AddSpotForm';
import { LogCatchForm } from '@/components/LogCatchForm';
import { HeatmapLegend } from '@/components/HeatmapLegend';

import { getSpots, saveSpot, FishingSpot } from '@/data/spots';
import { getCatches, logCatch, CatchLog } from '@/data/catches';
import { computePressurePoints } from '@/data/heatmap';

const queryClient = new QueryClient();

type SidebarMode = 'spot' | 'addForm' | 'logCatch' | null;

function FishingMapApp() {
  const [spots, setSpots] = useState<FishingSpot[]>([]);
  const [catches, setCatches] = useState<CatchLog[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<FishingSpot | null>(null);
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>(null);

  const [showMarkers, setShowMarkers] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const [addMode, setAddMode] = useState(false);
  const [pendingLatLng, setPendingLatLng] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    setSpots(getSpots());
    setCatches(getCatches());
  }, []);

  // Recompute heatmap pressure whenever spots or catches change
  const heatmapData = useMemo(
    () => computePressurePoints(spots, catches),
    [spots, catches]
  );

  const handleMapClick = (lat: number, lng: number) => {
    if (addMode) {
      setPendingLatLng({ lat, lng });
      setSidebarMode('addForm');
      setAddMode(false);
    }
  };

  const handleMarkerClick = (spot: FishingSpot) => {
    setSelectedSpot(spot);
    setSidebarMode('spot');
  };

  const handleSaveSpot = (newSpot: FishingSpot) => {
    saveSpot(newSpot);
    const updated = getSpots();
    setSpots(updated);
    setSidebarMode(null);
    setPendingLatLng(null);
  };

  const handleLogCatch = (entry: CatchLog) => {
    logCatch(entry);
    const updatedCatches = getCatches();
    setCatches(updatedCatches);

    // If the catch introduces a new species to the spot, update the spot's species list
    if (selectedSpot && !selectedSpot.species.includes(entry.species)) {
      const updatedSpots = spots.map((s) =>
        s.id === selectedSpot.id
          ? { ...s, species: [...s.species, entry.species] }
          : s
      );
      import('@/data/spots').then(({ saveAllSpots }) => {
        saveAllSpots(updatedSpots);
      });
      setSpots(updatedSpots);
      setSelectedSpot((prev) =>
        prev ? { ...prev, species: [...prev.species, entry.species] } : prev
      );
    }

    // Go back to spot detail after logging
    setSidebarMode('spot');
  };

  const closeSidebar = () => {
    setSidebarMode(null);
    setSelectedSpot(null);
    setPendingLatLng(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background text-foreground font-sans">
      <style>{`
        .map-tiles {
          filter: brightness(0.6) contrast(1.2) sepia(0.2) hue-rotate(180deg) saturate(0.8) invert(1);
        }
      `}</style>

      <Toolbar
        showMarkers={showMarkers}
        setShowMarkers={setShowMarkers}
        showHeatmap={showHeatmap}
        setShowHeatmap={setShowHeatmap}
        addMode={addMode}
        setAddMode={(val) => {
          setAddMode(val);
          if (val) closeSidebar();
        }}
      />

      <MapView
        spots={spots}
        heatmapData={heatmapData}
        showMarkers={showMarkers}
        showHeatmap={showHeatmap}
        addMode={addMode}
        onMapClick={handleMapClick}
        onMarkerClick={handleMarkerClick}
      />

      {showHeatmap && <HeatmapLegend />}

      <Sidebar isOpen={sidebarMode !== null} onClose={closeSidebar}>
        {sidebarMode === 'spot' && selectedSpot && (
          <SpotDetail
            spot={selectedSpot}
            catches={catches}
            onLogCatch={() => setSidebarMode('logCatch')}
          />
        )}
        {sidebarMode === 'logCatch' && selectedSpot && (
          <LogCatchForm
            spot={selectedSpot}
            onSave={handleLogCatch}
            onBack={() => setSidebarMode('spot')}
          />
        )}
        {sidebarMode === 'addForm' && pendingLatLng && (
          <AddSpotForm
            latLng={pendingLatLng}
            onSave={handleSaveSpot}
            onCancel={closeSidebar}
          />
        )}
      </Sidebar>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Switch>
          <Route path="/" component={FishingMapApp} />
          <Route>
            <div className="flex h-screen items-center justify-center text-foreground">
              404 - Not Found
            </div>
          </Route>
        </Switch>
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
