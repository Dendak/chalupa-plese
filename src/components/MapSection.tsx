import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Navigation } from 'lucide-react';
import { Reveal, SectionHeading } from './Reveal';
import { DISTANCES, OWNER, POIS } from '@/data/site';
import { useI18n } from '@/i18n';

const homeIcon = L.divIcon({
  className: '',
  html: '<div class="marker-home"><svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 3 2 12h3v8h14v-8h3L12 3zm-2 15v-5h4v5h-4z"/></svg></div>',
  iconSize: [46, 46],
  iconAnchor: [23, 46],
  popupAnchor: [0, -44],
});
const poiIcon = L.divIcon({ className: '', html: '<div class="marker-poi"></div>', iconSize: [14, 14], iconAnchor: [7, 7], popupAnchor: [0, -8] });

export function MapSection() {
  const { t } = useI18n();
  const m = t.map;
  const { lat, lng } = OWNER.gps;
  const NAV_APPS = [
    { name: 'Google Maps', href: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving` },
    { name: 'Waze', href: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes` },
    { name: 'Mapy.com', href: `https://mapy.com/cs/zakladni?planovani-trasy&rc=&rt=&mrp=%7B%22c%22%3A111%7D&x=${lng}&y=${lat}&z=15&source=coor&id=${lng}%2C${lat}` },
    { name: 'Apple Maps', href: `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d` },
  ];
  return (
    <section id="okoli" className="container-x py-24 sm:py-32">
      <SectionHeading eyebrow={m.eyebrow} title={m.title} text={m.text} />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="card overflow-hidden">
          <div className="h-[420px] sm:h-[520px]">
            <MapContainer center={[lat + 0.015, lng + 0.06]} zoom={11} scrollWheelZoom={false} className="h-full w-full">
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {POIS.map((p) => {
                const d = m.pois[p.key];
                return (
                  <Marker key={p.key} position={[p.lat, p.lng]} icon={p.type === 'home' ? homeIcon : poiIcon} title={d.name} alt={d.name}>
                    <Popup>
                      <strong>{d.name}</strong>
                      <br />
                      {d.text}
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
          <div className="border-t border-line p-4">
            <p className="text-sm">
              <strong>{OWNER.address.street}</strong>, {OWNER.address.zip} {OWNER.address.city} · GPS {lat}N, {lng}E
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                <Navigation className="size-3.5" /> {m.navigateWith}
              </span>
              {NAV_APPS.map((app, i) => (
                <a key={app.name} href={app.href} target="_blank" rel="noreferrer" className={i === 0 ? 'btn-primary py-2 text-xs' : 'btn-ghost py-2 text-xs'}>
                  {app.name}
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4">
          <Reveal delay={0.1} className="card p-6">
            <h3 className="text-lg font-semibold">{m.drive}</h3>
            <ul className="mt-4 divide-y divide-line">
              {DISTANCES.map((d) => (
                <li key={d.key} className="flex items-center justify-between py-2.5 text-sm">
                  <span>{m.distances[d.key]}</span>
                  <span className="font-semibold text-forest">{m.min(d.minutes)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-muted">{m.driveNote}</p>
          </Reveal>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {m.trips.map((trip, i) => (
          <Reveal key={trip.title} as="article" delay={i * 0.06} className="card p-6">
            <h3 className="font-display text-xl font-medium">{trip.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{trip.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
