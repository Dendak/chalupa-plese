import { useState } from 'react';
import { Star, Quote, ChevronDown } from 'lucide-react';
import { Reveal, SectionHeading } from './Reveal';
import { SITE } from '@/data/site';
import { REVIEWS, type Review } from '@/data/reviews';

function Stars({ n, className = 'size-3.5' }: { n: number; className?: string }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-label={`${n} z 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} ${i < Math.round(n) ? 'fill-current' : 'opacity-30'}`} />
      ))}
    </div>
  );
}

function Card({ r, compact }: { r: Review; compact?: boolean }) {
  return (
    <figure className={`card flex h-full flex-col ${compact ? 'p-6' : 'p-7'}`}>
      <Quote className="size-7 text-terracotta" />
      <blockquote className={`mt-4 flex-1 leading-relaxed ${compact ? 'text-sm' : 'text-[15px]'}`}>{r.text}</blockquote>
      <figcaption className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <div>
          <p className="text-sm font-semibold">{r.name}</p>
          <p className="text-xs text-ink-muted">{r.season}</p>
        </div>
        <Stars n={r.rating} />
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const [all, setAll] = useState(false);
  const featured = REVIEWS.filter((r) => r.featured);
  const rest = REVIEWS.filter((r) => !r.featured);

  return (
    <section id="recenze" className="bg-surface/60 py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Recenze" title="Hosté se k nám vracejí. A píšou o tom." />
          <Reveal delay={0.1} className="flex items-center gap-4">
            <p className="font-display text-6xl font-medium text-forest">{SITE.rating.value.toFixed(1).replace('.', ',')}</p>
            <div>
              <Stars n={5} className="size-5" />
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
        {featured.map((r, i) => (
          <Reveal key={r.date + r.name} as="article" delay={i * 0.05} className="w-[85vw] max-w-md shrink-0 snap-center sm:w-[380px]">
            <Card r={r} />
          </Reveal>
        ))}
      </div>

      <div className="container-x">
        {all && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ gridAutoRows: 'auto' }}>
            {rest.map((r) => (
              <article key={r.date + r.name} className="reveal-css">
                <Card r={r} compact />
              </article>
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <button onClick={() => setAll((v) => !v)} className="btn-ghost">
            {all ? 'Skrýt další hodnocení' : `Zobrazit všechna hodnocení (${REVIEWS.length})`}
            <ChevronDown className={`size-4 transition-transform ${all ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </section>
  );
}
