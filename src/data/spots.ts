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
  pressureOverride?: number;
};

// Changing this key forces all browsers to start fresh (old key is simply abandoned)
const STORAGE_KEY = 'fishing_spots_v35';

// Spots spread across the continental US & Canada
const DEFAULT_SPOTS: FishingSpot[] = [
  // ── New York Top 5 Premier Fisheries ────────────────────────────────────
  {
    id: 'spot-ny-1',
    name: 'Montauk Point — The Surfcasting Capital, NY',
    lat: 41.0710,
    lng: -71.8569,
    species: ['Striped Bass', 'Bluefish', 'Summer Flounder', 'Black Sea Bass', 'Tautog', 'Spanish Mackerel'],
    notes: 'The Surfcasting Capital of the World. Legendary fall blitzes with trophy Striped Bass, Bluefish, Tautog, Black Sea Bass, and Summer Flounder crashing bait off the lighthouse rock ledges and rips.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ny-2',
    name: 'Salmon River — Pulaski & Douglaston Run, NY',
    lat: 43.5658,
    lng: -76.1384,
    species: ['King Salmon', 'Coho Salmon', 'Brown Trout', 'Rainbow Trout', 'Lake Trout', 'Cutthroat Trout'],
    notes: 'World-class Great Lakes salmon, lake trout, and steelhead migratory run. Massive King Salmon (Chinook), Coho, and deep Lake Trout stack up in deep gravel runs and Lake Ontario basins.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ny-3',
    name: 'Lake Erie — Buffalo Harbor & Outer Breakwalls, NY',
    lat: 42.8715,
    lng: -78.8955,
    species: ['Smallmouth Bass', 'Walleye', 'Lake Trout', 'Gar', 'Yellow Perch', 'Sturgeon', 'Carp'],
    notes: 'Ranked as one of America\'s #1 Smallmouth Bass fisheries. Monster bronze-backs, deep Lake Trout, trophy Walleye, Longnose Gar, Yellow Perch, and Carp thrive along the harbor breakwalls and rock reefs.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ny-4',
    name: 'Lake Champlain — Ticonderoga & South Bay, NY',
    lat: 43.8475,
    lng: -73.3980,
    species: ['Largemouth Bass', 'Smallmouth Bass', 'Lake Trout', 'Gar', 'Northern Pike', 'Crappie', 'Bluegill', 'Walleye'],
    notes: 'Nationally renowned bass and lake trout tournament destination. Deep coldwater basins hold wild Lake Trout, while lush shallow weed beds hold heavy Largemouth Bass, Longnose Gar, and Northern Pike.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ny-5',
    name: 'Oneida Lake — Sylvan Beach & Shoal Reefs, NY',
    lat: 43.1812,
    lng: -75.9870,
    species: ['Walleye', 'Yellow Perch', 'Smallmouth Bass', 'Largemouth Bass', 'Gar', 'Carp', 'Catfish'],
    notes: 'New York\'s premier Walleye factory. Shallow natural lake with extensive shoal reefs holding massive schools of Walleye, Longnose Gar, Yellow Perch, Smallmouth Bass, and Carp.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  // ── Pacific Northwest ────────────────────────────────────────────────────
  {
    id: 'spot-pnw-1',
    name: 'Deschutes River Canyon, OR',
    lat: 44.88,
    lng: -120.82,
    species: ['Rainbow Trout', 'Brown Trout', 'Bull Trout', 'Mountain Whitefish', 'King Salmon', 'Coho Salmon'],
    notes: 'Wild redband trout pocket water, native bull trout, mountain whitefish, brown trout, and annual salmon runs. Wade carefully — slick basalt bottom. Best from June–Sept.',
    dateAdded: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'hike',
  },
  {
    id: 'spot-pnw-2',
    name: 'Puget Sound Pier 86, WA',
    lat: 47.63,
    lng: -122.37,
    species: ['Rainbow Trout', 'Cutthroat Trout', 'Coho Salmon', 'King Salmon', 'Pink Salmon', 'Chum Salmon'],
    notes: 'Sea-run cutthroat and rainbow trout in the Sound year-round. Coho, King, Pink, and Chum salmon pass through from August through November. Buzz Bombs, spinners, and live bait under floats.',
    dateAdded: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-pnw-3',
    name: 'Middle Fork Snoqualmie River — North Bend, WA',
    lat: 47.4950,
    lng: -121.7850,
    species: ['Cutthroat Trout', 'Rainbow Trout', 'Mountain Whitefish', 'Bull Trout'],
    notes: 'Scenic Cascade mountain freestone river near North Bend. Native Coastal Cutthroat, wild Rainbow Trout, Mountain Whitefish, and protected Bull Trout hold in deep gravel pools, pocket water, and boulder runs.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },

  // ── Boise & Boise National Forest ─────────────────────────────────────────
  {
    id: 'spot-id-1',
    name: 'Boise River Greenbelt, ID',
    lat: 43.61,
    lng: -116.2,
    species: ['Rainbow Trout', 'Brown Trout', 'Smallmouth Bass', 'Bluegill'],
    notes: 'Urban gem right through downtown. Smallmouth and bluegill stack up on riffles and mid-river boulders. Rainbow and brown trout hold in the deeper green pools.',
    dateAdded: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-id-2',
    name: 'South Fork Boise River, ID',
    lat: 43.52,
    lng: -115.61,
    species: ['Brown Trout', 'Rainbow Trout', 'Bull Trout', 'Mountain Whitefish'],
    notes: 'Cold tailwater below Anderson Ranch Dam — world-class brown trout, native bull trout, and mountain whitefish. Midge and BWO hatches all winter. Wading only, catch-and-release recommended.',
    dateAdded: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },
  {
    id: 'spot-id-3',
    name: 'Middle Fork Payette River — Rattlesnake Campground, ID',
    lat: 44.18,
    lng: -115.93,
    species: ['Rainbow Trout', 'Brown Trout', 'Bull Trout', 'Mountain Whitefish', 'Brook Trout'],
    notes: 'Scenic freestone mountain river running right past Rattlesnake Campground in the Boise National Forest. Wild rainbow, brown, bull trout, mountain whitefish, and brook trout hold in shallow riffles and deep boulder pools.',
    dateAdded: new Date(Date.now() - 48 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-id-4',
    name: 'North Fork Payette River, ID',
    lat: 44.72,
    lng: -115.92,
    species: ['Rainbow Trout', 'Brown Trout', 'Smallmouth Bass'],
    notes: 'Steep canyon water above Cascade. Exceptional smallmouth in the warmer lower reaches; wild rainbow and brown trout hide under cut banks upstream.',
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
    species: ['Lake Trout', 'Rainbow Trout', 'Brown Trout', 'Cutthroat Trout', 'Mountain Whitefish'],
    notes: 'Ultra-clear deep water holding trophy Mackinaw (Lake Trout), wild Rainbow, Brown, Mountain Whitefish, and Lahontan Cutthroat Trout. Fish 40–60ft in summer with scented bait or trolling spoons.',
    dateAdded: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },
  {
    id: 'spot-ca-2',
    name: 'Lake Havasu East Shore, AZ/CA',
    lat: 34.5,
    lng: -114.32,
    species: ['Largemouth Bass', 'Smallmouth Bass', 'Striped Bass', 'Catfish', 'Bluegill', 'Crappie'],
    notes: 'Premier desert reservoir famous for world-class largemouth, smallmouth, and striped bass. Topwater on the flats at first light; trophy bluegill and crappie in habitat structures.',
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
    species: ['Cutthroat Trout', 'Rainbow Trout', 'Brown Trout'],
    notes: 'Cutthroat and rainbow mix with big browns lurking in deep pools. No bait allowed — artificial lures and flies only. Pristine water.',
    dateAdded: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'hike',
  },
  {
    id: 'spot-ut-1',
    name: 'Flaming Gorge Dam Tailwaters, UT',
    lat: 40.91,
    lng: -109.42,
    species: ['Rainbow Trout', 'Brown Trout', 'Cutthroat Trout', 'Walleye'],
    notes: 'World-famous Green River tailwater below the dam holding high densities of trophy Rainbow, Brown, and Cutthroat Trout. Mysis shrimp imitations deadly year-round.',
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
    species: ['Largemouth Bass', 'Smallmouth Bass', 'Rainbow Trout', 'Catfish'],
    notes: 'Texas Hill Country gem. Native Guadalupe and largemouth bass year-round; winter trout stocking makes rainbow trout fishing exceptional Dec–Feb.',
    dateAdded: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },
  {
    id: 'spot-tx-2',
    name: 'Sam Rayburn Reservoir Timber Flats, TX',
    lat: 31.07,
    lng: -94.12,
    species: ['Largemouth Bass', 'Catfish', 'Crappie', 'Bluegill'],
    notes: 'Massive largemouth bass lake with standing timber, slab crappie on brush piles, and bluegill in shallow coves. Flipping jigs into standing timber is deadly.',
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
    species: ['Walleye', 'Rainbow Trout', 'Northern Pike'],
    notes: 'Permit required. Remote canoe country with trophy Northern Pike lurking in cabbage bays and Walleye off rocky reefs. Worth every portage.',
    dateAdded: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'hike',
  },
  {
    id: 'spot-wi-1',
    name: 'Green Bay Walleye Reef, WI',
    lat: 44.48,
    lng: -87.92,
    species: ['Walleye', 'Northern Pike', 'Muskellunge'],
    notes: 'Rocky reef at 18–24ft. Trophy Muskellunge and Northern Pike in Green Bay weed flats, plus night walleye jigging.',
    dateAdded: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-oh-1',
    name: 'Lake Erie Western Reef, OH',
    lat: 41.73,
    lng: -82.84,
    species: ['Walleye', 'Yellow Perch', 'Smallmouth Bass', 'White Perch', 'Largemouth Bass', 'Rainbow Trout', 'Catfish'],
    notes: 'Widely celebrated as the Walleye Capital of the World and a premier Great Lakes Yellow Perch & Smallmouth Bass factory. Trolling crawler harnesses at 1.3 mph, jigging blade baits on reef complexes, and drifting 2-hook perch rigs with live shiners over 25–35ft sand flats.',
    dateAdded: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ar-1',
    name: 'White River Below Bull Shoals, AR',
    lat: 36.35,
    lng: -92.59,
    species: ['Rainbow Trout', 'Brown Trout', 'Cutthroat Trout'],
    notes: 'World-class tailwater trout fishery producing giant trophy Brown Trout, Rainbow Trout, and Cutthroat Trout. Cold dam releases keep temps perfect year-round.',
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
    species: ['Rainbow Trout', 'Brown Trout'],
    notes: 'Technical tailwater holding trophy Brown and Rainbow Trout. Sulphur hatches in May are spectacular.',
    dateAdded: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },
  {
    id: 'spot-fl-1',
    name: 'Lake Okeechobee Rim Canal, FL',
    lat: 26.92,
    lng: -80.81,
    species: ['Largemouth Bass', 'Catfish', 'Crappie', 'Bluegill'],
    notes: 'Giant bass in the lily pads, plus black crappie (speckled perch) in the rim canal and big bluegill in grass beds. February–April peak. Swim jigs and live minnows rule.',
    dateAdded: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ga-1',
    name: 'Okefenokee Swamp Edge, GA',
    lat: 30.73,
    lng: -82.25,
    species: ['Largemouth Bass', 'Catfish', 'Bluegill', 'Crappie'],
    notes: 'Tannin-stained blackwater. Largemouth bass, channel catfish, bluegill, and crappie in cypress knees. Go early — gators active midday.',
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
    species: ['Smallmouth Bass', 'Largemouth Bass', 'Catfish', 'Walleye', 'Bluegill'],
    notes: 'World-class urban river fishery. Boulder gardens and fast chutes above the falls hold big Smallmouth Bass, trophy Blue Catfish, Walleye, and Largemouth Bass in slack coves.',
    dateAdded: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },
  {
    id: 'spot-de-1',
    name: 'Bethany Beach Surf, DE',
    lat: 38.54,
    lng: -75.06,
    species: ['Striped Bass', 'Spanish Mackerel', 'Bluefish', 'Black Drum'],
    notes: 'Mid-Atlantic surf spot. Stripers blitz Oct–Nov on bunker. Spanish Mackerel and Bluefish show up June–Sept. Spring brings heavy Black Drum to the surf sloughs on fresh sea clam bait.',
    dateAdded: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
    pressureOverride: 0.55,
  },
  {
    id: 'spot-de-2',
    name: 'Indian River Inlet, DE',
    lat: 38.61,
    lng: -75.07,
    species: ['Striped Bass', 'Spanish Mackerel', 'Bluefish', 'Black Drum'],
    notes: 'One of the most productive inlets on the Delmarva Peninsula. Strong tidal rip holds stripers, aggressive bluefish, and bottom-feeding Black Drum year-round. Fish outgoing tides from jetty rocks with wire leaders and clam/crab bait.',
    dateAdded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
    pressureOverride: 0.85,
  },
  {
    id: 'spot-va-1',
    name: 'Chesapeake Bay Mouth, VA',
    lat: 37.0,
    lng: -76.02,
    species: ['Striped Bass', 'Cobia', 'Summer Flounder', 'Speckled Trout', 'Red Drum', 'Black Drum', 'White Perch'],
    notes: 'Fall striper blitz is legendary. Summer cobia cruising the CBBT pilings, trophy Red Drum & Black Drum feeding along the shoals, summer flounder along 18–35ft drop-offs, and speckled trout & white perch in Lynnhaven and Rudee inlets.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ny-1',
    name: 'Upper Delaware River Pools, NY',
    lat: 41.65,
    lng: -74.72,
    species: ['Rainbow Trout', 'Brown Trout', 'Smallmouth Bass'],
    notes: 'Wild brown and rainbow trout, plus smallmouth bass in lower pools. Sulphur and caddis hatches May–June. No-kill section.',
    dateAdded: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },
  {
    id: 'spot-me-1',
    name: 'Rangeley Lake, ME',
    lat: 44.91,
    lng: -70.68,
    species: ['Brook Trout', 'Atlantic Salmon'],
    notes: 'Famous landlocked Atlantic Salmon and native brook trout in crystal clear waters. Trolling streamers and drifting dry flies is legendary.',
    dateAdded: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },

  // ── Nevada & Wyoming ──────────────────────────────────────────────────────
  {
    id: 'spot-nv-1',
    name: 'Pyramid Lake — Pelican Point, NV',
    lat: 39.95,
    lng: -119.60,
    species: ['Cutthroat Trout', 'Rainbow Trout'],
    notes: 'World-famous terminal desert lake home to massive Lahontan Cutthroat Trout (trophies over 20 lbs). Anglers wade from stepladders in hip-deep water casting balanced leeches under indicators. Rainbow trout hold near river mouths in spring.',
    dateAdded: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-wy-1',
    name: 'Yellowstone Lake — West Thumb, WY',
    lat: 44.42,
    lng: -110.57,
    species: ['Cutthroat Trout', 'Rainbow Trout', 'Brown Trout', 'Brook Trout'],
    notes: 'High-altitude lake in the heart of Yellowstone NP holding native Yellowstone Cutthroat Trout alongside rainbow, brown, and brook trout in connected bays and tributaries. Sight-fishing along thermal drop-offs and stream mouths at first light. Artificial lures/flies only with barbless hooks.',
    dateAdded: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },

  // ── North Carolina Sounds ──────────────────────────────────────────────────
  {
    id: 'spot-nc-1',
    name: 'Albemarle Sound — Roanoke Marshes, NC',
    lat: 35.88,
    lng: -75.65,
    species: ['Speckled Trout', 'Red Drum', 'Striped Bass', 'Summer Flounder', 'Black Drum'],
    notes: 'Sprawling brackish estuary system behind the northern Outer Banks. Speckled trout stack up in grassy cuts, Black Drum feed along oyster beds, and stripers hold near bridge pilings.',
    dateAdded: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-nc-2',
    name: 'Pamlico Sound — Ocracoke Shoals, NC',
    lat: 35.15,
    lng: -75.98,
    species: ['Speckled Trout', 'Red Drum', 'Summer Flounder', 'Bluefish', 'Spanish Mackerel', 'Black Drum'],
    notes: 'The largest lagoonal estuary on the US East Coast. World-famous for giant Red Drum ("Old Drum") and heavyweight Black Drum on shoal edges, plus trophy Speckled Trout over submerged grass beds.',
    dateAdded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'moderate',
  },

  // ── Texas & Great Lakes ───────────────────────────────────────────────────
  {
    id: 'spot-tx-3',
    name: 'Lake Fork — Birch Creek Timber, TX',
    lat: 32.85,
    lng: -95.53,
    species: ['Largemouth Bass', 'Crappie', 'Bluegill', 'Catfish'],
    notes: 'Premier trophy largemouth bass capital responsible for over half of the top 50 Texas state-record bass. Massive standing timber fields and hydrilla beds, plus outstanding spring slab crappie in the timber and bluegill in shallow coves.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ny-2',
    name: 'Lake Ontario — Henderson Harbor, NY',
    lat: 43.85,
    lng: -76.20,
    species: ['King Salmon', 'Coho Salmon', 'Rainbow Trout', 'Brown Trout', 'Atlantic Salmon', 'Walleye', 'Smallmouth Bass', 'Northern Pike', 'Muskellunge', 'Yellow Perch', 'White Perch', 'Bluegill', 'Crappie'],
    notes: 'Iconic Great Lakes fishery offering world-class trophy King Salmon, Coho Salmon, Steelhead, Brown Trout, and Atlantic Salmon offshore trolling. Monster Smallmouth Bass, Walleye, Northern Pike, Muskellunge, Yellow Perch, and White Perch in rocky shoals and bays.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },

  // ── Alabama ───────────────────────────────────────────────────────────────
  {
    id: 'spot-al-1',
    name: 'Lake Guntersville — Waterfront Park, AL',
    lat: 34.36,
    lng: -86.29,
    species: ['Largemouth Bass', 'Smallmouth Bass', 'Gar', 'Crappie', 'Bluegill', 'Catfish'],
    notes: 'Alabama\'s largest lake and a premier legendary TVA bass fishery. Famous for vast hydrilla and eelgrass beds, Alligator & Longnose Gar, ledge fishing along the Tennessee River channel, and heavy bluegill in shallow grass.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },

  // ── California, Alaska & Michigan ─────────────────────────────────────────
  {
    id: 'spot-ca-3',
    name: 'Clear Lake — Lucerne Harbor, CA',
    lat: 39.09,
    lng: -122.78,
    species: ['Largemouth Bass', 'Gar', 'Catfish', 'Crappie', 'Bluegill'],
    notes: 'Natural freshwater lake in Northern California widely considered the #1 largemouth bass fishery in the West. Famous for double-digit trophy Florida-strain bass, Longnose Gar, heavy tule reed beds, dock flipping, and spring slab crappie.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ak-1',
    name: 'Kenai River — Soldotna Bridge Park, AK',
    lat: 60.48,
    lng: -151.07,
    species: ['King Salmon', 'Sockeye Salmon', 'Coho Salmon', 'Pink Salmon', 'Chum Salmon', 'Lake Trout', 'Mountain Whitefish', 'Rainbow Trout', 'Cutthroat Trout'],
    notes: 'World-famous turquoise glacial river on Alaska\'s Kenai Peninsula. Legendary runs of King Salmon, Sockeye, Coho, Pink, and Chum salmon, plus trophy Lake Trout (Mackinaw), Mountain Whitefish, and monster Rainbow Trout (30"+) feeding on salmon eggs and flesh.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ak-2',
    name: 'Russian River Confluence — Cooper Landing, AK',
    lat: 60.4870,
    lng: -149.9860,
    species: ['Sockeye Salmon', 'Coho Salmon', 'Rainbow Trout', 'King Salmon', 'Arctic Grayling'],
    notes: 'Famous clearwater salmon stream merging into the Kenai River. Epic summer runs of Sockeye (Red) Salmon, trophy 30"+ leopard rainbow trout, and Arctic Grayling feeding in gravel shallows.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ak-3',
    name: 'Kvichak River — Bristol Bay, AK',
    lat: 59.3330,
    lng: -156.8830,
    species: ['Rainbow Trout', 'Sockeye Salmon', 'King Salmon', 'Arctic Grayling', 'Lake Trout'],
    notes: 'The crown jewel of Bristol Bay. Home to the largest sockeye salmon run on Earth and world-famous wild rainbow trout (30"+ girthy "football" trout) that gorge on salmon eggs in fall.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'hike',
  },
  {
    id: 'spot-ak-4',
    name: 'Ship Creek — Downtown Anchorage, AK',
    lat: 61.2255,
    lng: -149.8885,
    species: ['King Salmon', 'Coho Salmon', 'Pink Salmon'],
    notes: 'The world\'s only urban tidal King Salmon fishery right in downtown Anchorage. Anglers hook 40+ lb Chinooks and Coho salmon against the city skyline during peak summer tides.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ak-5',
    name: 'Kachemak Bay — Homer Spit, AK',
    lat: 59.6025,
    lng: -151.4150,
    species: ['Pacific Halibut', 'King Salmon', 'Coho Salmon', 'Rockfish'],
    notes: 'Homer is known as the "Halibut Capital of the World". Kachemak Bay features world-class saltwater charters for giant Pacific Halibut ("barn doors" over 150 lbs), feeder King Salmon, and Black Rockfish.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-mi-1',
    name: 'Lake St. Clair — Anchor Bay, MI',
    lat: 42.66,
    lng: -82.72,
    species: ['Smallmouth Bass', 'Walleye', 'Lake Trout', 'Muskellunge', 'Northern Pike', 'Yellow Perch', 'Crappie', 'Bluegill'],
    notes: 'Premier freshwater fishery connecting Lake Huron and Lake Erie. World-renowned shallow-water Smallmouth Bass & Muskellunge factory with vast cabbage grass beds and sand flats, plus trophy Lake Trout, Walleye trolling, Yellow Perch, and Northern Pike.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },

  // ── Colorado Gold Medal Waters ────────────────────────────────────────────
  {
    id: 'spot-co-1',
    name: 'The Dream Stream — South Platte River, CO',
    lat: 38.98,
    lng: -105.65,
    species: ['Rainbow Trout', 'Brown Trout', 'Mountain Whitefish', 'Cutthroat Trout'],
    notes: 'World-famous Gold Medal tailwater section of the South Platte River connecting Spinney Mountain and Eleven Mile reservoirs. Legendary spring and fall spawning runs of trophy lake-run Brown Trout, Rainbow Trout, and Mountain Whitefish.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-co-2',
    name: 'Blue Mesa Reservoir — Iola Basin, CO',
    lat: 38.47,
    lng: -107.25,
    species: ['Lake Trout', 'Rainbow Trout', 'Brown Trout', 'Cutthroat Trout'],
    notes: 'Colorado\'s largest body of water and premier trophy Mackinaw (Lake Trout) and Kokanee Salmon fishery. Deep trolling along the Iola and Cebolla basins for massive 40"+ Lake Trout, plus wild Rainbow, Brown, and Cutthroat Trout near river inlets.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-co-3',
    name: 'Roaring Fork River — Basalt Confluence, CO',
    lat: 39.36,
    lng: -107.03,
    species: ['Rainbow Trout', 'Brown Trout', 'Mountain Whitefish', 'Cutthroat Trout'],
    notes: 'Iconic Gold Medal trout stream flowing through the Roaring Fork Valley. Famous for legendary Green Drake hatches in July, prolific Mother\'s Day caddis hatches, and year-round technical nymphing for wild trophy Brown Trout, Rainbow Trout, and Mountain Whitefish.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },

  // ── Midwest Heartland Premier Waters (SD, NE, KS, IA, IN) ───────────────────
  {
    id: 'spot-sd-1',
    name: 'Lake Oahe — Pierre & Cow Creek, SD',
    lat: 44.5200,
    lng: -100.4100,
    species: ['Walleye', 'Smallmouth Bass', 'Northern Pike', 'Catfish', 'Yellow Perch'],
    notes: 'Massive Missouri River reservoir renowned nationwide for world-class Walleye, trophy Smallmouth Bass, Northern Pike, Channel Catfish, and stocked Chinook Salmon.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ne-1',
    name: 'Lake McConaughy — Kingsley Dam & Martin Bay, NE',
    lat: 41.2200,
    lng: -101.6700,
    species: ['Walleye', 'Smallmouth Bass', 'Striped Bass', 'Northern Pike', 'Catfish', 'Crappie'],
    notes: 'Nebraska\'s largest reservoir (\'Lake Mac\'). Famous white sand beaches holding monster trophy Walleye, Wiper (Striped Bass hybrids), Smallmouth Bass, and Northern Pike.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ks-1',
    name: 'Milford Lake — Flagstop & Causeways, KS',
    lat: 39.1800,
    lng: -96.9500,
    species: ['Catfish', 'Walleye', 'Smallmouth Bass', 'Largemouth Bass', 'Crappie', 'Gar'],
    notes: 'Kansas\'s largest lake and official \'Fishing Capital of Kansas\'. World-record Blue Catfish producer (102lb record!), trophy Channel & Flathead Catfish, Alligator/Longnose Gar, Walleye, and Smallmouth Bass.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-ia-1',
    name: 'Clear Lake — Island Park & Reefs, IA',
    lat: 43.1350,
    lng: -93.3800,
    species: ['Walleye', 'Muskellunge', 'Channel Catfish', 'Crappie', 'Bluegill'],
    notes: 'Iowa\'s premier natural glacial lake fishery. Nationally renowned for high-density Walleye runs, trophy Muskellunge (Musky), heavy Yellow Bass blitzes, and slab Crappie.',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
  {
    id: 'spot-in-1',
    name: 'Lake Monroe — Cutright & Causeway, IN',
    lat: 39.0800,
    lng: -86.4200,
    species: ['Largemouth Bass', 'Crappie', 'Catfish', 'Walleye', 'Bluegill'],
    notes: 'Indiana\'s largest inland lake surrounded by Hoosier National Forest. Legendary slab Crappie factory, heavy Largemouth Bass in flooded timber, and trophy Hybrid Striped Bass (Wiper).',
    dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isUserAdded: false,
    accessDifficulty: 'easy',
  },
];

const CLOUD_SYNC_URL = 'https://jsonblob.com/api/jsonBlob/019f9057-6468-7451-bb50-8dfdcffc760a';

const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('fishing_map_sync')
  : null;

// Helper to harvest user-added spots across all current and legacy localStorage keys
export const getAllLocalUserSpots = (): FishingSpot[] => {
  if (typeof window === 'undefined') return [];
  const userSpotsMap = new Map<string, FishingSpot>();

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('fishing_spots') || key.startsWith('fish_mapper'))) {
        const val = localStorage.getItem(key);
        if (val) {
          try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) {
              parsed.forEach((s: FishingSpot) => {
                if (s && s.isUserAdded && s.id && s.name && typeof s.lat === 'number' && typeof s.lng === 'number') {
                  userSpotsMap.set(s.id, s);
                }
              });
            }
          } catch {
            // Ignore unparseable JSON
          }
        }
      }
    }
  } catch (err) {
    console.warn('Error harvesting local user spots:', err);
  }

  return Array.from(userSpotsMap.values());
};

export const getSpots = (): FishingSpot[] => {
  const localUserSpots = getAllLocalUserSpots();
  const stored = localStorage.getItem(STORAGE_KEY);

  // Merge system default spots with stored overrides
  const defaultSpots = DEFAULT_SPOTS.map((def) => {
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as FishingSpot[];
        const storedMatch = parsed.find((s) => s.id === def.id);
        if (storedMatch) {
          return {
            ...def,
            species: storedMatch.species && storedMatch.species.length > 0 ? storedMatch.species : def.species,
            notes: storedMatch.notes || def.notes,
            accessDifficulty: (storedMatch.accessDifficulty ?? def.accessDifficulty) as AccessDifficulty,
            pressureOverride: def.pressureOverride ?? storedMatch.pressureOverride,
          };
        }
      } catch {
        // Ignore
      }
    }
    return def;
  });

  // Deduplicate user spots harvested from local storage
  const spotMap = new Map<string, FishingSpot>();
  localUserSpots.forEach((s) => spotMap.set(s.id, s));

  const allSpots = [...defaultSpots, ...Array.from(spotMap.values())];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allSpots));
  return allSpots;
};

