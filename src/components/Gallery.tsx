import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';
import { Picture } from './Picture';
import { Reveal, SectionHeading } from './Reveal';
import { CATEGORIES, PHOTOS, type Photo, type PhotoCategory } from '@/data/photos';

export function Gallery() {
  const [cat, setCat] = useState<PhotoCategory | 'vse'>('vse');
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const list = useMemo(() => (cat === 'vse' ? PHOTOS : PHOTOS.filter((p) => p.cat === cat)), [cat]);
  const visible = showAll || cat !== 'vse' ? list : list.slice(0, 12);

  return (
    <section id="galerie" className="bg-surface/60 py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Galerie" title="Podívejte se dovnitř i ven." text={`${PHOTOS.length} fotografií chalupy, zahrady a okolí.`} />
          <Reveal className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" delay={0.1}>
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
              </button>
            ))}
          </Reveal>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4" style={{ gridAutoFlow: 'dense' }}>
          {visible.map((p, i) => (
            <li
              key={p.id}
              className={clsx('reveal-css', p.featured && 'col-span-2 row-span-2')}
            >
              <button
                onClick={() => setActive(list.indexOf(p))}
                className="group relative block h-full w-full overflow-hidden rounded-2xl shadow-soft outline-offset-4"
                aria-label={`Otevřít fotku: ${p.caption}`}
              >
                <Picture
                  photo={p}
                  sizes={p.featured ? '(min-width:1024px) 50vw, 100vw' : '(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw'}
                  className={clsx('h-full w-full', p.featured ? 'aspect-square sm:aspect-[4/3]' : 'aspect-square sm:aspect-[4/3]')}
                  imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                  priority={i < 4}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-left text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <span className="line-clamp-2">{p.caption}</span>
                  <Expand className="size-4 shrink-0" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {cat === 'vse' && !showAll && list.length > 12 && (
          <div className="mt-10 text-center">
            <button onClick={() => setShowAll(true)} className="btn-ghost">
              Zobrazit všech {list.length} fotek
            </button>
          </div>
        )}
      </div>

      <Lightbox photos={list} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </section>
  );
}

function Lightbox({ photos, index, onClose, onChange }: { photos: Photo[]; index: number | null; onClose: () => void; onChange: (i: number) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;
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

  // swipe
  const touch = useRef<number | null>(null);

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
              {index! + 1} / {photos.length}
            </p>
            <button onClick={onClose} aria-label="Zavřít" className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
              <X className="size-5" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
            <Picture key={photo.id} photo={photo} sizes="100vw" className="h-full max-h-full w-auto max-w-full rounded-xl bg-transparent" imgClassName="!object-contain" priority />
            <button onClick={prev} aria-label="Předchozí" className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:grid">
              <ChevronLeft className="size-6" />
            </button>
            <button onClick={next} aria-label="Další" className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:grid">
              <ChevronRight className="size-6" />
            </button>
          </div>
          <p className="px-6 py-4 text-center text-sm text-white/85">{photo.caption}</p>
        </div>
      )}
    </dialog>
  );
}
