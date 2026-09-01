import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SITE } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-4 font-display text-6xl text-ink">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This path doesn't lead anywhere at the villa. Let us walk you back.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center bg-gold px-8 py-4 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-foreground transition-colors hover:bg-gold-soft"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-ink">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. Try again, or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-gold px-8 py-4 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-foreground transition-colors hover:bg-gold-soft"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-gold px-8 py-4 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-gold-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Villa @Watamu — Boutique Healing Sanctuary" },
      {
        name: "description",
        content:
          "A five-suite boutique healing sanctuary and restaurant in Watamu, Kenya.",
      },
      { name: "author", content: "The Villa @Watamu" },
      { property: "og:site_name", content: "The Villa @Watamu" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#1A1A1A" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: "The Villa @Watamu",
          description:
            "A boutique healing sanctuary and restaurant in Watamu, Kenya, with five luxury guest suites, a pool and jacuzzi, wellness space and on-site dining.",
          telephone: SITE.phone,
          email: SITE.email,
          priceRange: "$$$",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Watamu",
            addressRegion: "Kilifi County",
            addressCountry: "KE",
          },
          geo: { "@type": "GeoCoordinates", latitude: -3.3538, longitude: 40.0186 },
          numberOfRooms: 5,
          amenityFeature: [
            "Swimming Pool",
            "Jacuzzi",
            "Restaurant",
            "Wellness Space",
            "Free Wi-Fi",
            "Air Conditioning",
            "Solar Power with KPLC Backup",
          ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
          sameAs: [SITE.instagram, SITE.facebook, SITE.tripadvisor],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
}
