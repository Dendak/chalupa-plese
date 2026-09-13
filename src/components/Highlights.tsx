import { Reveal, SectionHeading } from './Reveal';
import { Icon } from './Icon';
import { Picture } from './Picture';
import { HIGHLIGHT_IDS, SITE } from '@/data/site';
import { photoById } from '@/data/photos';
import { useI18n } from '@/i18n';

export function Highlights() {
  const { t } = useI18n();
  const h = t.highlights;
  return (
    <section id="chalupa" className="container-x py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <SectionHeading eyebrow={h.eyebrow} title={h.title} text={h.text} />
        <Reveal delay={0.15} className="grid grid-cols-3 gap-3 text-center">
          {(
            [
              [SITE.capacity.beds, h.stats.beds],
              [SITE.capacity.bedrooms, h.stats.bedrooms],
              [SITE.capacity.bathrooms, h.stats.bathrooms],
            ] as const
          ).map(([n, l]) => (
            <div key={l} className="card px-3 py-5">
              <p className="font-display text-4xl font-medium text-forest sm:text-5xl">{n}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-muted">{l}</p>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-6 md:auto-rows-[220px]">
        <Reveal className="md:col-span-3 md:row-span-2">
          <div className="group relative h-full min-h-[320px] overflow-hidden rounded-xl2 shadow-soft">
            <Picture photo={photoById('29')} sizes="(min-width:768px) 50vw, 100vw" className="h-full w-full" imgClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" alt={t.gallery.captions['29']} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="eyebrow text-gold">{h.gardenEyebrow}</p>
              <h3 className="mt-2 text-2xl font-medium">{h.gardenTitle}</h3>
            </div>
          </div>
        </Reveal>

        {HIGHLIGHT_IDS.map((id, i) => (
          <Reveal key={id} as="article" delay={0.05 * i} className="md:col-span-3 lg:col-span-2">
            <div className="card group flex h-full flex-col p-6 transition-transform duration-500 hover:-translate-y-1">
              <span className="grid size-11 place-items-center rounded-2xl bg-forest-soft text-forest">
                <Icon name={id} className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold leading-snug">{h.items[id].title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{h.items[id].text}</p>
            </div>
          </Reveal>
        ))}

        <Reveal className="md:col-span-3 lg:col-span-4">
          <div className="group relative h-full min-h-[240px] overflow-hidden rounded-xl2 shadow-soft">
            <Picture photo={photoById('35')} sizes="(min-width:768px) 66vw, 100vw" className="h-full w-full" imgClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" alt={t.gallery.captions['35']} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="eyebrow text-gold">{h.loungeEyebrow}</p>
              <h3 className="mt-2 text-2xl font-medium">{h.loungeTitle}</h3>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
