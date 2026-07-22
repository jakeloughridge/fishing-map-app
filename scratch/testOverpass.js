async function findWaterName(lat, lng) {
  const query = `[out:json][timeout:5];(
    relation["natural"="water"](around:3000, ${lat}, ${lng});
    way["natural"="water"](around:3000, ${lat}, ${lng});
    relation["waterway"](around:3000, ${lat}, ${lng});
    way["waterway"](around:3000, ${lat}, ${lng});
  );out tags;`;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'FishMapperApp/1.0',
    },
  });

  const data = await res.json();
  const names = data.elements
    .map((e) => e.tags && e.tags.name)
    .filter(Boolean);

  // Prioritize names containing "Lake", "River", "Bay", "Sound", "Reservoir", "Creek"
  const waterKeywords = ['lake', 'river', 'bay', 'sound', 'reservoir', 'creek', 'harbor', 'pond', 'slough', 'inlet', 'channel', 'swamp'];
  
  const bestMatch = names.find((name) =>
    waterKeywords.some((kw) => name.toLowerCase().includes(kw))
  );

  return bestMatch || names[0] || '';
}

async function run() {
  console.log('38.03, -77.75 (Lake Anna):', await findWaterName(38.03, -77.75));
  console.log('34.36, -86.29 (Guntersville):', await findWaterName(34.36, -86.29));
  console.log('39.09, -122.78 (Clear Lake):', await findWaterName(39.09, -122.78));
  console.log('60.48, -151.07 (Kenai River):', await findWaterName(60.48, -151.07));
}

run();
