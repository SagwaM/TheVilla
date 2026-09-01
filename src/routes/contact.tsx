import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { CtaAnchor, CtaButton, PageHero, SectionHeading } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import { IMG } from "@/lib/gallery";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Villa @Watamu" },
      {
        name: "description",
        content:
          "Reach The Villa @Watamu in Watamu, Kenya: +254 718 292 923, stay@thevillawatamu.com, WhatsApp, directions and enquiry form.",
      },
      { property: "og:title", content: "Contact — The Villa @Watamu" },
      {
        property: "og:description",
        content: "Call, email or WhatsApp us — we reply within one working day.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sending, setSending] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to Us Directly"
        intro="No call centre, no booking bot. Messages come straight to the people who run the villa."
        image={IMG.grounds}
        alt="The garden entrance path at The Villa @Watamu"
      />

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <SectionHeading eyebrow="Reach Us" title="Details" />
            <ul className="mt-10 space-y-8">
              <li className="flex gap-5">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
                <div>
                  <p className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Location
                  </p>
                  <p className="mt-2 text-[0.95rem] leading-8">{SITE.location}</p>
                </div>
              </li>
              <li className="flex gap-5">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
                <div>
                  <p className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Telephone
                  </p>
                  <a href={SITE.phoneHref} className="mt-2 block text-[0.95rem] hover:text-gold">
                    {SITE.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-5">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
                <div>
                  <p className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Email
                  </p>
                  <a href={SITE.emailHref} className="mt-2 block text-[0.95rem] hover:text-gold">
                    {SITE.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-5">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
                <div>
                  <p className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Response Time
                  </p>
                  <p className="mt-2 text-[0.95rem] leading-8">
                    We answer every enquiry within one working day, usually much sooner.
                    Reception is staffed 07:00–22:00 EAT.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-10">
              <CtaAnchor
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                variant="outline"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                Message on WhatsApp
              </CtaAnchor>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              className="bg-card p-8 shadow-[var(--shadow-soft)] md:p-12"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                setSending(true);
                window.setTimeout(() => {
                  setSending(false);
                  form.reset();
                  toast.success("Thank you — your message is with us. We'll reply within a day.");
                }, 700);
              }}
            >
              <h2 className="text-3xl text-ink">Send an Enquiry</h2>
              <span className="rule-gold mt-5" />

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <Field id="name" label="Full name" required />
                <Field id="email" label="Email" type="email" required />
                <Field id="phone" label="Phone / WhatsApp" type="tel" />
                <Field id="dates" label="Approximate dates" placeholder="e.g. 12–17 March" />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-3 w-full border border-input bg-background px-4 py-3 text-sm leading-7 focus:border-gold focus:outline-none"
                  placeholder="Tell us who's travelling, what you're hoping for, and anything we should know."
                />
              </div>

              <div className="mt-8">
                <CtaButton type="submit" disabled={sending} className="w-full sm:w-auto">
                  {sending ? "Sending…" : "Send Enquiry"}
                </CtaButton>
              </div>
              <p className="mt-5 text-xs leading-6 text-muted-foreground">
                We use your details only to answer this enquiry. Nothing is shared or sold.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <div className="overflow-hidden shadow-[var(--shadow-soft)]">
              <iframe
                title="Map showing the location of The Villa @Watamu in Watamu, Kenya"
                src="https://www.openstreetmap.org/export/embed.html?bbox=39.98%2C-3.39%2C40.06%2C-3.32&layer=mapnik&marker=-3.3538%2C40.0186"
                className="h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-3 w-full border border-input bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
    </div>
  );
}
