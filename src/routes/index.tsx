import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BedDouble,
  Check,
  ChefHat,
  Flower2,
  Sofa,
  SunMedium,
  Waves,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { CtaLink, SectionHeading } from "@/components/site/ui";
import { Testimonials } from "@/components/site/Testimonials";
import { Lightbox } from "@/components/site/Lightbox";
import { GALLERY, IMG } from "@/lib/gallery";
import { SUITES, SUITE_AMENITIES } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Villa @Watamu — Boutique Healing Sanctuary & Restaurant" },
      {
        name: "description",
        content:
          "A five-suite boutique healing sanctuary and restaurant in Watamu, Kenya. Pool, jacuzzi, wellness space and coastal cuisine. Relax. Reconnect. Rejuvenate.",
      },
      { property: "og:title", content: "The Villa @Watamu — Boutique Healing Sanctuary" },
      {
        property: "og:description",
        content:
          "Five luxury guest suites, a restaurant and a wellness space on the Kenyan coast.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const AMENITIES = [
  { Icon: BedDouble, label: "5 Luxury Guest Suites" },
  { Icon: ChefHat, label: "Restaurant & Dining" },
  { Icon: Sofa, label: "Lounge & Kitchen" },
  { Icon: Waves, label: "Jacuzzi & Swimming Pool" },
  { Icon: Flower2, label: "Wellness Space" },
  { Icon: SunMedium, label: "Solar Powered, KPLC Backup" },
];

