export type FishSpecies = {
  name: string;
  color: string; // hex color for marker
  description: string;
  bestRigs: { name: string; setup: string; tip: string }[];
  season: string;
  habitat: string;
};

export const SPECIES_DATA: FishSpecies[] = [
  {
    name: "Largemouth Bass",
    color: "#16a34a", // Earthy green
    description: "Aggressive ambush predator found in warm, weedy waters. Targets structure edges.",
    season: "Spring–Summer peak",
    habitat: "Coves, docks, fallen timber, lily pads",
    bestRigs: [
      { name: "Texas Rig", setup: '3/8oz bullet sinker, 4/0 EWG hook, 7" Senko worm', tip: "Dead-stick on the bottom, twitch every 5 seconds" },
      { name: "Spinnerbait", setup: "1/2oz white/chartreuse Colorado blade", tip: "Slow-roll over submerged weeds at dawn" },
      { name: "Topwater Frog", setup: "Hollow-body frog, braided 50lb line", tip: "Work over lily pad mats — wait 2 sec before setting hook" }
    ]
  },
  {
    name: "Rainbow Trout",
    color: "#0ea5e9", // Slate blue
    description: "Fast-water fish preferring cold, oxygenated streams and tailwaters. Sight feeders.",
    season: "Year-round, best spring/fall",
    habitat: "Cold rivers, tailwaters, high-elevation lakes",
    bestRigs: [
      { name: "Drop Shot", setup: "#6 finesse hook, 1/4oz cylindrical weight, PowerBait dough", tip: "Keep bait just off bottom — match local hatch color" },
      { name: "Inline Spinner", setup: "Mepps #2 or #3 Aglia, silver blade", tip: "Cast upstream and retrieve with current" },
      { name: "Fly Rig", setup: "9ft 5X leader, Adams dry fly or Hare's Ear nymph", tip: "Mend line upstream, dead drift through feeding lanes" }
    ]
  },
  {
    name: "Walleye",
    color: "#d97706", // Amber
    description: "Low-light tacticians. Most active at dusk and dawn near rocky points and ledges.",
    season: "Spring + Fall peak",
    habitat: "Rocky points, main lake ledges, river channels",
    bestRigs: [
      { name: "Lindy Rig", setup: "#6 octopus hook, 3/8oz Lindy sinker, crawler harness", tip: "Slow drag along bottom — feel for subtle taps" },
      { name: "Jigging Rap", setup: "Rapala Jigging Rap VMC #6, silver/blue", tip: "Vertical jig in 15-30ft at dusk over hard bottom" },
      { name: "Night Crawler Harness", setup: "Size 4 treble, #3 Colorado blade, full crawler", tip: "Troll at 1.2 mph along 18ft contour line" }
    ]
  },
  {
    name: "Striped Bass",
    color: "#7c3aed", // Deep purple
    description: "Powerful schooling fish chasing baitfish. Watch for surface busts and diving birds.",
    season: "Spring migration + Fall blitz",
    habitat: "Surf beaches, river mouths, jetties, open water",
    bestRigs: [
      { name: "Popping Cork", setup: '1oz popping cork, 24" leader, 1/4oz jig head + paddletail', tip: "Pop 3x then pause — mimics injured baitfish" },
      { name: "Surf Bucktail", setup: "2oz white bucktail, pork rind trailer", tip: "Cast into current seams; let it sweep naturally" },
      { name: "Live Liner Rig", setup: "1oz egg sinker, 4/0 circle hook, live bunker", tip: "Free-line the bait — let fish run before engaging drag" }
    ]
  },
  {
    name: "Smallmouth Bass",
    color: "#b45309", // Warm amber-brown
    description: "Hard-fighting river species that loves current and rocky structure. Aerial acrobat when hooked.",
    season: "Late Spring–Fall peak",
    habitat: "Rocky rivers, gravel bars, clear lakes with boulders",
    bestRigs: [
      { name: "Drop Shot", setup: "#1 finesse hook, 3/16oz weight, 4\" Roboworm or Ned Ooze tube", tip: "Hover just above bottom in current seams — let bait quiver" },
      { name: "Tube Jig", setup: "3/16oz internal lead head, 4\" smoke/green pumpkin tube", tip: "Drag and hop along rocky bottom; pause after each hop" },
      { name: "Inline Spinner", setup: "Mepps Aglia #3, silver/yellow blade", tip: "Cast across current, swing downstream — deadly in runs" }
    ]
  },
  {
    name: "Brook Trout",
    color: "#059669", // Teal-green
    description: "Native coldwater jewel. Gorgeous orange-spotted flanks. Thrives in small, pristine mountain streams.",
    season: "Spring + Fall peak",
    habitat: "High-elevation streams, cold spring-fed pools, beaver ponds",
    bestRigs: [
      { name: "Micro Spinner", setup: "Panther Martin 1/16oz, gold blade", tip: "Tiny gear for tiny water — #8 treble, 4lb tippet" },
      { name: "Fly Rig", setup: "4wt rod, 9ft 6X leader, Royal Wulff or elk hair caddis", tip: "Stealth is everything — stay low, cast upstream, short drifts" },
      { name: "Live Worm", setup: "#8 baitholder hook, split shot 8\" above, small redworm", tip: "Let it drift naturally under a micro float in slow pools" }
    ]
  },
  {
    name: "Brown Trout",
    color: "#ca8a04", // Golden yellow
    description: "Wary and selective. The smartest trout in the stream — rewards patience and precision presentation.",
    season: "Spring + Fall (spawning run October)",
    habitat: "Tailwaters, spring creeks, deep pool edges, undercut banks",
    bestRigs: [
      { name: "Dry-Dropper", setup: "Parachute Adams #14 + 18\" dropper, Pheasant Tail nymph #18", tip: "Match the hatch exactly — switch fly color until takes begin" },
      { name: "Streamer", setup: "Articulated Sculpzilla or Galloup's Dungeon, 10lb fluorocarbon", tip: "Swing across current after dark — big browns hunt at night" },
      { name: "Nightcrawler Float Rig", setup: "Small bobber, #6 hook, split shot, half crawler", tip: "Drift into undercut banks and log jams — go slow" }
    ]
  },
  {
    name: "Spanish Mackerel",
    color: "#0891b2", // Cyan-blue
    description: "Fast, schooling pelagic fish that slashes through baitfish. One of the best eating fish in the sea when kept fresh on ice.",
    season: "Spring migration + Summer",
    habitat: "Near-shore waters, inlets, piers, beach breaks over structure",
    bestRigs: [
      { name: "Gotcha Plug", setup: "1oz Gotcha lure, 20lb fluorocarbon leader, size 1 treble", tip: "Cast to breaking fish, retrieve fast — if they ignore it, go faster" },
      { name: "Spoon Troll", setup: "Clark spoon #1, 4ft wire leader, 1oz inline sinker", tip: "Troll at 6–8 knots along baitfish schools — wire leader is mandatory (sharp teeth)" },
      { name: "Sabiki + Jig", setup: "Sabiki rig for live menhaden, then pitch 1/4oz jig under the school", tip: "Keep livewell bait small — 2–3\" baits trigger more strikes" }
    ]
  },
  {
    name: "Red Drum",
    color: "#dc2626", // Bold red
    description: "Copper-bronze bruiser with a signature black tail spot. Runs hard and fights dirty. Iconic inshore target from the Chesapeake to Texas.",
    season: "Fall peak (September–November)",
    habitat: "Grass flats, oyster bars, surf troughs, tidal creeks",
    bestRigs: [
      { name: "Carolina Rig", setup: "1oz egg sinker, 18\" 30lb fluorocarbon leader, 4/0 circle hook, cut mullet", tip: "Let fish run before engaging drag — circle hooks set themselves" },
      { name: "Gold Spoon", setup: "1/2oz Johnson Silver Minnow weedless, gold finish", tip: "Slow roll over grass flats at low tide — pause near potholes" },
      { name: "Popping Cork Rig", setup: "Popping cork, 18\" leader, 1/4oz jig head + shrimp imitation", tip: "Pop aggressively then let it sit — drum key in on the surface commotion" }
    ]
  },
  {
    name: "Mahi Mahi",
    color: "#65a30d", // Bright lime-green
    description: "Blazing colors, acrobatic fights, and incredible table fare. Offshore pelagic that loves floating debris, weed lines, and temperature breaks.",
    season: "Late Spring–Summer (offshore)",
    habitat: "Offshore weed lines, floating debris, temperature breaks 72–82°F",
    bestRigs: [
      { name: "Weedline Pitch", setup: "4/0 hook, 40lb fluorocarbon, live ballyhoo or pilchard free-lined", tip: "Pitch upgurrent of the weed line, let it drift naturally under floating grass" },
      { name: "Mahi Spreader Bar", setup: "6-arm spreader bar with squid chain teaser, naked ballyhoo on #6/0 hook", tip: "Troll at 7–9 knots — once hooked, keep others in water with spinning gear" },
      { name: "Dolphin Duster", setup: "Chartreuse/pink skirt over #5/0 hook, 60lb mono leader", tip: "When fish are finicky, downsize — 3\" skirts outfish big lures in clear water" }
    ]
  },
  {
    name: "Snakehead",
    color: "#4d7c0f", // Olive green
    description: "Invasive apex predator with an explosive topwater bite. Breathes air — can survive in stagnant, low-oxygen water where other fish can't. Aggressive territorial defender, especially near nests.",
    season: "Summer peak (June–September)",
    habitat: "Shallow grass mats, lily pads, tidal creeks, marshy coves",
    bestRigs: [
      { name: "Hollow Frog", setup: "Hollow-body frog (Booyah Pad Crasher or SPRO), 50–65lb braid, heavy rod", tip: "Walk it over the mats and pause — wait for the fish to fully engulf before setting hard" },
      { name: "Swim Jig", setup: "3/8oz weedless swim jig, white/chartreuse, 4\" paddle tail swimbait trailer", tip: "Slow-roll just under grass edges where mats thin out — snakehead ambush the transition" },
      { name: "Whopper Plopper", setup: "River2Sea Whopper Plopper 90, natural shad color, 30lb braid", tip: "Open pockets and leads to the mats — steady retrieve, no pauses; they'll track and crush" }
    ]
  },
  {
    name: "Catfish",
    color: "#92400e", // Brown/Earthy
    description: "Bottom-dwelling scavengers with exceptional smell. Thrive in murky, warm water.",
    season: "Summer peak",
    habitat: "Deep holes, muddy banks, below dams",
    bestRigs: [
      { name: "Santee Rig", setup: '2oz inline sinker, 6" leader, 5/0 kahle hook, foam peg', tip: 'Float bait 4" off bottom in current seam' },
      { name: "Slip Sinker", setup: "2oz no-roll sinker, 3/0 Octopus hook, cut shad", tip: "Fresh-cut bait over clean sand bottom, open bail" },
      { name: "Punch Bait Rig", setup: "#6 treble with spring wire, commercial punch bait", tip: "Dip bait, punch spring into bait, deploy in current" }
    ]
  }
];
