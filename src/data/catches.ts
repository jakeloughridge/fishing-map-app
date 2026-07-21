export type CatchLog = {
  id: string;
  spotId: string;
  species: string;
  weight: number | null; // lbs
  length: number | null; // inches
  conditions: string;
  date: string; // ISO string
};

const STORAGE_KEY = 'fishing_catches';

export const getCatches = (): CatchLog[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? (JSON.parse(stored) as CatchLog[]) : [];
};

export const getCatchesForSpot = (spotId: string): CatchLog[] => {
  return getCatches().filter((c) => c.spotId === spotId);
};

export const logCatch = (entry: CatchLog): void => {
  const catches = getCatches();
  catches.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(catches));
};
