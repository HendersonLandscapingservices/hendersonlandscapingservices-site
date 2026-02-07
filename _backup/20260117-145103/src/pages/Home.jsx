import { Link } from "react-router-dom";
import Container from "../components/Container";
import TestimonialsSection from "../components/Testimonials";
import SEO from "../components/SEO";

export default function Home() {
  return (
    <>
      <SEO
        title="Premium garden care"
        description="Lawn care, garden maintenance, planting and garden design across East Lancashire. Clear communication, reliable scheduling and professional standards."
        path="/"
        image="/images/gallery-1.jpg"
      />

      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white min-h-[420px] lg:min-h-[520px]">
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/gallery-1.jpg"
            alt="Finished garden with structured planting and a neat lawn"
            className="h-full w-full object-cover brightness-150"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/20" />
        </div>

        <Container className="relative z-10 flex items-center py-10 lg:py-16">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Premium garden care
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              <span className="block whitespace-nowrap">Stunning gardens</span>
              <span className="block whitespace-nowrap text-emerald-300">
                designed and maintained for you.
              </span>
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100">
              From mowing and light maintenance to full garden design and renovations, we help homeowners and businesses across East Lancashire create outdoor spaces to be proud of.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/enquiry"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Request a quote
              </Link>
              <span className="text-xs text-emerald-100/80">
                Free, no-obligation quotes · Fully insured
              </span>
            </div>
          </div>
        </Container>
      </section>

      <TestimonialsSection />
    </>
  );
}