export const updateSpotSpecies = (spotId: string, updatedSpecies: string[]): FishingSpot[] => {
  const current = getSpots();
  const updated = current.map((s) => {
    if (s.id === spotId) {
      return { ...s, species: updatedSpecies };
    }
    return s;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  if (syncChannel) {
    syncChannel.postMessage('sync');
  }
  return updated;
};

// Async fetch community-pinned spots from global cloud storage
export const fetchCommunitySpots = async (): Promise<FishingSpot[]> => {
  try {
    const res = await fetch(CLOUD_SYNC_URL);
    if (!res.ok) return getSpots();

    const data = await res.json();
    const cloudSpots = (Array.isArray(data?.spots) ? data.spots : Array.isArray(data?.data?.spots) ? data.data.spots : []) as FishingSpot[];

    const localUserSpots = getAllLocalUserSpots();
    
    // Merge cloud spots with local user spots
    const mergedMap = new Map<string, FishingSpot>();
    localUserSpots.forEach((s) => mergedMap.set(s.id, s));
    if (Array.isArray(cloudSpots)) {
      cloudSpots.forEach((s) => {
        if (s.id && s.name && typeof s.lat === 'number' && typeof s.lng === 'number') {
          mergedMap.set(s.id, { ...s, isUserAdded: true });
        }
      });
    }

    const mergedUserSpots = Array.from(mergedMap.values());

    // Auto-upload any local user spots that are missing from cloud storage
    const missingInCloud = localUserSpots.filter((localSpot) => !cloudSpots.some((cs) => cs.id === localSpot.id));
    if (missingInCloud.length > 0) {
      fetch(CLOUD_SYNC_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: 'fishing_map_spots',
          spots: mergedUserSpots,
        }),
      }).catch((err) => console.warn('Background upload of missing local user spots failed:', err));
    }

    const defaultSpots = DEFAULT_SPOTS;
    const allSpots = [...defaultSpots, ...mergedUserSpots];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(allSpots));
    return allSpots;
  } catch (err) {
    console.warn('Unable to sync community spots from cloud:', err);
    return getSpots();
  }
};

