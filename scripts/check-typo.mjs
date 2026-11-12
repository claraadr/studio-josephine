// Contrôle de la typographie française dans le site construit (dist/).
// Signale, dans le texte visible : une espace ordinaire avant ; : ! ? » ou après «,
// et une apostrophe droite (') au lieu de l'apostrophe courbe (’).
// Usage : npm run build && npm run check:typo
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

async function pagesHtml(dossier) {
  const liste = [];
  for (const nom of await readdir(dossier)) {
    const chemin = join(dossier, nom);
    if ((await stat(chemin)).isDirectory()) liste.push(...(await pagesHtml(chemin)));
    else if (nom.endsWith('.html')) liste.push(chemin);
  }
  return liste;
}

const REGLES = [
  [/[ \t][;:!?»]/, 'espace ordinaire avant une ponctuation double (à remplacer par une espace insécable)'],
  [/«[ \t]/, 'espace ordinaire après « (à remplacer par une espace insécable)'],
  [/«[^ \s]/, 'espace insécable manquante après «'],
  [/[^ \s]»/, 'espace insécable manquante avant »'],
  [/'/, 'apostrophe droite (à remplacer par ’)'],
];

let total = 0;
for (const fichier of await pagesHtml(DIST)) {
  const html = await readFile(fichier, 'utf8');
  const texte = html
    .replace(/<(script|style|code|pre|svg)\b[\s\S]*?<\/\1>/gi, '\n')
    .replace(/<!--[\s\S]*?-->/g, '\n')
    .replace(/<[^>]+>/g, '\u0000') // une balise ne coupe pas le texte, mais on la repère
    .replace(/&nbsp;|&#160;|&#xa0;/gi, ' ')
    .replace(/&#39;|&#x27;|&apos;/gi, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');
  for (const morceau of texte.split('\n')) {
    const ligne = morceau.replace(/\u0000/g, '');
    for (const [regle, explication] of REGLES) {
      const m = ligne.match(regle);
      if (m) {
        total += 1;
        const debut = Math.max(0, m.index - 30);
        console.log(`✗ ${relative(DIST, fichier)} : ${explication}\n    « …${ligne.slice(debut, m.index + 30).trim()}… »`);
      }
    }
  }
}

if (total) {
  console.log(`\n${total} problème(s) de typographie.`);
  process.exit(1);
}
console.log('Typographie française : aucun problème détecté.');
