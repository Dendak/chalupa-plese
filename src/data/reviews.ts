// Hodnocení hostů převzatá z e-chalupy.cz (24 hodnocení, průměr 5,0).
// `featured: true` = zobrazí se v horní liště, ostatní po rozkliknutí „Zobrazit všechna“.
export interface Review {
  rating: number;
  name: string;
  date: string; // RRRR-MM-DD
  season: string;
  text: string;
  featured?: boolean;
}

export const REVIEWS: Review[] = [
  {
    rating: 5,
    name: 'Jana s rodinou',
    date: '2026-08-26',
    season: 'léto 2026',
    text: 'Nádherná vybavená chalupa, super zahrada pro všechny včetně pejsků. Milý ochotný hostitel. Nic nám nechybělo. Moc rádi se zase vrátíme a za všechno ještě jednou děkujeme 🙂',
    featured: true,
  },
  {
    rating: 5,
    name: 'Lenka s rodinou',
    date: '2026-08-11',
    season: 'léto 2026',
    text: 'Naprostá nádhera, to se nedá popsat. Dokonalá komunikace majitele, naprosto dokonalé ubytování. Vše plně vybavené, dokonce i příslušenstvím, které by nikdo nečekal. Spokojenost všech členů rodiny, i psa.',
    featured: true,
  },
  {
    rating: 4.6,
    name: 'Vít s více rodinami',
    date: '2026-08-06',
    season: 'léto 2026',
    text: 'Super ubytování, velká zahrada s pergolou, plnohodnotně vybavené. Spokojenost při odjezdu hlásil i náš pejsek.',
  },
  {
    rating: 5,
    name: 'Romana s rodinou',
    date: '2026-07-30',
    season: 'léto 2026',
    text: 'Naprostá spokojenost, od začátku perfektní komunikace s majitelem. Klidné místo pro relax, zvláště zahradní část. Ocenili jsme vstřícnost ohledně ubytování s pejskem. Celkově doporučuji.',
  },
  {
    rating: 5,
    name: 'Ludmila s rodinou',
    date: '2026-07-21',
    season: 'léto 2026',
    text: 'Krásná chalupa, prostorná zahrada, velmi milé a vstřícné jednání majitele.',
  },
  {
    rating: 4.8,
    name: 'Katka s rodinou',
    date: '2025-12-30',
    season: 'Vánoce 2025',
    text: 'Vánoce 2025, moc děkujeme. Nádherně připravené pro vánoční svátky, vyzdobené, útulné. Moc doporučuji.',
    featured: true,
  },
  {
    rating: 5,
    name: 'Petra s více rodinami',
    date: '2025-08-26',
    season: 'léto 2025',
    text: 'Vše bylo v pořádku, skvěle vybavená chalupa a perfektní komunikace s majitelem. Děkujeme.',
  },
  {
    rating: 4.9,
    name: 'Petra s více rodinami',
    date: '2025-08-06',
    season: 'léto 2025',
    text: 'Byli jsme maximálně spokojeni, chaloupka překrásná, zahrada odpočinková, nic nám nechybělo. Komunikace skvělá, nic nebyl problém, i pokažená myčka byla vyřešena do druhého dne. Starý fungující gramofon byl krásné překvapení. Jedno malinké mínus, že menší pejsek utíkal pod plotem lovit kapry do vedlejšího rybníka 😅, ale to jsme si už potom pohlídali. Pan majitel byl tak laskavý, že i poslal zapomenutou knížku. Moc děkujeme a určitě Pleše můžeme doporučit!',
  },
  {
    rating: 4.8,
    name: 'Host',
    date: '2025-05-08',
    season: 'jaro 2025',
    text: 'Ideální chalupa k prožití příjemného času s rodinou či přáteli. Krásné prostředí i chalupa. Komunikace s majitelem byla také super, nebyl problém s dětmi ani pejskem. Skvělá je určitě velká zahrada a prostor ke grilování. Všichni jsme si to moc užili a ráda místo doporučím.',
  },
  {
    rating: 5,
    name: 'Linda s více rodinami',
    date: '2025-05-03',
    season: 'jaro 2025',
    text: '',
  },
  {
    rating: 5,
    name: 'Hosté ze zahraničí',
    date: '2025-01-07',
    season: 'Silvestr 2024',
    text: 'It was a wonderful and cozy stay. We stayed over New Year with our dog, who is very scared of fireworks, and he was never so relaxed before. Everything was very clean, the house was very cozy and nice. The host was very helpful and friendly and made sure we felt at home and welcome. We had lots of fire wood. We also got fresh honey, wine and coffee as a welcoming gift! There is a cute old town nearby with amazing sweets. All in all a perfect stay!',
    featured: true,
  },
  {
    rating: 5,
    name: 'Lukáš s rodinou',
    date: '2024-10-10',
    season: 'podzim 2024',
    text: 'Tuto chalupu jsme si prostě zamilovali. Byli jsme tu už 2× a vždy jsme byli nadmíru spokojeni. Zřejmě se tím nastartovala každoroční tradice. Chalupa je plně vybavená, vždy čistá a perfektně připravená, kolem dokola oplocená, což ocenil i náš čtyřnohý člen rodiny. Kdo má rád klid a soukromí, ocení, že kolem chaty nejsou téměř žádní sousedé – je až na konci vesnice. Ideální pozice pro výlety (kolo, turistika, hrady, zámky). Komunikace s majiteli vždy perfektní a maličkost na uvítanou vždycky potěšila. Můžeme všema deseti doporučit.',
    featured: true,
  },
  {
    rating: 5,
    name: 'Zdenka v páru',
    date: '2024-09-20',
    season: 'podzim 2024',
    text: 'V této chalupě jsme byli velmi spokojeni, nic nám nechybělo ani našim pejskům, kteří byli s námi a velmi přivítali krásný oplocený pozemek. Velmi příjemné prostředí, kde se dá relaxovat, i když není zrovna ideální počasí.',
  },
  {
    rating: 5,
    name: 'Jitka s více rodinami',
    date: '2024-07-22',
    season: 'léto 2024',
    text: 'Krásná chalupa v uzavřeném dvoře na klidném místě na konci vesnice. V přízemí prostorný obývák spojený se skvěle vybavenou kuchyní, ložnice s množstvím úložného prostoru. V patře dvě velké ložnice a světlá koupelna. Příjemné je i posezení u gramofonu v podkroví. Velká zahrada s pergolou a grilem nabízí možnost míčových her, připravené jsou i fotbalové branky. Celý pozemek je oplocený, takže nemusíte mít obavy ani o děti, ani o pejsky. Majitelé jsou velmi milí, ochotní a příjemní. Všem moc doporučujeme.',
    featured: true,
  },
  {
    rating: 5,
    name: 'Host s více rodinami',
    date: '2024-07-08',
    season: 'léto 2024',
    text: 'Luxus.',
  },
  {
    rating: 5,
    name: 'Host s rodinou',
    date: '2024-07-06',
    season: 'léto 2024',
    text: 'Perfektní ubytování, dobrá komunikace s majitelem, na přivítanou bábovka. Celkový dojem je perfektní.',
  },
  {
    rating: 4.9,
    name: 'Martin s více rodinami',
    date: '2023-08-20',
    season: 'léto 2023',
    text: 'Lokalita skvěle umístěná jako základna pro výlety po celých Jižních Čechách, ideální pro cyklistiku po Třeboňsku, kousek zámek Červená Lhota, Jindřichův Hradec, Třeboň, Hluboká. Ubytování nabízí dostatečný prostor a plné vybavení pro 2 rodiny, skvělá je zahrada s venkovním posezením, grilem a sklípkem, kde byl k dispozici výčep se zásobou točeného piva. Možnost ubytování se psem, který si taky užíval velkou uzavřenou zahradu. Koupat se dá v pískovně Vlkov či v Suchdole. Určitě doporučujeme!',
  },
  {
    rating: 4.7,
    name: 'Veronika se skupinou přátel',
    date: '2023-07-30',
    season: 'léto 2023',
    text: 'Na chatě jsme byli s partou přátel a dvěma psy. Plánovali jsme výlety na kolech, takže jsme ocenili jak pípu ve společenské místnosti, tak možnost příjemného uzamčení kol. Chata i okolí vše krásné, udržované. Zahrada i dvorek jsou velké, plně oplocené. Naprosté soukromí a klid! Dvoje zastřešené venkovní posezení s grilem. Majitelé jsou velmi milí a ochotní lidé. Vřele doporučujeme!',
  },
  {
    rating: 5,
    name: 'Host s více rodinami',
    date: '2023-07-29',
    season: 'léto 2023',
    text: 'Výborné ubytování, velmi vstřícný a ochotný majitel. Velmi dobrá dostupnost ke spoustě výletů ať na kole nebo autem. Doporučujeme :)',
  },
  {
    rating: 5,
    name: 'Host s rodinou',
    date: '2023-07-27',
    season: 'léto 2023',
    text: 'Skvělá komunikace, výborné výchozí místo na výlety a koupání. Hodně úložných prostor v pokojích, velký odpočinkový prostor v patře a pro osm lidí dostatek místa na potraviny v kuchyni. Ocenili jsme také uzavřenou zahradu kvůli malému pejskovi, který se rád toulá. Moc děkujeme a určitě doporučujeme.',
  },
  {
    rating: 5,
    name: 'Host',
    date: '2023-07-13',
    season: 'léto 2023',
    text: 'Super chalupa na klidném místě. Rádi se vrátíme.',
  },
  {
    rating: 5,
    name: 'Host se skupinou přátel',
    date: '2023-04-24',
    season: 'jaro 2023',
    text: 'Krásná, útulná a výborně vybavená chalupa s úžasnými přilehlými prostory – uzavřený dvorek s posezením a pergolou na zahradě. Chalupa je prostorově řešena velmi velkoryse. V blízkosti je spousta zajímavých turistických cílů. Komunikace s majiteli perfektní, pan pronajímatel byl velmi milý, při předání nám vše ukázal a dokonce pro nás byl nachystaný malý dárek. Rozhodně doporučujeme a rádi se vrátíme, třeba i s dětmi!',
  },
  {
    rating: 5,
    name: 'Míša a spol. s více rodinami',
    date: '2023-01-01',
    season: 'Silvestr 2022',
    text: 'Na chalupě v Pleších jsme strávili naprosto úžasný Silvestr. Všem, kdo váhají, vřele doporučuji. V chalupě veškeré vybavení, čisto a naprosté soukromí. Komunikace s majiteli naprosto bezvadná, nic nebyl problém. Při příjezdu byla chalupa příjemně vytopená, k dispozici i krbová kamna. Perfektní společenská místnost s kamny – pokud se chcete bavit déle, nerušíte ostatní. Absolutně není co vytknout.',
    featured: true,
  },
  {
    rating: 5,
    name: 'Host se skupinou přátel',
    date: '2022-12-15',
    season: 'zima 2022',
    text: 'Úžasná chaloupka se skvělou dispozicí – 2 koupelny a 3 ložnice. Krbová kamna nám celý víkend dělala příjemnou atmosféru. Majitelé nám vše připravili a byli velice ochotní, komunikace milá, vstřícná a rychlá. Bylo vyhověno i našim nadstandardním požadavkům. Kuchyň perfektně vybavená vším, co je potřeba, včetně automatického kávovaru. Mohli jsme mít psa. Našli jsme chalupu, kterou jsme dlouho hledali, a už teď se těšíme na příště!',
  },
].filter((r) => r.text);