// Push newly pinned water spot to global cloud store with atomic cloud merging
export const saveSpot = async (spot: FishingSpot): Promise<void> => {
  const localUserSpots = getAllLocalUserSpots();
  const exists = localUserSpots.some((s) => s.id === spot.id);
  const updatedUserSpots = exists
    ? localUserSpots.map((s) => (s.id === spot.id ? spot : s))
    : [...localUserSpots, { ...spot, isUserAdded: true }];

  const allSpots = [...DEFAULT_SPOTS, ...updatedUserSpots];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allSpots));

  if (syncChannel) {
    syncChannel.postMessage({ type: 'SPOT_ADDED', spot });
  }

  // Fetch current cloud spots first, then merge to prevent overwriting spots added by other users
  try {
    const res = await fetch(CLOUD_SYNC_URL);
    let cloudSpots: FishingSpot[] = [];
    if (res.ok) {
      const data = await res.json();
      cloudSpots = (Array.isArray(data?.spots) ? data.spots : Array.isArray(data?.data?.spots) ? data.data.spots : []) as FishingSpot[];
    }

    const mergedMap = new Map<string, FishingSpot>();
    if (Array.isArray(cloudSpots)) {
      cloudSpots.forEach((s) => {
        if (s.id) mergedMap.set(s.id, s);
      });
    }

    updatedUserSpots.forEach((s) => {
      mergedMap.set(s.id, { ...s, isUserAdded: true });
    });

    const mergedUserSpots = Array.from(mergedMap.values());

    await fetch(CLOUD_SYNC_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: 'fishing_map_spots',
        spots: mergedUserSpots,
      }),
    });
  } catch (err) {
    console.warn('Failed to push merged spot to cloud store:', err);
  }
};

