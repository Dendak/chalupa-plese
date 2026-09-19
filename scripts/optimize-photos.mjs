// Generuje optimalizované varianty fotek (WebP + AVIF) a LQIP placeholdery.
// Vstup:  photos-src/NN-nazev.jpg   (originály – sem přidej nové fotky)
// Výstup: public/img/NN-{w}.webp|avif  +  src/data/photos.generated.json
// Spuštění: npm run photos
import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'photos-src';
const OUT = 'public/img';
const WIDTHS = [480, 960, 1280, 1600];
const AVIF_WIDTHS = [960, 1280, 1600];

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
const manifest = [];

for (const file of files) {
  const id = file.slice(0, 2);
  const input = path.join(SRC, file);
  const img = sharp(input).rotate();
  const meta = await img.metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  const widths = WIDTHS.filter((x) => x <= w);
  if (!widths.includes(w) && w < 1600) widths.push(w);

  const webp = [];
  const avif = [];
  for (const tw of widths) {
    const out = path.join(OUT, `${id}-${tw}.webp`);
    if (!(await exists(out))) await img.clone().resize(tw).webp({ quality: 80, effort: 5 }).toFile(out);
    webp.push(tw);
  }
  for (const tw of AVIF_WIDTHS.filter((x) => x <= w)) {
    const out = path.join(OUT, `${id}-${tw}.avif`);
    if (!(await exists(out))) await img.clone().resize(tw).avif({ quality: 55, effort: 4 }).toFile(out);
    avif.push(tw);
  }
  const lqipBuf = await img.clone().resize(20).webp({ quality: 40 }).toBuffer();
  manifest.push({
    id,
    file,
    width: w,
    height: h,
    webp,
    avif,
    lqip: `data:image/webp;base64,${lqipBuf.toString('base64')}`,
  });
  process.stdout.write(`✓ ${file} ${w}x${h}\n`);
}

await writeFile('src/data/photos.generated.json', JSON.stringify(manifest, null, 2));
console.log(`\nHotovo: ${manifest.length} fotek → ${OUT}/ a src/data/photos.generated.json`);

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}
