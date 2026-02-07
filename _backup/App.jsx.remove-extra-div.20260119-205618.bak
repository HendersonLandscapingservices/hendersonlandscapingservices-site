import { useState, useEffect } from "react";

/**
 * CONTACT DETAILS
 */
const CONTACT = {
  phoneDisplay: "07766 645221",
  phoneTel: "07766645221",
  email: "enquiries@hendersonlandscapingservices.co.uk",
};





const WHATSAPP = {
  phoneIntl: "447766645221",
  message: "Hi Joel - I'd like a quote please. My postcode is ____ and I'm looking for help with ____.",
};
const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "design", label: "Design" },
  { id: "services", label: "Services" },
  { id: "about", label: "About us" },
  { id: "booking", label: "Enquiry" },
  { id: "gallery", label: "Gallery" },
  { id: "hints", label: "Hints & Tips" },
];

const hintsTipsPosts = [
  {
    id: 1,
    title: "Spring Lawn Reset: 5 Simple Wins Before Easter",
    category: "Lawn Care",
    readTime: "4 min read",
    summary:
      "A quick checklist to get your lawn ready for the season - without needing a full renovation.",
    bullets: [
      "When and how to do your first cut",
      "Why you should avoid scalping the lawn",
      "Simple feed options that actually help",
      "Dealing with moss and compaction",
    ],
    published: "March 2025",
  },
  {
    id: 2,
    title: "Waterlogging & Drainage: Early Warning Signs in Burnley Gardens",
    category: "Drainage",
    readTime: "3 min read",
    summary:
      "How to spot drainage issues early and what you can do before it becomes a bigger (and more expensive) problem.",
    bullets: [
      "Tell-tale puddles that don't disappear",
      "What your lawn colour is telling you",
      "Simple tests you can do with a garden fork",
      "When it's time to bring in a drainage plan",
    ],
    published: "February 2025",
  },
  {
    id: 3,
    title: "Low-Maintenance Structure: 5 Reliable Shrubs for Busy Households",
    category: "Planting Design",
    readTime: "5 min read",
    summary:
      "Evergreen structure that looks good year-round with minimal fuss - ideal for family gardens.",
    bullets: [
      "How to choose shrubs that don't dominate the space",
      "Planting for year-round interest",
      "Basic pruning rules most people overcomplicate",
    ],
    published: "January 2025",
  },
  {
    id: 4,
    title: "How Often Should You Scarify Your Lawn?",
    category: "Lawn Care",
    readTime: "3 min read",
    summary:
      "Scarifying is powerful - but overdoing it can set your lawn back. Here are some simple rules of thumb.",
    bullets: [
      "Signs your lawn is ready (or not ready)",
      "Best times of year in the North West",
      "How scarifying links with aeration and feeding",
    ],
    published: "November 2024",
  },
];

// Pricing configuration
const PRICING_CONFIG = {
  dayRateGeneral: 400,
  profitMarginStandard: 0.3,
  minChargeLawn: 35,
  minChargeGardenTidy: 120,
  minChargeHedge: 120,
  regularDiscountRate: 0.2,
  regularMinVisits: 4,
  marketPosition: "Medium", // Undercut | Medium | Premium
  rounding: 5,
};

// Lawn assumptions (still used for condition/complexity factors)
const LAWN_MOWER_OUTPUT = {
  standard: 250,
  large: 350,
  rideOn: 900,
};

const LAWN_CONDITION_FACTOR = {
  maintained: 1,
  long: 1.5,
  veryLong: 2.0,
};

const LAWN_OBSTACLE_FACTOR = {
  open: 1,
  moderate: 1.1,
  complex: 1.2,
};

const LAWN_EDGE_FACTOR = {
  mowOnly: 1,
  strim: 1.1,
  crisp: 1.2,
};

const LAWN_COLLECTION_FACTOR = {
  mulch: 1,
  bagOnsite: 1.1,
  remove: 1.2,
};

const LAWN_ACCESS_FACTOR = {
  easy: 1,
  awkward: 1.1,
  veryAwkward: 1.2,
};

// Garden clean-up assumptions
const GARDEN_SIZE_BAND_HOURS = {
  small: 2,
  medium: 3.5,
  large: 5.5,
  xl: 8,
};

const GARDEN_SEASON_FACTOR = {
  summer: 1,
  autumn: 1.1,
  winter: 1.2,
};

const GARDEN_OVERGROWTH_FACTOR = {
  maintained: 1,
  overgrown: 1.2,
  veryOvergrown: 1.4,
};

const HEDGE_WIDTH_FACTOR = {
  maintained: 1,
  long: 1.6,
  veryLong: 2.3,
};

function roundTo(value, increment) {
  if (!increment) return value;
  return Math.round(value / increment) * increment;
}

function getMarketAdjustment(position) {
  if (position === "Undercut") return -0.05;
  if (position === "Premium") return 0.1;
  return 0;
}

// Lawn price estimator - linear 0.38 £/m² core logic
function estimateLawnPrice({
  areaSqm,
  condition = "maintained",
  obstacles = "open",
  edges = "mowOnly",
  clippings = "mulch",
  access = "easy",
  isRegular = false,
  visitsPerYear = 1,
}) {
  const area = Number(areaSqm || 0);
  if (!area || area <= 0) return null;

  const BASE_PRICE_PER_SQM = 0.38; // £0.38 per m² base rate

  let pricePerSqm = BASE_PRICE_PER_SQM;
  pricePerSqm *= LAWN_CONDITION_FACTOR[condition] ?? 1;
  pricePerSqm *= LAWN_OBSTACLE_FACTOR[obstacles] ?? 1;
  pricePerSqm *= LAWN_EDGE_FACTOR[edges] ?? 1;
  pricePerSqm *= LAWN_COLLECTION_FACTOR[clippings] ?? 1;
  pricePerSqm *= LAWN_ACCESS_FACTOR[access] ?? 1;

  let price = area * pricePerSqm;

  // Regular discount
  if (isRegular && visitsPerYear >= PRICING_CONFIG.regularMinVisits) {
    price = price * (1 - PRICING_CONFIG.regularDiscountRate);
  }

  // Min charge logic
  const smallLawnMin = 30;
  const baseMinCharge =
    area < 40 ? smallLawnMin : PRICING_CONFIG.minChargeLawn;

  // Market positioning tweak
  const marketAdjustment = getMarketAdjustment(PRICING_CONFIG.marketPosition);
  price = price * (1 + marketAdjustment);

  const final = roundTo(
    Math.max(price, baseMinCharge),
    PRICING_CONFIG.rounding
  );

  return {
    total: final,
    perSqm: final / area,
    estimatedHours: null,
  };
}

