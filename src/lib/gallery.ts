import heroPool from "@/assets/hero-pool-night.jpg";
import suiteCanopy from "@/assets/suite-canopy.jpg";
import detailBathroom from "@/assets/detail-bathroom.jpg";
import loungePool from "@/assets/lounge-pooltable.jpg";
import pendantPool from "@/assets/pendant-pool.jpg";
import dining from "@/assets/dining.jpg";
import wellness from "@/assets/wellness.jpg";
import dhow from "@/assets/experiences-dhow.jpg";
import grounds from "@/assets/grounds.jpg";

export const IMG = {
  heroPool,
  suiteCanopy,
  detailBathroom,
  loungePool,
  pendantPool,
  dining,
  wellness,
  dhow,
  grounds,
};

export type GalleryImage = {
  src: string;
  alt: string;
  category: "Rooms" | "Pool" | "Dining" | "Grounds" | "At Night";
};

export const GALLERY: GalleryImage[] = [
  {
    src: suiteCanopy,
    alt: "Carved four-poster canopy bed with white netting in a guest suite at The Villa @Watamu",
    category: "Rooms",
  },
  {
    src: detailBathroom,
    alt: "Travertine basin and brass tap in a villa en-suite bathroom",
    category: "Rooms",
  },
  {
    src: loungePool,
    alt: "Guest lounge with pool table, rattan armchairs and ocean view",
    category: "Rooms",
  },
  {
    src: pendantPool,
    alt: "Woven pendant lanterns glowing above the villa swimming pool at dusk",
    category: "Pool",
  },
  {
    src: heroPool,
    alt: "The villa pool lit by lanterns at night beneath palm trees",
    category: "At Night",
  },
  {
    src: dining,
    alt: "Candlelit dinner table set with seafood beneath a makuti roof by the ocean",
    category: "Dining",
  },
  {
    src: wellness,
    alt: "Massage table dressed in white linen beside a jacuzzi in the wellness room",
    category: "Rooms",
  },
  {
    src: grounds,
    alt: "Palm-shaded stone pathway through the villa gardens with bougainvillea",
    category: "Grounds",
  },
  {
    src: dhow,
    alt: "Traditional wooden dhow anchored on turquoise water off Watamu beach",
    category: "Grounds",
  },
];

export const GALLERY_CATEGORIES = [
  "All",
  "Rooms",
  "Pool",
  "Dining",
  "Grounds",
  "At Night",
] as const;
