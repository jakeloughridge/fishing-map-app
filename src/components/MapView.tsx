import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { FishingSpot } from '@/data/spots';
import { HeatmapPoint } from '@/data/heatmap';
import { SPECIES_DATA } from '@/data/species';

// Fix for Leaflet default icon issues in React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconUrl,
  shadowUrl: iconShadow,
  iconRetinaUrl: iconUrl,
});

interface MapViewProps {
  spots: FishingSpot[];
  heatmapData: HeatmapPoint[];
  showMarkers: boolean;
  showHeatmap: boolean;
  addMode: boolean;
  pendingLatLng?: { lat: number; lng: number } | null;
  onMapClick: (lat: number, lng: number) => void;
  onPinDrop: (lat: number, lng: number) => void;
  onMarkerClick: (spot: FishingSpot) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  spots,
  heatmapData,
  showMarkers,
  showHeatmap,
  addMode,
  pendingLatLng,
  onMapClick,
  onPinDrop,
  onMarkerClick,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const heatmapLayerRef = useRef<L.LayerGroup | null>(null);
  const draggableMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
    }).setView([39.5, -96.0], 4);

    // Fastly CDN backed tile layer with CSS navy dark filter & fallback
    const primaryTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      subdomains: 'abcd',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      className: 'map-tiles',
      keepBuffer: 10,
      updateWhenIdle: false,
      updateWhenZooming: true,
    });

    const fallbackTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
      className: 'map-tiles',
      keepBuffer: 10,
    });

    primaryTiles.on('tileerror', () => {
      if (!map.hasLayer(fallbackTiles)) {
        fallbackTiles.addTo(map);
      }
    });

    primaryTiles.addTo(map);

    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    heatmapLayerRef.current = L.layerGroup().addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Manage Draggable Water Pin
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const waterPinIcon = L.divIcon({
      className: 'custom-water-pin-icon',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: grab;">
          <div style="position: absolute; width: 44px; height: 44px; background: rgba(6, 182, 212, 0.35); border-radius: 50%; border: 1.5px dashed #22d3ee; animation: pulse 2s infinite;"></div>
          <div style="width: 32px; height: 32px; border-radius: 50%; background: #0891b2; border: 2.5px solid #ffffff; box-shadow: 0 10px 25px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; font-size: 15px;">
            💧
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    });

    if (addMode || pendingLatLng) {
      const initialPos: [number, number] = pendingLatLng
        ? [pendingLatLng.lat, pendingLatLng.lng]
        : [map.getCenter().lat, map.getCenter().lng];

      if (!draggableMarkerRef.current) {
        const marker = L.marker(initialPos, {
          draggable: true,
          icon: waterPinIcon,
          zIndexOffset: 2000,
        }).addTo(map);

        marker.on('dragend', (e) => {
          const ll = e.target.getLatLng();
          onPinDrop(ll.lat, ll.lng);
        });

        draggableMarkerRef.current = marker;
      } else {
        draggableMarkerRef.current.setLatLng(initialPos);
        if (!map.hasLayer(draggableMarkerRef.current)) {
          draggableMarkerRef.current.addTo(map);
        }
      }
    } else {
      if (draggableMarkerRef.current) {
        map.removeLayer(draggableMarkerRef.current);
        draggableMarkerRef.current = null;
      }
    }
  }, [addMode, pendingLatLng, onPinDrop]);

  // Smoothly pan map when pendingLatLng is set
  useEffect(() => {
    if (mapRef.current && pendingLatLng) {
      mapRef.current.flyTo([pendingLatLng.lat, pendingLatLng.lng], Math.max(mapRef.current.getZoom(), 8), {
        duration: 1.2,
      });
    }
  }, [pendingLatLng]);

  // Map click handler — rebinds when addMode changes
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const handleClick = (e: L.LeafletMouseEvent) => {
      if (addMode) onMapClick(e.latlng.lat, e.latlng.lng);
    };

    map.on('click', handleClick);

    if (addMode) {
      mapContainerRef.current?.classList.add('cursor-crosshair');
    } else {
      mapContainerRef.current?.classList.remove('cursor-crosshair');
    }

    return () => {
      map.off('click', handleClick);
    };
  }, [addMode, onMapClick]);

  // Redraw spot markers whenever spots or visibility changes
  useEffect(() => {
    if (!markersLayerRef.current) return;
    const layer = markersLayerRef.current;
    layer.clearLayers();

    if (showMarkers) {
      spots.forEach((spot) => {
        let markerColor = '#0f766e';
        if (spot.species?.length > 0) {
          const sd = SPECIES_DATA.find((s) => s.name === spot.species[0]);
          if (sd) markerColor = sd.color;
        }

        // Outer glow ring
        const outer = L.circleMarker([spot.lat, spot.lng], {
          radius: 14,
          fillColor: markerColor,
          color: 'transparent',
          weight: 0,
          fillOpacity: 0.2,
          interactive: true,
        });

        // Main dot
        const inner = L.circleMarker([spot.lat, spot.lng], {
          radius: 8,
          fillColor: markerColor,
          color: '#ffffff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.88,
          interactive: true,
        });

        const onClick = () => {
          if (!addMode) onMarkerClick(spot);
        };

        outer.on('click', onClick);
        inner.on('click', onClick);

        outer.addTo(layer);
        inner.addTo(layer);
      });
    }

    // Render temporary pin for pending water spot if present
    if (pendingLatLng) {
      const pendingOuter = L.circleMarker([pendingLatLng.lat, pendingLatLng.lng], {
        radius: 20,
        fillColor: '#06b6d4',
        color: '#22d3ee',
        weight: 2,
        fillOpacity: 0.35,
        interactive: false,
      });

      const pendingInner = L.circleMarker([pendingLatLng.lat, pendingLatLng.lng], {
        radius: 10,
        fillColor: '#0891b2',
        color: '#ffffff',
        weight: 3,
        opacity: 1,
        fillOpacity: 1,
        interactive: false,
      });

      pendingOuter.addTo(layer);
      pendingInner.addTo(layer);
    }
  }, [spots, showMarkers, addMode, pendingLatLng, onMarkerClick]);

  // Redraw heatmap whenever data or visibility changes
  useEffect(() => {
    if (!heatmapLayerRef.current) return;
    const layer = heatmapLayerRef.current;
    layer.clearLayers();

    if (!showHeatmap) return;

    heatmapData.forEach((point) => {
      // Interpolate green → yellow → red using HSL
      const hue = (1 - point.pressure) * 120; // 120° = green, 0° = red
      const color = `hsl(${hue}, 90%, 52%)`;
      const radius = point.radius ?? 40;

      L.circleMarker([point.lat, point.lng], {
        radius,
        fillColor: color,
        color: 'transparent',
        weight: 0,
        fillOpacity: 0.32,
        interactive: false,
      }).addTo(layer);
    });
  }, [heatmapData, showHeatmap]);

  return (
    <div
      ref={mapContainerRef}
      className={`absolute inset-0 w-full h-full z-0 ${
        addMode ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'
      }`}
    />
  );
};
