import { useMemo, useState } from "react";
import Container from "../components/Container";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxq4cXTErLHyBNiS7PkLKrufu307arecVZy1Ef5RW683_PxipRJKYO8kIk3kHl50jwI9Q/exec";

/**
 * Improvements vs original:
 * - Honeypot field for spam
 * - Submission state + accessible success/error messaging
 * - Avoid `alert()`, which is noisy and less accessible
 */
export default function Enquiry() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const message = useMemo(() => {
    if (status === "success") return "Thank you — your enquiry has been sent. We’ll be in touch shortly.";
    if (status === "error") return "Sorry, something went wrong. Please try again or contact us directly.";
    return "";
  }, [status]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot: if filled, silently ignore
    if (String(formData.get("company") || "").trim()) return;

    setStatus("sending");
    try {
      const res = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Non-200 response");
      setStatus("success");
      form.reset();
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <>
      <SEO
        title="Enquiry"
        description="Send an enquiry or request a quote for lawn care, garden maintenance, planting, drainage or design consultations across East Lancashire."
        path="/enquiry"
        image="/images/gallery-4.jpg"
      />

      <PageHero
        kicker="Enquiry"
        title="Send an enquiry or request a quote"
        subtitle="Share a few details and we’ll come back with next steps and availability."
        imageSrc="/images/gallery-4.jpg"
        imageAlt="Garden pathway and planting – welcoming front garden example"
      />

      <Container className="py-10 lg:py-12">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Honeypot */}
            <div className="hidden">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex="-1" autoComplete="off" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-slate-700">Name</label>
                <input
                  id="name" name="name" type="text" required
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 placeholder:text-slate-400 focus:bg-white focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-slate-700">Email</label>
                <input
                  id="email" name="email" type="email" required
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 placeholder:text-slate-400 focus:bg-white focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-slate-700">Phone</label>
                <input
                  id="phone" name="phone" type="tel"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 placeholder:text-slate-400 focus:bg-white focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="postcode" className="block text-xs font-medium text-slate-700">Postcode</label>
                <input
                  id="postcode" name="postcode" type="text" required
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 placeholder:text-slate-400 focus:bg-white focus:ring-2"
                />
                <p className="mt-1 text-[11px] text-slate-500">We mainly cover Burnley and surrounding areas.</p>
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block text-xs font-medium text-slate-700">What are you looking for?</label>
              <select
                id="service" name="service" required
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 focus:bg-white focus:ring-2"
              >
                <option value="">Please select</option>
                <option value="lawn-care">Lawn care / regular cuts</option>
                <option value="hedge-planting">Hedge planting</option>
                <option value="hedge-maintenance">Hedge maintenance</option>
                <option value="planting-design">Planting design / new beds</option>
                <option value="garden-clean-up">Garden clean-up / overhaul</option>
                <option value="drainage">Drainage / waterlogging issues</option>
                <option value="design-consultation-online">Design consultation (online)</option>
                <option value="design-consultation-on-site">Design consultation (on-site)</option>
                <option value="other">Something else</option>
              </select>
            </div>

            <div>
              <label htmlFor="availability" className="block text-xs font-medium text-slate-700">Preferred days / times</label>
              <textarea
                id="availability" name="availability" rows={2}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 placeholder:text-slate-400 focus:bg-white focus:ring-2"
                placeholder="For example: weekday mornings, or Friday afternoons."
              />
              <p className="mt-1 text-[11px] text-slate-500">
                We&apos;ll cross-check this against our schedule and offer the closest available slots.
              </p>
            </div>

            <div>
              <label htmlFor="details" className="block text-xs font-medium text-slate-700">Tell us a bit about your garden</label>
              <textarea
                id="details" name="details" rows={4}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 placeholder:text-slate-400 focus:bg-white focus:ring-2"
                placeholder="Lawn size, hedges, any problem areas, how long since your last tidy, etc."
              />
            </div>

            <div>
              <label htmlFor="photosLink" className="block text-xs font-medium text-slate-700">Photos / garden plan (optional)</label>
              <input
                id="photosLink" name="photosLink" type="text"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500/40 placeholder:text-slate-400 focus:bg-white focus:ring-2"
                placeholder="Link to shared folder (Google Drive, Dropbox, etc.), or mention you’ll email photos."
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Ideally 4–8 clear photos and, if possible, a simple plan or rough sketch (especially for online design consultations).
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 text-[11px] text-slate-500">
              <p>
                By submitting this form you agree that we can contact you about your enquiry. We don&apos;t share your details with third parties.
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {status === "sending" ? "Sending..." : "Send enquiry"}
              </button>
            </div>

            <p aria-live="polite" className={`text-sm ${status === "error" ? "text-rose-700" : "text-emerald-800"}`}>
              {message}
            </p>
          </form>

          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-[11px] text-slate-800">
            <p className="font-semibold text-emerald-900">Prefer to secure your on-site visit with a deposit?</p>
            <p className="mt-1">
              Once we&apos;ve agreed a date for on-site work, you can optionally pay a small deposit to confirm your slot. This is deducted from your final invoice and helps us keep the schedule running smoothly.
            </p>
            <p className="mt-1">
              Deposit options are mainly for in-person work. For online design consultations we’ll confirm scope and share next steps and pricing.
            </p>
          </div>

          <div className="mt-4">
            <details className="group rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[11px] text-slate-700">
              <summary className="flex cursor-pointer items-center justify-between gap-2 font-semibold text-slate-800">
                <span>Cancellation &amp; refund policy</span>
                <span className="text-xs text-slate-500 group-open:hidden">Tap to view</span>
                <span className="hidden text-xs text-slate-500 group-open:inline">Tap to hide</span>
              </summary>
              <div className="mt-3 space-y-1.5">
                <p>Online garden design consultations are paid in advance via our online booking system.</p>
                <ul className="list-disc space-y-1 pl-4">
                  <li>You can reschedule or cancel up to 24 hours before your appointment for a full refund or a new time slot.</li>
                  <li>Cancellations with less than 24 hours&apos; notice or missed appointments are normally non-refundable.</li>
                  <li>If we ever need to cancel, you can choose a new time or a full refund where applicable.</li>
                  <li>For on-site work, any deposits are deducted from your final invoice. If you need to rearrange, contact us as early as possible.</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </Container>
    </>
  );
}
