/**
 * Réglages du site. Les coordonnées viennent de src/data/studio.json (modifiable dans Pages CMS).
 * Une valeur laissée à null s'affiche « [À COMPLÉTER : …] » sur le site.
 * La liste complète de ce qui manque est dans A-COMPLETER.md.
 */
import donnees from './data/studio.json';

/** Une valeur vide devient null : le site affiche alors « [À COMPLÉTER : …] ». */
const ou = (v: string | undefined) => (v && v.trim() ? v.trim() : null);

/**
 * Coordonnées du studio. Elles se modifient dans src/data/studio.json,
 * ou dans Pages CMS (« Coordonnées du studio »).
 */
export const studio = {
  nom: donnees.nom,
  personne: donnees.personne,
  metier: donnees.metier,
  disciplines: 'Branding, webdesign, print',
  email: ou(donnees.email),
  linkedin: ou(donnees.linkedin),
  ville: ou(donnees.ville),
  statut: ou(donnees.statut),
  siret: ou(donnees.siret),
  adresse: ou(donnees.adresse),
  dureeConservation: ou(donnees.dureeConservation),
};

/** Formulaire de contact. */
export const formulaire = {
  // Adresse du service de formulaires choisi par Lucas. Elle vient de la variable
  // PUBLIC_FORMULAIRE_URL (sur GitHub : Settings → Secrets and variables → Actions →
  // Variables → FORMULAIRE_URL). Tant qu'elle est vide, le bouton ouvre un email prérempli.
  action: String(import.meta.env.PUBLIC_FORMULAIRE_URL ?? '').trim(),
  // Nom du service, cité dans la page Confidentialité (ex. 'Formspree') : studio.json, serviceFormulaire.
  service: ou(donnees.serviceFormulaire),
  // Champ piège anti-spam : à adapter au service (Formspree : _gotcha).
  champPiege: '_gotcha',
};

/**
 * Moteurs de recherche : fermés tant que le site contient des informations à compléter.
 * Au lancement, créer sur GitHub la variable INDEXATION avec la valeur true.
 */
export const indexation = String(import.meta.env.PUBLIC_INDEXATION ?? '') === 'true';
