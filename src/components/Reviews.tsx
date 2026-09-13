import { useState } from 'react';
import { Star, Quote, ChevronDown } from 'lucide-react';
import { Reveal, SectionHeading } from './Reveal';
import { Rail } from './Rail';
import { SITE } from '@/data/site';
import { REVIEWS, type Review } from '@/data/reviews';
import { useI18n, type Lang } from '@/i18n';

function Stars({ n, label, className = 'size-3.5' }: { n: number; label: string; className?: string }) {
  return (
    <div className="flex gap-0.5 text-gold" role="img" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} ${i < Math.round(n) ? 'fill-current' : 'opacity-30'}`} />
      ))}
    </div>
  );
}

function textFor(r: Review, lang: Lang) {
  if (lang === 'en' && r.en) return { text: r.en, translated: r.en !== r.text };
  if (lang === 'de' && r.de) return { text: r.de, translated: true };
  return { text: r.text, translated: false };
}

function Card({ r, compact }: { r: Review; compact?: boolean }) {
  const { t, lang } = useI18n();
  const { text, translated } = textFor(r, lang);
  const season = `${t.reviews.seasons[r.season.kind]} ${r.season.year}`;
  return (
    <figure className={`card flex h-full flex-col ${compact ? 'p-6' : 'p-7'}`}>
      <Quote className="size-7 text-terracotta" />
      <blockquote lang={translated ? lang : r.en === r.text ? 'en' : 'cs'} className={`mt-4 flex-1 leading-relaxed ${compact ? 'text-sm' : 'line-clamp-[9] text-[15px]'}`} title={text}>
        {text}
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <div>
          <p className="text-sm font-semibold">{r.name}</p>
          <p className="text-xs text-ink-muted">
            {season}
            {translated && t.reviews.translated && <span> · {t.reviews.translated}</span>}
          </p>
        </div>
        <Stars n={r.rating} label={t.reviews.stars(r.rating)} />
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const { t } = useI18n();
  const [all, setAll] = useState(false);
  const featured = REVIEWS.filter((r) => r.featured);
  const rest = REVIEWS.filter((r) => !r.featured);

  return (
    <section id="recenze" className="bg-surface/60 py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={t.reviews.eyebrow} title={t.reviews.title} />
          <Reveal delay={0.1} className="flex items-center gap-4">
            <p className="font-display text-6xl font-medium text-forest">{SITE.rating.value.toLocaleString(t.intl, { minimumFractionDigits: 1 })}</p>
            <div>
              <Stars n={5} label={t.reviews.stars(5)} className="size-5" />
              <p className="mt-1 text-sm text-ink-muted">
                {t.reviews.ratingOn(SITE.rating.count)}{' '}
                <a href={SITE.listing} target="_blank" rel="noreferrer" className="font-medium text-forest underline-offset-2 hover:underline">
                  e-chalupy.cz
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="container-x">
        <Rail label={t.reviews.region} prevLabel={t.reviews.prev} nextLabel={t.reviews.next} className="mt-12">
          {featured.map((r, i) => (
            <Reveal key={r.date + r.name} as="article" delay={i * 0.05} className="w-[85vw] max-w-sm shrink-0 snap-start sm:w-[360px]">
              <Card r={r} />
            </Reveal>
          ))}
        </Rail>

        {all && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((r) => (
              <article key={r.date + r.name} className="reveal-css">
                <Card r={r} compact />
              </article>
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <button onClick={() => setAll((v) => !v)} className="btn-ghost">
            {all ? t.reviews.hide : t.reviews.showAll(REVIEWS.length)}
            <ChevronDown className={`size-4 transition-transform ${all ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </section>
  );
}
