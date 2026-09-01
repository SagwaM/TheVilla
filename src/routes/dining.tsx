import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, SectionHeading } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import { BookStrip } from "@/components/site/BookStrip";
import { Lightbox } from "@/components/site/Lightbox";
import { IMG } from "@/lib/gallery";

export const Route = createFileRoute("/dining")({
  head: () => ({
    meta: [
      { title: "Restaurant & Dining — The Villa @Watamu" },
      {
        name: "description",
        content:
          "Swahili-coast cooking at The Villa @Watamu: line-caught seafood, coconut and tamarind, long candlelit dinners under the makuti roof in Watamu, Kenya.",
      },
      { property: "og:title", content: "Restaurant & Dining — The Villa @Watamu" },
      {
        property: "og:description",
        content: "A kitchen that cooks for five tables, on the Kenyan coast.",
      },
      { property: "og:url", content: "/dining" },
    ],
    links: [{ rel: "canonical", href: "/dining" }],
  }),
  component: Dining,
});

const MENU = [
  {
    course: "To Begin",
    items: [
      ["Viazi Karai", "Turmeric-battered potatoes, tamarind and chilli"],
      ["Crab & Green Mango", "Picked Mida Creek crab, lime, coconut cream"],
      ["Charred Aubergine", "Sesame, curry leaf, warm chapati"],
    ],
  },
  {
    course: "From the Boats",
    items: [
      ["Whole Grilled Snapper", "Pili pili butter, kachumbari, coconut rice"],
      ["Prawns Pwani", "Coconut, tamarind, curry leaf, steamed greens"],
      ["Swahili Fish Curry", "Slow-simmered catch of the day, chapati"],
    ],
  },
  {
    course: "To Finish",
    items: [
      ["Coconut & Cardamom Custard", "Toasted cashew, palm sugar"],
      ["Mango & Passionfruit", "Whatever the trees give us that week"],
      ["Kahawa & Dates", "Cardamom coffee, Lamu dates"],
    ],
  },
];

function Dining() {
  const [lb, setLb] = useState<number | null>(null);
  const shots = [
    { src: IMG.dining, alt: "Candlelit dinner table set for two by the ocean" },
    { src: IMG.pendantPool, alt: "Lantern-lit terrace beside the pool at dusk" },
    { src: IMG.loungePool, alt: "Lounge and bar area adjoining the dining room" },
    { src: IMG.heroPool, alt: "The dining terrace and pool after dark" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Dining"
        title="A Kitchen That Cooks for Five Tables"
        intro="Open to guests and to Watamu. Breakfast until eleven, lunch by the pool, dinner by lantern light."
        image={IMG.dining}
        alt="Candlelit dining table with fresh seafood at The Villa @Watamu"
      />

      <section className="py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="The Concept" title="Cooked Close to Where It Grew" />
            <div className="mt-8 space-y-6 text-[0.95rem] leading-8 text-muted-foreground">
              <p>
                Our chef buys from the morning boats at Watamu beach and from Gede market,
                and cooks the food of this coast: Swahili, Indian Ocean, generous with
                coconut, tamarind, cardamom and chilli.
              </p>
              <p>
                Because we only ever serve a handful of tables, the menu changes with what
                came in that day. Tell us in advance about allergies, vegetarian preferences
                or a birthday, and the kitchen will build the evening around it.
              </p>
              <p>
                Private dinners can be laid anywhere on the property — the pool deck, the
                garden, or a single table at the water's edge.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="zoom-frame">
              <img
                src={IMG.dining}
                alt="Seafood plated on a candlelit table under a makuti roof"
                loading="lazy"
                width={1280}
                height={960}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy py-28 text-cream">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Sample Menu"
              title="A Recent Evening"
              align="center"
              tone="light"
              intro="Indicative only — the boats decide."
            />
          </Reveal>
          <div className="mt-16 grid gap-14 md:grid-cols-3">
            {MENU.map((section, i) => (
              <Reveal key={section.course} delay={i * 140}>
                <h3 className="text-2xl text-gold">{section.course}</h3>
                <ul className="mt-8 space-y-7">
                  {section.items.map(([name, desc]) => (
                    <li key={name}>
                      <p className="font-display text-xl text-cream">{name}</p>
                      <p className="mt-1 text-sm leading-7 text-cream/60">{desc}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <SectionHeading eyebrow="Atmosphere" title="The Room, After Dark" align="center" />
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {shots.map((img, i) => (
              <Reveal key={img.alt} delay={i * 110}>
                <button
                  type="button"
                  onClick={() => setLb(i)}
                  className="zoom-frame block aspect-[3/4] w-full"
                  aria-label={`Open image: ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    width={800}
                    height={1066}
                    className="h-full w-full object-cover"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Lightbox items={shots} index={lb} onClose={() => setLb(null)} onIndexChange={setLb} />

      <BookStrip
        title="Reserve a Table"
        copy="Non-resident diners are welcome. Please book at least a day ahead."
      />
    </>
  );
}
