import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Reservations Inbox — The Villa @Watamu" },
      {
        name: "description",
        content: "Private inbox of booking requests, enquiries and newsletter subscribers for The Villa @Watamu.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Reservations Inbox — The Villa @Watamu" },
      { property: "og:description", content: "Private owner dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Admin,
});

type Booking = {
  id: string;
  arrival: string | null;
  departure: string | null;
  guests: string | null;
  suite: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  notes: string | null;
  status: string;
  created_at: string;
};

type Enquiry = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  dates: string | null;
  message: string;
  created_at: string;
};

type Subscriber = { id: string; email: string; created_at: string };

const when = (s: string) => new Date(s).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"bookings" | "enquiries" | "subscribers">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const [firstName, setFirstName] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const [b, e, s] = await Promise.all([
      supabase.from("booking_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }),
    ]);
    setBookings((b.data as Booking[]) ?? []);
    setEnquiries((e.data as Enquiry[]) ?? []);
    setSubs((s.data as Subscriber[]) ?? []);
    const { data: userData } = await supabase.auth.getUser();
    setDenied(userData.user?.email !== SITE.email);
    if (userData.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", userData.user.id)
        .maybeSingle();
      const full =
        profile?.full_name ||
        (userData.user.user_metadata?.['full_name'] as string | undefined) ||
        "";
      setFirstName(full.trim().split(" ")[0] ?? "");
    }
    setLoading(false);
  }, []);


  useEffect(() => {
    void load();
  }, [load]);

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("booking_requests").update({ status }).eq("id", id);
    if (error) {
      toast.error("Couldn't update that booking.");
      return;
    }
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    toast.success(
      status === "confirmed"
        ? "Confirmed — those dates are now blocked on the booking calendar."
        : `Marked as ${status}.`,
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-10 md:pt-44">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Private</p>
          <h1 className="mt-4 font-display text-4xl text-ink">
            {firstName ? `Welcome, ${firstName}` : "Reservations Inbox"}
          </h1>
          {firstName && (
            <p className="mt-3 text-sm text-muted-foreground">Reservations Inbox</p>
          )}
          <span className="rule-gold mt-5" />
        </div>

        <button
          className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-gold"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
        >
          Sign out
        </button>
      </div>

      {denied && (
        <p className="mt-10 border border-gold/40 bg-gold/5 p-6 text-sm leading-7">
          You're signed in, but only <strong>{SITE.email}</strong> can read reservations. Sign
          out and sign in with that address.
        </p>
      )}

      <div className="mt-12 grid gap-10 md:grid-cols-[13rem_1fr] lg:grid-cols-[15rem_1fr]">
        <aside className="md:sticky md:top-36 md:self-start">
          <nav className="flex flex-col border-l border-border font-sans text-[0.62rem] uppercase tracking-[0.2em]">
            {([
              ["bookings", "Bookings", bookings.length, "Guests who filled in the Book Your Stay form"],
              ["enquiries", "Enquiries", enquiries.length, "Messages sent through the Contact page"],
              ["subscribers", "Subscribers", subs.length, "Emails collected by the footer newsletter box"],
            ] as const).map(([key, label, count, hint]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                title={hint}
                className={`-ml-px whitespace-nowrap border-l-2 px-5 py-3 text-left ${
                  tab === key
                    ? "border-gold bg-gold/5 text-gold"
                    : "border-transparent text-muted-foreground hover:text-ink"
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </nav>
          <p className="mt-6 text-xs leading-6 text-muted-foreground">
            {tab === "bookings"
              ? "Booking requests from the Book Your Stay page. Confirming one blocks those nights on the public calendar."
              : tab === "enquiries"
                ? "Questions sent through the Contact page form — no dates held, just a message to reply to."
                : "People who entered their email in the newsletter box at the bottom of the site, so you can email them offers and news."}
          </p>
        </aside>

        <div>
      {loading ? (
        <p className="mt-10 text-sm text-muted-foreground">Loading…</p>
      ) : tab === "bookings" ? (
        <ul className="mt-10 space-y-6">
          {bookings.length === 0 && <p className="text-sm text-muted-foreground">No booking requests yet.</p>}
          {bookings.map((b) => (
            <li key={b.id} className="border border-border bg-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <p className="font-display text-2xl text-ink">{b.full_name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {b.arrival} → {b.departure} · {b.guests} · {b.suite}
                  </p>
                </div>
                <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-gold">
                  {b.status}
                </span>
              </div>
              <p className="mt-4 text-sm">
                <a className="text-gold hover:underline" href={`mailto:${b.email}`}>{b.email}</a>
                {b.phone ? (
                  <>
                    {" · "}
                    <a className="text-gold hover:underline" href={`tel:${b.phone}`}>{b.phone}</a>
                  </>
                ) : null}
              </p>
              {b.notes && <p className="mt-3 text-sm leading-7 text-muted-foreground">{b.notes}</p>}
              <p className="mt-3 text-xs text-muted-foreground">Received {when(b.created_at)}</p>
              <div className="mt-5 flex flex-wrap gap-3 font-sans text-[0.6rem] uppercase tracking-[0.2em]">
                <button
                  disabled={b.status === "confirmed"}
                  className="border border-gold px-5 py-2 text-gold hover:bg-gold hover:text-gold-foreground disabled:cursor-not-allowed disabled:border-border disabled:bg-transparent disabled:text-muted-foreground disabled:hover:bg-transparent"
                  onClick={() => setStatus(b.id, "confirmed")}
                >
                  {b.status === "confirmed" ? "Dates blocked" : "Confirm & block dates"}
                </button>
                <button className="border border-border px-5 py-2 text-muted-foreground hover:text-ink" onClick={() => setStatus(b.id, "pending")}>
                  Pending
                </button>
                <button className="border border-border px-5 py-2 text-muted-foreground hover:text-ink" onClick={() => setStatus(b.id, "cancelled")}>
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : tab === "enquiries" ? (
        <ul className="mt-10 space-y-6">
          {enquiries.length === 0 && <p className="text-sm text-muted-foreground">No enquiries yet.</p>}
          {enquiries.map((e) => (
            <li key={e.id} className="border border-border bg-card p-6">
              <p className="font-display text-2xl text-ink">{e.full_name}</p>
              <p className="mt-2 text-sm">
                <a className="text-gold hover:underline" href={`mailto:${e.email}`}>{e.email}</a>
                {e.phone ? ` · ${e.phone}` : ""}
                {e.dates ? ` · ${e.dates}` : ""}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{e.message}</p>
              <p className="mt-3 text-xs text-muted-foreground">Received {when(e.created_at)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {subs.length === 0 && <p className="py-6 text-sm text-muted-foreground">No subscribers yet.</p>}
          {subs.map((s) => (
            <li key={s.id} className="flex items-baseline justify-between gap-6 py-4 text-sm">
              <span>{s.email}</span>
              <span className="text-xs text-muted-foreground">{when(s.created_at)}</span>
            </li>
          ))}
        </ul>
      )}
        </div>
      </div>
    </div>
  );
}
