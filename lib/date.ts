export function countdownFor(iso: string): string {
  const target = new Date(`${iso}T00:00:00`);
  const now = new Date();
  const days = Math.ceil((target.getTime() - now.getTime()) / 86_400_000);

  if (days <= 0) return "Available now";
  if (days === 1) return "Tomorrow";
  if (days < 30) return `In ${days} days`;

  const months = Math.round(days / 30);
  if (months < 12) return `In ${months} month${months > 1 ? "s" : ""}`;

  const years = Math.round(days / 365);
  return `In ${years} year${years > 1 ? "s" : ""}`;
}
