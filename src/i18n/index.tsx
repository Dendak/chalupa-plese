import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { cs, type Dict } from './cs';
import { en } from './en';
import { de } from './de';
import { EUR_RATE } from '@/data/site';

const RATE_URL = 'https://api.frankfurter.dev/v1/latest?base=EUR&symbols=CZK'; // ECB, bez klíče
const RATE_KEY = 'eurRate';
const RATE_TTL = 12 * 60 * 60 * 1000;

/** Aktuální kurz EUR/CZK: mezipaměť v prohlížeči (12 h) → ECB API → záloha EUR_RATE. */
async function loadRate(): Promise<{ rate: number; date: string | null }> {
  try {
    const raw = localStorage.getItem(RATE_KEY);
    if (raw) {
      const c = JSON.parse(raw) as { rate: number; date: string; ts: number };
      if (c.rate > 10 && c.rate < 50 && Date.now() - c.ts < RATE_TTL) return { rate: c.rate, date: c.date };
    }
  } catch {
    /* ignore */
  }
  try {
    const res = await fetch(RATE_URL, { cache: 'no-store' });
    const j = (await res.json()) as { date: string; rates: { CZK: number } };
    const rate = j.rates?.CZK;
    if (rate > 10 && rate < 50) {
      try {
        localStorage.setItem(RATE_KEY, JSON.stringify({ rate, date: j.date, ts: Date.now() }));
      } catch {
        /* ignore */
      }
      return { rate, date: j.date };
    }
  } catch {
    /* offline / blokováno */
  }
  return { rate: EUR_RATE, date: null };
}

export type Lang = 'cs' | 'en' | 'de';
export const LANGS: Lang[] = ['cs', 'en', 'de'];
const DICTS: Record<Lang, Dict> = { cs, en, de };

function detect(): Lang {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (q && LANGS.includes(q as Lang)) return q as Lang;
    const s = localStorage.getItem('lang');
    if (s && LANGS.includes(s as Lang)) return s as Lang;
  } catch {
    /* ignore */
  }
  const nav = (navigator.languages?.[0] ?? navigator.language ?? 'cs').slice(0, 2).toLowerCase();
  if (nav === 'de') return 'de';
  if (nav === 'cs' || nav === 'sk') return 'cs';
  return 'en';
}

interface Ctx {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
  czk: (n: number) => string;
  eur: (n: number) => string | null;
  rate: number;
  rateDate: string | null;
}

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detect);
  const [fx, setFx] = useState<{ rate: number; date: string | null }>({ rate: EUR_RATE, date: null });
  const t = DICTS[lang];

  useEffect(() => {
    let alive = true;
    loadRate().then((r) => alive && setFx(r));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* ignore */
    }
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.meta.description);
  }, [lang, t]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      t,
      setLang: (l) => {
        setLangState(l);
        try {
          localStorage.setItem('lang', l);
          const u = new URL(location.href);
          if (l === 'cs') u.searchParams.delete('lang');
          else u.searchParams.set('lang', l);
          history.replaceState(null, '', u);
        } catch {
          /* ignore */
        }
      },
      czk: (n) => n.toLocaleString(t.intl, { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }),
      // Orientační cena v €, vždy zaokrouhlená nahoru na celé desítky
      eur: (n) => (t.showEur ? (Math.ceil(n / fx.rate / 10) * 10).toLocaleString(t.intl, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }) : null),
      rate: fx.rate,
      rateDate: fx.date,
    }),
    [lang, t, fx],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n outside I18nProvider');
  return ctx;
}
