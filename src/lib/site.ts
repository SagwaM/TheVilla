export const PHONES = [
  { display: "+254 798 515 231", href: "tel:+254798515231", wa: "254798515231" },
  { display: "+254 720 729 135", href: "tel:+254720729135", wa: "254720729135" },
] as const;

export const SITE = {
  name: "The Villa @Watamu",
  tagline: "A boutique healing sanctuary and restaurant in the heart of Watamu.",
  phones: PHONES,
  phone: PHONES[0].display,
  phoneHref: PHONES[0].href,
  phoneAlt: PHONES[1].display,
  phoneAltHref: PHONES[1].href,
  whatsapp: `https://wa.me/${PHONES[0].wa}`,
  whatsappHref: (message: string, index = 0) =>
    `https://wa.me/${(PHONES[index] ?? PHONES[0]).wa}?text=${encodeURIComponent(message)}`,
  email: "sagwaisaac@gmail.com",
  emailHref: "mailto:sagwaisaac@gmail.com",
  location: "Watamu, Kilifi County, Kenya",
  mapQuery: "The Villa @Watamu, Watamu, Kilifi County, Kenya",
  geo: { lat: -3.3538, lng: 40.0186 },
  instagram: "https://instagram.com/thevillawatamu",
  facebook: "https://facebook.com/thevillawatamu",
  tripadvisor: "https://www.tripadvisor.com/",
  googleBusiness: "https://www.google.com/maps/search/?api=1&query=The+Villa+Watamu+Kenya",
};


export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/accommodation", label: "Accommodation" },
  { to: "/dining", label: "Dining" },
  { to: "/wellness", label: "Wellness" },
  { to: "/gallery", label: "Gallery" },
  { to: "/experiences", label: "Experiences" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export const SUITES = [
  {
    slug: "baharini",
    name: "Baharini Suite",
    subtitle: "Ocean-facing king",
    blurb:
      "Our signature suite, with a hand-carved canopy bed, a private terrace facing the breeze, and light that moves across lime-washed walls all afternoon.",
    size: "42 m²",
    sleeps: "2 guests",
    bed: "King canopy bed",
  },
  {
    slug: "pwani",
    name: "Pwani Suite",
    subtitle: "Garden terrace king",
    blurb:
      "Opening straight onto the palm garden, Pwani is the quietest room on the property — chosen most often by guests here to rest properly.",
    size: "38 m²",
    sleeps: "2 guests",
    bed: "King bed",
  },
  {
    slug: "kisiwa",
    name: "Kisiwa Suite",
    subtitle: "Poolside twin",
    blurb:
      "Two generous beds, a shaded veranda a few steps from the pool, and an en-suite finished in coral stone and brass.",
    size: "36 m²",
    sleeps: "2–3 guests",
    bed: "Two queen beds",
  },
  {
    slug: "matlai",
    name: "Matlai Suite",
    subtitle: "Upper-level retreat",
    blurb:
      "Set on the upper floor with a balcony above the treeline, Matlai catches the morning wind that gives the room its name.",
    size: "40 m²",
    sleeps: "2 guests",
    bed: "King bed",
  },
  {
    slug: "mvuli",
    name: "Mvuli Suite",
    subtitle: "Family garden suite",
    blurb:
      "The most flexible of the five, with room for a family and a private outdoor shower beneath the mvuli tree.",
    size: "48 m²",
    sleeps: "4 guests",
    bed: "King + two singles",
  },
] as const;

export const SUITE_AMENITIES = [
  "Air Conditioning",
  "En-suite Bathroom",
  "Private Balcony / Terrace",
  "Complimentary Wi-Fi",
  "Daily Housekeeping",
];

export const TESTIMONIALS = [
  {
    quote:
      "We came for four nights and extended twice. The staff remember how you take your coffee by the second morning, and the food coming out of that kitchen is better than anything we ate in Malindi.",
    name: "Amara N.",
    source: "Google Review",
  },
  {
    quote:
      "It is not a hotel. It is somebody's beautiful home that they have decided to share. The pool at night with the lanterns lit is something I still think about.",
    name: "Peter & Lise",
    source: "TripAdvisor",
  },
  {
    quote:
      "I booked the wellness package after a hard year. Massage, quiet, the jacuzzi, long swims. I left feeling like a different person. Genuinely healing.",
    name: "Wanjiru K.",
    source: "Google Review",
  },
  {
    quote:
      "Five suites only, so it never feels busy. Impeccably clean, generous breakfasts, and they arranged our Mida Creek dhow trip in an afternoon.",
    name: "The Hartley Family",
    source: "TripAdvisor",
  },
];
