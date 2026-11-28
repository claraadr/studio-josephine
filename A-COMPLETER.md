# À compléter

Ce que le site attend encore. Sur les pages, chaque information manquante est signalée en rose
« [À COMPLÉTER : …] ». Les visuels manquants sont remplacés par des aplats légendés aux bons formats.

## Textes et visuels de Clara

- [ ] **Pages CMS** : première connexion et installation de l'application GitHub (README, « Modifier le site avec
      Pages CMS »).

- [ ] **Avis des clients** : les quatre avis de l'accueil affichent encore le faux texte de la maquette
      (« Lorem ipsum… »), comme demandé. À remplacer dans chaque fiche projet (Pages CMS : Projets → Avis du client) :
      Emmanuelle Moulié (Atelier Berlot), Alexis Godicheau (Apimani), Medhy Lepoureau (Camping du Futur),
      Thomas Jean (Ehop!).
- [ ] **Camping du Futur** : l'étude de cas est à écrire (Contexte, Objectif, Processus, Résultat, phrase de fin),
      dans `src/content/projets/camping-du-futur/index.md`.
- [ ] **Atelier Berlot** : sur l'accueil, la carte présente le packaging (les boîtes de la gamme salée, d'après la
      maquette) ; l'étude de cas raconte toujours la création du site. Textes et visuels du packaging à fournir.
- [ ] **Visuels du premier écran** : cinq emplacements d'images autour de la phrase d'accueil.
- [ ] **Visuels des projets** : une couverture et 6 à 12 images par projet (2400 px de large au minimum, JPG ou PNG
      en sRGB), chacune avec un texte alternatif. Mode d'emploi : README, « Ajouter un projet ».
- [ ] **Logos des clients** : ceux d'Atelier Berlot et de Camping du Futur sont des images extraites de la maquette ;
      leurs fichiers SVG d'origine, si Clara les a, seront plus nets.
- [ ] Année de chaque projet (facultatif : affichée dans la fiche si elle est connue).
- [ ] Portrait (facultatif) pour la page À propos.

## Informations à saisir (Pages CMS : Coordonnées et mentions légales)

- [ ] Lien LinkedIn : pied de page, Contact, À propos.
- [ ] Statut juridique, SIRET, adresse professionnelle : mentions légales.
- [ ] Durée de conservation des demandes reçues : confidentialité (pour des prospects, la CNIL retient souvent
      trois ans après le dernier échange ; à confirmer).
- [ ] Vérifier que l'adresse hello@studio-josephine.fr (reprise de la maquette) reçoit bien les messages.

## À décider (Lucas)

- [ ] **Service de formulaires** : variable GitHub `FORMULAIRE_URL`, nom du service dans Pages CMS, champ anti-spam
      dans `src/config.ts`, redirection vers `/contact/merci/` (README, « Formulaire de contact »).
- [ ] **Nom de domaine** : Settings → Pages → Custom domain, puis DNS chez le registraire.
- [ ] **Ouverture aux moteurs de recherche** : variable GitHub `INDEXATION` = `true`, une fois le reste complété.

## À valider (Clara)

- [ ] L'icône d'onglet : le « j » du logo et son point, sur une pastille lin.
- [ ] Les adaptations de la maquette pour l'accessibilité : bouton pause sur le bandeau, liens Mentions légales et
      Confidentialité ajoutés en bas du pied de page, flèches du carrousel en 44 px (taille tactile minimale).
- [ ] L'ombre légère sous les cartes empilées, ajoutée pour que l'empilement se lise (cartes lin sur lin).
- [ ] Les textes de la maquette passés au vouvoiement, et « m'ont fait confiance » (sans « faites »).
- [ ] La répartition des textes de projets entre Contexte, Objectif, Processus et Résultat (sans ajout ni coupure).
- [ ] Relecture : dans le texte d'Atelier Berlot, « tout en » revient deux fois dans la même phrase.

## Écarts avec le brief, d'après la maquette

- Accueil centré avec deux boutons, prix affichés (accueil et Services), fonds de section en couleur, avis clients :
  repris de la maquette, qui prime sur le brief.
- Texte courant en DM Sans (au lieu de Poppins) et corail #E67155 (au lieu de #DE6D52), comme dans la maquette.
  Ce corail porte le texte bordeaux à 4,55 : 1, au-dessus du seuil AA.
- Couleurs des familles : Branding en anis, Webdesign en corail, Print et Packaging en rose.
- Readex Pro vient du dépôt officiel Google Fonts (même police, licence OFL).
- L'hébergeur indiqué dans les mentions légales est GitHub (GitHub Pages).
