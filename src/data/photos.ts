// Fotogalerie – kategorie a popisky. Technická data (rozměry, varianty, LQIP)
// generuje `npm run photos` do photos.generated.json.
import generated from './photos.generated.json';

export type PhotoCategory = 'dum' | 'interier' | 'spolecenska' | 'zahrada' | 'okoli';

export const CATEGORIES: { id: PhotoCategory | 'vse'; label: string }[] = [
  { id: 'vse', label: 'Vše' },
  { id: 'dum', label: 'Dům a dvůr' },
  { id: 'interier', label: 'Interiér' },
  { id: 'spolecenska', label: 'Společenská místnost' },
  { id: 'zahrada', label: 'Zahrada' },
  { id: 'okoli', label: 'Okolí a rybník' },
];

// id fotky (dvojčíslí ze souboru v photos-src) → kategorie + popisek
const META: Record<string, { cat: PhotoCategory; caption: string; featured?: boolean }> = {
  '01': { cat: 'interier', caption: 'Pejsci jsou u nás vítáni' },
  '02': { cat: 'dum', caption: 'Vchod s terasou a markýzou', featured: true },
  '03': { cat: 'dum', caption: 'Vstup do chalupy' },
  '04': { cat: 'interier', caption: 'Obývací pokoj – i pro čtyřnohé členy rodiny' },
  '05': { cat: 'interier', caption: 'Spodní ložnice s manželskou postelí', featured: true },
  '06': { cat: 'interier', caption: 'Horní ložnice s manželskou postelí' },
  '07': { cat: 'interier', caption: 'Horní ložnice' },
  '08': { cat: 'interier', caption: 'Dětský pokoj se 4 lůžky', featured: true },
  '09': { cat: 'interier', caption: 'Obývací pokoj s novými rozkládacími pohovkami', featured: true },
  '10': { cat: 'interier', caption: 'Plně vybavená kuchyně' },
  '11': { cat: 'interier', caption: 'Pozornost pro ubytované hosty' },
  '12': { cat: 'interier', caption: 'Nově k dispozici i dětská postýlka' },
  '13': { cat: 'interier', caption: 'Kávovar dělá kávu z čerstvě namletých zrnek' },
  '14': { cat: 'dum', caption: 'Uzavřený dvůr' },
  '15': { cat: 'dum', caption: 'Uzavřený vnitřní dvůr', featured: true },
  '16': { cat: 'zahrada', caption: 'Houpací síť ve stínu stromu' },
  '17': { cat: 'zahrada', caption: 'Venkovní posezení pod pergolou u krbu', featured: true },
  '18': { cat: 'zahrada', caption: 'Venkovní posezení u krbu' },
  '19': { cat: 'zahrada', caption: 'Oplocená zahrada – ráj pro pejsky' },
  '20': { cat: 'dum', caption: 'Chalupa Pleše' },
  '21': { cat: 'dum', caption: 'Chalupa u rybníka' },
  '22': { cat: 'dum', caption: 'Chalupa Pleše' },
  '23': { cat: 'interier', caption: 'Kanape ve spodní ložnici' },
  '24': { cat: 'interier', caption: 'Posezení v patře pod velkým střešním oknem' },
  '25': { cat: 'interier', caption: 'Klidné zákoutí s výhledem na dvůr – ideální na kávu a knihu' },
  '26': { cat: 'interier', caption: 'Relaxační koutek v patře' },
  '27': { cat: 'interier', caption: 'Horní koupelna – sprchový kout, umyvadlo, toaleta' },
  '28': { cat: 'interier', caption: 'Spodní koupelna s vanou a dvěma umyvadly' },
  '29': { cat: 'zahrada', caption: 'Zadní zahrada, celá oplocená', featured: true },
  '30': { cat: 'zahrada', caption: 'Ohýnek' },
  '31': { cat: 'zahrada', caption: 'Venkovní krb – grilování' },
  '32': { cat: 'dum', caption: 'Západ slunce nad chalupou – kamenná zeď odděluje dvůr a zahradu' },
  '33': { cat: 'dum', caption: 'Pohled na dvůr ze střešního okna ložnice' },
  '34': { cat: 'interier', caption: 'Kanape ve spodní ložnici' },
  '35': { cat: 'spolecenska', caption: 'Společenská místnost – posezení u krbu', featured: true },
  '36': { cat: 'spolecenska', caption: 'Společenská místnost v bývalých chlívech' },
  '37': { cat: 'spolecenska', caption: 'Společenská místnost – posezení u krbu' },
  '38': { cat: 'okoli', caption: 'Soukromý rybník k rybaření', featured: true },
  '39': { cat: 'okoli', caption: 'Soukromý rybník – 5 minut autem od chalupy' },
  '40': { cat: 'okoli', caption: 'Rybník v okolí' },
  '41': { cat: 'dum', caption: 'Dvůr pod sněhem' },
  '42': { cat: 'dum', caption: 'Chalupa na konci vesnice v zimě' },
  '43': { cat: 'okoli', caption: 'Za chalupou už jsou jen louky a lesy' },
  '44': { cat: 'spolecenska', caption: 'Krásný večer v relax místnosti' },
  '45': { cat: 'zahrada', caption: 'Nově k dispozici i menší branky na fotbálek' },
  '46': { cat: 'interier', caption: 'Malý dárek pro naše silvestrovské hosty' },
  '47': { cat: 'okoli', caption: 'Zimní rybník' },
  '48': { cat: 'okoli', caption: 'Pole a louky kolem Pleší' },
};

export interface Photo {
  id: string;
  cat: PhotoCategory;
  caption: string;
  featured: boolean;
  width: number;
  height: number;
  webp: number[];
  avif: number[];
  lqip: string;
}

export const PHOTOS: Photo[] = generated.map((g) => {
  const m = META[g.id] ?? { cat: 'dum' as PhotoCategory, caption: 'Chalupa Pleše' };
  return { ...g, cat: m.cat, caption: m.caption, featured: m.featured ?? false };
});

export const photoById = (id: string) => PHOTOS.find((p) => p.id === id)!;
