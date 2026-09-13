import { Reveal, SectionHeading } from './Reveal';
import { Icon } from './Icon';
import { Picture } from './Picture';
import { HIGHLIGHTS, SITE } from '@/data/site';
import { photoById } from '@/data/photos';

export function Highlights() {
  return (
    <section id="chalupa" className="container-x py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <SectionHeading
          eyebrow="Proč právě sem"
          title="Přestavěný statek, kde má každý své místo – a přitom jste spolu."
          text="Představte si ráno, kdy se bosí projdete po čerstvé trávě a kávu vypijete při východu slunce. Děti si hrají na oplocené zahradě, vy víte, že jim nic nehrozí. Večer krb, pergola a hvězdy."
        />
        <Reveal delay={0.15} className="grid grid-cols-3 gap-3 text-center">
          {[
            [SITE.capacity.beds, 'lůžek'],
            [SITE.capacity.bedrooms, 'ložnice'],
            [SITE.capacity.bathrooms, 'koupelny'],
          ].map(([n, l]) => (
            <div key={l} className="card px-3 py-5">
              <p className="font-display text-4xl font-medium text-forest sm:text-5xl">{n}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-muted">{l}</p>
            </div>
          ))}
        </Reveal>
      </div>

      {/* Bento */}
      <div className="mt-14 grid gap-4 md:grid-cols-6 md:auto-rows-[220px]">
        <Reveal className="md:col-span-3 md:row-span-2">
          <div className="group relative h-full min-h-[320px] overflow-hidden rounded-xl2 shadow-soft">
            <Picture photo={photoById('29')} sizes="(min-width:768px) 50vw, 100vw" className="h-full w-full" imgClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="eyebrow text-gold">Zahrada</p>
              <h3 className="mt-2 text-2xl font-medium">Oplocená zahrada s ohništěm, pergolou a fotbalovými brankami</h3>
            </div>
          </div>
        </Reveal>

        {HIGHLIGHTS.map((h, i) => (
          <Reveal key={h.title} as="article" delay={0.05 * i} className="md:col-span-3 lg:col-span-2 md:[&:nth-child(4)]:col-span-3 lg:[&:nth-child(4)]:col-span-2">
            <div className="card group flex h-full flex-col p-6 transition-transform duration-500 hover:-translate-y-1">
              <span className="grid size-11 place-items-center rounded-2xl bg-forest-soft text-forest">
                <Icon name={h.icon} className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold leading-snug">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{h.text}</p>
            </div>
          </Reveal>
        ))}

        <Reveal className="md:col-span-3 lg:col-span-4">
          <div className="group relative h-full min-h-[240px] overflow-hidden rounded-xl2 shadow-soft">
            <Picture photo={photoById('35')} sizes="(min-width:768px) 66vw, 100vw" className="h-full w-full" imgClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="eyebrow text-gold">Společenská místnost</p>
              <h3 className="mt-2 text-2xl font-medium">Posezení u kamen, bar a výčep – aniž byste rušili spící děti</h3>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
