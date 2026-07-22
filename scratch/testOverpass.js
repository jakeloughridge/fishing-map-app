async function run() {
  const query = `[out:json][timeout:8];(
    relation["natural"="water"](around:8000, 39.34, -76.07);
    way["natural"="water"](around:8000, 39.34, -76.07);
    relation["waterway"](around:8000, 39.34, -76.07);
    way["waterway"](around:8000, 39.34, -76.07);
  );out tags;`;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'FishMapperApp/1.0',
    },
  });

  const data = await res.json();
  const names = [...new Set(data.elements.map((e) => e.tags && e.tags.name).filter(Boolean))];

  const MAJOR_KEYWORDS = ['bay', 'lake', 'sound', 'gulf', 'sea', 'ocean', 'reservoir', 'river', 'harbor'];
  const MINOR_KEYWORDS = ['creek', 'branch', 'stream', 'cove', 'channel', 'slough', 'pond', 'swamp'];

  const majorMatch = names.find((name) =>
    MAJOR_KEYWORDS.some((kw) => name.toLowerCase().includes(kw))
  );

  const minorMatch = names.find((name) =>
    MINOR_KEYWORDS.some((kw) => name.toLowerCase().includes(kw))
  );

  console.log('Detected Major Water Body:', majorMatch || minorMatch || names[0] || 'Unknown');
}

run();
