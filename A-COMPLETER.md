# À compléter

Ce que le site attend encore. Sur les pages, chaque information manquante est signalée en rose
« [À COMPLÉTER : …] ». Les visuels manquants sont remplacés par des aplats légendés aux bons formats.

## Fichiers de Clara

- [ ] **Logo** (SVG, une couleur) → `ressources-clara/logo/`, puis intégré dans `src/components/Logo.astro`,
      où un substitut en texte occupe sa place. Ensuite : refaire l'image de partage (`npm run image:partage`)
      et l'icône d'onglet `public/favicon.svg` (version réduite : le « j » et son point, à valider).
- [ ] **Visuels des quatre projets** : une couverture et 6 à 12 images par projet (2400 px de large au minimum,
      JPG ou PNG en sRGB), chacune avec un texte alternatif. Mode d'emploi : README, « Ajouter un projet ».
- [ ] Année de chaque projet (facultatif : affichée dans la fiche si elle est connue).
- [ ] Portrait (facultatif) pour la section À propos.
- [ ] Textures lin et vichy personnelles (facultatif : des versions dessinées en CSS et SVG sont en place).

## Informations à saisir dans `src/config.ts`

- [ ] Adresse email : pied de page, Contact, mentions légales, confidentialité, destinataire de l'email prérempli.
- [ ] Lien LinkedIn : pied de page, Contact, À propos.
- [ ] Statut juridique, SIRET, adresse professionnelle : mentions légales.
- [ ] Durée de conservation des demandes reçues : confidentialité (pour des prospects, la CNIL retient souvent
      trois ans après le dernier échange ; à confirmer).
- [ ] Ville (facultatif) : données structurées pour les moteurs de recherche.

## À décider (Lucas)

- [ ] **Service de formulaires** : variable GitHub `FORMULAIRE_URL`, nom du service et champ anti-spam dans
      `src/config.ts`, redirection vers `/contact/merci/` (README, « Formulaire de contact »).
- [ ] **Nom de domaine** : Settings → Pages → Custom domain, puis DNS chez le registraire.
- [ ] **Ouverture aux moteurs de recherche** : variable GitHub `INDEXATION` = `true`, une fois le reste complété.

## À valider (Clara)

- [ ] Le guide de styles (`/guide-de-styles/`) : couleurs par famille, cartouches, estampilles, textures.
- [ ] L'élément visuel du premier écran : échantillons de lin et de vichy, avec l'estampille.
- [ ] Les trois estampilles du site : accueil, pied de page, page introuvable.
- [ ] La répartition de ses textes entre Contexte, Objectif, Processus et Résultat (sans ajout ni coupure).
- [ ] Les familles de chaque projet, qui pilotent le filtre : Atelier Berlot (Webdesign), Ehop! (Branding,
      Webdesign, Print), Apimani (Webdesign, Print), Basile (Branding, Webdesign).
- [ ] Les fiches projets : secteurs et rôles rédigés à partir de ses textes ; crédit « Photographies du site :
      Atelier Berlot ».
- [ ] Les textes de liaison écrits pour le site : accroches de l'accueil et des services, déroulé « Comment ça se
      passe », formulaire, confirmation, page introuvable, pages légales.
- [ ] Relecture : dans le texte d'Atelier Berlot, « tout en » revient deux fois dans la même phrase
      (« tout en facilitant la prise de contact, tout en respectant le budget annoncé »). Laissé tel quel,
      le brief demandant de ne rien modifier.

## Écarts signalés

- Readex Pro vient du dépôt officiel Google Fonts (même police, licence OFL), en attendant le fichier TTF de
  Clara. À remplacer si son fichier diffère.
- Poppins Italique (400) est chargée pour un seul usage : l'ancien nom « J'aime mes dents ! », en italique dans
  le texte de Clara. Le fichier n'est téléchargé que sur la page Apimani.
- L'hébergeur indiqué dans les mentions légales est GitHub (GitHub Pages) : à modifier si l'hébergement change.
