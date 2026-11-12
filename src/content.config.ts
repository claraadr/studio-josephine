/**
 * Collection des projets : un dossier par projet dans src/content/projets/,
 * avec un fichier index.md (textes + fiche) et ses images à côté.
 * Mode d'emploi pour ajouter un projet : README.md, « Ajouter un projet ».
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projets = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/projets',
    // L'adresse du projet est le nom de son dossier : /projets/atelier-berlot/
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) => {
    // Une image et son texte alternatif. Sans image, le site affiche un aplat neutre légendé.
    const visuel = z
      .object({
        image: image().nullish(),
        alt: z.string().nullish(),
        legende: z.string().nullish(),
      })
      .refine((v) => !v.image || (v.alt ?? '').trim().length > 0, {
        message: 'Chaque image doit avoir un texte alternatif (alt) qui décrit ce qu’elle montre.',
      });

    // Un groupe d'images : pleine largeur, paire, triptyque ou détail.
    const bloc = z.object({
      format: z.enum(['pleine', 'paire', 'triptyque', 'detail']),
      images: z.array(visuel).min(1),
    });

    return z.object({
      titre: z.string(),
      sousTitre: z.string(),
      resume: z.string(), // résumé d'une ligne
      client: z.string(),
      secteur: z.string(),
      annee: z.number().int().nullish(), // affichée seulement si elle est connue
      role: z.string(), // rôle de Clara
      familles: z.array(z.enum(['branding', 'webdesign', 'print'])).min(1),
      disciplines: z.array(z.string()).default([]),
      couverture: visuel.nullish(),
      ordre: z.number(),
      accueil: z.boolean().default(false), // mis en avant sur l'accueil
      credits: z.array(z.string()).nullish(),
      mention: z.string().nullish(), // à signaler en tête de page (ex. projet de fin d'études)
      conclusion: z.string(), // la phrase qui ferme la page
      images: z
        .object({
          ouverture: visuel.nullish(), // sinon : la couverture
          processus: z.array(bloc).nullish(),
          resultat: z.array(bloc).nullish(),
        })
        .nullish(),
    });
  },
});

export const collections = { projets };
