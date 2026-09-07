import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { CtaAnchor, CtaButton, PageHero, SectionHeading } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/integrations/supabase/client";
import { IMG } from "@/lib/gallery";
import { SITE, SUITES } from "@/lib/site";

type BookSearch = { suite?: string | undefined };

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): BookSearch => ({
    suite: typeof search['suite'] === "string" ? (search['suite'] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book Your Stay in Watamu — The Villa @Watamu" },
      {
        name: "description",
        content:
          "Check live availability and book a luxury suite in Watamu, Kenya. Boutique villa accommodation near Watamu Marine Park with rates, deposit and cancellation policy.",
      },
      {
        name: "keywords",
        content:
          "Watamu accommodation, book villa Watamu, Watamu hotels Kenya, luxury suites Watamu, Kilifi County beach villa",
      },
      { property: "og:title", content: "Book Your Stay in Watamu — The Villa @Watamu" },
      {
        property: "og:description",
        content:
          "Live availability calendar for five luxury suites on the Watamu coast, Kenya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

const EMPTY = {
  guests: "2 guests",
  suite: "No preference",
  bookname: "",
  bookemail: "",
  bookphone: "",
  notes: "",
};

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const parseISO = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
};

const pretty = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

type Booked = { suite: string | null; arrival: string; departure: string };

function Book() {
  const { suite: suiteParam } = Route.useSearch();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    ...EMPTY,
    suite: SUITES.find((s) => s.slug === suiteParam)?.name ?? EMPTY.suite,
  });
  const [range, setRange] = useState<DateRange | undefined>();
  const [booked, setBooked] = useState<Booked[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(true);

  useEffect(() => {
    const preselected = SUITES.find((s) => s.slug === suiteParam);
    if (preselected) setForm((f) => ({ ...f, suite: preselected.name }));
  }, [suiteParam]);


  useEffect(() => {
    let cancelled = false;
    supabase.rpc("booked_ranges").then(({ data, error }) => {
      if (cancelled) return;
      if (!error && data) setBooked(data as Booked[]);
      setLoadingAvailability(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Nights that are unavailable for the currently selected suite.
  const unavailable = useMemo(() => {
    const counts = new Map<string, number>();
    for (const b of booked) {
      if (form.suite !== "No preference" && b.suite !== form.suite && form.suite !== "Exclusive use (all 5 suites)")
        continue;
      const start = parseISO(b.arrival);
      const end = parseISO(b.departure);
      for (const d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        const key = iso(d);
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
    const needAll = form.suite === "No preference";
    return [...counts.entries()]
      .filter(([, n]) => (needAll ? n >= SUITES.length : true))
      .map(([key]) => parseISO(key));
  }, [booked, form.suite]);

  const nights =
    range?.from && range?.to
      ? Math.round((range.to.getTime() - range.from.getTime()) / 86400000)
      : 0;

  const rangeHasConflict = useMemo(() => {
    if (!range?.from || !range?.to) return false;
    return unavailable.some((d) => d >= range.from! && d < range.to!);
  }, [range, unavailable]);

  const set = (key: keyof typeof EMPTY) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const whatsappLines = () =>
    [
      `Hello ${SITE.name}, I'd like to request a booking.`,
      "",
      form.bookname ? `Name: ${form.bookname}` : "",
      form.bookemail ? `Email: ${form.bookemail}` : "",
      form.bookphone ? `Phone: ${form.bookphone}` : "",
      range?.from ? `Arrival: ${pretty(range.from)}` : "",
      range?.to ? `Departure: ${pretty(range.to)}` : "",
      `Guests: ${form.guests}`,
      `Preferred suite: ${form.suite}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title="Book Your Stay"
        intro="Five suites means we hold every booking personally. Pick your nights below — dates already taken are greyed out — and we'll confirm the same day."
        image={IMG.heroPool}
        alt="The lantern-lit pool at The Villa @Watamu in Watamu, Kenya, at night"
      />

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <form
              className="bg-card p-8 shadow-[var(--shadow-soft)] md:p-12"
              onSubmit={async (e) => {
                e.preventDefault();
                if (sending) return;
                if (!range?.from || !range?.to) {
                  toast.error("Please choose your arrival and departure dates.");
                  return;
                }
                if (rangeHasConflict) {
                  toast.error("Some of those nights are already booked. Please pick again.");
                  return;
                }
                setSending(true);
                const { error } = await supabase.from("booking_requests").insert({
                  arrival: iso(range.from),
                  departure: iso(range.to),
                  guests: form.guests,
                  suite: form.suite,
                  full_name: form.bookname,
                  email: form.bookemail,
                  phone: form.bookphone || null,
                  notes: form.notes || null,
                });
                setSending(false);
                if (error) {
                  toast.error("We couldn't send that. Please try again or use WhatsApp.");
                  return;
                }
                setForm(EMPTY);
                setRange(undefined);
                toast.success("Request received — we'll confirm availability shortly.");
              }}
            >
              <h2 className="text-3xl text-ink">Check Availability</h2>
              <span className="rule-gold mt-5" />

              <div className="mt-8">
                <Legend htmlFor="calendar">Select your nights</Legend>
                <div id="calendar" className="mt-3 inline-block border border-border p-2">
                  <Calendar
                    mode="range"
                    numberOfMonths={1}
                    selected={range}
                    onSelect={setRange}
                    disabled={[{ before: new Date() }, ...unavailable]}
                    className="[--cell-size:1.9rem] text-xs"
                  />
                </div>

                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  {loadingAvailability
                    ? "Loading availability…"
                    : range?.from && range?.to
                      ? `${pretty(range.from)} → ${pretty(range.to)} · ${nights} night${nights === 1 ? "" : "s"}`
                      : "Greyed-out dates are already booked. Click an arrival date, then a departure date."}
                </p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <Legend htmlFor="guests">Guests</Legend>
                  <select
                    id="guests"
                    name="guests"
                    value={form.guests}
                    onChange={(e) => set("guests")(e.target.value)}
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
                    value={form.suite}
                    onChange={(e) => set("suite")(e.target.value)}
                    className="mt-3 w-full border border-input bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
                  >
                    <option>No preference</option>
                    {SUITES.map((s) => (
                      <option key={s.slug}>{s.name}</option>
                    ))}
                    <option>Exclusive use (all 5 suites)</option>
                  </select>
                </div>
                <Field
                  id="bookname"
                  label="Full name"
                  required
                  value={form.bookname}
                  onChange={set("bookname")}
                />
                <Field
                  id="bookemail"
                  label="Email"
                  type="email"
                  required
                  value={form.bookemail}
                  onChange={set("bookemail")}
                />
                <Field
                  id="bookphone"
                  label="Phone / WhatsApp"
                  type="tel"
                  value={form.bookphone}
                  onChange={set("bookphone")}
                />
              </div>

              <div className="mt-6">
                <Legend htmlFor="notes">Anything we should know?</Legend>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={form.notes}
                  onChange={(e) => set("notes")(e.target.value)}
                  className="mt-3 w-full border border-input bg-background px-4 py-3 text-sm leading-7 focus:border-gold focus:outline-none"
                  placeholder="Airport transfers, dietary needs, wellness treatments, celebrations…"
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <CtaButton type="submit" disabled={sending}>
                  {sending ? "Sending…" : "Request Booking"}
                </CtaButton>
                <CtaAnchor
                  href={SITE.whatsappHref(whatsappLines())}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="outline"
                >
                  Book by WhatsApp
                </CtaAnchor>
              </div>
              <p className="mt-5 text-xs leading-6 text-muted-foreground">
                Your request is saved to our reservations inbox and reviewed by the owners —
                nothing gets lost. We reply by email, usually the same day. This is a request,
                not a charge; nothing is taken until we confirm your suite and send a secure
                deposit link. Prefer WhatsApp? The button above opens a chat on{" "}
                {SITE.phone} with your details already written out.
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

            <Reveal delay={180}>
              <SectionHeading eyebrow="Talk to Us" title="Book by Phone" />
              <ul className="mt-6 space-y-3 text-sm">
                {SITE.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="text-gold hover:underline">
                      {p.display}
                    </a>
                  </li>
                ))}
              </ul>
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
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Legend htmlFor={id}>{label}</Legend>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full border border-input bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
    </div>
  );
}
