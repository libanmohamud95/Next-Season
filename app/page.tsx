import { Dashboard } from "@/components/Dashboard";
import { CATALOG as MOCK_CATALOG } from "@/lib/mock-data";
import { fetchTmdbCatalog } from "@/lib/tmdb";

export default async function Home() {
  let catalog = MOCK_CATALOG;

  if (process.env.TMDB_API_KEY) {
    try {
      const tmdbCatalog = await fetchTmdbCatalog(5);
      if (tmdbCatalog.length > 0) {
        catalog = tmdbCatalog;
      }
    } catch (error) {
      console.error("Failed to load TMDB catalog, falling back to mock data:", error);
    }
  }

  return <Dashboard catalog={catalog} />;
}
