import { useState } from 'react';
import { Play } from 'lucide-react';
import { Reveal, SectionHeading } from './Reveal';
import { VIDEOS } from '@/data/site';

function Short({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative aspect-[9/16] overflow-hidden rounded-3xl bg-black shadow-soft">
      {play ? (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button onClick={() => setPlay(true)} className="group relative h-full w-full" aria-label={`Přehrát video: ${title}`}>
          <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => ((e.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`))} />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-forest-deep shadow-lifted transition-transform duration-500 group-hover:scale-110">
            <Play className="ml-1 size-7 fill-current" />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-medium text-white">{title}</span>
        </button>
      )}
    </div>
  );
}

export function Videos() {
  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading eyebrow="Video" title="Krátká videa přímo z chalupy." text="Klikněte pro přehrání. Videa se načítají až po kliknutí, takže vás nezpomalí." />
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {VIDEOS.map((v, i) => (
          <Reveal key={v.id} delay={i * 0.08}>
            <Short {...v} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
