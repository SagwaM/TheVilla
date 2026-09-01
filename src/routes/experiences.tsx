import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import { BookStrip } from "@/components/site/BookStrip";
import { IMG } from "@/lib/gallery";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Experiences & Excursions — The Villa @Watamu" },
      {
        name: "description",
        content:
          "Snorkelling in Watamu Marine Park, Mida Creek dhow sunsets, Gede Ruins, Arabuko-Sokoke forest and private add-on packages arranged by The Villa @Watamu.",
      },
      { property: "og:title", content: "Experiences — The Villa @Watamu" },
      {
        property: "og:description",
        content: "Marine park, mangroves, ruins and forest — arranged from the villa.",
      },
      { property: "og:url", content: "/experiences" },
    ],
    links: [{ rel: "canonical", href: "/experiences" }],
  }),
  component: Experiences,
});

const EXPERIENCES = [
  {
    title: "Watamu Marine Park Snorkelling",
    duration: "Half day",
    body: "Out on the morning tide to the coral gardens inside one of Africa's oldest marine reserves. Turtles, angelfish and enough clear water to see the bottom at ten metres.",
    image: IMG.dhow,
    alt: "Boat on the clear turquoise water of Watamu Marine Park",
  },
  {
    title: "Mida Creek Dhow at Sunset",
    duration: "3 hours",
    body: "A slow sail through the mangroves as the light drops, with crab samosas and a cold drink on the boardwalk afterwards.",
    image: IMG.heroPool,
    alt: "Warm evening light over the water near Mida Creek",
  },
  {
    title: "Gede Ruins & Arabuko-Sokoke",
    duration: "Half day",
    body: "The abandoned Swahili town at Gede, swallowed by forest, followed by the coastal forest itself — elephant shrews, Sokoke scops owls and complete shade.",
    image: IMG.grounds,
    alt: "Dense coastal forest and palms near Gede",
  },
  {
    title: "Deep-Sea Fishing",
    duration: "Full day",
    body: "Sailfish, kingfish and dorado from the channel beyond the reef, with a licensed skipper. Whatever you land, the kitchen will cook that night.",
    image: IMG.dining,
    alt: "Fresh line-caught seafood prepared at the villa",
  },
];

const PACKAGES = [
  {
    name: "The Long Weekend",
    detail: "3 nights · suite, all breakfasts, one dinner, one massage, one excursion",
  },
  {
    name: "Honeymoon at the Villa",
    detail: "5 nights · private dinner on the deck, couples massage, dhow sunset, late checkout",
  },
  {
    name: "Villa Takeover",
    detail: "All 5 suites · exclusive use, dedicated chef, bespoke itinerary for up to 12 guests",
  },
];

function Experiences() {
  return (
    <>
      <PageHero
        eyebrow="Experiences"
        title="What's Beyond the Gate"
        intro="Everything below is arranged by our team, with people we know and use ourselves. Booked from the villa, on the morning you feel like it."
        image={IMG.dhow}
        alt="A traditional dhow anchored on turquoise water off Watamu"
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl space-y-20 px-6 md:px-10">
          {EXPERIENCES.map((exp, i) => (
            <Reveal key={exp.title}>
              <article className="grid items-center gap-12 lg:grid-cols-2">
                <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                  <div className="zoom-frame">
                    <img
                      src={exp.image}
                      alt={exp.alt}
                      loading="lazy"
                      width={1280}
                      height={960}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : undefined}>
                  <p className="eyebrow">{exp.duration}</p>
                  <h2 className="mt-4 text-3xl text-ink md:text-4xl">{exp.title}</h2>
                  <span className="rule-gold mt-6" />
                  <p className="mt-6 text-[0.95rem] leading-8 text-muted-foreground">
                    {exp.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream-deep py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Add-Ons"
              title="Packages"
              align="center"
              intro="Put together for guests who'd rather not plan. All are adjustable."
            />
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {PACKAGES.map((p, i) => (
              <Reveal key={p.name} delay={i * 130}>
                <div className="h-full border-t border-gold/50 bg-card p-10 shadow-[var(--shadow-soft)]">
                  <h3 className="text-2xl text-ink">{p.name}</h3>
                  <p className="mt-5 text-sm leading-8 text-muted-foreground">{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookStrip title="Plan It With Us" copy="Tell us your dates and we'll build the week around them." />
    </>
  );
}
