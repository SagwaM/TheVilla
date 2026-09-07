import blogWatamuDay from "@/assets/blog-watamu-day.jpg";
import { IMG } from "@/lib/gallery";

export const BLOG_CATEGORIES = ["All", "Wellness", "Local Guide", "Dining", "Villa Life"] as const;
export type BlogCategory = Exclude<(typeof BLOG_CATEGORIES)[number], "All">;

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type Post = {
  slug: string;
  title: string;
  category: BlogCategory;
  date: string; // ISO
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "a-day-in-watamu",
    title: "A Day in Watamu: How to Spend 24 Hours Near the Villa",
    category: "Local Guide",
    date: "2026-09-06",
    excerpt:
      "From sunrise on the beach to lanterns around the pool at dusk — a rhythm for one perfect day in Watamu, written for guests staying with us.",
    metaTitle: "A Day in Watamu: How to Spend 24 Hours Near the Villa",
    metaDescription:
      "A guest's guide to spending a perfect day in Watamu, Kenya, from sunrise on the beach to sunset dinners, right from The Villa @Watamu.",
    image: blogWatamuDay,
    imageAlt: "Watamu beach at golden hour with palm fronds framing turquoise water",
    body: [
      {
        type: "p",
        text: "Watamu has a way of slowing you down the moment you arrive. The pace here isn't something you have to look for. It's built into the tides, the fishermen heading out at dawn, the way the afternoon heat simply asks you to sit still for a while. If you're staying with us and wondering how to fill a day well, here's a rhythm that works.",
      },
      { type: "h2", text: "Morning: Start with the water" },
      {
        type: "p",
        text: "Watamu's coastline is the reason most guests come here in the first place, and mornings are when it's at its best. The light is soft, the beach is quieter, and the water is calm before the wind picks up later in the day. A short walk from the villa takes you to some of the most photographed stretches of coast in Kenya.",
      },
      {
        type: "p",
        text: "If you're up for something more active, Watamu Marine National Park is one of the best snorkeling spots on the East African coast. Coral gardens, sea turtles, and reef fish are all within easy reach, and local boat operators run half-day trips that get you back well before lunch.",
      },
      {
        type: "quote",
        text: "For a slower morning, our pool and jacuzzi are right here at the villa. No boat required.",
      },
      { type: "h2", text: "Midday: Rest, the way this coast intends" },
      {
        type: "p",
        text: "By late morning, the heat sets its own agenda. This is where the \u201chealing sanctuary\u201d part of who we are comes in. Take a wellness session, or simply retreat to a shaded lounge area with a cold drink and let the villa do what it's designed to do.",
      },
      {
        type: "image",
        src: IMG.dining,
        alt: "Candlelit table set with coastal seafood beneath a makuti roof at the villa",
        caption: "Lunch at the villa restaurant is built around whatever came in that morning.",
      },
      {
        type: "p",
        text: "This is also a good window for lunch at the villa's restaurant. Fresh seafood, coastal spices, and dishes built around what came in that morning are the standard here, not the exception.",
      },
      { type: "h2", text: "Afternoon: Wander into Watamu town" },
      {
        type: "p",
        text: "Once the heat softens, Watamu town itself is worth an unhurried walk. Small shops, local art, and a genuinely warm welcome from the community define this stretch of coast. Gede Ruins, the remains of a Swahili trading town swallowed slowly by forest, is a short drive away and worth the detour if you have any interest in history or archaeology.",
      },
      { type: "h2", text: "Evening: Let the villa close the day" },
      {
        type: "image",
        src: IMG.heroPool,
        alt: "The villa pool lit by lanterns at night beneath palm trees",
        caption: "As the sun drops, the pool area transforms.",
      },
      {
        type: "p",
        text: "As the sun drops, the pool area transforms. Lanterns come on, the water turns gold, and the pace shifts one more time, from adventure to unwinding. Dinner on the terrace, a slow evening by the pool, or simply watching the sky change color from your suite's private balcony is, for most guests, the moment they remember most.",
      },
      {
        type: "p",
        text: "That's the shape of a good day here. Not packed, not rushed. Just Watamu, at its own pace, with a sanctuary to come home to when the day is done.",
      },
    ],
  },
  {
    slug: "slow-mornings-wellness",
    title: "Slow Mornings: What a Wellness Day at the Villa Looks Like",
    category: "Wellness",
    date: "2026-08-24",
    excerpt:
      "Our wellness space is built around rest rather than schedules. Here's how guests usually shape a day around it.",
    metaTitle: "Slow Mornings: A Wellness Day at The Villa @Watamu",
    metaDescription:
      "How guests shape a wellness day at The Villa @Watamu — jacuzzi, treatments, quiet hours and a pace set by the coast rather than a timetable.",
    image: IMG.wellness,
    imageAlt: "Massage table dressed in white linen beside the jacuzzi in the villa wellness room",
    body: [
      {
        type: "p",
        text: "A wellness day here doesn't begin with an alarm. It begins with the light, the sound of the garden and a pot of tea somewhere shaded. Everything else is optional.",
      },
      { type: "h2", text: "The shape of the day" },
      {
        type: "p",
        text: "Most guests start in the water — the pool early, when it is still cool — then move to the wellness space as the heat rises. Treatments are unhurried and the room is kept quiet on purpose.",
      },
      {
        type: "quote",
        text: "Rest is not a gap between activities. Here, it is the activity.",
      },
      {
        type: "p",
        text: "Afternoons are for shade, cold drinks and reading. By evening most people find they have done very little and feel considerably better for it.",
      },
    ],
  },
  {
    slug: "coastal-kitchen",
    title: "From the Boats to the Table: Our Coastal Kitchen",
    category: "Dining",
    date: "2026-08-10",
    excerpt:
      "Swahili coastal cooking, morning fish and Gede market produce — how the villa kitchen decides what to serve.",
    metaTitle: "From the Boats to the Table — Dining at The Villa @Watamu",
    metaDescription:
      "Inside the kitchen at The Villa @Watamu: Swahili coastal spices, fish landed that morning and produce from Gede market.",
    image: IMG.dining,
    imageAlt: "Candlelit dinner table set with seafood beneath a makuti roof by the ocean",
    body: [
      {
        type: "p",
        text: "The menu here is short by design. What is written down each morning depends on what the boats brought in and what looked good at the market.",
      },
      { type: "h2", text: "Coastal, not generic" },
      {
        type: "p",
        text: "Coconut, tamarind, cardamom, chilli and lime do most of the work. Fish is grilled simply. Vegetables are treated as seriously as the seafood.",
      },
      {
        type: "quote",
        text: "Fresh seafood and coastal spices are the standard here, not the exception.",
      },
    ],
  },
  {
    slug: "five-suites-villa-life",
    title: "Five Suites, One House: Life Inside the Villa",
    category: "Villa Life",
    date: "2026-07-28",
    excerpt:
      "Why we kept the villa small, what that means for your stay, and the small details guests notice first.",
    metaTitle: "Five Suites, One House — Life at The Villa @Watamu",
    metaDescription:
      "Why The Villa @Watamu keeps to five guest suites, and what that means for the quiet, the service and the feel of a stay on the Kenyan coast.",
    image: IMG.suiteCanopy,
    imageAlt: "Carved four-poster canopy bed with white netting in a villa guest suite",
    body: [
      {
        type: "p",
        text: "Five suites is a deliberate limit. It keeps the house quiet, it keeps the team small enough to know your name, and it keeps the pool from ever feeling crowded.",
      },
      { type: "h2", text: "The details guests notice" },
      {
        type: "p",
        text: "Hand-carved joinery, coral stone, lime-washed walls and light that moves across the rooms all afternoon. Air conditioning and Wi-Fi are there when you need them, and easy to forget when you don't.",
      },
      {
        type: "quote",
        text: "A place to stay can also be a place to heal.",
      },
    ],
  },
];

export function readTime(post: Post): number {
  const words = post.body
    .map((b) => ("text" in b ? b.text : (b.caption ?? "")))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function relatedPosts(slug: string, count = 3): Post[] {
  const current = getPost(slug);
  const others = POSTS.filter((p) => p.slug !== slug);
  const sameCat = others.filter((p) => p.category === current?.category);
  const rest = others.filter((p) => p.category !== current?.category);
  return [...sameCat, ...rest].slice(0, count);
}
