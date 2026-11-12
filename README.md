# Studio Joséphine

Site portfolio de Clara Audureau, graphiste et webdesigner indépendante (branding, webdesign, print).
Site statique construit avec [Astro](https://astro.build), CSS écrit à la main, aucune police ni script tiers,
aucun traceur.

**En ligne : https://claraadr.github.io/studio-josephine/** (adresse provisoire, en attendant le nom de domaine).

Ce qui manque encore est listé dans [`A-COMPLETER.md`](A-COMPLETER.md) et signalé en rose
« [À COMPLÉTER : …] » sur les pages.

## Les pages

| Page | Adresse | Fichier |
| --- | --- | --- |
| Accueil | `/` | `src/pages/index.astro` |
| Projets, filtrables par famille | `/projets/` | `src/pages/projets/index.astro` |
| Étude de cas (une par projet) | `/projets/nom-du-projet/` | `src/content/projets/nom-du-projet/index.md` |
| Services | `/services/` | `src/pages/services/index.astro` |
| Contact, puis confirmation | `/contact/`, `/contact/merci/` | `src/pages/contact/` |
| Mentions légales | `/mentions-legales/` | `src/pages/mentions-legales/index.astro` |
| Confidentialité | `/confidentialite/` | `src/pages/confidentialite/index.astro` |
| Page introuvable | toute adresse inconnue | `src/pages/404.astro` |
| Guide de styles (non référencé) | `/guide-de-styles/` | `src/pages/guide-de-styles/index.astro` |

## Mettre à jour le site sans coder

Tout se fait sur GitHub : ouvrir le fichier, cliquer sur le crayon, modifier, puis **Commit changes**.
Chaque modification fusionnée dans `main` est republiée automatiquement en deux à trois minutes.

### Coordonnées et mentions légales

Dans [`src/config.ts`](src/config.ts), remplacer chaque `null` par la valeur entre apostrophes,
par exemple `email: 'bonjour@exemple.fr',`. Tant qu'une valeur vaut `null`, le site affiche « [À COMPLÉTER : …] ».

### Formulaire de contact

Sans réglage, le bouton « Envoyer ma demande » ouvre la messagerie du visiteur avec un email prérempli.
Pour recevoir les demandes par un service de formulaires (Formspree, Basin, Getform…) :

1. Créer le formulaire chez le service choisi et copier son adresse d'envoi.
2. Sur GitHub : **Settings → Secrets and variables → Actions → Variables → New repository variable**,
   nom `FORMULAIRE_URL`, valeur : l'adresse copiée.
3. Chez le service, régler la page affichée après l'envoi sur `…/contact/merci/`.
4. Dans `src/config.ts`, indiquer le nom du service (`service`, cité dans la page Confidentialité) et, si besoin,
   le nom de son champ anti-spam (`champPiege`).
5. Onglet **Actions → Mettre en ligne sur GitHub Pages → Run workflow** pour republier.

### Ouvrir le site aux moteurs de recherche

Les pages portent `noindex` tant que des informations manquent. Le jour du lancement : créer la variable
`INDEXATION` avec la valeur `true` (même chemin que ci-dessus), puis relancer la publication.

## Ajouter un projet (en cinq étapes)

1. **Préparer** la couverture et 6 à 12 images (JPG ou PNG en sRGB, 2400 px de large au minimum),
   et les textes du projet en quatre parties : Contexte, Objectif, Processus, Résultat.
2. **Créer le fichier** : sur GitHub, ouvrir `src/content/projets/`, puis **Add file → Create new file**
   et le nommer `nom-du-projet/index.md` (minuscules et tirets ; ce nom devient l'adresse
   `/projets/nom-du-projet/`).
3. **Remplir** : copier le contenu d'un projet existant (par exemple `atelier-berlot/index.md`), puis remplacer
   la fiche en haut et les textes. Garder les quatre titres `## Contexte`, `## Objectif`, `## Processus`,
   `## Résultat`, dans cet ordre.
4. **Ajouter les images** : ouvrir le dossier du projet, **Add file → Upload files**, déposer les images,
   puis les déclarer en haut de `index.md` (voir « Déclarer les images »), chacune avec son texte alternatif.
5. **Publier** : **Commit changes** sur une nouvelle branche, ouvrir la pull request, vérifier, puis **Merge**.
   Le site se met à jour en quelques minutes. S'il manque un champ ou un texte alternatif, l'onglet **Actions**
   affiche le problème en français et le site en ligne ne change pas.

### La fiche d'un projet

| Champ | Contenu |
| --- | --- |
| `titre`, `sousTitre` | Le nom du projet et sa ligne d'accroche |
| `resume` | Une ligne, reprise dans la description de la page |
| `client`, `secteur`, `role`, `annee` | La fiche ; `annee` reste vide si elle n'est pas connue |
| `familles` | Pour le filtre et les cartouches colorés : `branding`, `webdesign`, `print` |
| `disciplines` | Les autres étiquettes, affichées en cartouches neutres |
| `ordre`, `accueil` | L'ordre d'affichage, et `true` pour mettre le projet en avant sur l'accueil |
| `credits`, `mention` | Les crédits (toujours visibles) et une mention éventuelle (ex. projet de fin d'études) |
| `conclusion` | La phrase qui ferme la page (« Ce projet m'a permis… ») |

La typographie française (espaces insécables, apostrophes courbes) est appliquée automatiquement aux textes.

### Déclarer les images

```yaml
couverture:
  image: "./couverture.jpg"
  alt: "Ce que montre l'image, en une phrase"
images:
  ouverture: # facultatif : sinon, la couverture sert de visuel d'ouverture
    image: "./ouverture.jpg"
    alt: "…"
  processus:
    - format: pleine # pleine, paire, triptyque ou detail
      images:
        - image: "./recherches.jpg"
          alt: "…"
          legende: "Recherches" # facultatif
    - format: paire
      images:
        - image: "./wireframe-1.jpg"
          alt: "…"
        - image: "./wireframe-2.jpg"
          alt: "…"
  resultat:
    - format: pleine
      images:
        - image: "./resultat.jpg"
          alt: "…"
```

- Le texte alternatif (`alt`) décrit ce que montre l'image ; il est obligatoire.
- La couverture est recadrée au centre selon son emplacement (3:2, 4:5, 16:9 ou 5:4) : gardez le sujet au centre.
- Dans une paire (4:5) ou un triptyque (3:4), les images sont recadrées au même format ; en pleine largeur
  et en détail, elles gardent leurs proportions.
- Sans bloc `images`, la page affiche des aplats légendés aux bons formats.
- Les images sont optimisées à la construction : AVIF et WebP, plusieurs largeurs, chargement différé.

## Mise en ligne (GitHub Pages)

- Chaque fusion sur `main` construit, vérifie et republie le site
  ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).
- Avant de publier, deux contrôles : la typographie française et l'accessibilité (axe, WCAG 2.2 AA).
  Si l'un échoue, le site en ligne ne change pas.
- Suivre une publication : onglet **Actions**. Republier sans rien changer : **Run workflow**.
- Réglage GitHub, une seule fois : **Settings → Pages → Build and deployment → Source : GitHub Actions**.
- Brancher un nom de domaine : **Settings → Pages → Custom domain**, puis les enregistrements DNS que GitHub
  indique. Rien à changer dans le code : le sous-dossier `/studio-josephine/` disparaît de lui-même.

## Pour développer

Il faut Node.js 22.23.4 ou plus récent.

```bash
npm install          # une seule fois
npm run dev          # aperçu en direct sur http://localhost:4321
npm run build        # construit le site dans dist/
npm run check:a11y   # accessibilité (axe) et fichiers introuvables, sur le site construit
npm run check:typo   # typographie française, sur le site construit
npm run image:partage # refait public/partage.png (image affichée quand on partage un lien)
```

Pour vérifier comme en ligne, dans le sous-dossier :

```bash
BASE=/studio-josephine npm run build && BASE=/studio-josephine npm run check:a11y
```

Le contrôle d'accessibilité utilise Playwright (`npx playwright install chromium`) ; la variable `CHROMIUM_PATH`
permet d'indiquer un Chromium déjà installé.

### Organisation

```
src/config.ts              coordonnées du studio, formulaire, indexation
src/content/projets/       un dossier par projet : index.md et ses images
src/content.config.ts      la fiche d'un projet (champs et règles)
src/styles/tokens.css      couleurs, polices, échelle typographique, espacements (seul fichier pour le style)
src/styles/global.css      base et éléments signature (cartouches, bandeau, textures, boutons, champs)
src/styles/site.css        mise en page commune (en-têtes de page, sections, visuels, pages légales)
src/components/            en-tête, pied de page, logo, cartouches, bandeau, estampilles, visuels, galeries
src/layouts/Base.astro     squelette commun : référencement, en-tête, pied de page
src/lib/                   url() pour le sous-dossier, typographie française, outils des projets
public/fonts/              Readex Pro et Poppins en WOFF2, avec leurs licences OFL
ressources-clara/          fichiers fournis par Clara (logo, typos, visuels sources)
```

### Règles à garder

- Tout lien ou fichier interne passe par `url()` (`src/lib/url.ts`) : `href={url('/projets/')}`,
  jamais `href="/projets/"`, sinon il casse dans le sous-dossier.
- Couleurs, tailles et espacements viennent de `tokens.css` ; toute nouvelle combinaison de couleurs se calcule
  avant usage (tableau des contrastes sur `/guide-de-styles/`).
- Les deux polices n'ont pas de flèches ni de symboles (→, ✕, ✶) : les dessiner en SVG (`Fleche.astro`).
- Dans les gabarits, écrire `&nbsp;` avant `; : ! ?` et dans « » ; `npm run check:typo` le vérifie.

### Typographies

Readex Pro (titres) et Poppins (texte courant) sont sous licence libre SIL Open Font License et hébergées dans
`public/fonts/`. Readex Pro est réduite aux caractères latins et son axe HEXP est fixé à 0. Poppins : graisses 400,
500, 600 et italique 400.
