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
  },
  {
    name: "Cobia",
    color: "#eab308", // Amber gold
    description: "Powerful summer pelagic predator. Cruises near the surface around shoals, buoys, and bridge pilings.",
    season: "Summer peak (June–September)",
    habitat: "Chesapeake Bay mouth, CBBT pilings, shoe shoals, tide rips",
    bestRigs: [
      { name: "Sight-Casting Bucktail", setup: "1.5oz white/chartreuse bucktail jig, 6\" plastic grub trailer, 50lb fluorocarbon leader", tip: "Pitch ahead of cruising fish on surface; retrieve fast with rhythmic rod pops" },
      { name: "Live Eel Drift Rig", setup: "5/0 circle hook, 50lb fluorocarbon leader, 2oz sinker, live eel", tip: "Drift live eel through tide rips near CBBT pilings — let circle hook set naturally" },
      { name: "Chumming & Cut Bait Rig", setup: "3oz pyramid sinker, 7/0 circle hook, fresh menhaden/bunker chunk", tip: "Set up a menhaden chum line on shoals during slack-to-ebbing tide" }
    ]
  },
  {
    name: "Summer Flounder",
    color: "#14b8a6", // Teal
    description: "Flatfish ambush predator with sharp teeth. Hides camouflaged along channel edges, drop-offs, and structure.",
    season: "Late Spring through Fall (May–October)",
    habitat: "Channel edges, CBBT pilings, Lynnhaven Inlet, deep oyster beds",
    bestRigs: [
      { name: "Bucktail & Gulp! Teaser", setup: "1oz white bucktail + 4\" Gulp! Swimming Mullet, 30lb fluorocarbon leader", tip: "Bounce constantly along bottom with slow drift — keep bait in strike zone" },
      { name: "Fluke Drift Rig", setup: "3-way swivel, 2oz bank sinker, #1/0 wide gap hook, live minnow or squid strip", tip: "Drift along 18–35ft channel drop-offs — drop rod tip on bite before setting" },
      { name: "Carolina Rig", setup: "3/4oz egg sinker, 18\" leader, #1/0 hook, live spot or mummichog", tip: "Drag slowly over sandy humps and oyster bar edges" }
    ]
  },
  {
    name: "Cutthroat Trout",
    color: "#e11d48", // Crimson / Rose slash mark
    description: "Iconic Western trout species named for the vivid red slash under its lower jaw. Highly prized sight-feeders native to cold mountain streams and terminal desert lakes.",
    season: "Spring & Fall peak (Pyramid Lake trophy season Oct–May)",
    habitat: "High-elevation lakes, tailwaters, alpine streams, terminal desert lakes",
    bestRigs: [
      { name: "Balanced Leech Indicator Rig", setup: "7wt rod, 15ft leader, 1/8oz balanced leech or chironomid under indicator", tip: "Cast from stepladders into drop-offs — suspend bait 1–2ft off bottom and let wave action work the fly" },
      { name: "Casting Spoon", setup: "1/2oz Acme Kastmaster (gold/red) or Thomas Buoyant, 8lb fluorocarbon", tip: "Long casts into wind-driven shorelines; retrieve with erratic jerks" },
      { name: "Dry-Dropper Fly Rig", setup: "9ft 5X leader, Parachute Adams #14 + 18\" dropper, Pheasant Tail #16", tip: "Sight-fish along thermal drop-offs and tributary mouths at first light" }
    ]
  },
  {
    name: "Bluefish",
    color: "#2563eb", // Deep cobalt blue
    description: "Razor-toothed aggressive predator known for yellow eyes and relentless surface feeding frenzies (bluefish blitzes). Fights hard and shreds soft plastics.",
    season: "Spring migration through Fall (May–November)",
    habitat: "Inlets, surf beaches, tide rips, coastal jetties, open ocean",
    bestRigs: [
      { name: "Metal Spoon & Wire Leader", setup: "1oz Hopkins No-Eql or Kastmaster, 30lb wire leader, size 1 treble", tip: "Cast directly into breaking fish on surface; retrieve fast — wire leader prevents bite-offs" },
      { name: "Topwater Popper", setup: "Super Spook or 1oz Pencil Popper, heavy leader, single rear hook", tip: "Aggressive walk-the-dog action on surface — bluefish track the splash and smash" },
      { name: "Cut Bait Rig", setup: "2oz pyramid sinker, 6/0 circle hook on 40lb wire leader, fresh cut mullet or bunker chunk", tip: "Cast into inlet current seams and surf troughs — circle hooks set cleanly in jaw" }
    ]
  },
  {
    name: "Speckled Trout",
    color: "#059669", // Emerald / Silver Teal
    description: "Prized inshore gamefish with silvery flanks and distinctive black spots. Known for delicate mouths, aggressive strikes, and schooling in shallow sound waters and tidal creeks.",
    season: "Fall peak (September–December), Spring run (April–May)",
    habitat: "Saline sounds, eelgrass beds, tidal creek mouths, oyster bars, salt marsh drains",
    bestRigs: [
      { name: "Popping Cork & Jig", setup: "1/2oz popping cork, 18\" 20lb fluorocarbon, 1/8oz jig head + 3\" Gulp! Shrimp (electric chicken)", tip: "Pop briskly to create chug noise, then pause 3 seconds — specks attack on the drop" },
      { name: "Soft Plastic Paddletail", setup: "1/4oz Trout Eye jig head, 3\" Z-Man MinnowZ in chartreuse/opening night", tip: "Cast over submerged grass beds; use a double-pop, slow-fall retrieve" },
      { name: "MirrOlure Twitchbait", setup: "MirrOlure 52MR or 17MR, 15lb fluorocarbon leader", tip: "Twitch-twitch-pause over 3–6ft grassy points — most strikes happen during the dead pause" }
    ]
  },
  {
    name: "Black Drum",
    color: "#4b5563", // Dark Slate / Charcoal
    description: "Heavyweight bottom predator with chin barbels and crushing jaw teeth. Famous for producing loud drumming sounds during spring spawning runs.",
    season: "Spring spawning run (April–June), Fall (September–November)",
    habitat: "Deep holes, oyster reefs, bridge pilings, surf sloughs, tidal inlets",
    bestRigs: [
      { name: "Fish-Finder Rig & Clam Bait", setup: "2–3oz pyramid sinker, 6/0 circle hook, 40lb fluorocarbon leader, fresh sea clam or blue crab half", tip: "Anchor near channel drop-offs or shoals; let clam scent drift into deep holes" },
      { name: "Crab Knocker Rig", setup: "2oz inline sinker, 5/0 circle hook, cracked fiddler or peeler crab", tip: "Drop tight against bridge pilings or jetty rocks — feel for heavy thumps on bottom" },
      { name: "Heavy Carolina Rig", setup: "2oz egg sinker, 18\" 40lb leader, 6/0 circle hook, fresh jumbo shrimp or cut mullet", tip: "Cast into surf troughs or inlet current seams; leave bail open until fish takes" }
    ]
  },
  {
    name: "Bluegill",
    color: "#3b82f6", // Royal Blue
    description: "Panfish classic with an iconic black ear flap and vibrant belly. Aggressive nest defenders and hard fighters for their size on light tackle.",
    season: "Late Spring peak (spawning beds May–June), year-round",
    habitat: "Shallow weed beds, lily pads, docks, submerged brush, quiet coves",
    bestRigs: [
      { name: "Micro Float & Live Worm", setup: "Tiny clip-on bobber, #8 baitholder hook, 4lb mono, piece of live nightcrawler or cricket", tip: "Set depth 2–3ft over weed edges — gentle twitches trigger fast bites" },
      { name: "Micro Jig / Trout Magnet", setup: "1/64oz jig head, 1\" split-tail grub (chartreuse or pink) under micro float", tip: "Slow bob-and-weave retrieve past dock pilings and bluegill beds" },
      { name: "Panfish Popper", setup: "Size 10 yellow/black foam fly, 3wt fly rod or micro float", tip: "Cast near lily pads at dusk; let water settle before giving a tiny twitch" }
    ]
  },
  {
    name: "Crappie",
    color: "#8b5cf6", // Purple / Speckled Lavender
    description: "Schooling panfish with papermouths. Famous for stacking up tight in submerged timber, brush piles, and dock shadows. Exceptional table fare.",
    season: "Spring peak (pre-spawn & spawn March–May), Fall brush pile bite",
    habitat: "Standing timber, brush piles, bridge pilings, deep channel drop-offs",
    bestRigs: [
      { name: "Marabou Jig & Slip Bobber", setup: "1/32oz white/pink marabou jig, slip bobber set 4–8ft deep over brush", tip: "Hold directly over brush piles — give slight vertical twitches without moving away" },
      { name: "Live Minnow Slip Rig", setup: "Size 4 light wire hook, 1/4oz split shot, live fathead minnow 1ft above timber", tip: "Hook minnow through lips; suspend right at the top edge of submerged tree branches" },
      { name: "Curly Tail Spinner", setup: "1/16oz jig head + 2\" white/chartreuse curly tail swimbait", tip: "Slow-roll steadily past dock pilings and shade lines" }
    ]
  },
  {
    name: "Northern Pike",
    color: "#15803d", // Forest Green
    description: "Aggressive apex predator with duckbill jaws and razor-sharp teeth. Known for explosive ambush strikes along cabbage beds and weed lines.",
    season: "Late Spring through Fall (May–November), prime ice fishing in winter",
    habitat: "Submerged cabbage beds, weed edges, shallow bays, rocky drop-offs",
    bestRigs: [
      { name: "Wire Leader & Inline Spinner", setup: "#5 Mepps Aglia or Blue Fox Vibrax, 30lb steel wire leader, 30lb braid", tip: "Burn spinner along cabbage edges — wire leader is mandatory against sharp teeth" },
      { name: "Classic Red/White Spoon", setup: "1oz Eppinger Daredevle red/white spoon, 12\" wire leader, 20lb mono", tip: "Cast past weed pockets; wobble retrieve with periodic pauses to simulate wounded baitfish" },
      { name: "Jerkbait / Minnow Plug", setup: "Rapala Husky Jerk 14 (firetiger color), heavy wire leader", tip: "Rhythmic twitch-twitch-pause over 6–12ft weed tops; pike crush it during the pause" }
    ]
  },
  {
    name: "Muskellunge",
    color: "#b91c1c", // Deep Crimson / Amber Tiger
    description: "The 'Fish of 10,000 Casts'. Massive freshwater apex predator capable of exceeding 50 inches. Infamous for following lures right to the boat.",
    season: "Fall trophy peak (September–November), Summer topwater",
    habitat: "Rocky points, weed humps, island drop-offs, timber leads",
    bestRigs: [
      { name: "Figure-8 Topwater Popper", setup: "10\" Buchertail or Suick Thriller, 80lb braid, 100lb fluorocarbon leader", tip: "Always execute a wide figure-8 pattern with rod tip in water at boat side — follower muskies hit on the turn" },
      { name: "Bulldawg Rubber Swimbait", setup: "Musky Innovations Pounder Bulldawg, heavy baitcasting rod", tip: "Rip-and-fall retrieve through deep weed channels and rock ledges" },
      { name: "Double #10 Cowgirl Spinner", setup: "Musky Mayhem Double Cowgirl (black/nickel), high-speed reel", tip: "Burn fast over cabbage humps to trigger reactionary strikes from trophy fish" }
    ]
  },
  {
    name: "King Salmon",
    color: "#b91c1c", // Deep Crimson / Dark Salmon Red
    description: "The largest of the Pacific salmon species (Chinook). Famed for powerful runs, dark gums, spotted tails, and massive weights exceeding 50+ lbs.",
    season: "Summer peak (June–August), Fall river spawning run",
    habitat: "Coastal ocean, deep river channels, tidal estuaries, glacial rivers",
    bestRigs: [
      { name: "Trolling Flasher & Cut-Plug Herring", setup: "11\" chrome flasher, 6ft 40lb leader, tandem 4/0 circle hooks + brined cut-plug herring", tip: "Troll 1.8–2.2 mph near bait schools; keep herring spinning tight in a roll" },
      { name: "Backbouncing Cured Roe", setup: "Heavy drift rod, 2–4oz lead weight, egg loop knot + cured salmon roe cluster", tip: "Bounce weight along river bottom in deep channel holes where Kings rest" },
      { name: "Heavy Twitching Jig", setup: "1/2oz to 1oz marabou/rabbit fur twitching jig (black/cerise)", tip: "Cast into deep river pools; twitch rod tip rhythmically on a controlled slack line" }
    ]
  },
  {
    name: "Coho Salmon",
    color: "#0284c7", // Bright Ocean Silver / Sky Blue
    description: "Acrobatic powerhouses ('Silver Salmon') known for high-flying jumps and aggressive strikes. Brilliant silver in the ocean, turning dark red in freshwater.",
    season: "Late Summer through Autumn (August–November)",
    habitat: "Coastal ocean, tidal estuaries, coastal streams, gravel tailwaters",
    bestRigs: [
      { name: "Inline Spinner (Blue Fox Vibrax)", setup: "#4 or #5 Vibrax in hot pink/silver or chartreuse, 15lb fluorocarbon leader", tip: "Cast near logjams and undercut banks; retrieve just fast enough to thrum the blade" },
      { name: "Twitching Jig", setup: "1/2oz cerise/purple twitching jig, 20lb braid to 15lb leader", tip: "Cast into slack water pools behind logs; twitch rhythmically as it drops" },
      { name: "Topwater Wog / Popper", setup: "Pink foam Wog fly or 1/2oz topwater popper", tip: "Skitter across calm estuary surfaces; Coho smash topwaters with explosive boils" }
    ]
  },
  {
    name: "Pink Salmon",
    color: "#db2777", // Hot Pink / Magenta
    description: "The most abundant Pacific salmon ('Humpback Salmon'). Males develop a dramatic hump back during spawning. Aggressive biters on bright pink lures.",
    season: "Summer peak (July–September)",
    habitat: "Coastal river mouths, intertidal reaches, nearshore marine waters",
    bestRigs: [
      { name: "Pink Humpy Jig & Float", setup: "1/8oz pink marabou jig or pink squid lure under a float, 10lb mono", tip: "Set float depth so jig suspends in the mid-water column of slow tidal current" },
      { name: "Pink Inline Spinner", setup: "#3 Mepps Aglia or Blue Fox in solid hot pink, 12lb line", tip: "Constant steady retrieve through schooling salmon near river mouths" },
      { name: "Pink Spoon", setup: "1/2oz pink/nickel Gibbs spoon or Buzz Bomb", tip: "Long casts into estuary current seams; flutter spoon on the fall" }
    ]
  },
  {
    name: "Sockeye Salmon",
    color: "#dc2626", // Vivid Crimson Red
    description: "Renowned for brilliant crimson bodies and emerald heads during spawning ('Red Salmon'), plus rich oil-dense meat. Stacks up in massive river migrations.",
    season: "Summer peak (June–August)",
    habitat: "Glacial rivers, connected nursery lakes, gravel shoals",
    bestRigs: [
      { name: "Sockeye Fly & Floss Rig", setup: "Unweighted red/pink yarn fly, 3/8oz pencil lead, 6ft 15lb leader", tip: "Cast upstream at a 45° angle; sweep rod low to drift line across bottom seam" },
      { name: "Dodger & Hootchie Trolling Rig", setup: "Small 00 silver dodger, 16\" leader, mini pink/orange hootchie skirt", tip: "Troll slow (1.2–1.5 mph) through lake staging areas before river entry" },
      { name: "Coho / Sockeye Drift Spoon", setup: "1/4oz Gibbs Coho spoon in pink/nickel, 12lb fluorocarbon", tip: "Slow bottom drift through mainstem river currents" }
    ]
  },
  {
    name: "Chum Salmon",
    color: "#78350f", // Calico Tiger Stripe / Olive
    description: "Hardest-fighting Pacific salmon for its size ('Dog Salmon'). Spawning males develop hooked jaws (kype) and large canine teeth. Unmatched stamina.",
    season: "Autumn through early Winter (September–December)",
    habitat: "Lower river mainstems, tidal sloughs, spawning riffles",
    bestRigs: [
      { name: "Cerise/Purple Twitching Jig", setup: "1/2oz twitching jig in black/purple or cerise, heavy 20lb leader", tip: "Drop into deep river runs; aggressive twitches trigger heavy violent strikes" },
      { name: "Cured Roe & Float Rig", setup: "1/2oz slip float, 1/4oz weight, egg loop knot + chartreuse/pink cured roe cluster", tip: "Drift float along foam lines and deep gravel drop-offs" },
      { name: "Weighted Chartreuse Fly", setup: "Heavy 8wt fly rod, weighted Dog Salmon Fly in chartreuse/purple", tip: "Swing fly through lower river runs; hold tight on the hookset" }
    ]
  },
  {
    name: "Atlantic Salmon",
    color: "#0d9488", // Teal / Silver-Steel
    description: "The 'King of Fish'. Anadromous salmon native to the North Atlantic. Famed for extraordinary leaping ability, silver armor in salt, and taking classic salmon flies on the swing.",
    season: "Late Spring through Autumn (May–October spawning run)",
    habitat: "Cold North Atlantic rivers, gravel spawning pools, coastal bays, glacial tailwaters",
    bestRigs: [
      { name: "Classic Hairwing Salmon Fly", setup: "Size 4–8 Jock Scott, Black Bear Green Butt, or Undertaker, 12ft 12lb leader, 8wt Spey rod", tip: "Cast 45° downstream and let the fly swing through deep tailouts on a tight line" },
      { name: "Bomber Dry Fly", setup: "Size 4–6 Brown/Green Bomber foam dry fly, 12ft 10lb fluorocarbon leader", tip: "Dead-drift across glassy river pools; Atlantic Salmon rise slowly from deep holes to sip it" },
      { name: "Inline Casting Spinner / Spoon", setup: "3/8oz Blue Fox Vibrax silver/blue or 1/2oz silver Kastmaster spoon", tip: "Fan cast across mainstem pools where gear fishing is permitted; steady, slow retrieve" }
    ]
  },
  {
    name: "Yellow Perch",
    color: "#eab308", // Golden Yellow
    description: "Popular schooling panfish with bright yellow flanks and dark vertical tiger stripes. Highly sought after across the Great Lakes for incredible table fare.",
    season: "Fall peak (September–November), Spring pre-spawn, Winter ice fishing",
    habitat: "Sand/gravel flats, weed bed edges, 15–35ft open water lake basins",
    bestRigs: [
      { name: "Two-Hook Perch Rig & Live Minnows", setup: "2-hook spreader or high-low rig, 1/2–1oz sinker, emerald shiners or minnow pieces", tip: "Anchor over 25–35ft sand flats; hold rig 6 inches off bottom with subtle twitches" },
      { name: "Tungsten Jig & Waxworm", setup: "1/16oz gold/orange tungsten jig tipped with waxworm or minnow head", tip: "Vertical jigging directly on the mud line; tap bottom to kick up silt clouds" },
      { name: "Sonar Blade Bait", setup: "1/4oz silver/gold Sonar or Cicada blade bait, 8lb fluorocarbon", tip: "Short 1ft bottom pops; strikes happen on the vibration pull and fall" }
    ]
  },
  {
    name: "White Perch",
    color: "#94a3b8", // Silver Slate / Pewter
    description: "Prolific semi-anadromous temperate bass with bright silver sides and dark slate backs. School aggressively in brackish estuaries and freshwater lakes.",
    season: "Late Spring through Autumn (May–October)",
    habitat: "Brackish rivers, shallow bays, sandy lake bottoms, tidal creek mouths",
    bestRigs: [
      { name: "High-Low Bait Rig", setup: "#4 hooks, 1/2oz sinker, live grass shrimp, bloodworms, or nightcrawler pieces", tip: "Cast into tidal creek cuts or lake drop-offs; fast double-header bites when a school passes" },
      { name: "Small Inline Spinner", setup: "1/8oz Roostertail or Panther Martin in silver/white, 6lb line", tip: "Steady retrieve through schooling fish near bridge pilings and dock shadows" },
      { name: "Micro Tube Jig", setup: "1/16oz jig head + 1.5\" white/chartreuse tube plastic", tip: "Vertical jigging along channel edges and breaklines" }
    ]
  }
];
