import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Menu, X, Moon, Sun, Phone } from 'lucide-react';
import { OWNER, SITE } from '@/data/site';
import { LANGS, useI18n, type Lang } from '@/i18n';

const LINKS: { href: string; key: 'chalupa' | 'galerie' | 'vybaveni' | 'cenik' | 'obsazenost' | 'okoli' | 'recenze' }[] = [
  { href: '#chalupa', key: 'chalupa' },
  { href: '#galerie', key: 'galerie' },
  { href: '#vybaveni', key: 'vybaveni' },
  { href: '#cenik', key: 'cenik' },
  { href: '#obsazenost', key: 'obsazenost' },
  { href: '#okoli', key: 'okoli' },
  { href: '#recenze', key: 'recenze' },
];

const SHORT: Record<Lang, string> = { cs: 'CZ', en: 'EN', de: 'DE' };

const mq = () => window.matchMedia('(prefers-color-scheme: dark)');

/** Tmavý režim: výchozí podle zařízení (sleduje i změny za běhu). Ruční volba se uloží;
 *  když uživatel přepne zpět na to, co má zařízení, uložená volba se zahodí a web se dál řídí zařízením. */
function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const m = mq();
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem('theme');
      } catch {
        /* ignore */
      }
      if (stored) return; // ruční volba má přednost
      setDark(e.matches);
      document.documentElement.classList.toggle('dark', e.matches);
    };
    m.addEventListener('change', onChange);
    return () => m.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      if (next === mq().matches) localStorage.removeItem('theme');
      else localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
  };
  return { dark, toggle };
}

function LangSwitch({ light, className }: { light: boolean; className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t.nav.language} className={clsx('flex items-center rounded-full p-0.5', light ? 'bg-white/15' : 'bg-surface', className)}>
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          lang={l}
          className={clsx(
            'rounded-full px-2.5 py-1.5 text-xs font-bold tracking-wide transition-colors',
            lang === l ? (light ? 'bg-white text-forest-deep' : 'bg-forest text-white dark:text-bg') : light ? 'text-white/85 hover:text-white' : 'text-ink-muted hover:text-ink',
          )}
        >
          {SHORT[l]}
        </button>
      ))}
    </div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const light = !scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <a href="#main" className="sr-only-focusable">
        {t.nav.skip}
      </a>
      <nav
        aria-label="Navigation"
        className={clsx('container-x flex items-center justify-between rounded-full py-2 pl-5 pr-2 transition-all duration-500', scrolled || open ? 'glass shadow-soft' : 'bg-transparent')}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
      >
        <a href="#top" className="flex items-center gap-2.5 whitespace-nowrap font-display text-lg font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-full bg-forest text-white shadow-soft dark:text-bg">
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M12 3 2 12h3v8h14v-8h3L12 3zm-2 15v-5h4v5h-4z" /></svg>
          </span>
          <span className={clsx(light && 'text-white drop-shadow')}>{SITE.name}</span>
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={clsx('whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors', scrolled ? 'text-ink hover:bg-surface' : 'text-white/90 hover:bg-white/15 hover:text-white')}
              >
                {t.nav[l.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <LangSwitch light={light} className="hidden md:flex" />
          <button
            onClick={toggle}
            aria-label={dark ? t.nav.themeLight : t.nav.themeDark}
            className={clsx('grid size-10 place-items-center rounded-full transition-colors', scrolled || open ? 'text-ink hover:bg-surface' : 'text-white hover:bg-white/15')}
          >
            {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
          </button>
          <a href="#poptavka" className="btn-accent hidden whitespace-nowrap py-2.5 sm:inline-flex">
            {t.nav.cta}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={t.nav.menu}
            aria-expanded={open}
            className={clsx('grid size-10 place-items-center rounded-full transition-colors xl:hidden', scrolled || open ? 'text-ink hover:bg-surface' : 'text-white hover:bg-white/15')}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobilní menu */}
      <div
        inert={!open}
        className={clsx('container-x mt-2 overflow-hidden transition-all duration-500 xl:hidden', open ? 'max-h-[85vh] opacity-100' : 'pointer-events-none max-h-0 opacity-0')}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div className="glass rounded-3xl p-3 shadow-lifted">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-base font-medium hover:bg-surface">
                  {t.nav[l.key]}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between border-t border-line px-2 pt-3 md:hidden">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{t.nav.language}</span>
            <LangSwitch light={false} />
          </div>
          <div className="mt-3 flex gap-2">
            <a href={`tel:${OWNER.phone.replace(/\s/g, '')}`} className="btn-ghost flex-1">
              <Phone className="size-4" /> {t.nav.call}
            </a>
            <a href="#poptavka" onClick={() => setOpen(false)} className="btn-accent flex-1">
              {t.nav.cta}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
