import { defineConfig } from 'astro/config';

// Adresse publique et sous-dossier du site.
// - Sur GitHub Pages, le workflow .github/workflows/deploy.yml fournit SITE et BASE :
//   https://claraadr.github.io et /studio-josephine tant qu'aucun nom de domaine n'est branché.
//   Une fois le domaine déclaré dans GitHub Pages, BASE devient vide sans rien changer ici.
// - En local (npm run dev), le site est servi à la racine.
export default defineConfig({
  site: process.env.SITE || 'https://claraadr.github.io',
  base: process.env.BASE || '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
