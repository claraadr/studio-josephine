import { defineConfig } from 'astro/config';

// [À COMPLÉTER : nom de domaine] — remplacer l'adresse provisoire ci-dessous.
export default defineConfig({
  site: 'https://example.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
