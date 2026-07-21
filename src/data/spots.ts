export type AccessDifficulty = 'easy' | 'moderate' | 'hike';

export type FishingSpot = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  species: string[];
  notes: string;
  dateAdded: string;
  isUserAdded: boolean;
  accessDifficulty: AccessDifficulty;
};

// Changing this key forces all browsers to start fresh (old key is simply abandoned)
const STORAGE_KEY = 'fishing_spots_v8';

// 20 spots spread across the continental US
const DEFAULT_SPOTS: FishingSpot[] = [
  // ── Pacific Northwest ────────────────────────────────────────────────────
  {
    id: 'spot-pnw-1',
    name: 'Deschutes River Canyon, OR',
    lat: 44.88,
    lng: -120.82,
    species: ['Rainbow Trout'],
    notes: 'Wild redband trout pocket water. Wade carefully — slick basalt bottom. Best from June–Sept.',
    dateAdded: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'hike',
  },
  {
    id: 'spot-pnw-2',
    name: 'Puget Sound Pier 86, WA',
    lat: 47.63,
    lng: -122.37,
    species: ['Rainbow Trout'],
    notes: 'Sea-run cutthroat in the Sound year-round. Anchovies or small spinners under a float. Coho salmon pass through August–October.',
    dateAdded: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },

  // ── Boise & Boise National Forest ─────────────────────────────────────────
  {
    id: 'spot-id-1',
    name: 'Boise River Greenbelt, ID',
    lat: 43.61,
    lng: -116.20,
    species: ['Smallmouth Bass', 'Rainbow Trout'],
    notes: 'Urban gem right through downtown. Smallmouth stack up on riffles and mid-river boulders. Trout hold in the deeper green pools.',
    dateAdded: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-id-2',
    name: 'South Fork Boise River, ID',
    lat: 43.52,
    lng: -115.61,
    species: ['Brown Trout', 'Rainbow Trout'],
    notes: 'Cold tailwater below Anderson Ranch Dam — world-class brown trout. Midge and BWO hatches all winter. Wading only, catch-and-release recommended.',
    dateAdded: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },
  {
    id: 'spot-id-3',
    name: 'Deadwood Reservoir, Boise NF, ID',
    lat: 44.28,
    lng: -115.68,
    species: ['Brook Trout', 'Rainbow Trout'],
    notes: 'Remote Boise NF reservoir surrounded by Ponderosa pine. Native brookies and stockie rainbows. Road washes out early spring — plan for a hike.',
    dateAdded: new Date(Date.now() - 48 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'hike',
  },
  {
    id: 'spot-id-4',
    name: 'North Fork Payette River, ID',
    lat: 44.72,
    lng: -115.92,
    species: ['Smallmouth Bass', 'Brown Trout'],
    notes: 'Steep canyon water above Cascade. Exceptional smallmouth in the warmer lower reaches; browns hide under cut banks upstream.',
    dateAdded: new Date(Date.now() - 34 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'hike',
  },

  // ── California ───────────────────────────────────────────────────────────
  {
    id: 'spot-ca-1',
    name: 'Lake Tahoe West Shore, CA',
    lat: 39.1,
    lng: -120.13,
    species: ['Rainbow Trout'],
    notes: 'Ultra-clear water — fish deep in summer, 40–60ft. Use scented bait or small spoons.',
    dateAdded: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },
  {
    id: 'spot-ca-2',
    name: 'Lake Havasu East Shore, AZ/CA',
    lat: 34.5,
    lng: -114.32,
    species: ['Largemouth Bass', 'Striped Bass'],
    notes: 'Topwater on the flats at first light. Stripers push baitfish against the rock walls.',
    dateAdded: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },

  // ── Mountain West ────────────────────────────────────────────────────────
  {
    id: 'spot-mt-1',
    name: 'Yellowstone River Oxbow, MT',
    lat: 45.05,
    lng: -110.48,
    species: ['Rainbow Trout'],
    notes: 'Cutthroat and rainbow mix. No bait allowed — artificial only. Pristine water.',
    dateAdded: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'hike',
  },
  {
    id: 'spot-ut-1',
    name: 'Flaming Gorge Dam Tailwaters, UT',
    lat: 40.91,
    lng: -109.42,
    species: ['Rainbow Trout', 'Walleye'],
    notes: 'Cold, crystal water below the dam. Mysis shrimp imitations deadly year-round.',
    dateAdded: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-co-1',
    name: 'Blue River Tailwaters, CO',
    lat: 39.93,
    lng: -106.1,
    species: ['Rainbow Trout'],
    notes: 'Gold Medal water below Dillon Reservoir. 18+" fish common. Tiny midges in slow pools.',
    dateAdded: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },

  // ── Southwest ────────────────────────────────────────────────────────────
  {
    id: 'spot-tx-1',
    name: 'Guadalupe River, TX',
    lat: 29.89,
    lng: -98.12,
    species: ['Rainbow Trout', 'Largemouth Bass'],
    notes: 'Texas Hill Country gem. Winter stocking makes trout fishing surprisingly good Dec–Feb.',
    dateAdded: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },
  {
    id: 'spot-tx-2',
    name: 'Sam Rayburn Reservoir Timber Flats, TX',
    lat: 31.07,
    lng: -94.12,
    species: ['Largemouth Bass', 'Catfish'],
    notes: 'Massive largemouth bass lake. Flipping jigs into the standing timber is deadly.',
    dateAdded: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },

  // ── Midwest ──────────────────────────────────────────────────────────────
  {
    id: 'spot-mn-1',
    name: 'Boundary Waters Portage Lake, MN',
    lat: 47.92,
    lng: -91.48,
    species: ['Walleye', 'Rainbow Trout'],
    notes: 'Permit required. Remote canoe country — no motors. Worth every portage.',
    dateAdded: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'hike',
  },
  {
    id: 'spot-wi-1',
    name: 'Green Bay Walleye Reef, WI',
    lat: 44.48,
    lng: -87.92,
    species: ['Walleye', 'Striped Bass'],
    notes: 'Rocky reef at 18–24ft. Night jigging with glow jigs produces limits.',
    dateAdded: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-oh-1',
    name: 'Lake Erie Western Reef, OH',
    lat: 41.73,
    lng: -82.84,
    species: ['Walleye'],
    notes: 'Walleye capital of the world. Crawler harnesses trolled at 1.3 mph is the go-to.',
    dateAdded: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ar-1',
    name: 'White River Below Bull Shoals, AR',
    lat: 36.35,
    lng: -92.59,
    species: ['Rainbow Trout'],
    notes: 'World-class trout fishery. Cold dam releases keep temps perfect year-round.',
    dateAdded: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },

  // ── Southeast ────────────────────────────────────────────────────────────
  {
    id: 'spot-tn-1',
    name: 'Clinch River Tailwaters, TN',
    lat: 36.12,
    lng: -84.02,
    species: ['Rainbow Trout'],
    notes: 'Technical dry-fly water. Sulphur hatches in May are spectacular.',
    dateAdded: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },
  {
    id: 'spot-fl-1',
    name: 'Lake Okeechobee Rim Canal, FL',
    lat: 26.92,
    lng: -80.81,
    species: ['Largemouth Bass', 'Catfish'],
    notes: 'Giant bass in the lily pads. February–April peak. Swim jigs and frogs rule.',
    dateAdded: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ga-1',
    name: 'Okefenokee Swamp Edge, GA',
    lat: 30.73,
    lng: -82.25,
    species: ['Largemouth Bass', 'Catfish'],
    notes: 'Tannin-stained water. Bass love the cypress knees. Go early — gators active midday.',
    dateAdded: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'hike',
  },

  // ── Mid-Atlantic & Northeast ─────────────────────────────────────────────
  {
    id: 'spot-va-2',
    name: 'Rapidan River, Shenandoah NP, VA',
    lat: 38.53,
    lng: -78.40,
    species: ['Brook Trout', 'Brown Trout'],
    notes: 'Wild native brook trout in the heart of Shenandoah NP. Hoover\'s old presidential fishing camp sits nearby. Artificial lures only, catch-and-release. Fish the plunge pools below small falls. NPS fishing permit required.',
    dateAdded: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'hike',
  },
  {
    id: 'spot-md-2',
    name: 'Still Pond Bay, MD',
    lat: 39.34,
    lng: -76.07,
    species: ['Largemouth Bass', 'Striped Bass', 'Snakehead'],
    notes: 'Sheltered cove off the upper Chesapeake — the bay itself, not the creek or town. Snakehead thrive in the shallow grass beds; frog lures over the mats are deadly June–Aug. Stripers blitz the mouth in fall and spring chasing baitfish. Largemouth hold along the submerged structure and weed edges year-round.',
    dateAdded: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-md-1',
    name: 'Potomac River — Great Falls, MD',
    lat: 39.0,
    lng: -77.25,
    species: ['Smallmouth Bass', 'Largemouth Bass'],
    notes: 'World-class urban smallmouth fishery. Boulder gardens and fast chutes above the falls hold big fish. Topwater in morning, tube jigs mid-day. Catch-and-release strongly encouraged.',
    dateAdded: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },
  {
    id: 'spot-de-1',
    name: 'Bethany Beach Surf, DE',
    lat: 38.54,
    lng: -75.06,
    species: ['Striped Bass', 'Spanish Mackerel'],
    notes: 'Mid-Atlantic surf spot. Stripers blitz Oct–Nov on bunker. Spanish Mackerel show up June–Sept — fast Gotcha plugs in the wash. Dawn and dusk are money. Bucktails and metal-lipped swimmers for stripers.',
    dateAdded: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-de-2',
    name: 'Indian River Inlet, DE',
    lat: 38.61,
    lng: -75.07,
    species: ['Striped Bass', 'Spanish Mackerel'],
    notes: 'One of the most productive inlets on the Delmarva Peninsula. Strong tidal rip holds stripers year-round. Spanish Mac flood the inlet June–Sept. Fish the outgoing tide from the jetty rocks — metal lures and bucktails in the current seam.',
    dateAdded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-va-1',
    name: 'Chesapeake Bay Mouth, VA',
    lat: 37.0,
    lng: -76.02,
    species: ['Striped Bass'],
    notes: 'Fall striper blitz is legendary. Live bunker under birds is the move.',
    dateAdded: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ny-1',
    name: 'Upper Delaware River Pools, NY',
    lat: 41.65,
    lng: -74.72,
    species: ['Rainbow Trout'],
    notes: 'Wild brown and rainbow trout. Sulphur and caddis hatches May–June. No-kill section.',
    dateAdded: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },
  {
    id: 'spot-me-1',
    name: 'Rangeley Lake, ME',
    lat: 44.91,
    lng: -70.68,
    species: ['Rainbow Trout', 'Walleye'],
    notes: 'Landlocked salmon and brook trout in crystal clear water. Trolling streamers works all summer.',
    dateAdded: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },
];

export const getSpots = (): FishingSpot[] => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    const parsed = JSON.parse(stored) as FishingSpot[];
    return parsed.map((s) => ({
      ...s,
      accessDifficulty: (s.accessDifficulty ?? 'easy') as AccessDifficulty,
    }));
  }

  // First load on this key — seed with defaults
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SPOTS));
  return DEFAULT_SPOTS;
};

export const saveSpot = (spot: FishingSpot): void => {
  const spots = getSpots();
  spots.push(spot);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(spots));
};

export const saveAllSpots = (spots: FishingSpot[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(spots));
};
