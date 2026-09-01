import { createFileRoute } from "@tanstack/react-router";
import { Compass, HeartHandshake, Leaf } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import { BookStrip } from "@/components/site/BookStrip";
import { IMG } from "@/lib/gallery";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — The Villa @Watamu" },
      {
        name: "description",
        content:
          "The story behind The Villa @Watamu: a five-suite healing sanctuary on the Kenyan coast, its founders, its philosophy and its place in Watamu.",
      },
      { property: "og:title", content: "Our Story — The Villa @Watamu" },
      {
        property: "og:description",
        content: "How a family home in Watamu became a boutique healing sanctuary.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const PILLARS = [
  {
    Icon: Leaf,
    title: "Healing First",
    body: "Every decision — the pacing of the day, the quiet hours, the food, the light — is made in favour of rest rather than activity.",
  },
  {
    Icon: HeartHandshake,
    title: "Coastal Hospitality",
    body: "Our team is from Watamu and Malindi. What they offer isn't service training; it's the way the coast has always received guests.",
  },
  {
    Icon: Compass,
    title: "Rooted in Place",
    body: "Lamu joinery, coral stone, Gede market produce, morning fish from the boats. The villa belongs to where it stands.",
  },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About the Villa"
        title="A House Built for Resting In"
        intro="Five suites, a kitchen, a pool and a stretch of garden — held together by the idea that a place to stay can also be a place to heal."
        image={IMG.grounds}
        alt="Palm-shaded gardens and thatched roofs at The Villa @Watamu"
      />

      <section className="py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-16 px-6 md:px-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Our Story" title="From Family Home to Sanctuary" />
            <div className="mt-8 space-y-6 text-[0.95rem] leading-8 text-muted-foreground">
              <p>
                The Villa began as a private house, built slowly over several seasons by a
                family who came to Watamu for a holiday and never entirely left. Friends
                came to stay. Then friends of friends. The kitchen kept getting bigger.
              </p>
              <p>
                In time it became clear the house wanted to be shared. Rather than convert
                it into a hotel, we kept it exactly as it was — five bedrooms, one long
                dining table, one pool — and opened the gate.
              </p>
              <p>
                What we added was intention: a wellness room, a proper chef, solar power
                with KPLC backup so the lights never falter, and a team who understand that
                the most valuable thing we offer guests is uninterrupted quiet.
              </p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="zoom-frame">
              <img
                src={IMG.loungePool}
                alt="The villa lounge with pool table, rattan seating and ocean view"
                loading="lazy"
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy py-28 text-cream">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <Reveal>
            <p className="eyebrow">A Note from the Founders</p>
            <p className="mt-8 font-display text-2xl leading-relaxed text-cream md:text-3xl">
              “We are not trying to be the biggest thing in Watamu. We are trying to be the
              place you think about six months later, when you are back at your desk and
              you remember what the water sounded like at four in the morning.”
            </p>
            <p className="mt-8 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-cream/55">
              The Villa @Watamu · Owners & Hosts
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Our Philosophy"
              title="What “Healing Sanctuary” Actually Means"
              align="center"
              intro="Not a wellness slogan. Three commitments we hold ourselves to on every stay."
            />
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {PILLARS.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 130} className="border-t border-gold/40 pt-8">
                <Icon className="h-8 w-8 text-gold" strokeWidth={1} />
                <h3 className="mt-6 text-2xl text-ink">{title}</h3>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-deep py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-2">
          <Reveal>
            <div className="zoom-frame">
              <img
                src={IMG.dhow}
                alt="A wooden dhow anchored on the turquoise water off Watamu"
                loading="lazy"
                width={1280}
                height={960}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Where We Are"
              title="Watamu, Kilifi County"
              intro="Watamu sits on Kenya's north coast, about two hours from Mombasa and twenty minutes from Malindi airstrip. It is best known for Watamu Marine National Park — one of the oldest marine reserves in Africa — the mangrove channels of Mida Creek, and the Arab-Swahili ruins at Gede."
            />
            <p className="mt-6 text-[0.95rem] leading-8 text-muted-foreground">
              The villa is a few minutes from the beach, set back far enough that the only
              sound at night is wind in the palms. Airport transfers from Malindi or Mombasa
              can be arranged with your booking.
            </p>
          </Reveal>
        </div>
      </section>

      <BookStrip />
    </>
  );
}
