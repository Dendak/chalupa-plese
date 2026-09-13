import clsx from 'clsx';
import { Check, ChevronDown } from 'lucide-react';
import { Reveal, SectionHeading } from './Reveal';
import { PRICING } from '@/data/site';
import { useI18n } from '@/i18n';

export function Pricing() {
  const { t, czk, eur, rate, rateDate } = useI18n();
  const p = t.pricing;
  return (
    <section id="cenik" className="container-x py-24 sm:py-32">
      <SectionHeading eyebrow={p.eyebrow} title={p.title} text={p.text} />

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {PRICING.plans.map((plan, i) => {
          const d = p.plans[plan.id];
          const e = eur(plan.price);
          return (
            <Reveal key={plan.id} delay={i * 0.06} as="article">
              <div
                className={clsx(
                  'card relative flex h-full flex-col p-6 transition-transform duration-500 hover:-translate-y-1',
                  plan.accent && 'border-transparent bg-gradient-to-br from-forest to-forest-deep text-white shadow-lifted dark:text-bg',
                )}
              >
                {plan.accent && <span className="absolute right-4 top-4 rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[oklch(26%_0.06_155)]">{p.summerBadge}</span>}
                <p className={clsx('eyebrow', plan.accent && 'pr-14 text-gold')}>{d.period}</p>
                <h3 className="mt-2 text-lg font-semibold">{d.title}</h3>
                <p className="mt-5 font-display text-3xl font-medium sm:text-4xl">{czk(plan.price)}</p>
                {e && <p className={clsx('text-sm font-medium', plan.accent ? 'text-gold' : 'text-forest')}>≈ {e}</p>}
                <p className={clsx('mt-1 text-xs', plan.accent ? 'text-white/70 dark:text-bg/70' : 'text-ink-muted')}>{d.unit}</p>
                <p className={clsx('mt-4 text-sm leading-relaxed', plan.accent ? 'text-white/85 dark:text-bg/85' : 'text-ink-muted')}>{d.note}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="card p-6 sm:p-8">
          <h3 className="text-lg font-semibold">{p.includedTitle}</h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {p.included.map((it) => (
              <li key={it} className="flex items-center gap-2.5 text-sm">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-forest-soft text-forest">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {it}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="chip">{p.minNights(PRICING.minNights)}</span>
            <span className="chip">{p.deposit}</span>
            <span className="chip">{p.caution}</span>
          </div>
          {p.eurNote && (
            <p className="mt-4 text-xs text-ink-muted">
              {p.eurNote}
              {rateDate && ` ${p.rateNote(rate.toLocaleString(t.intl, { maximumFractionDigits: 2 }), new Date(rateDate).toLocaleDateString(t.intl))}`}
            </p>
          )}
        </Reveal>

        <Reveal className="card divide-y divide-line p-2 sm:p-4" delay={0.1}>
          {p.terms.map((term) => (
            <details key={term.q} className="group px-4 py-3">
              <summary className="flex items-center justify-between gap-4 py-1 text-base font-semibold">
                {term.q}
                <ChevronDown className="chev size-5 shrink-0 text-ink-muted" />
              </summary>
              <p className="pb-2 pt-2 text-sm leading-relaxed text-ink-muted">{term.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
