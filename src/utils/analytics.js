import { SITE } from "../config/site";

/**
 * GA4 (gtag) loader via env var:
 *   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 */
export function initAnalytics() {
  const id = SITE.gaMeasurementId?.trim();
  if (!id || typeof window === "undefined") return;

  // Avoid double-injection
  if (document.querySelector(`script[data-ga="gtag"][data-id="${id}"]`)) return;

  const s1 = document.createElement("script");
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  s1.dataset.ga = "gtag";
  s1.dataset.id = id;

  const s2 = document.createElement("script");
  s2.dataset.ga = "gtag-init";
  s2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = window.gtag || gtag;
    gtag('js', new Date());
    gtag('config', '${id}', { anonymize_ip: true });
  `;

  document.head.appendChild(s1);
  document.head.appendChild(s2);
}

export function trackPageView(pathname, title) {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", "page_view", {
    page_title: title || document.title,
    page_location: window.location.href,
    page_path: pathname,
  });
}