export const saveAllSpots = async (spots: FishingSpot[]): Promise<void> => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(spots));
  const userSpots = spots.filter((s) => s.isUserAdded);

  try {
    const res = await fetch(CLOUD_SYNC_URL);
    let cloudSpots: FishingSpot[] = [];
    if (res.ok) {
      const data = await res.json();
      cloudSpots = (Array.isArray(data?.spots) ? data.spots : Array.isArray(data?.data?.spots) ? data.data.spots : []) as FishingSpot[];
    }

    const mergedMap = new Map<string, FishingSpot>();
    if (Array.isArray(cloudSpots)) {
      cloudSpots.forEach((s) => {
        if (s.id) mergedMap.set(s.id, s);
      });
    }
    userSpots.forEach((s) => {
      if (s.id) mergedMap.set(s.id, s);
    });

    const mergedUserSpots = Array.from(mergedMap.values());

    await fetch(CLOUD_SYNC_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: 'fishing_map_spots',
        spots: mergedUserSpots,
      }),
    });
  } catch (err) {
    console.warn('Failed to push spots to cloud store:', err);
  }
};

export const updateSpotDetails = async (
  spotId: string,
  updates: Partial<Pick<FishingSpot, 'name' | 'notes' | 'accessDifficulty' | 'species'>>
): Promise<FishingSpot[]> => {
  const current = getSpots();
  const updated = current.map((s) => {
    if (s.id === spotId) {
      return { ...s, ...updates };
    }
    return s;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  if (syncChannel) {
    syncChannel.postMessage('sync');
  }

  // Push update to cloud store
  try {
    const res = await fetch(CLOUD_SYNC_URL);
    let cloudSpots: FishingSpot[] = [];
    if (res.ok) {
      const data = await res.json();
      cloudSpots = (Array.isArray(data?.spots) ? data.spots : Array.isArray(data?.data?.spots) ? data.data.spots : []) as FishingSpot[];
    }

    const mergedMap = new Map<string, FishingSpot>();
    if (Array.isArray(cloudSpots)) {
      cloudSpots.forEach((s) => {
        if (s.id) mergedMap.set(s.id, s);
      });
    }

    const target = updated.find((s) => s.id === spotId);
    if (target) {
      mergedMap.set(spotId, { ...target, isUserAdded: true });
    }

    const mergedUserSpots = Array.from(mergedMap.values());

    await fetch(CLOUD_SYNC_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: 'fishing_map_spots',
        spots: mergedUserSpots,
      }),
    });
  } catch (err) {
    console.warn('Failed to push updated spot details to cloud store:', err);
  }

  return updated;
};

