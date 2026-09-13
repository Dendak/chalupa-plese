// ============================================================
//  OBSAH WEBU – texty, ceny, kontakty. Vše na jednom místě.
// ============================================================

export const SITE = {
  name: 'Chalupa Pleše',
  tagline: 'Soukromí, klid a oplocená zahrada na konci vesnice',
  intro:
    'Přestavěný jihočeský statek s uzavřeným dvorem a rozlehlou zahradou pro až 8 hostů. Ideální pro dvě rodiny, party přátel i dovolenou s pejsky.',
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
  address: { street: 'Pleše 40', city: 'Pleše', zip: '378 21', region: 'Jižní Čechy' },
  gps: { lat: 49.19876, lng: 14.82343 },
  vatPayer: true,
};

// Odesílání poptávek: Web3Forms (zdarma, https://web3forms.com) – vlož Access Key.
// Když je prázdný, formulář otevře e-mailového klienta s předvyplněnou zprávou.
export const FORM = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '',
};

export const HIGHLIGHTS = [
  {
    icon: 'fence',
    title: 'Uzavřený dvůr a oplocená zahrada',
    text: 'Děti i pejsci si hrají bezpečně. Kamenná zeď odděluje dvůr od zadní zahrady s ohništěm.',
  },
  {
    icon: 'users',
    title: 'Pro dvě rodiny',
    text: 'Dvě ložnice s manželskou postelí a dětský pokoj se 4 lůžky. Dvě koupelny, aby ráno nikdo nečekal.',
  },
  {
    icon: 'flame',
    title: 'Společenská místnost s kamny',
    text: 'Z bývalých chlívů vznikl útulný prostor, kde si posedíte, aniž byste rušili spící děti. Půjčíme i výčep na sud.',
  },
  {
    icon: 'trees',
    title: 'Poslední dům ve vesnici',
    text: 'Za chalupou už jsou jen louky a lesy. Ticho, západy slunce a hvězdy bez světelného smogu.',
  },
  {
    icon: 'fish',
    title: 'Soukromý rybník',
    text: 'Vlastní rybník k rybaření jen 5 minut autem od chalupy.',
  },
  {
    icon: 'paw',
    title: 'Mazlíčci vítáni',
    text: 'Poplatek za psa je v ceně. Oplocená zahrada je pro ně hotovým rájem.',
  },
];

export const ROOMS = [
  {
    title: 'Spodní ložnice',
    floor: 'Přízemí',
    photo: '05',
    text: 'Manželská postel, kanape, vysoká skříň na ramínka a dva prádelníky. Průchozí do spodní koupelny s vanou.',
    beds: '2 + kanape',
  },
  {
    title: 'Horní ložnice',
    floor: 'Patro',
    photo: '06',
    text: 'Manželská postel, prádelník, skříně a televize. Střešní okno s výhledem na dvůr.',
    beds: '2 lůžka',
  },
  {
    title: 'Dětský pokoj',
    floor: 'Patro',
    photo: '08',
    text: 'Čtyři samostatná lůžka, skříně a prádelník. K dispozici je i dětská postýlka.',
    beds: '4 lůžka',
  },
  {
    title: 'Obývací pokoj a kuchyně',
    floor: 'Přízemí',
    photo: '09',
    text: 'Dvě nové rozkládací sedačky, kulatý stůl, televize s DVD. Kuchyňský kout se dvěma stoly pro 7 osob.',
    beds: 'Společné prostory',
  },
  {
    title: 'Posezení v patře',
    floor: 'Patro',
    photo: '24',
    text: 'Klidné zákoutí pod velkým střešním oknem s výhledem na dvůr. Ideální na kávu a knihu.',
    beds: 'Relax',
  },
  {
    title: 'Společenská místnost',
    floor: 'Přístavba',
    photo: '35',
    text: 'Stylový prostor s krbovými kamny, velkým stolem a barem. V létě i v zimě.',
    beds: 'Pro dospělé',
  },
];

