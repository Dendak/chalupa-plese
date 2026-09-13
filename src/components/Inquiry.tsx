import { useState, type FormEvent } from 'react';
import clsx from 'clsx';
import { Send, CheckCircle2, Phone, Mail, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Reveal, SectionHeading } from './Reveal';
import { FORM, OWNER, SITE } from '@/data/site';
import type { Selection } from './Calendar';
import { estimate, fromKey } from '@/lib/dates';
import { useI18n } from '@/i18n';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Inquiry({ selection, onSelect }: { selection: Selection; onSelect: (s: Selection) => void }) {
  const { t, lang, czk } = useI18n();
  const q = t.inquiry;
  const [status, setStatus] = useState<Status>('idle');
  const est = selection.from && selection.to ? estimate(selection.from, selection.to) : null;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.website) return; // honeypot

    const m = q.mail;
    const lines = [
      `${m.header} ${SITE.name} (${lang.toUpperCase()})`,
      '',
      `${m.from}: ${data.from || '–'}`,
      `${m.to}: ${data.to || '–'}`,
      `${m.persons}: ${data.persons}`,
      `${m.pets}: ${data.pets ? m.yes : m.no}`,
      '',
      `${m.name}: ${data.name}`,
      `${m.email}: ${data.email}`,
      `${m.phone}: ${data.phone}`,
      '',
      data.message,
    ];

    if (!FORM.accessKey) {
      window.location.href = `mailto:${OWNER.email}?subject=${encodeURIComponent(m.subject(data.from || '', data.to || ''))}&body=${encodeURIComponent(lines.join('\n'))}`;
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(FORM.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: FORM.accessKey,
          subject: `${m.subject(data.from, data.to)} (${data.name})`,
          from_name: SITE.name,
          ...data,
          language: lang,
          message: lines.join('\n'),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  const input = 'w-full rounded-2xl border border-line bg-bg-elevated px-4 py-3 text-sm outline-none transition-all placeholder:text-ink-muted/60 focus:border-forest focus:ring-4 focus:ring-forest/10';
  const label = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted';

  return (
    <section id="poptavka" className="container-x py-24 sm:py-32">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={q.eyebrow} title={q.title} text={q.text} />
          <Reveal delay={0.1} className="mt-10 space-y-4">
            <a href={`tel:${OWNER.phone.replace(/\s/g, '')}`} className="card flex items-center gap-4 p-5 transition-transform hover:-translate-y-0.5">
              <span className="grid size-11 place-items-center rounded-2xl bg-forest-soft text-forest">
                <Phone className="size-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{q.phone}</p>
                <p className="font-semibold">{OWNER.phone}</p>
              </div>
            </a>
            <a href={`mailto:${OWNER.email}`} className="card flex items-center gap-4 p-5 transition-transform hover:-translate-y-0.5">
              <span className="grid size-11 place-items-center rounded-2xl bg-forest-soft text-forest">
                <Mail className="size-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{q.email}</p>
                <p className="font-semibold">{OWNER.email}</p>
              </div>
            </a>
            <p className="text-sm leading-relaxed text-ink-muted">
              {OWNER.name} · {OWNER.address.street}, {OWNER.address.zip} {OWNER.address.city}. {q.ownerLine}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          {status === 'sent' ? (
            <div className="card flex h-full flex-col items-center justify-center p-10 text-center">
              <CheckCircle2 className="size-14 text-moss" />
              <h3 className="mt-5 text-2xl font-semibold">{q.successTitle}</h3>
              <p className="mt-2 max-w-sm text-ink-muted">{FORM.accessKey ? q.successKey : q.successMail}</p>
              <button onClick={() => setStatus('idle')} className="btn-ghost mt-8">
                {q.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="card p-6 sm:p-8">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="from" className={label}>{q.labels.from}</label>
                  <input id="from" name="from" type="date" required value={selection.from ?? ''} onChange={(e) => onSelect({ from: e.target.value || null, to: selection.to })} className={input} />
                </div>
                <div>
                  <label htmlFor="to" className={label}>{q.labels.to}</label>
                  <input id="to" name="to" type="date" required min={selection.from ?? undefined} value={selection.to ?? ''} onChange={(e) => onSelect({ from: selection.from, to: e.target.value || null })} className={input} />
                </div>
                <div>
                  <label htmlFor="persons" className={label}>{q.labels.persons}</label>
                  <select id="persons" name="persons" defaultValue="8" className={input}>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <option key={i} value={i + 1}>
                        {q.persons(i + 1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-line bg-bg-elevated px-4 py-3 text-sm">
                    <input type="checkbox" name="pets" className="size-5 accent-[var(--forest)]" /> {q.pets}
                  </label>
                </div>
                <div>
                  <label htmlFor="name" className={label}>{q.labels.name}</label>
                  <input id="name" name="name" required autoComplete="name" placeholder={q.placeholders.name} className={input} />
                </div>
                <div>
                  <label htmlFor="phone" className={label}>{q.labels.phone}</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder={q.placeholders.phone} className={input} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className={label}>{q.labels.email}</label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder={q.placeholders.email} className={input} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className={label}>{q.labels.message}</label>
                  <textarea id="message" name="message" rows={4} placeholder={q.placeholders.message} className={input} />
                </div>
              </div>

              {est && (
                <p className="mt-4 rounded-2xl bg-forest-soft px-4 py-3 text-sm text-forest">
                  {format(fromKey(selection.from!), 'd. M.', { locale: t.dateLocale })} – {format(fromKey(selection.to!), 'd. M. yyyy', { locale: t.dateLocale })} · {t.calendar.nights(est.nights)} ·{' '}
                  {est.price ? `${q.approx} ${czk(est.price)}` : q.priceOnRequest}
                </p>
              )}
              {status === 'error' && <p role="alert" className="mt-4 rounded-2xl bg-terracotta-soft px-4 py-3 text-sm text-terracotta">{q.error}</p>}

              <button type="submit" disabled={status === 'sending'} className={clsx('btn-accent mt-6 w-full py-3.5 text-base', status === 'sending' && 'opacity-70')}>
                {status === 'sending' ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-4" />}
                {q.submit}
              </button>
              <p className="mt-3 text-center text-xs text-ink-muted">{q.consent}</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
