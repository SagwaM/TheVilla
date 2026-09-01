import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import { BookStrip } from "@/components/site/BookStrip";
import { Lightbox } from "@/components/site/Lightbox";
import { GALLERY, GALLERY_CATEGORIES, IMG } from "@/lib/gallery";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — The Villa @Watamu" },
      {
        name: "description",
        content:
          "Photographs of The Villa @Watamu: guest rooms, the pool, dining, the gardens and the villa after dark, in Watamu, Kenya.",
      },
      { property: "og:title", content: "Gallery — The Villa @Watamu" },
      {
        property: "og:description",
        content: "Rooms, pool, dining, grounds and night views of our Watamu sanctuary.",
      },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

function Gallery() {
  const [cat, setCat] = useState<(typeof GALLERY_CATEGORIES)[number]>("All");
  const [lb, setLb] = useState<number | null>(null);

  const items = useMemo(
    () => (cat === "All" ? GALLERY : GALLERY.filter((g) => g.category === cat)),
    [cat],
  );

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The Villa, in Pictures"
        intro="Rooms, water, food and light. Click any photograph to view it full size."
        image={IMG.pendantPool}
        alt="Pendant lanterns glowing above the villa pool"
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {GALLERY_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCat(c);
                  setLb(null);
                }}
                aria-pressed={cat === c}
                className={cn(
                  "border-b pb-1 font-sans text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-300",
                  cat === c
                    ? "border-gold text-gold"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((img, i) => (
              <Reveal key={img.alt} delay={(i % 3) * 110}>
                <button
                  type="button"
                  onClick={() => setLb(i)}
                  className="zoom-frame group relative block aspect-[4/3] w-full"
                  aria-label={`Open image: ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 text-left font-sans text-[0.6rem] uppercase tracking-[0.2em] text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {img.category}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Lightbox items={items} index={lb} onClose={() => setLb(null)} onIndexChange={setLb} />

      <BookStrip title="Come See It in Person" />
    </>
  );
}