function Home() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="ken-burns h-full w-full object-cover"
            poster={IMG.heroPool}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
          />
          <img
            src={IMG.heroPool}
            alt="The lantern-lit pool at The Villa @Watamu at night, framed by palm trees"
            width={1920}
            height={1080}
            fetchPriority="high"
            className="ken-burns absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 md:px-10">
          <div className="max-w-3xl">
            <p
              className="rise-in eyebrow text-gold-soft"
              style={{ animationDelay: "150ms" }}
            >
              Boutique Healing Sanctuary
            </p>
            <h1
              className="rise-in mt-6 text-6xl leading-[0.95] text-cream sm:text-7xl md:text-8xl"
              style={{ animationDelay: "300ms" }}
            >
              The Villa <span className="text-gold">@</span>Watamu
            </h1>
            <p
              className="rise-in mt-8 max-w-xl text-base leading-9 text-cream/80"
              style={{ animationDelay: "500ms" }}
            >
              A boutique healing sanctuary and restaurant in the heart of Watamu.
              <span className="mt-2 block font-display text-2xl tracking-wide text-cream">
                Relax. Reconnect. Rejuvenate.
              </span>
            </p>
            <div
              className="rise-in mt-10 flex flex-wrap gap-4"
              style={{ animationDelay: "700ms" }}
            >
              <CtaLink to="/about" variant="gold">
                Discover the Villa
              </CtaLink>
              <CtaLink to="/book" variant="light">
                Book Your Stay
              </CtaLink>
            </div>
          </div>
        </div>

        <a
          href="#amenities"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-sans text-[0.6rem] uppercase tracking-[0.3em] text-cream/50 transition-colors hover:text-gold"
        >
          Scroll
        </a>
      </section>

      {/* Amenities strip */}
      <section id="amenities" className="bg-cream-deep py-16">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-6 md:px-10 lg:grid-cols-6">
          {AMENITIES.map(({ Icon, label }, i) => (
            <Reveal as="li" key={label} delay={i * 110} className="text-center">
              <Icon className="mx-auto h-8 w-8 text-gold" strokeWidth={1} />
              <p className="mt-4 font-sans text-[0.62rem] uppercase leading-5 tracking-[0.16em] text-foreground/80">
                {label}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Welcome */}
      <section className="py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Welcome to Your Sanctuary"
              title="Luxury. Comfort. Healing. Together."
            />
            <div className="mt-8 space-y-6 text-[0.95rem] leading-8 text-muted-foreground">
              <p>
                The Villa @Watamu is a private boutique retreat of only five suites, set
                among palms a few minutes from the white sand and turquoise shallows of
                Watamu Marine Park. It was built to be lived in slowly.
              </p>
              <p>
                Under one roof you'll find accommodation, a restaurant serving Swahili-coast
                cuisine, a wellness space for massage and quiet, and the kind of coastal
                hospitality that remembers your name. Nothing here is scaled for crowds.
              </p>
            </div>
            <div className="mt-10">
              <CtaLink to="/about" variant="outline">
                Learn More About Us
              </CtaLink>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {[
              { src: IMG.detailBathroom, alt: "Stone basin and brass tap in a villa en-suite bathroom" },
              { src: IMG.suiteCanopy, alt: "Hand-carved canopy bed with white netting in a guest suite" },
              { src: IMG.loungePool, alt: "Guest lounge with pool table and rattan armchairs" },
              { src: IMG.pendantPool, alt: "Woven pendant lanterns above the pool at dusk" },
            ].map((img, i) => (
              <Reveal key={img.alt} delay={i * 120}>
                <div className="zoom-frame aspect-square">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="bg-cream-deep py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <div className="zoom-frame">
                <img
                  src={IMG.suiteCanopy}
                  alt="The Baharini Suite with its carved four-poster canopy bed"
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <SectionHeading
                eyebrow="Accommodation"
                title="5 Luxury Guest Suites"
                intro="Each suite is individually finished in lime plaster, coral stone and hand-carved Lamu timber. No two are alike, and all of them open to air and light."
              />
              <ul className="mt-8 space-y-4">
                {SUITE_AMENITIES.map((a) => (
                  <li key={a} className="flex items-center gap-4">
                    <Check className="h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                    <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-foreground/80">
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <CtaLink to="/accommodation">View Suites</CtaLink>
              </div>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SUITES.slice(0, 3).map((s, i) => (
              <Reveal key={s.slug} delay={i * 120}>
                <Link to="/accommodation" className="group block bg-card shadow-[var(--shadow-soft)]">
                  <div className="zoom-frame aspect-[4/3]">
                    <img
                      src={i === 0 ? IMG.suiteCanopy : i === 1 ? IMG.detailBathroom : IMG.loungePool}
                      alt={`${s.name} at The Villa @Watamu`}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-7">
                    <p className="eyebrow">{s.subtitle}</p>
                    <h3 className="mt-3 text-2xl text-ink">{s.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {s.size} · {s.sleeps}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dining preview */}
      <section className="py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Dining"
              title="A Kitchen That Cooks for Five Tables"
              intro="Our restaurant is open to guests and to Watamu. Line-caught fish from the morning boats, coconut and tamarind, produce from Gede market, and long candlelit dinners under the makuti roof."
            />
            <div className="mt-10">
              <CtaLink to="/dining" variant="outline">
                Explore Dining
              </CtaLink>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="zoom-frame">
              <img
                src={IMG.dining}
                alt="Candlelit dinner table set with fresh seafood overlooking the ocean"
                loading="lazy"
                width={1280}
                height={960}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Wellness preview */}
      <section className="bg-cream-deep py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-2">
          <Reveal>
            <div className="zoom-frame">
              <img
                src={IMG.wellness}
                alt="Massage table dressed in white linen beside the jacuzzi in the wellness room"
                loading="lazy"
                width={1280}
                height={960}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Wellness"
              title="The Healing Part of the Sanctuary"
              intro="Deep-tissue and Swahili oil massage, jacuzzi hydrotherapy, sunrise yoga on the terrace and breathwork by the pool. Booked by the treatment or as a multi-day reset."
            />
            <div className="mt-10">
              <CtaLink to="/wellness" variant="outline">
                Explore Wellness
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Testimonials />

      {/* Gallery strip */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="@thevillawatamu"
              title="Moments from the Villa"
              align="center"
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {GALLERY.slice(0, 6).map((img, i) => (
              <Reveal key={img.alt} delay={i * 90}>
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="zoom-frame block aspect-square w-full"
                  aria-label={`Open image: ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="h-full w-full object-cover"
                  />
                </button>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <CtaLink to="/gallery" variant="outline">
              View Full Gallery
            </CtaLink>
          </div>
        </div>
      </section>

      <Lightbox
        items={GALLERY.slice(0, 6)}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={setLightbox}
      />

      {/* Final CTA */}
      <section className="relative overflow-hidden py-32">
        <img
          src={IMG.pendantPool}
          alt="Warm lantern light over the villa pool at dusk"
          loading="lazy"
          width={1024}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <Reveal className="relative mx-auto max-w-2xl px-6 text-center">
          <p className="eyebrow">Your Room Is Waiting</p>
          <h2 className="mt-5 text-5xl text-cream md:text-6xl">Ready to Unwind?</h2>
          <p className="mt-6 text-[0.95rem] leading-8 text-cream/75">
            Five suites, one kitchen, and a stretch of the Kenyan coast that does the rest.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CtaLink to="/book">Book Your Stay</CtaLink>
            <CtaLink to="/contact" variant="light">
              Ask a Question
            </CtaLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
