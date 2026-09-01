import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] px-8 py-4 rounded-none transition-all duration-500 [transition-timing-function:var(--ease-calm)] hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

const styles = {
  gold: "bg-gold text-gold-foreground hover:bg-gold-soft",
  outline: "border border-gold text-gold hover:bg-gold hover:text-gold-foreground",
  light: "border border-cream/70 text-cream hover:bg-cream hover:text-ink",
  ink: "bg-ink text-ink-foreground hover:bg-navy",
} as const;

type Variant = keyof typeof styles;

export function CtaLink({
  to,
  children,
  variant = "gold",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link to={to} className={cn(base, styles[variant], className)}>
      {children}
    </Link>
  );
}

export function CtaAnchor({
  href,
  children,
  variant = "gold",
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={cn(base, styles[variant], className)} {...rest}>
      {children}
    </a>
  );
}

export function CtaButton({
  children,
  variant = "gold",
  className,
  ...rest
}: { children: ReactNode; variant?: Variant } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, styles[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2
        className={cn(
          "mt-4 text-4xl md:text-5xl",
          tone === "light" ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </h2>
      <span className={cn("rule-gold mt-6", align === "center" && "mx-auto")} />
      {intro ? (
        <p
          className={cn(
            "mt-6 text-[0.95rem] leading-8",
            tone === "light" ? "text-cream/75" : "text-muted-foreground",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  alt,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  alt: string;
}) {
  return (
    <header className="relative flex h-[62vh] min-h-[420px] items-end overflow-hidden">
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 md:px-10">
        <div className="rise-in max-w-3xl">
          <p className="eyebrow text-gold-soft">{eyebrow}</p>
          <h1 className="mt-4 text-5xl text-cream md:text-7xl">{title}</h1>
          {intro ? (
            <p className="mt-6 max-w-xl text-[0.95rem] leading-8 text-cream/80">{intro}</p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
