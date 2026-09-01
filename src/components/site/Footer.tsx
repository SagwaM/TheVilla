import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Plane } from "lucide-react";
import { toast } from "sonner";
import { NAV, SITE } from "@/lib/site";
import logo from "@/assets/logo-palm.png";

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <img src={logo} alt="" width={512} height={512} loading="lazy" className="h-14 w-14" />
          <p className="mt-5 font-display text-2xl text-cream">
            The Villa <span className="text-gold">@</span>Watamu
          </p>
          <p className="mt-4 max-w-xs text-sm leading-7">
            A five-suite healing sanctuary and restaurant on the Kenyan coast. Relax.
            Reconnect. Rejuvenate.
          </p>
          <div className="mt-6 flex items-center gap-5">
            {[
              { href: SITE.instagram, label: "Instagram", Icon: Instagram },
              { href: SITE.facebook, label: "Facebook", Icon: Facebook },
              { href: SITE.tripadvisor, label: "TripAdvisor", Icon: Plane },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="transition-colors hover:text-gold"
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="eyebrow">Explore</h3>
          <ul className="mt-6 space-y-3">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm transition-colors hover:text-gold"
                  activeProps={{ className: "text-gold" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/book" className="text-sm transition-colors hover:text-gold">
                Book Your Stay
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Contact</h3>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              {SITE.location}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <a href={SITE.phoneHref} className="hover:text-gold">
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <a href={SITE.emailHref} className="hover:text-gold">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Letters from the coast</h3>
          <p className="mt-6 text-sm leading-7">
            Seasonal offers, retreat dates and slow-travel notes. A few times a year, never
            more.
          </p>
          <form
            className="mt-6 flex"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes("@")) {
                toast.error("Please enter a valid email address.");
                return;
              }
              toast.success("Thank you — you're on the list.");
              setEmail("");
            }}
          >
            <label htmlFor="newsletter" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full border border-cream/20 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-gold px-5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-gold-foreground transition-colors hover:bg-gold-soft"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-[0.7rem] tracking-wide text-cream/45 md:flex-row md:items-center md:justify-between md:px-10">
          <p>© {new Date().getFullYear()} The Villa @Watamu. All rights reserved.</p>
          <p className="flex gap-5">
            <Link to="/privacy" className="hover:text-gold">
              Privacy Policy
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer noopener" className="hover:text-gold">
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
