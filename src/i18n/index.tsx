import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { cs, type Dict } from './cs';
import { en } from './en';
import { de } from './de';
import { EUR_RATE } from '@/data/site';

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
}

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detect);
  const t = DICTS[lang];

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
      eur: (n) => (t.showEur ? (n / EUR_RATE).toLocaleString(t.intl, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }) : null),
    }),
    [lang, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n outside I18nProvider');
  return ctx;
}
