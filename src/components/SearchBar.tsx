import React, { useState, useEffect, useRef } from 'react';
import { FishingSpot } from '@/data/spots';
import { SPECIES_DATA } from '@/data/species';
import { Search, X, MapPin, Fish, Navigation, Loader2, Sparkles } from 'lucide-react';

interface SearchBarProps {
  spots: FishingSpot[];
  onSelectSpot: (spot: FishingSpot) => void;
  onSelectLocation: (lat: number, lng: number, zoom?: number) => void;
}

type SearchResultItem =
  | { type: 'spot'; spot: FishingSpot; title: string; subtitle: string }
  | { type: 'species'; speciesName: string; spotsCount: number; sampleSpot: FishingSpot }
  | { type: 'geo'; title: string; subtitle: string; lat: number; lng: number };

export const SearchBar: React.FC<SearchBarProps> = ({
  spots,
  onSelectSpot,
  onSelectLocation,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geoResults, setGeoResults] = useState<{ title: string; subtitle: string; lat: number; lng: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced geocoding search for custom place names (e.g. "Seattle", "Lake Tahoe")
  useEffect(() => {
    if (!query.trim() || query.length < 3) {
      setGeoResults([]);
      setIsGeocoding(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsGeocoding(true);
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query.trim())}&limit=3`
        );
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const mapped = data.map((item: any) => ({
              title: item.display_name.split(',')[0],
              subtitle: item.display_name.split(',').slice(1).join(',').trim(),
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon),
            }));
            setGeoResults(mapped);
          }
        }
      } catch (err) {
        console.warn('Geocoding error:', err);
      } finally {
        setIsGeocoding(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const cleanQuery = query.toLowerCase().trim();

  // 1. Matching Fishing Spots by Name, Notes, or Access
  const matchingSpots: SearchResultItem[] = cleanQuery
    ? spots
        .filter(
          (s) =>
            s.name.toLowerCase().includes(cleanQuery) ||
            (s.notes && s.notes.toLowerCase().includes(cleanQuery)) ||
            s.accessDifficulty.toLowerCase().includes(cleanQuery)
        )
        .slice(0, 5)
        .map((spot) => ({
          type: 'spot' as const,
          spot,
          title: spot.name,
          subtitle: `${spot.species.slice(0, 3).join(', ')}${spot.species.length > 3 ? '...' : ''}`,
        }))
    : [];

  // 2. Matching Species by Name (e.g., "Lake Trout", "Gar", "Bass")
  const matchingSpecies: SearchResultItem[] = cleanQuery
    ? SPECIES_DATA.filter((s) => s.name.toLowerCase().includes(cleanQuery))
        .slice(0, 3)
        .map((sp) => {
          const matchingSpotList = spots.filter((spot) => spot.species.includes(sp.name));
          return {
            type: 'species' as const,
            speciesName: sp.name,
            spotsCount: matchingSpotList.length,
            sampleSpot: matchingSpotList[0] || spots[0],
          };
        })
        .filter((item) => item.spotsCount > 0)
    : [];

  // 3. Geocoding results
  const geoItems: SearchResultItem[] = geoResults.map((g) => ({
    type: 'geo' as const,
    title: g.title,
    subtitle: g.subtitle,
    lat: g.lat,
    lng: g.lng,
  }));

  const hasResults = matchingSpots.length > 0 || matchingSpecies.length > 0 || geoItems.length > 0;

  const handleSelectSpotItem = (spot: FishingSpot) => {
    onSelectSpot(spot);
    onSelectLocation(spot.lat, spot.lng, 12);
    setIsOpen(false);
    setQuery('');
  };

  const handleSelectGeoItem = (lat: number, lng: number) => {
    onSelectLocation(lat, lng, 11);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-sm sm:max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-cyan-400 shrink-0 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search spots, species, lakes, or cities..."
          className="w-full bg-slate-950/90 backdrop-blur-md text-foreground placeholder-muted-foreground/70 pl-10 pr-9 py-2.5 rounded-full border border-cyan-500/40 text-xs sm:text-sm font-semibold shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
        />
        {query ? (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          isGeocoding && (
            <Loader2 className="absolute right-3 w-4 h-4 text-cyan-400 animate-spin" />
          )
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-950/95 backdrop-blur-xl border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden z-[2000] max-h-[75vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          {!hasResults && !isGeocoding && (
            <div className="p-4 text-center text-xs text-muted-foreground">
              No spots or locations found matching &quot;{query}&quot;
            </div>
          )}

          {/* Matching Spots Section */}
          {matchingSpots.length > 0 && (
            <div className="p-2 border-b border-border/50">
              <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                <span>Fishing Spots ({matchingSpots.length})</span>
              </div>
              {matchingSpots.map((item) => {
                if (item.type !== 'spot') return null;
                return (
                  <button
                    key={item.spot.id}
                    onClick={() => handleSelectSpotItem(item.spot)}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-500/10 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-foreground group-hover:text-cyan-300">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate max-w-[240px]">
                        {item.subtitle || 'No species listed'}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-2 py-0.5 rounded-full shrink-0">
                      View
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Matching Species Section */}
          {matchingSpecies.length > 0 && (
            <div className="p-2 border-b border-border/50">
              <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Fish className="w-3 h-3" />
                <span>Fish Species ({matchingSpecies.length})</span>
              </div>
              {matchingSpecies.map((item) => {
                if (item.type !== 'species') return null;
                return (
                  <button
                    key={item.speciesName}
                    onClick={() => handleSelectSpotItem(item.sampleSpot)}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-500/10 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-foreground group-hover:text-emerald-300">
                        {item.speciesName}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Found in {item.spotsCount} spot{item.spotsCount > 1 ? 's' : ''} on map
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full shrink-0">
                      Go to Spot
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Map Location / Cities Section */}
          {geoItems.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Navigation className="w-3 h-3" />
                <span>Map Cities &amp; Regions</span>
              </div>
              {geoItems.map((item, idx) => {
                if (item.type !== 'geo') return null;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectGeoItem(item.lat, item.lng)}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-500/10 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="truncate pr-2">
                      <div className="text-xs font-bold text-foreground group-hover:text-amber-300 truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate">
                        {item.subtitle}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded-full shrink-0">
                      Fly To
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
