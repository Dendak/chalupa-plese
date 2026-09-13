// ============================================================
//  STRUKTURNÍ DATA WEBU – čísla, ceny, kontakty, souřadnice.
//  Texty ve třech jazycích jsou v src/i18n/{cs,en,de}.ts
// ============================================================

export const SITE = {
  name: 'Chalupa Pleše',
  url: 'https://dendak.github.io/chalupa-plese/',
  listing: 'https://www.e-chalupy.cz/ubytovani-plese-chalupa-pronajem-o15525',
  rating: { value: 5.0, count: 24 },
  capacity: { beds: 8, bedrooms: 3, bathrooms: 2, parking: 4 },
};

export const OWNER = {
  name: 'Radek Jech',
  // TODO: doplnit skutečné kontakty
  phone: '+420 000 000 000',
  email: 'info@chalupaplese.cz',
  address: { street: 'Pleše 40', city: 'Pleše', zip: '378 21' },
  gps: { lat: 49.19876, lng: 14.82343 },
  vatPayer: true,
};

// Odesílání poptávek: Web3Forms (zdarma, https://web3forms.com) – vlož Access Key.
// Když je prázdný, formulář otevře e-mailového klienta s předvyplněnou zprávou.
export const FORM = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '',
};

// Záložní kurz pro přepočet cen v EN/DE verzi (Kč za 1 €). Živý kurz se načítá z ECB (src/i18n/index.tsx).
export const EUR_RATE = 24.8;

export const HIGHLIGHT_IDS = ['fence', 'users', 'flame', 'trees', 'fish', 'paw'] as const;
export type HighlightId = (typeof HIGHLIGHT_IDS)[number];

export const ROOMS = [
  { key: 'lower', photo: '05' },
  { key: 'upper', photo: '06' },
  { key: 'kids', photo: '08' },
  { key: 'living', photo: '09' },
  { key: 'loft', photo: '24' },
  { key: 'lounge', photo: '35' },
] as const;
export type RoomKey = (typeof ROOMS)[number]['key'];

export const AMENITIES = [
  {
    group: 'kitchen',
    items: [
      { key: 'hob', icon: 'cooking-pot' },
      { key: 'fridge', icon: 'refrigerator' },
      { key: 'dishwasher', icon: 'utensils' },
      { key: 'coffee', icon: 'coffee' },
      { key: 'microwave', icon: 'microwave' },
      { key: 'kettle', icon: 'flame-kindling' },
    ],
  },
  {
    group: 'interior',
    items: [
      { key: 'beds', icon: 'bed-double' },
      { key: 'bathrooms', icon: 'bath' },
      { key: 'tv', icon: 'tv' },
      { key: 'wifi', icon: 'wifi' },
      { key: 'washer', icon: 'washing-machine' },
      { key: 'cot', icon: 'baby' },
      { key: 'stove', icon: 'flame' },
      { key: 'nonsmoking', icon: 'cigarette-off' },
    ],
  },
  {
    group: 'outdoor',
    items: [
      { key: 'pergola', icon: 'tent-tree' },
      { key: 'firepit', icon: 'flame' },
      { key: 'grill', icon: 'beef' },
      { key: 'shower', icon: 'shower-head' },
      { key: 'goals', icon: 'goal' },
      { key: 'furniture', icon: 'armchair' },
      { key: 'parking', icon: 'car' },
      { key: 'fenced', icon: 'fence' },
    ],
  },
  {
    group: 'extra',
    items: [
      { key: 'tap', icon: 'beer' },
      { key: 'dogs', icon: 'dog' },
      { key: 'cleaning', icon: 'sparkles' },
      { key: 'gift', icon: 'gift' },
    ],
  },
] as const;

export type PlanId = 'summer' | 'week' | 'weekend' | 'xmas' | 'nye';
export const PRICING = {
  minNights: 2,
  longWeekend: 15400,
  plans: [
    { id: 'summer', price: 29400, accent: true },
    { id: 'week', price: 25500 },
    { id: 'weekend', price: 12400 },
    { id: 'xmas', price: 29900 },
    { id: 'nye', price: 35500 },
  ] as { id: PlanId; price: number; accent?: boolean }[],
};

export const VIDEOS = ['WV3iSx-6qlU', 'FD-WYk98Qy8', '3_DvInDh5U4', 'QjouojOHjpI'] as const;

export const POIS = [
  { key: 'home', lat: 49.19876, lng: 14.82343, type: 'home' },
  { key: 'shop', lat: 49.1955, lng: 14.8214, type: 'shop' },
  { key: 'kardasova', lat: 49.1847779, lng: 14.8531546, type: 'town' },
  { key: 'recickyRybnik', lat: 49.1867, lng: 14.8774, type: 'swim' },
  { key: 'cervenaLhota', lat: 49.2496, lng: 14.8818, type: 'castle' },
  { key: 'jindrichuvHradec', lat: 49.1443, lng: 15.0028, type: 'town' },
  { key: 'vlkovska', lat: 49.1641, lng: 14.7141, type: 'swim' },
  { key: 'sobeslav', lat: 49.2638, lng: 14.7219, type: 'swim' },
] as const;

export const DISTANCES = [
  { key: 'd3', minutes: 6 },
  { key: 'jh', minutes: 15 },
  { key: 'tabor', minutes: 23 },
  { key: 'cb', minutes: 30 },
  { key: 'trebon', minutes: 30 },
  { key: 'praha', minutes: 60 },
] as const;
