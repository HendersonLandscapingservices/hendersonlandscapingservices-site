import Container from "../components/Container";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import { hintsTipsPosts } from "../data/hintsTipsPosts";

export default function HintsTips() {
  return (
    <>
      <SEO
        title="Hints & Tips"
        description="Seasonal garden advice, common problems and simple checklists for Northern homes and gardens."
        path="/hints-tips"
        image="/images/gallery-3.jpg"
      />

      <PageHero
        kicker="Hints & Tips"
        title="Practical advice for Northern homes"
        subtitle="Seasonal advice, common local problems, and simple checklists you can follow yourself."
        imageSrc="/images/gallery-3.jpg"
        imageAlt="Soft evening light over a well-kept garden"
        rightSlot={
          <div className="w-full max-w-xs rounded-2xl bg-emerald-950/60 p-4 text-xs ring-1 ring-emerald-400/30">
            <p className="font-medium text-emerald-100">How to use this page</p>
            <p className="mt-2 text-emerald-100/80">
              Use these posts as a starting point. If you want help applying it to your garden, mention it when you enquire.
            </p>
          </div>
        }
      />

      <Container className="py-10 lg:py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Latest hints &amp; tips
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              We&apos;ll continue to add seasonal guides and deep dives over time.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
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
                <p className="mt-1 text-xs text-slate-500">
                  {post.published} · {post.readTime}
                </p>
              </header>

              <p className="mt-3 text-sm leading-relaxed text-slate-700">{post.summary}</p>

              {post.bullets?.length ? (
                <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                  {post.bullets.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <footer className="mt-4 flex items-center justify-between text-xs">
                <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                  Garden know-how
                </span>
                <span className="text-slate-500">
                  Need help?{" "}
                  <span className="font-medium text-emerald-700">
                    Ask about a consultation.
                  </span>
                </span>
              </footer>
            </article>
          ))}
        </div>
      </Container>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="mt-2 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs text-slate-800">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
            Downloadable winter guides
          </p>
          <p className="mt-2 text-[11px] text-slate-700">
            Prefer a printable version? Save these quick-reference PDFs.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              ["Winter lawn care checklist", "Keep damage to a minimum until spring.", "/guides/winter-lawn-care-guide.pdf"],
              ["Dealing with waterlogged lawns", "Simple checks and next steps for heavy soils.", "/guides/winter-waterlogging-guide.pdf"],
              ["Winter pruning basics", "What you can safely prune – and what to leave.", "/guides/winter-pruning-guide.pdf"],
              ["Using winter to plan ahead", "Reflect, prioritise and plan improvements for next year.", "/guides/winter-planning-guide.pdf"],
            ].map(([t, d, href]) => (
              <a
                key={href}
                href={href}
                className="inline-flex items-start gap-2 rounded-xl bg-white px-3 py-2 text-left text-[11px] text-emerald-900 hover:bg-emerald-50"
                download
              >
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                <span>
                  <span className="font-semibold">{t}</span>
                  <br />
                  {d}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
