# Hedera Santé Afrique — MVP

Une plateforme décentralisée démonstrative pour la gestion sécurisée des données médicales, la traçabilité de la chaîne du froid et la gestion des consentements, bâtie avec React, Tailwind, shadcn-ui et Supabase.

## Démarrer

```bash
npm i
npm run dev
```

## 1) Comptes utilisateurs et connexion
- Page d’authentification: /auth (email + mot de passe)
- Connexion et inscription avec Supabase (redirection email configurée automatiquement)
- Navbar dynamique: bouton Se connecter / Se déconnecter
- Routes protégées: /patient, /pro-sante, /logistique nécessitent une session

Conseils pour les tests:
- Supabase > Authentication > Email: désactivez « Confirm email » pour accélérer les tests.
- En cas de souci de session, un nettoyage robuste est appliqué lors de la déconnexion.

## 2) Données réelles (Supabase)
- Profil: La page Patient charge votre profil depuis la table profiles (RLS activé)
- Données physiologiques: Affiche les 10 dernières mesures de physiological_data pour votre profil

Important:
- Les règles RLS existantes permettent aux patients de lire leurs propres données (profiles, physiological_data)
- Assurez-vous d’être connecté pour voir vos données

## 3) Fonction avancée (Edge Function)
Une edge function publique « iot-evaluate » évalue chaque mesure IoT (température/humidité) et renvoie un statut (OK/ALERTE).

- Code: supabase/functions/iot-evaluate/index.ts
- CORS activé
- Appelée depuis /logistique via Supabase Functions

Accéder aux logs et au déploiement:
- Functions: https://supabase.com/dashboard/project/idzauxvceeaxyqrvmxoo/functions

## Structure
- src/pages/Auth.tsx — Page d’authentification
- src/components/auth/PrivateRoute.tsx — Protection des routes
- src/pages/Patient.tsx — Profil + données physiologiques (Supabase)
- src/pages/ProSante.tsx — Outils pro (démo)
- src/pages/Logistique.tsx — Tableau IoT + appel edge function
- src/hooks/use-iot-stream.ts & src/utils/iot-mock.ts — Flux IoT simulé (10s)

## SEO & UI
- Helmet pour balises title/description et canonical
- Composants sémantiques et design tokens HSL

## Prochaines étapes
- [Optionnel] Ajouter une edge function d’ingestion pour écrire dans physiological_data (nécessite SUPABASE_SERVICE_ROLE)
- Intégrer Hedera (HCS/HTS) pour l’horodatage immuable et la gestion des jetons d’accès
