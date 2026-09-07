import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { BookStrip } from "@/components/site/BookStrip";
import { getPost, relatedPosts, formatDate, readTime, type Post } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post, related: relatedPosts(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Story not found — The Villa @Watamu" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.metaTitle} — The Villa @Watamu` },
        { name: "description", content: post.metaDescription },
        { property: "og:title", content: post.metaTitle },
        { property: "og:description", content: post.metaDescription },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
    };
  },
  notFoundComponent: PostNotFound,
  errorComponent: PostNotFound,
  component: BlogPost,
});

function PostNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-40 text-center">
      <p className="eyebrow">Journal</p>
      <h1 className="mt-4 font-display text-4xl text-ink">This story isn't here</h1>
      <p className="mt-4 text-sm text-muted-foreground">It may have been moved or renamed.</p>
      <Link to="/blog" className="mt-8 inline-flex text-sm text-gold hover:underline">
        Back to the journal
      </Link>
    </div>
  );
}

function Body({ post }: { post: Post }) {
  return (
    <div className="mx-auto max-w-3xl">
      {post.body.map((block, i) => {
        if (block.type === "h2") {
          return (
            <Reveal key={i} className="mt-14">
              <h2 className="font-display text-3xl text-ink">{block.text}</h2>
              <span className="rule-gold mt-5 block" />
            </Reveal>
          );
        }
        if (block.type === "quote") {
          return (
            <Reveal key={i} className="mt-12">
              <blockquote className="border-l-2 border-gold bg-cream/60 px-8 py-7">
                <p className="font-display text-2xl leading-relaxed text-ink">{block.text}</p>
              </blockquote>
            </Reveal>
          );
        }
        if (block.type === "image") {
          return (
            <Reveal key={i} className="mt-12">
              <figure>
                <img
                  src={block.src}
                  alt={block.alt}
                  loading="lazy"
                  width={1600}
                  height={1000}
                  className="w-full object-cover"
                />
                {block.caption ? (
                  <figcaption className="mt-3 font-sans text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            </Reveal>
          );
        }
        return (
          <Reveal key={i} className="mt-7">
            <p className="text-[0.98rem] leading-9 text-foreground/85">{block.text}</p>
          </Reveal>
        );
      })}
    </div>
  );
}

function BlogPost() {
  const { post, related } = Route.useLoaderData();

  return (
    <>
      <header className="relative flex h-[70vh] min-h-[460px] items-end overflow-hidden">
        <img
          src={post.image}
          alt={post.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          width={1600}
          height={1000}
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 md:px-10">
          <div className="rise-in max-w-3xl">
            <p className="eyebrow text-gold-soft">{post.category}</p>
            <h1 className="mt-4 font-display text-4xl text-cream md:text-6xl">{post.title}</h1>
            <p className="mt-6 font-sans text-[0.62rem] uppercase tracking-[0.18em] text-cream/70">
              {formatDate(post.date)} · {readTime(post)} min read
            </p>
          </div>
        </div>
      </header>

      <article className="py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-sans text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> All stories
          </Link>
          <div className="mt-10">
            <Body post={post} />
          </div>
        </div>
      </article>

      <BookStrip
        title="Ready to Unwind?"
        copy="Five suites only, a few steps from the beach in Watamu. We reply to every request within one working day."
      />

      {related.length > 0 ? (
        <section className="bg-cream py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="eyebrow">Keep reading</p>
            <h2 className="mt-4 font-display text-3xl text-ink">Related Stories</h2>
            <span className="rule-gold mt-5 block" />
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 90} as="article">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: r.slug }}
                    className="group block h-full border border-border bg-card"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={r.image}
                        alt={r.imageAlt}
                        loading="lazy"
                        width={1600}
                        height={1000}
                        className="h-48 w-full object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-calm)] group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <p className="eyebrow text-gold">{r.category}</p>
                      <h3 className="mt-3 font-display text-xl leading-snug text-ink">{r.title}</h3>
                      <p className="mt-4 font-sans text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                        {formatDate(r.date)} · {readTime(r)} min read
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
