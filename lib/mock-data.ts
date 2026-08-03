export type ShowStatus = "renewed" | "airing" | "rumored" | "ended";

export type Platform = "Netflix" | "HBO Max" | "Prime Video" | "Disney+" | "Apple TV+" | "Hulu";

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
  },
  {
    id: "house-of-the-dragon",
    title: "House of the Dragon",
    posterSeed: "hotd-02",
    platform: "HBO Max",
    status: "airing",
    currentSeason: 3,
    statusNote: "Season 3 currently airing",
    genres: ["Fantasy", "Drama"],
    rating: 8.4,
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
  },
];

export const DEFAULT_WATCHLIST_IDS = ["stranger-things", "snowfall", "sopranos"];
