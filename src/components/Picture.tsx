import { useState } from 'react';
import clsx from 'clsx';
import type { Photo } from '@/data/photos';

const BASE = import.meta.env.BASE_URL;

interface Props {
  photo: Photo;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  alt?: string;
}

export function Picture({ photo, sizes = '100vw', className, imgClassName, priority, alt }: Props) {
  const [loaded, setLoaded] = useState(false);
  const srcset = (fmt: 'webp' | 'avif', ws: number[]) => ws.map((w) => `${BASE}img/${photo.id}-${w}.${fmt} ${w}w`).join(', ');
  const largest = Math.max(...photo.webp);
  return (
    <div
      className={clsx('relative overflow-hidden bg-surface', className)}
      style={{ backgroundImage: `url(${photo.lqip})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <picture>
        {photo.avif.length > 0 && <source type="image/avif" srcSet={srcset('avif', photo.avif)} sizes={sizes} />}
        <source type="image/webp" srcSet={srcset('webp', photo.webp)} sizes={sizes} />
        <img
          src={`${BASE}img/${photo.id}-${largest}.webp`}
          width={photo.width}
          height={photo.height}
          alt={alt ?? photo.caption}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={clsx(
            'h-full w-full object-cover transition-[opacity,filter] duration-700 ease-out',
            loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md',
            imgClassName,
          )}
        />
      </picture>
    </div>
  );
}
