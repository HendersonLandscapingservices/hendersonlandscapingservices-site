import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SkipLink from "./components/SkipLink";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Enquiry from "./pages/Enquiry";
import Design from "./pages/Design";
import Gallery from "./pages/Gallery";
import HintsTips from "./pages/HintsTips";
import NotFound from "./pages/NotFound";
import { EstimatorPanel, EstimatorWidgetButton } from "./components/Estimator";
import { usePageTracking } from "./hooks/usePageTracking";

/**
 * Key upgrades vs your single-tab App.jsx:
 * - Real routes/URLs (SEO + shareable pages)
 * - Per-page titles/descriptions + canonical tags
 * - JSON-LD (LandscapingBusiness) sitewide
 * - GA4 loader via VITE_GA_MEASUREMENT_ID (optional)
 * - Better form UX (accessible message + honeypot)
 */
export default function App() {
  const [showEstimator, setShowEstimator] = useState(false);
  const location = useLocation();

  const titleByPath = useMemo(() => {
    return {
      "/": "Home",
      "/services": "Services",
      "/about": "About",
      "/enquiry": "Enquiry",
      "/design": "Design",
      "/gallery": "Gallery",
      "/hints-tips": "Hints & Tips",
    };
  }, []);

  const getTitle = useCallback(
    (pathname) => titleByPath[pathname] ? `Henderson – ${titleByPath[pathname]}` : "Henderson",
    [titleByPath]
  );

  usePageTracking(getTitle);

  // Simple scroll-to-top on route change (keeps estimator separate)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => { window?.scrollTo?.(0, 0); }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SkipLink />
      <Header />

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/design" element={<Design />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/hints-tips" element={<HintsTips />} />

          {/* Backward-compat aliases (if you ever linked to these) */}
          <Route path="/booking" element={<Navigate to="/enquiry" replace />} />
          <Route path="/hints" element={<Navigate to="/hints-tips" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <EstimatorWidgetButton onOpen={() => setShowEstimator(true)} />

      {showEstimator ? (
        <EstimatorPanel
          onClose={() => setShowEstimator(false)}
          onGoToEnquiry={() => {
            window.location.assign("/enquiry");
            setShowEstimator(false);
          }}
        />
      ) : null}
    </div>
  );
}
