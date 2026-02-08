import type { Guide } from "@/lib/types";

export const guides: Guide[] = [
  {
    id: "guide_1",
    title: "London Coffee Spots",
    coverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=250&fit=crop",
    location: "London, UK",
    createdBy: "user_me",
    entries: [
      {
        id: "ge_1",
        placeName: "Monmouth Coffee",
        notes: "The OG specialty coffee shop. Always a queue but worth it. Get the single origin filter and a ricotta hotcake.",
        rating: 5,
        location: "Borough Market, SE1",
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop",
      },
      {
        id: "ge_2",
        placeName: "Rosslyn Coffee",
        notes: "Tiny spot near the City. Incredible flat whites and surprisingly good pastries. Standing room only.",
        rating: 4,
        location: "Queen Victoria St, EC4",
        image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=300&h=200&fit=crop",
      },
      {
        id: "ge_3",
        placeName: "Origin Coffee Roasters",
        notes: "Beautiful space in Shoreditch. Great for working — good WiFi, plenty of plugs, and they don't mind if you stay for hours.",
        rating: 5,
        location: "Charlotte Road, Shoreditch",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop",
      },
      {
        id: "ge_4",
        placeName: "WatchHouse",
        notes: "Converted old watch house near Tower Bridge. The outdoor seating area is lovely in summer. Good brunch menu too.",
        rating: 4,
        location: "Bermondsey St, SE1",
      },
      {
        id: "ge_5",
        placeName: "Kaffeine",
        notes: "Australian-style coffee in Fitzrovia. The avocado toast is a cliche but it's genuinely one of the best in London.",
        rating: 4,
        location: "Great Titchfield St, W1",
      },
    ],
  },
  {
    id: "guide_2",
    title: "Best Ramen in Tokyo",
    coverImage: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&h=250&fit=crop",
    location: "Tokyo, Japan",
    createdBy: "user_me",
    entries: [
      {
        id: "ge_6",
        placeName: "Fuunji",
        notes: "Famous tsukemen (dipping ramen) spot near Shinjuku. Expect a queue but it moves fast. The rich fish-based broth is unforgettable.",
        rating: 5,
        location: "Yoyogi, Shibuya",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop",
      },
      {
        id: "ge_7",
        placeName: "Ichiran Shibuya",
        notes: "Solo ramen booths — perfect for introverts. Customise everything from broth richness to noodle firmness. Tonkotsu perfection.",
        rating: 4,
        location: "Shibuya, Tokyo",
        image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=300&h=200&fit=crop",
      },
      {
        id: "ge_8",
        placeName: "Afuri",
        notes: "Light yuzu shio ramen that's refreshingly different from heavy tonkotsu. The Ebisu location has a great vibe. Also try the gyoza.",
        rating: 5,
        location: "Ebisu, Shibuya",
      },
    ],
  },
];
