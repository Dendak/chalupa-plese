import clsx from 'clsx';
import { Reveal, SectionHeading } from './Reveal';
import { Icon } from './Icon';
import { Picture } from './Picture';
import { Rail } from './Rail';
import { SITE, type HighlightId } from '@/data/site';
import { photoById } from '@/data/photos';
import { useI18n } from '@/i18n';

// Každá výhoda = fotka. `span` řídí mozaiku na desktopu (mřížka 6 sloupců).
const TILES: { id: HighlightId; photo: string; span: string; pos?: string }[] = [
  { id: 'fence', photo: '15', span: 'sm:col-span-6 lg:col-span-3 lg:row-span-2' },
  { id: 'flame', photo: '35', span: 'sm:col-span-3 lg:col-span-3' },
  { id: 'users', photo: '08', span: 'sm:col-span-3 lg:col-span-3' },
  { id: 'trees', photo: '32', span: 'sm:col-span-2', pos: 'object-[center_35%]' },
  { id: 'fish', photo: '38', span: 'sm:col-span-2' },
  { id: 'paw', photo: '19', span: 'sm:col-span-2', pos: 'object-[center_70%]' },
];

function Tile({ id, photo, pos, sizes, className }: { id: HighlightId; photo: string; pos?: string; sizes: string; className?: string }) {
  const { t } = useI18n();
  const d = t.highlights.items[id];
  return (
    <article className={clsx('group relative isolate h-full overflow-hidden rounded-xl2 shadow-soft', className)}>
      <div className="absolute inset-0 -z-10">
        <Picture
          photo={photoById(photo)}
          sizes={sizes}
          className="h-full w-full"
          imgClassName={clsx('transition-transform duration-[1.6s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105', pos)}
          alt={t.gallery.captions[photo]}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="flex h-full flex-col justify-end p-5 text-white sm:p-6">
        <span className="mb-auto grid size-10 place-items-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur-md">
          <Icon name={id} className="size-5" />
        </span>
        <h3 className="text-xl font-medium leading-tight sm:text-2xl">{d.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">{d.text}</p>
      </div>
    </article>
  );
}

export function Highlights() {
  const { t } = useI18n();
  const h = t.highlights;
  const stats = [
    [SITE.capacity.beds, h.stats.beds],
    [SITE.capacity.bedrooms, h.stats.bedrooms],
    [SITE.capacity.bathrooms, h.stats.bathrooms],
  ] as const;

  return (
    <section id="chalupa" className="container-x py-20 sm:py-32">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <SectionHeading eyebrow={h.eyebrow} title={h.title} text={h.text} />
        <Reveal delay={0.15} className="flex items-center divide-x divide-line rounded-full border border-line bg-bg-elevated px-2 py-3 shadow-soft lg:justify-self-end">
          {stats.map(([n, l]) => (
            <p key={l} className="flex flex-1 items-baseline justify-center gap-1.5 px-4 sm:px-6">
              <span className="font-display text-2xl font-medium text-forest sm:text-3xl">{n}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{l}</span>
            </p>
          ))}
        </Reveal>
      </div>

      {/* Mobil: jeden pás fotek na přejíždění prstem */}
      <Rail label={h.eyebrow} prevLabel={t.gallery.prevPhotos} nextLabel={t.gallery.nextPhotos} className="mt-10 sm:hidden" padClass="px-1 py-2 gap-3">
        {TILES.map((tile) => (
          <div key={tile.id} className="h-[64svh] max-h-[520px] min-h-[400px] w-[78vw] shrink-0 snap-start">
            <Tile {...tile} sizes="78vw" />
          </div>
        ))}
      </Rail>

      {/* Tablet a desktop: nepravidelná fotomozaika */}
      <div className="mt-14 hidden gap-4 sm:grid sm:grid-cols-6 sm:auto-rows-[280px] lg:auto-rows-[300px]">
        {TILES.map((tile, i) => (
          <Reveal key={tile.id} delay={0.05 * i} className={tile.span}>
            <Tile {...tile} sizes={i === 0 ? '(min-width:1024px) 50vw, 100vw' : '(min-width:1024px) 33vw, 50vw'} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
