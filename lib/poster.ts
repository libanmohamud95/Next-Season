const GRADIENTS = [
  "from-violet-600 to-indigo-800",
  "from-fuchsia-600 to-purple-900",
  "from-sky-500 to-blue-800",
  "from-emerald-500 to-teal-800",
  "from-rose-500 to-red-800",
  "from-amber-500 to-orange-800",
  "from-cyan-500 to-sky-800",
  "from-pink-500 to-rose-800",
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
