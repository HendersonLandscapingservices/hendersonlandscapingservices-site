export default function TestimonialsSection() {
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
    <section className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:py-12">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
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
