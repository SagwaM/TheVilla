import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxItem = { src: string; alt: string };

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const open = index !== null;

  const step = useCallback(
    (dir: number) => {
      if (index === null) return;
      onIndexChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, step]);

  const item = index === null ? undefined : items[index];
  if (!open || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 p-2 text-cream/70 transition-colors hover:text-gold"
      >
        <X className="h-6 w-6" strokeWidth={1.5} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          step(-1);
        }}
        aria-label="Previous image"
        className="absolute left-3 p-3 text-cream/60 transition-colors hover:text-gold md:left-8"
      >
        <ChevronLeft className="h-8 w-8" strokeWidth={1} />
      </button>
      <figure
        className="max-h-full duration-500 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[78vh] w-auto max-w-full object-contain shadow-[var(--shadow-lift)]"
        />
        <figcaption className="mt-4 text-center font-sans text-[0.65rem] uppercase tracking-[0.2em] text-cream/60">
          {item.alt}
        </figcaption>
      </figure>
      <button
        onClick={(e) => {
          e.stopPropagation();
          step(1);
        }}
        aria-label="Next image"
        className="absolute right-3 p-3 text-cream/60 transition-colors hover:text-gold md:right-8"
      >
        <ChevronRight className="h-8 w-8" strokeWidth={1} />
      </button>
    </div>
  );
}
