import type { Show, ShowStatus } from "@/lib/mock-data";

const TMDB_BASE = "https://api.themoviedb.org/3";

type TmdbListResponse = {
  page: number;
  results: { id: number }[];
  total_pages: number;
};

type TmdbNetwork = { id: number; name: string };
type TmdbGenre = { id: number; name: string };
type TmdbEpisodeRef = {
  season_number: number;
  episode_number: number;
  air_date: string | null;
};

type TmdbShowDetail = {
  id: number;
  name: string;
  poster_path: string | null;
  vote_average: number;
  genres: TmdbGenre[];
  status: string;
  number_of_seasons: number;
  next_episode_to_air: TmdbEpisodeRef | null;
  last_episode_to_air: TmdbEpisodeRef | null;
  networks: TmdbNetwork[];
};

async function tmdbFetch<T>(path: string): Promise<T> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("TMDB_API_KEY is not set");
  }

  const res = await fetch(`${TMDB_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB request failed (${res.status}): ${path}`);
  }

  return res.json() as Promise<T>;
}

function mapStatus(detail: TmdbShowDetail): {
  status: ShowStatus;
  statusNote: string;
  nextSeasonDate?: string;
} {
  const { status, next_episode_to_air, last_episode_to_air, number_of_seasons } =
    detail;

  if (status === "Ended" || status === "Canceled") {
    return {
      status: "ended",
      statusNote: `Series concluded after Season ${number_of_seasons}`,
    };
  }

  if (status === "Planned" || status === "Pilot") {
    return {
      status: "rumored",
      statusNote: "New series planned, not yet confirmed",
    };
  }

  if (next_episode_to_air) {
    const isNewSeason =
      !last_episode_to_air ||
      next_episode_to_air.season_number > last_episode_to_air.season_number;

    if (isNewSeason) {
      return {
        status: "renewed",
        statusNote: `Season ${next_episode_to_air.season_number} confirmed`,
        nextSeasonDate: next_episode_to_air.air_date ?? undefined,
      };
    }

    return {
      status: "airing",
      statusNote: `Season ${next_episode_to_air.season_number} currently airing`,
    };
  }

  return {
    status: "hiatus",
    statusNote: `On hiatus between seasons — no Season ${number_of_seasons + 1} date yet`,
  };
}

function toShow(detail: TmdbShowDetail): Show {
  const { status, statusNote, nextSeasonDate } = mapStatus(detail);

  return {
    id: String(detail.id),
    title: detail.name,
    posterSeed: `tmdb-${detail.id}`,
    platform: detail.networks?.[0]?.name ?? "Unknown",
    status,
    currentSeason:
      detail.last_episode_to_air?.season_number ?? detail.number_of_seasons ?? 1,
    nextSeasonDate,
    statusNote,
    genres: detail.genres.map((g) => g.name),
    rating: Math.round(detail.vote_average * 10) / 10,
    posterImage: detail.poster_path
      ? `https://image.tmdb.org/t/p/w500${detail.poster_path}`
      : undefined,
    lastChecked: "Synced from TMDB",
  };
}

export async function fetchTmdbCatalog(pageCount = 5): Promise<Show[]> {
  const pages = await Promise.all(
    Array.from({ length: pageCount }, (_, i) =>
      tmdbFetch<TmdbListResponse>(`/tv/popular?page=${i + 1}`)
    )
  );

  const uniqueIds = Array.from(
    new Set(pages.flatMap((page) => page.results.map((r) => r.id)))
  );

  const shows: Show[] = [];
  const chunkSize = 20;
  for (let i = 0; i < uniqueIds.length; i += chunkSize) {
    const chunk = uniqueIds.slice(i, i + chunkSize);
    const chunkDetails = await Promise.all(
      chunk.map((id) => tmdbFetch<TmdbShowDetail>(`/tv/${id}`))
    );
    shows.push(...chunkDetails.map(toShow));
  }

  return shows;
}
