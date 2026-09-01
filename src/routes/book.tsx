import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CtaAnchor, CtaButton, PageHero, SectionHeading } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import { IMG } from "@/lib/gallery";
import { SITE, SUITES } from "@/lib/site";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Your Stay — The Villa @Watamu" },
      {
        name: "description",
        content:
          "Check availability and request a suite at The Villa @Watamu in Watamu, Kenya. Rates, deposit and cancellation policy, or book directly by WhatsApp.",
      },
      { property: "og:title", content: "Book Your Stay — The Villa @Watamu" },
      {
        property: "og:description",
        content: "Request dates for one of five suites on the Kenyan coast.",
      },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: Book,
});

const RATES = [
  { season: "Green Season", months: "April – June", rate: "from USD 180", note: "per suite, per night" },
  { season: "Shoulder", months: "July – November", rate: "from USD 240", note: "per suite, per night" },
  { season: "High Season", months: "December – March", rate: "from USD 320", note: "per suite, per night" },
];

const POLICY = [
  ["Deposit", "30% of the total confirms your booking; the balance is due on arrival."],
  ["Free cancellation", "Up to 21 days before arrival, the deposit is refunded in full."],
  ["14–21 days", "50% of the deposit is refunded, or moved to a future stay within 12 months."],
  ["Under 14 days", "The deposit is retained, but we will always try to re-let the suite."],
  ["Included", "Breakfast daily, Wi-Fi, housekeeping, pool and jacuzzi access, and all taxes."],
];

function Book() {
  const [sending, setSending] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title="Book Your Stay"
        intro="Five suites means we hold every booking personally. Send your dates and we'll confirm availability the same day."
        image={IMG.heroPool}
        alt="The lantern-lit pool at The Villa @Watamu at night"
      />

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <form
              className="bg-card p-8 shadow-[var(--shadow-soft)] md:p-12"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                setSending(true);
                window.setTimeout(() => {
                  setSending(false);
                  form.reset();
                  toast.success("Request received — we'll confirm availability shortly.");
                }, 700);
              }}
            >
              <h2 className="text-3xl text-ink">Check Availability</h2>
              <span className="rule-gold mt-5" />

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <Field id="arrive" label="Arrival" type="date" required />
                <Field id="depart" label="Departure" type="date" required />
                <div>
                  <Legend htmlFor="guests">Guests</Legend>
                  <select
                    id="guests"
                    name="guests"
                    className="mt-3 w-full border border-input bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
                  >
                    {["1 guest", "2 guests", "3 guests", "4 guests", "5+ guests"].map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Legend htmlFor="suite">Preferred suite</Legend>
                  <select
                    id="suite"
                    name="suite"
                    className="mt-3 w-full border border-input bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
                  >
                    <option>No preference</option>
                    {SUITES.map((s) => (
                      <option key={s.slug}>{s.name}</option>
                    ))}
                    <option>Exclusive use (all 5 suites)</option>
                  </select>
                </div>
                <Field id="bookname" label="Full name" required />
                <Field id="bookemail" label="Email" type="email" required />
              </div>

              <div className="mt-6">
                <Legend htmlFor="notes">Anything we should know?</Legend>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  className="mt-3 w-full border border-input bg-background px-4 py-3 text-sm leading-7 focus:border-gold focus:outline-none"
                  placeholder="Airport transfers, dietary needs, wellness treatments, celebrations…"
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <CtaButton type="submit" disabled={sending}>
                  {sending ? "Sending…" : "Request Booking"}
                </CtaButton>
                <CtaAnchor
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="outline"
                >
                  Book by WhatsApp
                </CtaAnchor>
              </div>
              <p className="mt-5 text-xs leading-6 text-muted-foreground">
                This is a request, not a charge. Nothing is taken until we confirm your suite
                and send a secure deposit link.
              </p>
            </form>
          </Reveal>

          <div className="space-y-14">
            <Reveal>
              <SectionHeading eyebrow="Rates" title="What a Night Costs" />
              <ul className="mt-8 divide-y divide-border border-y border-border">
                {RATES.map((r) => (
                  <li key={r.season} className="flex items-baseline justify-between gap-6 py-5">
                    <div>
                      <p className="font-display text-xl text-ink">{r.season}</p>
                      <p className="font-sans text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                        {r.months}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-xl text-gold">{r.rate}</p>
                      <p className="text-xs text-muted-foreground">{r.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <SectionHeading eyebrow="The Small Print" title="Deposit & Cancellation" />
              <dl className="mt-8 space-y-6">
                {POLICY.map(([term, body]) => (
                  <div key={term}>
                    <dt className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-gold">
                      {term}
                    </dt>
                    <dd className="mt-2 text-sm leading-8 text-muted-foreground">{body}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Legend({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground"
    >
      {children}
    </label>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Legend htmlFor={id}>{label}</Legend>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-3 w-full border border-input bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
    </div>
  );
}
