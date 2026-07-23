import React, { useState, useEffect, useMemo } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MapView } from '@/components/MapView';
import { Toolbar } from '@/components/Toolbar';
import { Sidebar } from '@/components/Sidebar';
import { SpotDetail } from '@/components/SpotDetail';
import { AddSpotForm } from '@/components/AddSpotForm';
import { LogCatchForm } from '@/components/LogCatchForm';
import { CommunityForum } from '@/components/CommunityForum';
import { HeatmapLegend } from '@/components/HeatmapLegend';

import { getSpots, saveSpot, updateSpotSpecies, updateSpotDetails, deleteSpot, fetchCommunitySpots, FishingSpot } from '@/data/spots';
import { getCatches, logCatch, CatchLog } from '@/data/catches';
import { computePressurePoints } from '@/data/heatmap';

const queryClient = new QueryClient();

type SidebarMode = 'spot' | 'addForm' | 'logCatch' | 'forum' | null;

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

    // Sync community spots from global cloud store
    fetchCommunitySpots().then((synced) => {
      setSpots(synced);
    });

    // Poll for new community spots every 10 seconds
    const syncInterval = setInterval(() => {
      fetchCommunitySpots().then((synced) => {
        setSpots(synced);
      });
    }, 10000);

    return () => clearInterval(syncInterval);
  }, []);

  // Recompute heatmap pressure whenever spots change
  const heatmapData = useMemo(
    () => computePressurePoints(spots),
    [spots]
  );

  const handlePinDrop = (lat: number, lng: number) => {
    setPendingLatLng({ lat, lng });
    setSelectedSpot(null);
    setSidebarMode('addForm');
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (addMode) {
      handlePinDrop(lat, lng);
      setAddMode(false);
    }
  };

  const handleMarkerClick = (spot: FishingSpot) => {
    setSelectedSpot(spot);
    setSidebarMode('spot');
  };

  const handleSaveSpot = async (newSpot: FishingSpot) => {
    await saveSpot(newSpot);
    const synced = await fetchCommunitySpots();
    setSpots(synced);
    setSidebarMode(null);
    setPendingLatLng(null);
  };

  const handleUpdateSpotSpecies = (spotId: string, updatedSpecies: string[]) => {
    const updated = updateSpotSpecies(spotId, updatedSpecies);
    setSpots(updated);
    if (selectedSpot && selectedSpot.id === spotId) {
      setSelectedSpot({ ...selectedSpot, species: updatedSpecies });
    }
  };

  const handleUpdateSpotDetails = async (spotId: string, updates: Partial<FishingSpot>) => {
    const updated = await updateSpotDetails(spotId, updates);
    setSpots(updated);
    if (selectedSpot && selectedSpot.id === spotId) {
      setSelectedSpot({ ...selectedSpot, ...updates });
    }
  };

  const handleDeleteSpot = async (spotId: string) => {
    const updated = await deleteSpot(spotId);
    setSpots(updated);
    setSidebarMode(null);
    setSelectedSpot(null);
  };

  const handleLogCatch = (entry: CatchLog) => {
    logCatch(entry);
    setCatches(getCatches());
    setSidebarMode('spot');
  };

  const closeSidebar = () => {
    setSidebarMode(null);
    setSelectedSpot(null);
    setPendingLatLng(null);
  };

  const handleSyncSpots = async () => {
    const synced = await fetchCommunitySpots();
    setSpots(synced);
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
        onPinAtCenter={() => handlePinDrop(39.5, -96.0)}
        onOpenForum={() => setSidebarMode('forum')}
        onSyncSpots={handleSyncSpots}
      />

      <MapView
        spots={spots}
        heatmapData={heatmapData}
        showMarkers={showMarkers}
        showHeatmap={showHeatmap}
        addMode={addMode}
        pendingLatLng={pendingLatLng}
        onMapClick={handleMapClick}
        onPinDrop={handlePinDrop}
        onMarkerClick={handleMarkerClick}
      />

      {showHeatmap && <HeatmapLegend />}

      <Sidebar isOpen={sidebarMode !== null} onClose={closeSidebar}>
        {sidebarMode === 'spot' && selectedSpot && (
          <SpotDetail
            spot={selectedSpot}
            catches={catches}
            onLogCatch={() => setSidebarMode('logCatch')}
            onUpdateSpecies={handleUpdateSpotSpecies}
            onUpdateSpotDetails={handleUpdateSpotDetails}
            onDeleteSpot={handleDeleteSpot}
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
        {sidebarMode === 'forum' && (
          <CommunityForum
            spots={spots}
            onSelectSpot={(spot) => handleMarkerClick(spot)}
            onClose={closeSidebar}
          />
        )}
      </Sidebar>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter hook={useHashLocation}>
        <Switch>
          <Route path="/" component={FishingMapApp} />
          <Route component={FishingMapApp} />
        </Switch>
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
