# Studio Joséphine

Site portfolio de Clara Audureau, graphiste et webdesigner indépendante (branding, webdesign, print).
Site statique construit avec [Astro](https://astro.build), CSS écrit à la main, aucune police ni script tiers.

**En ligne : https://claraadr.github.io/studio-josephine/** (adresse provisoire, en attendant le nom de domaine).

## Où en est le site

| Étape | Contenu | État |
| --- | --- | --- |
| 1. Fondations | Jetons de design, typographies, éléments signature sur `/guide-de-styles/` | À valider par Clara |
| 2. Accueil + étude de cas Atelier Berlot | | À venir |
| 3. Projets, études de cas, Services, Contact, pages légales, 404 | | À venir |
| 4. Finitions : accessibilité, performances, référencement | | À venir |
| 5. Mise en ligne | Publication automatique sur GitHub Pages à chaque fusion sur `main` | En place, nom de domaine à brancher |

Ce qui manque encore est listé dans [`A-COMPLETER.md`](A-COMPLETER.md).

## Travailler sur le site

Il faut Node.js 22.23.4 ou plus récent.

```bash
npm install          # une seule fois
npm run dev          # aperçu en direct sur http://localhost:4321
npm run build        # construit le site dans dist/
npm run check:a11y   # contrôle d'accessibilité (axe) sur le site construit
```

Le contrôle d'accessibilité utilise Playwright. Si Chromium n'est pas installé : `npx playwright install chromium`,
ou indiquez un Chromium existant avec la variable `CHROMIUM_PATH`.

## Mise en ligne (GitHub Pages)

- Chaque fusion sur `main` reconstruit et republie le site automatiquement, en une à deux minutes
  ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).
- Suivre une publication : onglet **Actions** du dépôt, « Mettre en ligne sur GitHub Pages ».
- Republier sans rien changer : onglet **Actions** → « Mettre en ligne sur GitHub Pages » → **Run workflow**.
- Réglage GitHub, une seule fois : **Settings → Pages → Build and deployment → Source : GitHub Actions**.

Tant qu'aucun nom de domaine n'est branché, le site vit dans le sous-dossier `/studio-josephine/`.
Dans le code, tout lien ou fichier interne passe donc par `url()` (`src/lib/url.ts`) :
`href={url('/projets/')}`, jamais `href="/projets/"`. Pour vérifier comme en ligne :

```bash
BASE=/studio-josephine npm run build && BASE=/studio-josephine npm run check:a11y
```

Brancher un nom de domaine : le déclarer dans **Settings → Pages → Custom domain**, puis créer chez le
registraire les enregistrements DNS que GitHub indique. Rien à changer dans le code : le sous-dossier
disparaît de lui-même à la publication suivante.

## Organisation

```
src/styles/tokens.css      couleurs, polices, échelle typographique, espacements (seul fichier à modifier pour le style)
src/styles/global.css      styles de base et éléments signature (cartouches, bandeau, textures, boutons, champs)
src/components/            Logo, Cartouche, Bandeau, Estampille
src/layouts/Base.astro     squelette commun des pages
src/lib/url.ts             préfixe les liens internes avec le sous-dossier du site
src/pages/                 une page = un fichier
public/fonts/              Readex Pro et Poppins en WOFF2, avec leurs licences OFL
ressources-clara/          fichiers fournis par Clara (logo, typos, visuels)
```

## Typographies

Readex Pro (titres) et Poppins (texte courant) sont sous licence libre SIL Open Font License et hébergées dans
`public/fonts/`. Readex Pro est réduite aux caractères latins (l'original contient l'alphabet arabe) et son axe
d'élargissement HEXP est fixé à 0. Poppins : graisses 400, 500 et 600.

Ces polices ne contiennent ni flèches (→) ni symboles (✕, ✶) : les dessiner en SVG plutôt que de les taper,
sinon le navigateur les affiche dans une autre police.

## Ajouter un projet

Arrive à l'étape 2, avec la page Projets : un fichier Markdown et un dossier d'images par projet, sans toucher
au code. Les cinq étapes seront expliquées ici.
