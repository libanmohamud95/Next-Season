# Next Season

Track your favorite shows and get notified the moment a new season is
confirmed, dated, or ready to stream — and exactly where to watch it.

## Status

This is an early prototype: a working front-end demo of the core watchlist
experience, running on mock data so the flow can be seen and tested without
any accounts or API keys.

- Add shows to a personal watchlist
- See each show's status at a glance (renewed, currently airing, rumored,
  ended), which platform it's on, and the next season's date when known
- A "recent updates" feed showing the kind of notifications the real product
  would send

Not yet built: real data (TMDB/JustWatch), accounts, a database, scheduled
checks, or email/push notifications. See the project notes for the planned
architecture.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS
- [lucide-react](https://lucide.dev) for icons
- `lib/mock-data.ts` and `lib/mock-notifications.ts` stand in for the real
  TMDB/JustWatch data layer for now
