import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, CalendarCheck, Info } from 'lucide-react';
import { addMonths, eachDayOfInterval, endOfMonth, format, getDay, isBefore, startOfDay, startOfMonth } from 'date-fns';
import { Reveal, SectionHeading } from './Reveal';
import { dayStatus, estimate, fromKey, isSummer, nightOccupied, rangeIsFree, toKey } from '@/lib/dates';
import { useI18n } from '@/i18n';

export interface Selection {
  from: string | null;
  to: string | null;
}

export function Calendar({ selection, onSelect }: { selection: Selection; onSelect: (s: Selection) => void }) {
  const { t, czk, eur } = useI18n();
  const c = t.calendar;
  const loc = { locale: t.dateLocale };
  const today = startOfDay(new Date());
  const [month, setMonth] = useState(startOfMonth(today));
  const [hover, setHover] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const months = [month, addMonths(month, 1)];

  const handleClick = (key: string) => {
    setError(null);
    const { from, to } = selection;
    if (!from || (from && to)) {
      if (nightOccupied(key)) {
        setError(c.errors.bookedStart);
        return;
      }
      onSelect({ from: key, to: null });
      return;
    }
    if (key <= from) {
      onSelect({ from: key, to: null });
      return;
    }
    if (!rangeIsFree(from, key)) {
      setError(c.errors.rangeBooked);
      return;
    }
    onSelect({ from, to: key });
  };

  const previewTo = selection.from && !selection.to && hover && hover > selection.from ? hover : selection.to;
  const est = useMemo(() => (selection.from && selection.to ? estimate(selection.from, selection.to) : null), [selection]);
  const fmtDay = (k: string) => format(fromKey(k), 'd. M.', loc);
  const fmtDate = (k: string) => format(fromKey(k), 'd. M. yyyy', loc);

  return (
    <section id="obsazenost" className="bg-surface/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} text={c.text} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_340px]">
          <Reveal className="card p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setMonth((m) => addMonths(m, -1))}
                disabled={!isBefore(startOfMonth(today), month)}
                className="grid size-10 place-items-center rounded-full border border-line hover:bg-surface disabled:opacity-30"
                aria-label={c.prevMonth}
              >
                <ChevronLeft className="size-5" />
              </button>
              <p className="font-display text-xl font-medium capitalize">
                {format(months[0], 'LLLL yyyy', loc)} <span className="hidden text-ink-muted sm:inline">– {format(months[1], 'LLLL yyyy', loc)}</span>
              </p>
              <button onClick={() => setMonth((m) => addMonths(m, 1))} className="grid size-10 place-items-center rounded-full border border-line hover:bg-surface" aria-label={c.nextMonth}>
                <ChevronRight className="size-5" />
              </button>
            </div>

            <p className="mt-4 rounded-xl bg-surface px-4 py-2 text-center text-sm" aria-live="polite">
              {!selection.from && (
                <>
                  <span className="font-semibold text-forest">{c.step1}</span> {c.step1text}
                </>
              )}
              {selection.from && !selection.to && (
                <>
                  <span className="font-semibold text-forest">{c.step2}</span> {c.step2text}
                </>
              )}
              {selection.from && selection.to && (
                <>
                  <span className="font-semibold text-forest">{c.selected}</span> {fmtDay(selection.from)} – {fmtDate(selection.to)}
                </>
              )}
            </p>

            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {months.map((m, mi) => (
                <div key={m.toISOString()} className={clsx(mi === 1 && 'hidden sm:block')}>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    {c.weekdays.map((w) => (
                      <span key={w} className="py-1">
                        {w}
                      </span>
                    ))}
                  </div>
                  <div className="mt-1 grid grid-cols-7 gap-1">
                    {Array.from({ length: (getDay(startOfMonth(m)) + 6) % 7 }).map((_, i) => (
                      <span key={`e${i}`} />
                    ))}
                    {eachDayOfInterval({ start: startOfMonth(m), end: endOfMonth(m) }).map((d) => {
                      const key = toKey(d);
                      const past = isBefore(d, today);
                      const status = dayStatus(key);
                      const inRange = selection.from && previewTo && key >= selection.from && key <= previewTo;
                      const isFrom = key === selection.from;
                      const isTo = key === previewTo;
                      const summer = isSummer(key);
                      return (
                        <button
                          key={key}
                          disabled={past || status === 'booked'}
                          onClick={() => handleClick(key)}
                          onMouseEnter={() => setHover(key)}
                          onMouseLeave={() => setHover(null)}
                          title={status !== 'free' ? c.tips.booked : summer ? c.tips.summer : c.tips.free}
                          className={clsx(
                            'relative aspect-square rounded-lg text-sm font-medium transition-all duration-200',
                            past && 'text-ink-muted/40',
                            !past && status === 'free' && !isFrom && !isTo && 'hover:bg-forest-soft',
                            status === 'booked' && 'day-booked text-ink-muted line-through',
                            status === 'arrival' && 'day-arrival',
                            status === 'departure' && 'day-departure',
                            inRange && !isFrom && !isTo && 'bg-forest-soft',
                            (isFrom || isTo) && 'bg-forest text-white ring-2 ring-forest/30 dark:text-bg',
                            summer && !past && status === 'free' && !inRange && 'after:absolute after:bottom-1 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-gold',
                          )}
                        >
                          {d.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-ink-muted">
              <span className="flex items-center gap-2"><span className="size-3.5 rounded bg-forest-soft ring-1 ring-line" /> {c.legend.free}</span>
              <span className="flex items-center gap-2"><span className="day-booked size-3.5 rounded" /> {c.legend.booked}</span>
              <span className="flex items-center gap-2"><span className="day-arrival size-3.5 rounded ring-1 ring-line" /> {c.legend.arrival}</span>
              <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-gold" /> {c.legend.summer}</span>
            </div>
            {error && <p role="alert" className="mt-3 rounded-xl bg-terracotta-soft px-4 py-2.5 text-sm text-terracotta">{error}</p>}
          </Reveal>

          <Reveal delay={0.1} className="card flex flex-col p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-forest-soft text-forest">
                <CalendarCheck className="size-5" />
              </span>
              <h3 className="text-lg font-semibold">{c.yourDates}</h3>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-surface p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{c.arrival}</dt>
                <dd className="mt-1 font-display text-xl font-medium">{selection.from ? fmtDate(selection.from) : '–'}</dd>
              </div>
              <div className="rounded-2xl bg-surface p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{c.departure}</dt>
                <dd className="mt-1 font-display text-xl font-medium">{selection.to ? fmtDate(selection.to) : '–'}</dd>
              </div>
            </dl>
            {est ? (
              <div className="mt-4 rounded-2xl border border-line p-4">
                <p className="text-sm text-ink-muted">
                  {c.nights(est.nights)} · {c.labels[est.label]}
                </p>
                <p className="mt-1 font-display text-3xl font-medium text-forest">{est.price ? czk(est.price) : c.onRequest}</p>
                {est.price && eur(est.price) && <p className="text-sm font-medium text-ink-muted">≈ {eur(est.price)}</p>}
                {est.hint && (
                  <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
                    <Info className="mt-0.5 size-3.5 shrink-0" /> {c.hints[est.hint]}
                  </p>
                )}
                <p className="mt-2 text-xs text-ink-muted">{c.orientation}</p>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{selection.from ? c.promptEnd : c.promptStart}</p>
            )}
            <div className="mt-auto pt-6">
              {selection.to ? (
                <a href="#poptavka" className="btn-accent w-full">
                  {c.askFor}
                </a>
              ) : (
                <span aria-disabled="true" className="btn-ghost w-full cursor-not-allowed text-ink-muted">
                  {c.chooseFirst}
                </span>
              )}
              {selection.from && (
                <button onClick={() => onSelect({ from: null, to: null })} className="mt-2 w-full text-center text-xs text-ink-muted underline-offset-2 hover:underline">
                  {c.clear}
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
