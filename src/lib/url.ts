// Préfixe un chemin interne avec le sous-dossier du site (base d'Astro).
// Sur GitHub Pages sans nom de domaine, le site vit dans /studio-josephine/ :
// tout lien ou fichier interne écrit « /… » doit passer par url().
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function url(chemin: string): string {
  return `${base}${chemin.startsWith('/') ? chemin : `/${chemin}`}`;
}
