import { useState } from 'react';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Picture } from './Picture';
import { Reveal, SectionHeading } from './Reveal';
import { photoById } from '@/data/photos';
import { useI18n } from '@/i18n';

const BASE = import.meta.env.BASE_URL;

// Body na kolmém snímku z dronu (pozice v % šířky/výšky fotky 50)
export const AERIAL_SPOTS = [
  { key: 'house', x: 27, y: 36 },
  { key: 'terrace', x: 37.5, y: 30 },
  { key: 'courtyard', x: 34, y: 56 },
  { key: 'lounge', x: 45, y: 62 },
  { key: 'barn', x: 26, y: 76 },
  { key: 'pergola', x: 63, y: 52 },
  { key: 'garden', x: 72, y: 30 },
  { key: 'pond', x: 60, y: 90 },
] as const;
export type AerialSpotKey = (typeof AERIAL_SPOTS)[number]['key'];

export function Aerial() {
  const { t } = useI18n();
  const a = t.aerial;
  // `pinned` = bod vybraný klepnutím (zůstává), `hover` = dočasné zvýraznění myší/fokusem
  const [pinned, setPinned] = useState<AerialSpotKey>('house');
  const [hover, setHover] = useState<AerialSpotKey | null>(null);
  const [play, setPlay] = useState(false);
  const active = hover ?? pinned;
  const idx = AERIAL_SPOTS.findIndex((s) => s.key === active);
  const step = (d: 1 | -1) => setPinned(AERIAL_SPOTS[(idx + d + AERIAL_SPOTS.length) % AERIAL_SPOTS.length].key);

  return (
    <section id="areal" className="container-x py-20 sm:py-32">
      <SectionHeading eyebrow={a.eyebrow} title={a.title} text={a.text} />

      <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          {/* Na mobilu výřez 4:3 ze středu fotky (vnitřní vrstva je širší než rám), od sm celá fotka 16:9 */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 shadow-lifted sm:aspect-[16/9]">
            <div className="absolute inset-y-0 left-[-16.667%] w-[133.333%] sm:left-0 sm:w-full">
              <Picture photo={photoById('50')} sizes="(min-width:1024px) 60vw, 135vw" className="h-full w-full" alt={t.gallery.captions['50']} />
              {AERIAL_SPOTS.map((s, i) => (
                <button
                  key={s.key}
                  onMouseEnter={() => setHover(s.key)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(s.key)}
                  onBlur={() => setHover(null)}
                  onClick={() => setPinned(s.key)}
                  aria-label={`${i + 1}. ${a.spots[s.key].name}`}
                  aria-pressed={active === s.key}
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                  className={clsx(
                    'absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white text-sm font-bold shadow-lifted transition-all duration-300',
                    active === s.key ? 'z-10 scale-125 bg-terracotta text-white' : 'bg-forest text-white hover:scale-110',
                  )}
                >
                  {i + 1}
                  {active !== s.key && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-white/40 [animation-duration:2.4s]" />}
                </button>
              ))}
            </div>
            <div className="glass pointer-events-none absolute bottom-4 right-4 hidden max-w-[16rem] rounded-2xl p-4 shadow-lifted lg:block">
              <p className="text-sm font-semibold">{a.spots[active].name}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">{a.spots[active].text}</p>
            </div>
          </div>
        </Reveal>

        {/* Mobil a tablet: jedna karta s vybraným bodem místo dlouhého seznamu */}
        <div className="card flex items-center gap-3 p-4 lg:hidden" aria-live="polite">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-terracotta text-sm font-bold text-white">{idx + 1}</span>
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold">{a.spots[active].name}</p>
            <p className="text-sm leading-snug text-ink-muted">{a.spots[active].text}</p>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <button onClick={() => step(-1)} aria-label={t.gallery.prev} className="grid size-10 place-items-center rounded-full border border-line hover:bg-surface">
              <ChevronLeft className="size-5" />
            </button>
            <button onClick={() => step(1)} aria-label={t.gallery.next} className="grid size-10 place-items-center rounded-full border border-line hover:bg-surface">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Desktop: seznam vedle mapy */}
        <Reveal delay={0.1} className="card hidden p-3 lg:block">
          <ol className="grid gap-0.5">
            {AERIAL_SPOTS.map((s, i) => (
              <li key={s.key}>
                <button
                  onMouseEnter={() => setHover(s.key)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(s.key)}
                  onBlur={() => setHover(null)}
                  onClick={() => setPinned(s.key)}
                  className={clsx('flex w-full items-start gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors', active === s.key ? 'bg-forest-soft' : 'hover:bg-surface')}
                >
                  <span className={clsx('mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white transition-colors', active === s.key ? 'bg-terracotta' : 'bg-forest dark:text-bg')}>{i + 1}</span>
                  <span>
                    <span className="block text-sm font-semibold">{a.spots[s.key].name}</span>
                    <span className="block text-xs leading-relaxed text-ink-muted">{a.spots[s.key].text}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      {/* Prolet dronem */}
      <Reveal className="mt-4 sm:mt-6">
        <div className="relative overflow-hidden rounded-xl2 bg-black shadow-lifted">
          {play ? (
            <video className="aspect-video w-full" src={`${BASE}video/dron.mp4`} poster={`${BASE}video/dron-poster.webp`} controls autoPlay playsInline preload="metadata" />
          ) : (
            <button onClick={() => setPlay(true)} className="group relative block w-full" aria-label={a.videoPlay}>
              <Picture photo={photoById('49')} sizes="100vw" className="aspect-[4/3] w-full sm:aspect-video" imgClassName="object-[68%_50%] transition-transform duration-[1.6s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03] sm:object-center" alt="" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="absolute left-1/2 top-[42%] grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-forest-deep shadow-lifted transition-transform duration-500 group-hover:scale-110 sm:top-1/2 sm:size-20 dark:text-bg">
                <Play className="ml-1 size-7 fill-current sm:size-8" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-5 text-left text-white sm:p-7">
                <span className="eyebrow text-gold">{a.videoEyebrow} · {a.videoMeta}</span>
                <span className="mt-1 block font-display text-xl font-medium leading-tight sm:text-3xl">{a.videoTitle}</span>
              </span>
            </button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
