// Contrôle d'accessibilité automatique (axe-core, WCAG 2.2 A et AA) sur le site construit.
// Usage : npm run build && npm run check:a11y
// Variables facultatives :
//   CHROMIUM_PATH : chemin d'un Chromium déjà installé ;
//   BASE : sous-dossier utilisé à la construction (ex. /studio-josephine), comme sur GitHub Pages.
// Signale aussi tout fichier introuvable (404) : un lien ou une police qui oublie le sous-dossier.
import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const DIST = new URL('../dist/', import.meta.url).pathname;
const BASE = (process.env.BASE || '').replace(/\/+$/, '');
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=utf-8',
};

async function pages(dossier, base = '/') {
  const resultat = [];
  for (const nom of await readdir(dossier)) {
    const chemin = join(dossier, nom);
    if ((await stat(chemin)).isDirectory()) resultat.push(...(await pages(chemin, `${base}${nom}/`)));
    else if (nom === 'index.html') resultat.push(base);
  }
  return resultat;
}

const serveur = createServer(async (req, res) => {
  let chemin = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (BASE) {
    if (!chemin.startsWith(`${BASE}/`)) {
      res.writeHead(404);
      return res.end();
    }
    chemin = chemin.slice(BASE.length);
  }
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
const origine = `http://localhost:${serveur.address().port}`;

const navigateur = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const largeurs = [360, 1280];
let total = 0;

for (const url of await pages(DIST)) {
  for (const largeur of largeurs) {
    const page = await navigateur.newPage({ viewport: { width: largeur, height: 900 } });
    const introuvables = [];
    page.on('response', (r) => {
      if (r.status() >= 400) introuvables.push(`${r.status()} ${r.url().replace(origine, '')}`);
    });
    await page.goto(origine + BASE + url, { waitUntil: 'networkidle' });
    await page.addScriptTag({ content: axeSource });
    const { violations } = await page.evaluate(() =>
      // eslint-disable-next-line no-undef
      axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] }),
    );
    for (const v of violations) {
      total += v.nodes.length;
      console.log(`✗ ${url} @${largeur}px  [${v.impact}] ${v.id} — ${v.help}`);
      for (const n of v.nodes.slice(0, 5)) console.log(`    ${n.target.join(' ')}`);
    }
    for (const f of introuvables) {
      total += 1;
      console.log(`✗ ${url} @${largeur}px  fichier introuvable : ${f}`);
    }
    if (!violations.length && !introuvables.length) console.log(`✓ ${url} @${largeur}px`);
    await page.close();
  }
}

await navigateur.close();
serveur.close();
if (total) {
  console.log(`\n${total} problème(s) à corriger.`);
  process.exit(1);
}
console.log('\nAucun problème détecté par axe.');
