const GRADIENTS = [
  "linear-gradient(155deg, #8b5cf6 0%, #6d28d9 45%, #1e1b4b 100%)",
  "linear-gradient(155deg, #e879f9 0%, #a21caf 45%, #2e1065 100%)",
  "linear-gradient(155deg, #38bdf8 0%, #1d4ed8 45%, #0f172a 100%)",
  "linear-gradient(155deg, #34d399 0%, #0f766e 45%, #0f2027 100%)",
  "linear-gradient(155deg, #fb7185 0%, #be123c 45%, #2c0a12 100%)",
  "linear-gradient(155deg, #fbbf24 0%, #c2410c 45%, #2a1205 100%)",
  "linear-gradient(155deg, #22d3ee 0%, #0369a1 45%, #0c1a2e 100%)",
  "linear-gradient(155deg, #f472b6 0%, #9d174d 45%, #2a0a1a 100%)",
];

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function gradientFor(seed: string): string {
  return GRADIENTS[hashSeed(seed) % GRADIENTS.length];
}

export function initialsFor(title: string): string {
  return title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
