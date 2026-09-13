import { useState, type FormEvent } from 'react';
import clsx from 'clsx';
import { Send, CheckCircle2, Phone, Mail, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Reveal, SectionHeading } from './Reveal';
import { FORM, OWNER, SITE } from '@/data/site';
import type { Selection } from './Calendar';
import { estimate, czk, fromKey } from '@/lib/dates';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Inquiry({ selection, onSelect }: { selection: Selection; onSelect: (s: Selection) => void }) {
  const [status, setStatus] = useState<Status>('idle');
  const est = selection.from && selection.to ? estimate(selection.from, selection.to) : null;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.website) return; // honeypot

    const lines = [
      `Poptávka z webu ${SITE.name}`,
      '',
      `Příjezd: ${data.from || '–'}`,
      `Odjezd: ${data.to || '–'}`,
      `Počet osob: ${data.persons}`,
      `Pejsek: ${data.pets ? 'ano' : 'ne'}`,
      '',
      `Jméno: ${data.name}`,
      `E-mail: ${data.email}`,
      `Telefon: ${data.phone}`,
      '',
      data.message,
    ];

    if (!FORM.accessKey) {
      window.location.href = `mailto:${OWNER.email}?subject=${encodeURIComponent(`Poptávka termínu ${data.from || ''} – ${data.to || ''}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
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
          subject: `Poptávka termínu ${data.from} – ${data.to} (${data.name})`,
          from_name: SITE.name,
          ...data,
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
          <SectionHeading eyebrow="Poptávka" title="Napište nám. Odpovídáme rychle." text="Nezávazně poptejte termín. Ozveme se s potvrzením dostupnosti a přesnou cenou, obvykle do 24 hodin." />
          <Reveal delay={0.1} className="mt-10 space-y-4">
            <a href={`tel:${OWNER.phone.replace(/\s/g, '')}`} className="card flex items-center gap-4 p-5 transition-transform hover:-translate-y-0.5">
              <span className="grid size-11 place-items-center rounded-2xl bg-forest-soft text-forest">
                <Phone className="size-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Telefon</p>
                <p className="font-semibold">{OWNER.phone}</p>
              </div>
            </a>
            <a href={`mailto:${OWNER.email}`} className="card flex items-center gap-4 p-5 transition-transform hover:-translate-y-0.5">
              <span className="grid size-11 place-items-center rounded-2xl bg-forest-soft text-forest">
                <Mail className="size-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">E-mail</p>
                <p className="font-semibold">{OWNER.email}</p>
              </div>
            </a>
            <p className="text-sm leading-relaxed text-ink-muted">
              {OWNER.name} · {OWNER.address.street}, {OWNER.address.zip} {OWNER.address.city}. Ověřený majitel na e-chalupy.cz, jsme plátci DPH a vystavujeme faktury.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          {status === 'sent' ? (
            <div className="card flex h-full flex-col items-center justify-center p-10 text-center">
              <CheckCircle2 className="size-14 text-moss" />
              <h3 className="mt-5 text-2xl font-semibold">Děkujeme za poptávku!</h3>
              <p className="mt-2 max-w-sm text-ink-muted">
                {FORM.accessKey ? 'Ozveme se vám co nejdříve s potvrzením termínu.' : 'Otevřel se váš e-mailový klient s předvyplněnou zprávou – stačí odeslat.'}
              </p>
              <button onClick={() => setStatus('idle')} className="btn-ghost mt-8">
                Poslat další poptávku
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="card p-6 sm:p-8">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="from" className={label}>Příjezd</label>
                  <input id="from" name="from" type="date" required value={selection.from ?? ''} onChange={(e) => onSelect({ from: e.target.value || null, to: selection.to })} className={input} />
                </div>
                <div>
                  <label htmlFor="to" className={label}>Odjezd</label>
                  <input id="to" name="to" type="date" required min={selection.from ?? undefined} value={selection.to ?? ''} onChange={(e) => onSelect({ from: selection.from, to: e.target.value || null })} className={input} />
                </div>
                <div>
                  <label htmlFor="persons" className={label}>Počet osob</label>
                  <select id="persons" name="persons" defaultValue="8" className={input}>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1} {i === 0 ? 'osoba' : i < 4 ? 'osoby' : 'osob'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-line bg-bg-elevated px-4 py-3 text-sm">
                    <input type="checkbox" name="pets" className="size-4 accent-[var(--forest)]" /> Přijedeme s pejskem
                  </label>
                </div>
                <div>
                  <label htmlFor="name" className={label}>Jméno a příjmení</label>
                  <input id="name" name="name" required autoComplete="name" placeholder="Jan Novák" className={input} />
                </div>
                <div>
                  <label htmlFor="phone" className={label}>Telefon</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+420 …" className={input} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className={label}>E-mail</label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="jan@email.cz" className={input} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className={label}>Zpráva</label>
                  <textarea id="message" name="message" rows={4} placeholder="Kolik vás přijede, jestli máte děti, pejska, nebo cokoliv, co nám pomůže pobyt připravit…" className={input} />
                </div>
              </div>

              {est && (
                <p className="mt-4 rounded-2xl bg-forest-soft px-4 py-3 text-sm text-forest">
                  {format(fromKey(selection.from!), 'd. M.')} – {format(fromKey(selection.to!), 'd. M. yyyy')} · {est.nights} nocí · {est.price ? `orientačně ${czk(est.price)}` : 'cena na dotaz'}
                </p>
              )}
              {status === 'error' && <p className="mt-4 rounded-2xl bg-terracotta-soft px-4 py-3 text-sm text-terracotta">Odeslání se nezdařilo. Zkuste to prosím znovu nebo nám zavolejte.</p>}

              <button type="submit" disabled={status === 'sending'} className={clsx('btn-accent mt-6 w-full py-3.5 text-base', status === 'sending' && 'opacity-70')}>
                {status === 'sending' ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-4" />}
                Odeslat nezávaznou poptávku
              </button>
              <p className="mt-3 text-center text-[11px] text-ink-muted">Odesláním souhlasíte se zpracováním údajů pro účely vyřízení poptávky.</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
