import type { Conversation } from "@/lib/types";

export const conversations: Conversation[] = [
  // ─── Direct Messages ───────────────────────────────────────────────

  // 1. Nadia — Lisbon trip overlap
  {
    id: "conv_nadia",
    type: "direct",
    participants: ["user_me", "contact_nadia"],
    messages: [
      {
        id: "msg_nadia_1",
        senderId: "contact_nadia",
        text: "Guess what — I just booked Lisbon for March!",
        timestamp: "2026-02-01T10:15:00Z",
        read: true,
      },
      {
        id: "msg_nadia_2",
        senderId: "user_me",
        text: "No way! I'm going Mar 14-18!",
        timestamp: "2026-02-01T10:22:00Z",
        read: true,
      },
      {
        id: "msg_nadia_3",
        senderId: "contact_nadia",
        text: "We overlap! Mar 15-18. We HAVE to meet up",
        timestamp: "2026-02-01T10:25:00Z",
        read: true,
      },
      {
        id: "msg_nadia_4",
        senderId: "user_me",
        text: "Absolutely! Know any good spots?",
        timestamp: "2026-02-01T10:30:00Z",
        read: true,
      },
      {
        id: "msg_nadia_5",
        senderId: "contact_nadia",
        text: "I've been three times. I'll send you my guide",
        timestamp: "2026-02-02T09:10:00Z",
        read: true,
      },
      {
        id: "msg_nadia_6",
        senderId: "user_me",
        text: "You're the best. Let's plan something fun",
        timestamp: "2026-02-02T09:18:00Z",
        read: true,
      },
    ],
    lastMessageAt: "2026-02-02T09:18:00Z",
    unreadCount: 0,
  },

  // 2. Sam — Catching up
  {
    id: "conv_sam",
    type: "direct",
    participants: ["user_me", "contact_sam"],
    messages: [
      {
        id: "msg_sam_1",
        senderId: "user_me",
        text: "Hey! How's SF treating you?",
        timestamp: "2025-11-05T14:00:00Z",
        read: true,
      },
      {
        id: "msg_sam_2",
        senderId: "contact_sam",
        text: "Good! Super busy with the Stripe launch. How's London?",
        timestamp: "2025-11-05T14:35:00Z",
        read: true,
      },
      {
        id: "msg_sam_3",
        senderId: "user_me",
        text: "London's great. Miss our coffee runs though",
        timestamp: "2025-11-06T08:45:00Z",
        read: true,
      },
      {
        id: "msg_sam_4",
        senderId: "contact_sam",
        text: "Same! Maybe I'll visit in spring",
        timestamp: "2025-11-06T09:12:00Z",
        read: true,
      },
      {
        id: "msg_sam_5",
        senderId: "user_me",
        text: "You should! Let me know dates",
        timestamp: "2025-11-08T11:30:00Z",
        read: true,
      },
    ],
    lastMessageAt: "2025-11-08T11:30:00Z",
    unreadCount: 0,
  },

  // 3. Jamie — Welcoming to London
  {
    id: "conv_jamie",
    type: "direct",
    participants: ["user_me", "contact_jamie"],
    messages: [
      {
        id: "msg_jamie_1",
        senderId: "contact_jamie",
        text: "I made it! Officially a Londoner now",
        timestamp: "2026-01-20T16:00:00Z",
        read: true,
      },
      {
        id: "msg_jamie_2",
        senderId: "user_me",
        text: "Welcome!! How's the flat?",
        timestamp: "2026-01-20T16:08:00Z",
        read: true,
      },
      {
        id: "msg_jamie_3",
        senderId: "contact_jamie",
        text: "Tiny but charming. Hackney vibes",
        timestamp: "2026-01-20T16:12:00Z",
        read: true,
      },
      {
        id: "msg_jamie_4",
        senderId: "user_me",
        text: "Love Hackney. I'll show you around",
        timestamp: "2026-01-21T10:05:00Z",
        read: true,
      },
      {
        id: "msg_jamie_5",
        senderId: "contact_jamie",
        text: "Yes please! I don't know anyone here yet",
        timestamp: "2026-01-21T10:20:00Z",
        read: true,
      },
      {
        id: "msg_jamie_6",
        senderId: "user_me",
        text: "Let's grab coffee this weekend?",
        timestamp: "2026-01-22T09:00:00Z",
        read: true,
      },
      {
        id: "msg_jamie_7",
        senderId: "contact_jamie",
        text: "Perfect. Saturday morning works?",
        timestamp: "2026-01-22T09:15:00Z",
        read: true,
      },
    ],
    lastMessageAt: "2026-01-22T09:15:00Z",
    unreadCount: 0,
  },

  // 4. Tom — Work + social
  {
    id: "conv_tom",
    type: "direct",
    participants: ["user_me", "contact_tom"],
    messages: [
      {
        id: "msg_tom_1",
        senderId: "contact_tom",
        text: "Did you see the new project brief?",
        timestamp: "2026-02-06T09:30:00Z",
        read: true,
      },
      {
        id: "msg_tom_2",
        senderId: "user_me",
        text: "Yeah, looks interesting. Big scope though",
        timestamp: "2026-02-06T09:45:00Z",
        read: true,
      },
      {
        id: "msg_tom_3",
        senderId: "contact_tom",
        text: "True. Also — BBQ at mine Saturday?",
        timestamp: "2026-02-06T12:10:00Z",
        read: true,
      },
      {
        id: "msg_tom_4",
        senderId: "user_me",
        text: "Count me in! Should I bring anything?",
        timestamp: "2026-02-07T08:00:00Z",
        read: true,
      },
      {
        id: "msg_tom_5",
        senderId: "contact_tom",
        text: "Just yourself and good vibes",
        timestamp: "2026-02-07T14:30:00Z",
        read: false,
      },
    ],
    lastMessageAt: "2026-02-07T14:30:00Z",
    unreadCount: 1,
  },

  // 5. Chloe — Sibling chat about visiting
  {
    id: "conv_chloe",
    type: "direct",
    participants: ["user_me", "contact_chloe"],
    messages: [
      {
        id: "msg_chloe_1",
        senderId: "contact_chloe",
        text: "Booked my London flights! Apr 5-15",
        timestamp: "2026-01-15T18:30:00Z",
        read: true,
      },
      {
        id: "msg_chloe_2",
        senderId: "user_me",
        text: "YESSS! Two whole weeks!",
        timestamp: "2026-01-15T18:35:00Z",
        read: true,
      },
      {
        id: "msg_chloe_3",
        senderId: "contact_chloe",
        text: "Mum and dad might come too for Easter",
        timestamp: "2026-01-16T11:00:00Z",
        read: true,
      },
      {
        id: "msg_chloe_4",
        senderId: "user_me",
        text: "That would be amazing. My flat is small but we'll figure it out",
        timestamp: "2026-01-16T11:20:00Z",
        read: true,
      },
      {
        id: "msg_chloe_5",
        senderId: "contact_chloe",
        text: "Already looking at Airbnbs nearby",
        timestamp: "2026-01-17T09:45:00Z",
        read: true,
      },
      {
        id: "msg_chloe_6",
        senderId: "user_me",
        text: "Smart. Can't wait to show you around!",
        timestamp: "2026-02-02T13:00:00Z",
        read: true,
      },
    ],
    lastMessageAt: "2026-02-02T13:00:00Z",
    unreadCount: 0,
  },

  // ─── Group Chats ───────────────────────────────────────────────────

  // 6. The Squad
  {
    id: "conv_squad",
    type: "group",
    name: "The Squad",
    participants: [
      "user_me",
      "contact_nadia",
      "contact_sam",
      "contact_jamie",
      "contact_priya",
    ],
    messages: [
      {
        id: "msg_squad_1",
        senderId: "contact_nadia",
        text: "Group trip when??",
        timestamp: "2026-01-28T19:00:00Z",
        read: true,
      },
      {
        id: "msg_squad_2",
        senderId: "contact_sam",
        text: "I'm down for summer",
        timestamp: "2026-01-28T19:15:00Z",
        read: true,
      },
      {
        id: "msg_squad_3",
        senderId: "contact_jamie",
        text: "Just name the place",
        timestamp: "2026-01-29T08:30:00Z",
        read: true,
      },
      {
        id: "msg_squad_4",
        senderId: "contact_priya",
        text: "Somewhere warm. I vote Amalfi",
        timestamp: "2026-01-29T10:45:00Z",
        read: true,
      },
      {
        id: "msg_squad_5",
        senderId: "user_me",
        text: "Let me check dates and circle back",
        timestamp: "2026-01-30T12:00:00Z",
        read: true,
      },
    ],
    lastMessageAt: "2026-01-30T12:00:00Z",
    unreadCount: 0,
  },

  // 7. Design Team
  {
    id: "conv_design",
    type: "group",
    name: "Design Team",
    participants: ["user_me", "contact_tom", "contact_lena"],
    messages: [
      {
        id: "msg_design_1",
        senderId: "contact_tom",
        text: "Sprint review moved to Thursday",
        timestamp: "2026-02-05T11:00:00Z",
        read: true,
      },
      {
        id: "msg_design_2",
        senderId: "contact_lena",
        text: "Works for me. I'll be in London by then!",
        timestamp: "2026-02-05T11:30:00Z",
        read: true,
      },
      {
        id: "msg_design_3",
        senderId: "user_me",
        text: "Perfect. Let's do dinner after?",
        timestamp: "2026-02-05T11:45:00Z",
        read: true,
      },
      {
        id: "msg_design_4",
        senderId: "contact_tom",
        text: "I know a great new place in Soho",
        timestamp: "2026-02-06T09:00:00Z",
        read: true,
      },
    ],
    lastMessageAt: "2026-02-06T09:00:00Z",
    unreadCount: 0,
  },

  // 8. Lisbon March group
  {
    id: "conv_lisbon",
    type: "group",
    name: "Lisbon March \u{1F1F5}\u{1F1F9}",
    participants: ["user_me", "contact_nadia"],
    messages: [
      {
        id: "msg_lisbon_1",
        senderId: "user_me",
        text: "Created this chat for our Lisbon plans!",
        timestamp: "2026-02-03T15:00:00Z",
        read: true,
      },
      {
        id: "msg_lisbon_2",
        senderId: "contact_nadia",
        text: "Love it. Day 1: past\u00E9is de nata tour",
        timestamp: "2026-02-03T15:20:00Z",
        read: true,
      },
      {
        id: "msg_lisbon_3",
        senderId: "user_me",
        text: "Obviously. Day 2: Alfama walking tour?",
        timestamp: "2026-02-04T10:00:00Z",
        read: true,
      },
      {
        id: "msg_lisbon_4",
        senderId: "contact_nadia",
        text: "Yes! And Time Out Market for dinner",
        timestamp: "2026-02-04T10:30:00Z",
        read: true,
      },
      {
        id: "msg_lisbon_5",
        senderId: "user_me",
        text: "This is going to be so good",
        timestamp: "2026-02-05T08:45:00Z",
        read: true,
      },
    ],
    lastMessageAt: "2026-02-05T08:45:00Z",
    unreadCount: 0,
  },
];
