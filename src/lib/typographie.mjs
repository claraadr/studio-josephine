/**
 * Typographie française appliquée automatiquement aux textes du site.
 * Clara écrit naturellement ; le site corrige :
 * - apostrophe droite ' → apostrophe courbe ’
 * - espace avant ; : ! ? » et après « → espace insécable U+00A0
 *   (Readex Pro n'a pas l'espace fine U+202F) ; ajoutée aussi dans « » s'il n'y en a pas.
 * Un mot collé à sa ponctuation, comme le nom de marque « Ehop! », n'est pas modifié.
 */
const INSECABLE = ' ';

export function typo(texte) {
  if (typeof texte !== 'string') return texte;
  return texte
    .replace(/'/g, '’')
    .replace(/[   ]+([;:!?»])/g, `${INSECABLE}$1`)
    .replace(/«[   ]*/g, `«${INSECABLE}`)
    .replace(/([^\s ])»/g, `$1${INSECABLE}»`);
}

const BALISES_IGNOREES = /^<(code|pre|script|style|kbd|samp)\b/i;

/**
 * Applique typo() aux textes d'un fragment HTML (contenus Markdown rendus),
 * sans toucher aux balises, aux attributs ni au code.
 */
export function typoHtml(html) {
  let ignore = 0;
  return html
    .split(/(<[^>]+>)/)
    .map((morceau) => {
      if (morceau.startsWith('<')) {
        if (BALISES_IGNOREES.test(morceau)) ignore += 1;
        else if (/^<\/(code|pre|script|style|kbd|samp)\b/i.test(morceau)) ignore = Math.max(0, ignore - 1);
        return morceau;
      }
      if (ignore) return morceau;
      return typo(morceau.replace(/&#39;|&#x27;|&apos;/g, "'"));
    })
    .join('');
}
