// Fabrique public/partage.png (1200 × 630), l'image affichée quand on partage un lien du site.
// Elle reprend les éléments du premier écran. À relancer quand le logo de Clara sera intégré :
//   npm run build && npm run image:partage
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';

const DIST = new URL('../dist/', import.meta.url).pathname;
const SORTIE = new URL('../public/partage.png', import.meta.url).pathname;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };

const serveur = createServer(async (req, res) => {
  let chemin = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (chemin.endsWith('/')) chemin += 'index.html';
  try {
    res.writeHead(200, { 'Content-Type': TYPES[extname(chemin)] ?? 'application/octet-stream' });
    res.end(await readFile(join(DIST, chemin)));
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((ok) => serveur.listen(0, ok));

const navigateur = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await navigateur.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(`http://localhost:${serveur.address().port}/`, { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  const visuel = document.querySelector('.hero__visuel').cloneNode(true);
  document.body.innerHTML = `
    <div class="og">
      <div class="og__texte">
        <p class="surtitre">Clara Audureau · graphiste et webdesigner indépendante</p>
        <p class="og__nom">Studio Joséphine</p>
        <p class="og__disciplines">
          <span><span class="pastille pastille--branding"></span>Branding</span>
          <span><span class="pastille pastille--webdesign"></span>Webdesign</span>
          <span><span class="pastille pastille--print"></span>Print</span>
        </p>
      </div>
    </div>`;
  document.querySelector('.og').append(visuel);
  const style = document.createElement('style');
  style.textContent = `
    body { margin: 0; }
    .og { box-sizing: border-box; width: 1200px; height: 630px; padding: 72px 64px 64px 80px;
      display: grid; grid-template-columns: 1fr 330px; gap: 48px; align-items: center; background: var(--c-lin); }
    .og__texte { display: grid; gap: 28px; }
    .og__nom { margin: 0; font-family: var(--font-titres); font-weight: 220; font-size: 104px; line-height: 0.98; letter-spacing: -0.035em; }
    .og__disciplines { display: flex; gap: 40px; margin: 0; padding-top: 22px; border-top: 1px solid var(--c-filet);
      font-family: var(--font-titres); font-weight: 300; font-size: 34px; }
    .og__disciplines > span { display: inline-flex; align-items: center; gap: 14px; }
    .og .hero__visuel { grid-column: 2 !important; grid-row: 1 !important; align-self: center !important; width: 330px; padding: 0; position: relative; }
    .og .hero__estampille { position: absolute; top: -6%; right: -8%; width: 52%; }`;
  document.head.append(style);
  await document.fonts.ready;
});
await page.screenshot({ path: SORTIE, type: 'png' });
await navigateur.close();
serveur.close();
console.log(`Image de partage écrite : ${SORTIE}`);
