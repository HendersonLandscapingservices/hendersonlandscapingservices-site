import { useEffect, useState } from "react";
import Container from "../components/Container";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const maxImages = 30;
    const loaded = [];

    for (let i = 1; i <= maxImages; i += 1) {
      const src = `/images/gallery-${i}.jpg`;
      const title = `Project photo ${i}`;
      const img = new Image();

      img.onload = () => {
        if (cancelled) return;
        loaded.push({ src, title, order: i });
        loaded.sort((a, b) => a.order - b.order);
        setImages([...loaded]);
      };

      img.onerror = () => {};
      img.src = src;
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const hasImages = images.length > 0;
  const safeIndex = hasImages ? Math.min(currentIndex, images.length - 1) : 0;

  return (
    <>
      <SEO
        title="Gallery"
        description="A selection of recent lawn care, garden maintenance, planting and landscaping work across East Lancashire."
        path="/gallery"
        image="/images/gallery-2.jpg"
      />

      <PageHero
        kicker="Gallery"
        title="Recent work"
        subtitle="A small selection of our recent work. We can provide references and more examples on request."
        imageSrc="/images/gallery-2.jpg"
        imageAlt="Overview of a completed garden project"
      />

      <Container className="py-10 lg:py-12">
        <div className="mx-auto max-w-4xl">
          {hasImages ? (
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-72 bg-slate-100 sm:h-80 lg:h-96">
                <img
                  src={images[safeIndex].src}
                  alt={images[safeIndex].title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/70 text-xs font-semibold text-white shadow hover:bg-slate-900/90"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/70 text-xs font-semibold text-white shadow hover:bg-slate-900/90"
                aria-label="Next image"
              >
                ›
              </button>

              <div className="flex items-center justify-center gap-2 pb-3 pt-3">
                {images.map((item, index) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full border border-emerald-600/40 transition ${
                      index === safeIndex ? "bg-emerald-600" : "bg-white"
                    }`}
                    aria-label={`Show image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center text-sm text-slate-500">
              We&apos;re adding project photos to this gallery. Please check back soon to see more examples of our work.
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
