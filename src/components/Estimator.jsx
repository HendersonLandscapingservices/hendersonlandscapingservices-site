import { useState } from "react";

/**
 * Pricing configuration
 * Adjust these values to suit your pricing policy.
 */
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

const LAWN_CONDITION_FACTOR = { maintained: 1, long: 1.5, veryLong: 2.0 };
const LAWN_OBSTACLE_FACTOR = { open: 1, moderate: 1.1, complex: 1.2 };
const LAWN_EDGE_FACTOR = { mowOnly: 1, strim: 1.1, crisp: 1.2 };
const LAWN_COLLECTION_FACTOR = { mulch: 1, bagOnsite: 1.1, remove: 1.2 };
const LAWN_ACCESS_FACTOR = { easy: 1, awkward: 1.1, veryAwkward: 1.2 };

const GARDEN_SIZE_BAND_HOURS = { small: 2, medium: 3.5, large: 5.5, xl: 8 };
const GARDEN_SEASON_FACTOR = { summer: 1, autumn: 1.1, winter: 1.2 };
const GARDEN_OVERGROWTH_FACTOR = { maintained: 1, overgrown: 1.2, veryOvergrown: 1.4 };

function roundTo(value, increment) {
  if (!increment) return value;
  return Math.round(value / increment) * increment;
}

function getMarketAdjustment(position) {
  if (position === "Undercut") return -0.05;
  if (position === "Premium") return 0.1;
  return 0;
}

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

  const BASE_PRICE_PER_SQM = 0.38;

  let pricePerSqm = BASE_PRICE_PER_SQM;
  pricePerSqm *= LAWN_CONDITION_FACTOR[condition] ?? 1;
  pricePerSqm *= LAWN_OBSTACLE_FACTOR[obstacles] ?? 1;
  pricePerSqm *= LAWN_EDGE_FACTOR[edges] ?? 1;
  pricePerSqm *= LAWN_COLLECTION_FACTOR[clippings] ?? 1;
  pricePerSqm *= LAWN_ACCESS_FACTOR[access] ?? 1;

  let price = area * pricePerSqm;

  if (isRegular && visitsPerYear >= PRICING_CONFIG.regularMinVisits) {
    price = price * (1 - PRICING_CONFIG.regularDiscountRate);
  }

  const smallLawnMin = 30;
  const baseMinCharge = area < 40 ? smallLawnMin : PRICING_CONFIG.minChargeLawn;

  const marketAdjustment = getMarketAdjustment(PRICING_CONFIG.marketPosition);
  price = price * (1 + marketAdjustment);

  const final = roundTo(Math.max(price, baseMinCharge), PRICING_CONFIG.rounding);

  return { total: final, perSqm: final / area, estimatedHours: null };
}

function estimateGardenPrice({ sizeBand = "medium", season = "summer", overgrowth = "maintained" }) {
  const baseHours = GARDEN_SIZE_BAND_HOURS[sizeBand];
  if (!baseHours) return null;

  const seasonFactor = GARDEN_SEASON_FACTOR[season] ?? 1;
  const overgrowthFactor = GARDEN_OVERGROWTH_FACTOR[overgrowth] ?? 1;
  const estimatedHours = baseHours * seasonFactor * overgrowthFactor * (1 / 0.75);

  const baseCost = (estimatedHours / 8) * PRICING_CONFIG.dayRateGeneral;
  const priceBeforeMin = baseCost * (1 + PRICING_CONFIG.profitMarginStandard);

  const minCharge = PRICING_CONFIG.minChargeGardenTidy;
  const marketAdjustment = getMarketAdjustment(PRICING_CONFIG.marketPosition);
  const preRounded = Math.max(priceBeforeMin, minCharge) * (1 + marketAdjustment);
  const final = roundTo(preRounded, PRICING_CONFIG.rounding);

  return { total: final, estimatedHours };
}

function estimateHedgePrice({ lengthM, heightM, width = "maintained" }) {
  const rawLength = Number(lengthM || 0);
  const rawHeight = Number(heightM || 0);
  if (!rawLength || rawLength <= 0 || !rawHeight || rawHeight <= 0) return null;

  const effectiveLength = Math.max(rawLength, 4);
  const effectiveHeight = Math.max(rawHeight, 1);

  let heightFactor = 1;
  if (effectiveHeight > 2.5 && effectiveHeight <= 3) heightFactor = 1.3;
  else if (effectiveHeight > 3 && effectiveHeight <= 3.5) heightFactor = 1.6;
  else if (effectiveHeight > 3.5) heightFactor = 2.0;

  let growthFactor = 1;
  if (width === "long") growthFactor = 1.35;
  else if (width === "veryLong") growthFactor = 1.8;

  const baseRatePerM = 20;
  let price = effectiveLength * baseRatePerM * heightFactor * growthFactor;

  const marketAdjustment = getMarketAdjustment(PRICING_CONFIG.marketPosition);
  price = price * (1 + marketAdjustment);

  const minCharge = PRICING_CONFIG.minChargeHedge;
  const finalPrice = roundTo(Math.max(price, minCharge), PRICING_CONFIG.rounding);

  return { total: finalPrice };
}

export function EstimatorWidgetButton({ onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="fixed bottom-4 left-1/2 z-40 inline-flex -translate-x-1/2 transform items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
    >
      <span className="h-2 w-2 rounded-full bg-emerald-200" />
      Quick price estimator
    </button>
  );
}

