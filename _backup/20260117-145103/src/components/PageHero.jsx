import Container from "./Container";

export default function PageHero({ kicker, title, subtitle, imageSrc, imageAlt, rightSlot }) {
  return (
    <div className="relative border-b border-slate-200 bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover opacity-40"
          loading="lazy"
        />
      </div>
      <Container className="relative flex flex-col gap-4 py-10 lg:flex-row lg:items-center lg:justify-between lg:py-12">
        <div className="max-w-2xl">
          {kicker ? (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
              {kicker}
            </p>
          ) : null}
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          {subtitle ? (
            <p className="mt-3 text-sm leading-relaxed text-emerald-100/90">{subtitle}</p>
          ) : null}
        </div>
        {rightSlot ? <div className="mt-4 lg:mt-0">{rightSlot}</div> : null}
      </Container>
    </div>
  );
}
