import { Helmet } from "react-helmet-async";
import { SITE } from "../config/site";

export default function SEO({ title, description, path = "/", image = "/images/og.jpg", noIndex = false }) {
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.name;
  const url = new URL(path, SITE.url).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    name: SITE.name,
    url: SITE.url,
    areaServed: SITE.areaLabel,
    sameAs: [SITE.instagramUrl, SITE.facebookUrl].filter(Boolean),
    description:
      "Lawn care, garden maintenance, hedge trimming, planting and garden design across East Lancashire. Clear communication, professional standards and reliable scheduling.",
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      <link rel="canonical" href={url} />
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : null}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={new URL(image, SITE.url).toString()} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      <meta name="twitter:image" content={new URL(image, SITE.url).toString()} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
