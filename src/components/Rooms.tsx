import { Reveal, SectionHeading } from './Reveal';
import { Picture } from './Picture';
import { ROOMS } from '@/data/site';
import { photoById } from '@/data/photos';

export function Rooms() {
  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading
        eyebrow="Ubytování"
        title="Tři ložnice, dvě koupelny a spousta místa na setkávání."
        text="Do všech postelí jsme koupili nové pohodlné matrace. Ručníky, osušky i povlečení jsou samozřejmostí."
      />
      <div className="no-scrollbar mt-12 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {ROOMS.map((r, i) => (
          <Reveal key={r.title} as="article" delay={i * 0.06} className="w-[82vw] shrink-0 snap-center sm:w-auto">
            <div className="card group h-full overflow-hidden">
              <Picture photo={photoById(r.photo)} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 82vw" className="aspect-[4/3]" imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" />
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">{r.floor}</p>
                  <span className="chip">{r.beds}</span>
                </div>
                <h3 className="mt-2 text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{r.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
