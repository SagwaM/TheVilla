import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { CtaAnchor, CtaButton, PageHero, SectionHeading } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { IMG } from "@/lib/gallery";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact The Villa @Watamu — Watamu, Kilifi County, Kenya" },
      {
        name: "description",
        content:
          "Contact The Villa @Watamu, a boutique villa and restaurant in Watamu, Kenya: +254 798 515 231, +254 720 729 135, sagwaisaac@gmail.com, WhatsApp, map directions and enquiry form.",
      },
      {
        name: "keywords",
        content:
          "Watamu villa contact, boutique hotel Watamu Kenya, Watamu Kilifi County accommodation, Watamu Marine Park stay, Watamu restaurant",
      },
      { property: "og:title", content: "Contact The Villa @Watamu — Watamu, Kenya" },
      {
        property: "og:description",
        content: "Call, email or WhatsApp us in Watamu — we reply within one working day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const EMPTY = { name: "", email: "", phone: "", dates: "", message: "" };

function Contact() {
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const set = (key: keyof typeof EMPTY) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const whatsappHref = () => {
    const lines = [
      `Hello ${SITE.name},`,
      "",
      form.name ? `Name: ${form.name}` : "",
      form.email ? `Email: ${form.email}` : "",
      form.phone ? `Phone: ${form.phone}` : "",
      form.dates ? `Dates: ${form.dates}` : "",
      form.message ? `\n${form.message}` : "",
    ].filter(Boolean);
    return `${SITE.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

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
                  {SITE.phones.map((p) => (
                    <a key={p.href} href={p.href} className="mt-2 block text-[0.95rem] hover:text-gold">
                      {p.display}
                    </a>
                  ))}
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

            <div className="mt-10 flex flex-wrap gap-4">
              {SITE.phones.map((p, i) => (
                <CtaAnchor
                  key={p.href}
                  href={`${whatsappHref()}`.replace(
                    /wa\.me\/\d+/,
                    `wa.me/${p.wa}`,
                  )}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="outline"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                  WhatsApp {i === 0 ? "Reservations" : "Alt Line"}
                </CtaAnchor>
              ))}
            </div>

          </Reveal>

          <Reveal delay={120}>
            <form
              className="bg-card p-8 shadow-[var(--shadow-soft)] md:p-12"
              onSubmit={async (e) => {
                e.preventDefault();
                if (sending) return;
                setSending(true);
                const { error } = await supabase.from("enquiries").insert({
                  full_name: form.name,
                  email: form.email,
                  phone: form.phone || null,
                  dates: form.dates || null,
                  message: form.message,
                });
                setSending(false);
                if (error) {
                  toast.error("We couldn't send that. Please try again or use WhatsApp.");
                  return;
                }
                setForm(EMPTY);
                toast.success("Thank you — your message is with us. We'll reply within a day.");
              }}
            >
              <h2 className="text-3xl text-ink">Send an Enquiry</h2>
              <span className="rule-gold mt-5" />

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <Field id="name" label="Full name" required value={form.name} onChange={set("name")} />
                <Field id="email" label="Email" type="email" required value={form.email} onChange={set("email")} />
                <Field id="phone" label="Phone / WhatsApp" type="tel" value={form.phone} onChange={set("phone")} />
                <Field
                  id="dates"
                  label="Approximate dates"
                  placeholder="e.g. 12–17 March"
                  value={form.dates}
                  onChange={set("dates")}
                />
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
                  value={form.message}
                  onChange={(e) => set("message")(e.target.value)}
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
            <SectionHeading
              eyebrow="Find Us"
              title="Where We Are in Watamu"
              intro="A few minutes from Watamu Beach and the Watamu Marine National Park, on the Kilifi County coast, with Mida Creek and Gede Ruins close by."
            />
            <div className="mt-10 overflow-hidden shadow-[var(--shadow-soft)]">
              <iframe
                title="Map pin showing The Villa @Watamu in Watamu, Kilifi County, Kenya"
                src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&z=14&output=embed`}
                className="h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <CtaAnchor
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.mapQuery)}`}
                target="_blank"
                rel="noreferrer noopener"
                variant="outline"
              >
                Get Directions
              </CtaAnchor>
              <CtaAnchor
                href={SITE.googleBusiness}
                target="_blank"
                rel="noreferrer noopener"
                variant="outline"
              >
                View on Google
              </CtaAnchor>
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
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full border border-input bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
    </div>
  );
}
