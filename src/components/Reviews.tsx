import { Star, Quote } from 'lucide-react';
import { Reveal, SectionHeading } from './Reveal';
import { REVIEWS, SITE } from '@/data/site';

export function Reviews() {
  return (
    <section id="recenze" className="bg-surface/60 py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Recenze" title="Hosté se k nám vracejí. A píšou o tom." />
          <Reveal delay={0.1} className="flex items-center gap-4">
            <p className="font-display text-6xl font-medium text-forest">{SITE.rating.value.toFixed(1).replace('.', ',')}</p>
            <div>
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-sm text-ink-muted">
                {SITE.rating.count} hodnocení na{' '}
                <a href={SITE.listing} target="_blank" rel="noreferrer" className="font-medium text-forest underline-offset-2 hover:underline">
                  e-chalupy.cz
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} as="article" delay={i * 0.05} className="w-[85vw] max-w-md shrink-0 snap-center sm:w-[380px]">
            <figure className="card flex h-full flex-col p-7">
              <Quote className="size-7 text-terracotta" />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed">{r.text}</blockquote>
              <figcaption className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-ink-muted">{r.when}</p>
                </div>
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-3.5 fill-current" />
                  ))}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
