import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, X, Images } from 'lucide-react';
import { Picture, srcSet, srcOf } from './Picture';
import { Reveal, SectionHeading } from './Reveal';
import { CATEGORIES, PHOTOS, type Photo, type PhotoCategory } from '@/data/photos';

// Mozaika nahoře: 1 velká + 4 malé (id fotek)
const MOSAIC = ['15', '29', '09', '35', '38'];
const ROW_H = 'h-[220px] sm:h-[260px] lg:h-[300px]';

export function Gallery() {
  const [cat, setCat] = useState<PhotoCategory | 'vse'>('vse');
  const [lightbox, setLightbox] = useState<{ list: Photo[]; index: number } | null>(null);

  const list = useMemo(() => (cat === 'vse' ? PHOTOS : PHOTOS.filter((p) => p.cat === cat)), [cat]);
  const open = (photos: Photo[], p: Photo) => setLightbox({ list: photos, index: photos.indexOf(p) });
  const mosaic = MOSAIC.map((id) => PHOTOS.find((p) => p.id === id)!);

  return (
    <section id="galerie" className="bg-surface/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Galerie" title="Podívejte se dovnitř i ven." text={`${PHOTOS.length} fotografií chalupy, zahrady a okolí. Klikněte na kteroukoliv.`} />

        {/* Mozaika */}
        <Reveal className="relative mt-10">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:grid-rows-2 sm:gap-3">
            {mosaic.map((p, i) => (
              <button
                key={p.id}
                onClick={() => open(PHOTOS, p)}
                aria-label={`Otevřít fotku: ${p.caption}`}
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
                  priority={i < 3}
                />
              </button>
            ))}
          </div>
          <button
            onClick={() => open(PHOTOS, mosaic[0])}
            className="btn absolute bottom-4 right-4 border border-white/40 bg-white/85 text-ink shadow-lifted backdrop-blur-md hover:bg-white dark:bg-black/60 dark:text-white dark:hover:bg-black/80"
          >
            <Images className="size-4" /> Zobrazit všech {PHOTOS.length} fotek
          </button>
        </Reveal>

        {/* Kategorie + karusel */}
        <Reveal className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-display text-2xl font-medium">Podle místností</h3>
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={clsx(
                  'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all',
                  cat === c.id ? 'border-forest bg-forest text-white shadow-soft dark:text-bg' : 'border-line bg-bg-elevated text-ink hover:bg-surface-strong',
                )}
              >
                {c.label}
                <span className={clsx('ml-1.5 text-xs', cat === c.id ? 'opacity-70' : 'text-ink-muted')}>{c.id === 'vse' ? PHOTOS.length : PHOTOS.filter((p) => p.cat === c.id).length}</span>
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

/** Filmový pás: jednotná výška, šířka podle poměru stran, scroll-snap, šipky. */
function Carousel({ photos, onOpen }: { photos: Photo[]; onOpen: (p: Photo) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft > max - 8);
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' });

  return (
    <div className="relative mt-6">
      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-5 pb-2 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        style={{ scrollPaddingInline: 'max(2rem, calc((100vw - 80rem) / 2 + 2rem))' }}
      >
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onOpen(p)}
            aria-label={`Otevřít fotku: ${p.caption}`}
            className={clsx('group relative shrink-0 snap-start overflow-hidden rounded-2xl shadow-soft outline-offset-4', ROW_H)}
            style={{ aspectRatio: `${p.width} / ${p.height}` }}
          >
            <Picture photo={p} sizes="(min-width:1024px) 420px, 320px" className="h-full w-full" imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" priority={i < 3} />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-medium text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">{p.caption}</span>
          </button>
        ))}
      </div>

      <div className="container-x mt-4 flex items-center justify-between gap-4">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-forest transition-[width] duration-150" style={{ width: `${Math.max(8, progress * 100)}%` }} />
        </div>
        <div className="flex gap-2">
          <button onClick={() => scrollBy(-1)} disabled={atStart} aria-label="Předchozí fotky" className="grid size-11 place-items-center rounded-full border border-line bg-bg-elevated shadow-soft transition hover:bg-surface disabled:opacity-30">
            <ChevronLeft className="size-5" />
          </button>
          <button onClick={() => scrollBy(1)} disabled={atEnd} aria-label="Další fotky" className="grid size-11 place-items-center rounded-full border border-line bg-bg-elevated shadow-soft transition hover:bg-surface disabled:opacity-30">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Lightbox({ state, onClose, onChange }: { state: { list: Photo[]; index: number } | null; onClose: () => void; onChange: (i: number) => void }) {
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
  const catLabel = photo ? CATEGORIES.find((c) => c.id === photo.cat)?.label : '';

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
            <button onClick={onClose} aria-label="Zavřít" className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
              <X className="size-5" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
            <picture key={photo.id} className="contents">
              {photo.avif.length > 0 && <source type="image/avif" srcSet={srcSet(photo, 'avif')} sizes="100vw" />}
              <source type="image/webp" srcSet={srcSet(photo, 'webp')} sizes="100vw" />
              <img src={srcOf(photo)} width={photo.width} height={photo.height} alt={photo.caption} decoding="async" className="max-h-full max-w-full rounded-xl object-contain shadow-lifted" />
            </picture>
            <button onClick={prev} aria-label="Předchozí" className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:grid">
              <ChevronLeft className="size-6" />
            </button>
            <button onClick={next} aria-label="Další" className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:grid">
              <ChevronRight className="size-6" />
            </button>
          </div>
          <p className="px-6 pt-3 text-center text-sm text-white/85">{photo.caption}</p>
          <div ref={stripRef} className="no-scrollbar flex gap-1.5 overflow-x-auto px-4 py-3 sm:justify-center sm:px-6">
            {photos.map((p, i) => (
              <button
                key={p.id}
                data-i={i}
                onClick={() => onChange(i)}
                aria-label={`Fotka ${i + 1}`}
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
