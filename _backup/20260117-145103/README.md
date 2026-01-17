# Henderson Landscaping Services – Site (v2)

This package converts your single-page/tab navigation into real routes/URLs (better SEO and shareable links) while keeping your design and estimator.

## What’s improved (implemented)

- Real routes:
  - `/` `/services` `/about` `/enquiry` `/design` `/gallery` `/hints-tips`
- Per-page `<title>`, meta description, canonical tags (React Helmet Async)
- JSON-LD structured data (`LandscapingBusiness`)
- Optional GA4 tracking via env var `VITE_GA_MEASUREMENT_ID`
- Enquiry form:
  - Honeypot anti-spam field
  - Accessible success/error messaging (no `alert()` popups)
- `robots.txt` + `sitemap.xml` generated for:
  - https://hendersonlandscapingservices.co.uk

## Install & run

```bash
npm install
npm run dev
```

### Optional: Google Analytics

Create `.env` in the project root:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Notes

- This expects your existing `/public/images/*` assets (logo, gallery images, etc.) and `/public/guides/*.pdf` downloads to be present.
- If you host on Cloudflare Pages / Netlify and use SPA routing, ensure you have a fallback rewrite to `/index.html`.
