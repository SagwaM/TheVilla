import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % TESTIMONIALS.length),
      7000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="bg-navy py-28 text-cream">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <p className="eyebrow">In Guests' Words</p>
        <Quote className="mx-auto mt-8 h-8 w-8 text-gold" strokeWidth={1} />
        <div className="relative mt-8 min-h-[16rem] sm:min-h-[13rem]">
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={t.name}
              aria-hidden={i !== active}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 [transition-timing-function:var(--ease-calm)]",
                i === active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <p className="font-display text-2xl leading-relaxed text-cream md:text-3xl">
                “{t.quote}”
              </p>
              <footer className="mt-8 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-cream/55">
                {t.name} · <span className="text-gold">{t.source}</span>
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-10 flex justify-center gap-3">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              aria-label={`Show review from ${t.name}`}
              className={cn(
                "h-1.5 w-8 transition-colors duration-500",
                i === active ? "bg-gold" : "bg-cream/20 hover:bg-cream/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
