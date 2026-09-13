import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Menu, X, Moon, Sun, Phone } from 'lucide-react';
import { OWNER, SITE } from '@/data/site';

const LINKS = [
  { href: '#chalupa', label: 'Chalupa' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#vybaveni', label: 'Vybavení' },
  { href: '#cenik', label: 'Ceník' },
  { href: '#obsazenost', label: 'Obsazenost' },
  { href: '#okoli', label: 'Okolí' },
  { href: '#recenze', label: 'Recenze' },
];

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
  };
  return { dark, toggle };
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={clsx(
          'container-x flex items-center justify-between rounded-full py-2 pl-5 pr-2 transition-all duration-500',
          scrolled || open ? 'glass shadow-soft' : 'bg-transparent',
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
      >
        <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-full bg-forest text-white shadow-soft dark:text-bg">
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M12 3 2 12h3v8h14v-8h3L12 3zm-2 15v-5h4v5h-4z" /></svg>
          </span>
          <span className={clsx(!scrolled && !open && 'text-white drop-shadow')}>{SITE.name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={clsx(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  scrolled ? 'text-ink hover:bg-surface' : 'text-white/90 hover:bg-white/15 hover:text-white',
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggle}
            aria-label={dark ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'}
            className={clsx(
              'grid size-10 place-items-center rounded-full transition-colors',
              scrolled || open ? 'text-ink hover:bg-surface' : 'text-white hover:bg-white/15',
            )}
          >
            {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
          </button>
          <a href="#poptavka" className="btn-accent hidden py-2.5 sm:inline-flex">
            Poptat termín
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className={clsx(
              'grid size-10 place-items-center rounded-full transition-colors lg:hidden',
              scrolled || open ? 'text-ink hover:bg-surface' : 'text-white hover:bg-white/15',
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobilní menu */}
      <div
        className={clsx(
          'container-x mt-2 overflow-hidden transition-all duration-500 lg:hidden',
          open ? 'max-h-[80vh] opacity-100' : 'pointer-events-none max-h-0 opacity-0',
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div className="glass rounded-3xl p-3 shadow-lifted">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-base font-medium hover:bg-surface">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex gap-2 border-t border-line pt-3">
            <a href={`tel:${OWNER.phone.replace(/\s/g, '')}`} className="btn-ghost flex-1">
              <Phone className="size-4" /> Zavolat
            </a>
            <a href="#poptavka" onClick={() => setOpen(false)} className="btn-accent flex-1">
              Poptat termín
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
