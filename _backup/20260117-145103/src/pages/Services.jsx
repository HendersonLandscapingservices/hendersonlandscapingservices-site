import { Link } from "react-router-dom";
import Container from "../components/Container";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

export default function Services() {
  const services = [
    {
      title: "Mowing, lawn care & renovation",
      summary:
        "Regular mowing, edging, lawn treatments and renovation work such as scarifying, aeration and overseeding – all tailored to your lawn and how you use the space.",
      tags: ["Regular cuts", "Scarifying & aeration"],
    },
    {
      title: "Garden care & renovation",
      summary:
        "Ongoing or one-off garden care, including weeding, border maintenance, reshaping beds and phased tidy-ups to bring tired gardens back under control.",
      tags: ["Weeding & borders", "Garden renovation"],
    },
    {
      title: "Tree & hedge care",
      summary:
        "Shaping, trimming and maintenance for hedges and small to medium trees – from regular cuts to sensible reductions and tidy-ups.",
      tags: ["Hedge trimming", "Tree pruning"],
    },
    {
      title: "Design consultations & planting plans",
      summary:
        "Structured design sessions online or on-site, combined with practical planting ideas and bed refresh plans for low-maintenance, good-looking borders.",
      tags: ["Design consultation", "Planting design"],
    },
    {
      title: "New turf & lawn installation",
      summary:
        "Ground preparation and laying of quality turf for new or replacement lawns, including advice on aftercare and watering.",
      tags: ["New lawns", "Turfing"],
    },
    {
      title: "Garden clean-ups & clearances",
      summary:
        "Overgrown garden recovery, pruning, strimming, waste removal and bringing neglected spaces back to a usable state.",
      tags: ["Garden clearance", "One-off tidy"],
    },
    {
      title: "Pressure washing",
      summary:
        "Cleaning of patios, paths and driveways to remove algae, moss and grime, helping hard surfaces look brighter and reduce slip hazards.",
      tags: ["Patios", "Driveways"],
    },
    {
      title: "Gutter clearing",
      summary:
        "Safe removal of moss and debris from gutters to help prevent blockages and overflow issues.",
      tags: ["Blockage prevention"],
    },
    {
      title: "Fencing",
      summary:
        "Supply and installation of fencing, including new runs, replacements and minor repairs to panels and posts.",
      tags: ["Panels & posts", "Boundaries"],
    },
    {
      title: "Decking",
      summary:
        "Design and installation of timber or composite decking to create practical seating and entertaining areas.",
      tags: ["Outdoor seating", "Timber & composite"],
    },
    {
      title: "Drainage & problem areas",
      summary:
        "Practical plans and works to reduce waterlogging, improve soggy or shaded lawns and make difficult areas more usable.",
      tags: ["Waterlogged lawns", "Clay soils"],
    },
    {
      title: "Robot mower survey & installation",
      summary:
        "Site survey, specification and installation of robotic lawn mowers for suitable gardens, including set-up and programming.",
      tags: ["Robot mower", "Low-effort lawns"],
    },
    {
      title: "Hedge planting",
      summary:
        "Supply and planting of new hedges, including native wildlife-friendly mixes and evergreen options, with advice on spacing and establishment.",
      tags: ["New hedges", "Native planting"],
    },
    {
      title: "Commercial & shared-space maintenance",
      summary:
        "Regular visits to keep commercial and shared outdoor spaces well kept, with simple visit schedules and reporting where required.",
      tags: ["Grounds maintenance", "Shared spaces"],
    },
  ];

  return (
    <>
      <SEO
        title="Services"
        description="Garden maintenance, lawn care, hedge trimming, planting and landscaping services across East Lancashire, including Burnley and surrounding areas."
        path="/services"
        image="/images/gallery-1.jpg"
      />

      <PageHero
        kicker="Services"
        title="Services"
        subtitle="Burnley and surrounding areas"
        imageSrc="/images/gallery-1.jpg"
        imageAlt="Striped lawn and neat borders – example of our lawn and garden care work"
        rightSlot={
          <div className="flex max-w-xs flex-col items-start gap-2 text-xs">
            <Link
              to="/enquiry"
              className="inline-flex items-center justify-center rounded-full bg-white/95 px-5 py-2 text-xs font-semibold text-emerald-900 shadow-sm transition hover:bg-white"
            >
              Request a quote
            </Link>
            <p className="text-emerald-100/80">
              Tell us a bit about your garden and we&apos;ll recommend a suitable package.
            </p>
          </div>
        }
      />

      <Container className="py-10 lg:py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div>
                <h2 className="text-base font-semibold tracking-tight text-slate-900">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {service.summary}
                </p>

                {service.title === "Commercial & shared-space maintenance" ? (
                  <a
                    href="/guides/commercial-maintenance-overview.pdf"
                    className="mt-2 inline-flex text-xs font-semibold text-emerald-700 underline underline-offset-2"
                    download
                  >
                    Download our commercial maintenance overview
                  </a>
                ) : null}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to="/enquiry"
                  className="text-xs font-semibold text-emerald-700 underline-offset-2 hover:underline"
                >
                  Enquire about this
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-[11px] text-slate-500">
          Our estimator gives a guide price for key services. Final quotes are confirmed after a quick visit or from clear photos.
        </p>
        <p className="mt-2 text-[11px] text-slate-500">
          Don&apos;t see what you need? Please ask – we aim to be a one-stop shop for external hard and soft landscaping requirements.
        </p>
      </Container>
    </>
  );
}
