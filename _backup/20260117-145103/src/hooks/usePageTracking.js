import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView } from "../utils/analytics";

export function usePageTracking(getTitle) {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const title = typeof getTitle === "function" ? getTitle(location.pathname) : undefined;
    trackPageView(location.pathname, title);
  }, [location.pathname, getTitle]);
}
