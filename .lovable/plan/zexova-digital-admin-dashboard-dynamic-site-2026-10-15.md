# ZEXOVA DIGITAL — Admin Dashboard & Dynamic Site

Your brief covers 10 admin areas plus a live chat. To keep every part working and connected to real data, I'll build it in three steps. Each step works on its own.

## Step A (this build): Admin foundation + portfolio
- Admin sign-in at `/admin` (email and password, one administrator). The first account created becomes the admin; nobody else can get in. No client accounts.
- Sidebar with all 8 sections. Sections not built yet show "Coming in the next update".
- Dashboard overview: real counts (enquiries, new enquiries, published projects, published articles), enquiry trend chart (7/30/90 days), recent enquiries, recent projects. Visitors and revenue show "Not configured yet" instead of made-up numbers.
- Enquiries: searchable, filterable table, full message view, 6 statuses, private notes with follow-up history, delete with confirmation, CSV export.
- Portfolio projects: add, edit, publish/unpublish and delete, with cover image upload and all the fields in your brief (title, category, technologies, short description, challenge, solution, extras).
- Public site: "TRUSTED BY BUSINESSES" scrolling strip after "Our Process", plus a page for each project. The strip stays hidden until you publish a real project.
- Admin settings: contact details, socials, hours and SEO text. Saved details appear on the public site automatically. Separate password change.

## Step B: Direct chat + pricing
- Chat bubble for visitors (no login), live replies from the admin Direct Chats page, unread markers, statuses, search.
- Pricing & Packages editor that drives the public Pricing page.

## Step C: Blog + analytics
- Blog editor with drafts and publishing, plus a public blog that appears once articles exist.
- Analytics page: visitor tracking, lead sources, and a manual revenue log so revenue comes only from what you record.

## Technical details
- New tables: user_roles (+ has_role), projects, enquiry_notes, site_settings (single row), with RLS; public read only for published projects and settings.
- First-admin bootstrap through a security-definer function that only grants the role when no admin exists.
- Admin routes under `_authenticated/admin/*`, plus a role check in the layout. Writes go through RLS using `has_role`.
- Storage bucket `project-images` (public read, admin write).
- Marquee uses CSS animation with duplicated rendered cards, pauses on hover, and is static when reduced motion is on.
