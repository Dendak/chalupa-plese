import { useState } from 'react';
import clsx from 'clsx';
import { Play } from 'lucide-react';
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
  const [active, setActive] = useState<AerialSpotKey | null>(null);
  const [play, setPlay] = useState(false);

  return (
    <section id="areal" className="container-x py-24 sm:py-32">
      <SectionHeading eyebrow={a.eyebrow} title={a.title} text={a.text} />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl2 shadow-lifted">
            <Picture photo={photoById('50')} sizes="(min-width:1024px) 60vw, 100vw" className="aspect-[16/9] w-full" alt={t.gallery.captions['50']} />
            {AERIAL_SPOTS.map((s, i) => (
              <button
                key={s.key}
                onMouseEnter={() => setActive(s.key)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(s.key)}
                onBlur={() => setActive(null)}
                onClick={() => setActive((v) => (v === s.key ? null : s.key))}
                aria-label={`${i + 1}. ${a.spots[s.key].name}`}
                aria-pressed={active === s.key}
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                className={clsx(
                  'absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white text-xs font-bold shadow-lifted transition-all duration-300 sm:size-9 sm:text-sm',
                  active === s.key ? 'z-10 scale-125 bg-terracotta text-white' : 'bg-forest text-white hover:scale-110',
                )}
              >
                {i + 1}
                {active !== s.key && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-white/40 [animation-duration:2.4s]" />}
              </button>
            ))}
            {active && (
              <div className="glass pointer-events-none absolute bottom-4 right-4 hidden max-w-[16rem] rounded-2xl p-4 shadow-lifted sm:block">
                <p className="text-sm font-semibold">{a.spots[active].name}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">{a.spots[active].text}</p>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="card p-2 sm:p-3">
          <ol className="grid gap-0.5 sm:grid-cols-2 lg:grid-cols-1">
            {AERIAL_SPOTS.map((s, i) => (
              <li key={s.key}>
                <button
                  onMouseEnter={() => setActive(s.key)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(s.key)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive((v) => (v === s.key ? null : s.key))}
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
      <Reveal className="mt-6">
        <div className="relative overflow-hidden rounded-xl2 bg-black shadow-lifted">
          {play ? (
            <video className="aspect-video w-full" src={`${BASE}video/dron.mp4`} poster={`${BASE}video/dron-poster.webp`} controls autoPlay playsInline preload="metadata" />
          ) : (
            <button onClick={() => setPlay(true)} className="group relative block w-full" aria-label={a.videoPlay}>
              <Picture photo={photoById('49')} sizes="100vw" className="aspect-video w-full" imgClassName="transition-transform duration-[1.6s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]" alt="" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-forest-deep shadow-lifted transition-transform duration-500 group-hover:scale-110 dark:text-bg">
                <Play className="ml-1 size-8 fill-current" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-5 text-left text-white sm:p-7">
                <span className="eyebrow text-gold">{a.videoEyebrow}</span>
                <span className="mt-1 block font-display text-2xl font-medium sm:text-3xl">{a.videoTitle}</span>
                <span className="mt-1 block text-sm text-white/80">{a.videoMeta}</span>
              </span>
            </button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
