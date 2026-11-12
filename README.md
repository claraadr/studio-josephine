# Studio Joséphine

Site portfolio de Clara Audureau, graphiste et webdesigner indépendante (branding, webdesign, print).
Site statique construit avec [Astro](https://astro.build), CSS écrit à la main, aucune police ni script tiers.

## Où en est le site

| Étape | Contenu | État |
| --- | --- | --- |
| 1. Fondations | Jetons de design, typographies, éléments signature sur `/guide-de-styles/` | À valider par Clara |
| 2. Accueil + étude de cas Atelier Berlot | | À venir |
| 3. Projets, études de cas, Services, Contact, pages légales, 404 | | À venir |
| 4. Finitions : accessibilité, performances, référencement | | À venir |
| 5. Mise en ligne sur GitHub Pages | | À venir |

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

## Organisation

```
src/styles/tokens.css      couleurs, polices, échelle typographique, espacements (seul fichier à modifier pour le style)
src/styles/global.css      styles de base et éléments signature (cartouches, bandeau, textures, boutons, champs)
src/components/            Logo, Cartouche, Bandeau, Estampille
src/layouts/Base.astro     squelette commun des pages
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
