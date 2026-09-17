# Texas Properties 4 You

A mobile-first website for selling land, lots, houses, mobile homes, acreage, and
investment properties directly to buyers with clear pricing and simple owner
financing terms.

Built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint the codebase
```

## Project Structure

```
src/
  app/                     Pages (App Router) and API routes
  components/
    layout/                Header, Footer, mobile menu, sticky mobile bar
    property/               Property card, filters, calculator, gallery, map, quick facts, share buttons
    forms/                  Application, Buyer List, Backup List, Contact forms
    logo/                   Logo React component (all color/layout variants)
    home/                   Homepage-only sections (hero, property types)
    legal/                  Shared legal page layout
  data/
    properties.ts           **The property "database."** Edit this file to add/change listings.
    site-config.ts           Site name, phone/email, nav links, disclaimers
  lib/                       Calculator, tracking, lead submission, filtering, formatting
  types/property.ts          Property data shape
scripts/
  generate-placeholders.mjs   Regenerates placeholder property photos
  generate-brand-assets.mjs   Regenerates the full logo/brand asset package
brand-assets/                 Full logo deliverable package (SVG/PNG/JPG/favicons/social images)
public/properties/<slug>/     Property photos served by the site
```

## Managing Properties

All property data lives in **`src/data/properties.ts`** as a typed array — this is
the site's "database" until you connect a real CMS or spreadsheet-backed data
source. No code changes are required to add, edit, or hide a listing.

### Add a new property

1. Open `src/data/properties.ts`.
2. Copy an existing object in the `properties` array that's similar to the new
   listing (this is the built-in "duplicate a listing" workflow — copy, paste,
   edit).
3. Update the fields — see `src/types/property.ts` for every available field
   and what it controls (pricing, financing terms, location, description,
   photos, etc.). Only fill in fields that apply; empty/undefined fields are
   automatically hidden on the page (Quick Facts never shows blank rows).
4. Give it a unique `id` (e.g. `TP-1013`) and a unique `slug` (used in the URL:
   `/properties/<slug>`). Use lowercase words separated by dashes.
5. Add photos to `public/properties/<slug>/` and reference them in `mainPhoto`
   and `photos`. Every photo needs a short `alt` description (required for
   accessibility and SEO — property details should never live in an image
   alone).
6. Save the file. The property immediately appears on the homepage (if
   `featured: true`), Available Properties, and its own detail page.

### Change a property's status

Set `status` to one of: `"available"`, `"pending"`, `"sold"`, or `"hidden"`.

- **available** — shown everywhere, full "Apply Online" flow.
- **pending** — shown with a Pending badge; the primary button becomes
  "Join Backup List" instead of "Apply Online."
- **sold** — shown on the Sold Properties page with a "This property has
  sold" message; no application button. Set `soldPriceVisible: true` and
  `soldPrice` if you want the sold price displayed.
- **hidden** — removed from every listing page and returns a 404 on its own
  URL, without deleting the data (useful for taking a property offline
  temporarily).

### Featured properties & ordering

Set `featured: true` to include a property in the homepage's "Available Right
Now" section (shown before regular properties, as required). The array order
in `properties.ts` controls default display order elsewhere.

### The $450 minimum monthly payment

The sitewide minimum owner-financing payment is defined once in
`SITE_MIN_MONTHLY_PAYMENT` (`src/types/property.ts`) and used by both the
payment calculator (`src/lib/calculator.ts`) and the Apply Online form's
validation. Override it per property with the optional `minMonthlyPayment`
field if a specific listing needs a different floor.

## Brand & Design System

- **Colors, type sizes, and spacing** are defined once in
  `src/app/globals.css` under `@theme` and used as Tailwind utilities
  (`bg-brand-green`, `text-brand-gold`, `bg-status-pending`, etc.) — change a
  hex value there to restyle the whole site consistently.
- **Fonts:** Poppins (headings) and Inter (body/buttons), loaded via
  `next/font` in `src/app/layout.tsx`.
- **Logo:** `src/components/logo/Logo.tsx` renders the logo directly in the
  site (all 4 color variants × 3 layouts) as scalable SVG — no image files
  needed for the live site.

### Regenerating the logo/brand asset package

The full deliverable package (SVG, PNG at 2000px+, JPG proofs, favicons at
32/180/512px, a 1200×1200 social profile image, and a 1200×630 social share
image, in full-color/white/dark-green/black) lives in `/brand-assets` and is
generated by:

```bash
node scripts/generate-brand-assets.mjs
```

Edit the shared path data at the top of that script (and the matching
constants in `Logo.tsx`) if the icon design changes, then re-run it — this
also refreshes the working copies used by the live site in `/public`
(favicons, `og-default.png`, `social-profile.png`).

### Placeholder property photography

Sample properties ship with generated placeholder photos so the site is fully
functional out of the box. Replace files under `public/properties/<slug>/`
with real photos (same filenames) whenever they're available — no code
changes needed. Regenerate placeholders for new sample data with:

```bash
node scripts/generate-placeholders.mjs
```

## Forms, Leads & Tracking

Every form (Application, Buyer List, Backup List, Contact) captures the
required hidden tracking fields automatically — original/current traffic
source, campaign and ad name, first/last page visited, referral URL, device
type, and timestamps (`src/lib/tracking.ts`) — and submits to an API route
(`src/app/api/.../route.ts`) that:

1. Logs the lead server-side (visible in server/deployment logs) as a
   guaranteed fallback.
2. POSTs the full lead to `CRM_WEBHOOK_URL`, if set.
3. POSTs a notification to `LEAD_NOTIFICATION_WEBHOOK_URL` (Slack, Zapier,
   Make, etc.), if set.

**The site works and every form submits successfully with no configuration.**
To connect real services, copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta (Facebook) Pixel |
| `CRM_WEBHOOK_URL` | Where every lead is sent (HubSpot, GoHighLevel, Follow Up Boss, or a Zapier/Make catch webhook) |
| `LEAD_NOTIFICATION_WEBHOOK_URL` | Instant team notification on new leads (Slack incoming webhook, Zapier, etc.) |
| `NEXT_PUBLIC_SITE_URL` | Production domain, used for the sitemap and social sharing links |

No code changes are required for any of the above — the integrations
activate as soon as the environment variables are set.

**File uploads** (ID/document upload on the application form) are accepted in
the UI but are not yet wired to a storage provider — connecting one (S3,
Cloudinary, etc.) is the one piece of section 18 that needs a real backend
credential before go-live.

**Text/Call buttons** use `tel:`/`sms:` links (tap-to-call/tap-to-text) and
fire a tracked conversion event on click; wire `NEXT_PUBLIC_GA_MEASUREMENT_ID`
/ `NEXT_PUBLIC_META_PIXEL_ID` to see them in Google Analytics / Meta Events
Manager.

## SEO

- Per-page metadata (title/description) on every route; property pages
  generate their title/description/social image automatically from the
  property data.
- `sitemap.xml` and `robots.txt` are generated automatically
  (`src/app/sitemap.ts`, `src/app/robots.ts`) and include every non-hidden
  property.
- Structured data (JSON-LD): `RealEstateAgent` sitewide, `RealEstateListing`
  per property page.

## Known Limitations / Next Steps Before Launch

- Replace placeholder property photos and the sample listings in
  `properties.ts` with real data.
- Connect a real CRM and notification webhook (see table above).
- Connect a file storage provider for ID/document uploads.
- Replace the placeholder phone number, email, and social links in
  `src/data/site-config.ts` with real ones.
- Point `NEXT_PUBLIC_SITE_URL` at the live domain before launch (used in the
  sitemap and social sharing metadata).
