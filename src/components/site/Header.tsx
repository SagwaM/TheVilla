import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Menu, Phone, Plane, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-palm.png";

function Socials({ className }: { className?: string }) {
  const items = [
    { href: SITE.instagram, label: "Instagram", Icon: Instagram },
    { href: SITE.facebook, label: "Facebook", Icon: Facebook },
    { href: SITE.tripadvisor, label: "TripAdvisor", Icon: Plane },
  ];
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={label}
          className="text-cream/60 transition-colors duration-300 hover:text-gold"
        >
          <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
}

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname !== "/privacy";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || !overHero;

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-ink text-cream/70 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 md:px-10">
          <div className="flex items-center gap-6 font-sans text-[0.65rem] tracking-[0.14em] uppercase">
            <span className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-gold" strokeWidth={1.5} /> {SITE.location}
            </span>
            <a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-gold">
              <Phone className="h-3 w-3 text-gold" strokeWidth={1.5} /> {SITE.phone}
            </a>
            <a href={SITE.emailHref} className="flex items-center gap-2 hover:text-gold">
              <Mail className="h-3 w-3 text-gold" strokeWidth={1.5} /> {SITE.email}
            </a>
          </div>
          <Socials />
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={cn(
          "transition-all duration-700 [transition-timing-function:var(--ease-calm)]",
          solid
            ? "bg-card/95 shadow-[var(--shadow-soft)] backdrop-blur-md"
            : "bg-transparent",
        )}
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-10">
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label={SITE.name}>
            <img
              src={logo}
              alt=""
              width={512}
              height={512}
              className={cn(
                "h-11 w-11 transition-opacity duration-500",
                solid ? "opacity-100" : "opacity-95",
              )}
            />
            <span
              className={cn(
                "font-display text-lg leading-tight tracking-wide transition-colors duration-500 sm:text-xl",
                solid ? "text-ink" : "text-cream",
              )}
            >
              The Villa <span className="text-gold">@</span>Watamu
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className={cn(
                    "font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 hover:text-gold",
                    solid ? "text-foreground" : "text-cream/85",
                  )}
                  activeProps={{ className: "text-gold" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/book"
              className="hidden bg-gold px-6 py-3 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-foreground transition-all duration-500 [transition-timing-function:var(--ease-calm)] hover:scale-[1.04] hover:bg-gold-soft sm:inline-flex"
            >
              Book Your Stay
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={cn(
                "p-2 transition-colors lg:hidden",
                solid ? "text-ink" : "text-cream",
              )}
            >
              {open ? <Menu className="hidden" /> : null}
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={cn(
            "overflow-hidden border-t border-border bg-card transition-[max-height,opacity] duration-500 lg:hidden",
            open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <ul className="px-6 py-4">
            {NAV.map((item) => (
              <li key={item.to} className="border-b border-border/60 last:border-0">
                <Link
                  to={item.to}
                  className="block py-3 font-sans text-[0.7rem] uppercase tracking-[0.2em] text-foreground"
                  activeProps={{ className: "text-gold" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                to="/book"
                className="block bg-gold px-6 py-3 text-center font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-foreground"
              >
                Book Your Stay
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
