import type { Moment } from "@/lib/types";

export const moments: Moment[] = [
  {
    id: "moment_1",
    authorId: "contact_nadia",
    text: "Barcelona sunset from my rooftop. This city never gets old 🌅",
    audience: ["close_friends"],
    createdAt: "2026-02-07T12:00:00Z",
    expiresAt: "2026-02-08T18:00:00Z",
  },
  {
    id: "moment_2",
    authorId: "contact_jamie",
    text: "First proper London pub quiz tonight at The Lamb in Hackney. Who's in? 🍺",
    audience: ["close_friends", "work_friends"],
    createdAt: "2026-02-08T06:00:00Z",
    expiresAt: "2026-02-08T18:00:00Z",
  },
  {
    id: "moment_3",
    authorId: "contact_tom",
    text: "Rooftop BBQ at mine this Saturday! Perfect weather forecast. DM for address 🔥",
    audience: ["close_friends", "work_friends"],
    createdAt: "2026-02-07T08:00:00Z",
    expiresAt: "2026-02-09T07:00:00Z",
  },
  {
    id: "moment_4",
    authorId: "contact_ravi",
    text: "Anyone know a good coworking space in Shoreditch? Starting to go stir-crazy working from home 💻",
    audience: ["new_contacts", "work_friends"],
    createdAt: "2026-02-08T08:00:00Z",
    expiresAt: "2026-02-08T12:00:00Z",
  },
];
