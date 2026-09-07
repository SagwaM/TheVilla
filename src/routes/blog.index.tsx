import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import { BookStrip } from "@/components/site/BookStrip";
import { BLOG_CATEGORIES, POSTS, formatDate, readTime } from "@/lib/blog";
import { IMG } from "@/lib/gallery";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal — Stories from The Villa @Watamu" },
      {
        name: "description",
        content:
          "Guides to Watamu, wellness, coastal dining and life at the villa — written by the team at The Villa @Watamu, Kenya.",
      },
      { property: "og:title", content: "Journal — Stories from The Villa @Watamu" },
      {
        property: "og:description",
        content: "Watamu guides, wellness notes and coastal kitchen stories from our five-suite sanctuary.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [cat, setCat] = useState<(typeof BLOG_CATEGORIES)[number]>("All");

  const posts = useMemo(
    () =>
      [...POSTS]
        .filter((p) => cat === "All" || p.category === cat)
        .sort((a, b) => (a.date < b.date ? 1 : -1)),
    [cat],
  );

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Stories from the Villa"
        intro="Guides to Watamu, notes on rest, and what's happening in our kitchen and gardens."
        image={IMG.grounds}
        alt="Palm-shaded gardens at The Villa @Watamu"
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {BLOG_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={cn(
                  "font-sans text-[0.62rem] uppercase tracking-[0.2em] transition-colors duration-300",
                  cat === c ? "text-gold" : "text-muted-foreground hover:text-ink",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 90} as="article">
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group block h-full border border-border bg-card"
                >
                  <div className="overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.imageAlt}
                      loading="lazy"
                      width={1600}
                      height={1000}
                      className="h-60 w-full object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-calm)] group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7">
                    <p className="eyebrow text-gold">{post.category}</p>
                    <h2 className="mt-4 font-display text-2xl leading-snug text-ink">{post.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
                    <p className="mt-6 font-sans text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {formatDate(post.date)} · {readTime(post)} min read
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookStrip />
    </>
  );
}
