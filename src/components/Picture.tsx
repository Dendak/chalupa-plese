import { useState } from 'react';
import clsx from 'clsx';
import type { Photo } from '@/data/photos';

const BASE = import.meta.env.BASE_URL;

export const srcSet = (photo: Photo, fmt: 'webp' | 'avif') => photo[fmt].map((w) => `${BASE}img/${photo.id}-${w}.${fmt} ${w}w`).join(', ');
export const srcOf = (photo: Photo, w = Math.max(...photo.webp)) => `${BASE}img/${photo.id}-${w}.webp`;

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
  return (
    <div
      className={clsx('relative overflow-hidden bg-surface', className)}
      style={{ backgroundImage: `url(${photo.lqip})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <picture>
        {photo.avif.length > 0 && <source type="image/avif" srcSet={srcSet(photo, 'avif')} sizes={sizes} />}
        <source type="image/webp" srcSet={srcSet(photo, 'webp')} sizes={sizes} />
        <img
          src={srcOf(photo)}
          width={photo.width}
          height={photo.height}
          alt={alt ?? ''}
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