// Garden care / renovation estimator
function estimateGardenPrice({
  sizeBand = "medium",
  season = "summer",
  overgrowth = "maintained",
}) {
  const baseHours = GARDEN_SIZE_BAND_HOURS[sizeBand];
  if (!baseHours) return null;

  const seasonFactor = GARDEN_SEASON_FACTOR[season] ?? 1;
  const overgrowthFactor = GARDEN_OVERGROWTH_FACTOR[overgrowth] ?? 1;

  const estimatedHours =
    baseHours * seasonFactor * overgrowthFactor * (1 / 0.75);

  const baseCost = (estimatedHours / 8) * PRICING_CONFIG.dayRateGeneral;

  const priceBeforeMin =
    baseCost * (1 + PRICING_CONFIG.profitMarginStandard);

  const minCharge = PRICING_CONFIG.minChargeGardenTidy;
  const marketAdjustment = getMarketAdjustment(PRICING_CONFIG.marketPosition);
  const preRounded =
    Math.max(priceBeforeMin, minCharge) * (1 + marketAdjustment);

  const final = roundTo(preRounded, PRICING_CONFIG.rounding);

  return {
    total: final,
    estimatedHours,
  };
}

// Hedge care estimator
function estimateHedgePrice({ lengthM, heightM, width = "maintained" }) {
  const rawLength = Number(lengthM || 0);
  const rawHeight = Number(heightM || 0);
  if (!rawLength || rawLength <= 0 || !rawHeight || rawHeight <= 0) return null;

  // Minimum charge: treat anything under 4m as 4m, min height 1m
  const effectiveLength = Math.max(rawLength, 4);
  const effectiveHeight = Math.max(rawHeight, 1);

  // Height factor
  let heightFactor = 1;
  if (effectiveHeight > 2.5 && effectiveHeight <= 3) {
    heightFactor = 1.3;
  } else if (effectiveHeight > 3 && effectiveHeight <= 3.5) {
    heightFactor = 1.6;
  } else if (effectiveHeight > 3.5) {
    heightFactor = 2.0;
  }

  // Growth / overgrown factor
  let growthFactor = 1;
  if (width === "long") {
    growthFactor = 1.35;
  } else if (width === "veryLong") {
    growthFactor = 1.8;
  }

  const baseRatePerM = 20; // £20/m for well-maintained hedge <2.5m
  let price = effectiveLength * baseRatePerM * heightFactor * growthFactor;

  const marketAdjustment = getMarketAdjustment(PRICING_CONFIG.marketPosition);
  price = price * (1 + marketAdjustment);

  const minCharge = PRICING_CONFIG.minChargeHedge; // £120
  const finalPrice = roundTo(
    Math.max(price, minCharge),
    PRICING_CONFIG.rounding
  );

  return {
    total: finalPrice,
    detail: {
      rawLength,
      rawHeight,
      effectiveLength,
      effectiveHeight,
      baseRatePerM,
      heightFactor,
      growthFactor,
      minCharge,
      marketAdjustment,
    },
  };
}

function trackTabView(tabId) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_title: `Henderson - ${tabId}`,
      page_location: window.location.href,
      page_path: `/${tabId}`,
    });
  }
}

/**
 * GALLERY - define images explicitly so mobile doesn't "only load a few"
 * (and so you don't depend on preload timing / bandwidth).
 */
const GALLERY_IMAGE_COUNT = 24;
const GALLERY_IMAGES = Array.from({ length: GALLERY_IMAGE_COUNT }, (_, i) => {
  const n = i + 1;
  return {
    src: `/images/gallery-${n}.jpg`,
    title: `Project photo ${n}`,
  };
});

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [showEstimator, setShowEstimator] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    trackTabView(tabId);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      <main>
        {activeTab === "home" && (
          <HomeSection onBookClick={() => handleTabChange("booking")} />
        )}
        {activeTab === "services" && (
          <ServicesSection onBookClick={() => handleTabChange("booking")} />
        )}
        {activeTab === "about" && <AboutSection />}
        {activeTab === "booking" && <BookingSection />}
        {activeTab === "design" && (
          <DesignSection onEnquireClick={() => handleTabChange("booking")} />
        )}
        {activeTab === "gallery" && <GallerySection />}
        {activeTab === "hints" && <HintsTipsSection />}
      </main>

      <Footer />


      <FloatingActions onOpenEstimator={() => setShowEstimator(true)} />
{showEstimator && (
        <EstimatorPanel
          onClose={() => setShowEstimator(false)}
          onGoToBooking={() => {
            handleTabChange("booking");
            setShowEstimator(false);
          }}
        />
      )}
    </div>
  );
}

function Header({ activeTab, onTabChange }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 lg:py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo + brand */}
          <div className="flex items-center gap-3">
            <img
              src="/images/henderson-logo.png"
              alt="Henderson Landscaping Services logo"
              className="h-20 w-auto object-contain sm:h-24 lg:h-28"
              decoding="async"
            />
            <div className="leading-tight min-w-0">
              <p className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg lg:text-xl">
                Henderson Landscaping Services
              </p>
              <p className="text-xs text-slate-500">East Lancashire</p>

              {/* Mobile contact line (bigger, no underline) */}
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-base text-slate-700 lg:hidden">
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="font-semibold hover:text-slate-900"
                >
                  {CONTACT.phoneDisplay}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-semibold hover:text-slate-900"
                >
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right side: desktop contact + nav */}
          <div className="flex flex-col gap-3 lg:items-end">
            {/* Desktop contact (bigger, no underline) */}
            <div className="hidden lg:flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-lg text-slate-700">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="font-semibold hover:text-slate-900"
              >
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-semibold hover:text-slate-900"
              >
                {CONTACT.email}
              </a>
            </div>

            {/* Navigation (scrollable on small screens to prevent layout break) */}
            <nav className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1 text-xs font-medium text-slate-600 shadow-sm overflow-x-auto">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`shrink-0 rounded-full px-3 py-1.5 transition ${
                    activeTab === item.id
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "hover:bg-white hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * HOME - full-banner hero image (background), text on the left
 */
