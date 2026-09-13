import { useCallback, useEffect, useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react';
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
  /** Automatické pomalé posouvání v px/s (0 = vypnuto). Běží jen když je pás vidět, pauza při hoveru/dotyku. */
  autoplay?: number;
}

const IDLE_MS = 4000;

/** Vodorovný karusel ohraničený šířkou obsahu: scroll-snap, šipky, tažitelný ukazatel průběhu, volitelný autoplay. */
export function Rail({ children, label, prevLabel, nextLabel, className, padClass = 'px-1 py-2 gap-5', autoplay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [thumb, setThumb] = useState(1);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 8);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setThumb(el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1);
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

  // ---------- autoplay ----------
  const paused = useRef(false);
  const idleUntil = useRef(0);
  const visible = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !autoplay) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    };

    const markIdle = () => (idleUntil.current = performance.now() + IDLE_MS);
    const onWheel = markIdle;
    const onPointerDown = () => {
      paused.current = true;
      markIdle();
    };
    const onPointerUp = () => (paused.current = false);
    const onEnter = () => (paused.current = true);
    const onLeave = () => (paused.current = false);
    el.addEventListener('wheel', onWheel, { passive: true });
    el.addEventListener('touchstart', onPointerDown, { passive: true });
    el.addEventListener('touchend', onPointerUp, { passive: true });
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('focusin', onEnter);
    el.addEventListener('focusout', onLeave);

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let restAt = 0; // čas, kdy skončil dojezd na konec
    const step = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const max = el.scrollWidth - el.clientWidth;
      visible.current = inView();
      const active = visible.current && !paused.current && !dragging && document.visibilityState === 'visible' && now > idleUntil.current && max > 8;
      if (active) {
        if (el.scrollLeft >= max - 1) {
          if (!restAt) restAt = now;
          if (now - restAt > 2500) {
            el.scrollTo({ left: 0, behavior: 'smooth' });
            idleUntil.current = now + 1500;
            restAt = 0;
          }
        } else {
          acc += (autoplay * dt) / 1000;
          const px = Math.floor(acc);
          if (px >= 1) {
            el.scrollLeft += px;
            acc -= px;
          }
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onPointerDown);
      el.removeEventListener('touchend', onPointerUp);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('focusin', onEnter);
      el.removeEventListener('focusout', onLeave);
    };
  }, [autoplay, dragging]);

  const pauseAfterUser = () => (idleUntil.current = performance.now() + IDLE_MS);

  const scrollBy = (dir: 1 | -1) => {
    pauseAfterUser();
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.85, behavior: 'smooth' });
  };

  // ---------- tažitelný ukazatel ----------
  const seek = (clientX: number, smooth: boolean) => {
    const el = ref.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const r = track.getBoundingClientRect();
    const thumbW = r.width * thumb;
    const ratio = Math.min(1, Math.max(0, (clientX - r.left - thumbW / 2) / (r.width - thumbW)));
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: ratio * max, behavior: smooth ? 'smooth' : 'auto' });
  };
  const onTrackPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    pauseAfterUser();
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    seek(e.clientX, false);
  };
  const onTrackPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    seek(e.clientX, false);
  };
  const onTrackPointerUp = () => {
    setDragging(false);
    pauseAfterUser();
  };

  return (
    <div className={className}>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className={clsx('no-scrollbar -mx-1 flex overflow-x-auto outline-offset-4', !autoplay && !dragging && 'snap-x snap-mandatory', padClass)}
      >
        {children}
      </div>
      {scrollable && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div
            ref={trackRef}
            role="scrollbar"
            aria-controls={undefined}
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-orientation="horizontal"
            onPointerDown={onTrackPointerDown}
            onPointerMove={onTrackPointerMove}
            onPointerUp={onTrackPointerUp}
            onPointerCancel={onTrackPointerUp}
            className={clsx('group relative flex-1 touch-none py-3', dragging ? 'cursor-grabbing' : 'cursor-grab')}
          >
            <div className="h-1 overflow-hidden rounded-full bg-line transition-[height] group-hover:h-1.5">
              <div
                className="h-full rounded-full bg-forest"
                style={{ width: `${Math.max(6, thumb * 100)}%`, transform: `translateX(${progress * (100 / Math.max(6, thumb * 100) - 1) * 100}%)`, transition: dragging ? 'none' : 'transform 120ms linear' }}
              />
            </div>
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