export const AMENITIES: { group: string; items: { icon: string; label: string }[] }[] = [
  {
    group: 'Kuchyně',
    items: [
      { icon: 'cooking-pot', label: 'Varná deska a trouba' },
      { icon: 'refrigerator', label: 'Lednička a mrazák' },
      { icon: 'utensils', label: 'Myčka nádobí' },
      { icon: 'coffee', label: 'Kávovar na zrnkovou kávu' },
      { icon: 'microwave', label: 'Mikrovlnná trouba' },
      { icon: 'flame-kindling', label: 'Rychlovarná konvice' },
    ],
  },
  {
    group: 'Interiér',
    items: [
      { icon: 'bed-double', label: '8 lůžek, nové matrace' },
      { icon: 'bath', label: '2 koupelny – vana i masážní sprcha' },
      { icon: 'tv', label: 'Televize s DVD' },
      { icon: 'wifi', label: 'Wi‑Fi internet' },
      { icon: 'washing-machine', label: 'Pračka' },
      { icon: 'baby', label: 'Dětská postýlka' },
      { icon: 'flame', label: 'Krbová kamna' },
      { icon: 'cigarette-off', label: 'Nekuřácký objekt' },
    ],
  },
  {
    group: 'Venku',
    items: [
      { icon: 'tent-tree', label: 'Pergola se stolem pro 8' },
      { icon: 'flame', label: 'Venkovní krb a ohniště' },
      { icon: 'beef', label: 'Plynový gril' },
      { icon: 'shower-head', label: 'Venkovní sprcha' },
      { icon: 'goal', label: 'Fotbalové branky' },
      { icon: 'armchair', label: 'Zahradní nábytek, houpací síť' },
      { icon: 'car', label: 'Parkování pro 4 auta' },
      { icon: 'fence', label: 'Celé oploceno' },
    ],
  },
  {
    group: 'Navíc',
    items: [
      { icon: 'beer', label: 'Výčepní zařízení (300 Kč / pobyt)' },
      { icon: 'dog', label: 'Pejsci vítáni – zdarma' },
      { icon: 'sparkles', label: 'Úklid, povlečení a ručníky v ceně' },
      { icon: 'gift', label: 'Uvítací pozornost pro hosty' },
    ],
  },
];

export const PRICING = {
  minNights: 2,
  deposit: '50 % zálohy pro potvrzení rezervace',
  caution: '5 000 Kč vratná kauce při příjezdu',
  plans: [
    {
      id: 'summer',
      title: 'Letní sezóna',
      period: 'konec června – začátek září',
      price: 29400,
      unit: 'týden · sobota–sobota',
      note: 'V létě pronajímáme pouze na celé týdny.',
      accent: true,
    },
    {
      id: 'week',
      title: 'Mimo sezónu – týden',
      period: 'září – červen',
      price: 25500,
      unit: 'týden · libovolný režim',
      note: 'Dny příjezdu a odjezdu po dohodě.',
    },
    {
      id: 'weekend',
      title: 'Víkend',
      period: 'mimo sezónu',
      price: 12400,
      unit: '2 noci',
      note: 'Prodloužený víkend (3 noci, ideálně čt–ne) 15 400 Kč.',
    },
    {
      id: 'xmas',
      title: 'Vánoce',
      period: '22. 12. – 27. 12.',
      price: 29900,
      unit: 'pobyt · dle počtu hostů až 35 000 Kč',
      note: 'Cenu přizpůsobíme počtu hostů, délce pobytu a vašim přáním.',
    },
    {
      id: 'nye',
      title: 'Silvestr',
      period: '28. 12. – 2. 1.',
      price: 35500,
      unit: 'pobyt',
      note: 'Klidná oslava daleko od městského ruchu. Dárek pro hosty v ceně.',
    },
  ],
  included: [
    'poplatek obci',
    'poplatek za domácí mazlíčky',
    'energie (v zimě i vytápění)',
    'dřevo do krbů',
    'plyn na grilování',
    'závěrečný úklid',
    'povlečení a ručníky',
  ],
  terms: [
    {
      q: 'Jak probíhá rezervace a platba?',
      a: 'Pro potvrzení rezervace požadujeme zálohu 50 % z ceny. Doplatek u letní sezóny, Vánoc a Silvestra měsíc před příjezdem, u ostatních pobytů předem nebo v hotovosti při příjezdu. Při příjezdu vybíráme vratnou kauci 5 000 Kč.',
    },
    {
      q: 'Jaké jsou storno podmínky?',
      a: 'Při zrušení pobytu více než 30 dní před příjezdem je storno bez poplatku a záloha se vrací v plné výši. Při zrušení méně než 30 dní před příjezdem se záloha nevrací.',
    },
    {
      q: 'Jsou v ceně nějaké skryté poplatky?',
      a: 'Ne. Všechny uvedené ceny jsou konečné. Jsme plátci DPH a na pobyt vystavujeme fakturu – vhodné i pro firemní teambuilding.',
    },
    {
      q: 'Jaká je minimální délka pobytu?',
      a: 'Mimo sezónu 2 noci (víkend), případně prodloužený víkend na 3 noci nebo celý týden. V letní sezóně pouze celé týdny od soboty do soboty. Po dohodě lze délky a dny kombinovat.',
    },
    {
      q: 'Můžeme přijet se psem?',
      a: 'Určitě. Pejsci jsou u nás vítáni a poplatek za ně je v ceně. Zahrada i dvůr jsou celé oplocené.',
    },
  ],
};

