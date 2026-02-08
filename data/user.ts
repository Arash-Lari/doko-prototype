import type { User } from "@/lib/types";

export const currentUser: User = {
  id: "user_me",
  name: "Alex Morgan",
  avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=Alex",
  location: "London, UK",
  bio: "Product designer. Weekend cyclist. Aspiring home cook.",
  email: "alex.morgan@example.com",
  phone: "+44 7700 900000",
  birthday: "1992-06-15",
  updates: [
    {
      id: "u_me_1",
      type: "location",
      text: "Moved to London",
      date: "2025-11-01",
      icon: "MapPin",
    },
    {
      id: "u_me_2",
      type: "job",
      text: "Joined Meridian Studio as Lead Designer",
      date: "2025-09-15",
      icon: "Briefcase",
    },
    {
      id: "u_me_3",
      type: "hobby",
      text: "Completed a century ride (100 miles!)",
      date: "2025-07-20",
      icon: "Bike",
    },
  ],
  plans: [
    {
      id: "plan_me_1",
      userId: "user_me",
      destination: "Lisbon",
      dates: { start: "2026-03-14", end: "2026-03-18" },
      type: "short_trip",
      visibility: "close_friends",
      notes: "Need restaurant recs!",
      overlaps: [
        {
          contactId: "contact_nadia",
          contactName: "Nadia Okafor",
          destination: "Lisbon",
          overlapDates: { start: "2026-03-15", end: "2026-03-18" },
          overlapDays: 3,
        },
      ],
    },
    {
      id: "plan_me_2",
      userId: "user_me",
      destination: "Tokyo",
      dates: { start: "2026-05-01", end: "2026-05-12" },
      type: "long_trip",
      visibility: "all_contacts",
      notes: "First time in Japan — need all the tips!",
      overlaps: [
        {
          contactId: "contact_priya",
          contactName: "Priya Sharma",
          destination: "Tokyo",
          overlapDates: { start: "2026-05-03", end: "2026-05-08" },
          overlapDays: 5,
        },
      ],
    },
  ],
  circles: ["family", "close_friends", "work_friends", "new_contacts", "acquaintances"],
};
