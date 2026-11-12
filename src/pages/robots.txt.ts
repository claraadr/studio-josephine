import type { APIRoute } from 'astro';
import { indexation } from '../config';
import { url } from '../lib/url';

/** Moteurs de recherche : fermés tant que la variable INDEXATION n'est pas à true (voir src/config.ts). */
export const GET: APIRoute = ({ site }) => {
  const texte = indexation
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL(url('/sitemap.xml'), site).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(texte, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
