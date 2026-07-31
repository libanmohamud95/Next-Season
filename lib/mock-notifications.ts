export type UpdateKind = "renewed" | "rumored" | "dated";

export type UpdateItem = {
  id: string;
  kind: UpdateKind;
  showTitle: string;
  message: string;
  timeAgo: string;
};

export const RECENT_UPDATES: UpdateItem[] = [
  {
    id: "u1",
    kind: "dated",
    showTitle: "Fallout",
    message: "Fallout Season 2 now has a release date — Dec 17, on Prime Video",
    timeAgo: "2h ago",
  },
  {
    id: "u2",
    kind: "rumored",
    showTitle: "The Bear",
    message: "Early buzz suggests The Bear is being renewed — not yet confirmed",
    timeAgo: "1d ago",
  },
  {
    id: "u3",
    kind: "renewed",
    showTitle: "The Last of Us",
    message: "The Last of Us Season 3 officially confirmed for HBO Max",
    timeAgo: "3d ago",
  },
];
