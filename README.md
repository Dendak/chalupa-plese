# Chalupa Pleše – web pronájmu chalupy

Moderní jednostránkový web pro pronájem chalupy v Pleších (Jižní Čechy).
Živě: **https://dendak.github.io/chalupa-plese/**

## Stack (2026)

- **Vite 8 + React 19 + TypeScript 6**
- **Tailwind CSS v4** (design tokeny v OKLCH, světlý + tmavý režim)
- **Motion** (animace při scrollu) + nativní CSS scroll-driven animace s fallbackem
- **Leaflet / react-leaflet** (mapa s body zájmu, OpenStreetMap dlaždice)
- **date-fns** (kalendář obsazenosti)
- **sharp** (generování WebP/AVIF variant fotek + LQIP placeholdery)
- Nativní `<dialog>` lightbox s `@starting-style`, `<picture>` s AVIF/WebP, lazy YouTube shorts

## Co upravovat

| Co                           | Kde                                  |
| ---------------------------- | ------------------------------------ |
| Obsazenost (termíny)         | `src/data/bookings.ts`               |
| Ceník, texty, kontakty, POI  | `src/data/site.ts`                   |
| Kategorie a popisky fotek    | `src/data/photos.ts`                 |
| Originální fotky             | `photos-src/NN-nazev.jpg`            |
| Odesílání formuláře          | `FORM.accessKey` v `src/data/site.ts` |

### Fotky

1. Přidej/odeber JPG v `photos-src/` (název začíná dvojčíslím, např. `49-nova-fotka.jpg`).
2. Spusť `npm run photos` – vygeneruje `public/img/*.webp|avif` a `src/data/photos.generated.json`.
3. Doplň kategorii a popisek do `META` v `src/data/photos.ts`.

### Poptávkový formulář

Bez konfigurace otevře formulář e-mailový klient s předvyplněnou zprávou.
Pro odesílání přímo z webu založ zdarma účet na [web3forms.com](https://web3forms.com),
vlož Access Key do `FORM.accessKey` a poptávky chodí na e-mail, ke kterému byl klíč vydán.

### Kontakty

V `src/data/site.ts` doplň do `OWNER` skutečný telefon a e-mail (zatím zástupné hodnoty).

## Vývoj a nasazení

```bash
npm install
npm run dev        # http://localhost:5173/chalupa-plese/
npm run build      # produkční build do dist/
npm run deploy     # build + push dist/ do větve gh-pages
```

Pro vlastní doménu (např. chalupaplese.cz) změň `base` ve `vite.config.ts` na `'/'`,
přidej soubor `public/CNAME` s doménou a nastav DNS (CNAME na `dendak.github.io`).
