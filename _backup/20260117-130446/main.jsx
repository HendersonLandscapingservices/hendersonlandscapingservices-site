import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./index.css";

// ---- Google Ads (gtag) bootstrap (no inline scripts needed) ----
(() => {
  const ADS_ID = "AW-17866270140";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  // Ensure gtag.js is loaded
  if (!document.querySelector(script[src*="googletagmanager.com/gtag/js?id="])) {
    const s = document.createElement("script");
    s.async = true;
    s.src = https://www.googletagmanager.com/gtag/js?id=;
    s.setAttribute("data-cfasync", "false");
    document.head.appendChild(s);
  }

  window.gtag("js", new Date());
  window.gtag("config", ADS_ID);
})();
// ---------------------------------------------------------------
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
