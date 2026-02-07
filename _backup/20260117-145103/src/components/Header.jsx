import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Container from "./Container";
import { SITE } from "../config/site";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About us" },
  { to: "/enquiry", label: "Enquiry" },
  { to: "/design", label: "Design" },
  { to: "/gallery", label: "Gallery" },
  { to: "/hints-tips", label: "Hints & Tips" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close menu on navigation
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container className="flex items-center justify-between py-3 lg:py-4">
        <div className="flex items-center gap-4">
          <img
            src="/images/henderson-logo.png"
            alt={`${SITE.name} logo`}
            className="h-20 w-auto object-contain lg:h-24"
            loading="eager"
          />
          <div className="leading-tight">
            <p className="text-lg font-semibold tracking-tight text-slate-900 lg:text-xl">
              {SITE.name}
            </p>
            <p className="text-xs text-slate-500">{SITE.areaLabel}</p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1 text-xs font-medium text-slate-600 shadow-sm lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 transition ${
                  isActive ? "bg-emerald-600 text-white shadow-sm" : "hover:bg-white hover:text-slate-900"
                }`
              }
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          Menu
        </button>
      </Container>

      {/* Mobile nav */}
      {open ? (
        <div id="mobile-nav" className="border-t border-slate-200 bg-white lg:hidden">
          <Container className="py-3">
            <nav className="flex flex-col gap-2" aria-label="Mobile primary">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-xl border px-4 py-2 text-sm font-semibold ${
                      isActive ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-slate-50 text-slate-800"
                    }`
                  }
                  end={item.to === "/"}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
