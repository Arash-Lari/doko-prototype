import type { VaultNote } from "@/lib/types";

export const vaultNotes: VaultNote[] = [
  {
    id: "vault_1",
    title: "Apartment Lease Details",
    body: "Lease renewal date: June 30, 2026\nMonthly rent: £1,850\nLandlord contact: Sarah Williams, 020 7946 0958\nDeposit held with: TDS (ref: TDS-2025-88412)\n\nNote: Need to give 2 months notice if not renewing.",
    category: "documents",
    createdAt: "2025-11-15T10:00:00Z",
    updatedAt: "2025-11-15T10:00:00Z",
  },
  {
    id: "vault_2",
    title: "Lisbon Trip Ideas",
    body: "Must visit:\n- LX Factory (creative hub, good for lunch)\n- Miradouro da Senhora do Monte (best sunset viewpoint)\n- Cervejaria Ramiro (seafood, book ahead)\n- Feira da Ladra flea market (Tuesday/Saturday)\n\nNadia's recs:\n- Time Out Market for quick eats\n- Pastéis de Belém (obviously)\n- Alfama walking tour (do it early morning)\n\nBudget: ~€500 total, splitting accommodation with Nadia",
    category: "travel",
    createdAt: "2026-01-20T14:30:00Z",
    updatedAt: "2026-02-05T09:15:00Z",
  },
  {
    id: "vault_3",
    title: "App Ideas",
    body: "1. A habit tracker that uses location triggers (e.g., remind me to stretch when I arrive at the office)\n\n2. Shared grocery list that learns your household patterns\n\n3. A 'friendship maintenance' app that nudges you to reach out to people you haven't talked to... wait, that's basically Doko!",
    category: "ideas",
    createdAt: "2025-12-10T22:00:00Z",
    updatedAt: "2026-01-05T11:30:00Z",
  },
  {
    id: "vault_4",
    title: "Personal Goals 2026",
    body: "Health:\n- Cycle 2,000 miles total\n- Learn to cook 10 new recipes\n- Meditate 3x per week\n\nCareer:\n- Lead a product launch at Meridian\n- Start writing design articles\n- Attend 4 conferences\n\nSocial:\n- Host a dinner party every month\n- Visit Chloe in Melbourne\n- Reconnect with old friends",
    category: "personal",
    createdAt: "2026-01-01T08:00:00Z",
    updatedAt: "2026-01-15T16:45:00Z",
  },
  {
    id: "vault_5",
    title: "WiFi Passwords",
    body: "Home: Flat4A_Guest / sunflower2025!\nOffice: Meridian-Corp / M3ridian#2025\nMum & Dad: Morgan_Home / chloe1997alex1992\nFavourite café (Origin): OriginGuest / brewmore",
    category: "documents",
    createdAt: "2025-09-20T12:00:00Z",
    updatedAt: "2025-12-01T10:00:00Z",
  },
];
