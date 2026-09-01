import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BedDouble, Check, Maximize, Users } from "lucide-react";
import { CtaLink, PageHero, SectionHeading } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import { BookStrip } from "@/components/site/BookStrip";
import { Lightbox } from "@/components/site/Lightbox";
import { IMG } from "@/lib/gallery";
import { SUITES, SUITE_AMENITIES } from "@/lib/site";

export const Route = createFileRoute("/accommodation")({
  head: () => ({
    meta: [
      { title: "5 Luxury Guest Suites — The Villa @Watamu" },
      {
        name: "description",
        content:
          "Five individually designed luxury guest suites in Watamu, Kenya. Air conditioning, en-suite bathrooms, private terraces, Wi-Fi and daily housekeeping.",
      },
      { property: "og:title", content: "5 Luxury Guest Suites — The Villa @Watamu" },
      {
        property: "og:description",
        content: "Canopy beds, private terraces and coral-stone bathrooms in Watamu, Kenya.",
      },
      { property: "og:url", content: "/accommodation" },
    ],
    links: [{ rel: "canonical", href: "/accommodation" }],
  }),
  component: Accommodation,
});

const SUITE_IMAGES = [
  [IMG.suiteCanopy, IMG.detailBathroom, IMG.pendantPool],
  [IMG.grounds, IMG.suiteCanopy, IMG.detailBathroom],
  [IMG.pendantPool, IMG.loungePool, IMG.suiteCanopy],
  [IMG.detailBathroom, IMG.grounds, IMG.suiteCanopy],
  [IMG.loungePool, IMG.suiteCanopy, IMG.grounds],
];

function Accommodation() {
  const [lb, setLb] = useState<{ suite: number; index: number } | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Accommodation"
        title="5 Luxury Guest Suites"
        intro="No two rooms are the same. Each opens to air, light and the sound of palms, and each is turned down by hand every evening."
        image={IMG.suiteCanopy}
        alt="A canopy bed suite at The Villa @Watamu"
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Included in Every Suite"
              title="The Things You Shouldn't Have to Ask For"
              align="center"
            />
          </Reveal>
          <ul className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-x-10 gap-y-5">
            {SUITE_AMENITIES.map((a, i) => (
              <Reveal as="li" key={a} delay={i * 90} className="flex items-center gap-3">
                <Check className="h-4 w-4 text-gold" strokeWidth={2} />
                <span className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-foreground/80">
                  {a}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {SUITES.map((suite, si) => (
        <section
          key={suite.slug}
          id={suite.slug}
          className={si % 2 === 0 ? "py-20" : "bg-cream-deep py-20"}
        >
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-2">
            <Reveal className={si % 2 === 1 ? "lg:order-2" : undefined}>
              <button
                type="button"
                onClick={() => setLb({ suite: si, index: 0 })}
                className="zoom-frame block w-full"
                aria-label={`Open photo gallery for ${suite.name}`}
              >
                <img
                  src={(SUITE_IMAGES[si] ?? [])[0]}
                  alt={`${suite.name} — ${suite.subtitle} at The Villa @Watamu`}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="aspect-[4/3] w-full object-cover"
                />
              </button>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {(SUITE_IMAGES[si] ?? []).slice(1).map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setLb({ suite: si, index: i + 1 })}
                    className="zoom-frame block aspect-[4/3] w-full"
                    aria-label={`Open photo ${i + 2} of ${suite.name}`}
                  >
                    <img
                      src={src}
                      alt={`Detail from ${suite.name} at The Villa @Watamu`}
                      loading="lazy"
                      width={640}
                      height={480}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120} className={si % 2 === 1 ? "lg:order-1" : undefined}>
              <p className="eyebrow">Suite {String(si + 1).padStart(2, "0")}</p>
              <h2 className="mt-4 text-4xl text-ink md:text-5xl">{suite.name}</h2>
              <span className="rule-gold mt-6" />
              <p className="mt-6 text-[0.95rem] leading-8 text-muted-foreground">
                {suite.blurb}
              </p>
              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 font-sans text-[0.65rem] uppercase tracking-[0.16em] text-foreground/75">
                <div className="flex items-center gap-3">
                  <Maximize className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  <dt className="sr-only">Size</dt>
                  <dd>{suite.size}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  <dt className="sr-only">Occupancy</dt>
                  <dd>{suite.sleeps}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <BedDouble className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  <dt className="sr-only">Bed</dt>
                  <dd>{suite.bed}</dd>
                </div>
              </dl>
              <div className="mt-10">
                <CtaLink to="/book">Book This Suite</CtaLink>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <Lightbox
        items={
          lb
            ? (SUITE_IMAGES[lb.suite] ?? []).map((src, i) => ({
                src,
                alt: `${SUITES[lb.suite]?.name} — photo ${i + 1}`,
              }))
            : []
        }
        index={lb ? lb.index : null}
        onClose={() => setLb(null)}
        onIndexChange={(i) => setLb((prev) => (prev ? { ...prev, index: i } : prev))}
      />

      <BookStrip title="Found Your Suite?" copy="Tell us your dates and we'll hold it for you." />
    </>
  );
}