export function EstimatorPanel({ onClose, onGoToEnquiry }) {
  const [service, setService] = useState("lawn");
  const [lawnInputs, setLawnInputs] = useState({ area: "", condition: "maintained" });
  const [gardenInputs, setGardenInputs] = useState({ sizeBand: "medium", season: "summer", overgrowth: "maintained" });
  const [hedgeInputs, setHedgeInputs] = useState({ length: "", height: "", width: "maintained" });
  const [result, setResult] = useState(null);
  const [resultService, setResultService] = useState(null);

  const reset = () => {
    setResult(null);
    setResultService(null);
  };

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

  const renderResult = () => {
    if (!result) {
      return (
        <p className="text-xs text-slate-500">
          Enter your details and click <span className="font-medium text-slate-700">Get guide price</span>.
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
          Guide price – {titleMap[resultService]}
        </p>
        <p className="text-lg font-semibold text-slate-900">£{result.total.toFixed(0)}</p>
        {resultService === "lawn" && typeof result.perSqm === "number" && !Number.isNaN(result.perSqm) ? (
          <p className="text-xs text-slate-600">£{result.perSqm.toFixed(2)} per m² based on your inputs.</p>
        ) : null}
        <p className="mt-1 text-xs font-semibold text-slate-700">
          Guide figures only. Final quotes are confirmed after a brief visit or clear photos.
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={onGoToEnquiry}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            Send an enquiry
          </button>
          <button type="button" onClick={onClose} className="text-[11px] font-medium text-slate-600 hover:underline">
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end sm:items-center">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Close estimator"
      />

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
              Ballpark figure only. We’ll confirm once we’ve seen the garden.
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

        <div className="mt-4 flex gap-2 text-[11px]">
          {[
            ["lawn", "Mowing"],
            ["garden", "Garden refresh/renovation"],
            ["hedge", "Hedges"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setService(key);
                reset();
              }}
              className={`flex-1 rounded-full border px-3 py-1.5 font-medium transition ${
                service === key
                  ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-4 text-[11px]">
          {service === "lawn" ? (
            <div className="space-y-3">
              <div>
                <label htmlFor="lawn-area" className="block text-[11px] font-medium text-slate-700">
                  Approximate lawn area (m²)
                </label>
                <input
                  id="lawn-area"
                  type="number"
                  min="1"
                  value={lawnInputs.area}
                  onChange={(e) => {
                    setLawnInputs((prev) => ({ ...prev, area: e.target.value }));
                    reset();
                  }}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/60"
                  placeholder="e.g. 80"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700">Lawn condition</label>
                <select
                  value={lawnInputs.condition}
                  onChange={(e) => {
                    setLawnInputs((prev) => ({ ...prev, condition: e.target.value }));
                    reset();
                  }}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/60"
                >
                  <option value="maintained">Maintained</option>
                  <option value="long">Quite long</option>
                  <option value="veryLong">Very long / first cut</option>
                </select>
              </div>
            </div>
          ) : null}

          {service === "garden" ? (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-700">Garden size</label>
                <select
                  value={gardenInputs.sizeBand}
                  onChange={(e) => {
                    setGardenInputs((prev) => ({ ...prev, sizeBand: e.target.value }));
                    reset();
                  }}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/60"
                >
                  <option value="small">Small (up to ~50m²)</option>
                  <option value="medium">Medium (~50–150m²)</option>
                  <option value="large">Large (~150–300m²)</option>
                  <option value="xl">XL (300m²+)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700">Season</label>
                  <select
                    value={gardenInputs.season}
                    onChange={(e) => {
                      setGardenInputs((prev) => ({ ...prev, season: e.target.value }));
                      reset();
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/60"
                  >
                    <option value="summer">Summer tidy</option>
                    <option value="autumn">Autumn / leaf-heavy</option>
                    <option value="winter">Winter cutback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700">Current condition</label>
                  <select
                    value={gardenInputs.overgrowth}
                    onChange={(e) => {
                      setGardenInputs((prev) => ({ ...prev, overgrowth: e.target.value }));
                      reset();
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
          ) : null}

          {service === "hedge" ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="hedge-length" className="block text-[11px] font-medium text-slate-700">
                    Hedge length (metres)
                  </label>
                  <input
                    id="hedge-length"
                    type="number"
                    min="1"
                    value={hedgeInputs.length}
                    onChange={(e) => {
                      setHedgeInputs((prev) => ({ ...prev, length: e.target.value }));
                      reset();
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/60"
                    placeholder="e.g. 20"
                  />
                </div>
                <div>
                  <label htmlFor="hedge-height" className="block text-[11px] font-medium text-slate-700">
                    Average height (metres)
                  </label>
                  <input
                    id="hedge-height"
                    type="number"
                    min="0.5"
                    step="0.1"
                    value={hedgeInputs.height}
                    onChange={(e) => {
                      setHedgeInputs((prev) => ({ ...prev, height: e.target.value }));
                      reset();
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/60"
                    placeholder="e.g. 1.8"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-700">
                  Growth / time since last proper cut
                </label>
                <select
                  value={hedgeInputs.width}
                  onChange={(e) => {
                    setHedgeInputs((prev) => ({ ...prev, width: e.target.value }));
                    reset();
                  }}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/60"
                >
                  <option value="maintained">Well maintained</option>
                  <option value="long">Quite long</option>
                  <option value="veryLong">Very long / first cut in a while</option>
                </select>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex items-start justify-between gap-3 border-t border-slate-100 pt-4">
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