export const VIDEOS = [
  { id: 'WV3iSx-6qlU', title: 'Chalupa Pleše – prohlídka' },
  { id: 'FD-WYk98Qy8', title: 'Zahrada a dvůr' },
  { id: '3_DvInDh5U4', title: 'Společenská místnost' },
  { id: 'QjouojOHjpI', title: 'Okolí chalupy' },
];

// Recenze: viz src/data/reviews.ts

export const POIS = [
  { name: 'Chalupa Pleše', lat: 49.19876, lng: 14.82343, type: 'home', text: 'Pleše 40 – poslední dům ve vesnici' },
  { name: 'Sámoška Pod lípami', lat: 49.1955, lng: 14.8214, type: 'shop', text: 'Obchod na návsi, 5 min pěšky, nonstop' },
  { name: 'Kardašova Řečice', lat: 49.185, lng: 14.853, type: 'town', text: 'Plzeňská pivnice, Coop, pošta, bankomat – 3 min autem' },
  { name: 'Velký řečický rybník', lat: 49.1867, lng: 14.8774, type: 'swim', text: 'Koupání – 6 min autem' },
  { name: 'Zámek Červená Lhota', lat: 49.2496, lng: 14.8818, type: 'castle', text: 'Pohádkový zámek na vodě – 10 km' },
  { name: 'Jindřichův Hradec', lat: 49.1443, lng: 15.0028, type: 'town', text: 'Zámek, aquapark, restaurace – 15 min autem' },
  { name: 'Vlkovská pískovna', lat: 49.1641, lng: 14.7141, type: 'swim', text: 'Koupání, výlet na kole' },
  { name: 'Soběslav – koupaliště', lat: 49.2638, lng: 14.7219, type: 'swim', text: '12 min autem' },
];

export const DISTANCES = [
  { label: 'Sjezd z dálnice D3', value: '6 min' },
  { label: 'Jindřichův Hradec', value: '15 min' },
  { label: 'Tábor', value: '23 min' },
  { label: 'České Budějovice', value: '30 min' },
  { label: 'Třeboň', value: '30 min' },
  { label: 'Praha', value: '1 hod' },
];

export const TRIPS = [
  { title: 'Zámek Červená Lhota', text: 'Pohádkový zámek na ostrůvku uprostřed rybníka, necelých 10 km. O 3 km dál Provaznické muzeum v Deštné.' },
  { title: 'Jindřichův Hradec', text: 'Historické město se zámkem, který patří k nejlépe hodnoceným místům v ČR. Speciální prohlídky pro děti, aquapark, indická restaurace.' },
  { title: 'Koupání a rybníky', text: 'Velký řečický rybník, koupaliště Soběslav, Veselské pískovny, rybník Vajgar. Cyklostezky napříč celým Třeboňskem.' },
  { title: 'Třeboňsko na kole', text: 'Rovinaté cesty mezi rybníky, lázeňská Třeboň, Rožmberk, Schwarzenberská hrobka. Na kolech přímo od chalupy.' },
];
