import { CtaAnchor, CtaLink } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

export function BookStrip({
  title = "Ready to Unwind?",
  copy = "Five suites only. We reply to every enquiry within one working day.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="bg-ink py-20">
      <Reveal className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 text-center md:flex-row md:justify-between md:px-10 md:text-left">
        <div>
          <h2 className="text-4xl text-cream">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-cream/65">{copy}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <CtaLink to="/book">Book Your Stay</CtaLink>
          <CtaAnchor href={SITE.whatsapp} variant="light" target="_blank" rel="noreferrer noopener">
            WhatsApp Us
          </CtaAnchor>
        </div>
      </Reveal>
    </section>
  );
}
