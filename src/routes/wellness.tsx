import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Flower2, Sunrise, Wind } from "lucide-react";
import { CtaAnchor, CtaLink, PageHero, SectionHeading } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import { BookStrip } from "@/components/site/BookStrip";
import { IMG } from "@/lib/gallery";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/wellness")({
  head: () => ({
    meta: [
      { title: "Wellness, Spa & Jacuzzi — The Villa @Watamu" },
      {
        name: "description",
        content:
          "Massage, jacuzzi hydrotherapy, sunrise yoga and breathwork at The Villa @Watamu, a boutique healing sanctuary in Watamu, Kenya.",
      },
      { property: "og:title", content: "Wellness & Healing — The Villa @Watamu" },
      {
        property: "og:description",
        content: "Treatments, jacuzzi and multi-day reset retreats on the Kenyan coast.",
      },
      { property: "og:url", content: "/wellness" },
    ],
    links: [{ rel: "canonical", href: "/wellness" }],
  }),
  component: Wellness,
});

const TREATMENTS = [
  {
    Icon: Flower2,
    name: "Swahili Oil Massage",
    duration: "60 / 90 min",
    body: "Warm coconut and frangipani oil, long slow strokes. The treatment most guests book on their first afternoon.",
  },
  {
    Icon: Droplets,
    name: "Jacuzzi Hydrotherapy",
    duration: "45 min",
    body: "Heated jets and mineral salts, taken before or after a treatment. Private booking, one party at a time.",
  },
  {
    Icon: Sunrise,
    name: "Sunrise Yoga",
    duration: "75 min",
    body: "On the upper terrace as the light comes up, with a visiting teacher. Suitable for all levels.",
  },
  {
    Icon: Wind,
    name: "Breathwork & Stillness",
    duration: "50 min",
    body: "Guided breathing and silence beside the pool — the simplest and, for many, the most useful thing we offer.",
  },
];

function Wellness() {
  return (
    <>
      <PageHero
        eyebrow="Wellness"
        title="The Healing Part of the Sanctuary"
        intro="Treatments taken singly, or strung together across a few days into a proper reset."
        image={IMG.wellness}
        alt="The wellness room at The Villa @Watamu with massage table and jacuzzi"
      />

      <section className="py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-2">
          <Reveal>
            <div className="zoom-frame">
              <img
                src={IMG.wellness}
                alt="Candlelit massage table with folded robes beside the jacuzzi"
                loading="lazy"
                width={1280}
                height={960}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Our Approach"
              title="Rest Is the Treatment"
              intro="We are not a clinical spa. There is one treatment room, one therapist at a time, and no schedule you have to keep up with."
            />
            <div className="mt-6 space-y-6 text-[0.95rem] leading-8 text-muted-foreground">
              <p>
                Most guests arrive tired in a way that a single massage won't fix. So we
                build the week instead: a treatment on arrival, water and sleep, a second
                mid-stay, movement in the mornings, and food that supports rather than
                weighs.
              </p>
              <p>
                Tell us what you're carrying when you book — physical, or otherwise — and
                we'll shape the sequence with you before you land.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <CtaLink to="/contact" variant="outline">
                Enquire About Wellness
              </CtaLink>
              <CtaAnchor href={SITE.whatsapp} target="_blank" rel="noreferrer noopener">
                WhatsApp Us
              </CtaAnchor>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-deep py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <SectionHeading eyebrow="Offerings" title="What You Can Book" align="center" />
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {TREATMENTS.map(({ Icon, name, duration, body }, i) => (
              <Reveal key={name} delay={i * 120}>
                <article className="h-full bg-card p-10 shadow-[var(--shadow-soft)]">
                  <Icon className="h-8 w-8 text-gold" strokeWidth={1} />
                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl text-ink">{name}</h3>
                    <span className="font-sans text-[0.6rem] uppercase tracking-[0.18em] text-gold">
                      {duration}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-8 text-muted-foreground">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-28 text-cream">
        <Reveal className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="eyebrow">Multi-Day</p>
          <h2 className="mt-5 text-4xl text-cream md:text-5xl">The Five-Night Reset</h2>
          <span className="rule-gold mx-auto mt-6" />
          <p className="mt-6 text-[0.95rem] leading-8 text-cream/70">
            Three treatments, daily movement, a tailored menu, one guided excursion and
            complete quiet in between. Limited to two guests at a time so the villa stays
            still. Dates and rates on request.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CtaLink to="/contact">Request Dates</CtaLink>
          </div>
        </Reveal>
      </section>

      <BookStrip />
    </>
  );
}
