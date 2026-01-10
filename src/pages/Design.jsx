import { Link } from "react-router-dom";
import Container from "../components/Container";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

export default function Design() {
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
        "An in-person visit to assess levels, drainage, access and how you use the space. We’ll agree priorities and outline a practical plan to move forward.",
      note: "Best for local projects and renovations",
      hasChecklist: false,
    },
  ];

  return (
    <>
      <SEO
        title="Design"
        description="Hard and soft landscaping design consultations and planting advice across East Lancashire, available online or on-site."
        path="/design"
        image="/images/gallery-3.jpg"
      />

      <PageHero
        kicker="Design"
        title="Design"
        subtitle="Hard and soft landscaping design service"
        imageSrc="/images/gallery-3.jpg"
        imageAlt="Garden design and planting – structured border and seating area"
      />

      <Container className="py-10 lg:py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {offerings.map((item) => (
            <article
              key={item.key}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div>
                <h2 className="text-base font-semibold tracking-tight text-slate-900">{item.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.description}</p>
                {item.hasChecklist ? (
                  <a
                    href="/guides/design-consultation-checklist.pdf"
                    className="mt-2 inline-flex text-[11px] font-semibold text-emerald-700 underline underline-offset-2"
                    download
                  >
                    Download a quick design consultation checklist
                  </a>
                ) : null}
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                <p className="text-slate-500">{item.note}</p>
                <Link
                  to="/enquiry"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-emerald-500"
                >
                  Send an enquiry
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
