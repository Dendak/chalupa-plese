import { useState, lazy, Suspense } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Highlights } from './components/Highlights';
import { Aerial } from './components/Aerial';
import { Gallery } from './components/Gallery';
import { Videos } from './components/Videos';
import { Rooms } from './components/Rooms';
import { Amenities } from './components/Amenities';
import { Pricing } from './components/Pricing';
import { Calendar, type Selection } from './components/Calendar';
import { Reviews } from './components/Reviews';
import { Inquiry } from './components/Inquiry';
import { Footer } from './components/Footer';
import { MobileCta } from './components/MobileCta';

const MapSection = lazy(() => import('./components/MapSection').then((m) => ({ default: m.MapSection })));

export default function App() {
  const [selection, setSelection] = useState<Selection>({ from: null, to: null });
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Highlights />
        <Aerial />
        <Gallery />
        <Rooms />
        <Videos />
        <Amenities />
        <Pricing />
        <Calendar selection={selection} onSelect={setSelection} />
        <Suspense fallback={<div className="container-x py-24"><div className="card h-[520px] animate-pulse" /></div>}>
          <MapSection />
        </Suspense>
        <Reviews />
        <Inquiry selection={selection} onSelect={setSelection} />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
