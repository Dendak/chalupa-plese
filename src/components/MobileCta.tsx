import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Phone, CalendarDays } from 'lucide-react';
import { OWNER } from '@/data/site';
import { useI18n } from '@/i18n';

/** Lepicí lišta s akcí na mobilu – objeví se po odscrollování hera, schová se u formuláře. */
export function MobileCta() {
  const [show, setShow] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const form = document.getElementById('poptavka');
    let nearForm = false;
    const io = new IntersectionObserver(([e]) => {
      nearForm = e.isIntersecting;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearForm);
    });
    if (form) io.observe(form);
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8 && !nearForm);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className={clsx('fixed inset-x-3 bottom-3 z-40 flex gap-2 transition-all duration-500 sm:hidden', show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0')}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)', transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
    >
      <a href={`tel:${OWNER.phone.replace(/\s/g, '')}`} aria-label={t.mobileCta.call} className="glass grid size-12 shrink-0 place-items-center rounded-full text-ink shadow-lifted">
        <Phone className="size-5" />
      </a>
      <a href="#obsazenost" className="btn-accent flex-1 py-3.5 shadow-lifted">
        <CalendarDays className="size-4" /> {t.mobileCta.cta}
      </a>
    </div>
  );
}
