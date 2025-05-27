1. **Définir les rôles des intervenants**
2. **Diviser le projet en plusieurs types de *backlogs* (Product, Release, Sprint, Technical, etc.)**

---

## 👥 **Rôles dans le projet Vonjy**

| Rôle                          | Responsabilités principales                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Chef de projet**            | Supervision globale, communication avec les parties prenantes (ONG, État, partenaires locaux)           |
| **Product Owner**             | Définit les besoins utilisateurs, priorise les fonctionnalités (backlog produit), valide les livraisons |
| **Scrum Master**              | Facilite les sprints, lève les blocages techniques et organisationnels                                  |
| **Développeur Backend**       | API Laravel, gestion de la base de données, authentification, logique métier                            |
| **Développeur Frontend Web**  | UI/UX sur Vue.js ou Laravel Blade + Tailwind, intégration avec les APIs                                 |
| **Développeur Mobile**        | Application Flutter ou Android, support PWA, gestion de la géolocalisation et du mode hors ligne        |
| **Spécialiste SIG/Carto**     | Intégration de Leaflet.js, gestion des cartes OSM Madagascar, traitement des coordonnées                |
| **UX/UI Designer**            | Design des interfaces en tenant compte des contraintes locales (accessibilité, simplicité)              |
| **Testeur QA**                | Tests fonctionnels, de performance, de compatibilité (offline/online)                                   |
| **DevOps / Admin système**    | Mise en place du VPS/serveur local, sécurité, backup, mise à l’échelle                                  |
| **Responsable communication** | Gestion des notifications (SMS, push), documentation utilisateur, tutoriels multilingues                |
| **Analyste données**          | Statistiques sur les alertes, dons, sinistres pour les ONG et autorités                                 |

---

## 📋 **Types de Backlogs pour Vonjy**

### 1. 🧭 **Backlog produit (Product Backlog)**

Contient **toutes les fonctionnalités métier**, priorisées par valeur pour l’utilisateur final.

**Exemples :**

* En tant que citoyen, je veux signaler une urgence avec ma position
* En tant que volontaire, je veux recevoir des alertes dans ma région
* En tant qu’ONG, je veux suivre les dons livrés dans une commune
* En tant qu'utilisateur rural, je veux utiliser l'app même hors ligne

---

### 2. 🚀 **Backlog de release (Release Backlog)**

Divise le backlog produit par **version majeure** du produit. Exemple :

#### 📦 Version 1.0 – MVP

* Bouton d’urgence “Vonjy” (SMS fallback)
* Carte des sinistres
* Inscription ONG/volontaire
* Gestion des dons manuelle
* Mode offline simplifié

#### 🚀 Version 2.0 – Étendue

* Synchronisation offline avancée (IndexedDB/PWA)
* Notifications SMS vocales
* Interface admin fokontany
* Traduction multilingue dynamique
* Suivi logistique automatisé

---

### 3. 🏃 **Backlog de sprint**

Choix de **user stories** à implémenter pour une période (généralement 2 semaines).

**Sprint 1 (Exemple) :**

* Création base de données (utilisateurs, alertes, dons)
* Endpoint API POST `/alertes`
* Maquette UI bouton “Vonjy”
* Intégration Leaflet + OSM
* Envoi SMS via Orange API

---

### 4. 🧑‍💻 **Backlog technique**

Regroupe les tâches **techniques internes**, non visibles directement pour l’utilisateur final.

**Exemples :**

* Mise en place de la CI/CD (Laravel Forge / GitHub Actions)
* Gestion du cache et fallback offline
* Sécurisation API via tokens et throttling
* Intégration IndexedDB
* Monitoring de la charge serveur

---

### 5. 🧪 **Backlog QA / Test**

Liste de tous les tests à prévoir pour valider la stabilité et la fiabilité du système.

**Exemples :**

* Test de l'envoi d'une alerte avec mauvais GPS
* Test d'un envoi SMS sans réseau
* Test de conflit de synchronisation offline/online
* Test de couverture cartographique en mode offline

---

## 📌 Astuce organisation agile

Tu peux centraliser ces **backlogs dans un outil comme Trello, Notion, GitLab, Jira, ou même un Google Sheet partagé** avec des statuts :

* 🟢 À faire
* 🟡 En cours
* 🔵 En test
* ✅ Terminé
