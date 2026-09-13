import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Rail } from './Rail';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, X, Images } from 'lucide-react';
import { Picture, srcSet, srcOf } from './Picture';
import { Reveal, SectionHeading } from './Reveal';
import { CATEGORY_IDS, PHOTOS, type Photo, type PhotoCategory } from '@/data/photos';
import { useI18n } from '@/i18n';

// Mozaika nahoře: 1 velká + 4 malé (id fotek)
const MOSAIC = ['15', '29', '09', '35', '38'];
const ROW_H = 'h-[220px] sm:h-[260px] lg:h-[300px]';

export function Gallery() {
  const { t } = useI18n();
  const g = t.gallery;
  const [cat, setCat] = useState<PhotoCategory | 'vse'>('vse');
  const [lightbox, setLightbox] = useState<{ list: Photo[]; index: number } | null>(null);

  const list = useMemo(() => (cat === 'vse' ? PHOTOS : PHOTOS.filter((p) => p.cat === cat)), [cat]);
  const open = (photos: Photo[], p: Photo) => setLightbox({ list: photos, index: photos.indexOf(p) });
  const mosaic = MOSAIC.map((id) => PHOTOS.find((p) => p.id === id)!);

  return (
    <section id="galerie" className="bg-surface/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={g.eyebrow} title={g.title} text={g.text(PHOTOS.length)} />

        {/* Mozaika */}
        <Reveal className="relative mt-10">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:grid-rows-2 sm:gap-3">
            {mosaic.map((p, i) => (
              <button
                key={p.id}
                onClick={() => open(PHOTOS, p)}
                aria-label={g.open(g.captions[p.id])}
                className={clsx(
                  'group relative overflow-hidden rounded-2xl shadow-soft outline-offset-4',
                  i === 0 ? 'col-span-2 row-span-2 aspect-[4/3] sm:aspect-auto' : 'aspect-[4/3] sm:aspect-auto',
                  i > 2 && 'hidden sm:block',
                )}
              >
                <Picture
                  photo={p}
                  sizes={i === 0 ? '(min-width:1024px) 50vw, 100vw' : '(min-width:1024px) 25vw, 50vw'}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                  priority={i === 0}
                  alt=""
                />
              </button>
            ))}
          </div>
          <button
            onClick={() => open(PHOTOS, mosaic[0])}
            className="btn absolute bottom-4 right-4 border border-white/40 bg-white/85 text-ink shadow-lifted backdrop-blur-md hover:bg-white dark:bg-black/60 dark:text-white dark:hover:bg-black/80"
          >
            <Images className="size-4" /> {g.showAll(PHOTOS.length)}
          </button>
        </Reveal>

        {/* Kategorie + karusel */}
        <Reveal className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-display text-2xl font-medium">{g.byRoom}</h3>
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            {CATEGORY_IDS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={clsx(
                  'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all',
                  cat === c ? 'border-forest bg-forest text-white shadow-soft dark:text-bg' : 'border-line bg-bg-elevated text-ink hover:bg-surface-strong',
                )}
              >
                {g.categories[c]}
                <span className={clsx('ml-1.5 text-xs', cat === c ? 'opacity-70' : 'text-ink-muted')}>{c === 'vse' ? PHOTOS.length : PHOTOS.filter((p) => p.cat === c).length}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Carousel key={cat} photos={list} onOpen={(p) => open(list, p)} />

      <Lightbox state={lightbox} onClose={() => setLightbox(null)} onChange={(index) => setLightbox((s) => (s ? { ...s, index } : s))} />
    </section>
  );
}

/** Filmový pás: jednotná výška, šířka podle poměru stran, ohraničený obsahem. */
function Carousel({ photos, onOpen }: { photos: Photo[]; onOpen: (p: Photo) => void }) {
  const { t } = useI18n();
  const g = t.gallery;
  return (
    <div className="container-x">
      <Rail label={g.region} prevLabel={g.prevPhotos} nextLabel={g.nextPhotos} className="mt-6" padClass="px-1 py-2 gap-3">
        {photos.map((p) => (
          <button
            key={p.id}
            onClick={() => onOpen(p)}
            aria-label={g.open(g.captions[p.id])}
            className={clsx('group relative shrink-0 snap-start overflow-hidden rounded-2xl shadow-soft outline-offset-4', ROW_H)}
            style={{ aspectRatio: `${p.width} / ${p.height}` }}
          >
            <Picture photo={p} sizes="(min-width:1024px) 420px, 320px" className="h-full w-full" imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" alt="" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-medium text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">{g.captions[p.id]}</span>
          </button>
        ))}
      </Rail>
    </div>
  );
}

function Lightbox({ state, onClose, onChange }: { state: { list: Photo[]; index: number } | null; onClose: () => void; onChange: (i: number) => void }) {
  const { t } = useI18n();
  const g = t.gallery;
  const ref = useRef<HTMLDialogElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const open = state !== null;
  const photos = state?.list ?? [];
  const index = state?.index ?? 0;
  const photo = open ? photos[index] : null;

  const prev = useCallback(() => open && onChange((index - 1 + photos.length) % photos.length), [open, index, photos.length, onChange]);
  const next = useCallback(() => open && onChange((index + 1) % photos.length), [open, index, photos.length, onChange]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, prev, next]);

  useEffect(() => {
    stripRef.current?.querySelector<HTMLElement>(`[data-i="${index}"]`)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [index]);

  const touch = useRef<number | null>(null);
  const catLabel = photo ? g.categories[photo.cat] : '';

  return (
    <dialog
      ref={ref}
      className="lightbox m-auto h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 text-white outline-none"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (dx > 50) prev();
        if (dx < -50) next();
        touch.current = null;
      }}
    >
      {photo && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p className="text-sm text-white/70">
              <span className="font-semibold text-white">{index + 1}</span> / {photos.length}
              {catLabel && <span className="ml-3 rounded-full bg-white/10 px-2.5 py-1 text-xs">{catLabel}</span>}
            </p>
            <button onClick={onClose} aria-label={g.close} className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
              <X className="size-5" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
            <picture key={photo.id} className="contents">
              {photo.avif.length > 0 && <source type="image/avif" srcSet={srcSet(photo, 'avif')} sizes="100vw" />}
              <source type="image/webp" srcSet={srcSet(photo, 'webp')} sizes="100vw" />
              <img src={srcOf(photo)} width={photo.width} height={photo.height} alt={g.captions[photo.id]} decoding="async" className="max-h-full max-w-full rounded-xl object-contain shadow-lifted" />
            </picture>
            <button onClick={prev} aria-label={g.prev} className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:grid">
              <ChevronLeft className="size-6" />
            </button>
            <button onClick={next} aria-label={g.next} className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:grid">
              <ChevronRight className="size-6" />
            </button>
          </div>
          <p className="px-6 pt-3 text-center text-sm text-white/85">{g.captions[photo.id]}</p>
          <div ref={stripRef} className="no-scrollbar flex gap-1.5 overflow-x-auto px-4 py-3 sm:justify-center sm:px-6">
            {photos.map((p, i) => (
              <button
                key={p.id}
                data-i={i}
                onClick={() => onChange(i)}
                aria-label={g.photo(i + 1)}
                className={clsx('h-12 w-16 shrink-0 overflow-hidden rounded-md transition-all sm:h-14 sm:w-20', i === index ? 'ring-2 ring-gold opacity-100' : 'opacity-50 hover:opacity-90')}
              >
                <img src={srcOf(p, 480)} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </dialog>
  );
}
