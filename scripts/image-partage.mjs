// Fabrique public/partage.png (1200 × 630), l'image affichée quand on partage un lien du site.
// Elle reprend le logo, la phrase et les couleurs de la maquette. À relancer si le logo ou la phrase changent :
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
    const contenu = await readFile(join(DIST, chemin));
    res.writeHead(200, { 'Content-Type': TYPES[extname(chemin)] ?? 'application/octet-stream' });
    res.end(contenu);
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
  const logo = document.querySelector('.entete .logo svg').cloneNode(true);
  document.body.innerHTML = `
    <div class="og">
      <div class="og__texte">
        <div class="og__logo"></div>
        <p class="og__metier">Graphiste &amp; webdesigner freelance à Angers</p>
        <p class="og__phrase">Je conçois des expériences graphiques où esthétique, simplicité et fonctionnalité se rencontrent.</p>
        <p class="og__familles">
          <span class="cartouche cartouche--branding">Branding</span>
          <span class="cartouche cartouche--webdesign">Webdesign</span>
          <span class="cartouche cartouche--print">Print</span>
        </p>
      </div>
      <div class="og__pile" aria-hidden="true"><span></span><span></span><span></span></div>
    </div>`;
  document.querySelector('.og__logo').append(logo);
  const style = document.createElement('style');
  style.textContent = `
    body { margin: 0; background: var(--c-lin); }
    .og { box-sizing: border-box; width: 1200px; height: 630px; display: grid; grid-template-columns: 1fr 360px;
      background: var(--c-lin); color: var(--c-bordeaux); overflow: hidden; }
    .og__texte { display: grid; align-content: center; gap: 22px; padding: 0 56px 0 80px; }
    .og__logo svg { display: block; width: 330px; height: auto; }
    .og__metier { margin: 6px 0 0; font: 500 18px/1.2 var(--font-texte); text-transform: uppercase; letter-spacing: 0.04em; }
    .og__phrase { margin: 0; font: 700 40px/1.2 var(--font-titres); max-width: 660px; }
    .og__familles { display: flex; gap: 12px; margin: 8px 0 0; }
    .og__familles .cartouche { font-size: 16px; padding: 6px 18px; }
    .og__pile { position: relative; background: var(--c-bordeaux); }
    .og__pile span { position: absolute; left: 44px; right: -40px; height: 300px; border-radius: 22px; background: var(--c-lin);
      box-shadow: 0 -12px 32px -16px rgb(30 4 12 / 0.55); }
    .og__pile span:nth-child(1) { top: 96px; transform: rotate(-1.1deg); }
    .og__pile span:nth-child(2) { top: 120px; transform: rotate(1deg); }
    .og__pile span:nth-child(3) { top: 144px; transform: rotate(-0.45deg); }`;
  document.head.append(style);
  await document.fonts.ready;
});
await page.screenshot({ path: SORTIE, type: 'png' });
await navigateur.close();
serveur.close();
console.log(`Image de partage écrite : ${SORTIE}`);