export const deleteSpot = async (spotId: string): Promise<FishingSpot[]> => {
  // Remove from all local storage keys
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('fishing_spots') || key.startsWith('fish_mapper'))) {
        const val = localStorage.getItem(key);
        if (val) {
          try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) {
              const filtered = parsed.filter((s: FishingSpot) => s.id !== spotId);
              localStorage.setItem(key, JSON.stringify(filtered));
            }
          } catch {
            // Ignore unparseable
          }
        }
      }
    }
  } catch (err) {
    console.warn('Error deleting spot from local storage:', err);
  }

  if (syncChannel) {
    syncChannel.postMessage('sync');
  }

  // Remove from cloud store
  try {
    const res = await fetch(CLOUD_SYNC_URL);
    let cloudSpots: FishingSpot[] = [];
    if (res.ok) {
      const data = await res.json();
      cloudSpots = (Array.isArray(data?.spots) ? data.spots : Array.isArray(data?.data?.spots) ? data.data.spots : []) as FishingSpot[];
    }

    const filteredCloud = cloudSpots.filter((s) => s.id !== spotId);

    await fetch(CLOUD_SYNC_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: 'fishing_map_spots',
        spots: filteredCloud,
      }),
    });
  } catch (err) {
    console.warn('Failed to delete spot from cloud store:', err);
  }

  return getSpots();
};
