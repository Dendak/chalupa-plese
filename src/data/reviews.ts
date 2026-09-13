// Hodnocení hostů převzatá z e-chalupy.cz (24 hodnocení, průměr 5,0).
// `featured: true` = zobrazí se v horní liště (a má překlad en/de), ostatní po rozkliknutí.
export type SeasonKind = 'summer' | 'winter' | 'spring' | 'autumn' | 'xmas' | 'nye';

export interface Review {
  rating: number;
  name: string;
  date: string; // RRRR-MM-DD
  season: { kind: SeasonKind; year: number };
  text: string;
  en?: string;
  de?: string;
  featured?: boolean;
}

export const REVIEWS: Review[] = [
  {
    rating: 5,
    name: 'Jana s rodinou',
    date: '2026-08-26',
    season: { kind: 'summer', year: 2026 },
    text: 'Nádherná vybavená chalupa, super zahrada pro všechny včetně pejsků. Milý ochotný hostitel. Nic nám nechybělo. Moc rádi se zase vrátíme a za všechno ještě jednou děkujeme 🙂',
    en: 'A beautifully equipped cottage and a great garden for everyone, dogs included. A kind, helpful host. We lacked nothing. We will happily come back – thank you once again for everything 🙂',
    de: 'Wunderschön ausgestattetes Haus, toller Garten für alle, Hunde eingeschlossen. Ein netter, hilfsbereiter Gastgeber. Es hat uns an nichts gefehlt. Wir kommen sehr gern wieder und danken noch einmal für alles 🙂',
    featured: true,
  },
  {
    rating: 5,
    name: 'Lenka s rodinou',
    date: '2026-08-11',
    season: { kind: 'summer', year: 2026 },
    text: 'Naprostá nádhera, to se nedá popsat. Dokonalá komunikace majitele, naprosto dokonalé ubytování. Vše plně vybavené, dokonce i příslušenstvím, které by nikdo nečekal. Spokojenost všech členů rodiny, i psa.',
    en: 'Absolutely gorgeous, hard to put into words. Perfect communication with the owner, perfect accommodation. Fully equipped, even with things nobody would expect. The whole family was happy – the dog too.',
    de: 'Einfach wunderschön, das lässt sich kaum beschreiben. Perfekte Kommunikation mit dem Vermieter, perfekte Unterkunft. Alles voll ausgestattet, sogar mit Dingen, die niemand erwarten würde. Die ganze Familie war zufrieden, der Hund auch.',
    featured: true,
  },
  {
    rating: 4.6,
    name: 'Vít s více rodinami',
    date: '2026-08-06',
    season: { kind: 'summer', year: 2026 },
    text: 'Super ubytování, velká zahrada s pergolou, plnohodnotně vybavené. Spokojenost při odjezdu hlásil i náš pejsek.',
  },
  {
    rating: 5,
    name: 'Romana s rodinou',
    date: '2026-07-30',
    season: { kind: 'summer', year: 2026 },
    text: 'Naprostá spokojenost, od začátku perfektní komunikace s majitelem. Klidné místo pro relax, zvláště zahradní část. Ocenili jsme vstřícnost ohledně ubytování s pejskem. Celkově doporučuji.',
  },
  {
    rating: 5,
    name: 'Ludmila s rodinou',
    date: '2026-07-21',
    season: { kind: 'summer', year: 2026 },
    text: 'Krásná chalupa, prostorná zahrada, velmi milé a vstřícné jednání majitele.',
  },
  {
    rating: 4.8,
    name: 'Katka s rodinou',
    date: '2025-12-30',
    season: { kind: 'xmas', year: 2025 },
    text: 'Vánoce 2025, moc děkujeme. Nádherně připravené pro vánoční svátky, vyzdobené, útulné. Moc doporučuji.',
    en: 'Christmas 2025 – thank you so much. Beautifully prepared for the holidays, decorated and cosy. Highly recommended.',
    de: 'Weihnachten 2025, vielen Dank. Wunderschön für die Feiertage vorbereitet, geschmückt und gemütlich. Sehr zu empfehlen.',
    featured: true,
  },
  {
    rating: 5,
    name: 'Petra s více rodinami',
    date: '2025-08-26',
    season: { kind: 'summer', year: 2025 },
    text: 'Vše bylo v pořádku, skvěle vybavená chalupa a perfektní komunikace s majitelem. Děkujeme.',
  },
  {
    rating: 4.9,
    name: 'Petra s více rodinami',
    date: '2025-08-06',
    season: { kind: 'summer', year: 2025 },
    text: 'Byli jsme maximálně spokojeni, chaloupka překrásná, zahrada odpočinková, nic nám nechybělo. Komunikace skvělá, nic nebyl problém, i pokažená myčka byla vyřešena do druhého dne. Starý fungující gramofon byl krásné překvapení. Jedno malinké mínus, že menší pejsek utíkal pod plotem lovit kapry do vedlejšího rybníka 😅, ale to jsme si už potom pohlídali. Pan majitel byl tak laskavý, že i poslal zapomenutou knížku. Moc děkujeme a určitě Pleše můžeme doporučit!',
  },
  {
    rating: 4.8,
    name: 'Host',
    date: '2025-05-08',
    season: { kind: 'spring', year: 2025 },
    text: 'Ideální chalupa k prožití příjemného času s rodinou či přáteli. Krásné prostředí i chalupa. Komunikace s majitelem byla také super, nebyl problém s dětmi ani pejskem. Skvělá je určitě velká zahrada a prostor ke grilování. Všichni jsme si to moc užili a ráda místo doporučím.',
  },
  {
    rating: 5,
    name: 'Guests from abroad',
    date: '2025-01-07',
    season: { kind: 'nye', year: 2024 },
    text: 'It was a wonderful and cozy stay. We stayed over New Year with our dog, who is very scared of fireworks, and he was never so relaxed before. Everything was very clean, the house was very cozy and nice. The host was very helpful and friendly and made sure we felt at home and welcome. We had lots of fire wood. We also got fresh honey, wine and coffee as a welcoming gift! There is a cute old town nearby with amazing sweets. All in all a perfect stay!',
    en: 'It was a wonderful and cozy stay. We stayed over New Year with our dog, who is very scared of fireworks, and he was never so relaxed before. Everything was very clean, the house was very cozy and nice. The host was very helpful and friendly and made sure we felt at home and welcome. We had lots of fire wood. We also got fresh honey, wine and coffee as a welcoming gift! There is a cute old town nearby with amazing sweets. All in all a perfect stay!',
    de: 'Ein wunderbarer, gemütlicher Aufenthalt. Wir waren über Silvester mit unserem Hund da, der große Angst vor Feuerwerk hat – so entspannt war er noch nie. Alles war sehr sauber, das Haus sehr gemütlich und schön. Der Gastgeber war sehr hilfsbereit und freundlich und hat dafür gesorgt, dass wir uns wie zu Hause fühlen. Wir hatten reichlich Brennholz und bekamen frischen Honig, Wein und Kaffee als Willkommensgeschenk! In der Nähe gibt es eine hübsche Altstadt mit tollen Süßigkeiten. Insgesamt ein perfekter Aufenthalt!',
    featured: true,
  },
  {
    rating: 5,
    name: 'Lukáš s rodinou',
    date: '2024-10-10',
    season: { kind: 'autumn', year: 2024 },
    text: 'Tuto chalupu jsme si prostě zamilovali. Byli jsme tu už 2× a vždy jsme byli nadmíru spokojeni. Zřejmě se tím nastartovala každoroční tradice. Chalupa je plně vybavená, vždy čistá a perfektně připravená, kolem dokola oplocená, což ocenil i náš čtyřnohý člen rodiny. Kdo má rád klid a soukromí, ocení, že kolem chaty nejsou téměř žádní sousedé – je až na konci vesnice. Ideální pozice pro výlety (kolo, turistika, hrady, zámky). Komunikace s majiteli vždy perfektní a maličkost na uvítanou vždycky potěšila. Můžeme všema deseti doporučit.',
    en: 'We simply fell in love with this cottage. We have been here twice and were extremely happy both times – it looks like the start of a yearly tradition. The house is fully equipped, always clean and perfectly prepared, fenced all around, which our four-legged family member appreciated too. If you like peace and privacy you will love that there are almost no neighbours – it is the last house in the village. A perfect base for trips (cycling, hiking, castles). Communication with the owners is always perfect and the little welcome gift is a lovely touch. We can recommend it wholeheartedly.',
    de: 'Wir haben uns in dieses Haus einfach verliebt. Wir waren schon zweimal hier und jedes Mal äußerst zufrieden – daraus wird wohl eine jährliche Tradition. Das Haus ist voll ausgestattet, immer sauber und perfekt vorbereitet, rundum eingezäunt, was auch unser vierbeiniges Familienmitglied schätzte. Wer Ruhe und Privatsphäre mag, freut sich, dass es fast keine Nachbarn gibt – es ist das letzte Haus im Dorf. Ideale Lage für Ausflüge (Rad, Wandern, Burgen, Schlösser). Die Kommunikation mit den Vermietern ist immer perfekt, und die kleine Aufmerksamkeit zur Begrüßung freut jedes Mal. Uneingeschränkt zu empfehlen.',
    featured: true,
  },
  {
    rating: 5,
    name: 'Zdenka v páru',
    date: '2024-09-20',
    season: { kind: 'autumn', year: 2024 },
    text: 'V této chalupě jsme byli velmi spokojeni, nic nám nechybělo ani našim pejskům, kteří byli s námi a velmi přivítali krásný oplocený pozemek. Velmi příjemné prostředí, kde se dá relaxovat, i když není zrovna ideální počasí.',
  },
  {
    rating: 5,
    name: 'Jitka s více rodinami',
    date: '2024-07-22',
    season: { kind: 'summer', year: 2024 },
    text: 'Krásná chalupa v uzavřeném dvoře na klidném místě na konci vesnice. V přízemí prostorný obývák spojený se skvěle vybavenou kuchyní, ložnice s množstvím úložného prostoru. V patře dvě velké ložnice a světlá koupelna. Příjemné je i posezení u gramofonu v podkroví. Velká zahrada s pergolou a grilem nabízí možnost míčových her, připravené jsou i fotbalové branky. Celý pozemek je oplocený, takže nemusíte mít obavy ani o děti, ani o pejsky. Majitelé jsou velmi milí, ochotní a příjemní. Všem moc doporučujeme.',
    en: 'A lovely cottage in an enclosed courtyard in a quiet spot at the end of the village. Downstairs a spacious living room joined to a superbly equipped kitchen and a bedroom with lots of storage. Upstairs two large bedrooms and a bright bathroom, plus a nice seating corner with a record player in the loft. The big garden with a pergola and barbecue is great for ball games – football goals are ready too. The whole plot is fenced, so no worries about kids or dogs. The owners are very kind, helpful and pleasant. Highly recommended to everyone.',
    de: 'Ein schönes Haus in einem geschlossenen Hof, ruhig gelegen am Ende des Dorfes. Im Erdgeschoss ein geräumiges Wohnzimmer mit hervorragend ausgestatteter Küche und ein Schlafzimmer mit viel Stauraum. Oben zwei große Schlafzimmer und ein helles Bad, dazu eine gemütliche Sitzecke mit Plattenspieler im Dachgeschoss. Der große Garten mit Pergola und Grill lädt zu Ballspielen ein, Fußballtore stehen bereit. Das ganze Grundstück ist eingezäunt, man muss sich weder um Kinder noch um Hunde sorgen. Die Vermieter sind sehr nett, hilfsbereit und angenehm. Wir empfehlen es allen sehr.',
    featured: true,
  },
  {
    rating: 5,
    name: 'Host s více rodinami',
    date: '2024-07-08',
    season: { kind: 'summer', year: 2024 },
    text: 'Luxus.',
  },
  {
    rating: 5,
    name: 'Host s rodinou',
    date: '2024-07-06',
    season: { kind: 'summer', year: 2024 },
    text: 'Perfektní ubytování, dobrá komunikace s majitelem, na přivítanou bábovka. Celkový dojem je perfektní.',
  },
  {
    rating: 4.9,
    name: 'Martin s více rodinami',
    date: '2023-08-20',
    season: { kind: 'summer', year: 2023 },
    text: 'Lokalita skvěle umístěná jako základna pro výlety po celých Jižních Čechách, ideální pro cyklistiku po Třeboňsku, kousek zámek Červená Lhota, Jindřichův Hradec, Třeboň, Hluboká. Ubytování nabízí dostatečný prostor a plné vybavení pro 2 rodiny, skvělá je zahrada s venkovním posezením, grilem a sklípkem, kde byl k dispozici výčep se zásobou točeného piva. Možnost ubytování se psem, který si taky užíval velkou uzavřenou zahradu. Koupat se dá v pískovně Vlkov či v Suchdole. Určitě doporučujeme!',
  },
  {
    rating: 4.7,
    name: 'Veronika se skupinou přátel',
    date: '2023-07-30',
    season: { kind: 'summer', year: 2023 },
    text: 'Na chatě jsme byli s partou přátel a dvěma psy. Plánovali jsme výlety na kolech, takže jsme ocenili jak pípu ve společenské místnosti, tak možnost příjemného uzamčení kol. Chata i okolí vše krásné, udržované. Zahrada i dvorek jsou velké, plně oplocené. Naprosté soukromí a klid! Dvoje zastřešené venkovní posezení s grilem. Majitelé jsou velmi milí a ochotní lidé. Vřele doporučujeme!',
  },
  {
    rating: 5,
    name: 'Host s více rodinami',
    date: '2023-07-29',
    season: { kind: 'summer', year: 2023 },
    text: 'Výborné ubytování, velmi vstřícný a ochotný majitel. Velmi dobrá dostupnost ke spoustě výletů ať na kole nebo autem. Doporučujeme :)',
  },
  {
    rating: 5,
    name: 'Host s rodinou',
    date: '2023-07-27',
    season: { kind: 'summer', year: 2023 },
    text: 'Skvělá komunikace, výborné výchozí místo na výlety a koupání. Hodně úložných prostor v pokojích, velký odpočinkový prostor v patře a pro osm lidí dostatek místa na potraviny v kuchyni. Ocenili jsme také uzavřenou zahradu kvůli malému pejskovi, který se rád toulá. Moc děkujeme a určitě doporučujeme.',
  },
  {
    rating: 5,
    name: 'Host',
    date: '2023-07-13',
    season: { kind: 'summer', year: 2023 },
    text: 'Super chalupa na klidném místě. Rádi se vrátíme.',
  },
  {
    rating: 5,
    name: 'Host se skupinou přátel',
    date: '2023-04-24',
    season: { kind: 'spring', year: 2023 },
    text: 'Krásná, útulná a výborně vybavená chalupa s úžasnými přilehlými prostory – uzavřený dvorek s posezením a pergolou na zahradě. Chalupa je prostorově řešena velmi velkoryse. V blízkosti je spousta zajímavých turistických cílů. Komunikace s majiteli perfektní, pan pronajímatel byl velmi milý, při předání nám vše ukázal a dokonce pro nás byl nachystaný malý dárek. Rozhodně doporučujeme a rádi se vrátíme, třeba i s dětmi!',
  },
  {
    rating: 5,
    name: 'Míša a spol. s více rodinami',
    date: '2023-01-01',
    season: { kind: 'nye', year: 2022 },
    text: 'Na chalupě v Pleších jsme strávili naprosto úžasný Silvestr. Všem, kdo váhají, vřele doporučuji. V chalupě veškeré vybavení, čisto a naprosté soukromí. Komunikace s majiteli naprosto bezvadná, nic nebyl problém. Při příjezdu byla chalupa příjemně vytopená, k dispozici i krbová kamna. Perfektní společenská místnost s kamny – pokud se chcete bavit déle, nerušíte ostatní. Absolutně není co vytknout.',
    en: 'We spent an absolutely amazing New Year’s Eve at the cottage in Pleše. To anyone hesitating: I warmly recommend it. Everything you need, spotless, and complete privacy. Communication with the owners was flawless, nothing was a problem. On arrival the house was nicely heated and there is a wood stove too. The lounge with its stove is perfect – if you want to party longer you do not disturb anyone. Absolutely nothing to fault.',
    de: 'Wir haben im Haus in Pleše ein absolut großartiges Silvester verbracht. Allen, die zögern: wärmstens empfohlen. Im Haus gibt es alles, es ist sauber und man hat völlige Privatsphäre. Die Kommunikation mit den Vermietern war tadellos, nichts war ein Problem. Bei der Ankunft war das Haus angenehm geheizt, ein Kaminofen ist ebenfalls da. Der Aufenthaltsraum mit Ofen ist perfekt – wer länger feiern will, stört niemanden. Absolut nichts auszusetzen.',
    featured: true,
  },
  {
    rating: 5,
    name: 'Host se skupinou přátel',
    date: '2022-12-15',
    season: { kind: 'winter', year: 2022 },
    text: 'Úžasná chaloupka se skvělou dispozicí – 2 koupelny a 3 ložnice. Krbová kamna nám celý víkend dělala příjemnou atmosféru. Majitelé nám vše připravili a byli velice ochotní, komunikace milá, vstřícná a rychlá. Bylo vyhověno i našim nadstandardním požadavkům. Kuchyň perfektně vybavená vším, co je potřeba, včetně automatického kávovaru. Mohli jsme mít psa. Našli jsme chalupu, kterou jsme dlouho hledali, a už teď se těšíme na příště!',
  },
];
