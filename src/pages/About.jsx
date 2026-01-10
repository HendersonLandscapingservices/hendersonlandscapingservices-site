import Container from "../components/Container";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

export default function About() {
  return (
    <>
      <SEO
        title="About us"
        description="A reliable, considered alternative to rushed maintenance and unclear pricing. Professional garden care, design and problem-solving across East Lancashire."
        path="/about"
        image="/images/gallery-2.jpg"
      />

      <div className="relative border-b border-slate-200 bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/images/gallery-2.jpg"
            alt="Finished family garden with seating and planting"
            className="h-full w-full object-cover opacity-40"
            loading="lazy"
          />
        </div>

        <Container className="relative py-8 lg:py-10">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.8fr)]">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                About us
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                About Henderson Landscaping Services
              </h1>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-emerald-50">
                <p>
                  Henderson Landscaping Services was established to provide homeowners and businesses with a reliable, considered alternative to rushed maintenance and unclear pricing. We deliver high-quality lawn care, hedge management, practical planting and effective problem-solving, supported by clear communication and a consistent, professional service.
                </p>
                <p>
                  We support a long-standing portfolio of domestic and commercial clients across East Lancashire, maintaining everything from small front gardens to shared spaces and courtyards that must remain tidy, safe and presentable throughout the year.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-emerald-400/40 bg-slate-900/60 p-1">
                <img
                  src="/images/owner.jpg"
                  alt="Owner of Henderson Landscaping Services"
                  className="h-full w-full max-h-[360px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-10 lg:py-12">
        <div className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-slate-700">
          <p>
            After years working for local gardening companies and the council, I decided it was time to start my own gardening business at the beginning of 2020. The business has grown steadily, supporting regular domestic and commercial clients across East Lancashire alongside one-off commissions for hard and soft landscaping and full garden makeovers.
          </p>
          <p>
            Sustainability sits at the heart of how we operate. We use battery tools wherever practical, minimise routine chemical use, and power our operations with renewable electricity, including a growing contribution from our own solar and battery system.
          </p>
          <p>
            Our work ranges from regular lawn care and light maintenance through to full garden renovations, problem-solving and planting schemes. We take the time to understand how you use the space and what you want it to do, then recommend practical steps that fit your budget and timescale.
          </p>
          <p>
            We also offer garden design services for clients outside our normal catchment area. From ideas and layout concepts to full planting schemes and phased improvement plans, we can help you move from a rough idea to a clear, buildable design.
          </p>
          <p className="text-sm font-medium text-slate-900">
            If you want someone who will go the extra mile and treat your garden as if it were our own, you&apos;re in the right place.
          </p>

          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-xs text-slate-800">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800">
              Sustainability &amp; environment
            </p>
            <p className="mt-2">
              We are committed to running the business in a way that&apos;s kinder to the environment. Our goal is to make operations operationally carbon-neutral by <strong>2035</strong> and to move towards <strong>chemical-free maintenance</strong> wherever it&apos;s practical.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>Expanding the use of battery-powered tools and lower-impact processes.</li>
              <li>Minimising routine use of synthetic pesticides and weedkillers.</li>
              <li>Using renewable electricity, with a growing proportion generated by solar and storage.</li>
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
      </Container>
    </>
  );
}
