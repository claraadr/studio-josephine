import { getCollection, type CollectionEntry } from 'astro:content';

export type Projet = CollectionEntry<'projets'>;
export type Famille = Projet['data']['familles'][number];

export const familles: { id: Famille; nom: string }[] = [
  { id: 'branding', nom: 'Branding' },
  { id: 'webdesign', nom: 'Webdesign' },
  { id: 'print', nom: 'Print' },
];

export function nomFamille(id: Famille): string {
  return familles.find((f) => f.id === id)?.nom ?? id;
}

/** Tous les projets, dans l'ordre d'affichage choisi par Clara. */
export async function projetsTries(): Promise<Projet[]> {
  const tous = await getCollection('projets');
  return tous.sort((a, b) => a.data.ordre - b.data.ordre);
}

/** Disciplines qui ne répètent pas une famille : elles s'affichent en cartouches neutres. */
export function autresDisciplines(projet: Projet): string[] {
  const noms = new Set(projet.data.familles.map((f) => nomFamille(f).toLowerCase()));
  return projet.data.disciplines.filter((d) => !noms.has(d.toLowerCase()));
}

/** Numéro d'affichage sur deux chiffres : 01, 02… */
export const numero = (n: number) => String(n).padStart(2, '0');
