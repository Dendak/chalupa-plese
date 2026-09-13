import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  children: ReactNode;
  label: string;
  prevLabel: string;
  nextLabel: string;
  className?: string;
  /** Vnitřní odsazení pásu (aby stín karet nebyl uříznutý). */
  padClass?: string;
}

/** Vodorovný karusel ohraničený šířkou obsahu: scroll-snap, šipky, ukazatel průběhu. */
export function Rail({ children, label, prevLabel, nextLabel, className, padClass = 'px-1 py-2 gap-5' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [scrollable, setScrollable] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 8);
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

  const scrollBy = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.85, behavior: 'smooth' });

  return (
    <div className={className}>
      <div ref={ref} role="region" aria-label={label} tabIndex={0} className={clsx('no-scrollbar -mx-1 flex snap-x snap-mandatory overflow-x-auto scroll-smooth outline-offset-4', padClass)}>
        {children}
      </div>
      {scrollable && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-forest transition-[width] duration-150" style={{ width: `${Math.max(8, progress * 100)}%` }} />
          </div>
          <div className="flex gap-2">
            <button onClick={() => scrollBy(-1)} disabled={atStart} aria-label={prevLabel} className="grid size-11 place-items-center rounded-full border border-line bg-bg-elevated shadow-soft transition hover:bg-surface disabled:opacity-30">
              <ChevronLeft className="size-5" />
            </button>
            <button onClick={() => scrollBy(1)} disabled={atEnd} aria-label={nextLabel} className="grid size-11 place-items-center rounded-full border border-line bg-bg-elevated shadow-soft transition hover:bg-surface disabled:opacity-30">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
