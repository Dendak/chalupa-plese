// Fotogalerie – kategorie a výběr do mozaiky. Popisky ve 3 jazycích: src/i18n/*.ts (gallery.captions).
// Technická data (rozměry, varianty, LQIP) generuje `npm run photos` do photos.generated.json.
import generated from './photos.generated.json';

export type PhotoCategory = 'dum' | 'interier' | 'spolecenska' | 'zahrada' | 'okoli';
export const CATEGORY_IDS: (PhotoCategory | 'vse')[] = ['vse', 'dum', 'interier', 'spolecenska', 'zahrada', 'okoli'];

// id fotky (dvojčíslí ze souboru v photos-src) → kategorie (+ featured = větší dlaždice)
const META: Record<string, { cat: PhotoCategory; featured?: boolean }> = {
  '01': { cat: 'interier' },
  '02': { cat: 'dum', featured: true },
  '03': { cat: 'dum' },
  '04': { cat: 'interier' },
  '05': { cat: 'interier', featured: true },
  '06': { cat: 'interier' },
  '07': { cat: 'interier' },
  '08': { cat: 'interier', featured: true },
  '09': { cat: 'interier', featured: true },
  '10': { cat: 'interier' },
  '11': { cat: 'interier' },
  '12': { cat: 'interier' },
  '13': { cat: 'interier' },
  '14': { cat: 'dum' },
  '15': { cat: 'dum', featured: true },
  '16': { cat: 'zahrada' },
  '17': { cat: 'zahrada', featured: true },
  '18': { cat: 'zahrada' },
  '19': { cat: 'zahrada' },
  '20': { cat: 'dum' },
  '21': { cat: 'dum' },
  '22': { cat: 'dum' },
  '23': { cat: 'interier' },
  '24': { cat: 'interier' },
  '25': { cat: 'interier' },
  '26': { cat: 'interier' },
  '27': { cat: 'interier' },
  '28': { cat: 'interier' },
  '29': { cat: 'zahrada', featured: true },
  '30': { cat: 'zahrada' },
  '31': { cat: 'zahrada' },
  '32': { cat: 'dum' },
  '33': { cat: 'dum' },
  '34': { cat: 'interier' },
  '35': { cat: 'spolecenska', featured: true },
  '36': { cat: 'spolecenska' },
  '37': { cat: 'spolecenska' },
  '38': { cat: 'okoli', featured: true },
  '39': { cat: 'okoli' },
  '40': { cat: 'okoli' },
  '41': { cat: 'dum' },
  '42': { cat: 'dum' },
  '43': { cat: 'okoli' },
  '44': { cat: 'spolecenska' },
  '45': { cat: 'zahrada' },
  '46': { cat: 'interier' },
  '47': { cat: 'okoli' },
  '48': { cat: 'okoli' },
  '49': { cat: 'dum', featured: true },
  '50': { cat: 'dum' },
};

export interface Photo {
  id: string;
  cat: PhotoCategory;
  featured: boolean;
  width: number;
  height: number;
  webp: number[];
  avif: number[];
  lqip: string;
}

export const PHOTOS: Photo[] = generated.map((g) => {
  const m = META[g.id] ?? { cat: 'dum' as PhotoCategory };
  return { ...g, cat: m.cat, featured: m.featured ?? false };
});

export const photoById = (id: string) => PHOTOS.find((p) => p.id === id)!;
