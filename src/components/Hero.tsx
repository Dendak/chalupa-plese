import { motion } from 'motion/react';
import { Star, BedDouble, DoorOpen, Fence, PawPrint, ArrowDown, MapPin } from 'lucide-react';
import { Picture } from './Picture';
import { photoById } from '@/data/photos';
import { SITE } from '@/data/site';
import { useI18n } from '@/i18n';

export function Hero() {
  const { t } = useI18n();
  const hero = photoById('15');
  const ease = [0.16, 1, 0.3, 1] as const;
  const chips = [
    { icon: BedDouble, label: t.hero.beds(SITE.capacity.beds) },
    { icon: DoorOpen, label: t.hero.bedrooms(SITE.capacity.bedrooms) },
    { icon: Fence, label: t.hero.fenced },
    { icon: PawPrint, label: t.hero.pets },
  ];
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Picture photo={hero} priority sizes="100vw" className="hero-parallax h-full w-full" imgClassName="object-[center_60%]" alt={t.hero.imgAlt} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />
      </div>

      <div className="container-x flex min-h-[100svh] flex-col justify-end pb-10 pt-28 sm:pb-24 sm:pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.1 }}>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            <MapPin className="size-3.5" /> {t.hero.badge}
          </p>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="max-w-4xl text-[2.6rem] font-light leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          {t.hero.title1} <em className="font-medium italic text-gold">{t.hero.title2}</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.35 }} className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:mt-6 sm:text-xl">
          {t.hero.intro}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.5 }} className="mt-6 flex flex-wrap items-center gap-2 sm:mt-8">
          {chips.map(({ icon: I, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-md">
              <I className="size-4" /> {label}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-sm font-semibold text-[oklch(26%_0.06_155)]">
            <Star className="size-4 fill-current" /> {t.hero.rating(SITE.rating.value.toLocaleString(t.intl, { minimumFractionDigits: 1 }), SITE.rating.count)}
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.65 }} className="mt-7 flex flex-wrap gap-3 sm:mt-10">
          <a href="#obsazenost" className="btn-accent px-7 py-3.5 text-base">
            {t.hero.ctaDates}
          </a>
          <a href="#galerie" className="btn border border-white/30 bg-white/10 px-7 py-3.5 text-base text-white backdrop-blur-md hover:bg-white/20">
            {t.hero.ctaPhotos}
          </a>
        </motion.div>
      </div>

      <a href="#chalupa" aria-label={t.hero.scrollDown} className="absolute bottom-6 right-6 hidden animate-float rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur-md sm:block">
        <ArrowDown className="size-5" />
      </a>
    </section>
  );
}
