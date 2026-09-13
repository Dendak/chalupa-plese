import { Reveal, SectionHeading } from './Reveal';
import { Icon } from './Icon';
import { AMENITIES } from '@/data/site';

export function Amenities() {
  return (
    <section id="vybaveni" className="bg-forest text-white dark:bg-surface dark:text-ink">
      <div className="container-x py-24 sm:py-32">
        <div className="[&_.eyebrow]:text-gold [&_p]:text-white/75 dark:[&_p]:text-ink-muted">
          <SectionHeading eyebrow="Vybavení" title="Všechno, co potřebujete. A pár věcí navíc." text="Kávovar na zrnkovou kávu, myčka, pračka, dvě koupelny, pergola, gril, venkovní sprcha i výčep. Přijeďte jen s kufrem." />
        </div>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {AMENITIES.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.08}>
              <h3 className="font-display text-2xl font-medium text-gold">{g.group}</h3>
              <ul className="mt-5 space-y-3">
                {g.items.map((it) => (
                  <li key={it.label} className="flex items-start gap-3 text-sm leading-snug text-white/90 dark:text-ink">
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white/10 dark:bg-forest-soft dark:text-forest">
                      <Icon name={it.icon} className="size-4" />
                    </span>
                    <span className="pt-1.5">{it.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
