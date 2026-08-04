export type ShowStatus = "renewed" | "airing" | "hiatus" | "rumored" | "ended";

export type Platform = string;

export type Show = {
  id: string;
  title: string;
  posterSeed: string;
  platform: Platform;
  status: ShowStatus;
  currentSeason: number;
  nextSeasonDate?: string;
  statusNote: string;
  genres: string[];
  rating: number;
  posterImage?: string;
  lastChecked: string;
};

export const CATALOG: Show[] = [
  {
    id: "stranger-things",
    title: "Stranger Things",
    posterSeed: "stranger-things-01",
    platform: "Netflix",
    status: "renewed",
    currentSeason: 4,
    nextSeasonDate: "2026-11-26",
    statusNote: "Season 5 confirmed, final season",
    genres: ["Sci-Fi", "Horror"],
    rating: 8.6,
    posterImage: "/posters/stranger-things.jpg",
    lastChecked: "Checked 2h ago",
  },
  {
    id: "house-of-the-dragon",
    title: "House of the Dragon",
    posterSeed: "hotd-02",
    platform: "HBO Max",
    status: "hiatus",
    currentSeason: 3,
    statusNote: "On hiatus between seasons — no Season 4 date yet",
    genres: ["Fantasy", "Drama"],
    rating: 8.4,
    posterImage: "/posters/house-of-the-dragon.jpg",
    lastChecked: "Checked 5h ago",
  },
  {
    id: "severance",
    title: "Severance",
    posterSeed: "severance-03",
    platform: "Apple TV+",
    status: "renewed",
    currentSeason: 2,
    nextSeasonDate: "2027-01-15",
    statusNote: "Season 3 confirmed",
    genres: ["Sci-Fi", "Thriller"],
    rating: 8.7,
    posterImage: "/posters/severance.jpg",
    lastChecked: "Checked 1d ago",
  },
  {
    id: "snowfall",
    title: "Snowfall",
    posterSeed: "snowfall-04",
    platform: "Hulu",
    status: "ended",
    currentSeason: 5,
    statusNote: "Series concluded after Season 5",
    genres: ["Crime", "Drama"],
    rating: 8.4,
    posterImage: "/posters/snowfall.jpg",
    lastChecked: "Checked 6h ago",
  },
  {
    id: "sopranos",
    title: "The Sopranos",
    posterSeed: "sopranos-05",
    platform: "HBO Max",
    status: "rumored",
    currentSeason: 6,
    statusNote: "Spin-off series rumored, not yet confirmed",
    genres: ["Crime", "Drama"],
    rating: 9.2,
    posterImage: "/posters/the-sopranos.jpg",
    lastChecked: "Checked 3h ago",
  },
  {
    id: "the-last-of-us",
    title: "The Last of Us",
    posterSeed: "tlou-06",
    platform: "HBO Max",
    status: "renewed",
    currentSeason: 2,
    nextSeasonDate: "2027-04-01",
    statusNote: "Season 3 confirmed",
    genres: ["Drama", "Horror"],
    rating: 8.5,
    posterImage: "/posters/the-last-of-us.jpg",
    lastChecked: "Checked 4h ago",
  },
  {
    id: "fallout",
    title: "Fallout",
    posterSeed: "fallout-07",
    platform: "Prime Video",
    status: "renewed",
    currentSeason: 1,
    nextSeasonDate: "2026-12-17",
    statusNote: "Season 2 confirmed",
    genres: ["Sci-Fi", "Action"],
    rating: 8.0,
    posterImage: "/posters/fallout.jpg",
    lastChecked: "Checked 30m ago",
  },
  {
    id: "wednesday",
    title: "Wednesday",
    posterSeed: "wednesday-08",
    platform: "Netflix",
    status: "airing",
    currentSeason: 2,
    statusNote: "Season 2 currently airing",
    genres: ["Comedy", "Horror"],
    rating: 8.1,
    posterImage: "/posters/wednesday.webp",
    lastChecked: "Checked 8h ago",
  },
];
