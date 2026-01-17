import { SITE } from "../config/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/images/city-guilds-logo.png"
            alt="City & Guilds qualified"
            className="h-8 w-auto object-contain"
            loading="lazy"
          />
          <p>© {year} {SITE.name}.</p>
        </div>

        <div className="flex items-center gap-3 sm:ml-auto sm:justify-end">
          <p className="whitespace-nowrap text-[11px]">Premium garden care · {SITE.areaLabel}</p>

          {SITE.instagramUrl ? (
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-600 text-emerald-700 hover:bg-emerald-50"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17" cy="7" r="1" />
              </svg>
            </a>
          ) : null}

          {SITE.facebookUrl ? (
            <a
              href={SITE.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-600 text-emerald-700 hover:bg-emerald-50"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M13 21v-7h2.5a1 1 0 0 0 .98-.8l.5-3A1 1 0 0 0 16 9h-3V7.5A1.5 1.5 0 0 1 14.5 6H17a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-2.5A4.5 4.5 0 0 0 10 7.5V9H8a1 1 0 0 0-1 .9l-.5 3A1 1 0 0 0 7.5 14H10v7h3z" />
              </svg>
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
