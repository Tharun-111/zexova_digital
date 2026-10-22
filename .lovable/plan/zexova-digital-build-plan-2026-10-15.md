# ZEXOVA DIGITAL — Build Plan

The brief covers 20 public pages and 14 admin areas, which is too much to build well in one go. I'll build it in phases. Each phase is something you can use right away.

## Phase 1 (this build): Brand, public site core, live inquiries
- Your uploaded logo used as-is (header, footer, favicon from the Z symbol).
- Design system: navy and electric-blue dark theme, light sections, Manrope headings, Inter body text. Light/dark switch, as the brief asks.
- Animations: page-load and headline reveals, scroll reveals, staggered cards, a scrolling technology strip, an animated process timeline, a FAQ accordion. All of them respect the reduced-motion setting.
- Pages: Home (hero with the given headline and buttons, plus generated website/app mockup art), About, Services (18 services) plus a detail page for each, Our Process, Industries, Technologies, Pricing (shows "Request a Quote" until prices are final), FAQ, Contact / Request a Quote, Privacy, Terms, and a custom 404.
- Contact and quote forms save every submission to Lovable Cloud, with validation and spam protection.
- Missing details (phone, WhatsApp, email, address, socials, hours) stay hidden. Nothing gets invented.
- No client login of any kind.

## Phase 2: Admin dashboard
- Admin-only login (one administrator, roles kept in a separate table).
- Inquiry inbox with search, filters and status changes.
- Website settings: contact details, socials and hours. Once you fill these in, they show up on the public site automatically.

## Phase 3: Content management
- Portfolio and case studies, Blog, Testimonials, Careers, and editing of Services, Pricing and FAQ from the admin area.
- Image uploads.
- The public Portfolio, Blog, Testimonials and Careers pages only appear once real content has been added.

## Phase 4: Extras
- Direct chat, consultation booking, project estimator, analytics charts, audit history, email notifications (these need a verified email domain).

## Technical details
- TanStack Start routes, one file per page. `services.$slug.tsx` for service detail pages.
- Service, process, industry and technology data lives in typed modules for Phase 1 and moves to database tables in Phase 3.
- The `inquiries` table has RLS turned on and no public read access. Rows are inserted by a validated server function with a honeypot field and basic rate limiting.
- framer-motion handles animation. The logo is stored as a Lovable asset. The favicon is a cropped PNG in `public/`.
