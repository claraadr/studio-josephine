import type { APIRoute } from 'astro';
import { projetsTries } from '../lib/projets';
import { url } from '../lib/url';

/** Plan du site pour les moteurs de recherche (sans le guide de styles ni la page de confirmation). */
export const GET: APIRoute = async ({ site }) => {
  const projets = await projetsTries();
  const chemins = [
    '/',
    '/projets/',
    ...projets.map((p) => `/projets/${p.id}/`),
    '/services/',
    '/contact/',
    '/mentions-legales/',
    '/confidentialite/',
  ];
  const urls = chemins.map((c) => `  <url><loc>${new URL(url(c), site).href}</loc></url>`).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
