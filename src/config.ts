/**
 * Informations du studio : le seul fichier à modifier pour les coordonnées.
 * Une valeur laissée à null s'affiche « [À COMPLÉTER : …] » sur le site.
 * La liste complète de ce qui manque est dans A-COMPLETER.md.
 */
export const studio = {
  nom: 'Studio Joséphine',
  personne: 'Clara Audureau',
  metier: 'Graphiste et webdesigner indépendante',
  disciplines: 'Branding, webdesign, print',

  // Coordonnées (pied de page, contact, à propos)
  email: null as string | null, // ex. 'bonjour@exemple.fr'
  linkedin: null as string | null, // adresse complète du profil, ex. 'https://www.linkedin.com/in/…'
  ville: null as string | null,

  // Mentions légales
  statut: null as string | null, // ex. 'Entreprise individuelle'
  siret: null as string | null,
  adresse: null as string | null, // adresse professionnelle

  // Confidentialité : durée de conservation des demandes reçues par le formulaire
  dureeConservation: null as string | null, // ex. 'trois ans après notre dernier échange'
};

/** Formulaire de contact. */
export const formulaire = {
  // Adresse du service de formulaires choisi par Lucas. Elle vient de la variable
  // PUBLIC_FORMULAIRE_URL (sur GitHub : Settings → Secrets and variables → Actions →
  // Variables → FORMULAIRE_URL). Tant qu'elle est vide, le bouton ouvre un email prérempli.
  action: String(import.meta.env.PUBLIC_FORMULAIRE_URL ?? '').trim(),
  // Nom du service, cité dans la page Confidentialité (ex. 'Formspree').
  service: null as string | null,
  // Champ piège anti-spam : à adapter au service (Formspree : _gotcha).
  champPiege: '_gotcha',
};

/**
 * Moteurs de recherche : fermés tant que le site contient des informations à compléter.
 * Au lancement, créer sur GitHub la variable INDEXATION avec la valeur true.
 */
export const indexation = String(import.meta.env.PUBLIC_INDEXATION ?? '') === 'true';
