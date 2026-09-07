# Watamu Sanctuary Gateway

Build a luxury boutique villa website for "The Villa @Watamu," a boutique healing sanctuary and restaurant in Watamu, Kenya. Contact: +254 718 292 923, stay@thevillawatamu.com, located in Watamu, Kenya. Social links for Instagram, Facebook, and TripAdvisor in the top bar.

Overall brand feel: Warm, coastal, understated luxury. Think boutique East African retreat, not a generic resort template. Elegant serif headings, generous whitespace, photography-led, calm pacing. The tone is "sanctuary" not "hotel chain."

Top utility bar: Location, phone, email on the left, social icons on the right, dark background, small and unobtrusive.

Main navigation: Logo (circular palm-tree emblem, centered or left), nav items: Home, About, Accommodation, Dining, Wellness, Gallery, Experiences, Contact, with a solid gold "Book Your Stay" button on the far right. Sticky on scroll, transitions from transparent-over-hero to solid white background as the user scrolls down.

Hero section: Full-bleed autoplay looped background video (muted, no controls) showing the villa's pool at night with ambient lighting, palm trees swaying, warm lanterns. Overlay text: eyebrow label "Boutique Healing Sanctuary," large serif headline "The Villa @Watamu," tagline "A boutique healing sanctuary and restaurant in the heart of Watamu. Relax. Reconnect. Rejuvenate." Gold outlined/filled CTA button "Discover the Villa." Text and button fade/slide up on page load. Subtle slow zoom (Ken Burns effect) on the video for depth if a static fallback image is used on slow connections.

Amenities strip (below hero): Six-icon row on a light cream background: 5 Luxury Guest Suites, Restaurant & Dining, Lounge, Dining Area & Kitchen, Jacuzzi & Swimming Pool, Wellness Space, Solar Powered with KPLC Backup. Line-art gold icons, each fades in with a slight stagger as the row scrolls into view.

Welcome/About preview section: Two-column layout. Left: eyebrow "Welcome to Your Sanctuary," headline "Luxury. Comfort. Healing. Together." Body copy about the villa being a private boutique retreat offering accommodation, cuisine, wellness experiences, and coastal hospitality. Outlined "Learn More About Us" button. Right: 2x2 photo grid (bathroom detail, canopy bed, lounge with pool table, pendant lighting over pool) with a subtle hover zoom on each image.

Accommodation section: Eyebrow "Accommodation," headline "5 Luxury Guest Suites." Large feature image of a canopy bed suite on the left, description and checklist on the right: Air Conditioning, En-suite Bathroom, Private Balcony/Terrace, Complimentary Wi-Fi, Daily Housekeeping (gold checkmark icons). Solid gold "View Suites" button linking to the full Accommodation page. Below this, a row of additional suite thumbnail cards begins (carousel or grid, continues onto the dedicated page).

Additional sections to include further down the homepage:

Dining preview (restaurant ambiance, signature experience, link to Dining page)
Wellness preview (spa/healing services, link to Wellness page)
Guest testimonials as an auto-rotating carousel, pulled from Google/TripAdvisor style reviews
Instagram-style gallery strip with lightbox on click
Final call-to-action banner before the footer: "Ready to Unwind?" with a Book Your Stay button over a warm background image

Footer: Logo, short tagline, contact details, social icons, quick links to all pages, newsletter signup field, small print for privacy policy and copyright.

Pages beyond the homepage:

About - villa story, owner/founder note, philosophy of "healing sanctuary," location context
Accommodation - all 5 suites individually, each with its own photo gallery, amenities, and "Book This Suite" button
Dining - restaurant concept, sample menu highlights, dining atmosphere gallery
Wellness - spa/jacuzzi/wellness offerings, booking or inquiry option
Gallery - full categorized photo gallery (Rooms, Pool, Dining, Grounds, At Night) with lightbox
Experiences - local activities, excursions, add-on packages
Contact - map embed, contact form, direct WhatsApp link, response-time note
Book Your Stay - availability calendar or booking widget, rate info, deposit/cancellation policy summary

Color palette (extracted from the brand):

Background/cream: 
#F7F3EA
Near-black header/footer: 
#1A1A1A
Gold/mustard accent (buttons, icons, dividers): 
#C4972E
Warm charcoal body text: 
#2B2620
Deep pool-night navy (used sparingly for contrast sections): 
#0E1A2B

Typography: Elegant serif for headlines (something in the Playfair Display / Cormorant family), clean uppercase-tracked sans-serif for nav and labels (Montserrat or similar), comfortable serif or sans body text with generous line height.

Animations and motion (use tastefully, nothing jarring):

Hero video with slow Ken Burns zoom fallback image
Fade-and-slide-up entrance for hero text and buttons on load
Scroll-triggered fade-in for each section as it enters the viewport, with slight staggering for grids of icons/cards
Image hover: gentle zoom-in on gallery and suite photos
Sticky nav background transition from transparent to solid on scroll
Smooth scroll for in-page anchor links
Auto-advancing testimonial carousel with fade transition
Lightbox with fade/zoom transition for gallery images
Button hover states: subtle scale and color shift, not abrupt
Keep total motion restrained; nothing should feel like it's fighting the calm, sanctuary tone

Technical requirements: Fully responsive down to mobile, fast image loading (lazy load below the fold), optimized/compressed hero video with a poster image for slow connections, accessible alt text on all images, clear booking CTA visible on every page (sticky or repeated), local SEO structured data for a lodging business, SSL, and a working contact form.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/942981e0-8ed7-4396-a9ea-bd3646841c8a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
