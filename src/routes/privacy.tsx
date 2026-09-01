import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — The Villa @Watamu" },
      {
        name: "description",
        content:
          "How The Villa @Watamu collects, uses and protects the personal information you share when enquiring or booking a stay.",
      },
      { property: "og:title", content: "Privacy Policy — The Villa @Watamu" },
      {
        property: "og:description",
        content: "How we handle the information you share with us.",
      },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

const SECTIONS = [
  {
    title: "What we collect",
    body: "Only what you give us: your name, email address, phone number, travel dates and any preferences or requirements you choose to share in an enquiry, booking request or newsletter signup.",
  },
  {
    title: "How we use it",
    body: "To answer your enquiry, hold and service your booking, and — if you have asked for it — to send occasional news about the villa. We do not sell, rent or share your details with third parties for marketing.",
  },
  {
    title: "Who sees it",
    body: "Our reservations team, and where necessary the individual suppliers arranging a service you requested, such as an airport transfer or an excursion skipper. Nothing more than they need.",
  },
  {
    title: "How long we keep it",
    body: "Enquiry correspondence is kept for two years. Booking records are kept for seven years, as required for tax and accounting in Kenya. Newsletter subscriptions are kept until you unsubscribe.",
  },
  {
    title: "Your choices",
    body: "You can ask us at any time to show you what we hold, correct it, or delete it. Every newsletter carries a one-click unsubscribe link.",
  },
  {
    title: "Cookies",
    body: "This website uses only the essential cookies needed for it to function. We do not run advertising trackers.",
  },
];

function Privacy() {
  return (
    <article className="bg-background pb-28 pt-40">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 text-5xl text-ink">Privacy Policy</h1>
        <span className="rule-gold mt-6" />
        <p className="mt-8 text-[0.95rem] leading-8 text-muted-foreground">
          The Villa @Watamu respects your privacy and keeps what you share with us to the
          minimum needed to look after you well.
        </p>

        <div className="mt-14 space-y-12">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-2xl text-ink">{s.title}</h2>
              <p className="mt-4 text-[0.95rem] leading-8 text-muted-foreground">{s.body}</p>
            </section>
          ))}
          <section>
            <h2 className="text-2xl text-ink">Contact us</h2>
            <p className="mt-4 text-[0.95rem] leading-8 text-muted-foreground">
              Questions about this policy or your data? Write to{" "}
              <a href={SITE.emailHref} className="text-gold hover:underline">
                {SITE.email}
              </a>{" "}
              or call{" "}
              <a href={SITE.phoneHref} className="text-gold hover:underline">
                {SITE.phone}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
