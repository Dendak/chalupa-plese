import clsx from 'clsx';
import { Check, ChevronDown } from 'lucide-react';
import { Reveal, SectionHeading } from './Reveal';
import { PRICING } from '@/data/site';
import { czk } from '@/lib/dates';

export function Pricing() {
  return (
    <section id="cenik" className="container-x py-24 sm:py-32">
      <SectionHeading eyebrow="Ceník" title="Konečné ceny. Žádné skryté poplatky." text="Pronajímáme vždy celou chalupu – během pobytu ji máte jen pro sebe. Ceny platí pro až 8 osob." />

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {PRICING.plans.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06} as="article" className={clsx(p.accent && 'lg:col-span-1')}>
            <div
              className={clsx(
                'card relative flex h-full flex-col p-6 transition-transform duration-500 hover:-translate-y-1',
                p.accent && 'border-transparent bg-gradient-to-br from-forest to-forest-deep text-white shadow-lifted dark:text-bg',
              )}
            >
              {p.accent && <span className="absolute right-4 top-4 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-forest-deep">Léto</span>}
              <p className={clsx('eyebrow', p.accent && 'pr-14 text-gold')}>{p.period}</p>
              <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
              <p className="mt-5 font-display text-3xl font-medium sm:text-4xl">{czk(p.price)}</p>
              <p className={clsx('mt-1 text-xs', p.accent ? 'text-white/70 dark:text-bg/70' : 'text-ink-muted')}>{p.unit}</p>
              <p className={clsx('mt-4 text-sm leading-relaxed', p.accent ? 'text-white/85 dark:text-bg/85' : 'text-ink-muted')}>{p.note}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="card p-6 sm:p-8">
          <h3 className="text-lg font-semibold">V ceně je zahrnuto</h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {PRICING.included.map((it) => (
              <li key={it} className="flex items-center gap-2.5 text-sm">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-forest-soft text-forest">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {it}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="chip">Min. {PRICING.minNights} noci</span>
            <span className="chip">{PRICING.deposit}</span>
            <span className="chip">{PRICING.caution}</span>
          </div>
        </Reveal>

        <Reveal className="card divide-y divide-line p-2 sm:p-4" delay={0.1}>
          {PRICING.terms.map((t) => (
            <details key={t.q} className="group px-4 py-3">
              <summary className="flex items-center justify-between gap-4 py-1 text-base font-semibold">
                {t.q}
                <ChevronDown className="chev size-5 shrink-0 text-ink-muted" />
              </summary>
              <p className="pb-2 pt-2 text-sm leading-relaxed text-ink-muted">{t.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