function HomeSection({ onBookClick }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white min-h-[440px] lg:min-h-[540px]">
        {/* Full-banner background image */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/gallery-1.jpg"
            alt="Example of a finished garden with structured planting and a neat lawn"
            className="h-full w-full object-cover brightness-150"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-6xl items-center px-4 py-10 lg:py-12">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Premium garden care
            </p>

            {/* FIX: no nowrap, all-white headline, better leading on mobile */}
            <h1 className="mt-3 text-3xl font-semibold tracking-tight leading-[1.08] sm:text-4xl lg:text-5xl">
              <span className="block">Stunning gardens</span>
              <span className="block text-white">
                designed and maintained for you.
              </span>
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-emerald-100">
              From mowing and light maintenance to full garden design and
              renovations, our aim is to help homeowners and businesses across
              East Lancashire design and maintain gardens and outdoor spaces to
              be proud of.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Request a quote
              </button>
              <span className="text-xs text-emerald-100/80">
                Free, no-obligation quotes · Fully insured
              </span>
            </div>

            {/* Contact details on hero (bigger, no underline) */}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-base text-emerald-100/95 sm:text-lg">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="font-semibold text-white hover:text-emerald-100"
              >
                Call: {CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-semibold text-white hover:text-emerald-100"
              >
                Email: {CONTACT.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-10">
        <TestimonialsSection />
      </div>
</>
  );
}

/**
 * SERVICES
 */
function ServicesSection({ onBookClick }) {
  const categories = [
    {
      id: "lawn-care",
      nav: "Lawn care",
      title: "Lawn care (mowing, treatments & renovation)",
      summary:
        "Everything lawn-related in one place: regular mowing, edging and seasonal improvement work.",
      includes: [
        "Regular mowing and edging",
        "Scarifying and aeration",
        "Overseeding and improvement work",
        "Seasonal lawn health improvements",
      ],
      tags: ["Mowing", "Lawn renovation"],
      cta: "Enquire about lawn care",
    },
    {
      id: "tree-hedge",
      nav: "Trees & hedges",
      title: "Tree and hedge care (including hedge planting)",
      summary:
        "Maintenance and shaping for hedges and trees, with hedge planting for structure, privacy and wildlife value.",
      includes: [
        "Hedge trimming and shaping",
        "Sensible reductions and tidy-ups",
        "New hedge planting (native or evergreen)",
        "Aftercare advice for establishment",
      ],
      tags: ["Hedge care", "Hedge planting"],
      cta: "Enquire about hedges/trees",
    },
    {
      id: "garden-maintenance",
      nav: "Garden maintenance",
      title: "Garden maintenance, renovations and clearances",
      summary:
        "Ongoing maintenance or one-off recovery visits to bring gardens back under control, improve structure and keep everything looking sharp.",
      includes: [
        "Weeding and border maintenance",
        "Seasonal cutbacks and reshaping",
        "Overgrown garden recovery / clearances",
        "Phased renovations",
      ],
      tags: ["Maintenance", "Clearances"],
      cta: "Enquire about garden maintenance",
    },
    {
      id: "exterior-maintenance",
      nav: "Exterior maintenance",
      title: "Exterior maintenance (gutters and power washing)",
      summary:
        "Simple exterior maintenance that improves kerb appeal and reduces problems: clear gutters, clean surfaces and keep things safer underfoot.",
      includes: [
        "Gutter clearing and debris removal",
        "Pressure washing (patios, paths, driveways)",
],
      tags: ["Gutters", "Power washing"],
      cta: "Enquire about exterior maintenance",
    },
    {
      id: "landscaping",
      nav: "Landscaping",
      title: "Hard and soft landscaping (including drainage solutions)",
      summary:
        "Fencing, decking, paving and improvements, and troubleshooting for waterlogging/poor drainage.",
      includes: [
        "Fencing supply/installation and repairs",
        "Decking (timber or composite)",
        "Patios / paving / edging improvements",
        "Drainage and waterlogging solutions",
      ],
      tags: ["Hard landscaping", "Soft landscaping"],
      cta: "Enquire about landscaping",
    },
    {
      id: "robot-mower",
      nav: "Robot mowers",
      title: "Robot mower surveys, specification and installation",
      summary:
        "A low-effort lawn option for suitable gardens. We survey, specify the right kit, install and set everything up properly.",
      includes: [
        "Site survey and suitability checks",
        "Specification and boundary planning",
        "Installation and setup",
        "Programming and handover guidance",
      ],
      tags: ["Robot mowers", "Low-effort lawns"],
      cta: "Enquire about robot mowers",
    },
  ];

  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i === 0 ? categories.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === categories.length - 1 ? 0 : i + 1));

  return (
    <section>
      {/* Page hero with faded image */}
      <div className="relative border-b border-slate-200 bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/images/gallery-1.jpg"
            alt="Striped lawn and neat borders - example of our lawn and garden care work"
            className="h-full w-full object-cover opacity-40"
            decoding="async"
          />
        </div>
        <div className="relative mx-auto flex min-h-[220px] max-w-6xl flex-col gap-4 px-4 py-10 lg:min-h-[240px] lg:flex-row lg:items-center lg:justify-between lg:py-12">
          <div className="max-w-xl">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Services
            </h1>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
              Burnley and surrounding areas
            </p>
          </div>
        </div>
      </div>

            {/* Domestic and commercial clients */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <div className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 text-base text-slate-800">
          <p className="text-lg font-semibold text-emerald-900">
            Domestic and commercial clients
          </p>
          <p className="mt-1 text-slate-700">
            We work with homeowners, landlords, and businesses across East Lancashire.
          </p>
        </div>
      </div>
      </div>

      {/* Carousel + details */}
      <div className="mx-auto max-w-6xl px-4 pt-0 pb-10 lg:pt-0 lg:pb-12">
        {/* Arrows only (no extra headings) */}
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={prev}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            aria-label="Previous service category"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            aria-label="Next service category"
          >
            ›
          </button>
        </div>

        {/* Carousel shell */}
        <div className="mt-4 relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: "translateX(-" + index * 100 + "%)" }}
          >
            {categories.map((cat) => (
              <div key={cat.id} className="w-full shrink-0 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  {cat.nav}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {cat.summary}
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {cat.includes.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={onBookClick}
                    className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500"
                  >
                    {cat.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selector pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                i === index
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
              aria-label={`Select ${cat.nav}`}
            >
              {cat.nav}
            </button>
          ))}
        </div>

        {/* Bigger footer copy */}
        <p className="mt-6 text-sm text-slate-600">
          Our online estimator gives a guide price for key services. Final quotes are always confirmed after a quick visit or photos of your garden.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Don&apos;t see a service you need? Please ask - we aim to be a one-stop shop for all external hard and soft landscaping requirements. If we can&apos;t quote directly, we&apos;ll usually be able to point you in the right direction.
        </p>
      </div>
    </section>
  );
}

/**
 * ABOUT
 */
function AboutSection() {
  return (
    <section>
      {/* Page hero with faded image - consistent size with other internal pages */}
      <div className="relative border-b border-slate-200 bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/images/gallery-2.jpg"
            alt="Finished family garden with seating and planting"
            className="h-full w-full object-cover opacity-40"
            decoding="async"
          />
        </div>
        <div className="relative mx-auto flex min-h-[220px] max-w-6xl flex-col gap-4 px-4 py-10 lg:min-h-[240px] lg:flex-row lg:items-center lg:justify-between lg:py-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              About us
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Henderson Landscaping Services
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-emerald-100/90">
              Reliable, premium garden care and design across East Lancashire.
            </p>
          </div>
        </div>
      </div>

      {/* Owner + intro (with wrapped image on desktop) */}
      <div className="mx-auto max-w-6xl px-4 pt-0 pb-10 lg:pt-0 lg:pb-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Who we are
          </p>

          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start">
            <div className="order-2 flex-1 space-y-3 text-sm leading-relaxed text-slate-700 lg:order-1">
              <p>
                Henderson Landscaping Services was established to provide homeowners and businesses with a reliable,
                considered alternative to rushed maintenance and unclear pricing. We deliver high-quality lawn care,
                hedge management, practical planting and effective problem-solving, supported by clear communication
                and a consistent, professional service.
              </p>

              <p>
                We support a long-standing portfolio of domestic and commercial clients across East Lancashire, maintaining
                everything from small front gardens to shared spaces and courtyards that must remain tidy, safe and presentable
                throughout the year.
              </p>
            </div>

            <div className="order-1 w-full max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-1 lg:order-2 lg:max-w-[300px]">
              <img
                src="/images/owner.jpg"
                alt="Joel Henderson, owner of Henderson Landscaping Services"
                className="w-full max-h-[320px] object-cover"
                decoding="async"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Main about copy - centred block, plus sustainability box */}
        <div className="mx-auto mt-10 max-w-3xl space-y-4 text-sm leading-relaxed text-slate-700">
          <p>
            After years working for local gardening companies and the council, I decided it was time to start my own
            gardening business at the beginning of 2020. It was not the easiest time to launch, arriving just as the pandemic hit,
            but the business has grown from strength to strength. Today we look after a loyal customer base of regular domestic and
            commercial clients across East Lancashire, alongside one-off commissions for hard and soft landscaping and full garden makeovers.
          </p>
          <p>
            We take sustainability very seriously and are passionate about caring for the environment. Having spent many years working with
            petrol equipment and pesticides for other gardeners, I was determined that my own business would put sustainability at the heart of what we do.
            We drive electric vehicles, use battery tools wherever possible and minimise the use of chemicals. All of the electricity we use is from renewable sources,
            around 25% of which comes from our own solar and battery system.
          </p>
          <p>
            Our work ranges from regular lawn care and light maintenance through to full garden renovations, problem-solving and planting schemes.
            We treat every garden as if it were our own, taking time to understand how you use the space and what you want it to do for you,
            then suggesting practical steps that fit your budget and timescale.
          </p>
          <p>
            We are also able to offer garden design services for clients outside our normal catchment area. From ideas and layout concepts to full planting schemes
            and phased improvement plans, we can help you get from a rough idea to a clear, buildable design. Where helpful, we can also assist you in liaising with
            local tradespeople, so you receive fair prices and work with qualified individuals who can turn those plans into reality.
          </p>
          <p>
            I hold City &amp; Guilds qualifications and continue to enhance my knowledge with training courses to offer the best possible experience for our customers.
            To further develop the business, I am currently studying a degree in horticulture and garden design, combining practical on-site experience with up-to-date theory and best practice.
          </p>

          <p className="text-sm font-medium text-slate-900">
            If you want someone who will go the extra mile and treat your garden as if it were our own, you&apos;re in the right place.
          </p>

          {/* Sustainability box with download */}
          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-xs text-slate-800">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800">
              Sustainability &amp; environment
            </p>
            <p className="mt-2">
              We are committed to running Henderson Landscaping Services in a way that&apos;s kinder to the environment.
              Our goal is to make the business operationally carbon-neutral by <strong>2035</strong> and to move towards{" "}
              <strong>chemical-free maintenance</strong> wherever it&apos;s practical to do so.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>Expanding the use of electric vehicles and battery-powered tools across the business.</li>
              <li>Minimising routine use of synthetic pesticides and weedkillers, favouring cultural controls and lower-impact options.</li>
              <li>Using 100% renewable electricity, with a growing proportion generated by our own solar and battery system.</li>
            </ul>
            <a
              href="/guides/sustainability-commitment-2035.pdf"
              className="mt-3 inline-flex text-[11px] font-semibold text-emerald-800 underline underline-offset-2"
              download
            >
              Download our sustainability &amp; environmental commitment (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function DesignSection({ onEnquireClick }) {
  const offerings = [
    {
      key: "design-online",
      name: "Design consultation (online)",
      description:
        "A focused session using your photos and a rough plan to review layout, problem areas and planting ideas. Ideal for early-stage planning or clients outside our normal catchment area.",
      note: "Enquire for availability and fixed price",
      hasChecklist: true,
    },
    {
      key: "design-onsite",
      name: "Design consultation (on-site)",
      description:
        "An in-person visit to assess levels, drainage, access and how you use the space. We'll agree priorities and outline a practical plan to move forward.",
      note: "Best for local projects and renovations",
      hasChecklist: false,
    },
  ];
  return (
    <section>
      {/* Page hero with faded image */}
      <div className="relative border-b border-slate-200 bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/images/gallery-3.jpg"
            alt="Garden design and planting - example of a structured border and seating area"
            className="h-full w-full object-cover opacity-40"
            decoding="async"
          />
        </div>
        <div className="relative mx-auto flex min-h-[220px] max-w-6xl flex-col gap-4 px-4 py-10 lg:min-h-[240px] lg:flex-row lg:items-center lg:justify-between lg:py-12">
          <div className="max-w-xl">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Design
            </h1>
            <p className="mt-2 text-sm text-emerald-100/90">
              Hard and soft landscaping design service
            </p>
          </div>
        </div>
      </div>

      {/* Offerings */}
      <div className="mx-auto max-w-6xl px-4 pt-0 pb-10 lg:pt-0 lg:pb-12">
        <div className="grid gap-6 md:grid-cols-2">
          {offerings.map((item) => (
            <article
              key={item.key}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div>
                <h3 className="text-base font-semibold tracking-tight text-slate-900">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {item.description}
                </p>
                {item.hasChecklist && (
                  <a
                    href="/guides/design-consultation-checklist.pdf"
                    className="mt-2 inline-flex text-[11px] font-semibold text-emerald-700 underline underline-offset-2"
                    download
                  >
                    Download a quick design consultation checklist
                  </a>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                <p className="text-slate-500">{item.note}</p>
                <button
                  type="button"
                  onClick={onEnquireClick}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-emerald-500"
                >
                  Send an enquiry
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * ENQUIRY
 * FIX: send to /api/enquiry (Cloudflare Pages Function) so it lands in email.
 */
function BookingSection() {
  const [status, setStatus] = useState({ type: "idle", message: ""});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "sending", message: "Sending your enquiry..." });

    const form = event.currentTarget;
    const fd = new FormData(form);

    // Honeypot (bots)
    const company = (fd.get("company") || "").toString().trim();
    if (company) {
            // [ADS_CONVERSION_LEAD] Google Ads conversion: Submit lead form
      window.gtag?.("event", "conversion", {
        send_to: "AW-17866270140/U4gPCLOF9eEbELzLpsdC",
      });

      setStatus({
        type: "success",
        message: "Thanks - your enquiry has been received.",
      });
      form.reset();
      return;
    }

    const payload = {
      name: (fd.get("name") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      phone: (fd.get("phone") || "").toString().trim(),
      postcode: (fd.get("postcode") || "").toString().trim(),
      service: (fd.get("service") || "").toString().trim(),
      availability: (fd.get("availability") || "").toString().trim(),
      details: (fd.get("details") || "").toString().trim(),
      photosLink: (fd.get("photosLink") || "").toString().trim(),
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed (${res.status})`);
      }

      
      // Google Ads conversion: Submit lead form
      window.gtag?.("event", "conversion", {
        send_to: "AW-17866270140/U4gPCLOF9eEbELzLpsdC",
      });
      setStatus({
        type: "success",
        message:
          "Thank you - your enquiry has been sent. We'll be in touch shortly.",
      });
      form.reset();
    } catch (err) {
      setStatus({
        type: "error",
        message:
          "Sorry - something went wrong sending your enquiry. Please try again, or contact us directly using the phone/email below.",
      });
    }
  };

  return (
    <section id="booking">
      {/* Page hero with faded image */}
      <div className="relative border-b border-slate-200 bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/images/gallery-4.jpg"
            alt="Garden pathway and planting - welcoming front garden example"
            className="h-full w-full object-cover opacity-40"
            decoding="async"
          />
        </div>
        <div className="relative mx-auto flex min-h-[220px] max-w-6xl flex-col gap-4 px-4 py-10 lg:min-h-[240px] lg:flex-row lg:items-center lg:justify-between lg:py-12">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
              Enquiry
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Send an enquiry or request a quote
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-emerald-100/90">
              Share a few details about your garden and what you&apos;re looking
              for.
            </p>
<p className="mt-3 text-xs text-emerald-100/80">
              For online garden design consultations, please use this enquiry
              form. We'll confirm the best option (online or on-site), suggest a
              couple of times, and share pricing and next steps.
            </p>
          </div>
        </div>
      </div>

      {/* Booking form */}
      <div className="mx-auto max-w-3xl px-4 py-10 lg:py-12">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          {/* Honeypot (hidden) */}
          <div className="hidden">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" tabIndex={-1} />
          </div>

          {status.type !== "idle" && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                  : status.type === "error"
                  ? "border-rose-200 bg-rose-50 text-rose-900"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-slate-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 placeholder:text-slate-400 focus:bg-white focus:ring-2"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 placeholder:text-slate-400 focus:bg-white focus:ring-2"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-medium text-slate-700"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 placeholder:text-slate-400 focus:bg-white focus:ring-2"
              />
            </div>
            <div>
              <label
                htmlFor="postcode"
                className="block text-xs font-medium text-slate-700"
              >
                Postcode
              </label>
              <input
                id="postcode"
                name="postcode"
                type="text"
                required
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 placeholder:text-slate-400 focus:bg-white focus:ring-2"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                We mainly cover Burnley and surrounding areas.
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="service"
              className="block text-xs font-medium text-slate-700"
            >
              What are you looking for?
            </label>
            <select
              id="service"
              name="service"
              required
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 focus:bg-white focus:ring-2"
            >
              <option value="">Please select</option>
              <option value="lawn-care">Lawn care / regular cuts</option>
              <option value="hedge-planting">Hedge planting</option>
              <option value="hedge-maintenance">Hedge maintenance</option>
              <option value="planting-design">Planting design / new beds</option>
              <option value="garden-clean-up">Garden clean-up / overhaul</option>
              <option value="drainage">Drainage / waterlogging issues</option>
              <option value="design-consultation-online">
                Design consultation (online)
              </option>
              <option value="design-consultation-on-site">
                Design consultation (on-site)
              </option>
              <option value="other">Something else</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="availability"
              className="block text-xs font-medium text-slate-700"
            >
              Preferred days / times
            </label>
            <textarea
              id="availability"
              name="availability"
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 placeholder:text-slate-400 focus:bg-white focus:ring-2"
              placeholder="For example: weekday mornings, or Friday afternoons."
            />
            <p className="mt-1 text-[11px] text-slate-500">
              We will cross-check this against our live calendar and offer
              the closest available slots for on-site work.
            </p>
          </div>

          <div>
            <label
              htmlFor="details"
              className="block text-xs font-medium text-slate-700"
            >
              Tell us a bit about your garden
            </label>
            <textarea
              id="details"
              name="details"
              rows={4}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 placeholder:text-slate-400 focus:bg-white focus:ring-2"
              placeholder="Lawn size, hedges, any problem areas, how long since your last tidy, etc."
            />
          </div>

          <div>
            <label
              htmlFor="photosLink"
              className="block text-xs font-medium text-slate-700"
            >
              Photos / garden plan (optional)
            </label>
            <input
              id="photosLink"
              name="photosLink"
              type="text"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 placeholder:text-slate-400 focus:bg-white focus:ring-2"
              placeholder="Link to shared folder (Google Drive, Dropbox, etc.), or mention you'll email photos."
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Ideally 4-8 clear photos and, if possible, a simple plan or rough
              sketch of your garden. This is especially helpful for online
              design consultations.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>
              By submitting this form you agree that we can contact you about
              your enquiry. We don&apos;t share your details with third parties.
            </p>
            <button
              type="submit"
              disabled={status.type === "sending"}
              className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                status.type === "sending"
                  ? "bg-emerald-400"
                  : "bg-emerald-600 hover:bg-emerald-500"
              }`}
            >
              {status.type === "sending" ? "Sending..." : "Send enquiry"}
            </button>
          </div>
        </form>

        {/* Deposit / online payment info for on-site work */}
        <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-[11px] text-slate-800">
          <p className="font-semibold text-emerald-900">
            Prefer to secure your on-site visit with a deposit?
          </p>
          <p className="mt-1">
            Once we&apos;ve agreed a date for on-site work, you can optionally
            pay a small deposit to confirm your slot. This is deducted from your
            final invoice and helps us keep the schedule running smoothly.
          </p>
          <p className="mt-1">
            This deposit option is mainly for in-person work. For online garden
            design consultations, please use the enquiry form above. Once we
            confirm the scope, we&apos;ll share pricing and a payment link if
            needed.
          </p>
          <p className="mt-1">
            When a deposit is needed, we&apos;ll send a separate online payment
            link or bank transfer details along with your booking confirmation.
          </p>
        </div>

        {/* Cancellation policy toggle */}
        <div className="mt-4">
          <details className="group rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[11px] text-slate-700">
            <summary className="flex cursor-pointer items-center justify-between gap-2 font-semibold text-slate-800">
              <span>Cancellation &amp; refund policy</span>
              <span className="text-xs text-slate-500 group-open:hidden">
                Tap to view
              </span>
              <span className="hidden text-xs text-slate-500 group-open:inline">
                Tap to hide
              </span>
            </summary>
            <div className="mt-3 space-y-1.5">
              <p>
                Online garden design consultations are paid in advance via our
                online booking system.
              </p>
              <ul className="list-disc space-y-1 pl-4">
                <li>
                  You can reschedule or cancel up to 24 hours before your
                  appointment for a full refund or a new time slot.
                </li>
                <li>
                  Cancellations with less than 24 hours&apos; notice or missed
                  appointments are normally non-refundable.
                </li>
                <li>
                  If we ever need to cancel, you can choose a new time or a full
                  refund where applicable.
                </li>
                <li>
                  For on-site work, any deposits are deducted from your final
                  invoice. If you need to rearrange, please contact us as early
                  as possible so we can look at rescheduling options.
                </li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

/**
 * GALLERY
 * FIX: deterministic list + light prefetch of next/prev image for smoother mobile.
 */
function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = GALLERY_IMAGES.length;
  const safeIndex = Math.min(Math.max(currentIndex, 0), total - 1);

  useEffect(() => {
    // Prefetch next + prev image to improve perceived speed
    const next = new Image();
    const prev = new Image();
    next.src = GALLERY_IMAGES[(safeIndex + 1) % total].src;
    prev.src = GALLERY_IMAGES[(safeIndex - 1 + total) % total].src;
  }, [safeIndex, total]);

  return (
    <section>
      {/* Banner with faded image */}
      <div className="relative border-b border-slate-200 bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/images/gallery-2.jpg"
            alt="Overview of a completed garden project"
            className="h-full w-full object-cover opacity-40"
            decoding="async"
          />
        </div>
        <div className="relative mx-auto flex min-h-[220px] max-w-6xl flex-col gap-4 px-4 py-10 lg:min-h-[240px] lg:flex-row lg:items-center lg:justify-between lg:py-12">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Gallery
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Recent work
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100">
              A small selection of our recent work. We can provide references
              and pictures of other work on request.
            </p>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="mx-auto max-w-4xl px-4 py-10 lg:py-12">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-72 bg-slate-100 sm:h-80 lg:h-96">
            <img
              src={GALLERY_IMAGES[safeIndex].src}
              alt={GALLERY_IMAGES[safeIndex].title}
              className="h-full w-full object-cover"
              decoding="async"
              loading="eager"
            />
          </div>

          {/* Carousel controls */}
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1))
            }
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/70 text-xs font-semibold text-white shadow hover:bg-slate-900/90"
            aria-label="Previous image"
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1))
            }
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/70 text-xs font-semibold text-white shadow hover:bg-slate-900/90"
            aria-label="Next image"
          >
            &gt;
          </button>

          {/* Dots (scrollable so they don't wrap awkwardly on mobile) */}
          <div className="flex items-center justify-center gap-2 pb-3 pt-3 overflow-x-auto px-3">
            {GALLERY_IMAGES.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 w-2.5 shrink-0 rounded-full border border-emerald-600/40 transition ${
                  index === safeIndex ? "bg-emerald-600" : "bg-white"
                }`}
                aria-label={`Show image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * HINTS & TIPS
 */
function HintsTipsSection() {
  return (
    <section>
      {/* Banner with faded image */}
      <div className="relative border-b border-slate-200 bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/images/gallery-2.jpg"
            alt="Seasonal gardening advice and guides"
            className="h-full w-full object-cover opacity-40"
            decoding="async"
          />
        </div>
        <div className="relative mx-auto flex min-h-[220px] max-w-6xl flex-col gap-4 px-4 py-10 lg:min-h-[240px] lg:flex-row lg:items-center lg:justify-between lg:py-12">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Hints &amp; Tips
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Practical garden advice
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100">
              Seasonal advice, common problems we see locally, and simple checklists you can follow yourself.
            </p>
          </div>
        </div>
      </div>

      {/* Combined intro box (single box) */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <div className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 text-sm text-slate-800">
          <p className="text-lg font-semibold text-emerald-900">How to use this page</p>
          <p className="mt-2 text-slate-700">
            We keep this section updated with seasonal advice, common problems we see in local gardens, and simple checklists you can follow yourself - or use as a starting point for a professional visit.
          </p>
          <p className="mt-4 text-base font-semibold text-slate-900">Latest hints &amp; tips</p>
          <p className="mt-1 text-sm text-slate-700">
            Browse our latest posts below. We will continue to add seasonal guides and deep dives over time.
          </p>
        </div>
      </div>

      {/* Posts grid (no dates/read-time rendered) */}
      <section className="mx-auto max-w-6xl px-4 pt-6 pb-10 lg:pt-6 lg:pb-12">
        <div className="grid gap-6 md:grid-cols-2">
          {hintsTipsPosts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <header>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-700">
                  {post.category}
                </p>
                <h3 className="mt-2 text-base font-semibold tracking-tight text-slate-900">
                  {post.title}
                </h3>
              </header>

              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {post.summary}
              </p>

              {post.bullets && post.bullets.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                  {post.bullets.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <footer className="mt-4 flex items-center justify-between text-xs">
                <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                  Garden know-how
                </span>
                <span className="text-slate-500">
                  Need help with this?{" "}
                  <span className="font-medium text-emerald-700">
                    Ask about a consultation when you get in touch.
                  </span>
                </span>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* Downloadable guides */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="mt-2 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs text-slate-800">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
            Downloadable winter guides
          </p>
          <p className="mt-2 text-[11px] text-slate-700">
            Prefer a printable version? Save these quick-reference PDFs to keep handy over winter.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <a
              href="/guides/winter-lawn-care-guide.pdf"
              className="inline-flex items-start gap-2 rounded-xl bg-white px-3 py-2 text-left text-[11px] text-emerald-900 hover:bg-emerald-50"
              download
            >
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              <span>
                <span className="font-semibold">Winter lawn care checklist</span>
                <br />
                Keep damage to a minimum until spring.
              </span>
            </a>
            <a
              href="/guides/winter-waterlogging-guide.pdf"
              className="inline-flex items-start gap-2 rounded-xl bg-white px-3 py-2 text-left text-[11px] text-emerald-900 hover:bg-emerald-50"
              download
            >
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              <span>
                <span className="font-semibold">Dealing with waterlogged lawns</span>
                <br />
                Simple checks and next steps for heavy soils.
              </span>
            </a>
            <a
              href="/guides/winter-pruning-guide.pdf"
              className="inline-flex items-start gap-2 rounded-xl bg-white px-3 py-2 text-left text-[11px] text-emerald-900 hover:bg-emerald-50"
              download
            >
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              <span>
                <span className="font-semibold">Winter pruning basics</span>
                <br />
                What you can safely prune - and what to leave.
              </span>
            </a>
            <a
              href="/guides/winter-planning-guide.pdf"
              className="inline-flex items-start gap-2 rounded-xl bg-white px-3 py-2 text-left text-[11px] text-emerald-900 hover:bg-emerald-50"
              download
            >
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              <span>
                <span className="font-semibold">Using winter to plan ahead</span>
                <br />
                Reflect, prioritise and plan improvements for next year.
              </span>
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
/**
 * FLOATING ACTIONS (Estimator + WhatsApp)
 */
function FloatingActions({ onOpenEstimator }) {
  const href =
    "https://wa.me/" +
    WHATSAPP.phoneIntl +
    "?text=" +
    encodeURIComponent(WHATSAPP.message);

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 transform items-center gap-3">
      <button
        type="button"
        onClick={onOpenEstimator}
        className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-200" />
        Quick price estimator
      </button>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-emerald-700 shadow-lg shadow-emerald-900/20 ring-1 ring-emerald-200 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
            <path d="M19.11 17.45c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.21-.59.07-.27-.14-1.14-.42-2.17-1.35-.8-.71-1.34-1.58-1.5-1.86-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.99 2.68 1.13 2.86.14.18 1.95 2.97 4.73 4.16.66.29 1.18.46 1.58.59.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.82-1.28.23-.63.23-1.16.16-1.28-.07-.12-.25-.18-.52-.32zM16.03 3.2c-7.11 0-12.89 5.78-12.89 12.89 0 2.28.6 4.51 1.75 6.48L3 29l6.6-1.73c1.9 1.04 4.04 1.58 6.22 1.58 7.11 0 12.89-5.78 12.89-12.89S23.14 3.2 16.03 3.2zm0 23.3c-2.03 0-4.03-.55-5.79-1.6l-.41-.24-3.92 1.03 1.05-3.82-.27-.43a10.45 10.45 0 0 1-1.66-5.69c0-5.78 4.7-10.48 10.48-10.48S26.51 9.97 26.51 15.75 21.81 26.5 16.03 26.5z"/>
          </svg>
        </span>
        WhatsApp
      </a>
    </div>
  );
}

function EstimatorPanel({ onClose, onGoToBooking }) {
  const [service, setService] = useState("lawn");
  const [lawnInputs, setLawnInputs] = useState({
    area: "",
    condition: "maintained",
  });
  const [gardenInputs, setGardenInputs] = useState({
    sizeBand: "medium",
    season: "summer",
    overgrowth: "maintained",
  });
  const [hedgeInputs, setHedgeInputs] = useState({
    length: "",
    height: "",
    width: "maintained",
  });
  const [result, setResult] = useState(null);
  const [resultService, setResultService] = useState(null);

  const handleEstimate = () => {
    let r = null;
    if (service === "lawn") {
      r = estimateLawnPrice({
        areaSqm: lawnInputs.area,
        condition: lawnInputs.condition,
        obstacles: "moderate",
        edges: "strim",
        clippings: "bagOnsite",
        access: "easy",
        isRegular: false,
      });
    } else if (service === "garden") {
      r = estimateGardenPrice({
        sizeBand: gardenInputs.sizeBand,
        season: gardenInputs.season,
        overgrowth: gardenInputs.overgrowth,
      });
    } else if (service === "hedge") {
      r = estimateHedgePrice({
        lengthM: hedgeInputs.length,
        heightM: hedgeInputs.height,
        width: hedgeInputs.width,
      });
    }
    setResult(r);
    setResultService(service);
  };

  const resetResultOnChange = () => {
    setResult(null);
    setResultService(null);
  };

  const renderResult = () => {
    if (!result) {
      return (
        <p className="text-xs text-slate-500">
          Enter your details and click{" "}
          <span className="font-medium text-slate-700">Get guide price</span>{" "}
          to see an approximate cost.
        </p>
      );
    }

    const titleMap = {
      lawn: "Mowing & lawn renovation",
      garden: "Garden refresh & renovation",
      hedge: "Tree & hedge care (existing hedges)",
    };

    return (
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Guide price - {titleMap[resultService]}
        </p>
        <p className="text-lg font-semibold text-slate-900">
          £{result.total.toFixed(0)}
        </p>
        {resultService === "lawn" &&
          typeof result.perSqm === "number" &&
          !Number.isNaN(result.perSqm) && (
            <p className="text-xs text-slate-600">
              £{result.perSqm.toFixed(2)} per m² based on your inputs.
            </p>
          )}
        <p className="mt-1 text-xs font-semibold text-slate-700">
          These prices are guide figures only, based on typical conditions and
          your answers. Final quotes are confirmed after a brief visit or from
          clear photos of your garden.
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={onGoToBooking}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            Send an enquiry with this service
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-[11px] font-medium text-slate-600 underline-offset-2 hover:underline"
          >
            Close estimator
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end sm:items-center">
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Close estimator"
      />

      {/* Panel */}
      <div className="relative z-50 w-full max-w-md rounded-t-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:m-4 sm:rounded-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Quick price estimator
            </p>
            <h2 className="mt-1 text-sm font-semibold tracking-tight text-slate-900">
              Get a guide price before you enquire
            </h2>
            <p className="mt-1 text-[11px] text-slate-500">
              Use this tool for a ballpark figure. We will confirm the final
              quote once we&apos;ve seen the garden.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        {/* Service selector */}
        <div className="mt-4 flex gap-2 text-[11px]">
          <button
            type="button"
            onClick={() => {
              setService("lawn");
              resetResultOnChange();
            }}
            className={`flex-1 rounded-full border px-3 py-1.5 font-medium transition ${
              service === "lawn"
                ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
            }`}
          >
            Mowing
          </button>
          <button
            type="button"
            onClick={() => {
              setService("garden");
              resetResultOnChange();
            }}
            className={`flex-1 rounded-full border px-3 py-1.5 font-medium transition ${
              service === "garden"
                ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
            }`}
          >
            Garden refresh/renovation
          </button>
          <button
            type="button"
            onClick={() => {
              setService("hedge");
              resetResultOnChange();
            }}
            className={`flex-1 rounded-full border px-3 py-1.5 font-medium transition ${
              service === "hedge"
                ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
            }`}
          >
            Hedges
          </button>
        </div>

        {/* Forms */}
        <div className="mt-4 space-y-4 text-[11px]">
          {service === "lawn" && (
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="lawn-area"
                  className="block text-[11px] font-medium text-slate-700"
                >
                  Approximate lawn area (m²)
                </label>
                <input
                  id="lawn-area"
                  type="number"
                  min="1"
                  value={lawnInputs.area}
                  onChange={(e) => {
                    setLawnInputs((prev) => ({
                      ...prev,
                      area: e.target.value,
                    }));
                    resetResultOnChange();
                  }}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/60"
                  placeholder="e.g. 80"
                />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700">
                    Lawn condition
                  </label>
                  <select
                    value={lawnInputs.condition}
                    onChange={(e) => {
                      setLawnInputs((prev) => ({
                        ...prev,
                        condition: e.target.value,
                      }));
                      resetResultOnChange();
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/60"
                  >
                    <option value="maintained">Maintained</option>
                    <option value="long">Quite long</option>
                    <option value="veryLong">Very long / first cut</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {service === "garden" && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-700">
                  Garden size
                </label>
                <select
                  value={gardenInputs.sizeBand}
                  onChange={(e) => {
                    setGardenInputs((prev) => ({
                      ...prev,
                      sizeBand: e.target.value,
                    }));
                    resetResultOnChange();
                  }}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/60"
                >
                  <option value="small">Small (up to ~50m²)</option>
                  <option value="medium">Medium (~50-150m²)</option>
                  <option value="large">Large (~150-300m²)</option>
                  <option value="xl">XL (300m²+)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700">
                    Season
                  </label>
                  <select
                    value={gardenInputs.season}
                    onChange={(e) => {
                      setGardenInputs((prev) => ({
                        ...prev,
                        season: e.target.value,
                      }));
                      resetResultOnChange();
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/60"
                  >
                    <option value="summer">Summer tidy</option>
                    <option value="autumn">Autumn / leaf-heavy</option>
                    <option value="winter">Winter cutback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700">
                    Current condition
                  </label>
                  <select
                    value={gardenInputs.overgrowth}
                    onChange={(e) => {
                      setGardenInputs((prev) => ({
                        ...prev,
                        overgrowth: e.target.value,
                      }));
                      resetResultOnChange();
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/60"
                  >
                    <option value="maintained">Maintained</option>
                    <option value="overgrown">Overgrown</option>
                    <option value="veryOvergrown">Very overgrown</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {service === "hedge" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="hedge-length"
                    className="block text-[11px] font-medium text-slate-700"
                  >
                    Hedge length (metres)
                  </label>
                  <input
                    id="hedge-length"
                    type="number"
                    min="1"
                    value={hedgeInputs.length}
                    onChange={(e) => {
                      setHedgeInputs((prev) => ({
                        ...prev,
                        length: e.target.value,
                      }));
                      resetResultOnChange();
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/60"
                    placeholder="e.g. 20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="hedge-height"
                    className="block text-[11px] font-medium text-slate-700"
                  >
                    Average height (metres)
                  </label>
                  <input
                    id="hedge-height"
                    type="number"
                    min="0.5"
                    step="0.1"
                    value={hedgeInputs.height}
                    onChange={(e) => {
                      setHedgeInputs((prev) => ({
                        ...prev,
                        height: e.target.value,
                      }));
                      resetResultOnChange();
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/60"
                    placeholder="e.g. 1.8"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700">
                  Growth / how long since last proper cut
                </label>
                <select
                  value={hedgeInputs.width}
                  onChange={(e) => {
                    setHedgeInputs((prev) => ({
                      ...prev,
                      width: e.target.value,
                    }));
                    resetResultOnChange();
                  }}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/60"
                >
                  <option value="maintained">Well maintained</option>
                  <option value="long">Quite long</option>
                  <option value="veryLong">
                    Very long / first cut in a while
                  </option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={handleEstimate}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            Get guide price
          </button>
          <div className="flex-1 text-right">{renderResult()}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * TESTIMONIALS
 */
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Henderson Landscaping Services has cared for our one-acre grounds for years. From mowing and hedge shaping to planting and seasonal tidy-ups, everything is discussed beforehand and the results are always excellent.",
      name: "D & K Shuttleworth",
    },
    {
      quote:
        "Joel supported us in planning and delivering a redesign of our front garden, and my husband and I are delighted with the result. Joel and the team worked extremely hard throughout and left everything tidy on completion.",
      name: "Nina, Burnley",
    },
  ];
  return (
    <section className="border-t border-slate-200 bg-slate-50 mt-10">
      <div className="mx-auto max-w-6xl px-4 pt-0 pb-10 lg:pt-0 lg:pb-12">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 text-center">
          What our customers say
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm"
            >
              <blockquote className="text-slate-700">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-xs font-medium text-slate-500">
                {item.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * FOOTER
 */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-build-id="build-20260117-202214" className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: qualifications + copyright */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              src="/images/city-guilds-logo.png"
              alt="City & Guilds qualified"
              className="h-8 w-auto object-contain"
              decoding="async"
              loading="lazy"
            />
          </div>
          <p>© {year} Henderson Landscaping Services.</p>
        </div>

        {/* Middle: removed contact info to reduce clutter */}

        {/* Right: tagline + social icons tight together */}
        <div className="flex items-center gap-3 sm:ml-auto sm:justify-end">
          <p className="whitespace-nowrap text-xs">
            Premium garden care · North West
          </p>

          {/* Instagram - real profile */}
          <a
            href="https://www.instagram.com/hendersonlandscapingservices/"
            target="_blank"
            rel="noreferrer"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-600 text-emerald-700 hover:bg-emerald-50"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17" cy="7" r="1" />
            </svg>
          </a>

          {/* Facebook - real page */}
          <a
            href="https://www.facebook.com/p/Henderson-Landscaping-Services-100094012471732/"
            target="_blank"
            rel="noreferrer"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-600 text-emerald-700 hover:bg-emerald-50"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="M13 21v-7h2.5a1 1 0 0 0 .98-.8l.5-3A1 1 0 0 0 16 9h-3V7.5A1.5 1.5 0 0 1 14.5 6H17a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-2.5A4.5 4.5 0 0 0 10 7.5V9H8a1 1 0 0 0-1 .9l-.5 3A1 1 0 0 0 7.5 14H10v7h3z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default App;








