import { OWNER, SITE } from '@/data/site';

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-elevated">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl font-semibold">{SITE.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">{SITE.tagline}. Pronájem celé chalupy pro až 8 osob v Jižních Čechách.</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Kontakt</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>{OWNER.name}</li>
            <li>
              <a href={`tel:${OWNER.phone.replace(/\s/g, '')}`} className="hover:text-forest">
                {OWNER.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${OWNER.email}`} className="hover:text-forest">
                {OWNER.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Adresa</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>{OWNER.address.street}</li>
            <li>
              {OWNER.address.zip} {OWNER.address.city}
            </li>
            <li>{OWNER.address.region}</li>
            <li>
              <a href={SITE.listing} target="_blank" rel="noreferrer" className="text-forest underline-offset-2 hover:underline">
                Profil na e-chalupy.cz
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name} · {OWNER.name}</p>
          <p>Mapové podklady © OpenStreetMap</p>
        </div>
      </div>
    </footer>
  );
}
